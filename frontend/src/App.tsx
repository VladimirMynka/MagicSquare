import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  Navigate as RouterNavigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
  type LinkProps,
  type NavLinkProps,
  type NavigateProps,
  type To,
} from "react-router-dom";
import { Latex } from "./components/Latex";
import { news, newsBySlug, type NewsArticle } from "./content/news";
import { familyProof } from "./content/familyProofs";
import {
  COMMON_PROOFS,
  MAGIC3_LATEX,
  commonProofById,
  commonProofs,
} from "./content/proofs";
import {
  FAMILIES,
  FIVE_FAMILIES,
  FOUR_FAMILIES,
  familyById,
  familyGroupLabel,
  familyOrbitDescription,
  familySummary,
  findFamilyById,
  justificationLabel,
  type FamilyDefinition,
  type FamilyLevel,
  type ParameterStrings,
} from "./lib/families";
import {
  createSnapshot,
  divideCoordinates,
  factorizationTrialDivisionWork,
  formatInteger,
  greatestCommonDivisor,
  greatestSquareDivisor,
  minimizeCoordinates,
  type Coordinates,
  type Position,
  type SquareCell,
} from "./lib/magicSquare";
import { familyParameterGuide } from "./lib/parameterGuides";
import { orbitPath } from "./seo";
import {
  LocaleProvider,
  isLocale,
  localePath,
  preferredLocale,
  switchLocalePath,
  useLocale,
  type Locale,
} from "./i18n";
import { TimelinePage } from "./TimelinePage";
import { ResiduesTheoryPage, TheoryIndexPage } from "./TheoryPages";
import { PrimeDivisorsTheoryPage } from "./PrimeDivisorsTheory";
import { SemimagicAlgebraTheoryPage } from "./SemimagicAlgebraTheory";
import { SemimagicStructureTheoryPage } from "./SemimagicStructureTheory";

const PARAMETER_KEYS = ["a", "b", "c", "d"] as const;
type FamilyRelation = "exact" | "derived";

interface MinimizationNotice {
  kind: "preserved" | "primitive" | "derived" | "unavailable";
  dividedBy: bigint;
  remainingDivisor: bigint;
}

interface SquarePreservingReduction {
  coordinates: Coordinates;
  dividedBy: bigint;
  remainingDivisor: bigint;
}

interface FactorizationWarning {
  source: "estimate" | "elapsed";
  thresholdMs: 10_000 | 60_000;
  estimatedMs?: number;
}

type FactorizationWorkerMessage =
  | {
      type: "result";
      index: number;
      factorization: string;
    }
  | {
      type: "threshold";
      thresholdMs: 10_000 | 60_000;
    }
  | {
      type: "done";
      elapsedMs: number;
    };

const FACTORIZATION_BENCHMARK_STEPS = 20_000;
const TEN_SECONDS = 10_000;
const ONE_MINUTE = 60_000;

function estimateFactorizationMs(values: readonly bigint[]): number {
  const work = factorizationTrialDivisionWork(values);
  if (work === 0n) return 0;

  const probe =
    values.reduce((largest, value) => {
      const absolute = value < 0n ? -value : value;
      return absolute > largest ? absolute : largest;
    }, 0n) || 9_999_999_967n;
  let candidate = 3n;
  const startedAt = performance.now();
  for (let index = 0; index < FACTORIZATION_BENCHMARK_STEPS; index += 1) {
    void (probe % candidate);
    candidate += 2n;
  }
  const elapsedMs = Math.max(performance.now() - startedAt, 0.25);
  const attemptsPerMs = FACTORIZATION_BENCHMARK_STEPS / elapsedMs;
  if (work > BigInt(Number.MAX_SAFE_INTEGER)) return Number.POSITIVE_INFINITY;
  return Number(work) / attemptsPerMs;
}

function squarePreservingReduction(
  coordinates: Coordinates,
): SquarePreservingReduction | null {
  const divisor = greatestCommonDivisor(...coordinates);
  if (divisor < 2n) {
    return {
      coordinates,
      dividedBy: 1n,
      remainingDivisor: 1n,
    };
  }
  const squareDivisor = greatestSquareDivisor(divisor);
  if (squareDivisor === null) return null;
  return {
    coordinates: divideCoordinates(coordinates, squareDivisor),
    dividedBy: squareDivisor,
    remainingDivisor: divisor / squareDivisor,
  };
}

const CELL_FORM_LATEX: Readonly<Record<string, string>> = {
  A: "E+x",
  B: "E-x+y",
  C: "E-y",
  D: "E-x-y",
  E: "E",
  F: "E+x+y",
  G: "E+y",
  H: "E+x-y",
  J: "E-x",
};

function localizeTo(locale: Locale, to: To): To {
  if (typeof to === "string") return localePath(locale, to);
  return {
    ...to,
    pathname: to.pathname ? localePath(locale, to.pathname) : to.pathname,
  };
}

function Link({ to, ...props }: LinkProps) {
  const { locale } = useLocale();
  return <RouterLink to={localizeTo(locale, to)} {...props} />;
}

function NavLink({ to, ...props }: NavLinkProps) {
  const { locale } = useLocale();
  return <RouterNavLink to={localizeTo(locale, to)} {...props} />;
}

function Navigate({ to, ...props }: NavigateProps) {
  const { locale } = useLocale();
  return <RouterNavigate to={localizeTo(locale, to)} {...props} />;
}

function AppMark() {
  return (
    <span className="app-mark" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => (
        <i key={index} />
      ))}
    </span>
  );
}

function localeRedirectTarget(locale: Locale, pathname: string): string {
  return `${localePath(locale, pathname)}${window.location.search}${window.location.hash}`;
}

function LocaleLayout() {
  const { locale: rawLocale } = useParams();
  const location = useLocation();
  if (!isLocale(rawLocale)) {
    const locale = preferredLocale();
    return (
      <RouterNavigate
        replace
        to={localeRedirectTarget(locale, location.pathname)}
      />
    );
  }
  return (
    <LocaleProvider locale={rawLocale}>
      <AppShell />
    </LocaleProvider>
  );
}

function LegacyLocaleRedirect() {
  const location = useLocation();
  const locale = preferredLocale();
  return (
    <RouterNavigate
      replace
      to={localeRedirectTarget(locale, location.pathname)}
    />
  );
}

function LanguageSwitcher() {
  const { locale, text } = useLocale();
  const location = useLocation();
  return (
    <nav className="language-switcher" aria-label={text("Язык", "Language")}>
      {(["ru", "en"] as const).map((candidate) => (
        <RouterLink
          aria-current={candidate === locale ? "page" : undefined}
          className={candidate === locale ? "active" : ""}
          key={candidate}
          lang={candidate}
          onClick={() =>
            window.localStorage.setItem("magic-squares-locale", candidate)
          }
          to={`${switchLocalePath(location.pathname, candidate)}${location.search}${location.hash}`}
        >
          {candidate.toUpperCase()}
        </RouterLink>
      ))}
    </nav>
  );
}

function AppShell() {
  const { text } = useLocale();
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link
          className="brand"
          to="/"
          aria-label={text("Magic Squares — на главную", "Magic Squares — home")}
        >
          <AppMark />
          <span>
            <strong>Magic Squares</strong>
            <small>proof atlas</small>
          </span>
        </Link>
        <nav
          className="main-nav"
          aria-label={text("Основная навигация", "Primary navigation")}
        >
          <NavLink to="/lab">{text("Лаборатория", "Laboratory")}</NavLink>
          <NavLink to="/theory">
            {text("Теория", "Theory")}
          </NavLink>
          <NavLink to="/news">{text("Новости", "News")}</NavLink>
          <NavLink to="/timeline">{text("Хронология", "Timeline")}</NavLink>
          <NavLink to="/about">{text("О проекте", "About")}</NavLink>
        </nav>
        <div className="header-meta">
          <LanguageSwitcher />
          <span className="release-pill">
            <i /> alpha · 0.6.0
          </span>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-copyright">
          <strong>
            © 2021–2026 {text("Владимир Мынка", "Vladimir Mynka")}
          </strong>
          <span>
            {text(
              "Распространение материалов разрешено с явным указанием авторства и активной ссылкой на сайт.",
              "Materials may be redistributed with explicit attribution and an active link to this site.",
            )}
          </span>
        </div>
        <nav aria-label={text("Сведения о проекте", "Project information")}>
          <Link to="/timeline">{text("Хронология", "Timeline")}</Link>
          <Link to="/about#copyright">
            {text("Авторство и условия", "Attribution and terms")}
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function HomePage() {
  const { locale, text } = useLocale();
  const articles = news(locale);
  const latestArticle = articles[0];
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            {text(
              "Параметрические семейства · карта доказательств",
              "Parametric families · proof map",
            )}
          </p>
          <h1>
            {text(
              "Магические квадраты, которые можно не только увидеть.",
              "Magic squares you can do more than look at.",
            )}
          </h1>
          <p className="hero-lead">
            {text(
              "Интерактивный атлас связывает каждый генератор с его квадратной маской, формулой, полным LaTeX-доказательством и честным статусом формализации.",
              "The interactive atlas connects every generator to its square-valued mask, formulas, complete LaTeX proof, and an honest formalization status.",
            )}
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/lab">
              {text("Открыть лабораторию", "Open the laboratory")} <span>↗</span>
            </Link>
            <Link className="button button-ghost" to="/theory">
              {text("Как устроены доказательства", "How the proofs work")}
            </Link>
          </div>
          <div
            className="hero-stats"
            aria-label={text("Статистика проекта", "Project statistics")}
          >
            <div>
              <strong>23 + 23</strong>
              <span>{text("орбиты 4/9 и 5/9", "4/9 and 5/9 orbits")}</span>
            </div>
            <div>
              <strong>5/9</strong>
              <span>{text("квадратная маска", "square-valued mask")}</span>
            </div>
            <div>
              <strong>{COMMON_PROOFS.length}</strong>
              <span>{text("общие леммы", "shared lemmas")}</span>
            </div>
          </div>
        </div>
        <HeroSquare />
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Proof-backed catalog</p>
            <h2>
              {text(
                "От формулы к квадрату — без разрыва",
                "From formula to square, without a gap",
              )}
            </h2>
          </div>
          <Link className="text-link" to="/lab">
            {text("Все семейства", "All families")} <span>→</span>
          </Link>
        </div>
        <div className="feature-grid">
          {["abehj", "abcdh", "abcdg"].map(familyById).map((family, index) => (
            <Link
              className={`feature-card tone-${family.group}`}
              to={`${orbitPath(family.id)}#family-proof`}
              key={family.id}
            >
              <span className="feature-index">0{index + 1}</span>
              <Pattern family={family} />
              <div>
                <span className="family-kind">
                  {familyGroupLabel(family, locale)}
                </span>
                <h3>{family.title}</h3>
                <p>{familySummary(family, locale)}</p>
              </div>
              <span className="feature-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="manifesto">
        <p className="eyebrow">
          {text("Исследовательский принцип", "Research principle")}
        </p>
        <blockquote>
          {text(
            "«Если символического доказательства ещё нет, это пробел, а не результат».",
            "“If a symbolic proof does not exist yet, that is a gap—not a result.”",
          )}
        </blockquote>
        <p>
          {text(
            "Интерфейс показывает вычисление. Proof-core отвечает за утверждение. Поэтому красивые примеры не подменяют тождества, а статус каждой конструкции виден пользователю.",
            "The interface displays computations; proof-core is responsible for claims. Attractive examples never substitute for identities, and every construction exposes its status.",
          )}
        </p>
      </section>

      {latestArticle ? (
        <section className="section-block latest-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{text("Журнал проекта", "Project journal")}</p>
              <h2>{text("Последнее обновление", "Latest update")}</h2>
            </div>
            <Link className="text-link" to="/news">
              {text("Все новости", "All news")} <span>→</span>
            </Link>
          </div>
          <NewsCard article={latestArticle} featured />
        </section>
      ) : null}
    </div>
  );
}

function HeroSquare() {
  const { text } = useLocale();
  const values = [
    17689, 27889, 11449, 12769, 19009, 25249, 26569, 10129, 20329,
  ];
  const squareIndexes = new Set([0, 1, 2, 3, 6]);
  return (
    <div
      className="hero-visual"
      aria-label={text("Точный квадрат ABCDG", "Exact ABCDG square")}
    >
      <div className="hero-square-label">
        <span>ABCDG</span>
        <small>{text("точный сертификат", "exact certificate")}</small>
      </div>
      <div className="hero-square-grid">
        {values.map((value, index) => (
          <div
            className={squareIndexes.has(index) ? "is-square" : ""}
            key={value}
          >
            <span>{"ABCDEFGHJ"[index]}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div
        className="hero-coordinates"
        aria-label={text("Координаты квадрата", "Square coordinates")}
      >
        <span>
          <small>E</small>19 009
        </span>
        <span>
          <small>x</small>−1 320
        </span>
        <span>
          <small>y</small>7 560
        </span>
      </div>
      <div className="proof-stamp">
        <span>✓</span> proof-core
      </div>
    </div>
  );
}

function LabPage({ routeFamilyId }: { routeFamilyId?: string } = {}) {
  const { locale, text } = useLocale();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedFamily = routeFamilyId ?? searchParams.get("family");
  const initialFamily = requestedFamily
    ? findFamilyById(requestedFamily) ?? null
    : null;
  let initialParameters = PARAMETER_KEYS.map(
    (key, index) =>
      searchParams.get(key) ?? (initialFamily ?? FAMILIES[0]).defaults[index],
  ) as unknown as ParameterStrings;
  let initialCoordinates: Coordinates;
  let initialNormalization = 1n;
  let initialFamilyRelation: FamilyRelation =
    initialFamily && searchParams.get("derived") === "1" ? "derived" : "exact";

  try {
    if (initialFamily) {
      const generated = initialFamily.generate(initialParameters);
      const requestedNormalization = BigInt(searchParams.get("norm") ?? "1");
      initialNormalization =
        requestedNormalization > 0n &&
        generated.every((value) => value % requestedNormalization === 0n)
          ? requestedNormalization
          : 1n;
      initialCoordinates = divideCoordinates(generated, initialNormalization);
    } else {
      initialCoordinates = [
        BigInt(searchParams.get("e") ?? "5"),
        BigInt(searchParams.get("x") ?? "3"),
        BigInt(searchParams.get("y") ?? "1"),
      ];
    }
  } catch {
    initialParameters = (initialFamily ?? FAMILIES[0]).defaults;
    initialNormalization = 1n;
    initialFamilyRelation = "exact";
    initialCoordinates = initialFamily
      ? initialFamily.generate(initialParameters)
      : [5n, 3n, 1n];
  }

  const [family, setFamily] = useState<FamilyDefinition | null>(initialFamily);
  const [catalogLevel, setCatalogLevel] = useState<FamilyLevel>(
    initialFamily?.level ?? 5,
  );
  const [parameters, setParameters] =
    useState<ParameterStrings>(initialParameters);
  const [coordinates, setCoordinates] =
    useState<Coordinates>(initialCoordinates);
  const [coordinateInputs, setCoordinateInputs] = useState<
    [string, string, string]
  >([
    initialCoordinates[0].toString(),
    initialCoordinates[1].toString(),
    initialCoordinates[2].toString(),
  ]);
  const [scale, setScale] = useState("−1");
  const [factorized, setFactorized] = useState(false);
  const [factorizations, setFactorizations] = useState<
    readonly (string | undefined)[]
  >([]);
  const [factorizationRunning, setFactorizationRunning] = useState(false);
  const [factorizationWarning, setFactorizationWarning] =
    useState<FactorizationWarning | null>(null);
  const factorizationWorker = useRef<Worker | null>(null);
  const pendingFactorizationValues = useRef<readonly bigint[]>([]);
  const [autoPreserveMinimize, setAutoPreserveMinimize] = useState(false);
  const [normalization, setNormalization] = useState(initialNormalization);
  const [familyRelation, setFamilyRelation] =
    useState<FamilyRelation>(initialFamilyRelation);
  const [minimizationNotice, setMinimizationNotice] =
    useState<MinimizationNotice | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const snapshot = useMemo(() => createSnapshot(coordinates), [coordinates]);
  const parameterGuide = useMemo(
    () => (family ? familyParameterGuide(family, locale) : null),
    [family, locale],
  );
  const declaredMaskHolds = family
    ? family.positions.every((position) =>
        snapshot.squarePositions.includes(position),
      )
    : null;
  const catalogFamilies = catalogLevel === 4 ? FOUR_FAMILIES : FIVE_FAMILIES;

  useEffect(() => {
    if (!family || window.location.hash !== "#family-proof") return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("family-proof")?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [family]);

  useEffect(() => {
    setFactorized(
      window.localStorage.getItem("magic-squares-factorized") === "true",
    );
    const autoMinimize =
      window.localStorage.getItem("magic-squares-auto-preserve-minimize") ===
      "true";
    setAutoPreserveMinimize(autoMinimize);
    if (autoMinimize && family && familyRelation === "exact") {
      window.requestAnimationFrame(() => minimizePreservingMask());
    }
  }, []);

  useEffect(() => {
    if (!factorized) {
      stopFactorization();
      return;
    }
    prepareFactorization(snapshot.cells.map((cell) => cell.value));
  }, [factorized, coordinates]);

  useEffect(
    () => () => {
      factorizationWorker.current?.terminate();
    },
    [],
  );

  function persistFamily(
    nextFamily: FamilyDefinition,
    nextParameters: ParameterStrings,
    nextNormalization = 1n,
    nextRelation: FamilyRelation = "exact",
  ) {
    const nextSearch = new URLSearchParams({
      family: nextFamily.id,
      ...Object.fromEntries(
        PARAMETER_KEYS.map((key, index) => [key, nextParameters[index]]),
      ),
    });
    if (nextNormalization > 1n) {
      nextSearch.set("norm", nextNormalization.toString());
    }
    if (nextRelation === "derived") {
      nextSearch.set("derived", "1");
    }
    navigate({
      pathname: localePath(locale, "/lab"),
      search: `?${nextSearch.toString()}`,
    });
  }

  function persistManual(nextCoordinates: Coordinates) {
    const nextSearch = new URLSearchParams({
      e: nextCoordinates[0].toString(),
      x: nextCoordinates[1].toString(),
      y: nextCoordinates[2].toString(),
    });
    navigate({
      pathname: localePath(locale, "/lab"),
      search: `?${nextSearch.toString()}`,
    });
  }

  function setCurrentCoordinates(
    nextCoordinates: Coordinates,
    nextFamily: FamilyDefinition | null,
  ) {
    setCoordinates(nextCoordinates);
    setCoordinateInputs([
      nextCoordinates[0].toString(),
      nextCoordinates[1].toString(),
      nextCoordinates[2].toString(),
    ]);
    setFamily(nextFamily);
    setMinimizationNotice(null);
    setError("");
  }

  function generateFamily(nextParameters = parameters, nextFamily = family) {
    if (!nextFamily) return;
    try {
      let nextCoordinates = nextFamily.generate(nextParameters);
      let nextNormalization = 1n;
      let nextNotice: MinimizationNotice | null = null;
      if (autoPreserveMinimize) {
        const reduction = squarePreservingReduction(nextCoordinates);
        if (reduction) {
          nextCoordinates = reduction.coordinates;
          nextNormalization = reduction.dividedBy;
          if (reduction.dividedBy > 1n || reduction.remainingDivisor > 1n) {
            nextNotice = {
              kind: "preserved",
              dividedBy: reduction.dividedBy,
              remainingDivisor: reduction.remainingDivisor,
            };
          }
        }
      }
      setCurrentCoordinates(nextCoordinates, nextFamily);
      setNormalization(nextNormalization);
      setFamilyRelation("exact");
      setMinimizationNotice(nextNotice);
      persistFamily(
        nextFamily,
        nextParameters,
        nextNormalization,
        "exact",
      );
    } catch {
      setError(
        text(
          "Параметры семейства должны быть целыми числами.",
          "Family parameters must be integers.",
        ),
      );
    }
  }

  function selectFamily(nextFamily: FamilyDefinition) {
    setCatalogLevel(nextFamily.level);
    setParameters(nextFamily.defaults);
    generateFamily(nextFamily.defaults, nextFamily);
  }

  function selectManual() {
    setFamily(null);
    setNormalization(1n);
    setFamilyRelation("exact");
    setMinimizationNotice(null);
    persistManual(coordinates);
  }

  function submitFamily(event: FormEvent) {
    event.preventDefault();
    generateFamily();
  }

  function submitCoordinates(event: FormEvent) {
    event.preventDefault();
    try {
      const nextCoordinates: Coordinates = [
        BigInt(coordinateInputs[0].replace("−", "-")),
        BigInt(coordinateInputs[1].replace("−", "-")),
        BigInt(coordinateInputs[2].replace("−", "-")),
      ];
      setCurrentCoordinates(nextCoordinates, null);
      setNormalization(1n);
      setFamilyRelation("exact");
      persistManual(nextCoordinates);
    } catch {
      setError(
        text(
          "E, x и y должны быть целыми числами.",
          "E, x, and y must be integers.",
        ),
      );
    }
  }

  function randomize() {
    if (!family) return;
    const data = new Uint32Array(4);
    crypto.getRandomValues(data);
    const next = Array.from(data, (value) =>
      String((value % 9) + 1),
    ) as unknown as ParameterStrings;
    setParameters(next);
    generateFamily(next);
  }

  function swapPairs() {
    if (!family) return;
    const next: ParameterStrings = [
      parameters[2],
      parameters[3],
      parameters[0],
      parameters[1],
    ];
    setParameters(next);
    generateFamily(next);
  }

  function swapWithinParameters(left: number, right: number) {
    if (!family) return;
    const next = [...parameters] as [
      string,
      string,
      string,
      string,
    ];
    [next[left], next[right]] = [next[right], next[left]];
    setParameters(next);
    generateFamily(next);
  }

  function transformCoordinates(
    transform: (current: Coordinates) => Coordinates,
  ) {
    const nextCoordinates = transform(coordinates);
    setCurrentCoordinates(nextCoordinates, null);
    setNormalization(1n);
    setFamilyRelation("exact");
    persistManual(nextCoordinates);
  }

  function minimize() {
    if (!family) {
      transformCoordinates(minimizeCoordinates);
      return;
    }
    if (familyRelation === "derived") {
      minimizeFully();
      return;
    }
    minimizePreservingMask();
  }

  function minimizePreservingMask() {
    if (!family || familyRelation !== "exact") return;
    const reduction = squarePreservingReduction(coordinates);
    if (!reduction) {
      setMinimizationNotice({
        kind: "unavailable",
        dividedBy: 1n,
        remainingDivisor: greatestCommonDivisor(...coordinates),
      });
      return;
    }

    if (
      reduction.dividedBy === 1n &&
      reduction.remainingDivisor === 1n
    ) {
      setMinimizationNotice({
        kind: "primitive",
        dividedBy: 1n,
        remainingDivisor: 1n,
      });
      return;
    }

    const nextNormalization = normalization * reduction.dividedBy;
    setCurrentCoordinates(reduction.coordinates, family);
    setNormalization(nextNormalization);
    setFamilyRelation("exact");
    setMinimizationNotice({
      kind: "preserved",
      dividedBy: reduction.dividedBy,
      remainingDivisor: reduction.remainingDivisor,
    });
    persistFamily(family, parameters, nextNormalization, "exact");
  }

  function minimizeFully() {
    const divisor = greatestCommonDivisor(...coordinates);
    if (divisor < 2n) {
      setMinimizationNotice({
        kind: "primitive",
        dividedBy: 1n,
        remainingDivisor: 1n,
      });
      return;
    }

    const nextCoordinates = divideCoordinates(coordinates, divisor);
    if (!family) {
      setCurrentCoordinates(nextCoordinates, null);
      persistManual(nextCoordinates);
      return;
    }

    const nextSquarePositions = createSnapshot(nextCoordinates).squarePositions;
    const maskStillHolds = family.positions.every((position) =>
      nextSquarePositions.includes(position),
    );
    const nextRelation: FamilyRelation = maskStillHolds ? "exact" : "derived";
    const nextNormalization = normalization * divisor;
    setCurrentCoordinates(nextCoordinates, family);
    setNormalization(nextNormalization);
    setFamilyRelation(nextRelation);
    setMinimizationNotice({
      kind: nextRelation === "exact" ? "preserved" : "derived",
      dividedBy: divisor,
      remainingDivisor: 1n,
    });
    persistFamily(family, parameters, nextNormalization, nextRelation);
  }

  function multiply() {
    try {
      const factor = BigInt(scale.replace("−", "-"));
      transformCoordinates(([center, x, y]) => [
        center * factor,
        x * factor,
        y * factor,
      ]);
    } catch {
      setError(
        text(
          "Множитель должен быть целым числом.",
          "The multiplier must be an integer.",
        ),
      );
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function stopFactorization() {
    factorizationWorker.current?.terminate();
    factorizationWorker.current = null;
    setFactorizationRunning(false);
    setFactorizationWarning(null);
    setFactorizations([]);
  }

  function startFactorization(
    values: readonly bigint[],
    approvedThroughMs: number,
  ) {
    factorizationWorker.current?.terminate();
    const worker = new Worker(
      new URL("./workers/factorization.worker.ts", import.meta.url),
      { type: "module" },
    );
    factorizationWorker.current = worker;
    setFactorizations(Array.from({ length: values.length }, () => undefined));
    setFactorizationRunning(true);
    setFactorizationWarning(null);

    worker.onmessage = (
      event: MessageEvent<FactorizationWorkerMessage>,
    ) => {
      const message = event.data;
      if (message.type === "result") {
        setFactorizations((current) => {
          const next = [...current];
          next[message.index] = message.factorization;
          return next;
        });
        return;
      }
      if (message.type === "threshold") {
        setFactorizationRunning(false);
        setFactorizationWarning({
          source: "elapsed",
          thresholdMs: message.thresholdMs,
        });
        return;
      }
      setFactorizationRunning(false);
      factorizationWorker.current?.terminate();
      factorizationWorker.current = null;
    };
    worker.onerror = () => {
      setFactorizationRunning(false);
      factorizationWorker.current?.terminate();
      factorizationWorker.current = null;
      setError(
        text(
          "Не удалось выполнить факторизацию в фоновом потоке.",
          "Factorization could not be completed in the background worker.",
        ),
      );
    };
    worker.postMessage({
      type: "start",
      values: values.map(String),
      approvedThroughMs,
    });
  }

  function prepareFactorization(values: readonly bigint[]) {
    factorizationWorker.current?.terminate();
    factorizationWorker.current = null;
    pendingFactorizationValues.current = values;
    setFactorizations(Array.from({ length: values.length }, () => undefined));
    setFactorizationRunning(false);
    setFactorizationWarning(null);

    const estimatedMs = estimateFactorizationMs(values);
    if (estimatedMs > ONE_MINUTE) {
      setFactorizationWarning({
        source: "estimate",
        thresholdMs: ONE_MINUTE,
        estimatedMs,
      });
      return;
    }
    if (estimatedMs > TEN_SECONDS) {
      setFactorizationWarning({
        source: "estimate",
        thresholdMs: TEN_SECONDS,
        estimatedMs,
      });
      return;
    }
    startFactorization(values, 0);
  }

  function continueFactorization() {
    if (!factorizationWarning) return;
    const approvedThroughMs = factorizationWarning.thresholdMs;
    if (factorizationWarning.source === "estimate") {
      startFactorization(
        pendingFactorizationValues.current,
        approvedThroughMs,
      );
      return;
    }
    factorizationWorker.current?.postMessage({
      type: "continue",
      approvedThroughMs,
    });
    setFactorizationWarning(null);
    setFactorizationRunning(true);
  }

  function cancelFactorization() {
    window.localStorage.setItem("magic-squares-factorized", "false");
    setFactorized(false);
    stopFactorization();
  }

  function toggleFactorization() {
    if (factorized) {
      cancelFactorization();
      return;
    }
    window.localStorage.setItem("magic-squares-factorized", "true");
    setFactorized(true);
  }

  function toggleAutoPreserveMinimize(enabled: boolean) {
    setAutoPreserveMinimize(enabled);
    window.localStorage.setItem(
      "magic-squares-auto-preserve-minimize",
      String(enabled),
    );
    if (enabled && family && familyRelation === "exact") {
      minimizePreservingMask();
    }
  }

  return (
    <div className="page lab-page">
      <div className="lab-heading">
        <div>
          <p className="eyebrow">
            {text("Математическая мастерская", "Mathematical workbench")}
          </p>
          <h1>{text("Лаборатория квадратов", "Square laboratory")}</h1>
        </div>
        <p>
          {text(
            "Управляйте произвольным квадратом через E, x, y или получите эти координаты из параметрического семейства.",
            "Control an arbitrary square through E, x, and y, or obtain these coordinates from a parametric family.",
          )}
        </p>
      </div>

      <div className="lab-layout">
        <aside className="family-panel">
          <div className="panel-label">
            <span>{text("Режим и семейства", "Mode and families")}</span>
            <small>
              {catalogFamilies.length} {text("орбиты", "orbits")}
            </small>
          </div>
          <div
            className="family-level-tabs"
            aria-label={text("Уровень квадратной маски", "Square-mask level")}
          >
            {([4, 5] as const).map((level) => (
              <button
                className={catalogLevel === level ? "active" : ""}
                type="button"
                onClick={() => setCatalogLevel(level)}
                key={level}
              >
                {level}/9 · 23
              </button>
            ))}
          </div>
          <div className="family-list">
            <button
              className={`family-button manual-family ${family === null ? "active" : ""}`}
              onClick={selectManual}
              type="button"
            >
              <span className="manual-pattern" aria-hidden="true">
                <i>E</i>
                <i>x</i>
                <i>y</i>
              </span>
              <span>
                <strong>{text("Свободный квадрат", "Free square")}</strong>
                <small>
                  {text("прямое управление E, x, y", "direct E, x, y control")}
                </small>
              </span>
              <i>→</i>
            </button>
            {catalogFamilies.map((candidate) => (
              <button
                className={`family-button tone-${candidate.group} ${candidate.id === family?.id ? "active" : ""}`}
                onClick={() => selectFamily(candidate)}
                type="button"
                key={candidate.id}
              >
                <Pattern family={candidate} compact />
                <span>
                  <strong>{candidate.title}</strong>
                  <small>{familyGroupLabel(candidate, locale)}</small>
                </span>
                <i>→</i>
              </button>
            ))}
          </div>
        </aside>

        <section className="workspace">
          <div className="workspace-toolbar">
            <div>
              {family ? (
                <span className={`family-chip tone-${family.group}`}>
                  {familyRelation === "exact"
                    ? familyGroupLabel(family, locale)
                    : text("производный квадрат", "derived square")}
                </span>
              ) : (
                <span className="family-chip manual-chip">
                  {text("свободный режим", "free mode")}
                </span>
              )}
              <h2>{family ? family.title : "Magic3(E, x, y)"}</h2>
              {family && normalization > 1n && (
                <span className="family-normalization">
                  {text("нормировка", "normalization")} ÷
                  {formatInteger(normalization)}
                </span>
              )}
            </div>
            <button className="icon-button" type="button" onClick={copyLink}>
              {copied
                ? text("Скопировано", "Copied")
                : text("Поделиться ↗", "Share ↗")}
            </button>
          </div>

          <div className="workbench-grid">
            <aside className="control-desk">
              <section className="tool-section coordinate-section">
                <div className="tool-section-heading">
                  <div>
                    <span>{text("Текущий квадрат", "Current square")}</span>
                    <small>
                      {text(
                        "три координаты определяют девять клеток",
                        "three coordinates determine all nine cells",
                      )}
                    </small>
                  </div>
                  <code>Magic3</code>
                </div>
                <form className="coordinate-form" onSubmit={submitCoordinates}>
                  <div className="coordinate-grid">
                    {(["E", "x", "y"] as const).map((name, index) => (
                      <label key={name}>
                        <span>{name}</span>
                        <input
                          aria-label={`${text("Координата", "Coordinate")} ${name}`}
                          inputMode="numeric"
                          value={coordinateInputs[index]}
                          onChange={(event) => {
                            const next = [...coordinateInputs] as [
                              string,
                              string,
                              string,
                            ];
                            next[index] = event.target.value;
                            setCoordinateInputs(next);
                          }}
                        />
                        <small>
                          {index === 0
                            ? text("центр", "center")
                            : index === 1
                              ? text("ось x", "x axis")
                              : text("ось y", "y axis")}
                        </small>
                      </label>
                    ))}
                  </div>
                  <div className="tool-actions primary-actions">
                    <button className="button button-primary" type="submit">
                      {text("Задать", "Set")}
                    </button>
                    <button
                      className="button button-quiet"
                      type="button"
                      onClick={toggleFactorization}
                    >
                      {factorized
                        ? text("Показать числа", "Show values")
                        : text("Факторизовать", "Factor")}
                    </button>
                    <button
                      className="button button-quiet"
                      type="button"
                      onClick={minimize}
                    >
                      {text("Минимизировать", "Minimize")}
                    </button>
                  </div>
                  {factorized && factorizationRunning && (
                    <div className="factorization-progress" role="status">
                      <span>
                        <i aria-hidden="true" />
                        {text(
                          "Факторизация выполняется в фоне",
                          "Factoring in the background",
                        )}
                      </span>
                      <button
                        className="button button-quiet"
                        type="button"
                        onClick={cancelFactorization}
                      >
                        {text("Отменить", "Cancel")}
                      </button>
                    </div>
                  )}
                  {family && (
                    <label className="minimize-preference">
                      <input
                        type="checkbox"
                        checked={autoPreserveMinimize}
                        onChange={(event) =>
                          toggleAutoPreserveMinimize(event.target.checked)
                        }
                      />
                      <span>
                        <strong>
                          {text(
                            "Всегда минимизировать с сохранением маски",
                            "Always minimize while preserving the mask",
                          )}
                        </strong>
                        <small>
                          {text(
                            "автоматически для каждого нового результата семейства",
                            "automatically for every new family result",
                          )}
                        </small>
                      </span>
                    </label>
                  )}
                </form>
                {minimizationNotice && family && (
                  <div
                    className={`minimization-notice ${minimizationNotice.kind}`}
                    role="status"
                  >
                    <strong>
                      {minimizationNotice.kind === "primitive"
                        ? text(
                            "Квадрат уже примитивен",
                            "The square is already primitive",
                          )
                        : minimizationNotice.kind === "derived"
                          ? text(
                              "Выполнена полная минимизация",
                              "Full minimization applied",
                            )
                          : minimizationNotice.kind === "unavailable"
                            ? text(
                                "НОД слишком велик для быстрого разложения",
                                "The gcd is too large for quick factorization",
                              )
                            : text(
                                "Квадратная маска сохранена",
                                "The square-valued mask is preserved",
                              )}
                    </strong>
                    <p>
                      {minimizationNotice.kind === "primitive"
                        ? text(
                            "Общий делитель координат равен 1.",
                            "The coordinates have common divisor 1.",
                          )
                        : minimizationNotice.kind === "derived"
                          ? text(
                              `Координаты разделены на ${formatInteger(minimizationNotice.dividedBy)}. Квадрат остаётся связан с исходным семейством, но его квадратная маска больше не гарантируется.`,
                              `The coordinates were divided by ${formatInteger(minimizationNotice.dividedBy)}. The square remains linked to its source family, but its square-valued mask is no longer guaranteed.`,
                            )
                          : minimizationNotice.kind === "unavailable"
                            ? text(
                                "Можно выполнить полную минимизацию, но она может снять квадратность отмеченных клеток.",
                                "Full minimization is still available, but it may remove square-valuedness from the marked cells.",
                              )
                            : text(
                                `Координаты разделены на квадратный делитель ${formatInteger(minimizationNotice.dividedBy)}.`,
                                `The coordinates were divided by the square divisor ${formatInteger(minimizationNotice.dividedBy)}.`,
                              )}
                    </p>
                    {minimizationNotice.remainingDivisor > 1n && (
                      <button
                        className="button button-quiet"
                        type="button"
                        onClick={minimizeFully}
                      >
                        {text(
                          `Минимизировать полностью ÷${formatInteger(minimizationNotice.remainingDivisor)}`,
                          `Minimize fully ÷${formatInteger(minimizationNotice.remainingDivisor)}`,
                        )}
                      </button>
                    )}
                  </div>
                )}
                <div className="transform-tools">
                  <span>{text("Преобразования", "Transformations")}</span>
                  <div>
                    <button
                      type="button"
                      aria-label={text("Повернуть влево", "Rotate left")}
                      onClick={() =>
                        transformCoordinates(([e, x, y]) => [e, -y, x])
                      }
                    >
                      ↺ {text("Влево", "Left")}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        transformCoordinates(([e, x, y]) => [e, y, x])
                      }
                    >
                      ↔ {text("Отразить", "Reflect")}
                    </button>
                    <button
                      type="button"
                      aria-label={text("Повернуть вправо", "Rotate right")}
                      onClick={() =>
                        transformCoordinates(([e, x, y]) => [e, y, -x])
                      }
                    >
                      {text("Вправо", "Right")} ↻
                    </button>
                  </div>
                  <div className="multiply-tool">
                    <label>
                      <span>{text("Умножить на", "Multiply by")}</span>
                      <input
                        aria-label={text("Множитель", "Multiplier")}
                        inputMode="numeric"
                        value={scale}
                        onChange={(event) => setScale(event.target.value)}
                      />
                    </label>
                    <button type="button" onClick={multiply}>
                      {text("Применить", "Apply")}
                    </button>
                  </div>
                </div>
              </section>

              {family && (
                <section className="tool-section family-parameter-section">
                  <div className="tool-section-heading">
                    <div>
                      <span>
                        {text("Параметры", "Parameters")} {family.title}
                      </span>
                      <small>
                        {familyRelation === "derived"
                          ? text(
                              "исходные параметры; применение восстановит семейство",
                              "source parameters; applying them restores the family",
                            )
                          : normalization > 1n
                            ? text(
                                `формула применяется с нормировкой ÷${formatInteger(normalization)}`,
                                `the formula is applied with normalization ÷${formatInteger(normalization)}`,
                              )
                            : text(
                                "пресет пересчитывает E, x, y",
                                "the preset recomputes E, x, and y",
                              )}
                      </small>
                    </div>
                    <Pattern family={family} compact />
                  </div>
                  <form className="parameter-form" onSubmit={submitFamily}>
                    <div className="parameter-row">
                      {PARAMETER_KEYS.map((key, index) => {
                        const role = parameterGuide?.roles.find((candidate) =>
                          candidate.indices.includes(index),
                        );
                        const symbol = parameterGuide?.symbols?.[index] ?? key;
                        return (
                          <label
                            key={key}
                            className={`parameter-input parameter-tone-${role?.tone ?? "neutral"}`}
                            title={role?.description}
                          >
                            <span>{symbol}</span>
                            <input
                              aria-label={`${text("Параметр", "Parameter")} ${symbol}`}
                              inputMode="numeric"
                              value={parameters[index]}
                              onChange={(event) => {
                                const next = [...parameters] as [
                                  string,
                                  string,
                                  string,
                                  string,
                                ];
                                next[index] = event.target.value;
                                setParameters(next);
                              }}
                            />
                          </label>
                        );
                      })}
                    </div>
                    {parameterGuide && (
                      <div className="parameter-compact-tools">
                        {parameterGuide.roles.map(
                          (role) =>
                            role.swapEffect &&
                            role.indices.length === 2 && (
                              <button
                                className={`button parameter-swap parameter-tone-${role.tone}`}
                                type="button"
                                title={role.swapEffect}
                                onClick={() =>
                                  swapWithinParameters(
                                    role.indices[0],
                                    role.indices[1],
                                  )
                                }
                                key={role.indices.join("-")}
                              >
                                {parameterGuide.symbols?.[role.indices[0]] ??
                                  PARAMETER_KEYS[role.indices[0]]}
                                {" ↔ "}
                                {parameterGuide.symbols?.[role.indices[1]] ??
                                  PARAMETER_KEYS[role.indices[1]]}
                              </button>
                            ),
                        )}
                        {parameterGuide.exchange && (
                          <button
                            className="button parameter-swap parameter-tone-neutral"
                            type="button"
                            title={parameterGuide.exchange.effect}
                            onClick={swapPairs}
                          >
                            (
                            {parameterGuide.symbols?.[0] ?? PARAMETER_KEYS[0]},
                            {parameterGuide.symbols?.[1] ?? PARAMETER_KEYS[1]})
                            {" ↔ "}(
                            {parameterGuide.symbols?.[2] ?? PARAMETER_KEYS[2]},
                            {parameterGuide.symbols?.[3] ?? PARAMETER_KEYS[3]})
                          </button>
                        )}
                        <details className="parameter-help-popover">
                          <summary
                            aria-label={text(
                              "Пояснить параметры",
                              "Explain parameters",
                            )}
                            title={text(
                              "Пояснить параметры",
                              "Explain parameters",
                            )}
                          >
                            ?
                          </summary>
                          <div className="parameter-help-panel">
                            {parameterGuide.roles.map((role) => (
                              <section key={role.indices.join("-")}>
                                <strong>
                                  <i
                                    className={`proof-swatch ${role.tone}`}
                                    aria-hidden="true"
                                  />
                                  {role.title}
                                </strong>
                                <p>{role.description}</p>
                                {role.swapEffect && (
                                  <small>
                                    <b>↔</b> {role.swapEffect}
                                  </small>
                                )}
                              </section>
                            ))}
                            {parameterGuide.exchange && (
                              <section>
                                <strong>
                                  {text(
                                    "Обмен пар",
                                    "Pair exchange",
                                  )}
                                </strong>
                                <p>{parameterGuide.exchange.effect}</p>
                              </section>
                            )}
                          </div>
                        </details>
                      </div>
                    )}
                    <div className="tool-actions">
                      <button className="button button-secondary" type="submit">
                        {text("Применить семейство", "Apply family")}
                      </button>
                      <button
                        className="button button-quiet"
                        type="button"
                        onClick={randomize}
                      >
                        {text("Случайные", "Randomize")}
                      </button>
                    </div>
                  </form>
                </section>
              )}

              <section className="source-note">
                <span
                  className={`proof-icon ${family?.proofStatus === "legacy-formula" ? "legacy" : ""}`}
                >
                  {family
                    ? family.proofStatus === "proof-core"
                      ? "✓"
                      : family.proofStatus === "browser-certificate"
                        ? "✓"
                      : "∑"
                    : "E"}
                </span>
                <div>
                  <strong>
                    {family && familyRelation === "derived"
                      ? text(
                          `Производный квадрат из семейства ${family.title}`,
                          `Derived square from family ${family.title}`,
                        )
                      : family
                      ? family.proofStatus === "proof-core"
                        ? text("Символьный сертификат", "Symbolic certificate")
                        : family.proofStatus === "browser-certificate"
                          ? text(
                              "Точный алгебраический сертификат",
                              "Exact algebraic certificate",
                            )
                          : text(
                              "Legacy-формула · формализация ожидается",
                              "Legacy formula · formalization pending",
                            )
                      : text(
                          "Свободный координатный режим",
                          "Free coordinate mode",
                        )}
                  </strong>
                  <code>
                    {family
                      ? familyRelation === "derived"
                        ? `source = ${family.title}; normalization ÷${normalization}`
                        : family.theorem
                      : "square = Magic3(E, x, y)"}
                  </code>
                  <p>
                    {family && familyRelation === "derived"
                      ? text(
                          "Сохранены исходные параметры и доказательство семейства. Полная минимизация дала примитивный квадрат, но текущая маска проверяется заново и не наследуется автоматически.",
                          "The source parameters and family proof are preserved. Full minimization produced a primitive square, but the current mask is checked afresh and is not inherited automatically.",
                        )
                      : family
                      ? familySummary(family, locale)
                      : text(
                          "Специальная квадратная маска не заявляется: исследуется произвольная целочисленная тройка.",
                          "No special square-valued mask is claimed: this mode explores an arbitrary integral triple.",
                        )}
                  </p>
                  {family && (
                    <a className="source-proof-link" href="#family-proof">
                      {text("Полный текст доказательства", "Full proof text")} ↓
                    </a>
                  )}
                </div>
              </section>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
            </aside>

            <div className="square-desk">
              <div
                className="coordinate-ledger"
                aria-label={text("Координаты квадрата", "Square coordinates")}
              >
                {(["E", "x", "y"] as const).map((name, index) => (
                  <span key={name}>
                    <small>{name}</small>
                    <strong>{formatInteger(coordinates[index])}</strong>
                  </span>
                ))}
              </div>

              <div className="square-stage">
                <div className="stage-meta">
                  <span>
                    {text("Матрица", "Matrix")} 3 × 3 ·{" "}
                    {factorized
                      ? text("факторизации", "factorizations")
                      : text("значения", "values")}
                  </span>
                  <span>Σ = {formatInteger(snapshot.magicSum)}</span>
                </div>
                <div className="result-grid">
                  {snapshot.cells.map((cell, index) => (
                    <ResultCell
                      cell={cell}
                      declared={
                        family?.positions.includes(cell.position) ?? false
                      }
                      factorized={factorized}
                      factorization={factorizations[index]}
                      key={cell.position}
                    />
                  ))}
                </div>
                <p className="square-legend">
                  <i />{" "}
                  {text(
                    "кирпичная рамка отмечает значение — полный квадрат",
                    "a brick-red frame marks a value that is a perfect square",
                  )}
                </p>
              </div>

              <div className="verification-grid">
                <StatusCard
                  label={text("Магический инвариант", "Magic invariant")}
                  value={
                    snapshot.lineSumsAgree
                      ? text("8 линий совпадают", "all 8 line sums agree")
                      : text("Нарушен", "Violated")
                  }
                  ok={snapshot.lineSumsAgree}
                />
                <StatusCard
                  label={text("Заявленная маска", "Declared mask")}
                  value={
                    family
                      ? `${family.mask} · ${declaredMaskHolds ? text("подтверждена", "confirmed") : text("нарушена", "violated")}`
                      : text("свободная конфигурация", "free configuration")
                  }
                  ok={declaredMaskHolds ?? true}
                  neutral={!family}
                />
                <StatusCard
                  label={text("Фактический результат", "Actual result")}
                  value={`${snapshot.squarePositions.length}/9 ${text("квадратов", "squares")}`}
                  ok={
                    family
                      ? snapshot.squarePositions.length >= family.level
                      : snapshot.squarePositions.length >= 4
                  }
                  neutral={!family}
                />
                <StatusCard
                  label={text("Невырожденность", "Nondegeneracy")}
                  value={
                    snapshot.entriesDistinct
                      ? text("9 попарно различных", "9 pairwise-distinct entries")
                      : text("Есть равные клетки", "Some cell values coincide")
                  }
                  ok={snapshot.entriesDistinct}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {family && (
        <section className="inline-family-proof" id="family-proof">
          <FamilyProofDocument family={family} />
        </section>
      )}
      {factorizationWarning && (
        <FactorizationWarningDialog
          warning={factorizationWarning}
          onCancel={cancelFactorization}
          onContinue={continueFactorization}
        />
      )}
    </div>
  );
}

function ResultCell({
  cell,
  declared,
  factorized,
  factorization,
}: {
  cell: SquareCell;
  declared: boolean;
  factorized: boolean;
  factorization?: string;
}) {
  const { text } = useLocale();
  const display = factorized
    ? (factorization ?? "…")
    : formatInteger(cell.value);
  const digits = display.length;
  return (
    <div
      className={`result-cell ${cell.isSquare ? "is-square" : ""} ${declared ? "is-declared" : ""}`}
      title={
        factorized && factorization === undefined
          ? text("Ожидает факторизации", "Waiting for factorization")
          : undefined
      }
    >
      <span className="cell-position">{cell.position}</span>
      <strong className={digits > 18 ? "tiny" : digits > 11 ? "small" : ""}>
        {display}
      </strong>
    </div>
  );
}

function FactorizationWarningDialog({
  warning,
  onCancel,
  onContinue,
}: {
  warning: FactorizationWarning;
  onCancel: () => void;
  onContinue: () => void;
}) {
  const { text } = useLocale();
  const minute = warning.thresholdMs === ONE_MINUTE;
  const estimatedSeconds =
    warning.estimatedMs !== undefined &&
    Number.isFinite(warning.estimatedMs)
      ? Math.max(1, Math.ceil(warning.estimatedMs / 1000))
      : null;
  return (
    <div className="factorization-warning-backdrop">
      <section
        className="factorization-warning-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="factorization-warning-title"
      >
        <span className="factorization-warning-mark" aria-hidden="true">
          !
        </span>
        <div>
          <p className="eyebrow">
            {text(
              "Предохранитель вычисления",
              "Computation safeguard",
            )}
          </p>
          <h2 id="factorization-warning-title">
            {warning.source === "estimate"
              ? minute
                ? text(
                    "Верхняя оценка превышает минуту",
                    "The upper estimate exceeds one minute",
                  )
                : text(
                    "Верхняя оценка превышает 10 секунд",
                    "The upper estimate exceeds 10 seconds",
                  )
              : minute
                ? text(
                    "Факторизация выполняется уже минуту",
                    "Factorization has been running for one minute",
                  )
                : text(
                    "Факторизация выполняется уже 10 секунд",
                    "Factorization has been running for 10 seconds",
                  )}
          </h2>
          <p>
            {warning.source === "estimate"
              ? text(
                  `Оценка построена по худшему случаю пробного деления${estimatedSeconds === null ? "" : `: около ${estimatedSeconds} с`}. Малый делитель может значительно ускорить расчёт.`,
                  `The estimate uses the worst case for trial division${estimatedSeconds === null ? "" : `: about ${estimatedSeconds} s`}. A small divisor can make the actual computation much faster.`,
                )
              : text(
                  "Расчёт приостановлен без потери уже найденных множителей. Можно продолжить с того же места.",
                  "The computation is paused without losing factors already found. It can resume from the same point.",
                )}
          </p>
          <p>
            {text(
              "Вычисление выполняется в отдельном потоке и не блокирует страницу.",
              "The computation runs in a separate worker and does not block the page.",
            )}
          </p>
          <div className="factorization-warning-actions">
            <button
              className="button button-quiet"
              type="button"
              onClick={onCancel}
            >
              {text("Не вычислять", "Do not factor")}
            </button>
            <button
              className="button button-primary"
              type="button"
              onClick={onContinue}
            >
              {minute
                ? text(
                    "Продолжить без лимита",
                    "Continue without a limit",
                  )
                : warning.source === "elapsed"
                  ? text(
                      "Продолжить до минуты",
                      "Continue up to one minute",
                    )
                  : text("Начать вычисление", "Start factoring")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatusCard({
  label,
  value,
  ok,
  neutral = false,
}: {
  label: string;
  value: string;
  ok: boolean;
  neutral?: boolean;
}) {
  return (
    <div className="status-card">
      <span className={neutral ? "neutral" : ok ? "ok" : "bad"}>
        {neutral ? "·" : ok ? "✓" : "!"}
      </span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Pattern({ family, compact = false }: { family: FamilyDefinition; compact?: boolean }) {
  const { locale, text } = useLocale();
  const positions = "ABCDEFGHJ";
  return (
    <span
      className={`pattern ${compact ? "compact" : ""}`}
      aria-label={`${text("Доказательные опоры маски", "Proof supports for mask")} ${family.mask}`}
    >
      {Array.from(positions, (position) => {
        const supports = family.justifications.filter((item) =>
          item.positions.some((candidate) => candidate === position),
        );
        return (
          <i
            className={family.mask.includes(position) ? "on" : ""}
            key={position}
            title={
              supports
                .map((item) => justificationLabel(item, locale))
                .join(" + ") || undefined
            }
          >
            {supports.map((item) => (
              <span className={`proof-color ${item.color}`} key={item.id} />
            ))}
          </i>
        );
      })}
    </span>
  );
}

function FamilyRedirect() {
  const { familyId } = useParams();
  const family = findFamilyById(familyId);
  if (!family) return <Navigate to="/lab" replace />;
  return <Navigate to={`${orbitPath(family.id)}#family-proof`} replace />;
}

function OrbitFamilyPage() {
  const { level, familyId } = useParams();
  const family = findFamilyById(familyId);
  if (!family || String(family.level) !== level) return <NotFoundPage />;
  return <LabPage key={`${level}/${family.id}`} routeFamilyId={family.id} />;
}

function FamilyProofDocument({ family }: { family: FamilyDefinition }) {
  const { locale, text } = useLocale();
  const proof = familyProof(family, locale);
  const squareStatement = String.raw`\{${family.positions.join(",")}\}\subseteq\{P:\mathcal M_P(E,x,y)=r_P^2\}`;
  const projection = String.raw`\pi_{${family.mask}}\!\left(\mathcal M(E,x,y)\right)=(${family.positions.join(",")})\in\{n^2:n\in\mathbb Z\}^{${family.level}}`;
  const cellSystem =
    proof.cellSystem ??
    String.raw`\left\{\begin{aligned}${family.positions
      .map((position) => `${CELL_FORM_LATEX[position]}&=q_${position}^2`)
      .join(String.raw`,\\`)}.\end{aligned}\right.`;
  return (
    <article className="proof-document">
      <header>
        <p>{text("Семейство", "Family")} {family.mask}</p>
        <h2>
          {text("Теорема и полное доказательство", "Theorem and complete proof")}
        </h2>
        <Link className="general-proof-link" to="/proofs/general">
          {text(
            "Общая теория орбит 4/9 и 5/9",
            "General theory of the 4/9 and 5/9 orbits",
          )}{" "}
          →
        </Link>
      </header>

      <section>
        <h3>{text("Утверждение", "Statement")}</h3>
        <p>
          {text(
            `При указанных ниже условиях формулы задают целочисленный магический квадрат порядка 3, в котором как минимум все ${family.level} клетки маски ${family.mask} являются квадратами целых чисел. Квадратность остальных клеток не запрещается.`,
            `Under the assumptions below, the formulas define an integral magic square of order 3 in which at least all ${family.level} cells of the ${family.mask} mask are squares of integers. Other cells are allowed to be squares as well.`,
          )}
        </p>
        <Latex display>{squareStatement}</Latex>
        <p>{proof.assumptions}</p>
      </section>

      <section>
        <h3>
          {text(
            "Исходная система и исключение E, x, y",
            "Initial system and elimination of E, x, y",
          )}
        </h3>
        <p>
          {text(
            "Для каждой отмеченной клетки вводим целый корень и подставляем соответствующую линейную форму Magic3. Получаем систему:",
            "For every marked cell, introduce an integral root and substitute the corresponding Magic3 linear form. This gives the system:",
          )}
        </p>
        <Latex display>{cellSystem}</Latex>
        <p>
          {text(
            `Матрица коэффициентов при E, x, y имеет ранг 3. Поэтому после их исключения остаётся ${family.level - 3} независимых однородных квадратичных ${family.level === 4 ? "уравнение" : "уравнения"} на корнях. Ниже они выводятся и одновременно параметризуются.`,
            `The coefficient matrix of E, x, and y has rank 3. Eliminating them therefore leaves ${family.level - 3} independent homogeneous quadratic ${family.level === 4 ? "equation" : "equations"} in the roots. The equations are derived and parametrized below.`,
          )}
        </p>
      </section>

      <section>
        <h3>{text("Вывод параметризации корней", "Derivation of the root parametrization")}</h3>
        <p>
          {text(
            "Введём следующие вспомогательные целые величины:",
            "Introduce the following auxiliary integers:",
          )}
        </p>
        {proof.definitions.map((formula) => (
          <Latex display key={formula}>{formula}</Latex>
        ))}
        <p>
          {text(
            "Значения заявленных клеток определим как явные квадраты:",
            "Define the declared cell values as the following explicit squares:",
          )}
        </p>
        <Latex display>{proof.squareValues}</Latex>
        <p>{proof.identityDerivation}</p>
        {proof.identities.map((identity) => (
          <Latex display key={identity}>{identity}</Latex>
        ))}
        {proof.parameterDerivation && <p>{proof.parameterDerivation}</p>}
      </section>

      <section>
        <h3>{text("Восстановление магического квадрата", "Reconstruction of the magic square")}</h3>
        <p>
          {text(
            "Используем стандартную трёхкоординатную форму:",
            "Use the standard three-coordinate form:",
          )}
        </p>
        <Latex display>{MAGIC3_LATEX}</Latex>
        <p>
          {text(
            "Положим координаты равными следующей линейной комбинации уже построенных квадратных значений:",
            "Set the coordinates equal to the following linear combination of the square values already constructed:",
          )}
        </p>
        <Latex display>{family.reconstructionLatex}</Latex>
        {proof.parityClearance && (
          <>
            <p>
              {text(
                "Если одно из делений на 2 нецелое, умножим каждый выписанный корень на 2. Тогда все значения клеток умножатся на 4, все однородные тождества сохранятся, а числители станут чётными. Именно эту нормализацию выполняет генератор.",
                "If a division by 2 is not integral, multiply every displayed root by 2. All cell values are then multiplied by 4, every homogeneous identity is preserved, and the numerators become even. This is exactly the normalization performed by the generator.",
              )}
            </p>
            <Latex display>{String.raw`q_P\mapsto2q_P,\qquad P=q_P^2\mapsto4P`}</Latex>
          </>
        )}
        {proof.integralityClearance && <p>{proof.integralityClearance}</p>}
        <p>
          {text(
            "Общая линейная лемма используется здесь прямо: если матрица выбранных клеточных форм имеет ранг 3, то вектор их значений принадлежит её образу тогда и только тогда, когда обращаются в нуль все элементы левого ядра. Для четырёх клеток левое ядро одномерно, для пяти — двумерно. Выписанные выше цветовые тождества образуют именно этот базис, а указанные формулы E, x, y дают единственный прообраз.",
            "The general linear lemma is applied directly: when the selected cell-form matrix has rank 3, its value vector lies in the image exactly when every vector in the left kernel annihilates it. The left kernel has dimension one for four cells and two for five cells. The colored identities above form precisely such a basis, while the displayed formulas for E, x, and y give the unique preimage.",
          )}
        </p>
        <Latex display>{String.raw`L_S(E,x,y)^T=(q_P^2)_{P\in S},\qquad \ker L_S^T=\langle R_1,\ldots,R_{${family.level - 3}}\rangle`}</Latex>
        <p>
          {text(
            "Теперь подставляем координаты в девять линейных форм Magic3. Поэтому",
            "Now substitute the coordinates into the nine Magic3 linear forms. Therefore",
          )}
        </p>
        <Latex display>{projection}</Latex>
        <p>
          {text(
            `Каждая строка, каждый столбец и обе диагонали имеют сумму 3E по самой форме Magic3. Следовательно, получена требуемая семья магических квадратов с квадратной маской ${family.mask}. Что и требовалось доказать.`,
            `By the Magic3 form itself, every row, every column, and both diagonals sum to 3E. We have therefore obtained the required family of magic squares with square-valued mask ${family.mask}. This proves the claim.`,
          )}
        </p>
      </section>

      <section className="proof-references">
        <h3>
          {text(
            "Цветовые леммы, применённые в этом доказательстве",
            "Color lemmas used in this proof",
          )}
        </h3>
        {family.justifications.map((item) => {
          const common = commonProofById(item.commonProofId, locale);
          if (!common) return null;
          return (
            <section className="inline-lemma" key={item.id}>
              <h4>{justificationLabel(item, locale)}</h4>
              <Latex display>{item.relationLatex}</Latex>
              <p>{common.summary}</p>
              {common.formulas.map((formula) => (
                <Latex display key={formula}>{formula}</Latex>
              ))}
              <p>
                {text(
                  `В текущей маске переменные леммы заменяются клетками ${item.positions.join(", ")}; её заключение — именно выписанное выше клеточное равенство.`,
                  `In this mask, the lemma variables are replaced by cells ${item.positions.join(", ")}; its conclusion is exactly the cell relation displayed above.`,
                )}
              </p>
              <Link to={`/proofs/${item.commonProofId}`}>
                {text(
                  "Общая формулировка и доказательство",
                  "General statement and proof",
                )}{" "}
                →
              </Link>
            </section>
          );
        })}
      </section>

      <section>
        <h3>{text("Полнота покрытия", "Coverage completeness")}</h3>
        {proof.coverage ? (
          <>
            <p>
              <strong>
                {proof.coverage.status === "complete"
                  ? text("Статус: полное покрытие.", "Status: complete coverage.")
                  : text(
                      "Статус: точное условное покрытие.",
                      "Status: exact conditional coverage.",
                    )}
              </strong>{" "}
              {text(
                "Здесь полнота относится к рациональным векторам корней; целые представители получаются очисткой знаменателей и общим масштабированием.",
                "Completeness here refers to rational root vectors; integral representatives are obtained by clearing denominators and applying a common scale.",
              )}
            </p>

            <h4>
              {text(
                "Максимально широкое гарантированное подмножество",
                "Broadest guaranteed subset",
              )}
            </h4>
            <p>{proof.coverage.guaranteedSubset}</p>
            {proof.coverage.conditions.map((condition) => (
              <Latex display key={condition}>{condition}</Latex>
            ))}

            <h4>{text("Обратный ход", "Inverse construction")}</h4>
            <p>{proof.coverage.inverseArgument}</p>

            <h4>
              {text(
                "Что остаётся вне гарантии",
                "What remains outside the guarantee",
              )}
            </h4>
            <p>{proof.coverage.exceptionalLocus}</p>
            {proof.coverage.exceptionalConditions.map((condition) => (
              <Latex display key={condition}>{condition}</Latex>
            ))}
            <p>{proof.coverage.conclusion}</p>
          </>
        ) : (
          <p>
            {proof.coverageText ??
              text(
                "Данная формула задаёт доказанное параметрическое подсемейство. Точная область обратимости ещё не зафиксирована.",
                "This formula defines a proved parametric subfamily. Its exact inverse domain has not yet been recorded.",
              )}
          </p>
        )}
      </section>

      <footer>
        <span>
          {family.proofStatus === "proof-core"
            ? text(
                "Текст согласован с универсальным полиномиальным сертификатом proof-core.",
                "This text agrees with a universal polynomial certificate in proof-core.",
              )
            : family.proofStatus === "browser-certificate"
              ? text(
                  "Формулы проверяются точным целочисленным сертификатом браузерного генератора; перенос в proof-core ещё не завершён.",
                  "The formulas are checked by an exact integral certificate in the browser generator; migration to proof-core is not complete yet.",
                )
              : text(
                  "Текст восстанавливает legacy-параметризацию; перенос машинного сертификата в proof-core ещё не завершён.",
                  "The text reconstructs a legacy parametrization; its machine certificate has not yet been migrated to proof-core.",
                )}
        </span>
        <code>{family.theorem}</code>
      </footer>
    </article>
  );
}

function atlasSourceSystem(family: FamilyDefinition): string {
  const equations = family.positions
    .map(
      (position) =>
        `${CELL_FORM_LATEX[position]}&=${position.toLowerCase()}^2`,
    )
    .join(String.raw`\\`);
  return String.raw`\left\{\begin{aligned}${equations}\end{aligned}\right.`;
}

function atlasQuadric(relation: string): string {
  return relation.replace(
    /[ABCDEFGHJ]/g,
    (position) => `${position.toLowerCase()}^2`,
  );
}

const ATLAS_POSITIONS = Array.from("ABCDEFGHJ") as Position[];

function transformAtlasPosition(
  position: Position,
  rotation: number,
  reflected: boolean,
): Position {
  const index = ATLAS_POSITIONS.indexOf(position);
  let row = Math.floor(index / 3);
  let column = index % 3;
  if (reflected) column = 2 - column;
  for (let turn = 0; turn < rotation; turn += 1) {
    [row, column] = [column, 2 - row];
  }
  return ATLAS_POSITIONS[row * 3 + column];
}

function canonicalAtlasMask(positions: readonly Position[]): string {
  const images: string[] = [];
  for (const reflected of [false, true]) {
    for (let rotation = 0; rotation < 4; rotation += 1) {
      images.push(
        positions
          .map((position) =>
            transformAtlasPosition(position, rotation, reflected),
          )
          .sort()
          .join(""),
      );
    }
  }
  return images.sort()[0];
}

const FOUR_ORBITS_BY_CANONICAL_MASK = new Map(
  FOUR_FAMILIES.map((family) => [canonicalAtlasMask(family.positions), family]),
);

function complementaryFourOrbit(
  family: FamilyDefinition,
): FamilyDefinition | undefined {
  const complement = ATLAS_POSITIONS.filter(
    (position) => !family.positions.includes(position),
  );
  return FOUR_ORBITS_BY_CANONICAL_MASK.get(canonicalAtlasMask(complement));
}

function OrbitAtlas({
  title,
  families,
}: {
  title: string;
  families: readonly FamilyDefinition[];
}) {
  const { locale, text } = useLocale();
  const legendItems = Array.from(
    new Map(
      families.flatMap((family) =>
        family.justifications.map((item) => [item.color, item] as const),
      ),
    ).values(),
  );
  return (
    <section className={`orbit-atlas orbit-atlas-${families[0]?.level ?? 4}`}>
      <header className="orbit-atlas-header">
        <div>
          <p className="eyebrow">{text("Доказательная таблица", "Proof table")}</p>
          <h4>{title}</h4>
        </div>
        <p>
          {text(
            "Цвет клетки совпадает с цветом квадрики, в которую входит её квадратное значение. Пересечение двух опор делится между двумя цветами.",
            "Each cell uses the color of the quadric containing its square value. An intersection of two supports is split between both colors.",
          )}
        </p>
        <div className="orbit-atlas-legend">
          <span>
            {text(
              "Верхний блок — исходная система; цветные полосы — квадрики:",
              "Upper block: original system; colored bars: quadrics:",
            )}
          </span>
          {legendItems.map((item) => (
            <span key={item.color}>
              <i className={`proof-swatch ${item.color}`} />
              {justificationLabel(item, locale)}
            </span>
          ))}
        </div>
      </header>
      <div className="orbit-atlas-scroll-shell">
        <div
          className="orbit-atlas-scroll"
          role="region"
          aria-label={text(
            `${title}: горизонтальная прокрутка`,
            `${title}: horizontally scrollable sheet`,
          )}
          tabIndex={0}
        >
          <div className="orbit-atlas-grid" role="list" aria-label={title}>
            {families.map((family, index) => {
              const complement =
                family.level === 5 ? complementaryFourOrbit(family) : undefined;
              const description = complement
                ? text(
                    `Дополнение к типу 4/9 «${familyOrbitDescription(complement, locale)}»`,
                    `Complement of the 4/9 type “${familyOrbitDescription(complement, locale)}”`,
                  )
                : familyOrbitDescription(family, locale) ??
                  familyGroupLabel(family, locale);
              return (
                <article
                  className={`orbit-atlas-entry tone-${family.group}`}
                  role="listitem"
                  key={family.id}
                >
                  <header className="orbit-atlas-entry-header">
                    <span className="orbit-atlas-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Pattern family={family} />
                    <div>
                      <Link
                        className="orbit-atlas-title"
                        to={`${orbitPath(family.id)}#family-proof`}
                      >
                        {family.title} →
                      </Link>
                      <p>{description}</p>
                    </div>
                  </header>

                  <div className="orbit-atlas-system">
                    <Latex display>{atlasSourceSystem(family)}</Latex>
                  </div>

                  <div className="orbit-atlas-quadrics">
                    {family.justifications.map((item) => {
                      const label = justificationLabel(item, locale);
                      return (
                        <div
                          aria-label={label}
                          className={`orbit-atlas-relation ${item.color}`}
                          key={item.id}
                          title={label}
                        >
                          <Latex display>{atlasQuadric(item.relationLatex)}</Latex>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SquaresOfSquaresPage() {
  const { text } = useLocale();
  return (
    <article className="page proof-page topic-page">
      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Открытая задача и её частичные формы",
              "The open problem and its partial forms",
            )}
          </p>
          <h1>
            {text(
              "Магический квадрат из квадратов 3×3",
              "The 3×3 magic square of squares",
            )}
          </h1>
          <p>
            {text(
              "Существует ли невырожденный магический квадрат порядка 3, все девять различных целых значений которого являются полными квадратами? Для обычной арифметики эта задача остаётся открытой.",
              "Does there exist a nondegenerate order-3 magic square whose nine distinct integer entries are all perfect squares? Over the ordinary integers, this problem remains open.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document">
        <section>
          <h2>{text("Общая форма", "The general form")}</h2>
          <p>
            {text(
              "Каждый магический квадрат 3×3 однозначно задаётся тремя координатами E, x, y. Центр равен E, а магическая сумма равна 3E:",
              "Every 3×3 magic square is uniquely determined by three coordinates E, x, and y. Its center is E and its magic sum is 3E:",
            )}
          </p>
          <Latex display>{MAGIC3_LATEX}</Latex>
          <p>
            {text(
              "Полная задача 9/9 требует, чтобы все девять линейных форм были различными неотрицательными квадратами целых чисел. Лаборатория позволяет непосредственно изменять E, x, y и проверять получающийся квадрат.",
              "The full 9/9 problem requires all nine linear forms to be distinct nonnegative integer squares. The laboratory exposes E, x, and y directly and checks the resulting square.",
            )}
          </p>
          <div className="topic-actions">
            <Link className="button button-primary" to="/lab">
              {text("Открыть калькулятор", "Open the calculator")} <span>↗</span>
            </Link>
            <Link className="button button-ghost" to="/theory/magic-squares-3x3">
              {text(
                "Доказательство общей формы",
                "Proof of the general form",
              )}
            </Link>
          </div>
        </section>

        <section>
          <h2>
            {text(
              "Почему мы начинаем с 4/9 и 5/9",
              "Why the atlas starts with 4/9 and 5/9",
            )}
          </h2>
          <p>
            {text(
              "Вместо недоказанного существования 9/9 мы фиксируем набор клеток, значения которых гарантированно являются квадратами. Это условие не запрещает остальным клеткам случайно оказаться квадратными: 4/9 и 5/9 обозначают гарантированную маску, а не обязательно точное число квадратных значений.",
              "Instead of assuming an unproved 9/9 solution, we fix a set of cells whose values are guaranteed to be squares. Other cells may also happen to be square-valued: 4/9 and 5/9 describe a guaranteed mask, not necessarily the exact number of square entries.",
            )}
          </p>
          <p>
            {text(
              "Вращения и отражения квадрата образуют группу D₄. С точностью до этого действия существует 23 маски из четырёх клеток и 23 дополнительные к ним маски из пяти клеток.",
              "Rotations and reflections form the group D4. Modulo this action there are 23 four-cell masks and 23 complementary five-cell masks.",
            )}
          </p>
          <div className="topic-route-grid">
            <Link to="/orbits/4">
              <span>4/9</span>
              <strong>{text("23 орбиты четырёх клеток", "23 four-cell orbits")}</strong>
              <i>→</i>
            </Link>
            <Link to="/orbits/5">
              <span>5/9</span>
              <strong>{text("23 орбиты пяти клеток", "23 five-cell orbits")}</strong>
              <i>→</i>
            </Link>
          </div>
        </section>

        <section>
          <h2>{text("Что содержит доказательство", "What the proof contains")}</h2>
          <ul>
            <li>
              {text(
                "полное разложение масок по орбитам D₄ и доказательство отсутствия других орбит;",
                "a complete decomposition into D4 orbits and a proof that no further orbits exist;",
              )}
            </li>
            <li>
              {text(
                "исходную систему уравнений в E, x, y и квадратных корнях;",
                "the original equations in E, x, y, and the square roots;",
              )}
            </li>
            <li>
              {text(
                "исключение E, x, y до одной квадрики для 4/9 и двух независимых квадрик для 5/9;",
                "elimination of E, x, and y to one quadric for 4/9 and two independent quadrics for 5/9;",
              )}
            </li>
            <li>
              {text(
                "явные параметризации, условия применимости и максимально широкие доказанные области покрытия.",
                "explicit parametrizations, applicability assumptions, and the widest proved coverage domains currently available.",
              )}
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}

function BasicMagicTheoryPage() {
  const { text } = useLocale();
  return (
    <article className="page proof-page topic-page basic-theory-page">
      <Link className="back-link" to="/theory">
        ← {text("К оглавлению теории", "Back to theory contents")}
      </Link>
      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Базовая теория", "Basic theory")}
          </p>
          <h1>
            {text(
              "Магические квадраты 3×3 над произвольным носителем",
              "3×3 magic squares over a general carrier",
            )}
          </h1>
          <p>
            {text(
              "Магическая константа, полная форма m(E,x,y), её единственность и точные различия между абелевыми группами, кольцами, полями, вещественными, рациональными и целыми числами.",
              "The magic constant, the complete form m(E,x,y), its uniqueness, and the exact distinctions between abelian groups, rings, fields, and the real, rational, and integer cases.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document basic-theory-document">
        <section>
          <h2>{text("1. Носитель и определение", "1. Carrier and definition")}</h2>
          <p>
            {text(
              "Пусть A — абелева группа в аддитивной записи. Магическим квадратом 3×3 над A назовём таблицу, у которой суммы трёх строк, трёх столбцов и двух главных диагоналей равны одному элементу M∈A. Абелева группа — естественная общая граница теории: в доказательстве нужны сложение, нуль и вычитание, но не нужны умножение, порядок или деление.",
              "Let A be an abelian group written additively. A 3×3 magic square over A is an array whose three row sums, three column sums, and two main diagonal sums are equal to one element M∈A. An abelian group is the natural general setting: the proof needs addition, zero, and subtraction, but it needs no multiplication, order, or division.",
            )}
          </p>
          <Latex display>{String.raw`Q=\begin{pmatrix}A&B&C\\D&E&F\\G&H&J\end{pmatrix},\qquad
A+B+C=\cdots=C+E+G=M.`}</Latex>
          <p>
            {text(
              "Если A является модулем над кольцом R, то сложение квадратов и умножение всех клеток на один скаляр выполняются поклеточно. Полная классификация ниже совместима с этой модульной структурой.",
              "If A is a module over a ring R, squares are added entrywise and every entry may be multiplied by one scalar. The classification below is compatible with this module structure.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Магическая константа", "2. The magic constant")}</h2>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <p>
              {text(
                "В любом магическом квадрате 3×3 над абелевой группой магическая константа равна утроенному центральному элементу:",
                "In every 3×3 magic square over an abelian group, the magic constant is three times the central entry:",
              )}
            </p>
            <Latex display>{String.raw`M=3E.`}</Latex>
          </div>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Обозначим сумму всех девяти клеток через T. Сложение трёх строк даёт T=3M. Теперь сложим среднюю строку, средний столбец и две диагонали. Каждая нецентральная клетка встретится один раз, а центр — четыре раза. Поэтому эта сумма одновременно равна 4M и T+3E:",
              "Let T be the sum of all nine entries. Adding the three rows gives T=3M. Now add the middle row, the middle column, and both diagonals. Every noncentral entry occurs once and the center occurs four times. Hence this sum is both 4M and T+3E:",
            )}
          </p>
          <Latex display>{String.raw`T=3M,\qquad
(D+E+F)+(B+E+H)+(A+E+J)+(C+E+G)=T+3E=4M.`}</Latex>
          <p>
            {text(
              "Подставляя T=3M и сокращая 3M в абелевой группе, получаем M=3E. Деление на 3 здесь не использовалось. Из четырёх линий, проходящих через центр, сразу следует дополнительное равенство противоположных пар:",
              "Substituting T=3M and cancelling 3M in the abelian group gives M=3E. No division by 3 was used. The four lines through the center immediately give the opposite-pair identities:",
            )}
          </p>
          <Latex display>{String.raw`A+J=B+H=C+G=D+F=2E.`}</Latex>
        </section>

        <section>
          <h2>{text("3. Полная форма m(E,x,y)", "3. The complete form m(E,x,y)")}</h2>
          <div className="theorem-block">
            <h3>{text("Теорема о классификации", "Classification theorem")}</h3>
            <p>
              {text(
                "Для любой абелевой группы A каждый магический квадрат 3×3 над A единственным образом представляется в следующем виде, где E,x,y∈A:",
                "For every abelian group A, each 3×3 magic square over A has a unique representation of the following form, with E,x,y∈A:",
              )}
            </p>
            <Latex display>{MAGIC3_LATEX}</Latex>
          </div>
          <h3>
            {text(
              "Сюръективность: каждый магический квадрат имеет эту форму",
              "Surjectivity: every magic square has this form",
            )}
          </h3>
          <p>
            {text(
              "Пусть дан произвольный магический квадрат Q. Положим x=A−E и y=G−E. Тогда A=E+x и G=E+y. Из равенств противоположных пар получаем J=E−x и C=E−y. Нижняя строка и первая колонка затем дают H=E+x−y и D=E−x−y, а противоположные им клетки равны B=E−x+y и F=E+x+y. Тем самым все девять клеток имеют заявленный вид.",
              "Let Q be any magic square and set x=A−E and y=G−E. Then A=E+x and G=E+y. The opposite-pair identities give J=E−x and C=E−y. The bottom row and first column then give H=E+x−y and D=E−x−y, while their opposite entries are B=E−x+y and F=E+x+y. Thus all nine entries have the stated form.",
            )}
          </p>
          <Latex display>{String.raw`\begin{aligned}
x&=A-E,& y&=G-E,\\
A&=E+x,& G&=E+y,\\
J&=2E-A=E-x,& C&=2E-G=E-y,\\
H&=3E-G-J=E+x-y,& B&=2E-H=E-x+y,\\
D&=3E-A-G=E-x-y,& F&=2E-D=E+x+y.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Следовательно, для каждого Q∈𝓜₃(A) найден прообраз (E,x,y), то есть отображение Φₐ:A³→𝓜₃(A) сюръективно.",
              "Consequently every Q∈𝓜₃(A) has a preimage (E,x,y), so the map Φₐ:A³→𝓜₃(A) is surjective.",
            )}
          </p>
          <h3>
            {text(
              "Корректность: каждый набор координат даёт магический квадрат",
              "Well-definedness: every coordinate triple gives a magic square",
            )}
          </h3>
          <p>
            {text(
              "Для любых E,x,y восемь требуемых сумм вычисляются непосредственно. Ни одно из равенств не использует деление:",
              "For arbitrary E,x,y, the eight required sums are computed directly. None of these identities uses division:",
            )}
          </p>
          <Latex display>{String.raw`\begin{aligned}
(E+x)+(E-x+y)+(E-y)&=3E,\\
(E-x-y)+E+(E+x+y)&=3E,\\
(E+y)+(E+x-y)+(E-x)&=3E,\\
(E+x)+(E-x-y)+(E+y)&=3E,\\
(E-x+y)+E+(E+x-y)&=3E,\\
(E-y)+(E+x+y)+(E-x)&=3E,\\
(E+x)+E+(E-x)&=3E,\\
(E-y)+E+(E+y)&=3E.
\end{aligned}`}</Latex>
          <h3>
            {text(
              "Инъективность: координаты единственны",
              "Injectivity: the coordinates are unique",
            )}
          </h3>
          <p>
            {text(
              "Координаты восстанавливаются без выбора и без знаменателей: E — центральная клетка, x=A−E, y=G−E. Поэтому два различных набора координат не могут задавать один квадрат.",
              "The coordinates are recovered without choices or denominators: E is the central entry, x=A−E, and y=G−E. Therefore two different coordinate triples cannot define the same square.",
            )}
          </p>
          <Latex display>{String.raw`(E,x,y)=\bigl(Q_{22},\ Q_{11}-Q_{22},\ Q_{31}-Q_{22}\bigr).`}</Latex>
        </section>

        <section>
          <h2>{text("4. Группа, модуль и векторное пространство", "4. Group, module, and vector space")}</h2>
          <p>
            {text(
              "Обозначим множество магических квадратов 3×3 над A через 𝓜₃(A). Теорема задаёт изоморфизм абелевых групп A³≅𝓜₃(A). Если A — R-модуль, этот изоморфизм R-линеен:",
              "Write 𝓜₃(A) for the set of 3×3 magic squares over A. The theorem gives an isomorphism of abelian groups A³≅𝓜₃(A). If A is an R-module, this isomorphism is R-linear:",
            )}
          </p>
          <Latex display>{String.raw`\begin{aligned}
\Phi_A:A^3&\longrightarrow\mathcal M_3(A),&(E,x,y)&\longmapsto\mathcal M(E,x,y),\\
\mathcal M(E_1,x_1,y_1)+\mathcal M(E_2,x_2,y_2)
&=\mathcal M(E_1+E_2,x_1+x_2,y_1+y_2),\\
r\mathcal M(E,x,y)&=\mathcal M(rE,rx,ry).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Для коммутативного кольца R это свободный R-модуль с тремя явными базисными матрицами:",
              "For a commutative ring R, this is a free R-module with the following three explicit basis matrices:",
            )}
          </p>
          <Latex display>{String.raw`\mathcal M(E,x,y)=E S_0+xS_1+yS_2,`}</Latex>
          <Latex display>{String.raw`S_0=\begin{pmatrix}1&1&1\\1&1&1\\1&1&1\end{pmatrix},\quad
S_1=\begin{pmatrix}1&-1&0\\-1&0&1\\0&1&-1\end{pmatrix},\quad
S_2=\begin{pmatrix}0&1&-1\\-1&0&1\\1&-1&0\end{pmatrix}.`}</Latex>
          <p>
            {text(
              "В частности, над любым полем K пространство 𝓜₃(K) трёхмерно. Это утверждение относится к поклеточному сложению и умножению на скаляр; обычное матричное умножение магические квадраты в общем случае не сохраняет.",
              "In particular, over every field K the space 𝓜₃(K) has dimension three. This statement concerns entrywise addition and scalar multiplication; ordinary matrix multiplication does not in general preserve magic squares.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Различные области коэффициентов", "5. Different scalar domains")}</h2>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Носитель", "Carrier")}</th>
                  <th>{text("Структура", "Structure")}</th>
                  <th>{text("Точное следствие", "Exact consequence")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Latex>{String.raw`A`}</Latex></td>
                  <td>{text("абелева группа", "abelian group")}</td>
                  <td><Latex>{String.raw`\mathcal M_3(A)\cong A^3`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`R`}</Latex></td>
                  <td>{text("коммутативное кольцо", "commutative ring")}</td>
                  <td>{text("свободный R-модуль ранга 3", "free R-module of rank 3")}</td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`K`}</Latex></td>
                  <td>{text("поле", "field")}</td>
                  <td><Latex>{String.raw`\dim_K\mathcal M_3(K)=3`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`\mathbb R`}</Latex></td>
                  <td>{text("упорядоченное поле", "ordered field")}</td>
                  <td>{text("фиксированное M задаёт аффинную плоскость E=M/3", "fixed M gives the affine plane E=M/3")}</td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`\mathbb Q`}</Latex></td>
                  <td>{text("рациональное поле", "rational field")}</td>
                  <td>{text("общий знаменатель переводит квадрат в целочисленный", "a common denominator scales the square to an integral one")}</td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`\mathbb Z`}</Latex></td>
                  <td>{text("свободная абелева группа", "free abelian group")}</td>
                  <td><Latex>{String.raw`\mathcal M_3(\mathbb Z)\cong\mathbb Z^3`}</Latex></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>{text("Вещественные числа", "Real numbers")}</h3>
          <p>
            {text(
              "Над ℝ получаем трёхмерное вещественное векторное пространство. При фиксированной магической константе M координата E=M/3 фиксирована, а x и y свободны, поэтому получается двумерная аффинная плоскость. Положительность клеток задаётся девятью линейными неравенствами, а попарная различность — исключением конечного набора прямых в плоскости (x,y).",
              "Over ℝ one obtains a three-dimensional real vector space. For a fixed magic constant M, the coordinate E=M/3 is fixed while x and y are free, giving a two-dimensional affine plane. Positivity is expressed by nine linear inequalities, while pairwise distinctness removes a finite collection of lines from the (x,y)-plane.",
            )}
          </p>

          <h3>{text("Рациональные числа", "Rational numbers")}</h3>
          <p>
            {text(
              "Рациональные клетки эквивалентны рациональным координатам E,x,y. Умножение на общий знаменатель координат переводит любой рациональный магический квадрат в целочисленный. Если требуется сохранить представление клеток именно рациональными квадратами, берут общий знаменатель их квадратных корней и умножают весь квадрат на квадрат этого знаменателя.",
              "Rational entries are equivalent to rational coordinates E,x,y. Multiplying by a common denominator of the coordinates turns any rational magic square into an integral one. To preserve the stronger property that the entries are rational squares, take a common denominator of their square roots and multiply the whole square by the square of that denominator.",
            )}
          </p>

          <h3>{text("Целые числа", "Integers")}</h3>
          <p>
            {text(
              "Целочисленный магический квадрат имеет целые E,x,y, поскольку эти координаты являются целочисленными разностями его клеток; обратное очевидно из формулы. Магическая константа обязательно делится на 3. Кроме того, примитивность полностью читается по координатам:",
              "An integral magic square has integral E,x,y because these coordinates are integral differences of its entries; the converse is immediate from the formula. Its magic constant is necessarily divisible by 3. Primitivity is also read directly from the coordinates:",
            )}
          </p>
          <Latex display>{text(
            String.raw`\gcd\{\text{девять клеток}\}=\gcd(E,x,y),`,
            String.raw`\gcd\{\text{nine entries}\}=\gcd(E,x,y).`,
          )}</Latex>
          <p>
            {text(
              "Действительно, каждая клетка — целочисленная линейная комбинация E,x,y, а E,x,y, в свою очередь, являются целочисленными линейными комбинациями клеток. Поэтому два НОД делят друг друга.",
              "Indeed, every entry is an integral linear combination of E,x,y, while E,x,y are themselves integral linear combinations of the entries. Hence the two gcds divide each other.",
            )}
          </p>

          <h3>{text("Поля положительной характеристики", "Fields of positive characteristic")}</h3>
          <p>
            {text(
              "Форма m(E,x,y) и трёхмерность сохраняются в любой характеристике, но привычная геометрия может вырождаться. В характеристике 3 каждый магический квадрат имеет M=3E=0, поэтому M уже не определяет центр. В характеристике 2 противоположные клетки совпадают, а четыре боковые клетки B,D,F,H имеют одно значение; квадрат не может иметь девять попарно различных клеток:",
              "The form m(E,x,y) and the three-dimensional classification remain valid in every characteristic, but the familiar geometry may degenerate. In characteristic 3 every magic square has M=3E=0, so M no longer determines the center. In characteristic 2 opposite entries coincide and the four side entries B,D,F,H share one value; the square cannot have nine pairwise distinct entries:",
            )}
          </p>
          <Latex display>{String.raw`\operatorname{char}K=2:\qquad A=J,\quad C=G,\quad B=D=F=H.`}</Latex>
          <p>
            {text(
              "Над кольцом, где 2 или 3 не обратимы, безопасно пользоваться беззнаменательной формой и восстановлением E=Q₂₂, x=A−E, y=G−E. Формулы E=M/3, x=(A−J)/2 и y=(G−C)/2 допустимы только при обратимости соответствующих элементов.",
              "Over a ring in which 2 or 3 is not invertible, one should use the denominator-free form and recover E=Q₂₂, x=A−E, y=G−E. The formulas E=M/3, x=(A−J)/2, and y=(G−C)/2 are valid only when the corresponding elements are invertible.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Граница линейной теории", "6. Boundary of the linear theory")}</h2>
          <p>
            {text(
              "Теорема классифицирует все магические квадраты 3×3, но сама по себе ничего не утверждает о положительности, различности или квадратности клеток. Положительность требует порядка; понятие полного квадрата требует умножения; одновременная квадратность выбранных линейных форм превращает линейную задачу в диофантову. Именно с этой точки начинаются задачи k/9, теория вычетов, нормы и эллиптические поверхности.",
              "The theorem classifies all 3×3 magic squares, but by itself says nothing about positivity, distinctness, or square-valued entries. Positivity requires an order; being a square requires multiplication; requiring selected linear forms to be squares turns the linear problem into a Diophantine one. This is the point at which the k/9 problems, residue theory, norms, and elliptic surfaces begin.",
            )}
          </p>
          <div className="topic-actions">
            <Link className="button button-primary" to="/lab">
              {text("Открыть m(E,x,y) в калькуляторе", "Open m(E,x,y) in the calculator")} <span>↗</span>
            </Link>
            <Link className="button button-ghost" to="/proofs/general">
              {text("Перейти к теории 4/9 и 5/9", "Continue to the 4/9 and 5/9 theory")}
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}

function OrbitLevelPage({ level }: { level: FamilyLevel }) {
  const { text } = useLocale();
  const families = level === 4 ? FOUR_FAMILIES : FIVE_FAMILIES;
  return (
    <article className="page proof-page orbit-level-page">
      <Link className="back-link" to="/squares-of-squares">
        ← {text("К постановке задачи", "Back to the problem")}
      </Link>
      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Полная классификация по D₄", "Complete D4 classification")}
          </p>
          <h1>
            {level === 4
              ? text(
                  "Четыре квадратные клетки: 23 орбиты",
                  "Four square entries: 23 orbits",
                )
              : text(
                  "Пять квадратных клеток: 23 орбиты",
                  "Five square entries: 23 orbits",
                )}
          </h1>
          <p>
            {level === 4
              ? text(
                  "Каждая маска задаёт четыре гарантированно квадратных значения и одну квадрику совместимости после исключения E, x, y.",
                  "Each mask specifies four guaranteed square values and one compatibility quadric after E, x, and y are eliminated.",
                )
              : text(
                  "Каждая маска задаёт пять гарантированно квадратных значений и две независимые квадрики совместимости после исключения E, x, y.",
                  "Each mask specifies five guaranteed square values and two independent compatibility quadrics after E, x, and y are eliminated.",
                )}
          </p>
        </div>
      </header>

      <div className="proof-document orbit-level-document">
        <section>
          <p>
            {text(
              "Число в названии — нижняя гарантия, а не запрет на дополнительные квадратные клетки. Нажмите название маски, чтобы открыть ту же лабораторию с её параметрами и полным доказательством непосредственно под квадратом.",
              "The level is a lower guarantee, not a prohibition on additional square-valued cells. Open a mask to load the same laboratory with its parameters and complete proof directly below the square.",
            )}
          </p>
          <p>
            <Link className="general-proof-link" to="/proofs/general">
              {text(
                "Доказательство полноты классификации и достаточности квадрик",
                "Proof of classification completeness and sufficiency of the quadrics",
              )}{" "}
              →
            </Link>
          </p>
          <OrbitAtlas
            title={
              level === 4
                ? text(
                    "Все 23 орбиты и квадрики 4/9",
                    "All 23 orbits and quadrics for 4/9",
                  )
                : text(
                    "Все 23 орбиты и пары квадрик 5/9",
                    "All 23 orbits and pairs of quadrics for 5/9",
                  )
            }
            families={families}
          />
        </section>
      </div>
    </article>
  );
}

function GeneralTheoryPage() {
  const { locale, text } = useLocale();
  const proofs = commonProofs(locale);
  return (
    <article className="page proof-page general-theory-page">
      <Link className="back-link" to="/lab">
        ← {text("К лаборатории", "Back to the laboratory")}
      </Link>
      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Общая часть доказательства", "General proof chapter")}
          </p>
          <h1>{text("Орбиты и квадрики 4/9 → 5/9", "Orbits and quadrics: 4/9 → 5/9")}</h1>
          <p>
            {text(
              "Классификация масок, исключение E, x, y, доказательство достаточности цветовых уравнений и общий механизм параметризации.",
              "Classification of masks, elimination of E, x, and y, sufficiency of the colored equations, and the common parametrization mechanism.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document general-proof-document">
        <section>
          <h3>{text("1. Координатная модель", "1. Coordinate model")}</h3>
          <p>
            {text(
              "Любой обычный магический квадрат порядка 3 над коммутативным кольцом записывается в трёх координатах E, x, y:",
              "Every ordinary magic square of order 3 over a commutative ring can be written in the three coordinates E, x, and y:",
            )}
          </p>
          <Latex display>{MAGIC3_LATEX}</Latex>
          <p>
            {text(
              "Одновременно девять клеточных форм образуют матрицу",
              "Equivalently, the nine cell forms make up the matrix equation",
            )}
          </p>
          <Latex display>{String.raw`\begin{pmatrix}A\\B\\C\\D\\E\\F\\G\\H\\J\end{pmatrix}=L\begin{pmatrix}E\\x\\y\end{pmatrix},\qquad L=\begin{pmatrix}1&1&0\\1&-1&1\\1&0&-1\\1&-1&-1\\1&0&0\\1&1&1\\1&0&1\\1&1&-1\\1&-1&0\end{pmatrix}`}</Latex>
          <p>
            {text(
              "Для маски S вводим независимые целые корни qₚ и записываем исходную систему без сокращений:",
              "For a mask S, introduce independent integral roots qₚ and write the original system without abbreviation:",
            )}
          </p>
          <Latex display>{String.raw`L_S\begin{pmatrix}E\\x\\y\end{pmatrix}=q_S^{[2]},\qquad q_S^{[2]}=(q_P^2)_{P\in S}`}</Latex>
          <p>
            {text(
              "Здесь утверждается квадратность всех клеток S, но не неквадратность дополнения. Поэтому термин k/9 далее означает «как минимум эти k клеток являются квадратами».",
              "This asserts that every cell in S is a square, but does not assert that cells outside S are nonsquares. Thus k/9 means “at least these k cells are perfect squares.”",
            )}
          </p>
        </section>

        <section>
          <h3>
            {text(
              "2. Теорема исключения и достаточности",
              "2. Elimination and sufficiency theorem",
            )}
          </h3>
          <p>
            {text(
              "Коэффициентные пары (x,y) девяти клеток образуют решётку 3×3. Четыре различные точки этой решётки не лежат на одной прямой; следовательно, для любой маски из четырёх или пяти клеток матрица Lₛ имеет ранг 3.",
              "The (x,y) coefficient pairs of the nine cells form a 3×3 grid. No four distinct points of this grid are collinear; therefore Lₛ has rank 3 for every four- or five-cell mask.",
            )}
          </p>
          <Latex display>{String.raw`\dim\ker L_S^T=|S|-3=\begin{cases}1,&|S|=4,\\2,&|S|=5.\end{cases}`}</Latex>
          <p>
            {text(
              "Пусть R₁,…,R|S|−3 — базис левого ядра. Необходимость уравнений Rᵢ(q²)=0 получается умножением исходной системы слева. Обратно, над Q ортогональное дополнение левого ядра совпадает с образом Lₛ. Поэтому эти уравнения достаточны и дают единственную тройку E, x, y.",
              "Let R₁,…,R|S|−3 be a basis of the left kernel. Multiplying the original system on the left proves the necessity of Rᵢ(q²)=0. Conversely, over Q the orthogonal complement of the left kernel equals the image of Lₛ. Hence these equations are sufficient and determine a unique triple E, x, y.",
            )}
          </p>
          <Latex display>{String.raw`q_S^{[2]}\in\operatorname{im}L_S\quad\Longleftrightarrow\quad R_i(q_S^{[2]})=0\quad(1\le i\le |S|-3)`}</Latex>
          <p>
            {text(
              "Для целочисленности выбираем ненулевой минор δ порядка 3. Формулы Крамера имеют знаменатель δ. Замена каждого корня qₚ на δqₚ умножает правую часть на δ² и превращает координаты в целые:",
              "To obtain integral coordinates, choose a nonzero 3×3 minor δ. Cramer's formulas have denominator δ. Replacing every root qₚ by δqₚ multiplies the right-hand side by δ² and makes the coordinates integral:",
            )}
          </p>
          <Latex display>{String.raw`q_P\mapsto\delta q_P,\qquad q_P^2\mapsto\delta^2q_P^2,\qquad (E,x,y)\mapsto\delta^2(E,x,y)\in\mathbb Z^3`}</Latex>
        </section>

        <section>
          <h3>{text("3. Почему орбит ровно 23", "3. Why there are exactly 23 orbits")}</h3>
          <p>
            {text(
              "Группа D₄ действует вращениями и отражениями, сохраняя центр, множество четырёх углов и множество четырёх сторон. По лемме Бёрнсайда числа неподвижных пятиэлементных масок равны 126 для тождества, 2 для каждого поворота на ±90°, 6 для поворота на 180° и 12 для каждого из четырёх отражений. Поэтому",
              "The group D₄ acts by rotations and reflections, preserving the center, the set of four corners, and the set of four edge cells. By Burnside's lemma, the numbers of fixed five-cell masks are 126 for the identity, 2 for each ±90° rotation, 6 for the 180° rotation, and 12 for each of the four reflections. Therefore",
            )}
          </p>
          <Latex display>{String.raw`N_{5/9}=\frac{126+2+6+2+4\cdot12}{8}=23`}</Latex>
          <p>
            {text(
              "Тот же результат получается топологически для четырёх клеток. Без центра выбираются четыре клетки периметра: случаи 0 или 4 угла дают 2 орбиты, случаи 1 или 3 угла — 4, а случай 2+2 распадается на 7; итого 13. С центром выбираются три клетки периметра: крайние случаи дают 2, а типы 1+2 и 2+1 — по 4; итого 10. Сумма 13+10=23.",
              "The same result follows from the corner/edge topology for four cells. Without the center, choose four perimeter cells: 0 or 4 corners give 2 orbits, 1 or 3 corners give 4, and the 2+2 case splits into 7, for a total of 13. With the center, choose three perimeter cells: the extreme cases give 2, while the 1+2 and 2+1 types give 4 each, for a total of 10. Thus 13+10=23.",
            )}
          </p>
          <p>
            {text(
              "Дополнение маски коммутирует с D₄ и задаёт биекцию между орбитами 4/9 и 5/9. Именно здесь исходный PDF пропустил ACDH, а вслед за ним дополнительную маску BEFGJ.",
              "Taking the complement of a mask commutes with D₄ and gives a bijection between the 4/9 and 5/9 orbits. The original PDF omitted ACDH and, consequently, its complementary mask BEFGJ.",
            )}
          </p>
          <OrbitAtlas
            title={text(
              "Все 23 орбиты и квадрики 4/9",
              "All 23 orbits and quadrics for 4/9",
            )}
            families={FOUR_FAMILIES}
          />
        </section>

        <section>
          <h3>
            {text(
              "4. Общая параметризация квадрик 4/9",
              "4. Common parametrization of the 4/9 quadrics",
            )}
          </h3>
          <p>
            {text(
              "Для четырёх клеток исключение оставляет одну диагональную квадрику Σkᵢqᵢ²=0. Поскольку Σkᵢ=0, любая знаковая точка ε с координатами ±1 лежит на ней. Для направления u прямая через ε даёт универсальную проекционную формулу:",
              "For four cells, elimination leaves one diagonal quadric Σkᵢqᵢ²=0. Since Σkᵢ=0, every sign point ε with coordinates ±1 lies on it. For a direction u, the line through ε gives the universal projection formula:",
            )}
          </p>
          <Latex display>{String.raw`D=\sum_{i=1}^4k_iu_i^2,\quad L_\varepsilon=\sum_{i=1}^4k_i\varepsilon_i u_i,\quad q_i=D\varepsilon_i-2L_\varepsilon u_i`}</Latex>
          <Latex display>{String.raw`\sum k_iq_i^2=D^2\sum k_i\varepsilon_i^2-4DL_\varepsilon^2+4L_\varepsilon^2D=0`}</Latex>
          <p>
            {text(
              "Для полноты достаточно четырёх строк матрицы Адамара H. Если все kᵢ ненулевые и q* — ненулевая рациональная точка квадрики, то из det H=−16 следует, что хотя бы одно спаривание Lε(q*) ненулевое. В соответствующей карте подстановка u=q* даёт D=0 и q=−2Lε(q*)q*: получена та же проективная точка. После очистки знаменателей это даёт алгоритмическое покрытие целых решений.",
              "For completeness, the four rows of the Hadamard matrix H suffice. If every kᵢ is nonzero and q* is a nonzero rational point of the quadric, det H=−16 implies that at least one pairing Lε(q*) is nonzero. In that chart, setting u=q* gives D=0 and q=−2Lε(q*)q*, the same projective point. Clearing denominators gives algorithmic coverage of integral solutions.",
            )}
          </p>
          <Latex display>{String.raw`H=\begin{pmatrix}1&1&1&1\\1&1&-1&-1\\1&-1&1&-1\\1&-1&-1&1\end{pmatrix},\qquad \det H=-16`}</Latex>
          <p>
            {text(
              "Красная вырожденная квадрика имеет один нулевой коэффициент: соответствующий четвёртый корень свободен, а нетривиальная коника параметризуется отдельно и полностью:",
              "The degenerate red quadric has one zero coefficient: the corresponding fourth root is free, while the nontrivial conic is parametrized separately and completely:",
            )}
          </p>
          <Latex display>{String.raw`r=-a^2+2ab+b^2,\quad s=a^2+b^2,\quad t=a^2+2ab-b^2,\quad r^2+t^2=2s^2`}</Latex>
        </section>

        <section>
          <h3>{text("5. Цветовая дифференциация", "5. Color differentiation")}</h3>
          <p>
            {text(
              "Цвет закрепляется не за позицией клетки, а за конкретным уравнением левого ядра. В большой матрице цветом отмечаются только фактические квадратные значения; в миниатюре — опоры выбранных уравнений. Пересечение двух опор делит миниатюру на два цвета.",
              "A color belongs to a particular left-kernel equation, not to a fixed cell position. In the large matrix, color marks only values that are actually perfect squares; in a miniature, it marks the supports of the selected equations. A cell shared by two supports is split between their colors.",
            )}
          </p>
          <p>
            {text(
              "Цвета упорядочены по предпочтительности. При построении цветового базиса сначала выбирается доступное отношение наиболее предпочтительного типа:",
              "Colors are ordered by preference. When a colored basis is constructed, the available relation of the most preferred type is selected first:",
            )}
          </p>
          <Latex display>{String.raw`\mathrm{red}>\mathrm{yellow}>\mathrm{blue}>\mathrm{green}>\mathrm{brown}>\mathrm{dark\ gray}>\mathrm{light\ gray}`}</Latex>
          <p>
            {text(
              "Для маски 5/9 после первого отношения выбирается наиболее предпочтительное отношение, линейно независимое от него. При одинаковом цветовом приоритете дополнительная математическая иерархия не вводится. Разные оттенки одного цвета нужны только для визуального разделения равноправных групп и не несут отдельной семантики.",
              "For a 5/9 mask, the first relation is followed by the most preferred relation linearly independent of it. Equal color priority introduces no further mathematical hierarchy. Different shades of one color serve only to distinguish equal-status groups visually and carry no separate semantics.",
            )}
          </p>
          {proofs.map((proof) => (
            <section className="general-color-proof" key={proof.id}>
              <h4>{proof.title}</h4>
              <p>{proof.summary}</p>
              {proof.formulas.map((formula) => (
                <Latex display key={formula}>{formula}</Latex>
              ))}
              <p>{proof.conclusion}</p>
            </section>
          ))}
        </section>

        <section>
          <h3>{text("6. Переход от 4/9 к 5/9", "6. From 4/9 to 5/9")}</h3>
          <p>
            {text(
              "Пять клеток дают две независимые квадрики. Канонический цветовой базис выбирается среди отношений 4/9-подмасок по установленному выше цветовому приоритету: сначала лучшее доступное отношение, затем лучшее независимое от него. Любой другой базис того же двумерного левого ядра эквивалентен и не меняет ни множество решений, ни достаточность системы.",
              "Five cells give two independent quadrics. The canonical colored basis is selected among relations of the 4/9 submasks according to the color priority fixed above: first the best available relation, then the best one independent of it. Any other basis of the same two-dimensional left kernel is equivalent and changes neither the solution set nor sufficiency of the system.",
            )}
          </p>
          <Latex display>{String.raw`\ker L_S^T=\langle R_{\mathrm{color}_1},R_{\mathrm{color}_2}\rangle\quad\Longrightarrow\quad \{R_1(q^2)=R_2(q^2)=0\}\Longleftrightarrow\exists!\,(E,x,y)`}</Latex>
          <OrbitAtlas
            title={text(
              "Все 23 орбиты и пары квадрик 5/9",
              "All 23 orbits and pairs of quadrics for 5/9",
            )}
            families={FIVE_FAMILIES}
          />
          <p>
            {text(
              "Индивидуальное доказательство обязано не только проверить эти две квадрики, но и вывести совместную параметризацию корней. Полнота указывается отдельно: доказанная, алгоритмически восстанавливаемая через НОД и знаки либо пока неизвестная. Проверка тождества сама по себе полноты не доказывает.",
              "An individual proof must do more than verify the two quadrics: it must derive their joint root parametrization. Coverage is reported separately as proved, algorithmically recoverable through gcds and signs, or still unknown. Verifying an identity alone does not prove completeness.",
            )}
          </p>
        </section>
      </div>
    </article>
  );
}

function CommonProofPage() {
  const { locale, text } = useLocale();
  const { proofId } = useParams();
  const proof = commonProofById(proofId, locale);
  if (!proof) return <Navigate to="/about" replace />;
  const families = FAMILIES.filter((family) =>
    family.justifications.some((item) => item.commonProofId === proof.id),
  );

  return (
    <article className="page proof-page common-proof-page">
      <Link className="back-link" to="/lab">
        ← {text("К атласу", "Back to the atlas")}
      </Link>
      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Общая часть доказательства", "General proof chapter")}
          </p>
          <h1>{proof.title}</h1>
          <p>{proof.summary}</p>
        </div>
      </header>
      <div className="common-proof-layout">
        <section className="latex-card common-lemma-card">
          {proof.formulas.map((formula, index) => (
            <section className="latex-step" key={formula}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Latex display>{formula}</Latex>
            </section>
          ))}
          <div className="lemma-conclusion">{proof.conclusion}</div>
        </section>
        <aside className="lemma-families">
          <span>
            {text("Используют эту лемму", "Families using this lemma")} ·{" "}
            {families.length}
          </span>
          {families.map((family) => (
            <Link
              className={`lemma-family tone-${family.group}`}
              to={`${orbitPath(family.id)}#family-proof`}
              key={family.id}
            >
              <Pattern family={family} compact />
              <strong>{family.title}</strong>
              <i>→</i>
            </Link>
          ))}
        </aside>
      </div>
    </article>
  );
}

function NewsPage() {
  const { locale, text } = useLocale();
  const articles = news(locale);
  return (
    <div className="page text-page">
      <header className="editorial-header">
        <p className="eyebrow">{text("Публикации", "Publications")}</p>
        <h1>{text("Новости", "News")}</h1>
        <p>
          {text(
            "Вехи исследования и публикации проекта.",
            "Research milestones and project publications.",
          )}
        </p>
      </header>
      <div className="news-list">
        {articles.map((article, index) => (
          <NewsCard
            article={article}
            featured={index === 0}
            key={article.slug}
          />
        ))}
      </div>
    </div>
  );
}

function NewsCard({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) {
  const { locale, text } = useLocale();
  return (
    <article className={`news-card ${featured ? "featured" : ""}`}>
      <div className="news-meta">
        <time dateTime={article.date}>
          {new Date(`${article.date}T00:00:00Z`).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })}
        </time>
        <span>{article.tags[0]}</span>
      </div>
      <h3>
        <Link to={`/news/${article.slug}`}>{article.title}</Link>
      </h3>
      <p>{article.summary}</p>
      <Link className="text-link" to={`/news/${article.slug}`}>
        {text("Читать заметку", "Read article")} <span>→</span>
      </Link>
    </article>
  );
}

function NewsArticlePage() {
  const { locale, text } = useLocale();
  const { slug } = useParams();
  const article = newsBySlug(slug, locale);
  if (!article) return <Navigate to="/news" replace />;
  return (
    <article className="page article-page">
      <Link className="back-link" to="/news">
        ← {text("Все новости", "All news")}
      </Link>
      <header>
        <div className="news-meta">
          <time>{article.date}</time>
          <span>{article.tags.join(" · ")}</span>
        </div>
        <h1>{article.title}</h1>
        <p>{article.summary}</p>
      </header>
      <div className="article-body">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
function AboutPage() {
  const { text } = useLocale();
  return (
    <article className="page proof-page about-page">
      <header className="proof-page-header">
        <div>
          <p className="eyebrow">{text("О проекте", "About")}</p>
          <h1>
            {text(
              "Исследование магических квадратов 3×3",
              "Research on 3×3 magic squares",
            )}
          </h1>
          <p>
            {text(
              "Проект посвящён арифметической и алгебраической структуре магических квадратов 3×3. Центральная открытая задача — существование магического квадрата из девяти положительных попарно различных полных квадратов; частичные задачи k/9, конгруумы и алгебра магических матриц рассматриваются как связанные направления одного исследования.",
              "The project studies the arithmetic and algebraic structure of 3×3 magic squares. Its central open question is whether a magic square can consist of nine positive, pairwise distinct perfect squares; the partial k/9 problems, congrua, and the algebra of magic matrices are treated as connected parts of the same investigation.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document about-document">
        <section>
          <h3>{text("1. Постановка задачи", "1. Problem statement")}</h3>
          <h4 className="about-subheading">
            {text("1.1. Магический квадрат", "1.1. Magic square")}
          </h4>
          <p>
            {text(
              "Магическим квадратом порядка n называется квадратная таблица из n² чисел, в которой суммы элементов каждой строки, каждого столбца и двух диагоналей, соединяющих противоположные углы, равны одному и тому же числу M — магической константе. Само определение не требует, чтобы элементы были различны; это условие вводится отдельно там, где оно необходимо.",
              "A magic square of order n is an n×n array of numbers in which the entries in every row, every column, and the two diagonals joining opposite corners have the same sum M, called the magic constant. Distinctness of the entries is not part of this definition; it is imposed separately when needed.",
            )}
          </p>
          <Latex display>{String.raw`\sum_{j=1}^{n}a_{ij}=M\ (1\le i\le n),\qquad
\sum_{i=1}^{n}a_{ij}=M\ (1\le j\le n),\qquad
\sum_{i=1}^{n}a_{ii}=\sum_{i=1}^{n}a_{i,n+1-i}=M.`}</Latex>
          <p>
            {text(
              "Магический квадрат порядка 3 состоит из девяти чисел. В явной форме условие означает равенство восьми сумм: трёх строк, трёх столбцов и двух диагоналей.",
              "A magic square of order 3 has nine entries. Explicitly, the condition is the equality of eight sums: three rows, three columns, and two diagonals.",
            )}
          </p>
          <Latex display>{String.raw`\begin{gathered}
\begin{pmatrix}a&b&c\\d&e&f\\g&h&j\end{pmatrix},\\[3pt]
a+b+c=d+e+f=g+h+j=M,\\
a+d+g=b+e+h=c+f+j=M,\\
a+e+j=c+e+g=M.
\end{gathered}`}</Latex>

          <h4 className="about-subheading">
            {text(
              "1.2. Квадратный квадрат и сильная задача 9/9",
              "1.2. A magic square of squares and the strong 9/9 problem",
            )}
          </h4>
          <p>
            {text(
              "Квадратным квадратом в этом проекте называется целочисленный магический квадрат порядка 3, все девять элементов которого являются положительными попарно различными полными квадратами. Иными словами, каждая клетка имеет вид q² для положительного целого q, и никакие две клетки не равны.",
              "In this project, a magic square of squares means an integral magic square of order 3 whose nine entries are positive, pairwise distinct perfect squares. Thus every entry has the form q² for a positive integer q, and no two entries are equal.",
            )}
          </p>
          <Latex display>{String.raw`a_{ij}=q_{ij}^{\,2},\qquad q_{ij}\in\mathbb Z_{>0},\qquad
(i,j)\ne(k,\ell)\ \Longrightarrow\ q_{ij}^{\,2}\ne q_{k\ell}^{\,2}.`}</Latex>
          <p>
            {text(
              "Сильная задача 9/9 состоит в том, чтобы построить такой квадрат либо доказать, что он не существует. Она остаётся открытой.",
              "The strong 9/9 problem is to construct such a square or prove that none exists. It remains open.",
            )}
          </p>

          <h4 className="about-subheading">
            {text(
              "1.3. Слабая задача 7/9",
              "1.3. The weak 7/9 problem",
            )}
          </h4>
          <p>
            {text(
              "Квадратом k/9 в этой задаче называется целочисленный магический квадрат порядка 3 с попарно различными элементами, в котором не менее k клеток являются положительными полными квадратами. На остальные клетки не накладывается условие быть или не быть квадратами. Поэтому решение 8/9 или 9/9 автоматически является решением задачи 7/9.",
              "In this problem, a k/9 square is an integral magic square of order 3 with pairwise distinct entries and at least k positive perfect-square entries. The remaining entries are not required either to be squares or to be nonsquares. Consequently, an 8/9 or 9/9 solution would automatically solve the 7/9 problem.",
            )}
          </p>
          <p>
            {text(
              "Однако один квадрат 7/9 уже известен и сам по себе не решает слабую задачу. Слабая задача состоит в том, чтобы найти другой, нетривиально новый квадрат 7/9 либо доказать, что известный квадрат единственен с точностью до естественных эквивалентностей. Ни второй класс, ни доказательство единственности пока не получены: слабая задача остаётся открытой.",
              "However, one 7/9 square is already known and does not by itself solve the weak problem. The weak problem is to find another, nontrivially new 7/9 square or to prove that the known square is unique up to the natural equivalences. Neither a second class nor a uniqueness proof is known, so the weak problem remains open.",
            )}
          </p>
          <p>
            {text(
              "Известен следующий квадрат 7/9 Бремнера—Сэллоуза:",
              "The following Bremner–Sallows 7/9 square is known:",
            )}
          </p>
          <Latex display>{String.raw`\mathcal B=\begin{pmatrix}
565^2&289^2&373^2\\
23^2&425^2&137\cdot2633\\
151\cdot1471&527^2&205^2
\end{pmatrix}.`}</Latex>
          <p>
            {text(
              "Обозначим суммы строк через Rᵢ, столбцов через Cᵢ, а двух диагоналей через D₁ и D₂. Тогда точный сертификат магичности имеет вид ниже. Семь указанных корней попарно различны, а две оставшиеся клетки не являются квадратами:",
              "Let Rᵢ denote the row sums, Cᵢ the column sums, and D₁ and D₂ the two diagonal sums. The exact magic-square certificate is then the equality below. The seven displayed roots are pairwise distinct, while the other two entries are not squares:",
            )}
          </p>
          <Latex display>{String.raw`R_1=R_2=R_3=C_1=C_2=C_3=D_1=D_2=541875,`}</Latex>
          <Latex display>{String.raw`600^2<137\cdot2633=360721<601^2,\qquad
471^2<151\cdot1471=222121<472^2.`}</Latex>
          <p>
            {text(
              "Повороты, отражения и общее умножение всех клеток на один и тот же положительный полный квадрат дают лишь тривиально эквивалентные варианты и не считаются новым решением.",
              "Rotations, reflections, and multiplication of every entry by the same positive perfect square produce only trivially equivalent variants and do not count as a new solution.",
            )}
          </p>
          <p>
            {text(
              "Связь двух постановок асимметрична. При поиске примера условие 9/9 сильнее и потому труднее: любой квадрат 9/9 автоматически дал бы новое решение 7/9. При доказательстве невозможности направление меняется: доказательство единственности известного 7/9 исключило бы также 8/9 и 9/9, тогда как одна лишь невозможность 9/9 не решила бы слабую задачу. Поэтому отрицательная постановка 9/9 идеологически проще, а положительная — сложнее.",
              "The relation between the two formulations is asymmetric. When constructing an example, the 9/9 condition is stronger and therefore harder: any 9/9 square would automatically give a new 7/9 solution. For a nonexistence proof, the direction reverses: proving uniqueness of the known 7/9 square would also rule out 8/9 and 9/9 squares, whereas ruling out 9/9 alone would not settle the weak problem. Thus the negative 9/9 formulation is conceptually simpler, while its positive formulation is harder.",
            )}
          </p>
          <ul className="proof-references">
            <li>
              <a href="https://www.impan.pl/en/publishing-house/journals-and-series/acta-arithmetica/all/88/3/110732/on-squares-of-squares">
                A. Bremner, <em>On squares of squares</em>, Acta Arithmetica 88 (1999), 289–297
              </a>
            </li>
            <li>
              <a href="https://www.multimagie.com/English/SquaresOfSquares.htm">
                {text(
                  "Каталог квадратов из квадратов Multimagie",
                  "Multimagie catalog of magic squares of squares",
                )}
              </a>
            </li>
            <li>
              <a href="https://oeis.org/A221669">
                OEIS A221669
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h3>{text("2. Область исследования", "2. Scope of the research")}</h3>
          <p>
            {text(
              "Задачи 9/9 и 7/9 задают основную цель, но не исчерпывают проект. Мы изучаем, какие наборы клеток магического квадрата могут одновременно быть полными квадратами, строим параметрические семейства таких квадратов, исследуем ограничения делимости и представления чисел суммами квадратов, а также рассматриваем обычное матричное умножение магических и полумагических квадратов.",
              "The 9/9 and 7/9 problems provide the main objective, but they do not exhaust the project. We study which sets of entries can simultaneously be perfect squares, construct parametric families of such squares, investigate divisibility restrictions and representations by sums of squares, and study ordinary matrix multiplication of magic and semimagic squares.",
            )}
          </p>
          <p>
            {text(
              "Обозначение k/9 означает, что выбранные k клеток гарантированно являются квадратами; остальные клетки также могут случайно оказаться квадратами. Два расположения выбранных клеток считаются одинаковыми, если одно получается из другого поворотом или отражением всего квадрата.",
              "The notation k/9 means that the selected k entries are guaranteed to be squares; some of the remaining entries may also happen to be squares. Two placements of selected entries are regarded as the same when one is obtained from the other by rotating or reflecting the whole square.",
            )}
          </p>
        </section>

        <section>
          <h3>{text("3. Основные результаты", "3. Main results")}</h3>
          <p>
            {text(
              "Ниже перечислены результаты, которые, по изученным нами публикациям и каталогам, ранее не были представлены в таком объёме или в такой форме. Это утверждение относится к доступному нам корпусу источников и может уточняться по мере библиографической проверки.",
              "The results below have not, to the best of our knowledge from the publications and catalogues examined, previously appeared with the same scope or in the same form. This statement is limited to the sources available to us and may be refined as the bibliographic review continues.",
            )}
          </p>

          <h4 className="about-subheading">
            {text("3.1. Полное покрытие позиционных типов 5/9", "3.1. Complete coverage of the 5/9 positional types")}
          </h4>
          <p>
            {text(
              "Для каждого из 23 существенно различных расположений пяти квадратных клеток построено явное невырожденное параметрическое семейство целочисленных магических квадратов. Поэтому ни один позиционный тип 5/9 не остаётся без конструкции. Под невырожденностью здесь понимаются положительность и попарная различность всех девяти элементов хотя бы для допустимых значений параметров семейства.",
              "For each of the 23 essentially different placements of five square entries, we construct an explicit nondegenerate parametric family of integral magic squares. Thus no 5/9 positional type remains without a construction. Here nondegenerate means that admissible parameter values exist for which all nine entries are positive and pairwise distinct.",
            )}
          </p>
          <p>
            {text(
              "Это полнота покрытия позиционных типов, а не утверждение, что одна выписанная формула перечисляет каждую рациональную точку соответствующей системы уравнений. Для каждой формулы отдельно указано, какая часть рациональных решений ею покрывается.",
              "This is completeness of coverage of the positional types, not a claim that one displayed formula enumerates every rational point of the corresponding system of equations. The subset of rational solutions covered by each formula is stated separately.",
            )}
          </p>
          <ul className="proof-references">
            <li><Link to="/orbits/5">{text("Атлас позиционных типов 5/9", "Atlas of the 5/9 positional types")}</Link></li>
            <li><Link to="/proofs/general">{text("Общая теория частичных квадратных масок", "General theory of partial square patterns")}</Link></li>
          </ul>

          <h4 className="about-subheading">
            {text("3.2. Продвижение для 6/9", "3.2. Progress on 6/9")}
          </h4>
          <p>
            {text(
              "Для двух позиционных типов 6/9, образованных параллельными тройками квадратов в арифметических прогрессиях, построены развитые параметризации: квадратные классы разностей двух прогрессий согласуются методом tfmn. Для нетфмн-типа ABEFGH система сведена к эллиптической поверхности, являющейся обратным образом семейства Лежандра; рациональная секция и её кратные порождают явные семейства решений. Для типов ABCDEH и ABDEFH получены расслоения кривыми рода 1 и эллиптические модели, задающие систематический вход в дальнейшие классы. Полного решения всех 16 позиционных типов пока нет.",
              "For two 6/9 positional types formed by parallel triples of squares in arithmetic progression, the project constructs developed parametrizations by matching the square classes of the two common differences through the tfmn method. For the non-tfmn type ABEFGH, the system is reduced to an elliptic surface obtained as a pullback of the Legendre family; a rational section and its multiples generate explicit families of solutions. For the ABCDEH and ABDEFH types, genus-one fibrations and elliptic models provide a systematic route into further classes. A complete solution of all 16 positional types is not yet known.",
            )}
          </p>

          <h4 className="about-subheading">
            {text("3.3. Магические, чарующие и полумагические квадраты", "3.3. Magic, charming, and semimagic squares")}
          </h4>
          <p>
            {text(
              "Произведение двух магических квадратов 3×3 обычно уже не является магическим, но остаётся полумагическим: суммы во всех строках и столбцах равны. Такие произведения образуют выделенный трёхмерный класс, который мы называем чарующими квадратами. Магические и чарующие квадраты чередуются при умножении: произведение двух магических квадратов чарующее, произведение магического и чарующего — магическое, а произведение двух чарующих — чарующее.",
              "The product of two 3×3 magic squares is generally no longer magic, but it remains semimagic: all row and column sums are equal. Such products form a distinguished three-dimensional class that we call charming squares. Magic and charming squares alternate under multiplication: magic times magic is charming, magic times charming is magic, and charming times charming is charming.",
            )}
          </p>
          <p>
            {text(
              "После отделения общего скалярного компонента эти два класса задают чётную и нечётную части пятимерной ассоциативной алгебры полумагических матриц. Для этой алгебры получены явные формулы определителя, присоединённой матрицы и характеристического многочлена.",
              "After the common scalar component is separated, these two classes give the even and odd parts of the five-dimensional associative algebra of semimagic matrices. Explicit formulas for the determinant, adjugate, and characteristic polynomial have also been obtained for this algebra.",
            )}
          </p>
          <p>
            {text(
              "Более того, над рациональными числами каждый полумагический квадрат 3×3 допускает явное разложение в сумму магического квадрата и произведения двух магических квадратов:",
              "Moreover, over the rational numbers every 3×3 semimagic square has an explicit decomposition as the sum of a magic square and a product of two magic squares:",
            )}
          </p>
          <Latex display>{String.raw`S(E,x,y,z,w)=M(E,x,y)+M(0,1,0)M(0,z,-w).`}</Latex>
          <p>
            {text(
              "Второе слагаемое является чарующим квадратом C(0,z,w). Поэтому магические и чарующие квадраты не только порождают всё пятимерное пространство линейными комбинациями: для каждого его элемента разложение выписывается непосредственно.",
              "The second term is the charming square C(0,z,w). Thus magic and charming squares do more than span the five-dimensional space by linear combinations: the decomposition of every element is explicit.",
            )}
          </p>

          <h4 className="about-subheading">
            {text("3.4. Конгруумы и поверхность F4+", "3.4. Congrua and the F4+ surface")}
          </h4>
          <p>
            {text(
              "Три квадрата в арифметической прогрессии определяют прямоугольный треугольник, площадь которого равна шагу прогрессии. Поэтому часть задачи о магических квадратах связана с классической задачей о конгруэнтных числах. Если положить F(a,b)=ab(a²−b²), то значения F, отличающиеся на рациональный квадрат, соответствуют одному классу этой задачи.",
              "Three squares in arithmetic progression determine a right triangle whose area equals the common difference. This connects part of the magic-square problem with the classical congruent number problem. If F(a,b)=ab(a²−b²), then values of F that differ by a rational square represent the same class in this problem.",
            )}
          </p>
          <Latex display>{String.raw`F(a,b)=\rho^2F(a,d)`}</Latex>
          <p>
            {text(
              "В проекте введена эллиптическая поверхность F4+, рациональные точки которой систематически порождают пары представлений одного конгруэнтного класса. Для неё определены особые слои и доказано существование ровно двух независимых направлений рациональных семейств. Это даёт единый способ получать новые тождества между конгруумами и строить связанные с ними семейства магических квадратов, в том числе некоторые семейства 6/9.",
              "The project introduces the F4+ elliptic surface, whose rational points systematically produce pairs of representations of the same congruent-number class. Its singular fibres are determined, and its rational families are proved to have exactly two independent directions. This provides a unified way to obtain new identities between congrua and construct related families of magic squares, including some 6/9 families.",
            )}
          </p>
          <ul className="proof-references">
            <li>
              <Link to="/proofs/arithmetic-progression">
                {text(
                  "Три квадрата в арифметической прогрессии",
                  "Three squares in arithmetic progression",
                )}
              </Link>
            </li>
          </ul>
        </section>

        <section id="copyright" className="copyright-section">
          <h3>
            {text(
              "4. Авторы, благодарности и распространение",
              "4. Authors, acknowledgements, and redistribution",
            )}
          </h3>
          <h4>{text("Авторы", "Authors")}</h4>
          <ul className="rights-list">
            <li>
              {text(
                "Владимир Мынка — основной автор.",
                "Vladimir Mynka — lead author.",
              )}
            </li>
            <li>
              {text(
                "Автор, пожелавший сохранить анонимность, — соавтор.",
                "An author who wishes to remain anonymous — co-author.",
              )}
            </li>
            <li>
              {text(
                "Алексей Поздеев — соавтор.",
                "Alexey Pozdeev — co-author.",
              )}
            </li>
          </ul>
          <h4>{text("Благодарности", "Acknowledgements")}</h4>
          <p>
            {text(
              "Отдельная благодарность Алексею Халину (Институт проблем передачи информации им. А. А. Харкевича РАН, ИППИ РАН) за консультацию и ранние проверки, а также активным участникам локального математического сообщества.",
              "Special thanks to Alexey Khalin (Kharkevich Institute for Information Transmission Problems of the Russian Academy of Sciences, IITP RAS) for consultation and early checks, and to the active participants in the local mathematics community.",
            )}
          </p>
          <h4>Copyright</h4>
          <p>
            {text(
              "Copyright © 2021–2026 Владимир Мынка.",
              "Copyright © 2021–2026 Vladimir Mynka.",
            )}
          </p>
          <p>
            {text(
              "Материалы проекта разрешается копировать и распространять только при явном указании авторства и сохранении активной ссылки на канонический сайт проекта. Иное использование требует отдельного согласования с автором.",
              "Project materials may be copied and redistributed only when authorship is explicitly credited and an active link to the canonical project site is retained. Other uses require separate permission from the author.",
            )}
          </p>
          <a className="canonical-rights-link" href="https://magic-squares.mynka.tech">
            magic-squares.mynka.tech
          </a>
          <p>
            <Link to="/timeline">
              {text(
                "Хронология исследования",
                "Research timeline",
              )}{" "}
              →
            </Link>
          </p>
        </section>
      </div>
    </article>
  );
}

function NotFoundPage() {
  const { text } = useLocale();
  return (
    <div className="page text-page not-found-page">
      <header className="editorial-header">
        <p className="eyebrow">404</p>
        <h1>{text("Страница не найдена", "Page not found")}</h1>
        <p>
          {text(
            "Такого маршрута нет в атласе доказательств.",
            "This route does not exist in the proof atlas.",
          )}
        </p>
        <Link className="button button-primary" to="/">
          {text("На главную", "Go to the home page")}
        </Link>
      </header>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="theory" element={<TheoryIndexPage />} />
        <Route path="squares-of-squares" element={<SquaresOfSquaresPage />} />
        <Route path="theory/magic-squares-3x3" element={<BasicMagicTheoryPage />} />
        <Route path="theory/residues" element={<ResiduesTheoryPage />} />
        <Route path="theory/prime-divisors" element={<PrimeDivisorsTheoryPage />} />
        <Route
          path="theory/matrix-algebra/magic-charming-semimagic"
          element={<SemimagicAlgebraTheoryPage />}
        />
        <Route
          path="theory/matrix-algebra/block-structure-split-quaternions"
          element={<SemimagicStructureTheoryPage />}
        />
        <Route path="lab" element={<LabPage />} />
        <Route path="families/:familyId" element={<FamilyRedirect />} />
        <Route path="orbits/4" element={<OrbitLevelPage level={4} />} />
        <Route path="orbits/5" element={<OrbitLevelPage level={5} />} />
        <Route path="orbits/:level/:familyId" element={<OrbitFamilyPage />} />
        <Route path="proofs/general" element={<GeneralTheoryPage />} />
        <Route path="proofs/:proofId" element={<CommonProofPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:slug" element={<NewsArticlePage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<LegacyLocaleRedirect />} />
    </Routes>
  );
}

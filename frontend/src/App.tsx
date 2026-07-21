import { useEffect, useMemo, useState, type FormEvent } from "react";
import katex from "katex";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  Navigate as RouterNavigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
  type LinkProps,
  type NavLinkProps,
  type NavigateProps,
  type To,
} from "react-router-dom";
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
  factorInteger,
  formatInteger,
  minimizeCoordinates,
  type Coordinates,
  type SquareCell,
} from "./lib/magicSquare";
import {
  LocaleProvider,
  isLocale,
  localePath,
  preferredLocale,
  switchLocalePath,
  useLocale,
  type Locale,
} from "./i18n";

const PARAMETER_KEYS = ["a", "b", "c", "d"] as const;

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

function Latex({
  children,
  display = false,
}: {
  children: string;
  display?: boolean;
}) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
    strict: "warn",
  });
  return (
    <span
      className={`latex ${display ? "display" : "inline"}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
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
          <NavLink to="/news">{text("Новости", "News")}</NavLink>
          <NavLink to="/about">{text("О проекте", "About")}</NavLink>
        </nav>
        <div className="header-meta">
          <LanguageSwitcher />
          <span className="release-pill">
            <i /> alpha · 0.5.0
          </span>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <span>
          {text(
            "Magic Squares · открытая исследовательская среда",
            "Magic Squares · open research environment",
          )}
        </span>
        <span>
          {text(
            "Точные формулы · воспроизводимые сертификаты",
            "Exact formulas · reproducible certificates",
          )}
        </span>
      </footer>
    </div>
  );
}

function HomePage() {
  const { locale, text } = useLocale();
  const articles = news(locale);
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
            <Link className="button button-ghost" to="/about">
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
              to={`/lab?family=${family.id}#family-proof`}
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
        <NewsCard article={articles[0]} featured />
      </section>
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

function LabPage() {
  const { locale, text } = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedFamily = searchParams.get("family");
  const initialFamily = requestedFamily ? familyById(requestedFamily) : null;
  let initialParameters = PARAMETER_KEYS.map(
    (key, index) =>
      searchParams.get(key) ?? (initialFamily ?? FAMILIES[0]).defaults[index],
  ) as unknown as ParameterStrings;
  let initialCoordinates: Coordinates;

  try {
    initialCoordinates = initialFamily
      ? initialFamily.generate(initialParameters)
      : [
          BigInt(searchParams.get("e") ?? "5"),
          BigInt(searchParams.get("x") ?? "3"),
          BigInt(searchParams.get("y") ?? "1"),
        ];
  } catch {
    initialParameters = (initialFamily ?? FAMILIES[0]).defaults;
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
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const snapshot = useMemo(() => createSnapshot(coordinates), [coordinates]);
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

  function persistFamily(
    nextFamily: FamilyDefinition,
    nextParameters: ParameterStrings,
  ) {
    setSearchParams({
      family: nextFamily.id,
      ...Object.fromEntries(
        PARAMETER_KEYS.map((key, index) => [key, nextParameters[index]]),
      ),
    });
  }

  function persistManual(nextCoordinates: Coordinates) {
    setSearchParams({
      e: nextCoordinates[0].toString(),
      x: nextCoordinates[1].toString(),
      y: nextCoordinates[2].toString(),
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
    setError("");
  }

  function generateFamily(nextParameters = parameters, nextFamily = family) {
    if (!nextFamily) return;
    try {
      const nextCoordinates = nextFamily.generate(nextParameters);
      setCurrentCoordinates(nextCoordinates, nextFamily);
      persistFamily(nextFamily, nextParameters);
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

  function transformCoordinates(
    transform: (current: Coordinates) => Coordinates,
  ) {
    const nextCoordinates = transform(coordinates);
    setCurrentCoordinates(nextCoordinates, null);
    persistManual(nextCoordinates);
  }

  function minimize() {
    transformCoordinates(minimizeCoordinates);
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
                  {familyGroupLabel(family, locale)}
                </span>
              ) : (
                <span className="family-chip manual-chip">
                  {text("свободный режим", "free mode")}
                </span>
              )}
              <h2>{family ? family.title : "Magic3(E, x, y)"}</h2>
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
                      onClick={() => setFactorized((value) => !value)}
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
                </form>
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
                        {text(
                          "пресет пересчитывает E, x, y",
                          "the preset recomputes E, x, and y",
                        )}
                      </small>
                    </div>
                    <Pattern family={family} compact />
                  </div>
                  <form className="parameter-form" onSubmit={submitFamily}>
                    <div className="parameter-row">
                      {PARAMETER_KEYS.map((key, index) => (
                        <label key={key}>
                          <span>{key}</span>
                          <input
                            aria-label={`${text("Параметр", "Parameter")} ${key}`}
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
                      ))}
                    </div>
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
                      <button
                        className="button button-quiet"
                        type="button"
                        onClick={swapPairs}
                      >
                        {text("Поменять пары", "Swap pairs")}
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
                    {family
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
                    {family ? family.theorem : "square = Magic3(E, x, y)"}
                  </code>
                  <p>
                    {family
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
                  {snapshot.cells.map((cell) => (
                    <ResultCell
                      cell={cell}
                      declared={
                        family?.positions.includes(cell.position) ?? false
                      }
                      factorized={factorized}
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
    </div>
  );
}

function ResultCell({
  cell,
  declared,
  factorized,
}: {
  cell: SquareCell;
  declared: boolean;
  factorized: boolean;
}) {
  const { text } = useLocale();
  const factorization = factorized ? factorInteger(cell.value) : undefined;
  const display = factorized
    ? (factorization ?? text("слишком большое", "too large"))
    : formatInteger(cell.value);
  const digits = display.length;
  return (
    <div
      className={`result-cell ${cell.isSquare ? "is-square" : ""} ${declared ? "is-declared" : ""}`}
      title={
        factorized && factorization === null
          ? `${text(
              "Факторизация ограничена числами до 10¹². Значение:",
              "Factorization is limited to values up to 10¹². Value:",
            )} ${cell.value}`
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
  return <Navigate to={`/lab?family=${family.id}#family-proof`} replace />;
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
        <p>
          {proof.coverageText ??
            text(
              "Данная формула задаёт доказанное параметрическое подсемейство. Полнота по всем рациональным или примитивным целым решениям для этой склейки пока не доказана и не предполагается автоматически из проверки тождеств.",
              "This formula defines a proved parametric subfamily. Exhaustion of every rational or primitive integral solution of this gluing has not yet been proved and does not follow automatically from checking the identities.",
            )}
        </p>
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

function OrbitTable({
  title,
  families,
}: {
  title: string;
  families: readonly FamilyDefinition[];
}) {
  const { locale } = useLocale();
  return (
    <section className="orbit-catalog">
      <h3>{title}</h3>
      <div className="orbit-table" role="table" aria-label={title}>
        {families.map((family, index) => (
          <Link
            className={`orbit-row tone-${family.group}`}
            to={`/lab?family=${family.id}#family-proof`}
            role="row"
            key={family.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Pattern family={family} compact />
            <span>
              <strong>{family.title}</strong>
              <small>
                {familyOrbitDescription(family, locale) ??
                  familyGroupLabel(family, locale)}
              </small>
            </span>
            <span className="orbit-relations">
              {family.justifications.map((item) => (
                <Latex key={item.id}>{item.relationLatex}</Latex>
              ))}
            </span>
            <i>→</i>
          </Link>
        ))}
      </div>
    </section>
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
              "Пять клеток дают две независимые квадрики. Канонический цветовой базис выбирается среди 4/9-подмасок так, чтобы отношения имели простейшие коэффициенты и минимальные опоры. Любой другой базис того же двумерного левого ядра эквивалентен, но не меняет ни множество решений, ни достаточность системы.",
              "Five cells give two independent quadrics. The canonical colored basis is selected among the 4/9 submasks so that its relations have the simplest coefficients and smallest supports. Any other basis of the same two-dimensional left kernel is equivalent and changes neither the solution set nor sufficiency of the system.",
            )}
          </p>
          <Latex display>{String.raw`\ker L_S^T=\langle R_{\mathrm{color}_1},R_{\mathrm{color}_2}\rangle\quad\Longrightarrow\quad \{R_1(q^2)=R_2(q^2)=0\}\Longleftrightarrow\exists!\,(E,x,y)`}</Latex>
          <p>
            {text(
              "Индивидуальное доказательство обязано не только проверить эти две квадрики, но и вывести совместную параметризацию корней. Полнота указывается отдельно: доказанная, алгоритмически восстанавливаемая через НОД и знаки либо пока неизвестная. Проверка тождества сама по себе полноты не доказывает.",
              "An individual proof must do more than verify the two quadrics: it must derive their joint root parametrization. Coverage is reported separately as proved, algorithmically recoverable through gcds and signs, or still unknown. Verifying an identity alone does not prove completeness.",
            )}
          </p>
        </section>

        <OrbitTable
          title={text("Все 23 орбиты 4/9", "All 23 orbits of 4/9 masks")}
          families={FOUR_FAMILIES}
        />
        <OrbitTable
          title={text("Все 23 орбиты 5/9", "All 23 orbits of 5/9 masks")}
          families={FIVE_FAMILIES}
        />
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
              to={`/lab?family=${family.id}#family-proof`}
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
        <p className="eyebrow">{text("Журнал проекта", "Project journal")}</p>
        <h1>{text("Новости и заметки", "News and notes")}</h1>
        <p>
          {text(
            "Релизы proof-core, новые семейства и объяснения исследовательских решений.",
            "Proof-core releases, new families, and explanations of research decisions.",
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
  const { locale, text } = useLocale();
  const proofs = commonProofs(locale);
  return (
    <div className="page text-page about-page">
      <header className="editorial-header">
        <p className="eyebrow">
          {text("Архитектура проекта", "Project architecture")}
        </p>
        <h1>
          {text("Интерфейс — не доказательство.", "The interface is not a proof.")}
          <br />
          {text(
            "Но он знает, где доказательство лежит.",
            "But it knows where the proof lives.",
          )}
        </h1>
      </header>
      <div className="about-grid">
        <section>
          <span>01</span>
          <h2>{text("Статическая SPA", "Static SPA")}</h2>
          <p>
            {text(
              "React отвечает за исследовательский интерфейс, маршруты и визуализацию. nginx раздаёт неизменяемые assets и возвращает index.html для клиентских маршрутов.",
              "React provides the research interface, routing, and visualization. nginx serves immutable assets and falls back to index.html for client-side routes.",
            )}
          </p>
        </section>
        <section>
          <span>02</span>
          <h2>Proof-core</h2>
          <p>
            {text(
              "Математические утверждения живут отдельно от браузера и проверяются точными полиномиальными тождествами. SPA различает сертификаты proof-core и перенесённые legacy-формулы, не выдавая одно за другое.",
              "Mathematical claims live outside the browser and are checked by exact polynomial identities. The SPA distinguishes proof-core certificates from migrated legacy formulas and never presents one as the other.",
            )}
          </p>
        </section>
        <section>
          <span>03</span>
          <h2>{text("Новости без backend", "News without a backend")}</h2>
          <p>
            {text(
              "Пока публикации меняются вместе с кодом, сервер не нужен: контент версионируется и попадает в атомарную сборку. Это меньше инфраструктуры и меньше источников несогласованности.",
              "While publications change together with the code, no server is needed: content is versioned and shipped in an atomic build. This means less infrastructure and fewer sources of inconsistency.",
            )}
          </p>
        </section>
      </div>
      <section className="proof-index">
        <div>
          <p className="eyebrow">{text("Общие леммы", "Shared lemmas")}</p>
          <h2>
            {text("Цвет — это ссылка на причину", "Color points to a reason")}
          </h2>
          <p>
            {text(
              "Одна лемма используется несколькими масками. В тексте доказательства остаётся конкретное клеточное тождество, а общий вывод вынесен сюда.",
              "One lemma can serve several masks. Each family proof retains the concrete cell identity, while the reusable argument is collected here.",
            )}
          </p>
        </div>
        <div className="proof-index-links">
          <Link to="/proofs/general">
            <span>00</span>
            <strong>
              {text(
                "Общая теория орбит 4/9 и 5/9",
                "General theory of the 4/9 and 5/9 orbits",
              )}
            </strong>
            <i>→</i>
          </Link>
          {proofs.map((proof, index) => (
            <Link to={`/proofs/${proof.id}`} key={proof.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{proof.title}</strong>
              <i>→</i>
            </Link>
          ))}
        </div>
      </section>
      <section className="backend-callout">
        <div>
          <p className="eyebrow">{text("Когда появится API", "When an API becomes necessary")}</p>
          <h2>
            {text(
              "Backend добавим по фактической потребности",
              "A backend will be added when there is a concrete need",
            )}
          </h2>
        </div>
        <ul>
          <li>{text("редакторы публикуют без Git и deploy;", "editors must publish without Git or a deployment;")}</li>
          <li>{text("появляются аккаунты, комментарии или подписки;", "accounts, comments, or subscriptions are introduced;")}</li>
          <li>{text("нужны полнотекстовый поиск и динамические подборки;", "full-text search or dynamic collections are required;")}</li>
          <li>{text("исследовательские вычисления запускаются как задания.", "research computations must run as queued jobs.")}</li>
        </ul>
      </section>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="lab" element={<LabPage />} />
        <Route path="families/:familyId" element={<FamilyRedirect />} />
        <Route path="proofs/general" element={<GeneralTheoryPage />} />
        <Route path="proofs/:proofId" element={<CommonProofPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:slug" element={<NewsArticlePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="*" element={<LegacyLocaleRedirect />} />
    </Routes>
  );
}

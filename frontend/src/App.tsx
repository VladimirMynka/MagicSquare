import { useEffect, useMemo, useState, type FormEvent } from "react";
import katex from "katex";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { NEWS, newsBySlug } from "./content/news";
import { familyProofById } from "./content/familyProofs";
import {
  COMMON_PROOFS,
  MAGIC3_LATEX,
  commonProofById,
} from "./content/proofs";
import {
  FAMILIES,
  familyById,
  findFamilyById,
  type FamilyDefinition,
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

const PARAMETER_KEYS = ["a", "b", "c", "d"] as const;

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

function AppShell() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Magic Squares — на главную">
          <AppMark />
          <span>
            <strong>Magic Squares</strong>
            <small>proof atlas</small>
          </span>
        </Link>
        <nav className="main-nav" aria-label="Основная навигация">
          <NavLink to="/lab">Лаборатория</NavLink>
          <NavLink to="/news">Новости</NavLink>
          <NavLink to="/about">О проекте</NavLink>
        </nav>
        <span className="release-pill">
          <i /> alpha · 0.3.2
        </span>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/families/:familyId" element={<FamilyRedirect />} />
          <Route path="/proofs/:proofId" element={<CommonProofPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>Magic Squares · открытая исследовательская среда</span>
        <span>Точные формулы · воспроизводимые сертификаты</span>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            Параметрические семейства · карта доказательств
          </p>
          <h1>Магические квадраты, которые можно не только увидеть.</h1>
          <p className="hero-lead">
            Интерактивный атлас связывает каждый генератор с его квадратной
            маской, формулой, полным LaTeX-доказательством и честным статусом
            формализации.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/lab">
              Открыть лабораторию <span>↗</span>
            </Link>
            <Link className="button button-ghost" to="/about">
              Как устроены доказательства
            </Link>
          </div>
          <div className="hero-stats" aria-label="Статистика проекта">
            <div>
              <strong>22</strong>
              <span>семейств в атласе</span>
            </div>
            <div>
              <strong>5/9</strong>
              <span>квадратная маска</span>
            </div>
            <div>
              <strong>4</strong>
              <span>общие леммы</span>
            </div>
          </div>
        </div>
        <HeroSquare />
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Proof-backed catalog</p>
            <h2>От формулы к квадрату — без разрыва</h2>
          </div>
          <Link className="text-link" to="/lab">
            Все семейства <span>→</span>
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
                <span className="family-kind">{family.groupLabel}</span>
                <h3>{family.title}</h3>
                <p>{family.summary}</p>
              </div>
              <span className="feature-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="manifesto">
        <p className="eyebrow">Исследовательский принцип</p>
        <blockquote>
          «Если символического доказательства ещё нет, это пробел, а не
          результат».
        </blockquote>
        <p>
          Интерфейс показывает вычисление. Proof-core отвечает за утверждение.
          Поэтому красивые примеры не подменяют тождества, а статус каждой
          конструкции виден пользователю.
        </p>
      </section>

      <section className="section-block latest-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Журнал проекта</p>
            <h2>Последнее обновление</h2>
          </div>
          <Link className="text-link" to="/news">
            Все новости <span>→</span>
          </Link>
        </div>
        <NewsCard article={NEWS[0]} featured />
      </section>
    </div>
  );
}

function HeroSquare() {
  const values = [
    17689, 27889, 11449, 12769, 19009, 25249, 26569, 10129, 20329,
  ];
  const squareIndexes = new Set([0, 1, 2, 3, 6]);
  return (
    <div className="hero-visual" aria-label="Точный квадрат ABCDG">
      <div className="hero-square-label">
        <span>ABCDG</span>
        <small>точный сертификат</small>
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
      <div className="hero-coordinates" aria-label="Координаты квадрата">
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
    setFactorized(false);
    setError("");
  }

  function generateFamily(nextParameters = parameters, nextFamily = family) {
    if (!nextFamily) return;
    try {
      const nextCoordinates = nextFamily.generate(nextParameters);
      setCurrentCoordinates(nextCoordinates, nextFamily);
      persistFamily(nextFamily, nextParameters);
    } catch {
      setError("Параметры семейства должны быть целыми числами.");
    }
  }

  function selectFamily(nextFamily: FamilyDefinition) {
    setParameters(nextFamily.defaults);
    generateFamily(nextFamily.defaults, nextFamily);
  }

  function selectManual() {
    setFamily(null);
    setFactorized(false);
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
      setError("E, x и y должны быть целыми числами.");
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
      setError("Множитель должен быть целым числом.");
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
          <p className="eyebrow">Математическая мастерская</p>
          <h1>Лаборатория квадратов</h1>
        </div>
        <p>
          Управляйте произвольным квадратом через E, x, y или получите эти
          координаты из параметрического семейства.
        </p>
      </div>

      <div className="lab-layout">
        <aside className="family-panel">
          <div className="panel-label">
            <span>Режим и семейства</span>
            <small>{FAMILIES.length} в атласе</small>
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
                <strong>Свободный квадрат</strong>
                <small>прямое управление E, x, y</small>
              </span>
              <i>→</i>
            </button>
            {FAMILIES.map((candidate) => (
              <button
                className={`family-button tone-${candidate.group} ${candidate.id === family?.id ? "active" : ""}`}
                onClick={() => selectFamily(candidate)}
                type="button"
                key={candidate.id}
              >
                <Pattern family={candidate} compact />
                <span>
                  <strong>{candidate.title}</strong>
                  <small>{candidate.groupLabel}</small>
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
                  {family.groupLabel}
                </span>
              ) : (
                <span className="family-chip manual-chip">свободный режим</span>
              )}
              <h2>{family ? family.title : "Magic3(E, x, y)"}</h2>
            </div>
            <button className="icon-button" type="button" onClick={copyLink}>
              {copied ? "Скопировано" : "Поделиться ↗"}
            </button>
          </div>

          <div className="workbench-grid">
            <aside className="control-desk">
              <section className="tool-section coordinate-section">
                <div className="tool-section-heading">
                  <div>
                    <span>Текущий квадрат</span>
                    <small>три координаты определяют девять клеток</small>
                  </div>
                  <code>Magic3</code>
                </div>
                <form className="coordinate-form" onSubmit={submitCoordinates}>
                  <div className="coordinate-grid">
                    {(["E", "x", "y"] as const).map((name, index) => (
                      <label key={name}>
                        <span>{name}</span>
                        <input
                          aria-label={`Координата ${name}`}
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
                            ? "центр"
                            : index === 1
                              ? "ось x"
                              : "ось y"}
                        </small>
                      </label>
                    ))}
                  </div>
                  <div className="tool-actions primary-actions">
                    <button className="button button-primary" type="submit">
                      Задать
                    </button>
                    <button
                      className="button button-quiet"
                      type="button"
                      onClick={() => setFactorized((value) => !value)}
                    >
                      {factorized ? "Показать числа" : "Факторизовать"}
                    </button>
                    <button
                      className="button button-quiet"
                      type="button"
                      onClick={minimize}
                    >
                      Минимизировать
                    </button>
                  </div>
                </form>
                <div className="transform-tools">
                  <span>Преобразования</span>
                  <div>
                    <button
                      type="button"
                      aria-label="Повернуть влево"
                      onClick={() =>
                        transformCoordinates(([e, x, y]) => [e, -y, x])
                      }
                    >
                      ↺ Влево
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        transformCoordinates(([e, x, y]) => [e, y, x])
                      }
                    >
                      ↔ Отразить
                    </button>
                    <button
                      type="button"
                      aria-label="Повернуть вправо"
                      onClick={() =>
                        transformCoordinates(([e, x, y]) => [e, y, -x])
                      }
                    >
                      Вправо ↻
                    </button>
                  </div>
                  <div className="multiply-tool">
                    <label>
                      <span>Умножить на</span>
                      <input
                        aria-label="Множитель"
                        inputMode="numeric"
                        value={scale}
                        onChange={(event) => setScale(event.target.value)}
                      />
                    </label>
                    <button type="button" onClick={multiply}>
                      Применить
                    </button>
                  </div>
                </div>
              </section>

              {family && (
                <section className="tool-section family-parameter-section">
                  <div className="tool-section-heading">
                    <div>
                      <span>Параметры {family.title}</span>
                      <small>пресет пересчитывает E, x, y</small>
                    </div>
                    <Pattern family={family} compact />
                  </div>
                  <form className="parameter-form" onSubmit={submitFamily}>
                    <div className="parameter-row">
                      {PARAMETER_KEYS.map((key, index) => (
                        <label key={key}>
                          <span>
                            {index < 2
                              ? index === 0
                                ? "α₁"
                                : "β₁"
                              : index === 2
                                ? "α₂"
                                : "β₂"}
                          </span>
                          <input
                            aria-label={`Параметр ${key}`}
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
                        Применить семейство
                      </button>
                      <button
                        className="button button-quiet"
                        type="button"
                        onClick={randomize}
                      >
                        Случайные
                      </button>
                      <button
                        className="button button-quiet"
                        type="button"
                        onClick={swapPairs}
                      >
                        Поменять пары
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
                      : "∑"
                    : "E"}
                </span>
                <div>
                  <strong>
                    {family
                      ? family.proofStatus === "proof-core"
                        ? "Символьный сертификат"
                        : "Legacy-формула · формализация ожидается"
                      : "Свободный координатный режим"}
                  </strong>
                  <code>
                    {family ? family.theorem : "square = Magic3(E, x, y)"}
                  </code>
                  <p>
                    {family
                      ? family.summary
                      : "Специальная квадратная маска не заявляется: исследуется произвольная целочисленная тройка."}
                  </p>
                  {family && (
                    <a className="source-proof-link" href="#family-proof">
                      Полный текст доказательства ↓
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
                aria-label="Координаты квадрата"
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
                    Матрица 3 × 3 · {factorized ? "факторизации" : "значения"}
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
                  <i /> кирпичная рамка отмечает значение — полный квадрат
                </p>
              </div>

              <div className="verification-grid">
                <StatusCard
                  label="Магический инвариант"
                  value={
                    snapshot.lineSumsAgree ? "8 линий совпадают" : "Нарушен"
                  }
                  ok={snapshot.lineSumsAgree}
                />
                <StatusCard
                  label="Заявленная маска"
                  value={
                    family
                      ? `${family.mask} · ${declaredMaskHolds ? "подтверждена" : "нарушена"}`
                      : "свободная конфигурация"
                  }
                  ok={declaredMaskHolds ?? true}
                  neutral={!family}
                />
                <StatusCard
                  label="Фактический результат"
                  value={`${snapshot.squarePositions.length}/9 квадратов`}
                  ok={snapshot.squarePositions.length >= 5}
                  neutral={!family}
                />
                <StatusCard
                  label="Невырожденность"
                  value={
                    snapshot.entriesDistinct
                      ? "9 попарно различных"
                      : "Есть равные клетки"
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
  const factorization = factorized ? factorInteger(cell.value) : undefined;
  const display = factorized
    ? (factorization ?? "слишком большое")
    : formatInteger(cell.value);
  const digits = display.length;
  return (
    <div
      className={`result-cell ${cell.isSquare ? "is-square" : ""} ${declared ? "is-declared" : ""}`}
      title={
        factorized && factorization === null
          ? `Факторизация ограничена числами до 10¹². Значение: ${cell.value}`
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
  const positions = "ABCDEFGHJ";
  return (
    <span
      className={`pattern ${compact ? "compact" : ""}`}
      aria-label={`Доказательные опоры маски ${family.mask}`}
    >
      {Array.from(positions, (position) => {
        const supports = family.justifications.filter((item) =>
          item.positions.some((candidate) => candidate === position),
        );
        return (
          <i
            className={family.mask.includes(position) ? "on" : ""}
            key={position}
            title={supports.map((item) => item.label).join(" + ") || undefined}
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
  const proof = familyProofById(family.id);
  const squareStatement = String.raw`\{${family.positions.join(",")}\}\subseteq\{P:\mathcal M_P(E,x,y)=r_P^2\}`;
  const projection = String.raw`\pi_{${family.mask}}\!\left(\mathcal M(E,x,y)\right)=(${family.positions.join(",")})\in\{n^2:n\in\mathbb Z\}^{5}`;
  return (
    <article className="proof-document">
      <header>
        <p>Семейство {family.mask}</p>
        <h2>Теорема и полное доказательство</h2>
      </header>

      <section>
        <h3>Утверждение</h3>
        <p>
          При указанных ниже условиях формулы задают целочисленный магический
          квадрат порядка 3, в котором все клетки маски {family.mask} являются
          квадратами целых чисел.
        </p>
        <Latex display>{squareStatement}</Latex>
      </section>

      <section>
        <h3>Доказательство</h3>
        <p>{proof.assumptions}</p>
        <p>Введём следующие вспомогательные целые величины:</p>
        {proof.definitions.map((formula) => (
          <Latex display key={formula}>{formula}</Latex>
        ))}
        <p>Значения заявленных клеток определим как явные квадраты:</p>
        <Latex display>{proof.squareValues}</Latex>
        <p>{proof.identityDerivation}</p>
        {proof.identities.map((identity) => (
          <Latex display key={identity}>{identity}</Latex>
        ))}
      </section>

      <section>
        <h3>Восстановление магического квадрата</h3>
        <p>Используем стандартную трёхкоординатную форму:</p>
        <Latex display>{MAGIC3_LATEX}</Latex>
        <p>
          Положим координаты равными следующей линейной комбинации уже
          построенных квадратных значений:
        </p>
        <Latex display>{family.reconstructionLatex}</Latex>
        {proof.parityClearance && (
          <>
            <p>
              Если одно из делений на 2 нецелое, умножим каждый выписанный
              корень на 2. Тогда все значения клеток умножатся на 4, все
              однородные тождества сохранятся, а числители станут чётными.
              Именно эту нормализацию выполняет генератор.
            </p>
            <Latex display>{String.raw`q_P\mapsto2q_P,\qquad P=q_P^2\mapsto4P`}</Latex>
          </>
        )}
        <p>
          Теперь подставляем координаты в девять линейных форм Magic3.
          Выписанные цветовые тождества заменяют все оставшиеся клетки маски на
          соответствующие квадраты. Поэтому
        </p>
        <Latex display>{projection}</Latex>
        <p>
          Каждая строка, каждый столбец и обе диагонали имеют сумму 3E по самой
          форме Magic3. Следовательно, получена требуемая семья магических
          квадратов с квадратной маской {family.mask}. Что и требовалось
          доказать.
        </p>
      </section>

      <section className="proof-references">
        <h3>Использованные общие леммы</h3>
        <ul>
          {family.justifications.map((item) => (
            <li key={item.id}>
              <Latex>{item.relationLatex}</Latex>{" — "}
              <Link to={`/proofs/${item.commonProofId}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <span>
          {family.proofStatus === "proof-core"
            ? "Текст согласован с универсальным полиномиальным сертификатом proof-core."
            : "Текст восстанавливает legacy-параметризацию; перенос машинного сертификата в proof-core ещё не завершён."}
        </span>
        <code>{family.theorem}</code>
      </footer>
    </article>
  );
}

function CommonProofPage() {
  const { proofId } = useParams();
  const proof = commonProofById(proofId);
  if (!proof) return <Navigate to="/about" replace />;
  const families = FAMILIES.filter((family) =>
    family.justifications.some((item) => item.commonProofId === proof.id),
  );

  return (
    <article className="page proof-page common-proof-page">
      <Link className="back-link" to="/lab">
        ← К атласу
      </Link>
      <header className="proof-page-header">
        <div>
          <p className="eyebrow">Общая часть доказательства</p>
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
          <span>Используют эту лемму · {families.length}</span>
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
  return (
    <div className="page text-page">
      <header className="editorial-header">
        <p className="eyebrow">Журнал проекта</p>
        <h1>Новости и заметки</h1>
        <p>
          Релизы proof-core, новые семейства и объяснения исследовательских
          решений.
        </p>
      </header>
      <div className="news-list">
        {NEWS.map((article, index) => (
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
  article: (typeof NEWS)[number];
  featured?: boolean;
}) {
  return (
    <article className={`news-card ${featured ? "featured" : ""}`}>
      <div className="news-meta">
        <time dateTime={article.date}>
          {new Date(`${article.date}T00:00:00Z`).toLocaleDateString("ru-RU", {
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
        Читать заметку <span>→</span>
      </Link>
    </article>
  );
}

function NewsArticlePage() {
  const { slug } = useParams();
  const article = newsBySlug(slug);
  if (!article) return <Navigate to="/news" replace />;
  return (
    <article className="page article-page">
      <Link className="back-link" to="/news">
        ← Все новости
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
  return (
    <div className="page text-page about-page">
      <header className="editorial-header">
        <p className="eyebrow">Архитектура проекта</p>
        <h1>
          Интерфейс — не доказательство.
          <br />
          Но он знает, где доказательство лежит.
        </h1>
      </header>
      <div className="about-grid">
        <section>
          <span>01</span>
          <h2>Статическая SPA</h2>
          <p>
            React отвечает за исследовательский интерфейс, маршруты и
            визуализацию. nginx раздаёт неизменяемые assets и возвращает
            index.html для клиентских маршрутов.
          </p>
        </section>
        <section>
          <span>02</span>
          <h2>Proof-core</h2>
          <p>
            Математические утверждения живут отдельно от браузера и проверяются
            точными полиномиальными тождествами. SPA различает сертификаты
            proof-core и перенесённые legacy-формулы, не выдавая одно за другое.
          </p>
        </section>
        <section>
          <span>03</span>
          <h2>Новости без backend</h2>
          <p>
            Пока публикации меняются вместе с кодом, сервер не нужен: контент
            версионируется и попадает в атомарную сборку. Это меньше
            инфраструктуры и меньше источников несогласованности.
          </p>
        </section>
      </div>
      <section className="proof-index">
        <div>
          <p className="eyebrow">Общие леммы</p>
          <h2>Цвет — это ссылка на причину</h2>
          <p>
            Одна лемма используется несколькими масками. В тексте доказательства
            остаётся конкретное клеточное тождество, а общий вывод вынесен сюда.
          </p>
        </div>
        <div className="proof-index-links">
          {COMMON_PROOFS.map((proof, index) => (
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
          <p className="eyebrow">Когда появится API</p>
          <h2>Backend добавим по фактической потребности</h2>
        </div>
        <ul>
          <li>редакторы публикуют без Git и deploy;</li>
          <li>появляются аккаунты, комментарии или подписки;</li>
          <li>нужны полнотекстовый поиск и динамические подборки;</li>
          <li>исследовательские вычисления запускаются как задания.</li>
        </ul>
      </section>
    </div>
  );
}

export function App() {
  return <AppShell />;
}

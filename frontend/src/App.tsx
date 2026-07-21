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
import { familyProof } from "./content/familyProofs";
import {
  COMMON_PROOFS,
  MAGIC3_LATEX,
  commonProofById,
} from "./content/proofs";
import {
  FAMILIES,
  FIVE_FAMILIES,
  FOUR_FAMILIES,
  familyById,
  findFamilyById,
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
          <i /> alpha · 0.4.0
        </span>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/families/:familyId" element={<FamilyRedirect />} />
          <Route path="/proofs/general" element={<GeneralTheoryPage />} />
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
              <strong>23 + 23</strong>
              <span>орбиты 4/9 и 5/9</span>
            </div>
            <div>
              <strong>5/9</strong>
              <span>квадратная маска</span>
            </div>
            <div>
              <strong>{COMMON_PROOFS.length}</strong>
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
      setError("Параметры семейства должны быть целыми числами.");
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
            <small>{catalogFamilies.length} орбиты</small>
          </div>
          <div className="family-level-tabs" aria-label="Уровень квадратной маски">
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
                <strong>Свободный квадрат</strong>
                <small>прямое управление E, x, y</small>
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
                          <span>{key}</span>
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
                      : family.proofStatus === "browser-certificate"
                        ? "✓"
                      : "∑"
                    : "E"}
                </span>
                <div>
                  <strong>
                    {family
                      ? family.proofStatus === "proof-core"
                        ? "Символьный сертификат"
                        : family.proofStatus === "browser-certificate"
                          ? "Точный алгебраический сертификат"
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
                  ok={
                    family
                      ? snapshot.squarePositions.length >= family.level
                      : snapshot.squarePositions.length >= 4
                  }
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
  const proof = familyProof(family);
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
        <p>Семейство {family.mask}</p>
        <h2>Теорема и полное доказательство</h2>
        <Link className="general-proof-link" to="/proofs/general">
          Общая теория орбит 4/9 и 5/9 →
        </Link>
      </header>

      <section>
        <h3>Утверждение</h3>
        <p>
          При указанных ниже условиях формулы задают целочисленный магический
          квадрат порядка 3, в котором как минимум все {family.level} клетки
          маски {family.mask} являются квадратами целых чисел. Квадратность
          остальных клеток не запрещается.
        </p>
        <Latex display>{squareStatement}</Latex>
        <p>{proof.assumptions}</p>
      </section>

      <section>
        <h3>Исходная система и исключение E, x, y</h3>
        <p>
          Для каждой отмеченной клетки вводим целый корень и подставляем
          соответствующую линейную форму Magic3. Получаем систему:
        </p>
        <Latex display>{cellSystem}</Latex>
        <p>
          Матрица коэффициентов при E, x, y имеет ранг 3. Поэтому после их
          исключения остаётся {family.level - 3} независимых однородных
          квадратичных {family.level === 4 ? "уравнение" : "уравнения"} на
          корнях. Ниже они выводятся и одновременно параметризуются.
        </p>
      </section>

      <section>
        <h3>Вывод параметризации корней</h3>
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
        {proof.parameterDerivation && <p>{proof.parameterDerivation}</p>}
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
        {proof.integralityClearance && <p>{proof.integralityClearance}</p>}
        <p>
          Общая линейная лемма используется здесь прямо: если матрица выбранных
          клеточных форм имеет ранг 3, то вектор их значений принадлежит её
          образу тогда и только тогда, когда обращаются в нуль все элементы
          левого ядра. Для четырёх клеток левое ядро одномерно, для пяти —
          двумерно. Выписанные выше цветовые тождества образуют именно этот
          базис, а указанные формулы E, x, y дают единственный прообраз.
        </p>
        <Latex display>{String.raw`L_S(E,x,y)^T=(q_P^2)_{P\in S},\qquad \ker L_S^T=\langle R_1,\ldots,R_{${family.level - 3}}\rangle`}</Latex>
        <p>
          Теперь подставляем координаты в девять линейных форм Magic3. Поэтому
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
        <h3>Цветовые леммы, применённые в этом доказательстве</h3>
        {family.justifications.map((item) => {
          const common = commonProofById(item.commonProofId);
          if (!common) return null;
          return (
            <section className="inline-lemma" key={item.id}>
              <h4>{item.label}</h4>
              <Latex display>{item.relationLatex}</Latex>
              <p>{common.summary}</p>
              {common.formulas.map((formula) => (
                <Latex display key={formula}>{formula}</Latex>
              ))}
              <p>
                В текущей маске переменные леммы заменяются клетками
                {` ${item.positions.join(", ")}`}; её заключение — именно
                выписанное выше клеточное равенство.
              </p>
              <Link to={`/proofs/${item.commonProofId}`}>
                Общая формулировка и доказательство →
              </Link>
            </section>
          );
        })}
      </section>

      <section>
        <h3>Полнота покрытия</h3>
        <p>
          {proof.coverageText ??
            "Данная формула задаёт доказанное параметрическое подсемейство. Полнота по всем рациональным или примитивным целым решениям для этой склейки пока не доказана и не предполагается автоматически из проверки тождеств."}
        </p>
      </section>

      <footer>
        <span>
          {family.proofStatus === "proof-core"
            ? "Текст согласован с универсальным полиномиальным сертификатом proof-core."
            : family.proofStatus === "browser-certificate"
              ? "Формулы проверяются точным целочисленным сертификатом браузерного генератора; перенос в proof-core ещё не завершён."
              : "Текст восстанавливает legacy-параметризацию; перенос машинного сертификата в proof-core ещё не завершён."}
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
              <small>{family.orbitDescription ?? family.groupLabel}</small>
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
  return (
    <article className="page proof-page general-theory-page">
      <Link className="back-link" to="/lab">
        ← К лаборатории
      </Link>
      <header className="proof-page-header">
        <div>
          <p className="eyebrow">Общая часть доказательства</p>
          <h1>Орбиты и квадрики 4/9 → 5/9</h1>
          <p>
            Классификация масок, исключение E, x, y, доказательство
            достаточности цветовых уравнений и общий механизм параметризации.
          </p>
        </div>
      </header>

      <div className="proof-document general-proof-document">
        <section>
          <h3>1. Координатная модель</h3>
          <p>
            Любой обычный магический квадрат порядка 3 над коммутативным
            кольцом записывается в трёх координатах E, x, y:
          </p>
          <Latex display>{MAGIC3_LATEX}</Latex>
          <p>Одновременно девять клеточных форм образуют матрицу</p>
          <Latex display>{String.raw`\begin{pmatrix}A\\B\\C\\D\\E\\F\\G\\H\\J\end{pmatrix}=L\begin{pmatrix}E\\x\\y\end{pmatrix},\qquad L=\begin{pmatrix}1&1&0\\1&-1&1\\1&0&-1\\1&-1&-1\\1&0&0\\1&1&1\\1&0&1\\1&1&-1\\1&-1&0\end{pmatrix}`}</Latex>
          <p>
            Для маски S вводим независимые целые корни q<sub>P</sub> и
            записываем исходную систему без сокращений:
          </p>
          <Latex display>{String.raw`L_S\begin{pmatrix}E\\x\\y\end{pmatrix}=q_S^{[2]},\qquad q_S^{[2]}=(q_P^2)_{P\in S}`}</Latex>
          <p>
            Здесь утверждается квадратность всех клеток S, но не
            неквадратность дополнения. Поэтому термин k/9 далее означает «как
            минимум эти k клеток являются квадратами».
          </p>
        </section>

        <section>
          <h3>2. Теорема исключения и достаточности</h3>
          <p>
            Коэффициентные пары (x,y) девяти клеток образуют решётку 3×3.
            Четыре различные точки этой решётки не лежат на одной прямой;
            следовательно, для любой маски из четырёх или пяти клеток матрица
            L<sub>S</sub> имеет ранг 3.
          </p>
          <Latex display>{String.raw`\dim\ker L_S^T=|S|-3=\begin{cases}1,&|S|=4,\\2,&|S|=5.\end{cases}`}</Latex>
          <p>
            Пусть R₁,…,R<sub>|S|−3</sub> — базис левого ядра. Необходимость
            уравнений Rᵢ(q²)=0 получается умножением исходной системы слева.
            Обратно, над Q ортогональное дополнение левого ядра совпадает с
            образом L<sub>S</sub>. Поэтому эти уравнения достаточны и дают
            единственную тройку E, x, y.
          </p>
          <Latex display>{String.raw`q_S^{[2]}\in\operatorname{im}L_S\quad\Longleftrightarrow\quad R_i(q_S^{[2]})=0\quad(1\le i\le |S|-3)`}</Latex>
          <p>
            Для целочисленности выбираем ненулевой минор δ порядка 3. Формулы
            Крамера имеют знаменатель δ. Замена каждого корня q<sub>P</sub> на
            δq<sub>P</sub> умножает правую часть на δ² и превращает координаты
            в целые:
          </p>
          <Latex display>{String.raw`q_P\mapsto\delta q_P,\qquad q_P^2\mapsto\delta^2q_P^2,\qquad (E,x,y)\mapsto\delta^2(E,x,y)\in\mathbb Z^3`}</Latex>
        </section>

        <section>
          <h3>3. Почему орбит ровно 23</h3>
          <p>
            Группа D₄ действует вращениями и отражениями, сохраняя центр,
            множество четырёх углов и множество четырёх сторон. По лемме
            Бёрнсайда числа неподвижных пятиэлементных масок равны 126 для
            тождества, 2 для каждого поворота на ±90°, 6 для поворота на 180°
            и 12 для каждого из четырёх отражений. Поэтому
          </p>
          <Latex display>{String.raw`N_{5/9}=\frac{126+2+6+2+4\cdot12}{8}=23`}</Latex>
          <p>
            Тот же результат получается топологически для четырёх клеток. Без
            центра выбираются четыре клетки периметра: случаи 0 или 4 угла
            дают 2 орбиты, случаи 1 или 3 угла — 4, а случай 2+2 распадается на
            7; итого 13. С центром выбираются три клетки периметра: крайние
            случаи дают 2, а типы 1+2 и 2+1 — по 4; итого 10. Сумма 13+10=23.
          </p>
          <p>
            Дополнение маски коммутирует с D₄ и задаёт биекцию между орбитами
            4/9 и 5/9. Именно здесь исходный PDF пропустил ACDH, а вслед за ним
            дополнительную маску BEFGJ.
          </p>
        </section>

        <section>
          <h3>4. Общая параметризация квадрик 4/9</h3>
          <p>
            Для четырёх клеток исключение оставляет одну диагональную квадрику
            Σkᵢqᵢ²=0. Поскольку Σkᵢ=0, любая знаковая точка ε с координатами
            ±1 лежит на ней. Для направления u прямая через ε даёт
            универсальную проекционную формулу:
          </p>
          <Latex display>{String.raw`D=\sum_{i=1}^4k_iu_i^2,\quad L_\varepsilon=\sum_{i=1}^4k_i\varepsilon_i u_i,\quad q_i=D\varepsilon_i-2L_\varepsilon u_i`}</Latex>
          <Latex display>{String.raw`\sum k_iq_i^2=D^2\sum k_i\varepsilon_i^2-4DL_\varepsilon^2+4L_\varepsilon^2D=0`}</Latex>
          <p>
            Для полноты достаточно четырёх строк матрицы Адамара H. Если все
            kᵢ ненулевые и q* — ненулевая рациональная точка квадрики, то из
            det H=−16 следует, что хотя бы одно спаривание Lε(q*) ненулевое.
            В соответствующей карте подстановка u=q* даёт D=0 и
            q=−2Lε(q*)q*: получена та же проективная точка. После очистки
            знаменателей это даёт алгоритмическое покрытие целых решений.
          </p>
          <Latex display>{String.raw`H=\begin{pmatrix}1&1&1&1\\1&1&-1&-1\\1&-1&1&-1\\1&-1&-1&1\end{pmatrix},\qquad \det H=-16`}</Latex>
          <p>
            Красная вырожденная квадрика имеет один нулевой коэффициент:
            соответствующий четвёртый корень свободен, а нетривиальная коника
            параметризуется отдельно и полностью:
          </p>
          <Latex display>{String.raw`r=-a^2+2ab+b^2,\quad s=a^2+b^2,\quad t=a^2+2ab-b^2,\quad r^2+t^2=2s^2`}</Latex>
        </section>

        <section>
          <h3>5. Цветовая дифференциация</h3>
          <p>
            Цвет закрепляется не за позицией клетки, а за конкретным
            уравнением левого ядра. В большой матрице цветом отмечаются только
            фактические квадратные значения; в миниатюре — опоры выбранных
            уравнений. Пересечение двух опор делит миниатюру на два цвета.
          </p>
          {COMMON_PROOFS.map((proof) => (
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
          <h3>6. Переход от 4/9 к 5/9</h3>
          <p>
            Пять клеток дают две независимые квадрики. Канонический цветовой
            базис выбирается среди 4/9-подмасок так, чтобы отношения имели
            простейшие коэффициенты и минимальные опоры. Любой другой базис
            того же двумерного левого ядра эквивалентен, но не меняет ни
            множество решений, ни достаточность системы.
          </p>
          <Latex display>{String.raw`\ker L_S^T=\langle R_{\mathrm{color}_1},R_{\mathrm{color}_2}\rangle\quad\Longrightarrow\quad \{R_1(q^2)=R_2(q^2)=0\}\Longleftrightarrow\exists!\,(E,x,y)`}</Latex>
          <p>
            Индивидуальное доказательство обязано не только проверить эти две
            квадрики, но и вывести совместную параметризацию корней. Полнота
            указывается отдельно: доказанная, алгоритмически восстанавливаемая
            через НОД и знаки либо пока неизвестная. Проверка тождества сама по
            себе полноты не доказывает.
          </p>
        </section>

        <OrbitTable title="Все 23 орбиты 4/9" families={FOUR_FAMILIES} />
        <OrbitTable title="Все 23 орбиты 5/9" families={FIVE_FAMILIES} />
      </div>
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
          <Link to="/proofs/general">
            <span>00</span>
            <strong>Общая теория орбит 4/9 и 5/9</strong>
            <i>→</i>
          </Link>
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

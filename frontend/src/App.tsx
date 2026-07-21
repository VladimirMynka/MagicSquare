import { useMemo, useState, type FormEvent } from "react";
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
import {
  FAMILIES,
  familyById,
  type FamilyDefinition,
  type ParameterStrings,
} from "./lib/families";
import {
  createSnapshot,
  formatInteger,
  type Coordinates,
  type SquareCell,
} from "./lib/magicSquare";

const PARAMETER_KEYS = ["a", "b", "c", "d"] as const;

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
          <i /> alpha · 0.1
        </span>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lab" element={<LabPage />} />
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
            Параметрические семейства · точные доказательства
          </p>
          <h1>Магические квадраты, которые можно не только увидеть.</h1>
          <p className="hero-lead">
            Интерактивный атлас связывает каждый генератор с его квадратной
            маской, формулой и машинно проверяемым сертификатом.
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
              <strong>8</strong>
              <span>семейств в атласе</span>
            </div>
            <div>
              <strong>5/9</strong>
              <span>квадратная маска</span>
            </div>
            <div>
              <strong>0</strong>
              <span>делений в формулах</span>
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
          {FAMILIES.slice(0, 3).map((family, index) => (
            <Link
              className={`feature-card tone-${family.group}`}
              to={`/lab?family=${family.id}`}
              key={family.id}
            >
              <span className="feature-index">0{index + 1}</span>
              <Pattern mask={family.mask} />
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
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
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
      <div className="proof-stamp">
        <span>✓</span> proof-core
      </div>
    </div>
  );
}

function LabPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFamily = familyById(searchParams.get("family"));
  const initialParameters = PARAMETER_KEYS.map(
    (key, index) => searchParams.get(key) ?? initialFamily.defaults[index],
  ) as unknown as ParameterStrings;
  const [family, setFamily] = useState<FamilyDefinition>(initialFamily);
  const [parameters, setParameters] =
    useState<ParameterStrings>(initialParameters);
  const [coordinates, setCoordinates] = useState<Coordinates>(() =>
    initialFamily.generate(initialParameters),
  );
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const snapshot = useMemo(() => createSnapshot(coordinates), [coordinates]);
  const declaredMaskHolds = family.positions.every((position) =>
    snapshot.squarePositions.includes(position),
  );

  function persist(
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

  function generate(nextParameters = parameters, nextFamily = family) {
    try {
      const nextCoordinates = nextFamily.generate(nextParameters);
      setCoordinates(nextCoordinates);
      setError("");
      persist(nextFamily, nextParameters);
    } catch {
      setError("Параметры должны быть целыми числами.");
    }
  }

  function selectFamily(nextFamily: FamilyDefinition) {
    setFamily(nextFamily);
    setParameters(nextFamily.defaults);
    generate(nextFamily.defaults, nextFamily);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    generate();
  }

  function randomize() {
    const data = new Uint32Array(4);
    crypto.getRandomValues(data);
    const next = Array.from(data, (value) =>
      String((value % 9) + 1),
    ) as unknown as ParameterStrings;
    setParameters(next);
    generate(next);
  }

  function swapPairs() {
    const next: ParameterStrings = [
      parameters[2],
      parameters[3],
      parameters[0],
      parameters[1],
    ];
    setParameters(next);
    generate(next);
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
          <p className="eyebrow">Интерактивный proof atlas</p>
          <h1>Лаборатория 5/9</h1>
        </div>
        <p>
          Выберите семейство, задайте четыре целых параметра и исследуйте точную
          квадратную маску.
        </p>
      </div>

      <div className="lab-layout">
        <aside className="family-panel">
          <div className="panel-label">
            <span>Семейства</span>
            <small>{FAMILIES.length} certified</small>
          </div>
          <div className="family-list">
            {FAMILIES.map((candidate) => (
              <button
                className={`family-button tone-${candidate.group} ${candidate.id === family.id ? "active" : ""}`}
                onClick={() => selectFamily(candidate)}
                type="button"
                key={candidate.id}
              >
                <Pattern mask={candidate.mask} compact />
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
              <span className={`family-chip tone-${family.group}`}>
                {family.groupLabel}
              </span>
              <h2>{family.title}</h2>
            </div>
            <button className="icon-button" type="button" onClick={copyLink}>
              {copied ? "Скопировано" : "Поделиться ↗"}
            </button>
          </div>

          <form className="parameter-form" onSubmit={submit}>
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
            <div className="parameter-actions">
              <button className="button button-primary" type="submit">
                Построить квадрат
              </button>
              <button
                className="button button-ghost"
                type="button"
                onClick={randomize}
              >
                Случайные
              </button>
              <button
                className="button button-ghost"
                type="button"
                onClick={swapPairs}
              >
                Поменять пары
              </button>
            </div>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
          </form>

          <div className="square-stage">
            <div className="stage-meta">
              <span>Матрица 3 × 3</span>
              <span>Σ = {formatInteger(snapshot.magicSum)}</span>
            </div>
            <div className="result-grid">
              {snapshot.cells.map((cell) => (
                <ResultCell
                  cell={cell}
                  declared={family.positions.includes(cell.position)}
                  key={cell.position}
                />
              ))}
            </div>
            <div className="transform-row">
              <button
                type="button"
                onClick={() => setCoordinates(([e, x, y]) => [e, -y, x])}
              >
                ↺ Повернуть
              </button>
              <button
                type="button"
                onClick={() => setCoordinates(([e, x, y]) => [e, y, x])}
              >
                ↔ Отразить
              </button>
              <button type="button" onClick={() => generate()}>
                ↻ Сбросить
              </button>
            </div>
          </div>

          <div className="verification-grid">
            <StatusCard
              label="Магический инвариант"
              value={snapshot.lineSumsAgree ? "8 линий совпадают" : "Нарушен"}
              ok={snapshot.lineSumsAgree}
            />
            <StatusCard
              label="Заявленная маска"
              value={`${family.mask} · ${declaredMaskHolds ? "подтверждена" : "нарушена"}`}
              ok={declaredMaskHolds}
            />
            <StatusCard
              label="Фактический результат"
              value={`${snapshot.squarePositions.length}/9 квадратов`}
              ok={snapshot.squarePositions.length >= 5}
            />
          </div>

          <div className="family-note">
            <div>
              <span className="proof-icon">✓</span>
              <div>
                <strong>Символьный сертификат</strong>
                <code>{family.theorem}</code>
              </div>
            </div>
            <p>{family.summary}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function ResultCell({
  cell,
  declared,
}: {
  cell: SquareCell;
  declared: boolean;
}) {
  const digits = cell.value.toString().length;
  return (
    <div
      className={`result-cell ${cell.isSquare ? "is-square" : ""} ${declared ? "is-declared" : ""}`}
    >
      <span className="cell-position">{cell.position}</span>
      <strong className={digits > 18 ? "tiny" : digits > 11 ? "small" : ""}>
        {formatInteger(cell.value)}
      </strong>
      {cell.isSquare && (
        <span className="square-marker" title="Полный квадрат">
          □
        </span>
      )}
    </div>
  );
}

function StatusCard({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok: boolean;
}) {
  return (
    <div className="status-card">
      <span className={ok ? "ok" : "bad"}>{ok ? "✓" : "!"}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Pattern({
  mask,
  compact = false,
}: {
  mask: string;
  compact?: boolean;
}) {
  const positions = "ABCDEFGHJ";
  return (
    <span
      className={`pattern ${compact ? "compact" : ""}`}
      aria-label={`Маска ${mask}`}
    >
      {Array.from(positions, (position) => (
        <i className={mask.includes(position) ? "on" : ""} key={position} />
      ))}
    </span>
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
            точными полиномиальными тождествами. SPA переносит сертифицированные
            формулы, но не заменяет их доказательства.
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

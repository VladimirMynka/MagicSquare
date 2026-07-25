import { Latex } from "./Latex";
import {
  SIX_NINE_PATTERNS,
  type SixNineCondition,
  type SixNinePattern,
} from "../content/sixNinePatterns";
import { useLocale } from "../i18n";

const POSITIONS = Array.from("ABCDEFGHJ");

const CELL_FORMS: Readonly<Record<string, string>> = {
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

const CONDITION_LABELS = {
  red: { ru: "прогрессия квадратов", en: "progression of squares" },
  yellow: { ru: "гауссова норма", en: "Gaussian norm" },
  blue: { ru: "норма x²+2y²", en: "x²+2y² norm" },
  brown: { ru: "дополнительная квадрика", en: "additional quadric" },
} as const;

function sourceSystem(pattern: SixNinePattern): string {
  const equations = [...pattern.mask]
    .map((position) => `${CELL_FORMS[position]}&=${position.toLowerCase()}^2`)
    .join(String.raw`\\`);
  return String.raw`\left\{\begin{aligned}${equations}\end{aligned}\right.`;
}

function relationTone(
  conditions: readonly SixNineCondition[],
  conditionIndex: number,
): string {
  const condition = conditions[conditionIndex];
  const sameKind = conditions.filter((item) => item.kind === condition.kind);
  const kindIndex = sameKind.indexOf(condition);
  if (condition.kind === "red") {
    return sameKind.length === 1
      ? "red-mid"
      : ["red-light", "red-mid", "red-dark"][kindIndex];
  }
  if (condition.kind === "blue") {
    return sameKind.length === 1 || kindIndex === 0
      ? "blue-light"
      : "blue-dark";
  }
  return condition.kind;
}

function relationColor(
  conditions: readonly SixNineCondition[],
  conditionIndex: number,
): string {
  const tone = relationTone(conditions, conditionIndex);
  return `var(--six-nine-${tone})`;
}

function cellBackground(pattern: SixNinePattern, position: string): string | undefined {
  if (!pattern.mask.includes(position)) return undefined;
  const colors = pattern.conditions
    .map((condition, index) =>
      condition.support.includes(position)
        ? relationColor(pattern.conditions, index)
        : null,
    )
    .filter((color): color is string => color !== null);
  if (colors.length === 0) return "var(--paper-muted)";
  if (colors.length === 1) return colors[0];
  const stops = colors.flatMap((color, index) => {
    const start = (index / colors.length) * 100;
    const end = ((index + 1) / colors.length) * 100;
    return [`${color} ${start}%`, `${color} ${end}%`];
  });
  return `linear-gradient(135deg, ${stops.join(", ")})`;
}

function AtlasPattern({ pattern }: { pattern: SixNinePattern }) {
  return (
    <span className="six-nine-atlas-pattern" aria-hidden="true">
      {POSITIONS.map((position) => (
        <i
          className={pattern.mask.includes(position) ? "active" : ""}
          key={position}
          style={{ background: cellBackground(pattern, position) }}
        >
          {position}
        </i>
      ))}
    </span>
  );
}

export function SixNineOrbitAtlas({
  title,
}: {
  title: string;
}) {
  const { locale, text } = useLocale();

  return (
    <section className="orbit-atlas orbit-atlas-6 six-nine-orbit-atlas">
      <header className="orbit-atlas-header">
        <div>
          <p className="eyebrow">{text("Доказательный атлас", "Proof atlas")}</p>
          <h4>{title}</h4>
        </div>
        <p>
          {text(
            "Каждая карточка содержит исходную систему и три предпочтительных независимых отношения. Оттенки одного цвета разделяют разные условия одного математического типа.",
            "Every card contains the original system and three preferred independent relations. Shades of one color distinguish separate conditions of the same mathematical type.",
          )}
        </p>
        <div className="orbit-atlas-legend">
          {(["red", "yellow", "blue", "brown"] as const).map((kind) => (
            <span key={kind}>
              <i className={`proof-swatch six-nine-${kind}`} />
              {CONDITION_LABELS[kind][locale]}
            </span>
          ))}
          <span className="six-nine-atlas-status-legend">
            {text(
              "Статус показывает сильнейший доказанный результат, а не наличие отдельных примеров.",
              "Status shows the strongest proved result, not isolated examples.",
            )}
          </span>
        </div>
      </header>

      <div className="orbit-atlas-scroll-shell">
        <div
          aria-label={text(
            `${title}: горизонтальная прокрутка`,
            `${title}: horizontally scrollable sheet`,
          )}
          className="orbit-atlas-scroll"
          role="region"
          tabIndex={0}
        >
          <div className="orbit-atlas-grid" role="list" aria-label={title}>
            {SIX_NINE_PATTERNS.map((pattern, index) => (
              <article
                className={`orbit-atlas-entry six-nine-atlas-entry status-${pattern.status}`}
                id={`mask-${pattern.mask.toLowerCase()}`}
                key={pattern.mask}
                role="listitem"
              >
                <header className="orbit-atlas-entry-header">
                  <span className="orbit-atlas-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <AtlasPattern pattern={pattern} />
                  <div>
                    <a
                      className="orbit-atlas-title"
                      href={`#mask-${pattern.mask.toLowerCase()}`}
                    >
                      {pattern.mask}
                    </a>
                    <p>
                      {text("дополнение", "complement")}: {pattern.complement}
                    </p>
                  </div>
                </header>

                <div className="six-nine-atlas-signature">
                  {pattern.conditions.map((condition, conditionIndex) => (
                    <span
                      className={relationTone(pattern.conditions, conditionIndex)}
                      key={condition.id}
                    >
                      {condition.kind}({condition.id})
                    </span>
                  ))}
                </div>

                <div className="orbit-atlas-system">
                  <Latex display>{sourceSystem(pattern)}</Latex>
                </div>

                <div className="orbit-atlas-quadrics">
                  {pattern.conditions.map((condition, conditionIndex) => (
                    <div
                      className={`orbit-atlas-relation ${relationTone(pattern.conditions, conditionIndex)}`}
                      key={condition.id}
                    >
                      <Latex display>{condition.latex}</Latex>
                    </div>
                  ))}
                </div>

                <div className="six-nine-atlas-note">
                  <p>{pattern.note[locale]}</p>
                  <strong className={`status-${pattern.status}`}>
                    {pattern.statusText[locale]}
                  </strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

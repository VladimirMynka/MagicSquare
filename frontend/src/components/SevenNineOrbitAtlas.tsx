import { Latex } from "./Latex";
import {
  SEVEN_NINE_PATTERNS,
  sevenNineProfile,
  type SevenNinePattern,
} from "../content/sevenNinePatterns";
import { useLocale } from "../i18n";
import { TheoryLink } from "../TheoryPages";

const POSITIONS = Array.from("ABCDEFGHJ");

function relationTone(pattern: SevenNinePattern, relationIndex: number): string {
  const relation = pattern.relations[relationIndex];
  const sameKind = pattern.relations.filter((item) => item.kind === relation.kind);
  const kindIndex = sameKind.indexOf(relation);
  if (relation.kind === "yellow") {
    return kindIndex === 0 ? "yellow-light" : "yellow-dark";
  }
  return ["red-light", "red-mid", "red-dark", "red-deep"][kindIndex];
}

function relationColor(pattern: SevenNinePattern, relationIndex: number): string {
  return `var(--seven-nine-${relationTone(pattern, relationIndex)})`;
}

function cellBackground(pattern: SevenNinePattern, position: string): string | undefined {
  if (!pattern.mask.includes(position)) return undefined;
  const colors = pattern.relations
    .map((relation, index) =>
      relation.support.includes(position) ? relationColor(pattern, index) : null,
    )
    .filter((color): color is string => color !== null);
  if (colors.length === 0) return "var(--paper-muted)";
  if (colors.length === 1) return colors[0];
  return `linear-gradient(135deg, ${colors
    .flatMap((color, index) => {
      const start = (index / colors.length) * 100;
      const end = ((index + 1) / colors.length) * 100;
      return [`${color} ${start}%`, `${color} ${end}%`];
    })
    .join(", ")})`;
}

function AtlasPattern({ pattern }: { pattern: SevenNinePattern }) {
  return (
    <span className="seven-nine-atlas-pattern" aria-hidden="true">
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

export function SevenNineOrbitAtlas({ title }: { title: string }) {
  const { locale, text } = useLocale();

  return (
    <section className="orbit-atlas seven-nine-orbit-atlas">
      <header className="orbit-atlas-header">
        <div>
          <p className="eyebrow">
            {text("Полный тригонометрический атлас", "Complete trigonometric atlas")}
          </p>
          <h4>{title}</h4>
        </div>
        <p>
          {text(
            "Главный объект каждой карточки — упрощённое уравнение на трёх рациональных углах. Шесть орбит выражаются только через sin 4α, sin 4β и sin 4γ; две смешанные орбиты сохраняют также функции двойных углов. Координатное восстановление корней вынесено в раскрываемый технический блок.",
            "The main object in every card is a simplified equation in three rational angles. Six orbits use only sin 4α, sin 4β, and sin 4γ; two mixed orbits also retain double-angle functions. Coordinate reconstruction of the roots is placed in an expandable technical block.",
          )}
        </p>
        <div className="orbit-atlas-legend">
          <span>
            <i className="proof-swatch seven-nine-red" />
            {text("красная прогрессия квадратов", "red progression of squares")}
          </span>
          <span>
            <i className="proof-swatch seven-nine-yellow" />
            {text("жёлтое равенство норм", "yellow norm equality")}
          </span>
          <span className="seven-nine-atlas-status-legend">
            {text(
              "R/Y-профиль упорядочен по правилу red > yellow.",
              "The R/Y profile follows the priority red > yellow.",
            )}
          </span>
        </div>
      </header>

      <div className="seven-nine-atlas-grid" role="list" aria-label={title}>
        {SEVEN_NINE_PATTERNS.map((pattern, index) => (
          <article
            className={`seven-nine-atlas-entry${
              pattern.knownIntegralClass ? " known-integral-class" : ""
            }`}
            id={`mask-${pattern.mask.toLowerCase()}`}
            key={pattern.mask}
            role="listitem"
          >
            <header className="seven-nine-atlas-entry-header">
              <span className="orbit-atlas-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <AtlasPattern pattern={pattern} />
              <div>
                <TheoryLink
                  className="orbit-atlas-title"
                  to={`/theory/7-9-patterns#type-${index + 1}`}
                >
                  {pattern.mask}
                </TheoryLink>
                <p>
                  {text("дополнение", "complement")} {pattern.complement} ·{" "}
                  {text("размер орбиты", "orbit size")} {pattern.orbitSize}
                </p>
                <small>{pattern.complementShape[locale]}</small>
              </div>
            </header>

            <div className="seven-nine-equation-hero">
              <span>
                {text(
                  "упрощённое тригонометрическое уравнение",
                  "simplified trigonometric equation",
                )}
              </span>
              <Latex display>{pattern.trigEquationLatex}</Latex>
            </div>

            <div className="seven-nine-atlas-signature">
              <strong>{sevenNineProfile(pattern)}</strong>
              {pattern.relations.map((relation, relationIndex) => (
                <span className={relationTone(pattern, relationIndex)} key={relation.id}>
                  {relationIndex < 3
                    ? text("строит", "builds")
                    : text("замыкает", "closes")}{" "}
                  {relation.id}
                </span>
              ))}
            </div>

            <div className="seven-nine-atlas-relations">
              {pattern.relations.map((relation, relationIndex) => (
                <div
                  className={`seven-nine-atlas-relation ${relationTone(
                    pattern,
                    relationIndex,
                  )}`}
                  key={relation.id}
                >
                  <span>{relation.id}</span>
                  <Latex display>{relation.latex}</Latex>
                </div>
              ))}
            </div>

            <details className="seven-nine-coordinate-details">
              <summary>
                {text(
                  "Координатное восстановление корней",
                  "Coordinate reconstruction of the roots",
                )}
              </summary>
              <div className="seven-nine-root-chart">
                <p>
                  {text("Нормировка", "Normalization")}:{" "}
                  <Latex>{pattern.normalizationLatex}</Latex>
                </p>
                <Latex display>{pattern.rootsLatex}</Latex>
                <p>{text("Координатный остаток", "Coordinate residual")}</p>
                <Latex display>{pattern.coordinateEquationLatex}</Latex>
              </div>
            </details>

            <p className="seven-nine-atlas-note">{pattern.derivation[locale]}</p>
            {pattern.knownIntegralClass && (
              <strong className="seven-nine-known-badge">
                {text(
                  "Орбита известного целого класса 7/9",
                  "Orbit of the known integral 7/9 class",
                )}
              </strong>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

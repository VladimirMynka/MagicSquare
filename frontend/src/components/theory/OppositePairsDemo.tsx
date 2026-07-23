import { useState } from "react";
import { useLocale } from "../../i18n";

const cells = [
  { square: "a²", root: "a", pair: 0 },
  { square: "b²", root: "b", pair: 1 },
  { square: "c²", root: "c", pair: 2 },
  { square: "d²", root: "d", pair: 3 },
  { square: "e²", root: "e", pair: -1 },
  { square: "f²", root: "f", pair: 3 },
  { square: "g²", root: "g", pair: 2 },
  { square: "h²", root: "h", pair: 1 },
  { square: "j²", root: "j", pair: 0 },
] as const;

export function OppositePairsDemo() {
  const { text } = useLocale();
  const [showDivisibility, setShowDivisibility] = useState(false);

  return (
    <figure className="theory-demo opposite-pairs-demo">
      <div className="theory-demo-heading">
        <span>{text("Структура квадрата", "Square structure")}</span>
        <strong>
          {text("Пять представлений числа 2e²", "Five representations of 2e²")}
        </strong>
      </div>

      <div className="opposite-pairs-layout">
        <div className={`opposite-pairs-grid${showDivisibility ? " divisibility-mode" : ""}`}>
          {cells.map((cell, index) => (
            <div
              className={`opposite-pair-cell pair-${cell.pair}${index === 4 ? " center-cell" : ""}`}
              key={cell.square}
            >
              <strong>{cell.square}</strong>
              {showDivisibility && <small>q ∣ {cell.root}</small>}
            </div>
          ))}
        </div>

        <div className="opposite-pairs-explanation">
          <div className="demo-toggle" role="group" aria-label={text("Режим схемы", "Diagram mode")}>
            <button
              className={!showDivisibility ? "active" : ""}
              onClick={() => setShowDivisibility(false)}
              type="button"
            >
              {text("Пары", "Pairs")}
            </button>
            <button
              className={showDivisibility ? "active" : ""}
              onClick={() => setShowDivisibility(true)}
              type="button"
            >
              q ∣ e
            </button>
          </div>

          {showDivisibility ? (
            <>
              <p>
                {text(
                  "Если q≡3 (mod 4) делит e, лемма о сумме двух квадратов переносит q на оба корня каждой пары.",
                  "If q≡3 (mod 4) divides e, the sum-of-two-squares lemma propagates q to both roots in every pair.",
                )}
              </p>
              <strong>
                {text(
                  "q делит все девять корней — минимальность нарушена.",
                  "q divides all nine roots, contradicting minimality.",
                )}
              </strong>
            </>
          ) : (
            <>
              <p>a² + j² = b² + h² = c² + g² = d² + f² = 2e²</p>
              <strong>e² + e² = 2e²</strong>
            </>
          )}
        </div>
      </div>
      <figcaption>
        {text(
          "Одинаковый цвет связывает клетки, противоположные относительно центра.",
          "Matching colors connect entries opposite through the center.",
        )}
      </figcaption>
    </figure>
  );
}

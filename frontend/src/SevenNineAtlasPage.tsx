import { SevenNineOrbitAtlas } from "./components/SevenNineOrbitAtlas";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function SevenNineAtlasPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page orbit-level-page seven-nine-atlas-page">
      <TheoryLink className="back-link" to="/theory/7-9-patterns">
        ← {text("К полному выводу 7/9", "Back to the complete 7/9 derivation")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Полная классификация по D₄", "Complete D4 classification")}
          </p>
          <h1>
            {text(
              "Семь квадратных клеток: 8 трёхугловых поверхностей",
              "Seven Square Entries: 8 Three-Angle Surfaces",
            )}
          </h1>
          <p>
            {text(
              "Каждая карточка представляет одну позиционную орбиту, полный базис из четырёх красных и жёлтых квадрик и одно упрощённое тригонометрическое уравнение на трёх рациональных углах. Обратимые координатные формулы семи корней сохранены в раскрываемом техническом блоке.",
              "Every card represents one positional orbit, a complete basis of four red and yellow quadrics, and one simplified trigonometric equation in three rational angles. Reversible coordinate formulas for the seven roots remain available in an expandable technical block.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document orbit-level-document">
        <section>
          <p>
            {text(
              "Полнота относится к орбитам и к редукции исходной системы: на невырожденном рациональном локусе ни одна ветвь четырёх квадрик не теряется. Классификация рациональных или целых точек восьми итоговых поверхностей остаётся отдельной арифметической задачей.",
              "Completeness concerns the orbit census and the reduction of the original system: no branch of the four quadrics is lost on the nondegenerate rational locus. Classifying rational or integral points on the eight resulting surfaces remains a separate arithmetic problem.",
            )}
          </p>
          <p>
            <TheoryLink className="general-proof-link" to="/theory/7-9-patterns">
              {text(
                "Доказательство числа орбит, полноты карт и пошаговый вывод формул",
                "Proof of the orbit count, chart completeness, and step-by-step derivation",
              )}{" "}
              →
            </TheoryLink>
          </p>
          <SevenNineOrbitAtlas
            title={text(
              "Восемь орбит и восемь уравнений 7/9",
              "Eight orbits and eight equations for 7/9",
            )}
          />
        </section>
      </div>
    </article>
  );
}

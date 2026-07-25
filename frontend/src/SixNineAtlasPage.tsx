import { SixNineOrbitAtlas } from "./components/SixNineOrbitAtlas";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function SixNineAtlasPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page orbit-level-page six-nine-atlas-page">
      <TheoryLink className="back-link" to="/theory/6-9-patterns">
        ← {text("К теории масок 6/9", "Back to the theory of 6/9 patterns")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Полная классификация по D₄", "Complete D4 classification")}
          </p>
          <h1>
            {text(
              "Шесть квадратных клеток: 16 орбит",
              "Six square entries: 16 orbits",
            )}
          </h1>
          <p>
            {text(
              "Каждая маска задаёт шесть гарантированно квадратных значений и три независимые квадрики после исключения E,x,y. Атлас отделяет каноническую систему от достигнутого для неё уровня решения.",
              "Every pattern specifies six guaranteed square values and three independent quadrics after E,x,y are eliminated. The atlas separates the canonical system from the level of solution attained for it.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document orbit-level-document">
        <section>
          <p>
            {text(
              "Число 6 — нижняя гарантия, а не запрет на дополнительные квадратные клетки. Цвета в карточке относятся к выбранным независимым уравнениям; несколько оттенков красного обозначают несколько арифметических прогрессий квадратов.",
              "The number 6 is a lower guarantee, not a prohibition on additional square-valued entries. Colors in a card belong to the chosen independent equations; several shades of red denote several arithmetic progressions of squares.",
            )}
          </p>
          <p>
            {text(
              "Статус карточки фиксирует сильнейший доказанный результат. Название со стрелкой открывает полный вывод: для непараллельных масок — собственную статью о поверхности, для ABDFHJ и ABEFGJ — общий цикл tfmn, F4+, F7+ и F9+.",
              "Each card records the strongest proved result. A title followed by an arrow opens the full derivation: an individual surface article for a nonparallel pattern, and the common tfmn, F4+, F7+, and F9+ series for ABDFHJ and ABEFGJ.",
            )}
          </p>
          <p>
            <TheoryLink className="general-proof-link" to="/theory/6-9-patterns">
              {text(
                "Доказательство полноты классификации и достаточности трёх квадрик",
                "Proof of classification completeness and sufficiency of the three quadrics",
              )}{" "}
              →
            </TheoryLink>
          </p>
          <SixNineOrbitAtlas
            title={text(
              "Все 16 орбит и тройки квадрик 6/9",
              "All 16 orbits and triples of quadrics for 6/9",
            )}
          />
        </section>
      </div>
    </article>
  );
}

import { Latex } from "./components/Latex";
import { SevenNineOrbitAtlas } from "./components/SevenNineOrbitAtlas";
import {
  SEVEN_NINE_PATTERNS,
  sevenNineProfile,
} from "./content/sevenNinePatterns";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function SevenNinePatternsTheoryPage() {
  const { locale, text } = useLocale();

  return (
    <article className="page proof-page topic-page seven-nine-patterns-theory-page">
      <TheoryLink className="back-link" to="/theory#partial-configurations">
        ←{" "}
        {text(
          "К циклу о частичных конфигурациях",
          "Back to the partial-configurations series",
        )}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Частичные квадратные конфигурации · 3.7",
              "Partial square configurations · 3.7",
            )}
          </p>
          <h1>
            {text(
              "Маски 7/9: полный тригонометрический атлас",
              "7/9 Patterns: A Complete Trigonometric Atlas",
            )}
          </h1>
          <p>
            {text(
              "С точностью до вращений и отражений семь квадратных клеток располагаются восемью способами. Для каждой орбиты четыре квадрики сворачиваются в одно уравнение на трёх рациональных углах; ниже выведены все восемь моделей и точно указана граница их полноты.",
              "Up to rotations and reflections, seven square entries occur in eight positional patterns. For every orbit, four quadrics collapse to one equation in three rational angles; all eight models are derived below, together with the exact scope of their completeness.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document seven-nine-patterns-theory-document">
        <section>
          <h2>{text("1. Постановка и восемь орбит", "1. Setup and the eight orbits")}</h2>
          <p>
            {text(
              "Используется общая координатная форма магического квадрата порядка 3:",
              "The general coordinate form of a magic square of order 3 is",
            )}
          </p>
          <Latex display>{String.raw`
\begin{pmatrix}
A&B&C\\D&E&F\\G&H&J
\end{pmatrix}
=
\begin{pmatrix}
E+x&E-x+y&E-y\\
E-x-y&E&E+x+y\\
E+y&E+x-y&E-x
\end{pmatrix}.`}</Latex>
          <p>
            {text(
              "Для выбранной семиклеточной маски S записываем P=p² для каждой P∈S. Семь линейных форм от E,x,y имеют ранг 3, поэтому их левое ядро имеет размерность 7−3=4. Иначе говоря, каждая маска 7/9 задаётся ровно четырьмя независимыми однородными квадриками между семью корнями.",
              "For a selected seven-entry pattern S, write P=p² for every P∈S. The seven linear forms in E,x,y have rank 3, so their left kernel has dimension 7−3=4. Thus every 7/9 pattern is defined by exactly four independent homogeneous quadrics among its seven roots.",
            )}
          </p>
          <Latex display>{String.raw`
\dim\ker L_S^{\,T}=7-\operatorname{rank}L_S=4.`}</Latex>

          <div className="theorem-block">
            <h3>{text("Теорема о числе орбит", "Orbit-count theorem")}</h3>
            <p>
              {text(
                "Существует ровно восемь D₄-орбит семиклеточных масок.",
                "There are exactly eight D4 orbits of seven-entry patterns.",
              )}
            </p>
          </div>
          <p>
            {text(
              "Дополнение содержит две клетки, поэтому достаточно классифицировать неупорядоченные пары позиций. По лемме Бёрнсайда тождество фиксирует C(9,2)=36 пар, повороты на ±90° не фиксируют ни одной, поворот на 180° фиксирует четыре пары противоположных клеток. У каждого из четырёх отражений три неподвижные клетки и три переставляемые пары; фиксированы C(3,2)+3=6 двухэлементных множеств.",
              "The complement has two entries, so it is enough to classify unordered pairs of positions. By Burnside's lemma, the identity fixes C(9,2)=36 pairs, the ±90° rotations fix none, and the 180° rotation fixes the four opposite pairs. Each of the four reflections has three fixed entries and three exchanged pairs, hence fixes C(3,2)+3=6 two-element sets.",
            )}
          </p>
          <Latex display>{String.raw`
N_{7/9}=N_{2/9}
=\frac{36+0+4+0+4\cdot6}{8}=8.`}</Latex>
          <p>
            {text(
              "Восемь типов дополнения — соседние угловая и боковая клетки, два угла одной стороны, угол с центром, ход коня, противоположные углы, две боковые клетки у одного угла, боковая клетка с центром и противоположные боковые клетки. Размеры соответствующих орбит равны 8,4,4,8,2,4,4,2 и в сумме дают все 36 пар.",
              "The eight complement types are an adjacent corner-edge pair, two corners on one side, a corner with the center, a knight move, opposite corners, two edge cells adjacent to a corner, an edge cell with the center, and opposite edge cells. Their orbit sizes are 8,4,4,8,2,4,4,2, summing to all 36 pairs.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "2. Универсальные координаты одного угла",
              "2. Universal one-angle coordinates",
            )}
          </h2>
          <p>
            {text(
              "Пусть t=tan θ∈P¹(ℚ). Введём четыре рациональные функции:",
              "Let t=tan θ∈P¹(ℚ). Introduce four rational functions:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
C_t&=\frac{1-t^2}{1+t^2}=\cos 2\theta,&
S_t&=\frac{2t}{1+t^2}=\sin 2\theta,\\
L_t&=S_t-C_t=\frac{t^2+2t-1}{1+t^2},&
R_t&=S_t+C_t=\frac{1+2t-t^2}{1+t^2}.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Они одновременно параметризуют красную прогрессию квадратов и жёлтое равенство двух норм:",
              "They simultaneously parametrize a red progression of squares and a yellow equality of two norms:",
            )}
          </p>
          <Latex display>{String.raw`
L_t^2+R_t^2=2,\qquad C_t^2+S_t^2=1,`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
X^2+Z^2=2Y^2
&\Longleftarrow (X,Z)=Y(L_t,R_t),\\
P^2+Q^2=U^2+V^2
&\Longleftarrow
\binom UV=
\begin{pmatrix}C_t&-S_t\\S_t&C_t\end{pmatrix}\binom PQ.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Первая строка — рациональная параметризация коники арифметических прогрессий квадратов. Её нормированный ориентированный шаг равен",
              "The first line is the rational parametrization of the conic of arithmetic progressions of squares. Its normalized oriented difference is",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{dir}(t)=R_t^2-1=1-L_t^2
=\sin4\theta
=\frac{4t(1-t^2)}{(1+t^2)^2}.`}</Latex>
          <p>
            {text(
              "Вторая строка — рациональный поворот окружности. Обе параметризации полны над ℚ в проективном смысле: точка t=∞ добавляет недостающую точку обычной аффинной карты, а знаки корней позволяют выбрать компоненту ортогонального преобразования с определителем +1.",
              "The second line is a rational rotation of the circle. Both parametrizations are complete over Q in the projective sense: t=∞ supplies the point missing from the ordinary affine chart, while root signs allow the determinant +1 component of the orthogonal transformation to be chosen.",
            )}
          </p>
          <p>
            {text(
              "Обратный параметр виден непосредственно. Для нормированной красной прогрессии l²+r²=2 полагаем S=(l+r)/2 и C=(r−l)/2; для двух ненулевых векторов одинаковой нормы N полагаем C=(PU+QV)/N и S=(PV−QU)/N. В обоих случаях",
              "The inverse parameter is explicit. For a normalized red progression l²+r²=2, put S=(l+r)/2 and C=(r−l)/2; for two nonzero vectors of the same norm N, put C=(PU+QV)/N and S=(PV−QU)/N. In both cases",
            )}
          </p>
          <Latex display>{String.raw`
t=\frac{S}{1+C}\quad(C\ne-1),\qquad
C=-1\Longleftrightarrow t=\infty.`}</Latex>
        </section>

        <section>
          <h2>
            {text(
              "3. От четырёх квадрик к одному уравнению",
              "3. From four quadrics to one equation",
            )}
          </h2>
          <p>
            {text(
              "Для каждой орбиты выбирается базис левого ядра с лексикографическим приоритетом red > yellow. Получаются профили",
              "For every orbit, a basis of the left kernel is selected with lexicographic priority red > yellow. The resulting profiles are",
            )}
          </p>
          <Latex display>{String.raw`
RRRY,\ RRRR,\ RRRY,\ RRRR,\ RRRR,\ RRRY,\ RRYY,\ RRRY.`}</Latex>
          <p>
            {text(
              "Первые три отношения в каждой строке атласа используются как строительные. Каждое вводит один рациональный угол и новые корни, сохраняя уже построенные общие клетки. После общей нормировки все семь корней становятся рациональными функциями u,v,w. Четвёртая независимая квадрика не может следовать из первых трёх; её подстановка даёт одно уравнение Fᵢ(u,v,w)=0.",
              "The first three relations in every atlas row are used constructively. Each introduces one rational angle and new roots while preserving the already constructed shared entries. After one common normalization, all seven roots become rational functions of u,v,w. The fourth independent quadric cannot follow from the first three; substitution into it gives one equation Fᵢ(u,v,w)=0.",
            )}
          </p>
          <div className="theorem-block">
            <h3>
              {text(
                "Теорема о полноте трёхугловых карт",
                "Completeness theorem for the three-angle charts",
              )}
            </h3>
            <p>
              {text(
                "На невырожденном рациональном локусе каждой из восьми масок любое решение четырёх исходных квадрик после выбора общего масштаба и знаков корней представляется рациональной тройкой (u,v,w), удовлетворяющей выделенному уравнению соответствующей карточки. Обратно, каждая такая тройка восстанавливает решение по выписанным формулам корней.",
                "On the nondegenerate rational locus of each of the eight patterns, every solution of the four original quadrics can, after choosing a common scale and root signs, be represented by a rational triple (u,v,w) satisfying the highlighted equation in the corresponding card. Conversely, every such triple reconstructs a solution through the displayed root formulas.",
              )}
            </p>
          </div>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Необходимость следует последовательным применением полной параметризации красной коники и рационального поворота жёлтой нормы. В каждой цепочке общая ненулевая клетка однозначно определяет следующий масштаб. После трёх шагов остаётся четвёртая базисная квадрика, то есть ровно Fᵢ=0. В обратную сторону формулы тождественно удовлетворяют первым трём отношениям, а Fᵢ=0 — четвёртому. Поскольку четыре коэффициентных вектора имеют ранг 4=7−3, вектор семи квадратов лежит в образе Lₛ и восстанавливает единственные E,x,y.",
              "Necessity follows by successively applying the complete parametrization of the red conic and the rational rotation for a yellow norm. In every chain, a shared nonzero entry uniquely determines the next scale. After three steps, the fourth basis quadric remains, which is exactly Fᵢ=0. Conversely, the formulas identically satisfy the first three relations, while Fᵢ=0 gives the fourth. Since the four coefficient vectors have rank 4=7−3, the vector of seven squares lies in the image of Lₛ and recovers unique E,x,y.",
            )}
          </p>
          <p>
            {text(
              "Делители Lᵥ, L𝑤, Rᵥ, R𝑤 и S𝑤 появляются только при восстановлении масштаба из уже известного корня. На положительном попарно различном локусе используемый общий корень ненулевой; в единственном месте с S𝑤 в знаменателе равенство S𝑤=0 заставило бы A=C и также вышло бы из этого локуса. Для проективной границы применяются соседние карты: перестановка концов прогрессии, смена знака корня или точка параметра ∞.",
              "The denominators Lᵥ, L𝑤, Rᵥ, R𝑤, and S𝑤 occur only when a scale is recovered from a known root. On the positive pairwise-distinct locus, that shared root is nonzero; at the sole occurrence of S𝑤 in a denominator, S𝑤=0 would force A=C and leave this locus as well. Adjacent charts cover the projective boundary by swapping progression endpoints, changing a root sign, or using the parameter value ∞.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Атлас как главный объект", "4. The atlas as the main object")}</h2>
          <p>
            {text(
              "Карточки упорядочены по геометрическому типу двух неквадратных позиций. Цветовая полоса показывает четыре базисных отношения, а крупная рамка — итоговую трёхугловую поверхность. Число 7 остаётся нижней гарантией: точка поверхности может дать дополнительную восьмую или девятую квадратную клетку.",
              "The cards are ordered by the geometric type of the two nonspecified positions. The colored strip shows the four basis relations, while the large framed formula is the resulting three-angle surface. The number 7 remains a lower guarantee: a point on a surface may produce an additional eighth or ninth square entry.",
            )}
          </p>
          <SevenNineOrbitAtlas
            title={text(
              "Восемь орбит и восемь уравнений 7/9",
              "Eight orbits and eight equations for 7/9",
            )}
          />
        </section>

        <section>
          <h2>
            {text(
              "5. Пошаговый вывод всех восьми уравнений",
              "5. Step-by-step derivation of all eight equations",
            )}
          </h2>
          {SEVEN_NINE_PATTERNS.map((pattern, index) => (
            <section
              className="seven-nine-derivation"
              id={`type-${index + 1}`}
              key={pattern.mask}
            >
              <h3>
                {index + 1}. {pattern.mask} · {sevenNineProfile(pattern)}
              </h3>
              <p>
                {text("Дополнение", "Complement")} {pattern.complement}:{" "}
                {pattern.complementShape[locale]}. {pattern.derivation[locale]}
              </p>
              <div className="seven-nine-derivation-relations">
                {pattern.relations.map((relation, relationIndex) => (
                  <div
                    className={`relation-${relation.kind}${
                      relationIndex === 3 ? " residual" : ""
                    }`}
                    key={relation.id}
                  >
                    <span>
                      {relationIndex < 3
                        ? text(
                            `Шаг ${relationIndex + 1}`,
                            `Step ${relationIndex + 1}`,
                          )
                        : text("Остаток", "Residual")}
                      : {relation.id}
                    </span>
                    <Latex display>{relation.latex}</Latex>
                  </div>
                ))}
              </div>
              <p>
                {text("После нормировки", "After normalization")}{" "}
                <Latex>{pattern.normalizationLatex}</Latex>
                {text(
                  " первые три отношения дают",
                  ", the first three relations give",
                )}
              </p>
              <Latex display>{pattern.rootsLatex}</Latex>
              <p>
                {text(
                  `Подстановка в ${pattern.relations[3].id} даёт`,
                  `Substitution into ${pattern.relations[3].id} gives`,
                )}
              </p>
              <div className="seven-nine-derived-equation">
                <Latex display>{pattern.equationLatex}</Latex>
              </div>
            </section>
          ))}
        </section>

        <section>
          <h2>
            {text(
              "6. Что этот атлас решает — и что остаётся открытым",
              "6. What the atlas solves—and what remains open",
            )}
          </h2>
          <p>
              {text(
              "Атлас завершает позиционную и геометрическую редукцию 7/9 на невырожденном локусе: не остаётся неразобранных масок или неуказанного обратного перехода. Для любой заданной семиклеточной маски рационального решения можно определить её D₄-орбиту, восстановить три угла и получить точку соответствующей поверхности; из такой точки корни и магический квадрат восстанавливаются обратно. Если квадрат имеет восемь или девять квадратных клеток, разные его семиклеточные подмаски закономерно попадают в несколько карточек.",
              "The atlas completes the positional and geometric reduction of 7/9 on the nondegenerate locus: no pattern or inverse reconstruction is left unspecified. For any specified seven-entry pattern in a rational solution, one can determine its D4 orbit, recover three angles, and obtain a point on the corresponding surface; the roots and the magic square are then reconstructed from that point. If a square has eight or nine square entries, its different seven-entry subpatterns naturally occur in several cards.",
            )}
          </p>
          <p>
            {text(
              "Это ещё не классификация всех рациональных точек Fᵢ=0 и тем более не классификация положительных целых точек. Известный квадрат Бремнера—Сэллоуза лежит в орбите BCDEGHJ, эквивалентной его маске ABCDEHJ, и использует четыре красные dir-линии. Доказательство отсутствия других целых классов потребовало бы решить арифметическую задачу на всех восьми поверхностях с условиями положительности, попарной различности и целочисленности.",
              "This is not yet a classification of every rational point on Fᵢ=0, still less of all positive integral points. The known Bremner–Sallows square belongs to the BCDEGHJ orbit, equivalent to its pattern ABCDEHJ, and uses four red dir lines. Proving that no other integral class exists would require solving the arithmetic problem on all eight surfaces subject to positivity, pairwise distinctness, and integrality.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/7">
              {text("Открыть атлас отдельно", "Open the standalone atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/arithmetic-progressions-dir">
              {text("Теория dir-линий", "Theory of dir lines")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9-patterns">
              {text("Атлас 6/9", "The 6/9 atlas")}
            </TheoryLink>
          </div>
          <ul className="proof-references">
            <li>
              <a href="https://www.impan.pl/en/publishing-house/journals-and-series/acta-arithmetica/all/88/3/110732/on-squares-of-squares">
                A. Bremner, <em>On squares of squares</em>, Acta Arithmetica 88
                (1999), 289–297
              </a>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}

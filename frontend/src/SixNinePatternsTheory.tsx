import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

const POSITIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "J"] as const;

const SIX_NINE_ORBITS = [
  ["ABCDEF", "GHJ", "DEF"],
  ["ABCDEG", "FHJ", "CEG"],
  ["ABCDEH", "FGJ", "BEH, CDH"],
  ["ABCDEJ", "FGH", "AEJ, BDJ"],
  ["ABCDFG", "EHJ", "BFG"],
  ["ABCDFH", "EGJ", "AFH, CDH"],
  ["ABCDGJ", "EFH", "BDJ"],
  ["ABCDHJ", "EFG", "BDJ, CDH"],
  ["ABCEGH", "DFJ", "BEH, CEG"],
  ["ABCEGJ", "DFH", "AEJ, CEG"],
  ["ABCGHJ", "DEF", "—"],
  ["ABDEFH", "CGJ", "AFH, BEH, DEF"],
  ["ABDEFJ", "CGH", "AEJ, BDJ, DEF"],
  ["ABDFHJ", "CEG", "AFH, BDJ"],
  ["ABEFGH", "CDJ", "AFH, BEH, BFG"],
  ["ABEFGJ", "CDH", "AEJ, BFG"],
] as const;

function SixNineMask({
  caption,
  first,
  mask,
  second,
}: {
  caption: string;
  first: string;
  mask: string;
  second: string;
}) {
  return (
    <figure className="six-nine-theory-mask">
      <div aria-label={caption} className="six-nine-theory-mask-grid">
        {POSITIONS.map((position) => {
          const active = mask.includes(position);
          const group = first.includes(position)
            ? "group-first"
            : second.includes(position)
              ? "group-second"
              : "";
          return (
            <span
              className={`${active ? "is-active" : ""} ${group}`.trim()}
              key={position}
            >
              {position}
            </span>
          );
        })}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function SixNinePatternsTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page six-nine-patterns-theory-page">
      <TheoryLink className="back-link" to="/theory#partial-configurations">
        ← {text("К циклу о частичных конфигурациях", "Back to the partial-configurations series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Частичные квадратные конфигурации · 3.3",
              "Partial square configurations · 3.3",
            )}
          </p>
          <h1>
            {text(
              "Маски 6/9: шестнадцать позиционных типов",
              "6/9 Patterns: The Sixteen Positional Types",
            )}
          </h1>
          <p>
            {text(
              "Шесть выбранных клеток магического квадрата задают три независимых квадратичных условия. С точностью до вращений и отражений существует шестнадцать способов расположить эти клетки; два из них состоят из параллельных прогрессий квадратов и приводят к методу tfmn.",
              "Six selected entries of a magic square impose three independent quadratic conditions. Up to rotations and reflections, there are sixteen ways to place them; two consist of parallel progressions of squares and lead to the tfmn method.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document six-nine-patterns-theory-document">
        <section>
          <h2>{text("1. Что означает 6/9", "1. What 6/9 means")}</h2>
          <p>
            {text(
              "Пусть S — множество из шести позиций обычного магического квадрата 3×3. Конфигурацией 6/9 с маской S называется магический квадрат, в котором значения всех клеток S являются рациональными или целыми квадратами. Остальные три клетки также могут случайно оказаться квадратами: число 6 обозначает доказанную нижнюю гарантию, а не требование получить ровно шесть квадратов.",
              "Let S be a set of six positions in an ordinary 3×3 magic square. A 6/9 configuration with pattern S is a magic square in which every entry indexed by S is a rational or integral square. The remaining three entries may also happen to be squares: the number 6 is a proved lower bound, not a requirement that exactly six entries be square.",
            )}
          </p>
          <p>
            {text(
              "Используем общую координатную форму",
              "We use the general coordinate form",
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
              "Для каждой выбранной позиции P введём корень qₚ и потребуем P=qₚ². Получается система из шести линейных уравнений относительно E,x,y, но квадратичных относительно корней.",
              "For every selected position P, introduce a square root qₚ and require P=qₚ². This gives six equations that are linear in E,x,y and quadratic in the roots.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Почему условий всегда три", "2. Why there are always three conditions")}</h2>
          <div className="theorem-block">
            <h3>{text("Теорема исключения", "Elimination theorem")}</h3>
            <p>
              {text(
                "Для любой шестиклеточной маски S матрица выбранных линейных форм имеет ранг 3. Поэтому после исключения E,x,y остаются ровно три независимых однородных квадратичных соотношения между шестью корнями. Над ℚ эти три соотношения не только необходимы, но и достаточны для восстановления единственной тройки E,x,y.",
                "For every six-cell pattern S, the matrix of the selected linear forms has rank 3. Eliminating E,x,y therefore leaves exactly three independent homogeneous quadratic relations among the six roots. Over ℚ, these three relations are not only necessary but also sufficient to recover a unique triple E,x,y.",
              )}
            </p>
          </div>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Строке клетки P соответствует точка (αₚ,βₚ) в решётке 3×3, поскольку P=E+αₚx+βₚy. На одной прямой этой решётки лежат не более трёх различных точек. Следовательно, шесть выбранных точек не могут быть коллинеарны и аффинно порождают плоскость; строки (1,αₚ,βₚ) имеют ранг 3.",
              "The row associated with an entry P corresponds to a point (αₚ,βₚ) in the 3×3 coefficient grid, since P=E+αₚx+βₚy. A line contains at most three distinct points of this grid. Hence six selected points cannot be collinear and affinely span the plane; the rows (1,αₚ,βₚ) have rank 3.",
            )}
          </p>
          <Latex display>{String.raw`
\dim\ker L_S^{\,T}=6-\operatorname{rank}L_S=3.`}</Latex>
          <p>
            {text(
              "Пусть R₁,R₂,R₃ — базис левого ядра Lₛ. Из Lₛ(E,x,y)ᵀ=qₛ⁽²⁾ немедленно следуют уравнения Rᵢ(qₛ⁽²⁾)=0. Обратно, в конечномерном пространстве над ℚ ортогональное дополнение левого ядра совпадает с образом Lₛ. Поэтому выполнение трёх уравнений означает, что вектор квадратов qₛ⁽²⁾ лежит в образе Lₛ, а полный ранг даёт единственность E,x,y.",
              "Let R₁,R₂,R₃ be a basis of the left kernel of Lₛ. The equation Lₛ(E,x,y)ᵀ=qₛ⁽²⁾ immediately implies Rᵢ(qₛ⁽²⁾)=0. Conversely, in a finite-dimensional vector space over ℚ, the orthogonal complement of the left kernel equals the image of Lₛ. Thus the three equations place qₛ⁽²⁾ in the image of Lₛ, while full rank makes E,x,y unique.",
            )}
          </p>
          <Latex display>{String.raw`
q_S^{[2]}\in\operatorname{im}L_S
\quad\Longleftrightarrow\quad
R_1(q_S^{[2]})=R_2(q_S^{[2]})=R_3(q_S^{[2]})=0.`}</Latex>
        </section>

        <section>
          <h2>{text("3. Почему типов ровно шестнадцать", "3. Why there are exactly sixteen types")}</h2>
          <p>
            {text(
              "Дополнение шестиклеточной маски состоит из трёх клеток. Взятие дополнения коммутирует со всеми вращениями и отражениями квадрата, поэтому орбиты масок 6/9 находятся во взаимно однозначном соответствии с орбитами трёхэлементных подмножеств девяти клеток.",
              "The complement of a six-cell pattern contains three entries. Taking complements commutes with every rotation and reflection of the square, so the 6/9 orbits correspond bijectively to the orbits of three-element subsets of the nine entries.",
            )}
          </p>
          <p>
            {text(
              "Применим лемму Бёрнсайда. Тождество фиксирует все C(9,3)=84 тройки. Повороты на ±90° имеют циклы длин 1,4,4 и не фиксируют ни одной тройки. Поворот на 180° фиксирует центр и четыре пары противоположных клеток; неподвижная тройка обязана состоять из центра и одной такой пары, поэтому их 4. У каждого отражения имеются три неподвижные клетки и три переставляемые пары. Неподвижная тройка либо состоит из трёх осевых клеток, либо из одной осевой клетки и одной пары: 1+3·3=10 вариантов.",
              "Apply Burnside's lemma. The identity fixes all C(9,3)=84 triples. A ±90° rotation has cycles of lengths 1,4,4 and fixes no triple. A 180° rotation fixes the center and has four pairs of opposite entries; an invariant triple must contain the center and one such pair, giving 4 possibilities. Every reflection has three fixed entries and three exchanged pairs. An invariant triple either contains all three fixed entries or one fixed entry together with one pair, giving 1+3·3=10 possibilities.",
            )}
          </p>
          <Latex display>{String.raw`
N_{6/9}=N_{3/9}
=\frac{84+0+4+0+4\cdot10}{8}
=16.`}</Latex>
        </section>

        <section>
          <h2>{text("4. Все позиционные типы", "4. All positional types")}</h2>
          <p>
            {text(
              "В таблице выбран по одному каноническому представителю каждой орбиты. Последний столбец перечисляет все трёхчленные арифметические прогрессии, целиком содержащиеся в маске; их смысл будет выведен ниже.",
              "The table chooses one canonical representative from each orbit. The last column lists every three-term arithmetic progression contained in the pattern; their meaning is derived below.",
            )}
          </p>
          <p>
            {text(
              "Применение восьми элементов D₄ к каждому трёхклеточному дополнению не переводит его в дополнение другой строки: это различается по наличию центра, числу углов и сторон и их взаимной смежности или противоположности. Следовательно, перед нами шестнадцать различных орбит; вычисление по Бёрнсайду доказывает, что список исчерпывающий.",
              "Applying the eight elements of D₄ to each three-cell complement never produces the complement in another row: the rows are distinguished by center membership, the numbers of corners and edge cells, and their adjacency or opposition. Hence the table contains sixteen distinct orbits, and the Burnside count proves that the list is exhaustive.",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table six-nine-orbit-table">
              <thead>
                <tr>
                  <th>{text("Маска 6/9", "6/9 pattern")}</th>
                  <th>{text("Дополнение", "Complement")}</th>
                  <th>{text("Прогрессии", "Progressions")}</th>
                </tr>
              </thead>
              <tbody>
                {SIX_NINE_ORBITS.map(([mask, complement, progressions]) => (
                  <tr key={mask}>
                    <td><code>{mask}</code></td>
                    <td><code>{complement}</code></td>
                    <td><code>{progressions}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>{text("5. Восемь прогрессий магического квадрата", "5. The eight progressions in a magic square")}</h2>
          <p>
            {text(
              "В общей форме существуют ровно восемь троек позиций, значения которых тождественно образуют арифметическую прогрессию. Это утверждение относится к значениям клеток и не требует, чтобы позиции лежали на одной геометрической прямой.",
              "The general form contains exactly eight triples of positions whose values identically form an arithmetic progression. This is a statement about entry values and does not require the positions to lie on one geometric line.",
            )}
          </p>
          <Latex display>{String.raw`
\begin{array}{llll}
A+J=2E, & F+H=2A, & B+D=2J, & B+H=2E,\\
B+F=2G, & D+H=2C, & C+G=2E, & D+F=2E.
\end{array}`}</Latex>
          <p>
            {text(
              "Им соответствуют тройки AEJ, AFH, BDJ, BEH, BFG, CDH, CEG и DEF. Если значения трёх клеток являются квадратами, получается арифметическая прогрессия квадратов. В частности, AFH и BDJ — те самые менее очевидные прогрессии, соседние позиции которых соединяются ходом коня.",
              "These identities correspond to AEJ, AFH, BDJ, BEH, BFG, CDH, CEG, and DEF. If the three entries are squares, they form an arithmetic progression of squares. In particular, AFH and BDJ are the less obvious progressions whose consecutive positions are separated by a knight's move.",
            )}
          </p>
          <p>
            {text(
              "Полнота списка следует из коэффициентной решётки: арифметической прогрессии соответствует прямая через три её точки, а в решётке 3×3 имеются ровно три горизонтали, три вертикали и две диагонали с тремя точками.",
              "The list is complete by the coefficient-grid model: an arithmetic progression corresponds to a line through its three points, and the 3×3 grid has exactly three horizontal lines, three vertical lines, and two diagonals containing three points.",
            )}
          </p>
          <p>
            {text(
              "Каждая такая прогрессия даёт одно из трёх квадратичных условий маски. Однако наличие двух или трёх прогрессий ещё не означает применимость tfmn: для этого две прогрессии должны быть непересекающимися и иметь одно направление и один шаг в общей форме квадрата.",
              "Each such progression supplies one of the pattern's three quadratic conditions. The mere presence of two or three progressions does not yet make tfmn applicable: two progressions must be disjoint and have the same direction and difference in the general square.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Два параллельных класса", "6. The two parallel classes")}</h2>
          <p>
            {text(
              "В направлении x лежат три непересекающиеся прогрессии AEJ, BFG и CDH; в направлении y — AFH, BDJ и CEG. Выбор двух прогрессий одного направления даёт шесть масок:",
              "There are three disjoint progressions in the x direction, AEJ, BFG, and CDH, and three in the y direction, AFH, BDJ, and CEG. Choosing two progressions in one direction gives six patterns:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
x:\;&ABEFGJ,\ ACDEHJ,\ BCDFGH,\\
y:\;&ABDFHJ,\ ACEFGH,\ BCDEGJ.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Четыре из них содержат центр E и эквивалентны маске ABEFGJ. Две не содержат центр и эквивалентны ABDFHJ. Вращения и отражения сохраняют центр, поэтому эти две орбиты различны; перечисленные симметрии внутри каждой группы показывают, что других орбит здесь нет.",
              "Four of them contain the center E and are equivalent to ABEFGJ. Two omit the center and are equivalent to ABDFHJ. Rotations and reflections preserve the center, so these two orbits are distinct; the symmetries within each group show that no further orbit occurs here.",
            )}
          </p>
          <div className="six-nine-theory-mask-pair">
            <SixNineMask
              caption={text("ABEFGJ: AEJ и BFG", "ABEFGJ: AEJ and BFG")}
              first="AEJ"
              mask="ABEFGJ"
              second="BFG"
            />
            <SixNineMask
              caption={text("ABDFHJ: AFH и BDJ", "ABDFHJ: AFH and BDJ")}
              first="AFH"
              mask="ABDFHJ"
              second="BDJ"
            />
          </div>
          <div className="theorem-block">
            <h3>{text("Точная граница tfmn", "The exact scope of tfmn")}</h3>
            <p>
              {text(
                "Среди шестнадцати позиционных типов ровно ABEFGJ и ABDFHJ являются объединениями двух непересекающихся параллельных прогрессий. В каждой из них локальная параметризация обеих прогрессий приводит к сравнению квадратных классов их шагов — уравнению равенства значений tf. Это два хорошо разработанных tfmn-класса 6/9.",
                "Among the sixteen positional types, exactly ABEFGJ and ABDFHJ are unions of two disjoint parallel progressions. In each, parametrizing the two progressions reduces the comparison of their differences to equality of their tf values. These are the two well-developed tfmn classes of 6/9.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Что происходит с остальными четырнадцатью", "7. What happens in the other fourteen types")}</h2>
          <p>
            {text(
              "Остальные маски могут содержать пересекающиеся прогрессии, одну прогрессию или не содержать ни одной. Во всех случаях полная задача по-прежнему состоит из трёх независимых квадрик, но естественные координаты и способ их совместного решения меняются. Подмаски из четырёх и пяти клеток дают знакомые отношения прогрессий и норм, однако три условия необходимо согласовать одновременно.",
              "The remaining patterns may contain intersecting progressions, a single progression, or no progression at all. In every case the full problem still consists of three independent quadrics, but the natural coordinates and the way those quadrics are solved change. Four- and five-cell subpatterns provide the familiar progression and norm relations, yet all three conditions must be made compatible at once.",
            )}
          </p>
          <p>
            {text(
              "Поэтому примеры 6/9 в других позиционных типах сами по себе не дают параметризации. Для каждого типа требуется указать порождающую рациональную поверхность или семейство, доказать корректность восстановления E,x,y и отдельно установить область покрытия. Такая классификация и составляет следующий слой исследования 6/9.",
              "Consequently, examples of 6/9 squares in other positional types do not by themselves constitute a parametrization. Each type requires a generating rational surface or family, a proof that E,x,y are recovered correctly, and a separate determination of its coverage. This classification is the next layer of the 6/9 investigation.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/fmn-tfmn">
              {text("Далее: fmn и tfmn", "Next: fmn and tfmn")}{" "}
              <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/lab/6">
              {text("Открыть конструктор 6/9", "Open the 6/9 constructor")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/proofs/general">
              {text("Теория масок 4/9 и 5/9", "Theory of 4/9 and 5/9 patterns")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

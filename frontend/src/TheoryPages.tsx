import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Latex } from "./components/Latex";
import { localePath, useLocale } from "./i18n";

export function TheoryLink({
  children,
  className,
  to,
}: {
  children: ReactNode;
  className?: string;
  to: string;
}) {
  const { locale } = useLocale();
  return (
    <RouterLink className={className} to={localePath(locale, to)}>
      {children}
    </RouterLink>
  );
}

export function TheoryIndexPage() {
  const { text } = useLocale();
  const series = [
    {
      index: "I",
      title: text("Основы", "Foundations"),
      summary: text(
        "Определения, полная линейная классификация и постановка основной диофантовой задачи.",
        "Definitions, the complete linear classification, and the main Diophantine problem.",
      ),
      chapters: [
        {
          index: "1.1",
          to: "/theory/magic-squares-3x3",
          title: text(
            "Общая форма магического квадрата 3×3",
            "The general form of a 3×3 magic square",
          ),
          summary: text(
            "Доказательства M=3E, существования и единственности m(E,x,y), а также точные версии над группами, кольцами, полями, ℤ, ℚ и ℝ.",
            "Proofs of M=3E and the existence and uniqueness of m(E,x,y), with exact versions over groups, rings, fields, ℤ, ℚ, and ℝ.",
          ),
        },
        {
          index: "1.2",
          to: "/squares-of-squares",
          title: text(
            "Задача о квадрате из квадратов",
            "The magic square of squares problem",
          ),
          summary: text(
            "Постановки 9/9 и 7/9, известный пример и переход от общей линейной формы к диофантовым ограничениям.",
            "The 9/9 and 7/9 problems, the known example, and the transition from the linear normal form to Diophantine constraints.",
          ),
        },
      ],
    },
    {
      index: "II",
      title: text("Арифметические ограничения", "Arithmetic restrictions"),
      summary: text(
        "Локальные сравнения, суммы двух квадратов и ограничения на простые делители.",
        "Local congruences, sums of two squares, and restrictions on prime divisors.",
      ),
      chapters: [
        {
          index: "2.1",
          to: "/theory/residues",
          title: text(
            "Вычеты и квадратичные вычеты",
            "Residues and quadratic residues",
          ),
          summary: text(
            "Сравнение квадратов через координаты, ограничения по модулям 3, 4, 5 и 24 и применение символа Лежандра к простым делителям клеток.",
            "Coordinate congruence, restrictions modulo 3, 4, 5, and 24, and an application of the Legendre symbol to prime divisors of entries.",
          ),
        },
        {
          index: "2.2",
          to: "/theory/prime-divisors",
          title: text(
            "Простые делители минимального квадрата 9/9",
            "Prime divisors in a minimal 9/9 square",
          ),
          summary: text(
            "Гауссовы разложения суммы двух квадратов, факторизация центрального корня и ограничения на простые делители остальных восьми корней.",
            "Gaussian factorizations of sums of two squares, the central-root factorization, and restrictions on prime divisors of the other eight roots.",
          ),
        },
      ],
    },
    {
      index: "III",
      title: text(
        "Частичные квадратные конфигурации",
        "Partial square configurations",
      ),
      summary: text(
        "От классификации масок 4/9 и 5/9 к прогрессиям квадратов, конфигурациям 6/9 и методу tfmn.",
        "From the classification of 4/9 and 5/9 patterns to progressions of squares, 6/9 configurations, and the tfmn method.",
      ),
      chapters: [
        {
          index: "3.1",
          to: "/proofs/general",
          title: text(
            "Общая теория масок 4/9 и 5/9",
            "General theory of the 4/9 and 5/9 patterns",
          ),
          summary: text(
            "Орбиты D₄, исключение E,x,y, квадратичные системы, цветовые опоры и критерии полноты параметризаций.",
            "D₄ orbits, elimination of E,x,y, quadratic systems, colored supports, and criteria for completeness of parametrizations.",
          ),
        },
        {
          index: "3.2",
          to: "/theory/arithmetic-progressions-dir",
          title: text(
            "Арифметические прогрессии квадратов и dir-функция",
            "Arithmetic progressions of squares and the dir function",
          ),
          summary: text(
            "Полная рациональная и целочисленная параметризация трёх квадратов в прогрессии, восемь линий магического квадрата и нормированный шаг dir(m,n).",
            "The complete rational and integral parametrization of three squares in progression, the eight lines of a magic square, and the normalized difference dir(m,n).",
          ),
        },
        {
          index: "3.3",
          to: "/theory/fmn-tfmn",
          title: text(
            "fmn и tfmn в задаче 6/9",
            "fmn and tfmn in the 6/9 problem",
          ),
          summary: text(
            "Две параллельные прогрессии в 6/9, функция f, свободная от квадратов часть tf, критерий согласования шагов и эллиптическая кривая фиксированного tf.",
            "Two parallel progressions in a 6/9 pattern, the function f, its squarefree part tf, the difference-matching criterion, and the elliptic curve of a fixed tf value.",
          ),
        },
        {
          index: "3.4",
          to: "/theory/early-tf-families",
          title: text(
            "Ранние семейства F1–F8",
            "The early F1–F8 families",
          ),
          summary: text(
            "Полные элементарные параметризации F1–F4, тождество F7, четвертичный подъём F8 и точные границы устаревшей упрощённой классификации.",
            "Complete elementary parametrizations of F1–F4, the F7 identity, the F8 quartic lift, and the exact scope of the outdated simplified classification.",
          ),
        },
      ],
    },
    {
      index: "IV",
      title: text(
        "Эллиптическая геометрия tfmn",
        "Elliptic geometry of tfmn",
      ),
      summary: text(
        "Полные координатные описания совпадающих квадратных классов через рациональные точки эллиптических кривых и поверхностей.",
        "Complete coordinate descriptions of equal square classes through rational points on elliptic curves and surfaces.",
      ),
      chapters: [
        {
          index: "4.1",
          to: "/theory/f7-plus",
          title: text(
            "F7+: пары параметров и поверхность конгруэнтных чисел",
            "F7+: parameter pairs and the congruent-number surface",
          ),
          summary: text(
            "Точная биекция между невырожденными проективными парами [m:n] фиксированного tf и нетривиальными рациональными точками y²=x³−T²x с точностью до знака y.",
            "The exact bijection between nondegenerate projective pairs [m:n] of fixed tf and nontrivial rational points on y²=x³−T²x, up to the sign of y.",
          ),
        },
        {
          index: "4.2",
          to: "/theory/f4-plus",
          title: text(
            "F4+: эллиптическая поверхность пар пифагоровых площадей",
            "F4+: an elliptic surface for pairs of Pythagorean areas",
          ),
          summary: text(
            "Полная нормализация совпадающих квадратных классов площадей, бирациональная модель Вейерштрасса, рациональная эллиптическая поверхность и её квадратичная K3-замена базы.",
            "Complete normalization of equal area square classes, a birational Weierstrass model, the resulting rational elliptic surface, and its quadratic K3 base change.",
          ),
        },
        {
          index: "4.3",
          to: "/theory/tf-pair-generation",
          title: text(
            "F7+ и F4+: генерация совпадений tf",
            "F7+ and F4+: generating equal tf values",
          ),
          summary: text(
            "F7+ превращает известные точки фиксированной кривой в пары параметров, а F4+ порождает сам квадратный класс вместе с двумя начальными точками; групповой закон продолжает их в решётку решений.",
            "F7+ turns known points on a fixed curve into parameter pairs, while F4+ produces the square class together with two seed points; the group law extends them to a lattice of solutions.",
          ),
        },
        {
          index: "4.4",
          to: "/theory/f9-plus",
          title: text(
            "F9+: квадратичные подстановки и теорема сокращения",
            "F9+: quadratic substitutions and the cancellation theorem",
          ),
          summary: text(
            "Полная классификация однородных квадратичных подстановок с точным полиномиальным сокращением, 204 невырожденные проективные ветви и остаточная квартита как точный критерий совпадения tf.",
            "A complete classification of homogeneous quadratic substitutions with exact polynomial cancellation, 204 nondegenerate projective branches, and the residual quartic as an exact criterion for equal tf values.",
          ),
        },
        {
          index: "4.5",
          to: "/theory/f9-plus-elliptic-layers",
          title: text(
            "Эллиптические слои F9+",
            "The elliptic layers of F9+",
          ),
          summary: text(
            "Базовая кривая y²=x³−2x, подлинные однопараметрические семейства, известные квадратичные слои и их вложение в F4+ с последующим переходом к F7+.",
            "The basic curve y²=x³−2x, genuine one-parameter families, recorded quadratic layers, and their embedding into F4+ followed by the passage to F7+.",
          ),
        },
      ],
      continuation: text(
        "Далее: нормовые подъёмы F8+ и остальные конструктивные слои.",
        "Next: the F8+ norm lifts and the remaining constructive layers.",
      ),
    },
    {
      index: "V",
      title: text(
        "Алгебра матричного умножения",
        "Matrix multiplication algebra",
      ),
      summary: text(
        "Самостоятельная ветвь о произведениях магических матриц и пятимерной алгебре полумагических квадратов.",
        "A separate branch on products of magic matrices and the five-dimensional algebra of semimagic squares.",
      ),
      chapters: [
        {
          index: "5.1",
          to: "/theory/matrix-algebra/magic-charming-semimagic",
          title: text(
            "Магические, чарующие и полумагические квадраты",
            "Magic, charming, and semimagic squares",
          ),
          summary: text(
            "Стандартные associated и balanced-компоненты, четыре закона умножения, полная пятимерная форма и точные разложения.",
            "The standard associated and balanced components, four product laws, the complete five-dimensional form, and exact decompositions.",
          ),
        },
        {
          index: "5.2",
          to: "/theory/matrix-algebra/block-structure-split-quaternions",
          title: text(
            "Блочная структура и расщеплённые кватернионы",
            "Block structure and split quaternions",
          ),
          summary: text(
            "Изоморфизм SM₃(K)≅K⊕M₂(K), два центральных идемпотента, явный базис 1,i,j,k и точное отличие от кватернионов Гамильтона.",
            "The isomorphism SM₃(K)≅K⊕M₂(K), two central idempotents, an explicit basis 1,i,j,k, and the exact distinction from Hamilton's quaternions.",
          ),
        },
      ],
      continuation: text(
        "Далее: присоединённая матрица, спектр и точная структура целочисленной решётки.",
        "Next: the adjugate, the spectrum, and the exact structure of the integral lattice.",
      ),
    },
  ] as const;

  return (
    <article className="page proof-page topic-page theory-index-page">
      <header className="proof-page-header">
        <div>
          <p className="eyebrow">{text("Теория", "Theory")}</p>
          <h1>{text("Оглавление теории", "Theory contents")}</h1>
          <p>
            {text(
              "Материал разделён на самостоятельные циклы. Основная линия идёт от линейной формы к арифметике и частичным квадратным конфигурациям; алгебра матричного умножения развивается параллельно.",
              "The material is divided into self-contained series. The main line runs from the linear form through arithmetic to partial square configurations, while matrix multiplication algebra develops in parallel.",
            )}
          </p>
        </div>
      </header>

      <div className="theory-series-list">
        {series.map((group) => (
          <section
            className="theory-series"
            id={
              group.index === "III"
                ? "partial-configurations"
                : group.index === "IV"
                  ? "elliptic-tfmn"
                  : group.index === "V"
                    ? "matrix-algebra"
                  : undefined
            }
            key={group.index}
          >
            <header className="theory-series-header">
              <span>{group.index}</span>
              <div>
                <h2>{group.title}</h2>
                <p>{group.summary}</p>
              </div>
            </header>
            <div className="theory-chapter-grid">
              {group.chapters.map((chapter) => (
                <TheoryLink className="theory-chapter-card" key={chapter.index} to={chapter.to}>
                  <span>{chapter.index}</span>
                  <div>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.summary}</p>
                  </div>
                  <i>→</i>
                </TheoryLink>
              ))}
            </div>
            {"continuation" in group ? (
              <p className="theory-series-continuation">{group.continuation}</p>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}

export function ResiduesTheoryPage() {
  const { text } = useLocale();
  return (
    <article className="page proof-page topic-page residues-theory-page">
      <TheoryLink className="back-link" to="/theory">
        ← {text("К оглавлению теории", "Back to theory contents")}
      </TheoryLink>
      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Целочисленная арифметика", "Integral arithmetic")}
          </p>
          <h1>
            {text(
              "Вычеты и квадратичные вычеты",
              "Residues and quadratic residues",
            )}
          </h1>
          <p>
            {text(
              "Локальные необходимые условия для целочисленного магического квадрата из квадратов: точные ограничения на координаты, примитивный случай и одно применение квадратичного закона для числа 2.",
              "Local necessary conditions for an integral magic square of squares: exact coordinate restrictions, the primitive case, and an application of the quadratic character of 2.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document residues-theory-document">
        <section>
          <h2>{text("1. Сравнение магических квадратов", "1. Congruence of magic squares")}</h2>
          <p>
            {text(
              "Пусть n≥1. Два целочисленных квадрата сравнимы по модулю n, если их соответствующие клетки сравнимы. Для магических квадратов форма m(E,x,y) переводит это условие точно в сравнение трёх координат.",
              "Let n≥1. Two integral squares are congruent modulo n when their corresponding entries are congruent. For magic squares, the form m(E,x,y) turns this condition exactly into congruence of the three coordinates.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <Latex display>{String.raw`\mathcal M(E,x,y)\equiv\mathcal M(E',x',y')\pmod n
\iff
\begin{cases}
E\equiv E'\pmod n,\\
x\equiv x'\pmod n,\\
y\equiv y'\pmod n.
\end{cases}`}</Latex>
          </div>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Если координаты попарно сравнимы, то сравнимы и все клетки, поскольку каждая из них является целочисленной линейной комбинацией E,x,y. Обратно, E является центральной клеткой, x=A−E, y=G−E. Поэтому поклеточная сравнимость немедленно даёт сравнимость координат. Простота модуля не требуется.",
              "If the coordinates are pairwise congruent, then all entries are congruent because each is an integral linear combination of E,x,y. Conversely, E is the central entry, x=A−E, and y=G−E. Entrywise congruence therefore immediately gives coordinate congruence. The modulus need not be prime.",
            )}
          </p>
          <p>
            <TheoryLink className="general-proof-link" to="/theory/magic-squares-3x3">
              {text(
                "Общая форма m(E,x,y) и её классификационное доказательство",
                "The general form m(E,x,y) and its classification proof",
              )} →
            </TheoryLink>
          </p>
        </section>

        <section>
          <h2>{text("2. Квадраты по модулю n", "2. Squares modulo n")}</h2>
          <p>
            {text(
              "Обозначим через Sq(n) полный образ отображения r↦r² в кольце ℤ/nℤ. Это определение включает нуль и применимо к составному n. Термин «квадратичный вычет» ниже будет использоваться отдельно для ненулевого класса по нечётному простому модулю.",
              "Let Sq(n) denote the full image of r↦r² in ℤ/nℤ. This definition includes zero and applies to composite n. The term “quadratic residue” below is reserved for a nonzero class modulo an odd prime.",
            )}
          </p>
          <Latex display>{String.raw`\operatorname{Sq}(n)=\{r^2\bmod n:r\in\mathbb Z\}.`}</Latex>
          <div className="domain-table-wrap">
            <table className="domain-table residue-table">
              <thead>
                <tr>
                  <th>{text("Модуль", "Modulus")}</th>
                  <th>{text("Все квадратные классы", "All square classes")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><Latex>3</Latex></td><td><Latex>{String.raw`\{0,1\}`}</Latex></td></tr>
                <tr><td><Latex>4</Latex></td><td><Latex>{String.raw`\{0,1\}`}</Latex></td></tr>
                <tr><td><Latex>5</Latex></td><td><Latex>{String.raw`\{0,1,4\}`}</Latex></td></tr>
                <tr><td><Latex>8</Latex></td><td><Latex>{String.raw`\{0,1,4\}`}</Latex></td></tr>
                <tr><td><Latex>24</Latex></td><td><Latex>{String.raw`\{0,1,4,9,12,16\}`}</Latex></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Первые четыре строки проверяются возведением полного набора классов в квадрат. Для модуля 8 можно также заметить: квадрат нечётного числа равен 1, а квадрат чётного равен 0 или 4. Набор по модулю 24 получается совместным условием по модулям 8 и 3.",
              "The first four rows follow by squaring a complete residue system. Modulo 8 one may instead observe that an odd square is 1, while an even square is 0 or 4. The list modulo 24 is obtained by combining the conditions modulo 8 and modulo 3.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Ограничения по модулям 4 и 3", "3. Restrictions modulo 4 and 3")}</h2>
          <p>
            {text(
              "Пусть все девять клеток целочисленного магического квадрата являются квадратами. Чтобы не смешивать центральную клетку и её корень, запишем центр как E=e²:",
              "Assume that all nine entries of an integral magic square are squares. To distinguish the central entry from its root, write the center as E=e²:",
            )}
          </p>
          <Latex display>{String.raw`\mathcal M(e^2,x,y)=
\begin{pmatrix}
a^2&b^2&c^2\\d^2&e^2&f^2\\g^2&h^2&j^2
\end{pmatrix}.`}</Latex>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <p>
              {text(
                "Для любого такого квадрата выполняется 12∣x и 12∣y.",
                "Every such square satisfies 12∣x and 12∣y.",
              )}
            </p>
          </div>
          <h3>{text("Доказательство по модулю 4", "Proof modulo 4")}</h3>
          <p>
            {text(
              "Клетки A=e²+x и J=e²−x обе лежат в Sq(4)={0,1}. Если e²≡0, то единственный класс x, для которого одновременно x и −x квадратны, равен 0. Если e²≡1, непосредственная проверка x=0,1,2,3 снова оставляет только x=0. Следовательно, 4∣x. Пара G=e²+y, C=e²−y тем же рассуждением даёт 4∣y.",
              "The entries A=e²+x and J=e²−x both lie in Sq(4)={0,1}. If e²≡0, the only class x for which both x and −x are squares is 0. If e²≡1, checking x=0,1,2,3 again leaves only x=0. Hence 4∣x. Applying the same argument to G=e²+y and C=e²−y gives 4∣y.",
            )}
          </p>
          <h3>{text("Доказательство по модулю 3", "Proof modulo 3")}</h3>
          <p>
            {text(
              "Каждая клетка сравнима с 0 или 1. Сумма любой строки равна 3e²≡0. Три элемента множества {0,1} имеют сумму 0 по модулю 3 только тогда, когда они все равны 0 или все равны 1. Значит, каждая строка одноцветна по признаку делимости на 3. То же условие на столбцы заставляет все три строки иметь один цвет: весь квадрат состоит либо из нулей, либо из единиц по модулю 3. В частности, A≡E≡G, откуда 3∣x и 3∣y.",
              "Every entry is congruent to 0 or 1. Each row sums to 3e²≡0. Three elements of {0,1} sum to 0 modulo 3 only when they are all 0 or all 1. Thus each row has one divisibility color. The same condition on the columns forces all three rows to have the same color: the entire square consists either of zeros or of ones modulo 3. In particular A≡E≡G, so 3∣x and 3∣y.",
            )}
          </p>
          <p>
            {text(
              "Так как 3 и 4 взаимно просты, получаем 12∣x,y. Это необходимое условие; обратное утверждение неверно.",
              "Since 3 and 4 are coprime, 12∣x,y. This is a necessary condition; the converse is false.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Примитивный квадрат и модуль 24", "4. Primitive squares and modulus 24")}</h2>
          <p>
            {text(
              "Назовём целочисленный квадрат примитивным, если НОД его девяти клеток равен 1. Для магического квадрата это равносильно gcd(E,x,y)=1.",
              "Call an integral square primitive when the gcd of its nine entries is 1. For a magic square this is equivalent to gcd(E,x,y)=1.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <p>
              {text(
                "Если примитивный магический квадрат состоит из девяти целых квадратов, то gcd(e,6)=1, все его клетки сравнимы с 1 по модулю 24 и 24∣x,y.",
                "If a primitive magic square consists of nine integral squares, then gcd(e,6)=1, every entry is congruent to 1 modulo 24, and 24∣x,y.",
              )}
            </p>
          </div>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Если e чётно, то e², x и y делятся на 4, следовательно, все девять клеток делятся на 4 — противоречие с примитивностью. Если 3∣e, то по доказанному выше все клетки делятся на 3; поскольку они являются квадратами, на самом деле каждая делится на 9. Снова получаем противоречие. Поэтому e взаимно просто с 6.",
              "If e is even, then e², x, and y are divisible by 4, so all nine entries are divisible by 4, contradicting primitivity. If 3∣e, the preceding proof shows that every entry is divisible by 3; because the entries are squares, each is in fact divisible by 9. This is again a contradiction. Hence e is coprime to 6.",
            )}
          </p>
          <p>
            {text(
              "Уже известно, что x,y делятся на 12, поэтому каждая клетка сравнима с e² по модулю 12. Следовательно, корень каждой клетки нечётен и не делится на 3. Квадрат любого числа, взаимно простого с 6, сравним с 1 по модулю 24. Значит, все клетки равны 1 mod 24. Наконец, x=A−E и y=G−E являются разностями двух таких клеток, поэтому делятся на 24.",
              "We already know that x,y are divisible by 12, so every entry is congruent to e² modulo 12. Thus the root of every entry is odd and not divisible by 3. The square of every integer coprime to 6 is congruent to 1 modulo 24. Hence all entries are 1 modulo 24. Finally, x=A−E and y=G−E are differences of two such entries and are therefore divisible by 24.",
            )}
          </p>
          <Latex display>{String.raw`\mathcal M(e^2,x,y)\equiv
\begin{pmatrix}1&1&1\\1&1&1\\1&1&1\end{pmatrix}\pmod{24},
\qquad x\equiv y\equiv0\pmod{24}.`}</Latex>
        </section>

        <section>
          <h2>{text("5. Точная классификация по модулю 5", "5. Exact classification modulo 5")}</h2>
          <p>
            {text(
              "По модулю 5 квадраты равны 0, 1 или 4. Полный перебор классов имеет короткую ручную форму и даёт ровно девять допустимых троек:",
              "Modulo 5, squares are 0, 1, or 4. The complete residue check has a short hand proof and gives exactly nine feasible triples:",
            )}
          </p>
          <Latex display>{String.raw`\begin{aligned}
\mathcal F_5={}&\{(e,0,0):e\in\mathbb Z/5\mathbb Z\}\\
&\cup\{(0,1,0),(0,-1,0),(0,0,1),(0,0,-1)\}.
\end{aligned}`}</Latex>
          <h3>{text("Доказательство полноты списка", "Proof that the list is complete")}</h3>
          <p>
            {text(
              "Если e≠0, то e² равно 1 или 4. Для каждого из этих двух значений условие e²+x,e²−x∈{0,1,4} допускает только x=0; пара e²±y аналогично даёт y=0. Если e=0, противоположные пары дают x,y∈{0,±1}. Подстановка в четыре боковые клетки e²±x±y исключает случай, когда x и y одновременно ненулевые. Остаются (0,0), (±1,0), (0,±1), и все они действительно дают только квадратные классы. Список необходим и достаточен по модулю 5.",
              "If e≠0, then e² is 1 or 4. For either value, the condition e²+x,e²−x∈{0,1,4} permits only x=0; the pair e²±y similarly gives y=0. If e=0, the opposite pairs give x,y∈{0,±1}. Substitution into the four side entries e²±x±y excludes the case in which x and y are both nonzero. This leaves (0,0), (±1,0), and (0,±1), all of which indeed give only square classes. Thus the list is necessary and sufficient modulo 5.",
            )}
          </p>
          <p>
            {text(
              "В примитивном случае класс (0,0,0) при e≡0 невозможен: тогда все квадратные клетки делятся на 25. Поэтому либо 5∤e и 5∣x,y, либо 5∣e и ровно одна из координат x,y сравнима с ±1, а другая с 0 по модулю 5.",
              "In the primitive case, the class (0,0,0) with e≡0 is impossible because then every square entry is divisible by 25. Therefore either 5∤e and 5∣x,y, or 5∣e and exactly one of x,y is ±1 while the other is 0 modulo 5.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Квадратичные вычеты по простому модулю", "6. Quadratic residues modulo a prime")}</h2>
          <p>
            {text(
              "Пусть p — нечётное простое и p∤a. Символ Лежандра (a/p) равен 1, если a является ненулевым квадратом по модулю p, и −1 в противном случае. Критерий Эйлера одновременно доказывает мультипликативность:",
              "Let p be an odd prime and p∤a. The Legendre symbol (a/p) is 1 when a is a nonzero square modulo p and −1 otherwise. Euler's criterion also proves multiplicativity:",
            )}
          </p>
          <Latex display>{String.raw`\left(\frac ap\right)\equiv a^{(p-1)/2}\pmod p,
\qquad
\left(\frac{ab}{p}\right)=\left(\frac ap\right)\left(\frac bp\right).`}</Latex>
          <h3>{text("Доказательство критерия Эйлера", "Proof of Euler's criterion")}</h3>
          <p>
            {text(
              "По малой теореме Ферма число a^((p−1)/2) является корнем уравнения z²=1, то есть равно ±1. Каждый ненулевой квадрат a=b² даёт значение b^(p−1)=1. Таких квадратных классов ровно (p−1)/2, а многочлен X^((p−1)/2)−1 имеет не более (p−1)/2 корней. Следовательно, его корни — в точности ненулевые квадраты; на остальных классах значение равно −1. Формула для произведения следует возведением ab в ту же степень.",
              "By Fermat's little theorem, a^((p−1)/2) is a root of z²=1 and is therefore ±1. Every nonzero square a=b² gives b^(p−1)=1. There are exactly (p−1)/2 nonzero square classes, while the polynomial X^((p−1)/2)−1 has at most (p−1)/2 roots. Its roots are therefore exactly the nonzero squares, and the value on every other class is −1. The product formula follows by raising ab to the same power.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Дополнительные законы для −1 и 2", "Supplementary laws for −1 and 2")}</h3>
            <Latex display>{String.raw`\left(\frac{-1}{p}\right)=(-1)^{(p-1)/2},
\qquad
\left(\frac2p\right)=(-1)^{(p^2-1)/8}.`}</Latex>
          </div>
          <p>
            {text(
              "Первый закон непосредственно следует из критерия Эйлера. Для второго применим лемму Гаусса к числу 2. Среди чисел 2,4,…,p−1 количество N наименьших положительных представителей, превышающих p/2, равно (p−1)/2−⌊p/4⌋. Замена этих представителей на отрицательные переставляет абсолютные значения 1,…,(p−1)/2, поэтому после сокращения факториала получаем (2/p)=(−1)ᴺ. Для p≡1,3,5,7 mod 8 число N соответственно чётно, нечётно, нечётно, чётно, что и даёт формулу.",
              "The first law follows directly from Euler's criterion. For the second, apply Gauss's lemma to 2. Among 2,4,…,p−1, the number N of least positive representatives exceeding p/2 is (p−1)/2−⌊p/4⌋. Replacing these representatives by their negatives permutes the absolute values 1,…,(p−1)/2; cancelling the factorial gives (2/p)=(−1)ᴺ. For p≡1,3,5,7 mod 8, N is respectively even, odd, odd, even, which proves the formula.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Простые делители угловой клетки", "7. Prime divisors of a corner entry")}</h2>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <p>
              {text(
                "Пусть примитивный магический квадрат состоит из девяти целых квадратов. Если простой q≡3 mod 4 делит корень угловой клетки, то q≡7 mod 8. В частности, простой q≡3 mod 8 не может делить корень угловой клетки.",
                "Let a primitive magic square consist of nine integral squares. If a prime q≡3 mod 4 divides the root of a corner entry, then q≡7 mod 8. In particular, a prime q≡3 mod 8 cannot divide the root of a corner entry.",
              )}
            </p>
          </div>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Поворотом можно считать этой клеткой A=a². Из общей формы следует f²+h²=2a². Пусть q∣a и q≡3 mod 4. Тогда −1 не является квадратичным вычетом по модулю q. Из f²+h²≡0 следует q∣f и q∣h: иначе отношение f/h или h/f дало бы квадратный корень из −1.",
              "After a rotation, take this entry to be A=a². The general form gives f²+h²=2a². Let q∣a and q≡3 mod 4. Then −1 is not a quadratic residue modulo q. From f²+h²≡0 it follows that q∣f and q∣h; otherwise f/h or h/f would be a square root of −1.",
            )}
          </p>
          <p>
            {text(
              "Сравнения A=e²+x≡0 и F=e²+x+y≡0 дают y≡0 и x≡−e². Поэтому весь квадрат имеет следующий вид по модулю q:",
              "The congruences A=e²+x≡0 and F=e²+x+y≡0 give y≡0 and x≡−e². Hence the whole square has the following form modulo q:",
            )}
          </p>
          <Latex display>{String.raw`\begin{pmatrix}
a^2&b^2&c^2\\d^2&e^2&f^2\\g^2&h^2&j^2
\end{pmatrix}
\equiv
\begin{pmatrix}
0&2e^2&e^2\\2e^2&e^2&0\\e^2&0&2e^2
\end{pmatrix}\pmod q.`}</Latex>
          <p>
            {text(
              "Если q∣e, то все девять квадратов делятся на q², что противоречит примитивности. Значит, e обратим по модулю q. Поскольку 2e² является квадратом, число 2 — квадратичный вычет: (2/q)=1. Дополнительный закон оставляет q≡1 или 7 mod 8; вместе с q≡3 mod 4 остаётся только q≡7 mod 8.",
              "If q∣e, all nine square entries are divisible by q², contradicting primitivity. Thus e is invertible modulo q. Since 2e² is a square, 2 is a quadratic residue: (2/q)=1. The supplementary law leaves q≡1 or 7 mod 8; together with q≡3 mod 4, only q≡7 mod 8 remains.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Что эти условия не доказывают", "8. What these conditions do not prove")}</h2>
          <p>
            {text(
              "Все полученные сравнения являются необходимыми локальными условиями. Они быстро исключают невозможные координаты и факторизации, но не строят рациональную или целочисленную точку исходной системы. Даже совместная разрешимость по многим модулям сама по себе не является доказательством существования квадратного квадрата.",
              "All congruences obtained here are necessary local conditions. They quickly exclude impossible coordinates and factorizations, but they do not construct a rational or integral point of the original system. Solvability modulo many integers is not by itself a proof that a magic square of squares exists.",
            )}
          </p>
          <p>
            {text(
              "Представления числа суммой двух квадратов и факторизация в ℤ[i] усиливают это угловое ограничение до всех нецентральных клеток и определяют возможную факторизацию центрального корня.",
              "Representations as sums of two squares and factorization in ℤ[i] extend this corner restriction to every noncentral entry and determine the possible factorization of the central root.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/prime-divisors">
              {text("Перейти к факторизации корней", "Continue to root factorizations")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory">
              {text("К оглавлению теории", "Back to theory contents")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

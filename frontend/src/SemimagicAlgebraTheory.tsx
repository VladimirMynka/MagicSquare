import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

const EXTERNAL_LINKS = {
  hill: "https://emis.de/ft/34033",
  guterman: "https://www.mathnet.ru/eng/znsl5738",
  murase: "https://doi.org/10.1080/00029890.1957.11988955",
} as const;

export function SemimagicAlgebraTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page semimagic-algebra-theory-page">
      <TheoryLink className="back-link" to="/theory#matrix-algebra">
        ← {text("К циклу об алгебре умножения", "Back to the multiplication-algebra series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Алгебра матричного умножения · 4.1", "Matrix multiplication algebra · 4.1")}
          </p>
          <h1>
            {text(
              "Магические, чарующие и полумагические квадраты",
              "Magic, charming, and semimagic squares",
            )}
          </h1>
          <p>
            {text(
              "Обычное матричное произведение выводит нас из трёхмерного пространства магических квадратов в пятимерную алгебру полумагических матриц. На этой странице получены явные законы умножения, полная классификация и точные разложения.",
              "Ordinary matrix multiplication takes us from the three-dimensional space of magic squares into the five-dimensional algebra of semimagic matrices. This page derives explicit product laws, a complete classification, and exact decompositions.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document semimagic-algebra-theory-document">
        <section>
          <h2>{text("1. Произведение двух магических квадратов", "1. A product of two magic squares")}</h2>
          <p>
            {text(
              "Используем доказанную ранее общую форму магического квадрата:",
              "We use the previously proved general form of a magic square:",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`M(E,x,y)=
\begin{pmatrix}
E+x&E-x+y&E-y\\
E-x-y&E&E+x+y\\
E+y&E+x-y&E-x
\end{pmatrix}.`}</Latex>
          </div>
          <p>
            {text(
              "Положим s₀=M(1,0,0), s₁=M(0,1,0), s₂=M(0,0,1). Тогда M(E,x,y)=Es₀+xs₁+ys₂. Прямое перемножение трёх базисных матриц показывает, что произведение двух магических квадратов обычно уже не удовлетворяет диагональным условиям, но сохраняет равенство всех сумм строк и столбцов.",
              "Set s₀=M(1,0,0), s₁=M(0,1,0), and s₂=M(0,0,1). Then M(E,x,y)=Es₀+xs₁+ys₂. Direct multiplication of these three basis matrices shows that a product of two magic squares generally loses the diagonal conditions while retaining equal row and column sums.",
            )}
          </p>
          <div className="basis-matrix-row">
            <div>
              <span><Latex>{String.raw`s_1`}</Latex></span>
              <Latex display>{String.raw`\begin{pmatrix}
1&-1&0\\-1&0&1\\0&1&-1
\end{pmatrix}`}</Latex>
            </div>
            <div>
              <span><Latex>{String.raw`s_2`}</Latex></span>
              <Latex display>{String.raw`\begin{pmatrix}
0&1&-1\\-1&0&1\\1&-1&0
\end{pmatrix}`}</Latex>
            </div>
            <div>
              <span><Latex>{String.raw`s_1^2`}</Latex></span>
              <Latex display>{String.raw`\begin{pmatrix}
2&-1&-1\\-1&2&-1\\-1&-1&2
\end{pmatrix}`}</Latex>
            </div>
          </div>
          <p>
            {text(
              "Последняя матрица имеет нулевые суммы строк и столбцов, но её главная диагональ имеет сумму 6. Значит, пространство магических квадратов не замкнуто относительно матричного умножения.",
              "The last matrix has zero row and column sums, but its main diagonal sums to 6. Hence the space of magic squares is not closed under matrix multiplication.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Стандартная теория и наша терминология", "2. Standard theory and our terminology")}</h2>
          <p>
            {text(
              "Матрица называется полумагической, если суммы всех её строк и всех её столбцов совпадают. Для матрицы 3×3 будем записывать эту общую сумму как 3E. Обозначим через P матрицу центрального отражения, а через 𝟙 — матрицу из единиц:",
              "A matrix is semimagic when all of its row sums and column sums agree. For a 3×3 matrix we write this common sum as 3E. Let P denote the central-reversal matrix and 𝟙 the all-ones matrix:",
            )}
          </p>
          <Latex display>{String.raw`P=
\begin{pmatrix}0&0&1\\0&1&0\\1&0&0\end{pmatrix},
\qquad
\mathbf 1=
\begin{pmatrix}1&1&1\\1&1&1\\1&1&1\end{pmatrix}.`}</Latex>
          <p>
            {text(
              "В стандартной терминологии полумагическая матрица A веса E называется associated, если A+PAP=2E𝟙, и balanced, или центросимметрической, если PAP=A.",
              "In standard terminology, a semimagic matrix A of weight E is associated when A+PAP=2E𝟙, and balanced, or centrosymmetric, when PAP=A.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Теорема о соответствии", "Correspondence theorem")}</h3>
            <p>
              {text(
                "Над полем характеристики, отличной от 2 и 3, associated-полумагические матрицы 3×3 — это в точности магические квадраты M(E,x,y). Balanced-полумагические матрицы 3×3 — это в точности матрицы C(E,z,w), которые в проекте называются чарующими квадратами.",
                "Over a field of characteristic other than 2 or 3, the associated semimagic 3×3 matrices are exactly the magic squares M(E,x,y). The balanced semimagic 3×3 matrices are exactly the matrices C(E,z,w), called charming squares in this project.",
              )}
            </p>
          </div>
          <h3>{text("Доказательство для associated-компоненты", "Proof for the associated component")}</h3>
          <p>
            {text(
              "Для M(E,x,y) противоположные относительно центра клетки имеют сумму 2E, поэтому M+PMP=2E𝟙. Обратно, associated-условие даёт центральную клетку E и сумму 2E для каждой противоположной пары. Обе главные диагонали поэтому имеют сумму 3E; вместе с полумагическими условиями матрица является магической.",
              "In M(E,x,y), every centrally opposite pair sums to 2E, so M+PMP=2E𝟙. Conversely, the associated condition gives central entry E and sum 2E for every opposite pair. Both principal diagonals therefore sum to 3E; together with the semimagic conditions, the matrix is magic.",
            )}
          </p>
          <h3>{text("Доказательство для balanced-компоненты", "Proof for the balanced component")}</h3>
          <p>
            {text(
              "Центросимметрическая матрица с одинаковыми суммами строк и столбцов сначала имеет вид слева. Сравнение первой строки с первым столбцом вынуждает d=b, а равенство сумм даёт e=a+c−b:",
              "A centrosymmetric matrix with equal row and column sums first has the form on the left. Comparing its first row with its first column forces d=b, and equality of sums gives e=a+c−b:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{pmatrix}a&b&c\\d&e&d\\c&b&a\end{pmatrix}
=
\begin{pmatrix}a&b&c\\b&a+c-b&b\\c&b&a\end{pmatrix}.`}</Latex>
          <p>
            {text(
              "Положив E=(a+b+c)/3, z=(a−b)/3 и w=(c−b)/3, получаем единственную форму",
              "Setting E=(a+b+c)/3, z=(a−b)/3, and w=(c−b)/3 gives the unique form",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`C(E,z,w)=
\begin{pmatrix}
E+2z-w&E-z-w&E-z+2w\\
E-z-w&E+2z+2w&E-z-w\\
E-z+2w&E-z-w&E+2z-w
\end{pmatrix}.`}</Latex>
          </div>
          <aside className="literature-note">
            <h3>{text("Историческое положение", "Historical context")}</h3>
            <p>
              {text(
                "Название «чарующий квадрат» возникло внутри проекта при независимом выводе этой трёхмерной компоненты. В общей литературе используется название balanced semimagic matrix. Алгебра полумагических матриц изучалась по меньшей мере с работ Вайнера и Мурасе 1950-х годов; разложение на associated и balanced-компоненты и его блочная форма развиты в последующих работах.",
                "The term “charming square” arose within this project during an independent derivation of this three-dimensional component. The standard literature calls it a balanced semimagic matrix. The algebra of semimagic matrices has been studied at least since work by Weiner and Murase in the 1950s; later work develops its associated/balanced decomposition and block form.",
              )}
            </p>
            <ul>
              <li>
                <a href={EXTERNAL_LINKS.murase} rel="noreferrer" target="_blank">
                  I. Murase, <i>Semimagic Squares and Non-Semisimple Algebras</i> (1957)
                </a>
              </li>
              <li>
                <a href={EXTERNAL_LINKS.guterman} rel="noreferrer" target="_blank">
                  {text(
                    "A. Гутерман, О. Маркова, С. Сочнев, «Алгебра полумагических матриц и её длина»",
                    "A. Guterman, O. Markova, S. Sochnev, Algebra of Semimagic Matrices and Its Length",
                  )}
                </a>
              </li>
              <li>
                <a href={EXTERNAL_LINKS.hill} rel="noreferrer" target="_blank">
                  S. Hill, M. Lettington, K. Schmidt, <i>Block Representations and Spectral Properties of Constant Sum Matrices</i>
                </a>
              </li>
            </ul>
          </aside>
        </section>

        <section>
          <h2>{text("3. Четыре закона умножения", "3. The four product laws")}</h2>
          <p>
            {text(
              "Раскрытие произведений по базису даёт четыре точные формулы. Они верны как полиномиальные тождества и не требуют деления:",
              "Expanding products in the basis gives four exact formulas. They are polynomial identities and require no division:",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`\begin{aligned}
M(E_1,x_1,y_1)M(E_2,x_2,y_2)
&=C(3E_1E_2,\ x_1x_2-y_1y_2,\ y_1x_2-x_1y_2),\\
M(E_1,x_1,y_1)C(E_2,x_2,y_2)
&=3M(E_1E_2,\ x_1x_2-y_1y_2,\ y_1x_2-x_1y_2),\\
C(E_1,x_1,y_1)M(E_2,x_2,y_2)
&=3M(E_1E_2,\ x_1x_2+y_1y_2,\ y_1x_2+x_1y_2),\\
C(E_1,x_1,y_1)C(E_2,x_2,y_2)
&=3C(E_1E_2,\ x_1x_2+y_1y_2,\ y_1x_2+x_1y_2).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Следовательно, MM попадает в C, произведения MC и CM — в M, а CC — в C. Порядок множителей существенен: вторые координаты в формулах MC и CM различаются. В частности, всякое произведение нечётного числа магических квадратов снова магическое, а произведение чётного числа — чарующее.",
              "Thus MM lands in C, MC and CM land in M, and CC lands in C. Factor order matters: the second coordinates in the MC and CM formulas differ. In particular, every product of an odd number of magic squares is magic, while every product of an even number is charming.",
            )}
          </p>
          <p>
            {text(
              "Последнее утверждение доказывается индукцией по числу множителей с использованием четырёх включений, а не проверкой отдельных произведений.",
              "The last statement follows by induction on the number of factors using the four inclusions, rather than by checking individual products.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Полная форма полумагического квадрата", "4. The complete semimagic form")}</h2>
          <p>
            {text(
              "Сложение магической и чарующей компонент с единственным общим параметром E приводит к пяти координатам:",
              "Adding a magic component and a charming component with a single shared parameter E gives five coordinates:",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`S(E,x,y,z,w)=M(E,x,y)+C(0,z,w)
=
\begin{pmatrix}
E+x+2z-w&E-x+y-z-w&E-y-z+2w\\
E-x-y-z-w&E+2z+2w&E+x+y-z-w\\
E+y-z+2w&E+x-y-z-w&E-x+2z-w
\end{pmatrix}.`}</Latex>
          </div>
          <div className="theorem-block">
            <h3>{text("Теорема классификации", "Classification theorem")}</h3>
            <p>
              {text(
                "Над полем характеристики, отличной от 2 и 3, отображение (E,x,y,z,w)↦S(E,x,y,z,w) является биекцией между K⁵ и множеством полумагических матриц 3×3.",
                "Over a field of characteristic other than 2 or 3, the map (E,x,y,z,w)↦S(E,x,y,z,w) is a bijection from K⁵ to the set of semimagic 3×3 matrices.",
              )}
            </p>
          </div>
          <h3>{text("Прямое направление", "Forward direction")}</h3>
          <p>
            {text(
              "У M(E,x,y) все строки и столбцы имеют сумму 3E, а у C(0,z,w) — сумму 0. Поэтому каждая строка и каждый столбец S(E,x,y,z,w) имеют сумму 3E.",
              "Every row and column of M(E,x,y) sums to 3E, while every row and column of C(0,z,w) sums to 0. Hence every row and column of S(E,x,y,z,w) sums to 3E.",
            )}
          </p>
          <h3>{text("Обратное направление и единственность", "Reverse direction and uniqueness")}</h3>
          <p>
            {text(
              "Пусть A полумагическая и её общая сумма равна T. Если обозначить её левый верхний блок через a,b,d,e, то уравнения для первых двух строк и столбцов последовательно вынуждают все остальные клетки:",
              "Let A be semimagic with common sum T. If its upper-left block is denoted by a,b,d,e, the equations for the first two rows and columns force every remaining entry in succession:",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`A=
\begin{pmatrix}
a&b&T-a-b\\
d&e&T-d-e\\
T-a-d&T-b-e&a+b+d+e-T
\end{pmatrix}.`}</Latex>
          </div>
          <p>
            {text(
              "Последняя строка и последний столбец автоматически имеют сумму T. Тем самым пять величин T,a,b,d,e задают все полумагические матрицы и задают их однозначно. При наличии деления на 2 и 3 те же пять степеней свободы переводятся в наши координаты:",
              "The last row and last column then automatically sum to T. Thus the five quantities T,a,b,d,e describe every semimagic matrix uniquely. When division by 2 and 3 is available, the same five degrees of freedom translate into our coordinates:",
            )}
          </p>
          <Latex display>{String.raw`\begin{gathered}
E=\frac{T}{3},\qquad
x=\frac{a_{11}-a_{33}}2,\qquad
y=\frac{a_{31}-a_{13}}2,\\
u=\frac{a_{11}+a_{33}}2-E,\qquad
v=\frac{a_{13}+a_{31}}2-E,\\
z=\frac{2u+v}{3},\qquad
w=\frac{u+2v}{3}.
\end{gathered}`}</Latex>
          <p>
            {text(
              "Подстановка принудительной формы A в эти выражения и затем в S возвращает каждую из девяти клеток A. Формулы восстановления одновременно доказывают существование и единственность координат E,x,y,z,w.",
              "Substituting the forced form of A into these expressions and then into S recovers all nine entries of A. The recovery formulas prove both existence and uniqueness of E,x,y,z,w.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Единственное чётно-нечётное разложение", "5. The unique even–odd decomposition")}</h2>
          <p>
            {text(
              "Полная форма уже содержит каноническое разложение",
              "The complete form already contains the canonical decomposition",
            )}
          </p>
          <Latex display>{String.raw`S(E,x,y,z,w)=C(E,z,w)+M(0,x,y).`}</Latex>
          <p>
            {text(
              "Чарующая часть содержит общий центр и играет роль чётной компоненты; магическая часть имеет нулевой центр и играет роль нечётной. Их пересечение нулевое: если C(E,z,w)=M(0,x,y), то сравнение общих сумм даёт E=0, а единственность пяти координат даёт x=y=z=w=0.",
              "The charming part contains the common center and serves as the even component; the zero-center magic part serves as the odd component. Their intersection is zero: if C(E,z,w)=M(0,x,y), equality of common sums gives E=0, and uniqueness of the five coordinates gives x=y=z=w=0.",
            )}
          </p>
          <p>
            {text(
              "По четырём законам произведение однородных компонент имеет степень, равную сумме степеней по модулю 2. Тем самым пятимерная алгебра полумагических матриц получает ℤ/2ℤ-градуировку.",
              "By the four product laws, the degree of a product of homogeneous components is the sum of their degrees modulo 2. Thus the five-dimensional semimagic algebra is ℤ/2ℤ-graded.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Порождение магическими квадратами", "6. Generation by magic squares")}</h2>
          <div className="theorem-block">
            <h3>{text("Точная формула", "Exact formula")}</h3>
            <Latex display>{String.raw`S(E,x,y,z,w)
=M(E,x,y)+M(0,1,0)M(0,z,-w).`}</Latex>
          </div>
          <p>
            {text(
              "Первый закон умножения даёт M(0,1,0)M(0,z,−w)=C(0,z,w), поэтому правая часть в точности равна определению S. Следовательно, всякий рациональный полумагический квадрат 3×3 является суммой магического квадрата и произведения двух магических квадратов.",
              "The first product law gives M(0,1,0)M(0,z,−w)=C(0,z,w), so the right-hand side is exactly the definition of S. Therefore every rational semimagic 3×3 square is a sum of a magic square and a product of two magic squares.",
            )}
          </p>
          <p>
            {text(
              "Здесь не утверждается, что все три слагаемых единственны. Единственным является разложение на чарующую часть C(E,z,w) и магическую часть с нулевым центром M(0,x,y).",
              "This does not claim that the three magic factors are unique. What is unique is the decomposition into the charming part C(E,z,w) and the zero-center magic part M(0,x,y).",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Почему S=M₁(I+M₂) не универсально", "7. Why S=M₁(I+M₂) is not universal")}</h2>
          <p>
            {text(
              "Единичная матрица принадлежит чарующей компоненте:",
              "The identity matrix belongs to the charming component:",
            )}
          </p>
          <Latex display>{String.raw`I_3=C\!\left(\frac13,\frac13,0\right).`}</Latex>
          <p>
            {text(
              "Если представить S(E,x,y,z,w) в виде M(a,x,y)(I₃+M(b,u,v)), то сравнение магической и чарующей частей даёт",
              "If S(E,x,y,z,w) is represented as M(a,x,y)(I₃+M(b,u,v)), comparison of the magic and charming parts gives",
            )}
          </p>
          <Latex display>{String.raw`E=a(1+3b),\qquad
\begin{pmatrix}z\\w\end{pmatrix}
=
\begin{pmatrix}x&-y\\y&-x\end{pmatrix}
\begin{pmatrix}u\\v\end{pmatrix}.`}</Latex>
          <p>
            {text(
              "Над ℚ первое уравнение разрешимо при любом E, например при a=1. Поэтому единственное препятствие находится во второй системе. Её определитель равен y²−x².",
              "Over ℚ the first equation is solvable for every E, for example with a=1. Thus the only obstruction lies in the second system, whose determinant is y²−x².",
            )}
          </p>
          <p>
            {text(
              "Если x²≠y², матрица системы обратима и допускает любые z,w. Если x=y≠0, обе координаты результата равны x(u−v); если x=−y≠0, они равны x(u+v) и −x(u+v). Каждое из полученных условий достаточно: требуемое значение достигается выбором одного из u,v равным нулю. При x=y=0 образ системы состоит только из нулевой пары. Поэтому получаем точную классификацию:",
              "If x²≠y², the system matrix is invertible and permits all z,w. If x=y≠0, both output coordinates equal x(u−v); if x=−y≠0, they equal x(u+v) and −x(u+v). Each resulting condition is sufficient: the required value is obtained by setting one of u,v to zero. When x=y=0, the image consists only of the zero pair. Hence the exact classification is:",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table factorization-locus-table">
              <thead>
                <tr>
                  <th>{text("Магическая часть", "Magic component")}</th>
                  <th>{text("Точно покрываемая чарующая часть", "Exactly covered charming component")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Latex>{String.raw`x^2\ne y^2`}</Latex></td>
                  <td>{text("Любые z,w", "All z,w")}</td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`x=y\ne0`}</Latex></td>
                  <td><Latex>{String.raw`z=w`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`x=-y\ne0`}</Latex></td>
                  <td><Latex>{String.raw`z=-w`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`x=y=0`}</Latex></td>
                  <td><Latex>{String.raw`z=w=0`}</Latex></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Например, S(0,1,1,1,0) не допускает такого представления: равенство x=y вынуждало бы z=w, тогда как здесь z=1 и w=0. Это точный контрпример к универсальности, а таблица описывает максимальную область применимости формулы.",
              "For example, S(0,1,1,1,0) has no such representation: x=y would force z=w, whereas here z=1 and w=0. This is an exact counterexample to universality, and the table describes the maximal domain of the formula.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Граница этой статьи", "8. Scope of this article")}</h2>
          <p>
            {text(
              "На этой странице доказаны классификация и законы умножения над полями, где 2 и 3 обратимы, а сами произведения записаны как целочисленные полиномиальные тождества. Над ℤ полная полумагическая матрица может иметь общую сумму, не делящуюся на 3, поэтому координаты S(E,x,y,z,w) описывают не всю целочисленную решётку. Этот вопрос требует отдельной статьи.",
              "This page proves the classification and product laws over fields in which 2 and 3 are invertible, while the product identities themselves are integral polynomial identities. Over ℤ a full semimagic matrix may have common sum not divisible by 3, so the coordinates S(E,x,y,z,w) do not cover the entire integral lattice. That boundary requires a separate article.",
            )}
          </p>
          <p>
            {text(
              "Следующая статья строит изоморфизм с K⊕M₂(K), выделяет четырёхмерный идеал нулевой суммы и записывает в нём явный базис расщеплённых кватернионов 1,i,j,k.",
              "The next article constructs the isomorphism with K⊕M₂(K), isolates the four-dimensional zero-sum ideal, and gives an explicit split-quaternion basis 1,i,j,k inside it.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink
              className="button button-primary"
              to="/theory/matrix-algebra/block-structure-split-quaternions"
            >
              {text("Блочная структура и кватернионы", "Block structure and quaternions")}{" "}
              <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/magic-squares-3x3">
              {text("Общая форма M(E,x,y)", "The general form M(E,x,y)")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

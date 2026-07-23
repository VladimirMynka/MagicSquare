import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

const EXTERNAL_LINKS = {
  hill: "https://orca.cardiff.ac.uk/id/eprint/93660/",
  guterman: "https://www.mathnet.ru/eng/znsl5738",
  voight: "https://doi.org/10.1007/978-3-030-56694-4",
} as const;

export function SemimagicStructureTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page semimagic-structure-theory-page">
      <TheoryLink className="back-link" to="/theory#matrix-algebra">
        ← {text("К циклу об алгебре умножения", "Back to the multiplication-algebra series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Алгебра матричного умножения · 4.2", "Matrix multiplication algebra · 4.2")}
          </p>
          <h1>
            {text(
              "Блочная структура и расщеплённые кватернионы",
              "Block structure and split quaternions",
            )}
          </h1>
          <p>
            {text(
              "Равенство сумм строк и столбцов выделяет в трёхмерном пространстве инвариантную прямую и дополнительную плоскость. Это разложение раскрывает внутреннее устройство пятимерной алгебры полумагических матриц и приводит к явной модели её четырёхмерного идеала как расщеплённой кватернионной алгебры.",
              "Equality of row and column sums determines an invariant line and a complementary plane in three-dimensional space. This decomposition reveals the internal structure of the five-dimensional semimagic algebra and gives an explicit split-quaternion model of its four-dimensional ideal.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document semimagic-structure-theory-document">
        <section>
          <h2>{text("1. Структурная задача", "1. The structural problem")}</h2>
          <p>
            {text(
              "Пусть K — поле характеристики, отличной от 2 и 3, а SM₃(K) — алгебра полумагических матриц 3×3. По предыдущей статье каждый её элемент единственным образом записывается как S(E,x,y,z,w), поэтому dim SM₃(K)=5. Чтобы понять умножение в этой алгебре, отделим направление, отвечающее за общую сумму строк и столбцов, от преобразования на подпространстве нулевой суммы.",
              "Let K be a field of characteristic other than 2 or 3, and let SM₃(K) be the algebra of semimagic 3×3 matrices. The preceding article gives every element uniquely as S(E,x,y,z,w), so dim SM₃(K)=5. To understand multiplication in this algebra, separate the direction carrying the common row and column sum from the action on the zero-sum subspace.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Структурная теорема", "Structure theorem")}</h3>
            <Latex display>{String.raw`\operatorname{SM}_3(K)\cong K\oplus M_2(K)
\cong K\oplus\mathbb H_{\mathrm{split}}(K).`}</Latex>
            <p>
              {text(
                "Четырёхмерное слагаемое состоит ровно из полумагических матриц с нулевой общей суммой. Именно оно является расщеплённой кватернионной алгеброй.",
                "The four-dimensional summand consists exactly of semimagic matrices with common sum zero. This summand is the split quaternion algebra.",
              )}
            </p>
          </div>
          <p>
            {text(
              "Одномерное слагаемое хранит общую сумму, а вся нетривиальная некоммутативная структура сосредоточена в четырёхмерном слагаемом. Следующие разделы выводят это разложение и затем строят в четырёхмерном идеале кватернионный базис.",
              "The one-dimensional summand records the common sum, while all nontrivial noncommutative structure lies in the four-dimensional summand. The following sections derive this decomposition and then construct a quaternion basis in the four-dimensional ideal.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Инвариантная прямая и плоскость нулевой суммы", "2. The invariant line and zero-sum plane")}</h2>
          <p>
            {text(
              "Обозначим через e=(1,1,1)ᵀ и рассмотрим плоскость W в K³, состоящую из векторов с нулевой суммой координат:",
              "Let e=(1,1,1)ᵀ and consider the plane W in K³ consisting of vectors whose coordinates sum to zero:",
            )}
          </p>
          <Latex display>{String.raw`L=K\mathbf e,\qquad
W=\{(a,b,c)^{\mathsf T}\in K^3:a+b+c=0\}.`}</Latex>
          <p>
            {text(
              "Если у полумагической матрицы A общая сумма строк и столбцов равна T, то",
              "If a semimagic matrix A has common row and column sum T, then",
            )}
          </p>
          <Latex display>{String.raw`A\mathbf e=T\mathbf e,\qquad
\mathbf e^{\mathsf T}A=T\mathbf e^{\mathsf T}.`}</Latex>
          <p>
            {text(
              "Первое равенство делает L инвариантной прямой. Из второго для любого v∈W следует eᵀAv=T eᵀv=0, поэтому W тоже инвариантна. В базисе",
              "The first equality makes L an invariant line. From the second, every v∈W satisfies eᵀAv=T eᵀv=0, so W is invariant as well. In the basis",
            )}
          </p>
          <Latex display>{String.raw`\mathbf e=(1,1,1)^{\mathsf T},\qquad
u=(1,-1,0)^{\mathsf T},\qquad
v=(1,0,-1)^{\mathsf T}`}</Latex>
          <p>{text("матрица A имеет блочно-диагональный вид", "the matrix A has block-diagonal form")}</p>
          <Latex display>{String.raw`[A]_{(\mathbf e,u,v)}
=
\begin{pmatrix}
T&0\\
0&B
\end{pmatrix},
\qquad B\in M_2(K).`}</Latex>
          <p>
            {text(
              "Обратно, произвольная пара (T,B) задаёт такой оператор и после возвращения к стандартному базису даёт полумагическую матрицу. Определитель матрицы перехода равен 3, поэтому для этого доказательства достаточно, чтобы 3 было обратимо. При умножении блоки перемножаются независимо:",
              "Conversely, any pair (T,B) defines such an operator and, after returning to the standard basis, gives a semimagic matrix. The change-of-basis determinant is 3, so this proof only requires 3 to be invertible. Under multiplication the blocks multiply independently:",
            )}
          </p>
          <Latex display>{String.raw`(T_1,B_1)(T_2,B_2)=(T_1T_2,B_1B_2).`}</Latex>
          <aside className="literature-note">
            <h3>{text("Положение относительно общей теории", "Relation to the standard theory")}</h3>
            <p>
              {text(
                "Блочное представление матриц с постоянной суммой и соответствующее разложение алгебры являются общей теорией и не заявляются здесь как новый результат проекта. Для нашего исследования существенно записать этот изоморфизм явно в координатах S(E,x,y,z,w) и выбрать кватернионный базис, согласованный с магической и чарующей компонентами.",
                "The block representation of constant-sum matrices and the resulting algebra decomposition belong to the standard theory and are not claimed here as a new project result. For our purposes, the essential step is to write this isomorphism explicitly in S(E,x,y,z,w) coordinates and choose a quaternion basis aligned with the magic and charming components.",
              )}
            </p>
            <ul>
              <li>
                <a href={EXTERNAL_LINKS.hill} rel="noreferrer" target="_blank">
                  S. Hill, M. Lettington, K. Schmidt,{" "}
                  <i>Block Representations and Spectral Properties of Constant Sum Matrices</i>
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
                <a href={EXTERNAL_LINKS.voight} rel="noreferrer" target="_blank">
                  J. Voight, <i>Quaternion Algebras</i>
                </a>
              </li>
            </ul>
          </aside>
        </section>

        <section>
          <h2>{text("3. Координатная форма изоморфизма", "3. The coordinate form of the isomorphism")}</h2>
          <p>
            {text(
              "Для A=S(E,x,y,z,w) скалярный блок равен общей сумме T=3E, а ограничение A|W в базисе (u,v) имеет матрицу",
              "For A=S(E,x,y,z,w), the scalar block is the common sum T=3E, while the restriction A|W in the basis (u,v) has matrix",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`B(x,y,z,w)=
\begin{pmatrix}
3z+3w+x+y&2x+2y\\
-3w+x-2y&3z-3w-x-y
\end{pmatrix}.`}</Latex>
          </div>
          <p>{text("Тем самым структурный изоморфизм задаётся формулой", "Hence the structure isomorphism is given by")}</p>
          <Latex display>{String.raw`\Phi\bigl(S(E,x,y,z,w)\bigr)
=\bigl(3E,B(x,y,z,w)\bigr).`}</Latex>
          <p>
            {text(
              "Для доказательства биективности выпишем обратное отображение. Если B имеет клетки a,b,c,d в порядке строк, то все пять координат восстанавливаются однозначно:",
              "To prove bijectivity, write the inverse map explicitly. If the row-major entries of B are a,b,c,d, all five coordinates are recovered uniquely:",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`\begin{aligned}
E&=\frac{T}{3},&
z&=\frac{a+d}{6},&
w&=\frac{a-d-b}{6},\\
x&=\frac{a-d+b+2c}{6},&
y&=\frac{-a+d+2b-2c}{6}.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Подстановка этих выражений в B возвращает a,b,c,d. Следовательно, Φ биективно и, поскольку ограничение произведения равно произведению ограничений, является изоморфизмом алгебр.",
              "Substitution into B recovers a,b,c,d. Thus Φ is bijective and, because restriction of a product is the product of the restrictions, it is an algebra isomorphism.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Два центральных идемпотента", "4. Two central idempotents")}</h2>
          <p>{text("Пусть J — матрица из единиц. Введём", "Let J be the all-ones matrix. Define")}</p>
          <Latex display>{String.raw`H=\frac13J=M\left(\frac13,0,0\right),
\qquad
Q=I_3-H=C\left(0,\frac13,0\right).`}</Latex>
          <p>{text("Прямое умножение даёт", "Direct multiplication gives")}</p>
          <Latex display>{String.raw`H^2=H,\qquad Q^2=Q,\qquad HQ=QH=0,\qquad H+Q=I_3.`}</Latex>
          <p>
            {text(
              "Матрица H является единицей одномерного скалярного идеала KH. Матрица Q имеет нулевые суммы строк и столбцов и является внутренней единицей четырёхмерного идеала",
              "The matrix H is the identity of the one-dimensional scalar ideal KH. The matrix Q has zero row and column sums and is the internal identity of the four-dimensional ideal",
            )}
          </p>
          <Latex display>{String.raw`\mathcal I_0
=\{S(0,x,y,z,w):x,y,z,w\in K\}.`}</Latex>
          <p>
            {text(
              "Важно различать две единицы: единица всей алгебры — I₃=H+Q, а элемент, который будет обозначен 1 в кватернионном базисе идеала, — это Q.",
              "The two identities must be distinguished: the identity of the full algebra is I₃=H+Q, whereas the element denoted by 1 in the quaternion basis of the ideal is Q.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Явный базис 1,i,j,k", "5. An explicit basis 1,i,j,k")}</h2>
          <p>{text("В идеале 𝓘₀ выберем четыре матрицы:", "Choose the following four matrices in the ideal 𝓘₀:")}</p>
          <div className="basis-matrix-row quaternion-basis-row">
            <div>
              <span><Latex>{String.raw`\mathbf 1_0=Q`}</Latex></span>
              <Latex display>{String.raw`\frac13\begin{pmatrix}
2&-1&-1\\-1&2&-1\\-1&-1&2
\end{pmatrix}`}</Latex>
            </div>
            <div>
              <span><Latex>{String.raw`i=C(0,0,\frac13)`}</Latex></span>
              <Latex display>{String.raw`\frac13\begin{pmatrix}
-1&-1&2\\-1&2&-1\\2&-1&-1
\end{pmatrix}`}</Latex>
            </div>
            <div>
              <span><Latex>{String.raw`j=M(0,\frac23,\frac13)`}</Latex></span>
              <Latex display>{String.raw`\frac13\begin{pmatrix}
2&-1&-1\\-3&0&3\\1&1&-2
\end{pmatrix}`}</Latex>
            </div>
            <div>
              <span><Latex>{String.raw`k=M(0,\frac13,\frac23)`}</Latex></span>
              <Latex display>{String.raw`\frac13\begin{pmatrix}
1&1&-2\\-3&0&3\\2&-1&-1
\end{pmatrix}`}</Latex>
            </div>
          </div>
          <p>{text("Их таблица умножения имеет вид", "Their multiplication table is")}</p>
          <div className="domain-table-wrap quaternion-table-wrap">
            <table className="domain-table quaternion-table">
              <thead>
                <tr>
                  <th>·</th>
                  <th><Latex>{String.raw`\mathbf1_0`}</Latex></th>
                  <th><Latex>{String.raw`i`}</Latex></th>
                  <th><Latex>{String.raw`j`}</Latex></th>
                  <th><Latex>{String.raw`k`}</Latex></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th><Latex>{String.raw`\mathbf1_0`}</Latex></th>
                  <td><Latex>{String.raw`\mathbf1_0`}</Latex></td>
                  <td><Latex>{String.raw`i`}</Latex></td>
                  <td><Latex>{String.raw`j`}</Latex></td>
                  <td><Latex>{String.raw`k`}</Latex></td>
                </tr>
                <tr>
                  <th><Latex>{String.raw`i`}</Latex></th>
                  <td><Latex>{String.raw`i`}</Latex></td>
                  <td><Latex>{String.raw`\mathbf1_0`}</Latex></td>
                  <td><Latex>{String.raw`k`}</Latex></td>
                  <td><Latex>{String.raw`j`}</Latex></td>
                </tr>
                <tr>
                  <th><Latex>{String.raw`j`}</Latex></th>
                  <td><Latex>{String.raw`j`}</Latex></td>
                  <td><Latex>{String.raw`-k`}</Latex></td>
                  <td><Latex>{String.raw`\mathbf1_0`}</Latex></td>
                  <td><Latex>{String.raw`-i`}</Latex></td>
                </tr>
                <tr>
                  <th><Latex>{String.raw`k`}</Latex></th>
                  <td><Latex>{String.raw`k`}</Latex></td>
                  <td><Latex>{String.raw`-j`}</Latex></td>
                  <td><Latex>{String.raw`i`}</Latex></td>
                  <td><Latex>{String.raw`-\mathbf1_0`}</Latex></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>{text("В частности,", "In particular,")}</p>
          <Latex display>{String.raw`i^2=j^2=\mathbf1_0,\qquad
ij=-ji=k,\qquad k^2=-\mathbf1_0.`}</Latex>
          <p>
            {text(
              "Это кватернионная алгебра (1,1) над K, которая расщеплена и изоморфна M₂(K). При этом 1₀ и i являются чарующими, а j и k — магическими квадратами. Поэтому уже доказанное разложение",
              "This is the quaternion algebra (1,1) over K, which is split and isomorphic to M₂(K). Here 1₀ and i are charming, while j and k are magic squares. Thus the previously proved decomposition",
            )}
          </p>
          <Latex display>{String.raw`\mathcal I_0
=\operatorname{span}\{\mathbf1_0,i\}
\oplus
\operatorname{span}\{j,k\}`}</Latex>
          <p>
            {text(
              "совпадает с чётно-нечётной градуировкой расщеплённых кватернионов. Четыре закона CC→C, CM→M, MC→M, MM→C являются ровно таблицей умножения её чётной и нечётной частей.",
              "is precisely the even–odd grading of the split quaternions. The four laws CC→C, CM→M, MC→M, and MM→C are exactly the multiplication table of its even and odd parts.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Расщеплённая кватернионная алгебра", "6. The split quaternion algebra")}</h2>
          <p>
            {text(
              "Полученная таблица задаёт расщеплённую, а не делительную кватернионную алгебру. Над ℝ кватернионы Гамильтона удовлетворяют i²=j²=k²=−1 и образуют алгебру с делением, тогда как здесь два генератора имеют квадрат +1. Кроме того,",
              "The multiplication table defines a split quaternion algebra rather than a division algebra. Over ℝ, Hamilton's quaternions satisfy i²=j²=k²=−1 and form a division algebra, whereas here two generators square to +1. Moreover,",
            )}
          </p>
          <Latex display>{String.raw`(\mathbf1_0+i)(\mathbf1_0-i)
=\mathbf1_0-i^2=0,`}</Latex>
          <p>
            {text(
              "хотя оба множителя ненулевые. Значит, 𝓘₀ содержит делители нуля и не может быть изоморфен ℍ. Название «расщеплённые» как раз означает, что кватернионная алгебра изоморфна полной матричной алгебре M₂(K), а не алгебре с делением.",
              "although both factors are nonzero. Thus 𝓘₀ contains zero divisors and cannot be isomorphic to ℍ. The term “split” means precisely that the quaternion algebra is isomorphic to the full matrix algebra M₂(K), rather than to a division algebra.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Координаты и расщеплённая норма", "7. Coordinates and the split norm")}</h2>
          <p>{text("Каждый элемент идеала единственным образом записывается как", "Every element of the ideal has a unique expression")}</p>
          <Latex display>{String.raw`S(0,x,y,z,w)
=\alpha\mathbf1_0+\beta i+\gamma j+\delta k,`}</Latex>
          <p>{text("где переход между двумя системами координат задаётся формулами", "where the two coordinate systems are related by")}</p>
          <Latex display>{String.raw`\alpha=3z,\qquad
\beta=3w,\qquad
\gamma=2x-y,\qquad
\delta=2y-x.`}</Latex>
          <p>
            {text(
              "Кватернионное сопряжение меняет знаки у i,j,k. Соответствующая приведённая норма равна",
              "Quaternion conjugation changes the signs of i,j,k. The corresponding reduced norm is",
            )}
          </p>
          <Latex display>{String.raw`N_{\mathrm{split}}
(\alpha+\beta i+\gamma j+\delta k)
=\alpha^2-\beta^2-\gamma^2+\delta^2.`}</Latex>
          <p>{text("После подстановки наших координат получаем", "Substituting our coordinates gives")}</p>
          <Latex display>{String.raw`N_{\mathrm{split}}
=3\bigl(3z^2-3w^2-x^2+y^2\bigr)
=\det B(x,y,z,w).`}</Latex>
          <p>{text("Поэтому определитель исходной матрицы раскладывается на определители двух блоков:", "The determinant of the original matrix therefore factors into the determinants of its two blocks:")}</p>
          <Latex display>{String.raw`\det S(E,x,y,z,w)
=(3E)\det B
=9E\bigl(3z^2-3w^2-x^2+y^2\bigr).`}</Latex>
          <p>
            {text(
              "Следовательно, определитель полумагической матрицы имеет точный структурный смысл: это произведение нормы одномерного блока на приведённую норму расщеплённого кватерниона.",
              "Consequently, the determinant of a semimagic matrix has a precise structural meaning: it is the product of the one-dimensional block norm and the reduced norm of a split quaternion.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Центр, идеалы и границы утверждения", "8. Center, ideals, and theorem boundaries")}</h2>
          <p>{text("Поскольку центр M₂(K) состоит из скалярных матриц, центр всей полумагической алгебры двумерен:", "Since the center of M₂(K) consists of scalar matrices, the center of the full semimagic algebra is two-dimensional:")}</p>
          <Latex display>{String.raw`Z(\operatorname{SM}_3(K))
=KH\oplus KQ.`}</Latex>
          <p>{text("Так как M₂(K) — простая алгебра, двусторонних идеалов над полем ровно четыре:", "Because M₂(K) is simple, there are exactly four two-sided ideals over a field:")}</p>
          <Latex display>{String.raw`0,\qquad KH,\qquad \mathcal I_0,\qquad
\operatorname{SM}_3(K).`}</Latex>
          <p>
            {text(
              "Абстрактное блочное разложение требует только обратимости 3. Однако используемые на сайте координаты M,C,S и обычная кватернионная запись с антикоммутацией рассматриваются здесь при char K≠2,3.",
              "The abstract block decomposition only requires 3 to be invertible. The M,C,S coordinates used on this site and the usual anticommuting quaternion presentation are treated here under char K≠2,3.",
            )}
          </p>
          <p>
            {text(
              "Над ℚ и ℝ все приведённые формулы дают буквальный изоморфизм. Над ℤ матрицы H и Q содержат знаменатель 3 и не принадлежат целочисленной полумагической решётке. Поэтому целочисленная алгебра является решёткой внутри ℚ⊕M₂(ℚ), но не распадается тем же способом как прямое произведение ℤ-алгебр. Это различие будет предметом отдельной статьи.",
              "Over ℚ and ℝ all displayed formulas give a literal isomorphism. Over ℤ the matrices H and Q contain the denominator 3 and do not belong to the integral semimagic lattice. The integral algebra is therefore a lattice inside ℚ⊕M₂(ℚ), but it does not split in the same way as a direct product of ℤ-algebras. This distinction belongs to a separate article.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink
              className="button button-ghost"
              to="/theory/matrix-algebra/magic-charming-semimagic"
            >
              ← {text("Магические и чарующие компоненты", "Magic and charming components")}
            </TheoryLink>
            <TheoryLink className="button button-primary" to="/theory">
              {text("К оглавлению циклов", "Back to the series contents")} <span>→</span>
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function TfmnContainerFormsTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page tfmn-container-forms-theory-page">
      <TheoryLink className="back-link" to="/theory#elliptic-tfmn">
        ← {text("К циклу об эллиптической геометрии tfmn", "Back to the elliptic geometry of tfmn")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Эллиптическая геометрия tfmn · 4.3", "Elliptic geometry of tfmn · 4.3")}
          </p>
          <h1>
            {text(
              "Целочисленные tfmn-формы: контейнеры, Куммер и групповой закон",
              "Integral tfmn Forms: Containers, Kummer Coordinates, and the Group Law",
            )}
          </h1>
          <p>
            {text(
              "Четыре множителя n, m−n, m и m+n образуют не случайную факторизацию, а целочисленный подъём куммеровых координат точки на кривой конгруэнтного числа. Форма сохраняет линейные связи, точные квадратные множители и арифметику представителей, которые исчезают после нормализации квадратных классов.",
              "The four factors n, m−n, m, and m+n are not an accidental factorization: together they form an integral lift of the Kummer coordinates of a point on a congruent-number curve. The form retains linear relations, exact square factors, and representative arithmetic that disappear after square-class normalization.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document tfmn-container-forms-theory-document">
        <section>
          <h2>{text("1. От функции к форме", "1. From the function to the form")}</h2>
          <p>{text("Для рациональных m,n положим", "For rational m,n put")}</p>
          <Latex display>{String.raw`
f(m,n)=mn(m-n)(m+n).`}</Latex>
          <div className="theorem-block">
            <h3>{text("Определение", "Definition")}</h3>
            <p>{text("Упорядоченный кортеж четырёх линейных множителей", "The ordered tuple of the four linear factors")}</p>
            <Latex display>{String.raw`
\Phi(m,n)=(n;\,m-n,m,m+n)`}</Latex>
            <p>
              {text(
                "назовём tfmn-формой пары (m,n), а каждый её член — контейнером. Точка с запятой отделяет первый контейнер от трёх последовательных контейнеров; алгебраически все четыре равноправны.",
                "will be called the tfmn form of the pair (m,n), and each entry will be called a container. The semicolon separates the first container from the three consecutive containers; algebraically all four are on equal footing.",
              )}
            </p>
          </div>
          <Latex display>{String.raw`
\prod\Phi(m,n)=n(m-n)m(m+n)=f(m,n).`}</Latex>
          <p>
            {text(
              "Одновременное масштабирование пары умножает каждый контейнер на один множитель, а произведение — на четвёртую степень:",
              "Simultaneously scaling the pair multiplies every container by one factor and their product by a fourth power:",
            )}
          </p>
          <Latex display>{String.raw`
\Phi(\lambda m,\lambda n)=\lambda\Phi(m,n),
\qquad f(\lambda m,\lambda n)=\lambda^4f(m,n).`}</Latex>
          <p>
            {text(
              "Поэтому квадратный класс f зависит только от проективной пары [m:n]. На карте n≠0 положим r=m/n. Деление формы на первый контейнер даёт рациональную нормализацию",
              "Hence the square class of f depends only on the projective pair [m:n]. On the chart n≠0 put r=m/n. Dividing the form by its first container gives the rational normalization",
            )}
          </p>
          <Latex display>{String.raw`
\Phi_{\mathrm{rat}}(r)=(1;\,r-1,r,r+1).`}</Latex>
          <p>
            {text(
              "В целочисленном контексте выбирается примитивный представитель gcd(m,n)=1. В положительной камере берётся m>n>0; для примитивных прогрессий квадратов дополнительно используется обычное условие разной чётности m и n. Эти соглашения делают запись канонической в выбранной камере, но не являются частью рационального определения формы.",
              "In the integral setting one chooses a primitive representative with gcd(m,n)=1. In the positive chamber one takes m>n>0; primitive progressions of squares additionally use the usual opposite-parity condition on m and n. These conventions make the notation canonical in the chosen chamber, but they are not part of the rational definition of the form.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Гармонический репер ранга два", "2. A harmonic rank-two frame")}</h2>
          <p>
            {text(
              "Пусть V=ℚ² и v=(m,n). Контейнеры являются значениями четырёх фиксированных линейных функционалов:",
              "Let V=ℚ² and v=(m,n). The containers are the values of four fixed linear functionals:",
            )}
          </p>
          <Latex display>{String.raw`
\ell_0(v)=n,\qquad
\ell_-(v)=m-n,\qquad
\ell_c(v)=m,\qquad
\ell_+(v)=m+n.`}</Latex>
          <p>
            {text(
              "Это не базис V*: функционалов четыре, а размерность равна двум. Правильный линейный объект — избыточный репер ранга два. Любые два различных функционала образуют базис, тогда как вся четвёрка удовлетворяет соотношениям",
              "This is not a basis of V*: there are four functionals in dimension two. The correct linear object is a redundant rank-two frame. Any two distinct functionals form a basis, while all four satisfy the relations",
            )}
          </p>
          <Latex display>{String.raw`
\ell_c=\ell_-+\ell_0,\qquad
\ell_+=\ell_c+\ell_0,\qquad
\ell_-+\ell_+=2\ell_c.`}</Latex>
          <div className="theorem-block">
            <h3>{text("Гармоничность", "Harmonicity")}</h3>
            <p>
              {text(
                "Направления [0:1], [1:−1], [1:0], [1:1] в проективной прямой V* имеют двойное отношение −1 при порядке (ℓ−,ℓ+;ℓc,ℓ0). Значит, форма является значением фиксированной гармонической четвёрки функционалов на одном векторе v.",
                "The directions [0:1], [1:−1], [1:0], [1:1] in the projective line of V* have cross-ratio −1 in the ordering (ℓ−,ℓ+;ℓc,ℓ0). Thus the form is obtained by evaluating a fixed harmonic quadruple of functionals on one vector v.",
              )}
            </p>
          </div>
          <p>
            {text(
              "Форма действительно похожа на систему координат, но не является векторным базисом: её четыре координаты избыточны уже до перехода к квадратным классам.",
              "The form genuinely resembles a coordinate system, but it is not a vector basis: its four coordinates are redundant even before square classes are taken.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Эллиптическая точка и квадратная составляющая", "3. The elliptic point and the square constituent")}</h2>
          <p>{text("Пусть T≠0 квадратсвободно и", "Let T≠0 be squarefree and suppose")}</p>
          <Latex display>{String.raw`
f(m,n)=Tq^2.`}</Latex>
          <p>{text("Тогда форме соответствует точка на кривой", "Then the form corresponds to a point on the curve")}</p>
          <Latex display>{String.raw`
E_T:\quad Y^2=X^3-T^2X=X(X-T)(X+T)`}</Latex>
          <p>{text("по формулам", "through the formulas")}</p>
          <Latex display>{String.raw`
[m:n]\longmapsto
P=\left(\frac{Tm}{n},\,\pm\frac{T^2q}{n^2}\right),
\qquad
(X,\pm Y)\longmapsto[X:T].`}</Latex>
          <Latex display>{String.raw`
X^3-T^2X
=\frac{T^3}{n^4}f(m,n)
=\frac{T^4q^2}{n^4}
=Y^2.`}</Latex>
          <p>{text("В нормированных координатах", "In normalized coordinates")}</p>
          <Latex display>{String.raw`
r=\frac XT=\frac mn,
\qquad
w=\frac{Y}{T^2}=\pm\frac q{n^2},
\qquad
T w^2=r(r-1)(r+1).`}</Latex>
          <div className="theorem-block">
            <h3>{text("Почему q не следует отбрасывать", "Why q should not be discarded")}</h3>
            <p>
              {text(
                "Целое q зависит от масштаба: при (m,n)↦(λm,λn) оно заменяется на ±λ²q. Но w=q/n² масштабно инвариантно и является вертикальной координатой точки. Оно различает P и −P и участвует в точных формулах сложения.",
                "The integer q depends on scale: under (m,n)↦(λm,λn), it becomes ±λ²q. But w=q/n² is scale invariant and is the vertical coordinate of the point. It distinguishes P from −P and enters the exact addition formulas.",
              )}
            </p>
          </div>
          <p>
            {text(
              "Рациональная форма без знака q определяет пару точек ±P и естественно живёт на факторе E_T/{±1}. Форма вместе с w поднимается на саму эллиптическую кривую.",
              "A rational form without the sign of q determines the pair ±P and naturally lives on the quotient E_T/{±1}. A form together with w lifts to the elliptic curve itself.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Квадратные классы и куммерова тень", "4. Square classes and the Kummer shadow")}</h2>
          <p>
            {text(
              "Обозначим через K группу ненулевых рациональных квадратных классов и будем записывать её аддитивно как пространство над 𝔽₂:",
              "Let K be the group of nonzero rational square classes, written additively as a vector space over 𝔽₂:",
            )}
          </p>
          <Latex display>{String.raw`
K=\mathbb Q^\times/(\mathbb Q^\times)^2,
\qquad
\overline u+\overline v=\overline{uv}.`}</Latex>
          <p>
            {text(
              "Для точки P=(X,Y), не лежащей на рациональном 2-кручении, полное отображение 2-спуска имеет вид",
              "For a point P=(X,Y) away from rational 2-torsion, the full 2-descent map is",
            )}
          </p>
          <Latex display>{String.raw`
\kappa(P)=
(\overline{X-T},\overline X,\overline{X+T})\in K^3.`}</Latex>
          <p>
            {text(
              "Произведение трёх компонент равно классу Y² и потому тривиально. Функции X−e для e∈{−T,0,T} имеют дивизоры 2(e,0)−2(𝒪), поэтому κ является стандартным куммеровым отображением и факторизуется через E_T(ℚ)/2E_T(ℚ).",
              "The product of the three components is the class of Y² and is therefore trivial. For e∈{−T,0,T}, the functions X−e have divisors 2(e,0)−2(𝒪), so κ is the standard Kummer map and factors through E_T(ℚ)/2E_T(ℚ).",
            )}
          </p>
          <p>{text("Квадратноклассовая сигнатура нормированной формы равна", "The square-class signature of the normalized form is")}</p>
          <Latex display>{String.raw`
\sigma(P)=
(\overline{r-1},\overline r,\overline{r+1}).`}</Latex>
          <p>
            {text(
              "Поскольку X=Tr, все три координаты отличаются от куммеровых одним и тем же классом T. Если",
              "Because X=Tr, all three coordinates differ from the Kummer coordinates by the same class T. If",
            )}
          </p>
          <Latex display>{String.raw`
\tau=(\overline T,\overline T,\overline T),`}</Latex>
          <p>{text("то", "then")}</p>
          <Latex display>{String.raw`
\sigma(P)=\tau+\kappa(P).`}</Latex>
          <div className="theorem-block">
            <h3>{text("Аффинный закон", "The affine law")}</h3>
            <Latex display>{String.raw`
\sigma(P+Q)=\sigma(P)+\sigma(Q)+\tau.`}</Latex>
            <p>
              {text(
                "После сдвига начала координат σ̂(P)=σ(P)+τ=κ(P) получается обычный гомоморфизм. Значит, квадратноклассовая форма является не линейным вектором с естественным нулём, а точкой аффинного пространства над образом 2-спуска.",
                "After translating the origin by σ̂(P)=σ(P)+τ=κ(P), one obtains an ordinary homomorphism. Thus the square-class form is not a linear vector with a natural zero, but a point of an affine space over the image of 2-descent.",
              )}
            </p>
          </div>
          <p>
            {text(
              "Для любого невырожденного кратного [k]P сигнатура зависит только от чётности k:",
              "For every nondegenerate multiple [k]P the signature depends only on the parity of k:",
            )}
          </p>
          <Latex display>{String.raw`
\sigma([k]P)=
\begin{cases}
\sigma(P),&k\ \text{odd},\\
\tau,&k\ \text{even}.
\end{cases}`}</Latex>
        </section>

        <section>
          <h2>{text("5. Точная квадратная поправка при сложении", "5. The exact square correction under addition")}</h2>
          <p>
            {text(
              "Куммеров закон сообщает только квадратные классы. Точная форма восстанавливает и квадратные множители. Пусть Pᵢ=(rᵢ,wᵢ) лежат на Tw²=r(r²−1), r₁≠r₂, и P₃=P₁+P₂. Положим",
              "The Kummer law records only square classes. The exact form also recovers the square factors. Let Pᵢ=(rᵢ,wᵢ) lie on Tw²=r(r²−1), assume r₁≠r₂, and let P₃=P₁+P₂. Put",
            )}
          </p>
          <Latex display>{String.raw`
\mu=\frac{w_2-w_1}{r_2-r_1},
\qquad
r_3=T\mu^2-r_1-r_2,
\qquad
w_3=\mu(r_1-r_3)-w_1.`}</Latex>
          <p>
            {text(
              "Для каждого корня a∈{−1,0,1} определим значение секущей над этим корнем:",
              "For each root a∈{−1,0,1}, define the value of the secant above that root:",
            )}
          </p>
          <Latex display>{String.raw`
h_a=
\frac{w_1(r_2-a)-w_2(r_1-a)}{r_2-r_1}.`}</Latex>
          <div className="theorem-block">
            <h3>{text("Поконтейнерное тождество", "Containerwise identity")}</h3>
            <Latex display>{String.raw`
(r_1-a)(r_2-a)(r_3-a)=T h_a^2,
\qquad a\in\{-1,0,1\}.`}</Latex>
          </div>
          <h3>{text("Вывод", "Derivation")}</h3>
          <p>
            {text(
              "Пусть L(r) — прямая через P₁ и P₂. Её третий общий x-параметр с кубикой равен r₃: отражение третьей точки относительно горизонтальной оси даёт P₁+P₂. Сравнение старших коэффициентов даёт",
              "Let L(r) be the line through P₁ and P₂. Its third common x-parameter with the cubic is r₃: reflecting the third intersection across the horizontal axis gives P₁+P₂. Comparing leading coefficients gives",
            )}
          </p>
          <Latex display>{String.raw`
T L(r)^2-r(r^2-1)
=-(r-r_1)(r-r_2)(r-r_3).`}</Latex>
          <p>
            {text(
              "При r=a кубический член обращается в нуль, а L(a)=hₐ. Подстановка сразу доказывает тождество. После перехода к квадратным классам множители hₐ² исчезают и остаётся аффинный закон предыдущего раздела.",
              "At r=a the cubic term vanishes, and L(a)=hₐ. Substitution immediately proves the identity. Passing to square classes removes the factors hₐ² and leaves the affine law of the previous section.",
            )}
          </p>
          <p>
            {text(
              "Отсюда видно происхождение квадратной составляющей результата: она собирается из значений секущей над тремя точками рационального 2-кручения. Сигнатура видит только их классы; точная форма видит сами рациональные квадраты.",
              "This reveals the origin of the square constituent of the result: it is assembled from the values of the secant above the three rational 2-torsion points. The signature sees only their classes; the exact form sees the rational squares themselves.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Удвоение и утроение", "6. Doubling and tripling")}</h2>
          <h3>{text("Удвоение", "Doubling")}</h3>
          <p>{text("Для точки, представленной парой [m:n], положим", "For the point represented by [m:n], put")}</p>
          <Latex display>{String.raw`
M_2=(m^2+n^2)^2,
\qquad
N_2=4f(m,n).`}</Latex>
          <p>
            {text(
              "Тогда [M₂:N₂] представляет [2]P, а три последовательных контейнера факторизуются в точные квадраты:",
              "Then [M₂:N₂] represents [2]P, and the three consecutive containers factor as exact squares:",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
M_2-N_2&=(m^2-2mn-n^2)^2,\\
M_2&=(m^2+n^2)^2,\\
M_2+N_2&=(m^2+2mn-n^2)^2.
\end{aligned}`}</Latex>
          </div>
          <p>{text("Следовательно", "Consequently")}</p>
          <Latex display>{String.raw`
\Phi(M_2,N_2)=
\bigl(4f(m,n);\,D_-^2,D_0^2,D_+^2\bigr),`}</Latex>
          <Latex display>{String.raw`
D_-=m^2-2mn-n^2,
\quad D_0=m^2+n^2,
\quad D_+=m^2+2mn-n^2.`}</Latex>
          <p>
            {text(
              "Если f(m,n)=Tq², то квадратная составляющая этого однородного представителя равна, с точностью до знака,",
              "If f(m,n)=Tq², then the square constituent of this homogeneous representative is, up to sign,",
            )}
          </p>
          <Latex display>{String.raw`
q_{2P}^{\mathrm{hom}}=2qD_-D_0D_+.`}</Latex>

          <h3>{text("Утроение", "Tripling")}</h3>
          <p>{text("Определим четыре квартики", "Define four quartics")}</p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
A&=m^4+6m^2n^2-3n^4,\\
B&=3m^4-6m^2n^2-n^4,\\
C_-&=m^4-4m^3n-6m^2n^2-4mn^3+n^4,\\
C_+&=m^4+4m^3n-6m^2n^2+4mn^3+n^4.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Точке [3]P соответствует пара [mA²:nB²], причём вся форма факторизуется поконтейнерно:",
              "The point [3]P corresponds to the pair [mA²:nB²], and the entire form factors containerwise:",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\Phi(mA^2,nB^2)=
\bigl(nB^2;\,(m-n)C_-^2,\,mA^2,\,(m+n)C_+^2\bigr).`}</Latex>
          </div>
          <p>
            {text(
              "Утроение сохраняет квадратный класс каждого исходного контейнера отдельно, а квадратная составляющая равна",
              "Tripling preserves the square class of each source container separately, and the square constituent is",
            )}
          </p>
          <Latex display>{String.raw`
q_{3P}^{\mathrm{hom}}=qABC_-C_+.`}</Latex>
          <div className="theorem-block">
            <h3>{text("Примитивное сокращение", "Primitive reduction")}</h3>
            <p>
              {text(
                "Формулы относятся к указанным однородным представителям. Если оба параметра результата делятся на общий множитель d и пара сокращается, то f делится на d⁴, а точная рациональная квадратная составляющая — на d². Поэтому последовательность примитивных q содержит дополнительную арифметику НОД и не обязана буквально быть стандартной эллиптической последовательностью делимости.",
                "The formulas refer to the displayed homogeneous representatives. If both output parameters have a common factor d and the pair is reduced, then f is divided by d⁴ and the exact rational square constituent by d². Thus the sequence of primitive q-values contains additional gcd arithmetic and need not literally be a standard elliptic divisibility sequence.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Что уже содержится в 2-спуске и матрице Монски", "7. What is already contained in 2-descent and the Monsky matrix")}</h2>
          <p>
            {text(
              "Тройка нормированных квадратных классов не является новой заменой 2-спуска. Это те же куммеровы данные функций X−T, X и X+T, записанные в координате r=X/T и сдвинутые общим классом T. Для кривых конгруэнтного числа локальные условия на такие классы давно переводятся в линейную алгебру над 𝔽₂.",
              "The triple of normalized square classes is not a new replacement for 2-descent. It is the same Kummer data carried by X−T, X, and X+T, written in the coordinate r=X/T and translated by the common class T. For congruent-number curves, local conditions on these classes have long been converted into linear algebra over 𝔽₂.",
            )}
          </p>
          <p>
            {text(
              "Матрица Монски кодирует локальную разрешимость кандидатов 2-Сельмера в простых, делящих 2T. Её ядро описывает допустимые локальные квадратноклассовые тени, а не обязательно рациональные точки: разрыв между группой Сельмера и образом E_T(ℚ)/2E_T(ℚ) измеряется 2-кручением группы Шафаревича—Тейта. Для нечётного и чётного T используются разные блочные формулы матрицы.",
              "The Monsky matrix encodes local solubility of 2-Selmer candidates at the primes dividing 2T. Its kernel describes locally admissible square-class shadows, not necessarily rational points: the gap between the Selmer group and the image of E_T(ℚ)/2E_T(ℚ) is measured by the 2-torsion of the Tate–Shafarevich group. Odd and even T use different block formulas for the matrix.",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Уровень", "Level")}</th>
                  <th>{text("Что сохраняется", "What is retained")}</th>
                  <th>{text("Для чего удобен", "Best use")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{text("Целочисленная форма", "Integral form")}</td>
                  <td>{text("Четыре представителя, линейные связи, чётность, делимость и точное q.", "Four representatives, linear relations, parity, divisibility, and exact q.")}</td>
                  <td>{text("Явные формулы, примитивизация и связь с прогрессиями квадратов.", "Explicit formulas, primitive reduction, and the connection with progressions of squares.")}</td>
                </tr>
                <tr>
                  <td>{text("Куммерова сигнатура", "Kummer signature")}</td>
                  <td>{text("Три квадратных класса и класс точки по модулю 2E_T(ℚ).", "Three square classes and the point class modulo 2E_T(ℚ).")}</td>
                  <td>{text("Групповой закон, чётность кратных и полный 2-спуск.", "The group law, parity of multiples, and full 2-descent.")}</td>
                </tr>
                <tr>
                  <td>{text("Матрица Монски", "Monsky matrix")}</td>
                  <td>{text("Локальные ограничения на два независимых квадратноклассовых параметра.", "Local restrictions on two independent square-class parameters.")}</td>
                  <td>{text("Расчёт чистой 2-группы Сельмера и верхней границы ранга.", "Computation of the pure 2-Selmer group and an upper bound for the rank.")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Вклад языка форм состоит не в новом изобретении куммеровых классов, а в их ненормализованном четырёхконтейнерном подъёме и в точных формулах квадратных поправок. Для текущей задачи этот подъём удобнее как главный объект; 2-спуск и матрица Монски остаются его естественным линейным рентгеном.",
              "The contribution of the language of forms is not a reinvention of Kummer classes, but their unnormalized four-container lift together with exact square-correction formulas. For the present problem this lift is the more useful primary object; 2-descent and the Monsky matrix remain its natural linear X-ray.",
            )}
          </p>

          <h3>{text("Литературный контекст", "Literature context")}</h3>
          <ul className="proof-references">
            <li>
              D. R. Heath-Brown, with an appendix by P. Monsky,{" "}
              <a href="https://doi.org/10.1007/BF01231536" rel="noreferrer" target="_blank">
                The Size of Selmer Groups for the Congruent Number Problem, II
              </a>
              {text(
                " — матричное описание 2-Сельмера для кривых конгруэнтного числа.",
                " — the matrix description of 2-Selmer groups for congruent-number curves.",
              )}
            </li>
            <li>
              Mark Watkins, Stephen Donnelly, Noam D. Elkies, Tom Fisher, Andrew Granville, and Nicholas F. Rogers,{" "}
              <a href="https://www.numdam.org/item/10.5802/pmb.9.pdf" rel="noreferrer" target="_blank">
                Ranks of Quadratic Twists of Elliptic Curves
              </a>
              {text(
                " — расщеплённая форма uv(u−v)(u+v), условия примитивности и практическое применение матриц Монски.",
                " — the split form uv(u−v)(u+v), primitive conventions, and practical use of Monsky matrices.",
              )}
            </li>
            <li>
              Tom Fisher, Edward F. Schaefer, and Michael Stoll,{" "}
              <a href="https://arxiv.org/abs/1509.03234" rel="noreferrer" target="_blank">
                Higher Descents on an Elliptic Curve with a Rational 2-Torsion Point
              </a>
              {text(
                " — последующие уровни спуска после квадратноклассового слоя.",
                " — higher descent layers beyond square-class data.",
              )}
            </li>
            <li>
              Katherine E. Stange,{" "}
              <a href="https://arxiv.org/abs/0710.1316" rel="noreferrer" target="_blank">
                Elliptic Nets and Elliptic Curves
              </a>
              {text(
                " — общий контекст многочленов деления и точных рекуррентных множителей.",
                " — the general setting of division polynomials and exact recurrence factors.",
              )}
            </li>
          </ul>
        </section>

        <section>
          <h2>{text("8. Пример T=210 и точная граница", "8. The T=210 example and exact scope")}</h2>
          <p>
            {text(
              "Две примитивные пары дают одно и то же значение f без дополнительного квадрата:",
              "Two primitive pairs give the same value of f without an additional square factor:",
            )}
          </p>
          <Latex display>{String.raw`
\Phi(5,2)=(2;3,5,7),
\qquad
\Phi(6,1)=(1;5,6,7),
\qquad
f=210.`}</Latex>
          <p>{text("При выборе положительных знаков q=1 им соответствуют точки", "Choosing the positive signs q=1 gives the points")}</p>
          <Latex display>{String.raw`
P=(525,11025),
\qquad
Q=(1260,44100)
\quad\text{on}\quad
E_{210}:Y^2=X^3-210^2X.`}</Latex>
          <p>
            {text(
              "Сложение и смена ориентации второй точки дают два разных результата:",
              "Addition and reversal of the second point give two different outputs:",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
P+Q&=(240,1800)
&&\longleftrightarrow [8:7],
&f(8,7)&=210\cdot2^2,\\
P-Q&=(3840,237600)
&&\longleftrightarrow [128:7],
&f(128,7)&=210\cdot264^2.
\end{aligned}`}</Latex>
          </div>
          <p>{text("Их целочисленные формы различны:", "Their integral forms are different:")}</p>
          <Latex display>{String.raw`
\Phi(8,7)=(7;1,8,15),
\qquad
\Phi(128,7)=(7;121,128,135).`}</Latex>
          <p>
            {text(
              "Но поконтейнерное взятие квадратных классов даёт в обоих случаях",
              "Yet taking containerwise square classes gives in both cases",
            )}
          </p>
          <Latex display>{String.raw`
(\overline{7};\overline{1},\overline{2},\overline{15}),
\qquad
\sigma=(\overline{7},\overline{14},\overline{105}).`}</Latex>
          <p>
            {text(
              "Куммерова тень совпадает, тогда как точные квадратные составляющие 2 и 264 различают результаты. Двузначность неизбежна: проективная пара [m:n] помнит x-координату, но забывает, была ли исходная точка P или −P.",
              "The Kummer shadow is the same, while the exact square constituents 2 and 264 distinguish the outputs. The two-valued behavior is unavoidable: the projective pair [m:n] remembers the x-coordinate but forgets whether the original point was P or −P.",
            )}
          </p>

          <div className="theorem-block">
            <h3>{text("Граница утверждений", "Scope of the statements")}</h3>
            <ul>
              <li>{text("Все квадратноклассовые формулы сформулированы на невырожденном локусе r(r−1)(r+1)≠0.", "All square-class formulas are stated on the nondegenerate locus r(r−1)(r+1)≠0.")}</li>
              <li>{text("Нейтральная точка и точки (0,0), (±T,0) требуют специальных соглашений 2-спуска и имеют здесь статус not_assessed.", "The identity and the points (0,0), (±T,0) require the special conventions of 2-descent and have status not_assessed here.")}</li>
              <li>{text("Формулы сложения с hₐ относятся к секущей r₁≠r₂; касательная разобрана отдельно точной формулой удвоения.", "The addition formulas with hₐ refer to a secant with r₁≠r₂; the tangent case is handled separately by the exact doubling formula.")}</li>
              <li>{text("Совпадение сигнатур не означает равенства форм или точек; оно означает равенство соответствующих классов по модулю 2E_T(ℚ).", "Equality of signatures does not mean equality of forms or points; it means equality of the corresponding classes modulo 2E_T(ℚ).")}</li>
            </ul>
          </div>
          <p>
            {text(
              "Итак, целочисленная tfmn-форма является главным арифметическим объектом, её нормированная сигнатура — аффинной куммеровой тенью, а квадратная составляющая — вертикальной координатой, возвращающей точные данные группового закона.",
              "In summary, the integral tfmn form is the primary arithmetic object, its normalized signature is an affine Kummer shadow, and the square constituent is the vertical coordinate that restores the exact data of the group law.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/f4-plus">
              {text("Далее: эллиптическая поверхность F4+", "Next: the F4+ elliptic surface")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/f7-plus">
              {text("Предыдущая глава: биекция F7+", "Previous chapter: the F7+ bijection")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/fmn-tfmn">
              {text("К исходной арифметике fmn и tfmn", "Back to the arithmetic of fmn and tfmn")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory">
              {text("К оглавлению теории", "Theory contents")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

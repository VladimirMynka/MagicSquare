import { ExactMagicSquareExample } from "./components/ExactMagicSquareExample";
import { Latex } from "./components/Latex";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function AbcghjSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abcghj-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.14",
              "Elliptic surfaces for 6/9 patterns · 5.14",
            )}
          </p>
          <h1>
            {text(
              "Маска ABCGHJ: K3-поверхность без красной прогрессии",
              "The ABCGHJ Pattern: A K3 Surface Without a Red Progression",
            )}
          </h1>
          <p>
            {text(
              "Две гауссовы нормы и одна норма вида x²+2y² задают гладкое пересечение трёх квадрик. Гауссова факторизация открывает на нём эллиптическую K3-поверхность 4I₄+4I₂, неторсионную секцию и явное бесконечное семейство квадратов.",
              "Two Gaussian norms and one norm of the form x²+2y² define a smooth intersection of three quadrics. Gaussian factorization reveals an elliptic 4I₄+4I₂ K3 surface, a non-torsion section, and an explicit infinite family of squares.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABCGHJ: жёлтые ACGJ и ABHJ; голубая ACHJ",
            "ABCGHJ: yellow ACGJ and ABHJ; blue ACHJ",
          )}
          first="ACGJ"
          firstKind="yellow"
          mask="ABCGHJ"
          second="ABHJ"
          secondKind="yellow"
          third="ACHJ"
          thirdKind="blue"
        />
      </header>

      <div className="proof-document topic-document abcghj-surface-theory-document">
        <section>
          <h2>{text("1. Точная жёлто-жёлто-голубая система", "1. The exact yellow-yellow-blue system")}</h2>
          <p>
            {text(
              "Пусть a,b,c,g,h,j — рациональные корни выбранных клеток. Для маски ABCGHJ необходимы и достаточны три условия",
              "Let a,b,c,g,h,j be rational square roots of the selected entries. The ABCGHJ pattern is characterized by the three conditions",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
a^2+j^2&=c^2+g^2,\\
a^2+j^2&=b^2+h^2,\\
a^2+2c^2&=2h^2+j^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Первые две строки — равенства гауссовых норм на ACGJ и ABHJ. Третья строка — голубая норма на ACHJ. Красной трёхчленной прогрессии в этой маске нет.",
              "The first two equations are equalities of Gaussian norms on ACGJ and ABHJ. The third is the blue norm on ACHJ. This pattern contains no red three-term progression.",
            )}
          </p>
          <p>{text("Весь магический квадрат восстанавливается по формулам", "The full magic square is recovered from")}</p>
          <Latex display>{String.raw`
E_0=\frac{a^2+j^2}{2},\qquad
x=\frac{a^2-j^2}{2},\qquad
y=\frac{c^2-g^2}{2},`}</Latex>
          <Latex display>{String.raw`
\begin{pmatrix}
E_0+x&E_0-x-y&E_0+y\\
E_0-x+y&E_0&E_0+x-y\\
E_0-y&E_0+x+y&E_0-x
\end{pmatrix}.`}</Latex>
        </section>

        <section>
          <h2>{text("2. Почему исходная поверхность уже является K3", "2. Why the original surface is already K3")}</h2>
          <p>
            {text(
              "После проективизации три квадрики задают полное пересечение степени (2,2,2) в ℙ⁵. Для проверки гладкости запишем коэффициенты квадратов a²,b²,c²,g²,h²,j² столбцами:",
              "After projectivization, the three quadrics form a complete intersection of degree (2,2,2) in ℙ⁵. To check smoothness, arrange the coefficients of a²,b²,c²,g²,h²,j² as columns:",
            )}
          </p>
          <Latex display>{String.raw`
M=
\begin{pmatrix}
1&0&-1&-1&0&1\\
1&-1&0&0&-1&1\\
1&0&2&0&-2&-1
\end{pmatrix}.`}</Latex>
          <div className="theorem-block">
            <h3>{text("Сертификат гладкости", "Smoothness certificate")}</h3>
            <p>
              {text(
                "Все 20 миноров 3×3 матрицы M ненулевые. Поэтому никакое нетривиальное решение трёх квадрик не может иметь меньше четырёх ненулевых координат, а столбцы якобиана на его носителе имеют ранг 3. Проективная поверхность гладка.",
                "All twenty 3×3 minors of M are nonzero. Hence no nontrivial solution of the three quadrics can have fewer than four nonzero coordinates, and the Jacobian columns on its support have rank 3. The projective surface is smooth.",
              )}
            </p>
          </div>
          <p>
            {text(
              "По формуле присоединения канонический класс гладкого пересечения трёх квадрик в ℙ⁵ тривиален. Тем самым исходная поверхность ABCGHJ — K3, а не только семейство кривых с K3-якобианом.",
              "By adjunction, a smooth intersection of three quadrics in ℙ⁵ has trivial canonical class. Thus the original ABCGHJ surface itself is K3, not merely a family of curves with a K3 Jacobian.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Гауссова карта", "3. The Gaussian chart")}</h2>
          <p>
            {text(
              "Введём три гауссовых множителя с рациональными параметрами",
              "Introduce three Gaussian factors with rational parameters",
            )}
          </p>
          <Latex display>{String.raw`
\alpha=1+ip,\qquad \beta=1+iq,\qquad \gamma=1+ir`}</Latex>
          <p>{text("и определим корни тремя произведениями", "and define the roots by three products")}</p>
          <Latex display>{String.raw`
a+ij=\alpha\beta\gamma,\qquad
c+ig=\alpha\beta\overline\gamma,\qquad
h+ib=\alpha\overline\beta\gamma.`}</Latex>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
a&=1-pq-pr-qr,& j&=p+q+r-pqr,\\
c&=1-pq+pr+qr,& g&=p+q-r+pqr,\\
h&=1+pq-pr+qr,& b&=p-q+r+pqr.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Все три комплексных числа имеют одну норму (1+p²)(1+q²)(1+r²), поэтому обе жёлтые квадрики выполняются тождественно. Голубая квадрика остаётся единственным условием:",
              "All three complex numbers have the same norm (1+p²)(1+q²)(1+r²), so both yellow quadrics hold identically. The blue quadric leaves one condition:",
            )}
          </p>
          <Latex display>{String.raw`
A(p,q)(r^2-1)+4B(p,q)r=0,`}</Latex>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
A(p,q)&=p^2+q^2+12pq-p^2q^2-1,\\
B(p,q)&=p^2q-pq^2+p-q.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Это квадратное уравнение по r. Поэтому на этой карте K3-поверхность является двойным накрытием плоскости (p,q):",
              "This is a quadratic equation in r. Hence, on this chart, the K3 surface is a double cover of the (p,q)-plane:",
            )}
          </p>
          <Latex display>{String.raw`
W^2=A(p,q)^2+4B(p,q)^2.`}</Latex>
          <p>
            {text(
              "Карта бирациональна на плотном открытом множестве: обратные параметры восстанавливаются непосредственно из корней:",
              "The chart is birational on a dense open subset: the inverse parameters are recovered directly from the roots:",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
r&=\frac{jc-ag}{a^2+j^2+ac+jg},&
q&=\frac{jh-ab}{a^2+j^2+ah+jb},\\
p&=\frac{j(1-qr)-a(q+r)}
{a(1-qr)+j(q+r)}.
\end{aligned}`}</Latex>
          </div>
        </section>

        <section>
          <h2>{text("4. Квартика рода 1 над ℚ(q)", "4. A genus-one quartic over ℚ(q)")}</h2>
          <p>
            {text(
              "Если считать q параметром основания, двойное накрытие становится квартикой по p:",
              "Taking q as the base parameter turns the double cover into a quartic in p:",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
W^2={}&(q^2+1)^2p^4+32q(1-q^2)p^3\\
&+2(q^4+66q^2+1)p^2\\
&+32q(q^2-1)p+(q^2+1)^2.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Точка (p,W)=(0,q²+1) задаёт рациональное начало. Поэтому общий гладкий слой — не просто кривая рода 1, а отмеченная эллиптическая кривая над ℚ(q).",
              "The point (p,W)=(0,q²+1) provides a rational origin. Thus the generic smooth fiber is not merely a genus-one curve but a pointed elliptic curve over ℚ(q).",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Расщеплённый якобиан", "5. The split Jacobian")}</h2>
          <p>
            {text(
              "Классические инварианты бинарной квартики равны",
              "The classical binary-quartic invariants are",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
I={}&16(q^8+228q^6+710q^4+228q^2+1),\\
J={}&128(q^4-24q^3+18q^2-24q+1)\\
&\quad\cdot(q^4+18q^2+1)\\
&\quad\cdot(q^4+24q^3+18q^2+24q+1).
\end{aligned}`}</Latex>
          </div>
          <p>{text("В короткой модели", "In the short model")}</p>
          <Latex display>{String.raw`
\mathsf Y^2=\mathsf X^3-27I(q)\mathsf X-27J(q)`}</Latex>
          <p>{text("кубика полностью раскладывается:", "the cubic splits completely:")}</p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
\mathsf Y^2={}&
\bigl(\mathsf X-24(q^4+18q^2+1)\bigr)\\
&\cdot\bigl(\mathsf X+12(q^4-24q^3+18q^2-24q+1)\bigr)\\
&\cdot\bigl(\mathsf X+12(q^4+24q^3+18q^2+24q+1)\bigr).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Следовательно, эллиптическая кривая имеет полное рациональное 2-кручение.",
              "Consequently, the elliptic curve has full rational 2-torsion.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Паспорт 4I₄+4I₂ и граница ранга", "6. The 4I₄+4I₂ passport and rank bound")}</h2>
          <p>
            {text(
              "С точностью до ненулевой константы дискриминант имеет вид",
              "Up to a nonzero constant, the discriminant is",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\Delta(q)\sim
q^2(q^2+1)^2(q^2-4q+1)^4(q^2+4q+1)^4.`}</Latex>
          </div>
          <p>
            {text(
              "Четыре корня q²±4q+1 дают четыре слоя I₄. Точки q=0 и q=±i дают три слоя I₂, а минимальная карта при q=∞ — четвёртый I₂. Сумма чисел Эйлера равна 4·4+4·2=24, как и должно быть для K3.",
              "The four roots of q²±4q+1 give four I₄ fibers. The points q=0 and q=±i give three I₂ fibers, and the minimal chart at q=∞ supplies the fourth I₂. The Euler-number sum is 4·4+4·2=24, as required for a K3 surface.",
            )}
          </p>
          <p>
            {text(
              "Тривиальная решётка расслоения имеет ранг 2+4·3+4·1=18. Так как число Пикара K3 не превосходит 20, формула Шиоды—Тейта даёт rank≤2.",
              "The trivial lattice of the fibration has rank 2+4·3+4·1=18. Since the Picard number of a K3 surface is at most 20, the Shioda–Tate formula gives rank≤2.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Неторсионная секция и бесконечное семейство", "7. A non-torsion section and an infinite family")}</h2>
          <p>
            {text(
              "Касательная парабола к отмеченной точке квартики даёт следующую рациональную секцию:",
              "A parabola tangent to the quartic at the marked point gives the rational section",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
p(q)&=\frac{-2q(q^2-2q-1)(q^2+2q-1)}
{(q-1)(q+1)(q^2+1)^2},\\
W(q)&=\frac{q^{12}-26q^{10}+207q^8-300q^6+207q^4-26q^2+1}
{(q-1)^2(q+1)^2(q^2+1)^3}.
\end{aligned}`}</Latex>
          </div>
          <p>{text("Она поднимается через квадратное уравнение по r:", "It lifts through the quadratic equation in r:")}</p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
r(q)=
\frac{(q-1)(q^6-13q^4-16q^3-13q^2+1)}
{(q+1)(q^6-13q^4+16q^3-13q^2+1)}.`}</Latex>
          </div>
          <div className="theorem-block">
            <h3>{text("Секция имеет бесконечный порядок", "The section has infinite order")}</h3>
            <p>
              {text(
                "При q=2 она переходит в точку (34,240) на минимальной кривой y²=x³+x²−9040x+324500. Хорошие редукции по модулям 7 и 17 имеют соответственно 8 и 24 точки, поэтому рациональное кручение имеет порядок, делящий 8. Но редукция выбранной точки по модулю 17 имеет порядок 3. Значит точка, а вместе с ней и общая секция, неторсионна.",
                "At q=2 it specializes to (34,240) on the minimal curve y²=x³+x²−9040x+324500. Good reductions modulo 7 and 17 have 8 and 24 points respectively, so rational torsion has order dividing 8. Yet the chosen point reduces to a point of order 3 modulo 17. Hence the point, and therefore the generic section, is non-torsion.",
              )}
            </p>
          </div>
          <Latex display>{String.raw`1\le \operatorname{rank}E(\overline{\mathbb Q}(q))\le2.`}</Latex>
          <p>
            {text(
              "Подставляя p(q), q и r(q) в гауссовы формулы раздела 3, получаем явное однопараметрическое семейство. Общий знаменатель можно взять равным",
              "Substituting p(q), q, and r(q) into the Gaussian formulas of Section 3 gives an explicit one-parameter family. A common denominator is",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
D(q)=(q-1)(q+1)^2(q^2+1)^2
\cdot(q^6-13q^4+16q^3-13q^2+1).`}</Latex>
          </div>
          <p>
            {text(
              "После умножения шести корней на D и удаления общего постоянного множителя получаются примитивные многочлены степени 14 в ℤ[q]. Все три исходные квадрики обращаются в нуль тождественно, а отношение a/j непостоянно. Поэтому семейство содержит бесконечно много проективно различных рациональных решений ABCGHJ.",
              "Multiplying the six roots by D and removing their common constant factor produces primitive degree-14 polynomials in ℤ[q]. All three original quadrics vanish identically, while a/j is nonconstant. Hence the family contains infinitely many projectively distinct rational ABCGHJ solutions.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Точный положительный пример", "8. An exact positive example")}</h2>
          <p>
            {text(
              "При q=−3 после удаления общего множителя корней получается следующий магический квадрат. Знаки корней не влияют на клетки.",
              "At q=−3, after removing the common factor of the roots, one obtains the following magic square. Root signs do not affect the entries.",
            )}
          </p>
          <ExactMagicSquareExample
            ariaLabel={text(
              "Точный квадрат ABCGHJ с факторизациями квадратных клеток",
              "An exact ABCGHJ square with factored square entries",
            )}
            roots={{
              A: "18325",
              B: "35063",
              C: "17209",
              G: "-30737",
              H: "3391",
              J: "-30085",
            }}
            values={[
              "335805625",
              "1229413969",
              "296149681",
              "580800481",
              "620456425",
              "660112369",
              "944763169",
              "11498881",
              "905107225",
            ]}
          />
          <p>
            {text(
              "Магическая сумма равна 1 861 369 275. Все девять клеток положительны и попарно различны; полными квадратами являются ровно A,B,C,G,H,J.",
              "The magic sum is 1,861,369,275. All nine entries are positive and pairwise distinct; exactly A,B,C,G,H,J are perfect squares.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("9. Точная граница результата", "9. Exact scope of the result")}</h2>
          <p>
            {text(
              "Гладкость доказана для всей проективной поверхности — полного пересечения трёх квадрик. Гауссова факторизация и двойное накрытие описывают плотную открытую часть; нули использованных знаменателей требуют соседних проективных карт.",
              "Smoothness is proved for the entire projective surface, the complete intersection of three quadrics. Gaussian factorization and the double cover describe a dense open subset; zeros of the denominators used above require adjacent projective charts.",
            )}
          </p>
          <p>
            {text(
              "Доказаны конфигурация 4I₄+4I₂, полное рациональное 2-кручение, существование неторсионной секции, граница 1≤rank≤2 и бесконечное явное семейство. Не утверждаются точный ранг, полнота этого семейства или положительность каждой рациональной специализации.",
              "The 4I₄+4I₂ configuration, full rational 2-torsion, existence of a non-torsion section, the bound 1≤rank≤2, and an explicit infinite family are proved. The exact rank, completeness of this family, and positivity of every rational specialization are not asserted.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/synthesis">
              {text("Итоги цикла: общая геометрия 6/9", "Series conclusion: the general geometry of 6/9")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcdgj">
              {text("Предыдущая поверхность: ABCDGJ", "Previous surface: ABCDGJ")}
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

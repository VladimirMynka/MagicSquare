import { Latex } from "./components/Latex";
import { ExactMagicSquareExample } from "./components/ExactMagicSquareExample";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { EllipticTermsNote, TheoryLink } from "./TheoryPages";

export function AbcdefSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abcdef-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.9",
              "Elliptic surfaces for 6/9 patterns · 5.9",
            )}
          </p>
          <h1>
            {text(
              "Маска ABCDEF: чётная квартика и двенадцать особых слоёв",
              "The ABCDEF Pattern: An Even Quartic and Twelve Singular Fibers",
            )}
          </h1>
          <p>
            {text(
              "Одна прогрессия квадратов, гауссова норма и норма x²+2y² сводятся к чётной квартике рода 1. Её якобиан — расщеплённая эллиптическая K3-поверхность с паспортом 12I₂; неторсионная секция порождает явное полиномиальное семейство квадратов ABCDEF.",
              "One progression of squares, a Gaussian norm, and an x²+2y² norm reduce to an even genus-one quartic. Its Jacobian is a split elliptic K3 surface with passport 12I₂; a non-torsion section generates an explicit polynomial family of ABCDEF squares.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABCDEF: красная DEF, жёлтая ACDE, голубая BCDE",
            "ABCDEF: red DEF, yellow ACDE, blue BCDE",
          )}
          first="DEF"
          firstKind="red"
          mask="ABCDEF"
          second="ACDE"
          secondKind="yellow"
          third="BCDE"
          thirdKind="blue"
        />
      </header>

      <div className="proof-document topic-document abcdef-surface-theory-document">
        <EllipticTermsNote />
        <section>
          <h2>{text("1. Точная система", "1. The exact system")}</h2>
          <p>
            {text(
              "Пусть a,b,c,d,e,f — рациональные корни выбранных клеток. Три независимых условия маски ABCDEF имеют вид",
              "Let a,b,c,d,e,f be rational square roots of the selected entries. The three independent conditions for the ABCDEF pattern are",
            )}
          </p>
          <Latex display>{String.raw`
\begin{cases}
d^2+f^2=2e^2,\\
a^2+d^2=c^2+e^2,\\
b^2+2c^2=d^2+2e^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Первая строка — красная прогрессия DEF; вторая — жёлтое равенство двух гауссовых норм; третья — голубое равенство норм типа x²+2y². Система достаточна для восстановления всего магического квадрата. Если",
              "The first equation is the red progression DEF; the second is the yellow equality of two Gaussian norms; the third is the blue equality of x²+2y² norms. The system is sufficient to reconstruct the entire magic square. If",
            )}
          </p>
          <Latex display>{String.raw`
E_0=e^2,\qquad x=a^2-E_0,\qquad y=E_0-c^2,`}</Latex>
          <p>
            {text(
              "то остальные клетки восстанавливаются общей формой",
              "then the remaining entries are recovered from the general form",
            )}
          </p>
          <Latex display>{String.raw`
\begin{pmatrix}
E_0+x&E_0-x+y&E_0-y\\
E_0-x-y&E_0&E_0+x+y\\
E_0+y&E_0+x-y&E_0-x
\end{pmatrix}.`}</Latex>
        </section>

        <section>
          <h2>{text("2. Сначала прогрессия DEF", "2. Start with the DEF progression")}</h2>
          <p>{text("Введём стандартные формы", "Introduce the standard forms")}</p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
L(t)=t^2-2t-1,\qquad
C(t)=t^2+1,\qquad
R(t)=t^2+2t-1.`}</Latex>
          </div>
          <p>
            {text(
              "Тождество L(t)²+R(t)²=2C(t)² параметризует первую строку. С точностью до общего масштаба положим",
              "The identity L(t)²+R(t)²=2C(t)² parametrizes the first equation. Up to a common scale, put",
            )}
          </p>
          <Latex display>{String.raw`
d=L(t),\qquad e=C(t),\qquad f=R(t).`}</Latex>
          <p>
            {text(
              "Разность, необходимая для жёлтого условия, также сразу факторизуется:",
              "The difference required by the yellow condition factors immediately as well:",
            )}
          </p>
          <Latex display>{String.raw`
K(t):=e^2-d^2=C(t)^2-L(t)^2=4t(t^2-1).`}</Latex>
          <p>
            {text(
              "Поэтому a²−c²=K(t). Вместо угадывания a и c разложим эту разность на два множителя:",
              "Thus a²−c²=K(t). Rather than guessing a and c, factor this difference into two factors:",
            )}
          </p>
          <Latex display>{String.raw`
u=a+c,\qquad
a-c=\frac{K(t)}u,`}</Latex>
          <div className="formula-scroll">
            <Latex display>{String.raw`
a=\frac12\left(u+\frac{K(t)}u\right),\qquad
c=\frac12\left(u-\frac{K(t)}u\right).`}</Latex>
          </div>
          <p>
            {text(
              "На этой аффинной карте красное и жёлтое условия уже выполнены тождественно. Остаётся только голубое.",
              "On this affine chart, the red and yellow conditions now hold identically. Only the blue condition remains.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Остаточная чётная квартика", "3. The residual even quartic")}</h2>
          <p>
            {text(
              "Чтобы не носить знаменатель u, положим B=2ub. Подстановка выражения для c в третье уравнение и умножение на 4u² дают",
              "To avoid carrying the denominator u, put B=2ub. Substituting the expression for c into the third equation and multiplying by 4u² gives",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\mathcal C_t:\quad
B^2=-2u^4+12C(t)^2u^2-2K(t)^2.`}</Latex>
          </div>
          <div className="theorem-block">
            <h3>{text("Точный обратный подъём", "Exact lift back")}</h3>
            <p>
              {text(
                "Любая рациональная точка (u,B) этой квартики с u≠0 возвращает решение исходной системы по формулам",
                "Every rational point (u,B) on this quartic with u≠0 returns a solution of the original system through",
              )}
            </p>
            <div className="formula-scroll">
              <Latex display>{String.raw`
\begin{aligned}
a&=\frac12\left(u+\frac Ku\right),&
b&=\frac{B}{2u},&
c&=\frac12\left(u-\frac Ku\right),\\
d&=L(t),&
e&=C(t),&
f&=R(t).
\end{aligned}`}</Latex>
            </div>
          </div>
          <p>
            {text(
              "Квартика имеет отмеченную рациональную точку",
              "The quartic has the marked rational point",
            )}
          </p>
          <Latex display>{String.raw`
u_0=2t(t-1),\qquad
B_0=4t(t-1)R(t).`}</Latex>
          <p>
            {text(
              "Она соответствует диагональному вырождению a=e, b=f, c=d. Поэтому гладкий общий слой является отмеченной кривой рода 1, а не неразрешённым торсором.",
              "It corresponds to the diagonal degeneration a=e, b=f, c=d. Hence the smooth generic fiber is a pointed genus-one curve, not an unresolved torsor.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Якобиан и полное 2-кручение", "4. The Jacobian and full 2-torsion")}</h2>
          <p>
            {text(
              "Для бинарной квартики вычислим классические инварианты",
              "For the binary quartic, compute the classical invariants",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
I&=48\bigl(K(t)^2+3C(t)^4\bigr),\\
J&=3456C(t)^2\bigl(K(t)^2-C(t)^4\bigr).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Короткая модель якобиана имеет вид",
              "The short Jacobian model is",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal E_t:\quad
Y^2=X^3-27I(t)X-27J(t).`}</Latex>
          <p>
            {text(
              "Её кубика раскладывается полностью и особенно прозрачно:",
              "Its cubic splits completely in a particularly transparent way:",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
Y^2=
\bigl(X-36R(t)^2\bigr)
\bigl(X-36L(t)^2\bigr)
\bigl(X+72C(t)^2\bigr).`}</Latex>
          </div>
          <p>
            {text(
              "Следовательно, все три ненулевые точки порядка 2 рациональны над ℚ(t). Полное расщепление объясняет симметрии знаков исходной квартики и делает особые слои доступными прямому вычислению.",
              "Thus all three nonzero points of order 2 are rational over ℚ(t). The complete splitting explains the sign symmetries of the original quartic and makes the singular fibers directly computable.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Паспорт K3-поверхности", "5. The K3 surface passport")}</h2>
          <p>
            {text(
              "С точностью до ненулевой константы дискриминант равен",
              "Up to a nonzero constant, the discriminant is",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
\Delta(t)\sim{}&
t^2(t-1)^2(t+1)^2
\cdot(t^2-2t+3)^2(t^2+2t+3)^2\\
&\cdot(3t^2-2t+1)^2(3t^2+2t+1)^2.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Одиннадцать конечных корней просты в приведённом основании дискриминанта, а c₄ на них не обращается в нуль: это одиннадцать слоёв I₂. После замены s=1/t и минимального масштабирования X=s⁻⁴Xₛ, Y=s⁻⁶Yₛ дискриминант имеет в s=0 порядок 2, тогда как c₄ остаётся ненулевым. Над бесконечностью находится ещё один слой I₂.",
              "The eleven finite roots are simple in the reduced discriminant support, while c₄ does not vanish there: these are eleven I₂ fibers. After setting s=1/t and applying the minimal rescaling X=s⁻⁴Xₛ, Y=s⁻⁶Yₛ, the discriminant has order 2 at s=0 while c₄ remains nonzero. There is one further I₂ fiber at infinity.",
            )}
          </p>
          <Latex display>{String.raw`\text{fiber configuration}=12I_2.`}</Latex>
          <p>
            {text(
              "Сумма чисел Эйлера равна 12·2=24, поэтому минимальная эллиптическая поверхность является K3.",
              "For the relatively minimal model with a section and no multiple fibers, the Euler numbers sum to 12·2=24; the canonical-bundle formula gives chi(O)=2, so the smooth minimal elliptic surface is K3.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Неторсионная секция и ранг", "6. A non-torsion section and the rank")}</h2>
          <p>
            {text(
              "Выберем отмеченную точку квартики за начало группового закона. Другой знаковый подъём того же диагонального квадрата переходит в сечение",
              "Choose the marked quartic point as the origin of the group law. Another sign lift of the same diagonal square maps to the section",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
P_X(t)&=-36L(t)^2,\\
P_Y(t)&=-432C(t)(t^4-6t^2+1).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Неторсионность доказывается точной специализацией. При t=2 получаем",
              "Non-torsion is proved by exact specialization. At t=2 one obtains",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\mathcal E_2:\quad
y^2=x^3-3176496x+114307200,\qquad
P_2=(-36,15120).`}</Latex>
          </div>
          <p>
            {text(
              "Хорошие редукции дают #E₂(𝔽₅)=8 и #E₂(𝔽₁₃)=16, поэтому порядок рационального кручения делит 8. Но редукция P₂ по модулю 19 имеет порядок 7. Для точки кручения это невозможно; следовательно, P и все его ненулевые кратные имеют бесконечный порядок.",
              "Good reductions give #E₂(𝔽₅)=8 and #E₂(𝔽₁₃)=16, so the rational torsion order divides 8. Yet the reduction of P₂ modulo 19 has order 7. This is impossible for a torsion point; therefore P and all its nonzero multiples have infinite order.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Доказанная граница ранга", "Proved rank bound")}</h3>
            <Latex display>{String.raw`
1\le\operatorname{rank}\mathcal E(\overline{\mathbb Q}(t))\le6.`}</Latex>
            <p>
              {text(
                "Нижняя граница дана секцией P. Конфигурация 12I₂ имеет корневой ранг 12; формула Шиоды—Тейта и неравенство ρ≤20 для комплексной K3 дают rank≤20−2−12=6. Точный геометрический ранг здесь не утверждается.",
                "The section P gives the lower bound. The configuration 12I₂ has root rank 12; Shioda–Tate and ρ≤20 for a complex K3 surface give rank≤20−2−12=6. The exact geometric rank is not claimed here.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Полиномиальное семейство из 2P", "7. A polynomial family from 2P")}</h2>
          <p>
            {text(
              "Само P кодирует вырожденный диагональный квадрат, но удвоение уже уходит с диагонали. Обратное бирациональное преобразование 2P и удаление общего знаменателя дают компактную запись через пять вспомогательных многочленов.",
              "The section P itself encodes a degenerate diagonal square, but doubling leaves the diagonal. Mapping 2P back birationally and clearing the common denominator gives a compact expression in five auxiliary polynomials.",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
H_1={}&t^8-4t^7+6t^6+8t^5+28t^4+12t^3-6t^2+3,\\
H_2={}&3t^8-6t^6-12t^5+28t^4-8t^3+6t^2+4t+1,\\
H={}&H_1H_2.
\end{aligned}`}</Latex>
          </div>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
A_0={}&t^{16}+44t^{14}-96t^{13}-92t^{12}+96t^{11}
+788t^{10}+192t^9\\
&-1226t^8-192t^7+788t^6-96t^5-92t^4+96t^3+44t^2+1,\\
B_0={}&5t^{16}-28t^{15}+52t^{14}-108t^{13}+100t^{12}-284t^{11}
+524t^{10}\\
&-204t^9-82t^8+204t^7+524t^6+284t^5+100t^4+108t^3+52t^2+28t+5,\\
C_0={}&t^{16}-16t^{15}-4t^{14}-48t^{13}+68t^{12}-176t^{11}
 -188t^{10}\\
&-144t^9+502t^8+144t^7-188t^6+176t^5+68t^4+48t^3-4t^2+16t+1.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Тогда корни шести квадратных клеток равны",
              "Then the square roots of the six selected entries are",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
a&=C(t)A_0(t),&
b&=R(t)B_0(t),&
c&=L(t)C_0(t),\\
d&=L(t)H(t),&
e&=C(t)H(t),&
f&=R(t)H(t).
\end{aligned}`}</Latex>
          </div>
          <div className="theorem-block">
            <h3>{text("Тождественная корректность", "Identity-level correctness")}</h3>
            <p>
              {text(
                "Подстановка этих шести многочленов обращает все три уравнения ABCDEF в нуль в ℤ[t]. Отношение a/e непостоянно, поэтому семейство содержит бесконечно много проективно различных решений вне конечного набора вырожденных специализаций. Кратные 4P,6P,… дают следующие рациональные семейства той же поверхности.",
                "Substituting these six polynomials makes all three ABCDEF equations vanish in ℤ[t]. The ratio a/e is nonconstant, so the family contains infinitely many projectively distinct solutions outside a finite set of degenerate specializations. The multiples 4P,6P,… give further rational families on the same surface.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("8. Точный положительный пример", "8. An exact positive example")}</h2>
          <p>
            {text(
              "При t=2 семейство даёт следующий магический квадрат. Знаки корней не влияют на значения клеток.",
              "At t=2 the family gives the following magic square. The signs of the roots do not affect the entries.",
            )}
          </p>
          <ExactMagicSquareExample
            ariaLabel={text(
              "Точный квадрат ABCDEF с факторизациями квадратных клеток",
              "An exact ABCDEF square with factored square entries",
            )}
            roots={{
              A: "2166965",
              B: "-2184133",
              C: "1123631",
              D: "-378219",
              E: "1891095",
              F: "2647533",
            }}
            values={[
              "4695737311225",
              "4770436961689",
              "1262546624161",
              "143049611961",
              "3576240299025",
              "7009430986089",
              "5889933973889",
              "2382043636361",
              "2456743286825",
            ]}
          />
          <p>
            {text(
              "Магическая сумма равна 10 728 720 897 075. Все девять клеток положительны и попарно различны; полными квадратами являются ровно A,B,C,D,E,F. Это точный невырожденный сертификат маски ABCDEF.",
              "The magic sum is 10,728,720,897,075. All nine entries are positive and pairwise distinct; exactly A,B,C,D,E,F are perfect squares. This is an exact nondegenerate certificate for the ABCDEF pattern.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("9. Граница результата", "9. Scope of the result")}</h2>
          <p>
            {text(
              "Получены явная эллиптическая поверхность, доказанная бесконечная подгруппа её сечений и полиномиальное семейство решений. Это существенно сильнее отдельного подобранного примера.",
              "The result provides an explicit elliptic surface, a proved infinite subgroup of its sections, and a polynomial family of solutions. This is substantially stronger than an isolated fitted example.",
            )}
          </p>
          <p>
            {text(
              "При этом не утверждается, что семейство из 2P перечисляет все рациональные решения ABCDEF, и точный геометрический ранг K3-поверхности пока не определён.",
              "It is not claimed that the family from 2P enumerates every rational ABCDEF solution, and the exact geometric rank of the K3 surface has not yet been determined.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abefgh">
              {text("Предыдущая поверхность: ABEFGH", "Previous surface: ABEFGH")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abefgj-abdfhj">
              {text("Следующая поверхность: ABEFGJ / ABDFHJ", "Next surface: ABEFGJ / ABDFHJ")}
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

import { Latex } from "./components/Latex";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function AbcdhjSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abcdhj-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.4",
              "Elliptic surfaces for 6/9 patterns · 5.4",
            )}
          </p>
          <h1>
            {text(
              "Маска ABCDHJ: две прогрессии с общей клеткой D",
              "The ABCDHJ Pattern: Two Progressions Sharing the Entry D",
            )}
          </h1>
          <p>
            {text(
              "Прогрессии BDJ и CDH пересекаются в крайней клетке D. Жёлтая связь ABHJ оставляет палиндромную квартику рода 1; её якобиан является расщеплённой эллиптической K3-поверхностью с явным неторсионным сечением.",
              "The BDJ and CDH progressions meet at the endpoint D. The yellow ABHJ relation leaves a palindromic genus-one quartic whose Jacobian is a split elliptic K3 surface with an explicit non-torsion section.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABCDHJ: красные BDJ, CDH; жёлтая ABHJ",
            "ABCDHJ: red BDJ, CDH; yellow ABHJ",
          )}
          first="BDJ"
          mask="ABCDHJ"
          second="CDH"
          third="ABHJ"
        />
      </header>

      <div className="proof-document topic-document abcdhj-surface-theory-document">
        <section>
          <h2>{text("1. Исходная система и восстановление квадрата", "1. The initial system and reconstruction")}</h2>
          <p>
            {text(
              "Пусть a,b,c,d,h,j — рациональные корни шести выбранных клеток. Общая форма магического квадрата даёт три независимых отношения:",
              "Let a,b,c,d,h,j be the rational square roots of the six selected entries. The general form of a magic square gives three independent relations:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{cases}
b^2+d^2=2j^2,\\
d^2+h^2=2c^2,\\
a^2+j^2=b^2+h^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Первые две строки — красные прогрессии BDJ и CDH с общей крайней клеткой D. Последняя строка — жёлтая квадрика ABHJ. Вместе эти условия достаточны для восстановления всего магического квадрата.",
              "The first two equations are the red progressions BDJ and CDH with the common endpoint D. The last equation is the yellow ABHJ quadric. Together these conditions suffice to reconstruct the complete magic square.",
            )}
          </p>
          <Latex display>{String.raw`
E_0=\frac{a^2+j^2}{2}=\frac{b^2+h^2}{2},
\qquad x=a^2-E_0,\qquad y=E_0-c^2.`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
D&=c^2+j^2-E_0=d^2,\\
B&=j^2+E_0-c^2=b^2,\\
H&=E_0-j^2+c^2=h^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Клетки A,J,C сразу равны a²,j²,c², а три выписанных упрощения следуют из исходной системы. Поэтому условия описывают именно маску ABCDHJ, а не только набор необходимых следствий.",
              "The entries A,J,C immediately become a²,j²,c², while the three displayed simplifications follow from the initial system. Thus the conditions describe the ABCDHJ pattern itself, not merely a collection of necessary consequences.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Склейка двух прогрессий в D", "2. Gluing the two progressions at D")}</h2>
          <p>{text("Используем стандартные многочлены", "Use the standard polynomials")}</p>
          <Latex display>{String.raw`
L(z)=z^2-2z-1,\qquad
C(z)=z^2+1,\qquad
R(z)=z^2+2z-1,`}</Latex>
          <Latex display>{String.raw`L(z)^2+R(z)^2=2C(z)^2.`}</Latex>
          <p>
            {text(
              "Общий корень d получается после перемножения правых крайних членов двух параметризаций:",
              "The common root d is obtained by multiplying the right endpoints of the two parametrizations:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
b&=L(p)R(q),& j&=C(p)R(q),\\
d&=R(p)R(q),\\
h&=L(q)R(p),& c&=C(q)R(p).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Обе красные строки теперь выполняются тождественно. Остаётся единственное условие: выражение b²+h²−j² должно быть квадратом a².",
              "Both red equations now hold identically. The only remaining condition is that b²+h²−j² be a square a².",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Палиндромная квартика и две коники", "3. The palindromic quartic and two conics")}</h2>
          <p>
            {text(
              "Обозначим искомый корень a через V и положим",
              "Write the required root a as V and put",
            )}
          </p>
          <Latex display>{String.raw`
K(p)=p^4+8p^3+2p^2-8p+1.`}</Latex>
          <p>{text("После раскрытия скобок получаем", "Expanding and collecting terms gives")}</p>
          <Latex display>{String.raw`
\begin{aligned}
V^2={}&C(p)^2q^4-4K(p)q^3+2C(p)^2q^2\\
&+4K(p)q+C(p)^2.
\end{aligned}`}</Latex>
          <div className="theorem-block">
            <h3>{text("Точный критерий внутри карты", "Exact criterion within the chart")}</h3>
            <p>
              {text(
                "Рациональные p,q,V задают решение ABCDHJ по формулам раздела 2 и равенству a=V тогда и только тогда, когда лежат на этой квартике. Полнота выбранной карты для всех рациональных решений исходной маски здесь не утверждается.",
                "Rational p,q,V give an ABCDHJ solution through the formulas of Section 2 and a=V exactly when they lie on this quartic. Completeness of the chosen chart for all rational solutions of the original pattern is not claimed.",
              )}
            </p>
          </div>
          <p>
            {text(
              "Палиндромность позволяет заменить q на z=q−1/q. После деления на q² исходная кривая становится расслоенным произведением двух коник:",
              "The palindromic form permits the substitution z=q−1/q. After division by q², the original curve becomes the fiber product of two conics:",
            )}
          </p>
          <Latex display>{String.raw`
\left(\frac Vq\right)^2=C(p)^2(z^2+4)-4K(p)z,
\qquad
\left(q+\frac1q\right)^2=z^2+4.`}</Latex>
          <p>
            {text(
              "Для общего p квартика гладка и имеет рациональные точки (0,C(p)) и (1,−2C(p)); следовательно, после выбора одной из них она является эллиптической кривой.",
              "For generic p the quartic is smooth and contains the rational points (0,C(p)) and (1,−2C(p)); choosing either point turns it into an elliptic curve.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Расщеплённый якобиан", "4. The split Jacobian")}</h2>
          <p>
            {text(
              "Инварианты бинарной квартики дают короткую модель якобиана",
              "The binary-quartic invariants give the short Jacobian model",
            )}
          </p>
          <Latex display>{String.raw`
Y^2=X^3-1728P(p)X+27648C(p)^2Q_1(p)Q_2(p),`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
P(p)={}&p^8+12p^7+52p^6+12p^5-90p^4\\
&-12p^3+52p^2-12p+1,\\
Q_1(p)={}&p^4+6p^3+2p^2-6p+1,\\
Q_2(p)={}&p^4+12p^3+2p^2-12p+1.
\end{aligned}`}</Latex>
          <p>{text("Кубический многочлен полностью раскладывается:", "The cubic polynomial splits completely:")}</p>
          <Latex display>{String.raw`
\begin{aligned}
X_0&=24C(p)^2,\\
X_1&=24Q_2(p),\\
X_2&=-48Q_1(p).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Следовательно, над ℚ(p) рационально всё 2-кручение. Разности трёх корней одновременно определяют дискриминант и конфигурацию особых слоёв.",
              "Thus full rational 2-torsion is visible over ℚ(p). The differences of the three roots simultaneously determine the discriminant and the singular-fiber configuration.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Как возникает неторсионное сечение", "5. How the non-torsion section arises")}</h2>
          <p>
            {text(
              "Сечение можно вывести из уже отмеченных точек, не угадывая его формулу. Пусть F(q) обозначает правую часть квартики и рассмотрим параболу",
              "The section can be derived from the marked points rather than guessed. Let F(q) denote the right-hand side of the quartic and consider the parabola",
            )}
          </p>
          <Latex display>{String.raw`
\Pi(q)=
\frac{C^2+2K}{C}q^2
-2\frac{2C^2+K}{C}q+C.`}</Latex>
          <p>
            {text(
              "Она проходит через (0,C) и касается ветви V=−2C при q=1. Точное разложение разности имеет вид",
              "It passes through (0,C) and is tangent to the branch V=−2C at q=1. The exact factorization of the difference is",
            )}
          </p>
          <Latex display>{String.raw`
C^2\bigl(F(q)-\Pi(q)^2\bigr)=
-4q(q-1)^2(Kq-2C^2)(C^2+K).`}</Latex>
          <p>
            {text(
              "Оставшееся пересечение даёт рациональную точку",
              "The remaining intersection gives the rational point",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
q(p)&=\frac{2C(p)^2}{K(p)},\\
V(p)&=\frac{C(p)B_0(p)}{K(p)^2},\\
B_0(p)&=4C(p)^4-3K(p)^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Эта точка задаёт сечение P якобиана. При хорошей специализации p=−2 оно переходит на минимальную кривую",
              "This point defines a section P of the Jacobian. Under the good specialization p=−2 it maps to the minimal curve",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
E_{-2}:\quad y^2&=x^3-x^2-737x+7905,\\
P_{-2}&=\left(\frac{329}{25},\frac{2208}{125}\right).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Правая часть равна (x−17)(x−15)(x+31), поэтому на кривой уже видны четыре рациональные точки 2-кручения. Точные подсчёты дают #E(𝔽₅)=4 и #E(𝔽₇)=12; следовательно, порядок всей рациональной группы кручения делит 4 и она совпадает с 2-кручением. У точки P₋₂ ненулевая y-координата, поэтому она имеет бесконечный порядок. Значит, исходное сечение P неторсионно над ℚ(p).",
              "The right-hand side is (x−17)(x−15)(x+31), so the curve already displays four rational 2-torsion points. Exact counts give #E(𝔽₅)=4 and #E(𝔽₇)=12; hence the full rational torsion order divides 4 and equals the 2-torsion subgroup. Since P₋₂ has nonzero y-coordinate, it has infinite order. Therefore the original section P is non-torsion over ℚ(p).",
            )}
          </p>
          <Latex display>{String.raw`
\langle P\rangle=\{\,nP:n\in\mathbb Z\,\}\cong\mathbb Z.`}</Latex>
          <p>
            {text(
              "Обратное бирациональное преобразование переводит кратные nP в новые рациональные секции исходной квартики и тем самым в бесконечную последовательность однопараметрических семейств ABCDHJ.",
              "The inverse birational transformation sends the multiples nP to new rational sections of the original quartic and hence to an infinite sequence of one-parameter ABCDHJ families.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Явное полиномиальное семейство", "6. An explicit polynomial family")}</h2>
          <p>
            {text(
              "Первое сечение уже даёт семейство без рациональных знаменателей. Положим",
              "The first section already gives a family without rational denominators. Put",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
N&=2C(p)^2,\\
U_R&=N^2+2NK-K^2,\\
U_L&=N^2-2NK-K^2,\\
U_C&=N^2+K^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "После умножения корней на общий знаменатель K(p)² получаем",
              "After multiplying the roots by the common denominator K(p)², one obtains",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
a&=C(p)B_0(p),& b&=L(p)U_R,\\
c&=R(p)U_C,& d&=R(p)U_R,\\
h&=R(p)U_L,& j&=C(p)U_R.
\end{aligned}`}</Latex>
          <div className="theorem-block">
            <h3>{text("Тождественная корректность", "Identity-level correctness")}</h3>
            <Latex display>{String.raw`
b^2+d^2=2j^2,\qquad
d^2+h^2=2c^2,\qquad
a^2+j^2=b^2+h^2.`}</Latex>
            <p>
              {text(
                "Все три равенства являются тождествами в ℤ[p]. Отношение b/d=L(p)/R(p) непостоянно, поэтому семейство содержит бесконечно много проективно различных рациональных решений. Конечное множество вырожденных специализаций следует исключить.",
                "All three equalities are identities in ℤ[p]. The ratio b/d=L(p)/R(p) is nonconstant, so the family contains infinitely many projectively distinct rational solutions. A finite set of degenerate specializations must be excluded.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Точный положительный пример", "7. An exact positive example")}</h2>
          <p>
            {text(
              "При p=−2 корни выбранных клеток, с опущенными знаками, равны",
              "At p=−2 the selected-entry roots, with signs omitted, are",
            )}
          </p>
          <Latex display>{String.raw`
(a,b,c,d,h,j)=
(4565,\ 2303,\ 3029,\ 329,\ 4271,\ 1645).`}</Latex>
          <p>
            {text(
              "Восстановленный магический квадрат имеет вид",
              "The reconstructed magic square is",
            )}
          </p>
          <Latex display>{String.raw`
\begin{pmatrix}
20839225&5303809&9174841\\
108241&11772625&23437009\\
14370409&18241441&2706025
\end{pmatrix}.`}</Latex>
          <p>
            {text(
              "Его магическая сумма равна 35 317 875. Ровно клетки A,B,C,D,H,J являются попарно различными полными квадратами; E,F,G положительны и квадратами не являются. Это точный сертификат одного невырожденного решения 6/9.",
              "Its magic sum is 35,317,875. Exactly the entries A,B,C,D,H,J are pairwise distinct perfect squares; E,F,G are positive nonsquares. This is an exact certificate for one nondegenerate 6/9 solution.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Паспорт поверхности и граница результата", "8. Surface passport and scope")}</h2>
          <p>
            {text(
              "С точностью до ненулевой константы дискриминант якобиана равен",
              "Up to a nonzero constant, the Jacobian discriminant is",
            )}
          </p>
          <Latex display>{String.raw`
\Delta(p)\sim
p^2(p-1)^2(p+1)^2R(p)^4K(p)^2.`}</Latex>
          <p>
            {text(
              "Два корня R(p) дают слои I₄. Точки p=0,±1, четыре корня K(p) и бесконечность дают восемь слоёв I₂. Сумма чисел Эйлера равна 24, поэтому минимальная эллиптическая поверхность является K3.",
              "The two roots of R(p) give I₄ fibers. The points p=0,±1, the four roots of K(p), and infinity give eight I₂ fibers. Their Euler numbers sum to 24, so the minimal elliptic surface is a K3 surface.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Доказанная граница ранга", "Proved rank bound")}</h3>
            <Latex display>{String.raw`
1\le\operatorname{rank}E(\overline{\mathbb Q}(p))\le4.`}</Latex>
            <p>
              {text(
                "Неторсионное сечение даёт нижнюю границу 1. Корневой ранг конфигурации 2I₄+8I₂ равен 14; формула Шиоды—Тейта и ρ≤20 для комплексной K3 дают верхнюю границу 4. Точный ранг и полнота выбранной квартической карты пока не определены.",
                "The non-torsion section gives the lower bound 1. The root rank of the 2I₄+8I₂ configuration is 14; Shioda–Tate and ρ≤20 for a complex K3 surface give the upper bound 4. The exact rank and completeness of the chosen quartic chart remain undetermined.",
              )}
            </p>
          </div>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcdfh">
              {text("Предыдущая поверхность: ABCDFH", "Previous surface: ABCDFH")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcegh-abcegj">
              {text("Следующая поверхность: ABCEGH / ABCEGJ", "Next surface: ABCEGH / ABCEGJ")}
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

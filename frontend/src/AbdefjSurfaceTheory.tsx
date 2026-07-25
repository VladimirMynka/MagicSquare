import { Latex } from "./components/Latex";
import { ExactMagicSquareExample } from "./components/ExactMagicSquareExample";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function AbdefjSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abdefj-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.7",
              "Elliptic surfaces for 6/9 patterns · 5.7",
            )}
          </p>
          <h1>
            {text(
              "Маска ABDEFJ: цепочка трёх прогрессий",
              "The ABDEFJ Pattern: A Chain of Three Progressions",
            )}
          </h1>
          <p>
            {text(
              "Во второй треугольной маске все три определяющие связи также красные, но устроены иначе. Прогрессии DEF и AEJ имеют общий центр E, а прогрессия BJD связывает их через клетки D и J. Остаточное условие даёт палиндромную квартику, расщеплённую эллиптическую K3-поверхность и явное бесконечное семейство решений.",
              "In the second triangular pattern all three defining relations are again red, but their incidence is different. The DEF and AEJ progressions share the center E, while the BJD progression links them through D and J. The residual condition gives a palindromic quartic, a split elliptic K3 surface, and an explicit infinite family of solutions.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABDEFJ: красные BDJ, DEF и AEJ",
            "ABDEFJ: red BDJ, DEF, and AEJ",
          )}
          first="BDJ"
          mask="ABDEFJ"
          second="DEF"
          third="AEJ"
          thirdKind="red"
        />
      </header>

      <div className="proof-document topic-document abdefj-surface-theory-document">
        <section>
          <h2>{text("1. Точная система и восстановление", "1. The exact system and reconstruction")}</h2>
          <p>
            {text(
              "Пусть a,b,d,e,f,j — рациональные корни шести выбранных клеток. В обозначении BDJ серединой прогрессии является J: геометрический порядок клеток имеет вид B–J–D. Поэтому три красных условия записываются как",
              "Let a,b,d,e,f,j be rational square roots of the six selected entries. In the label BDJ the middle term of the progression is J: the geometric order of the cells is B–J–D. Hence the three red conditions are",
            )}
          </p>
          <Latex display>{String.raw`
\begin{cases}
b^2+d^2=2j^2,\\
d^2+f^2=2e^2,\\
a^2+j^2=2e^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Система не только необходима, но и достаточна для восстановления магического квадрата. Положим",
              "The system is not only necessary but also sufficient to reconstruct the magic square. Put",
            )}
          </p>
          <Latex display>{String.raw`
E_0=e^2,\qquad
x=a^2-E_0,\qquad
y=E_0-x-d^2.`}</Latex>
          <p>
            {text(
              "Тогда A=a², D=d² и E=e² по построению. Третье равенство даёт J=E₀−x=j², второе — F=E₀+x+y=f², а первое — B=E₀−x+y=b². Следовательно, три выписанные прогрессии точно описывают маску ABDEFJ.",
              "Then A=a², D=d², and E=e² by construction. The third equation gives J=E₀−x=j², the second gives F=E₀+x+y=f², and the first gives B=E₀−x+y=b². Thus the three displayed progressions describe the ABDEFJ pattern exactly.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Две прогрессии с общим центром", "2. Two progressions with a shared center")}</h2>
          <p>{text("Используем стандартное тождество", "Use the standard identity")}</p>
          <Latex display>{String.raw`
L(z)=z^2-2z-1,\qquad
C(z)=z^2+1,\qquad
R(z)=z^2+2z-1,`}</Latex>
          <Latex display>{String.raw`L(z)^2+R(z)^2=2C(z)^2.`}</Latex>
          <p>
            {text(
              "Прогрессии DEF и AEJ можно одновременно параметризовать, склеив их по общему центру E:",
              "The DEF and AEJ progressions can be parametrized simultaneously by gluing them along their common center E:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
d&=L(t)C(s),& f&=R(t)C(s),\\
e&=C(t)C(s),\\
a&=C(t)L(s),& j&=C(t)R(s).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Обе прогрессии теперь выполняются тождественно. Для получения ABDEFJ остаётся потребовать существование рационального b, удовлетворяющего b²+d²=2j². Далее исследуется именно эта рациональная карта; полнота карты для всех рациональных решений исходной маски не утверждается.",
              "Both progressions now hold identically. To obtain ABDEFJ it remains to require a rational b satisfying b²+d²=2j². The rest of the article studies this rational chart; completeness of the chart for every rational solution of the original pattern is not asserted.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Остаточная палиндромная квартика", "3. The residual palindromic quartic")}</h2>
          <p>
            {text(
              "Обозначим неизвестный корень b через V. После подстановки получаем",
              "Write the unknown square root b as V. Substitution gives",
            )}
          </p>
          <Latex display>{String.raw`
V^2=2C(t)^2R(s)^2-L(t)^2C(s)^2.`}</Latex>
          <p>
            {text(
              "Тождество 2C(t)²−L(t)²=R(t)² приводит правую часть к форме",
              "The identity 2C(t)²−L(t)²=R(t)² puts the right-hand side into the form",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
G_t(s)={}&R(t)^2s^4+8C(t)^2s^3+2R(t)^2s^2\\
&-8C(t)^2s+R(t)^2\\
={}&R(t)^2(s^2+1)^2+8C(t)^2s(s^2-1).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Это квартика рода 1 над ℚ(t). Точки (0,R(t)) и (1,2R(t)) видны сразу, но соответствуют вырожденной границе, где несколько клеток совпадают. Они нужны как исходные точки для группового закона, а не как искомые квадраты.",
              "This is a genus-one quartic over ℚ(t). The points (0,R(t)) and (1,2R(t)) are immediate, but they belong to the degenerate boundary where several entries coincide. They serve as base points for the group law rather than as the desired squares.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Расщеплённый якобиан", "4. The split Jacobian")}</h2>
          <p>
            {text(
              "Инварианты бинарной квартики дают модель якобиана",
              "The invariants of the binary quartic give the Jacobian model",
            )}
          </p>
          <Latex display>{String.raw`
Y^2=X^3-432P(t)X+3456R(t)^2D_5(t)D_7(t),`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
P(t)={}&13t^8+8t^7+68t^6+8t^5+46t^4\\
&-8t^3+68t^2-8t+13,\\
D_5(t)={}&5t^4-4t^3+10t^2+4t+5,\\
D_7(t)={}&7t^4+4t^3+14t^2-4t+7.
\end{aligned}`}</Latex>
          <p>{text("Кубический многочлен полностью раскладывается:", "The cubic polynomial splits completely:")}</p>
          <Latex display>{String.raw`
\begin{aligned}
Y^2={}&\bigl(X-12D_5(t)\bigr)
\bigl(X-24Q(t)\bigr)
\bigl(X+12D_7(t)\bigr),\\
Q(t)={}&t^4+4t^3+2t^2-4t+1.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Следовательно, над ℚ(t) видно полное рациональное 2-кручение. С точностью до ненулевой постоянной дискриминант равен",
              "Thus full rational 2-torsion is visible over ℚ(t). Up to a nonzero constant the discriminant is",
            )}
          </p>
          <Latex display>{String.raw`
\Delta(t)\sim
C(t)^4L(t)^4
\bigl(t^2+2t+3\bigr)^2
\bigl(3t^2-2t+1\bigr)^2.`}</Latex>
          <p>
            {text(
              "Корни C и L дают четыре слоя I₄, а корни двух оставшихся квадратичных множителей — четыре слоя I₂. Слой на бесконечности гладок. Сумма чисел Эйлера равна 24, поэтому минимальная эллиптическая поверхность является K3.",
              "The roots of C and L give four I₄ fibers, while the roots of the remaining two quadratic factors give four I₂ fibers. The fiber at infinity is smooth. The Euler numbers sum to 24, so the minimal elliptic surface is K3.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Новое сечение из касательной", "5. A new section from a tangent")}</h2>
          <p>
            {text(
              "Проведём через отмеченные пересечения параболу",
              "Pass the following parabola through the marked intersections:",
            )}
          </p>
          <Latex display>{String.raw`
\Pi_t(s)=
\frac{R^2-4C^2}{R}s^2
-\frac{4(R^2-C^2)}{R}s+R,`}</Latex>
          <p>
            {text(
              "где L,C,R вычисляются при t. Она касается квартики в s=1, и разность факторизуется без решения общего уравнения четвёртой степени:",
              "where L,C,R are evaluated at t. It is tangent to the quartic at s=1, and the difference factors without solving a general quartic equation:",
            )}
          </p>
          <Latex display>{String.raw`
R^2\bigl(G_t(s)-\Pi_t(s)^2\bigr)
=8s(s-1)^2(C^2s+R^2)(R^2-2C^2).`}</Latex>
          <p>
            {text(
              "Последний ещё не учтённый корень даёт рациональное сечение",
              "The remaining, previously unaccounted-for root gives the rational section",
            )}
          </p>
          <Latex display>{String.raw`
s(t)=-\frac{R(t)^2}{C(t)^2},\qquad
V(t)=
\frac{R(t)\bigl(R(t)^4-3C(t)^4\bigr)}{C(t)^4}.`}</Latex>
        </section>

        <section>
          <h2>{text("6. Неторсионность и граница ранга", "6. Non-torsion and the rank bound")}</h2>
          <p>
            {text(
              "При t=2 сечение даёт на квартике точку (−49/25,3682/625). На минимальной модели якобиана она переходит в",
              "At t=2 the section gives the quartic point (−49/25,3682/625). On the minimal Jacobian model it becomes",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
\mathcal E_2:\quad y^2
&=x^3-x^2-3300x+74052\\
&=(x-34)(x-33)(x+66),\\
P_2&=\left(\frac{1716}{49},-\frac{4950}{343}\right).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Точные подсчёты дают #𝓔₂(𝔽₇)=8 и #𝓔₂(𝔽₁₃)=16, поэтому порядок рационального кручения делит 8. При редукции по модулю 19 точка P₂ переходит в (4,9) порядка 12. Для точки кручения порядок редукции должен делить её собственный порядок, что здесь невозможно. Следовательно, P₂ и исходное сечение имеют бесконечный порядок.",
              "Exact counts give #𝓔₂(𝔽₇)=8 and #𝓔₂(𝔽₁₃)=16, so the rational torsion order divides 8. Modulo 19 the point P₂ reduces to (4,9), which has order 12. For a torsion point the reduction order must divide its own order, which is impossible here. Hence P₂ and the original section have infinite order.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Доказанная граница", "Proved bound")}</h3>
            <Latex display>{String.raw`
1\le\operatorname{rank}\mathcal E(\overline{\mathbb Q}(t))\le2.`}</Latex>
            <p>
              {text(
                "Неторсионное сечение даёт нижнюю границу. Корневой ранг конфигурации 4I₄+4I₂ равен 16; формула Шиоды—Тейта и ρ≤20 для комплексной K3 дают верхнюю границу 2. Точный геометрический ранг пока не установлен.",
                "The non-torsion section gives the lower bound. The root rank of the 4I₄+4I₂ configuration is 16; Shioda–Tate and ρ≤20 for a complex K3 surface give the upper bound 2. The exact geometric rank has not yet been determined.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Явное полиномиальное семейство", "7. An explicit polynomial family")}</h2>
          <p>
            {text(
              "Для удаления знаменателя сечения положим",
              "To clear the denominator of the section, put",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
M&=R(t)^2,& N&=C(t)^2,\\
U_C&=M^2+N^2,\\
U_L&=M^2+2MN-N^2,\\
U_R&=M^2-2MN-N^2,\\
B_0&=M^2-3N^2.
\end{aligned}`}</Latex>
          <p>{text("Тогда корни выбранных клеток задаются формулами", "Then the selected-entry square roots are")}</p>
          <Latex display>{String.raw`
\begin{aligned}
a&=C\,U_L,& b&=R\,B_0,& d&=L\,U_C,\\
e&=C\,U_C,& f&=R\,U_C,& j&=C\,U_R.
\end{aligned}`}</Latex>
          <div className="theorem-block">
            <h3>{text("Тождества семейства", "Family identities")}</h3>
            <Latex display>{String.raw`
b^2+d^2=2j^2,\qquad
d^2+f^2=2e^2,\qquad
a^2+j^2=2e^2.`}</Latex>
            <p>
              {text(
                "Все три равенства являются тождествами в ℤ[t]. Отношение f/e=R(t)/C(t) непостоянно, поэтому после исключения конечного набора вырожденных специализаций семейство содержит бесконечно много проективно различных рациональных решений системы ABDEFJ.",
                "All three equalities are identities in ℤ[t]. The ratio f/e=R(t)/C(t) is nonconstant, so after excluding finitely many degenerate specializations the family contains infinitely many projectively distinct rational solutions of the ABDEFJ system.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("8. Точный положительный пример", "8. An exact positive example")}</h2>
          <p>
            {text(
              "При t=2 после деления корней на их общий множитель 2 получаем следующий квадрат. Знаки корней не влияют на клетки.",
              "At t=2, after dividing the roots by their common factor 2, one obtains the following square. Root signs do not affect the entries.",
            )}
          </p>
          <ExactMagicSquareExample
            ariaLabel={text(
              "Точный квадрат ABDEFJ с факторизациями квадратных клеток",
              "An exact ABDEFJ square with factored square entries",
            )}
            roots={{
              A: "10565",
              B: "1841",
              D: "1513",
              E: "7565",
              F: "10591",
              J: "1685",
            }}
            values={[
              "111619225",
              "3389281",
              "56679169",
              "2289169",
              "57229225",
              "112169281",
              "57779281",
              "111069169",
              "2839225",
            ]}
          />
          <p>
            {text(
              "Магическая сумма равна 171 687 675. Все девять клеток положительны и попарно различны; полными квадратами являются ровно A,B,D,E,F,J. Это точный невырожденный сертификат маски ABDEFJ.",
              "The magic sum is 171,687,675. All nine entries are positive and pairwise distinct; exactly A,B,D,E,F,J are perfect squares. This is an exact nondegenerate certificate for the ABDEFJ pattern.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abdefh">
              {text("Предыдущая поверхность: ABDEFH", "Previous surface: ABDEFH")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abefgh">
              {text("Следующая поверхность: ABEFGH", "Next surface: ABEFGH")}
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

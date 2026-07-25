import { Latex } from "./components/Latex";
import { ExactMagicSquareExample } from "./components/ExactMagicSquareExample";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function AbdefhSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abdefh-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.6",
              "Elliptic surfaces for 6/9 patterns · 5.6",
            )}
          </p>
          <h1>
            {text(
              "Маска ABDEFH: три прогрессии квадратов",
              "The ABDEFH Pattern: Three Progressions of Squares",
            )}
          </h1>
          <p>
            {text(
              "В этой треугольной маске все три определяющие связи красные. Две прогрессии имеют общий центр E, а третья связывает их крайние клетки F и H. Правильная остаточная квартика включает квадратичный твист и приводит к расщеплённой эллиптической K3-поверхности.",
              "All three defining relations in this triangular pattern are red. Two progressions share the center E, while the third links their endpoints F and H. The correct residual quartic includes a quadratic twist and leads to a split elliptic K3 surface.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABDEFH: красные AFH, DEF и BEH",
            "ABDEFH: red AFH, DEF, and BEH",
          )}
          first="AFH"
          mask="ABDEFH"
          second="DEF"
          third="BEH"
          thirdKind="red"
        />
      </header>

      <div className="proof-document topic-document abdefh-surface-theory-document">
        <section>
          <h2>{text("1. Точная система и восстановление", "1. The exact system and reconstruction")}</h2>
          <p>
            {text(
              "Пусть a,b,d,e,f,h — рациональные корни шести выбранных клеток. Три красные прогрессии записываются как",
              "Let a,b,d,e,f,h be rational square roots of the six selected entries. The three red progressions are",
            )}
          </p>
          <Latex display>{String.raw`
\begin{cases}
f^2+h^2=2a^2,\\
d^2+f^2=2e^2,\\
b^2+h^2=2e^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Эти условия достаточны для восстановления магического квадрата. Положим",
              "These conditions suffice to reconstruct the magic square. Put",
            )}
          </p>
          <Latex display>{String.raw`
E_0=e^2,\qquad
x=a^2-E_0,\qquad
y=E_0-x-d^2.`}</Latex>
          <p>
            {text(
              "Тогда A=a², D=d² и E=e² по построению. Из второй прогрессии получается F=2E₀−d²=f². Первая даёт H=2a²−f²=h², а третья — B=2E₀−h²=b². Следовательно, система описывает саму маску ABDEFH, а не только необходимые следствия магичности.",
              "Then A=a², D=d², and E=e² by construction. The second progression gives F=2E₀−d²=f². The first gives H=2a²−f²=h², and the third gives B=2E₀−h²=b². Thus the system describes the ABDEFH pattern itself, not merely necessary consequences of magicity.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Две прогрессии с общим центром", "2. Two progressions with a shared center")}</h2>
          <p>{text("Как и прежде, используем тождество", "As before, use the identity")}</p>
          <Latex display>{String.raw`
L(z)=z^2-2z-1,\qquad
C(z)=z^2+1,\qquad
R(z)=z^2+2z-1,`}</Latex>
          <Latex display>{String.raw`L(z)^2+R(z)^2=2C(z)^2.`}</Latex>
          <p>
            {text(
              "Прогрессии DEF и BEH можно склеить по их общему центру E:",
              "The DEF and BEH progressions can be glued along their common center E:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
d&=L(t)C(s),& f&=R(t)C(s),\\
e&=C(t)C(s),\\
b&=C(t)L(s),& h&=C(t)R(s).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Обе прогрессии теперь выполняются тождественно. Остаётся потребовать, чтобы среднее квадратов f² и h² также было квадратом a².",
              "Both progressions now hold identically. It remains to require the mean of f² and h² to be another square a².",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Квартика и обязательный твист", "3. The quartic and its required twist")}</h2>
          <p>
            {text(
              "Положим V=2a. Тогда третья прогрессия принимает вид",
              "Put V=2a. The third progression then becomes",
            )}
          </p>
          <Latex display>{String.raw`
V^2=
2\left(C(t)^2R(s)^2+R(t)^2C(s)^2\right).`}</Latex>
          <p>
            {text(
              "Множитель 2 здесь существенен: его удаление сохраняет геометрию над алгебраическим замыканием, но меняет рациональную модель и рациональные секции. Для компактной записи обозначим",
              "The factor 2 is essential: removing it preserves the geometry over an algebraic closure but changes the rational model and its rational sections. For a compact form write",
            )}
          </p>
          <Latex display>{String.raw`
A=C(t)^2,\qquad B=R(t)^2,\qquad S=A+B.`}</Latex>
          <p>{text("После раскрытия скобок получаем", "After expansion one obtains")}</p>
          <Latex display>{String.raw`
V^2=
2Ss^4+8As^3+4Ss^2-8As+2S.`}</Latex>
          <p>
            {text(
              "Квартика содержит две очевидные рациональные точки",
              "The quartic contains two immediate rational points",
            )}
          </p>
          <Latex display>{String.raw`
(s,V)=\bigl(t,2C(t)R(t)\bigr),\qquad
\left(-\frac1t,\frac{2C(t)R(t)}{t^2}\right).`}</Latex>
          <p>
            {text(
              "Они соответствуют вырожденным квадратам с совпадающими клетками A,F,H, но дают базовые точки для эллиптического закона сложения.",
              "They correspond to degenerate squares with coincident entries A,F,H, but provide base points for the elliptic group law.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Расщеплённый якобиан", "4. The split Jacobian")}</h2>
          <p>
            {text(
              "Инварианты правильно твистованной бинарной квартики дают модель",
              "The invariants of the correctly twisted binary quartic give the model",
            )}
          </p>
          <Latex display>{String.raw`
Y^2=X^3-1728P(t)X+55296H(t),`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
P(t)={}&7t^8+16t^7+44t^6+16t^5+10t^4\\
&-16t^3+44t^2-16t+7,\\
H(t)={}&L(t)^2D_1(t)D_2(t),\\
D_1(t)={}&t^4+2t^3+2t^2-2t+1,\\
D_2(t)={}&5t^4+4t^3+10t^2-4t+5.
\end{aligned}`}</Latex>
          <p>{text("Кубический многочлен полностью раскладывается:", "The cubic polynomial splits completely:")}</p>
          <Latex display>{String.raw`
\begin{aligned}
X_0&=24Q(t),\\
X_1&=96D_1(t),\\
X_2&=-24D_2(t),
\end{aligned}`}</Latex>
          <Latex display>{String.raw`
Q(t)=t^4-4t^3+2t^2+4t+1.`}</Latex>
          <p>
            {text(
              "Следовательно, над ℚ(t) видно полное рациональное 2-кручение. С точностью до ненулевой константы дискриминант равен",
              "Thus full rational 2-torsion is visible over ℚ(t). Up to a nonzero constant the discriminant is",
            )}
          </p>
          <Latex display>{String.raw`
\Delta(t)\sim
C(t)^4R(t)^4
\bigl(t^2+2t+3\bigr)^2
\bigl(3t^2-2t+1\bigr)^2.`}</Latex>
          <p>
            {text(
              "Четыре корня C и R дают четыре слоя I₄; четыре корня двух оставшихся квадратичных множителей дают четыре слоя I₂. На бесконечности слой гладок. Сумма чисел Эйлера равна 24, поэтому минимальная поверхность является K3.",
              "The four roots of C and R give four I₄ fibers; the four roots of the remaining two quadratic factors give four I₂ fibers. The fiber at infinity is smooth. The Euler numbers sum to 24, so the minimal surface is K3.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Сечение из касательной параболы", "5. A section from a tangent parabola")}</h2>
          <p>
            {text(
              "Пусть G(s) — правая часть квартики. Через две отмеченные точки проведём параболу, касающуюся квартики в первой из них:",
              "Let G(s) denote the right-hand side of the quartic. Pass a parabola through the two marked points and make it tangent at the first:",
            )}
          </p>
          <Latex display>{String.raw`
\Pi(s)=\frac{2}{C(t)}
\left(\alpha(t)s^2+\beta(t)s+\gamma(t)\right),`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
\alpha(t)&=t^4+t^3+2t^2+3t-1,\\
\beta(t)&=t^4-2t^3-2t^2+2t+1,\\
\gamma(t)&=t^4+3t^3-2t^2+t-1.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Вместо решения общего уравнения четвёртой степени разность раскладывается:",
              "Instead of solving a general quartic equation, the difference factors:",
            )}
          </p>
          <Latex display>{String.raw`
G(s)-\Pi(s)^2=
-\frac4{C(t)^2}(s-t)^2(ts+1)(N(t)s+M(t)),`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
M(t)&=4t^5+t^4-12t^3+2t^2-8t+1,\\
N(t)&=t^5+8t^4+2t^3+12t^2+t-4.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Первые три множителя отвечают уже заданным пересечениям. Последний даёт новое рациональное сечение",
              "The first three factors account for the prescribed intersections. The final factor gives the new rational section",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
s(t)&=-\frac{M(t)}{N(t)},\\
V(t)&=\frac{2C(t)R(t)K(t)}{N(t)^2},
\end{aligned}`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
K(t)={}&13t^8-8t^7+132t^6-8t^5-82t^4\\
&+8t^3+132t^2+8t+13.
\end{aligned}`}</Latex>
        </section>

        <section>
          <h2>{text("6. Неторсионность и граница ранга", "6. Non-torsion and the rank bound")}</h2>
          <p>
            {text(
              "При хорошей специализации t=1 новое сечение даёт на квартике точку (3/5,104/25). После перехода к минимальной модели якобиана получаем",
              "At the good specialization t=1 the new section gives the quartic point (3/5,104/25). Passing to the minimal Jacobian model gives",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
\mathcal E_1:\quad y^2
&=x^3-x^2-9x+9\\
&=(x-1)(x-3)(x+3),\\
P_1&=(-1,-4).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Точные подсчёты дают #𝓔₁(𝔽₅)=8 и #𝓔₁(𝔽₇)=12, поэтому порядок рационального кручения делит 4. Видимое полное 2-кручение уже имеет порядок 4, а P₁ не является точкой 2-кручения. Следовательно, P₁ и исходное сечение имеют бесконечный порядок.",
              "Exact counts give #𝓔₁(𝔽₅)=8 and #𝓔₁(𝔽₇)=12, so the rational torsion order divides 4. The visible full 2-torsion already has order 4, while P₁ is not a 2-torsion point. Hence P₁ and the original section have infinite order.",
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
              "Знаменатель N(t)² можно убрать общим масштабированием всех корней. Положим",
              "The denominator N(t)² can be removed by a common scaling of all roots. Put",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
U_C&=M^2+N^2,\\
U_L&=M^2+2MN-N^2,\\
U_R&=M^2-2MN-N^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Здесь M=M(t), N=N(t), а L,C,R,K также вычисляются при t. Тогда",
              "Here M=M(t), N=N(t), and L,C,R,K are likewise evaluated at t. Then",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
a&=CRK,& b&=CU_L,& d&=LU_C,\\
e&=CU_C,& f&=RU_C,& h&=CU_R.
\end{aligned}`}</Latex>
          <div className="theorem-block">
            <h3>{text("Тождества семейства", "Family identities")}</h3>
            <Latex display>{String.raw`
f^2+h^2=2a^2,\qquad
d^2+f^2=2e^2,\qquad
b^2+h^2=2e^2.`}</Latex>
            <p>
              {text(
                "Все три равенства являются тождествами в ℤ[t]. Отношение f/e=R(t)/C(t) непостоянно, поэтому после исключения конечного набора вырожденных специализаций семейство содержит бесконечно много проективно различных рациональных решений системы ABDEFH.",
                "All three equalities are identities in ℤ[t]. The ratio f/e=R(t)/C(t) is nonconstant, so after excluding finitely many degenerate specializations the family contains infinitely many projectively distinct rational solutions of the ABDEFH system.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("8. Точный положительный пример", "8. An exact positive example")}</h2>
          <p>
            {text(
              "При t=−2 после деления корней на их общий множитель 5 получаем следующий магический квадрат.",
              "At t=−2, after dividing the roots by their common factor 5, one obtains the following magic square.",
            )}
          </p>
          <ExactMagicSquareExample
            ariaLabel={text(
              "Точный квадрат ABDEFH с факторизациями квадратных клеток",
              "An exact ABDEFH square with factored square entries",
            )}
            roots={{
              A: "12205",
              B: "12607",
              D: "20951",
              E: "14965",
              F: "2993",
              H: "16999",
            }}
            values={[
              "148962025",
              "158936449",
              "363955201",
              "438944401",
              "223951225",
              "8958049",
              "83947249",
              "288966001",
              "298940425",
            ]}
          />
          <p>
            {text(
              "Магическая сумма равна 671 853 675. Все девять клеток положительны и попарно различны; полными квадратами являются ровно A,B,D,E,F,H. Это точный невырожденный сертификат маски ABDEFH.",
              "The magic sum is 671,853,675. All nine entries are positive and pairwise distinct; exactly A,B,D,E,F,H are perfect squares. This is an exact nondegenerate certificate for the ABDEFH pattern.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcegh-abcegj">
              {text("Предыдущая поверхность: ABCEGH / ABCEGJ", "Previous surface: ABCEGH / ABCEGJ")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abdefj">
              {text("Следующая поверхность: ABDEFJ", "Next surface: ABDEFJ")}
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

import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function F9EllipticLayersTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page f9-elliptic-layers-theory-page">
      <TheoryLink className="back-link" to="/theory#elliptic-tfmn">
        ← {text("К циклу об эллиптической геометрии tfmn", "Back to the elliptic geometry of tfmn")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптическая геометрия tfmn · 4.5",
              "Elliptic geometry of tfmn · 4.5",
            )}
          </p>
          <h1>
            {text(
              "Эллиптические слои F9+",
              "The Elliptic Layers of F9+",
            )}
          </h1>
          <p>
            {text(
              "Каждая подходящая квадратичная подстановка задаёт кривую рода 1, рациональные точки которой производят пары параметров с одинаковым tf. Простейший слой приводит к кривой y²=x³−2x; более общие ветви образуют нетривиальные семейства эллиптических кривых.",
              "Each suitable quadratic substitution defines a genus-one curve whose rational points produce parameter pairs with equal tf. The simplest layer leads to y²=x³−2x; more general branches form nontrivial families of elliptic curves.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document f9-elliptic-layers-theory-document">
        <section>
          <h2>{text("1. Базовый слой F9", "1. The basic F9 layer")}</h2>
          <p>
            {text(
              "Рассмотрим квадратичную подстановку",
              "Consider the quadratic substitution",
            )}
          </p>
          <Latex display>{String.raw`
C=a^2-b^2,\qquad D=b^2.`}</Latex>
          <p>
            {text(
              "Её остаток выводится прямым раскрытием:",
              "Its residual quotient follows by direct expansion:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
f(C,D)
&=(a^2-b^2)b^2\bigl((a^2-b^2)^2-b^4\bigr)\\
&=(a^2-b^2)b^2\bigl(a^4-2a^2b^2\bigr)\\
&=ab(a^2-b^2)\cdot ab(a^2-2b^2)\\
&=f(a,b)\cdot ab(a^2-2b^2).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Поэтому для невырожденных пар совпадение ориентированных tf эквивалентно существованию s∈ℚ× такого, что",
              "Hence, for nondegenerate pairs, equality of the oriented tf values is equivalent to the existence of s∈ℚ× such that",
            )}
          </p>
          <Latex display>{String.raw`
s^2=ab(a^2-2b^2).`}</Latex>
          <p>
            {text(
              "При b≠0 положим x=a/b и y=s/b². Получается эллиптическая кривая",
              "For b≠0, put x=a/b and y=s/b². This gives the elliptic curve",
            )}
          </p>
          <Latex display>{String.raw`
E_9:\qquad y^2=x^3-2x.`}</Latex>
        </section>

        <section>
          <h2>{text("2. Точное соответствие внутри подстановки", "2. Exact correspondence within the substitution")}</h2>
          <div className="theorem-block">
            <h3>{text("Теорема базового слоя", "Basic-layer theorem")}</h3>
            <p>
              {text(
                "Невырожденные решения базовой подстановки, рассматриваемые с точностью до общего масштаба каждой пары, находятся в биекции с рациональными точками (x,y) на E₉, для которых x≠0,±1 и x²≠2, с точностью до замены y на −y.",
                "Up to a common scaling of each pair, nondegenerate solutions of the basic substitution are in bijection with rational points (x,y) on E₉ satisfying x≠0,±1 and x²≠2, modulo y↦−y.",
              )}
            </p>
            <Latex display>{String.raw`
(x,y)
\longmapsto
\bigl([x:1],\,[x^2-1:1]\bigr).`}</Latex>
          </div>
          <p>
            {text(
              "Прямое направление уже доказано тождеством для f. Обратно, всякая проективная входная пара с b≠0 имеет единственный вид [x:1]. Если подстановка сохраняет tf, её остаток x(x²−2) является квадратом, а значит существует точка (x,±y) на E₉. Обе конструкции взаимно обратны.",
              "The forward direction is the identity for f proved above. Conversely, every projective input pair with b≠0 has a unique form [x:1]. If the substitution preserves tf, its residual x(x²−2) is a square, so a point (x,±y) exists on E₉. The two constructions are inverse.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Почему решений бесконечно много", "3. Why there are infinitely many solutions")}</h2>
          <p>
            {text(
              "На E₉ лежит точка G=(2,2). Формула удвоения даёт",
              "The point G=(2,2) lies on E₉. The doubling formula gives",
            )}
          </p>
          <Latex display>{String.raw`
2G=\left(\frac94,-\frac{21}{8}\right).`}</Latex>
          <p>
            {text(
              "Кривая y²=x³−2x задана минимальным целочисленным уравнением. Если бы G была точкой кручения, то 2G также была бы точкой кручения. По теореме Нагелля—Лутца её координаты должны были бы быть целыми, если 2G не является нейтральным элементом. Но 2G имеет нецелые координаты и не равно 𝒪. Следовательно, G имеет бесконечный порядок.",
              "The curve y²=x³−2x is given by a minimal integral equation. If G were torsion, then 2G would also be torsion. By the Nagell–Lutz theorem its coordinates would have to be integral unless 2G were the identity. But 2G has nonintegral coordinates and is not 𝒪. Therefore G has infinite order.",
            )}
          </p>
          <p>
            {text(
              "Кратные nG дают бесконечно много различных x-координат, а значит бесконечно много пар",
              "The multiples nG give infinitely many distinct x-coordinates and hence infinitely many pairs",
            )}
          </p>
          <Latex display>{String.raw`
\bigl([x(nG):1],\,[x(nG)^2-1:1]\bigr)`}</Latex>
          <p>
            {text(
              "с совпадающим tf. Например, G даёт [2:1] и [3:1]: f(2,1)=6, f(3,1)=24=4·6.",
              "with equal tf. For example, G gives [2:1] and [3:1]: f(2,1)=6 and f(3,1)=24=4·6.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Параметрический узкий слой", "4. A parametric narrow layer")}</h2>
          <p>
            {text(
              "Базовую формулу можно заменить трёхпараметрическим анзацем",
              "The basic formula can be replaced by the three-parameter ansatz",
            )}
          </p>
          <Latex display>{String.raw`
C=b(a-nb),\qquad
D=p a^2+mab-nb^2.`}</Latex>
          <p>
            {text(
              "До сокращения отношение имеет вид",
              "Before cancellation, the quotient is",
            )}
          </p>
          <Latex display>{String.raw`
\frac{f(C,D)}{f(a,b)}
=-
\frac{
(a-nb)\,
(pa+(m-1)b)\,
(pa^2+mab-nb^2)\,
(pa^2+(m+1)ab-2nb^2)
}{
(a-b)(a+b)
}.`}</Latex>
          <p>
            {text(
              "Для полиномиального сокращения один из четырёх множителей числителя должен исчезать при a=b, а один — при a=−b. Эти два выбора дают линейные условия на p,m,n. После удаления тождественно нулевой ветви получается 14 невырожденных однопараметрических ветвей; типичный остаток является бинарной квартитой.",
              "For polynomial cancellation, one of the four numerator factors must vanish at a=b and one at a=−b. These two choices impose linear conditions on p,m,n. After the identically zero branch is removed, 14 nonzero one-parameter branches remain; a typical residual is a binary quartic.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Параметр не является масштабом", "5. The parameter is not a scaling artifact")}</h2>
          <p>
            {text(
              "На ветви p=n, m=0 имеем",
              "On the branch p=n, m=0, one has",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
C&=b(a-nb),\\
D&=n(a^2-b^2),\\
q_n(a,b)
&=-n(a-nb)(na-b)(na^2+ab-2nb^2).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Это подлинное семейство, а не переобозначение одного слоя. При n=2 и n=3 получаются гладкие эллиптические кривые с различными j-инвариантами:",
              "This is a genuine family, not a reparametrization of one layer. At n=2 and n=3 one obtains smooth elliptic curves with distinct j-invariants:",
            )}
          </p>
          <Latex display>{String.raw`
j_{n=2}=\frac{2^2\,5^6}{3\cdot11},
\qquad
j_{n=3}=\frac{2^6\,5^3\,11^3}{3^4\cdot73}.`}</Latex>
          <p>
            {text(
              "Если бы параметр устранялся рациональной заменой координат и масштабированием, j-инвариант оставался бы постоянным. Различие этих двух значений это исключает.",
              "If the parameter could be removed by a rational change of coordinates and scaling, the j-invariant would remain constant. The two different values rule this out.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Известные эллиптические слои", "6. Recorded elliptic layers")}</h2>
          <p>
            {text(
              "В двух ранних списках зафиксировано 16 конкретных квадратичных подстановок с остатком типа 1+1+2. Восемь происходят из узкого анзаца, ещё восемь — из общего пространства пар квадратичных форм. Последние восемь лежат всего на семи из 204 ветвей общей теоремы; две формулы являются разными точками одной ветви.",
              "Two early lists record 16 concrete quadratic substitutions with residual factorization 1+1+2. Eight come from the narrow ansatz and eight from the full space of pairs of quadratic forms. The latter eight occupy only seven of the 204 branches of the general theorem; two formulas are different points on one branch.",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Слой", "Layer")}</th>
                  <th>{text("Модель кривой", "Curve model")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>F9_A</td><td><Latex>{String.raw`Y^2=-(6t+1)(12t^2+9t+1)`}</Latex></td></tr>
                <tr><td>F9_B</td><td><Latex>{String.raw`Y^2=-4(3t+2)(6t^2+6t+1)`}</Latex></td></tr>
                <tr><td>F9_C</td><td><Latex>{String.raw`Y^2=t^3-3t^2+t+1`}</Latex></td></tr>
                <tr><td>F9_D</td><td><Latex>{String.raw`Y^2=(6t+1)(6t^2+6t+1)`}</Latex></td></tr>
                <tr><td>F9_E</td><td><Latex>{String.raw`Y^2=-2(3t+2)(6t^2+9t+2)`}</Latex></td></tr>
                <tr><td>F9_F</td><td><Latex>{String.raw`Y^2=-(2t+3)(2t^2-15t-9)`}</Latex></td></tr>
                <tr><td>F9_G</td><td><Latex>{String.raw`Y^2=-3(8t+3)(24t^2+19t+3)`}</Latex></td></tr>
                <tr><td>F9_H</td><td><Latex>{String.raw`Y^2=-3(2t+3)(6t^2+10t+3)`}</Latex></td></tr>
                <tr><td>F9__1</td><td><Latex>{String.raw`Y^2=X^3+6X^2-8X`}</Latex></td></tr>
                <tr><td>F9__2</td><td><Latex>{String.raw`Y^2=X^3-6X^2-8X`}</Latex></td></tr>
                <tr><td>F9__3</td><td><Latex>{String.raw`Y^2=X^3-18X^2+64X`}</Latex></td></tr>
                <tr><td>F9__4</td><td><Latex>{String.raw`Y^2=X^3-24X^2+256X`}</Latex></td></tr>
                <tr><td>F9__5</td><td><Latex>{String.raw`Y^2=X^3-24X^2+162X`}</Latex></td></tr>
                <tr><td>F9__6</td><td><Latex>{String.raw`Y^2=X^3+84X^2+1296X`}</Latex></td></tr>
                <tr><td>F9__7</td><td><Latex>{String.raw`Y^2=X^3+24X^2+256X`}</Latex></td></tr>
                <tr><td>F9__8</td><td><Latex>{String.raw`Y^2=X^3-84X^2+1296X`}</Latex></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Эта таблица является каталогом построенных слоёв, а не классификацией всех эллиптических ветвей. В частности, тип 2+2 также может иметь рациональные точки и приводить к эллиптическим моделям, хотя линейные корни там заранее не видны.",
              "This table is an inventory of constructed layers, not a classification of all elliptic branches. In particular, a 2+2 residual may also have rational points and yield an elliptic model even though no linear root is visible in advance.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Как одна точка производит пару tf", "7. How one point produces a tf pair")}</h2>
          <p>
            {text(
              "Пусть на выбранной ветви",
              "Suppose that on a chosen branch",
            )}
          </p>
          <Latex display>{String.raw`
f(C(a,b),D(a,b))=f(a,b)q(a,b)`}</Latex>
          <p>
            {text(
              "и рациональная точка остаточной кривой задаёт s²=q(a,b). Тогда",
              "and a rational point on the residual curve gives s²=q(a,b). Then",
            )}
          </p>
          <Latex display>{String.raw`
f(C(a,b),D(a,b))=s^2f(a,b),`}</Latex>
          <p>
            {text(
              "поэтому входная и выходная пары имеют одинаковый tf. Если остаточная кривая имеет точку бесконечного порядка и отображение в r=a/b непостоянно, её кратные дают бесконечно много таких пар; из расчёта удаляется лишь конечное множество точек, в которых один из множителей f обращается в нуль.",
              "so the input and output pairs have the same tf. If the residual curve has a point of infinite order and the map to r=a/b is nonconstant, its multiples give infinitely many such pairs; only the finite set of points where a factor of f vanishes is removed.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Вложение в F4+", "8. Embedding into F4+")}</h2>
          <p>
            {text(
              "Пусть b≠0, r=a/b, а C(r)=C(r,1), D(r)=D(r,1), q(r)=q(r,1). Выходную пару можно домножить на a/C и получить общий первый параметр:",
              "Let b≠0, r=a/b, and write C(r)=C(r,1), D(r)=D(r,1), q(r)=q(r,1). Scaling the output pair by a/C produces a common first parameter:",
            )}
          </p>
          <Latex display>{String.raw`
(C,D)\sim\left(a,\frac{aD}{C}\right).`}</Latex>
          <p>
            {text(
              "В координатах F4+ соответствующая кривая задаётся формулами",
              "In F4+ coordinates, the corresponding curve is given by",
            )}
          </p>
          <Latex display>{String.raw`
y_F(r)=\frac{rD(r)}{C(r)},
\qquad
\rho^2(r)=\frac{C(r)^4}{r^4q(r)}.`}</Latex>
          <p>
            {text(
              "На остаточной кривой s²=q(r) параметр ρ становится рациональной функцией",
              "On the residual curve s²=q(r), the parameter ρ becomes the rational function",
            )}
          </p>
          <Latex display>{String.raw`
\rho(r,s)=\frac{C(r)^2}{r^2s}.`}</Latex>
          <p>
            {text(
              "Таким образом, каждый F9+-слой является явной кривой или многосечением внутри полной поверхности F4+. Это следствие нормализации, а не определение F9+.",
              "Thus every F9+ layer is an explicit curve or multisection inside the complete F4+ surface. This is a consequence of normalization, not the definition of F9+.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("9. Переход к F7+ и граница результата", "9. Passage to F7+ and the boundary of the result")}</h2>
          <p>
            {text(
              "Каждая точка F9+ создаёт две пары [a:b] и [C:D] одного квадратного класса T. По биекции F7+ они становятся двумя рациональными точками на одной конгруэнтной кривой E_T. После выбора знаков групповой закон E_T производит новые представления того же T.",
              "Every F9+ point creates two pairs [a:b] and [C:D] in one square class T. Through the F7+ bijection they become two rational points on the same congruent-number curve E_T. After signs are chosen, the group law on E_T produces further representations of the same T.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Что доказано и что остаётся открытым", "What is proved and what remains open")}</h3>
            <p>
              {text(
                "Полностью классифицирован слой точного полиномиального сокращения и доказан критерий через остаточную квартиту. Для каждого конкретного слоя остаются отдельные арифметические вопросы: наличие рациональных точек, ранг якобиана, независимость порождённых точек на E_T и совпадения ветвей после факторизации по симметриям.",
                "The exact polynomial-cancellation layer and the residual-quartic criterion are completely classified. Each concrete layer still has its own arithmetic questions: rational solubility, Jacobian rank, independence of the induced points on E_T, and branch identifications after quotienting by symmetries.",
              )}
            </p>
          </div>
          <nav className="proof-navigation" aria-label={text("Навигация по теории", "Theory navigation")}>
            <TheoryLink className="button button-primary" to="/theory/f9-plus">
              {text("Общая теорема F9+", "The general F9+ theorem")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/f7-plus">
              F7+
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/f4-plus">
              F4+
            </TheoryLink>
          </nav>
        </section>
      </div>
    </article>
  );
}

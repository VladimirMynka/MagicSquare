import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function F7PlusTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page f7-plus-theory-page">
      <TheoryLink className="back-link" to="/theory#elliptic-tfmn">
        ← {text("К циклу об эллиптической геометрии tfmn", "Back to the elliptic geometry of tfmn")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптическая геометрия tfmn · 4.1",
              "Elliptic geometry of tfmn · 4.1",
            )}
          </p>
          <h1>
            {text(
              "F7+: пары параметров и поверхность конгруэнтных чисел",
              "F7+: Parameter Pairs and the Congruent-Number Surface",
            )}
          </h1>
          <p>
            {text(
              "Фиксированное значение tf задаёт эллиптическую кривую конгруэнтного числа. Невырожденные рациональные пары параметров находятся в точной биекции с её нетривиальными рациональными точками с точностью до знака y.",
              "A fixed tf value determines a congruent-number elliptic curve. Nondegenerate rational parameter pairs are in exact bijection with its nontrivial rational points, up to the sign of y.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document f7-plus-theory-document">
        <section>
          <h2>{text("1. Квадратный класс и проективная пара", "1. Square class and projective pair")}</h2>
          <p>
            {text(
              "Положим",
              "Put",
            )}
          </p>
          <Latex display>{String.raw`
f(m,n)=mn(m-n)(m+n).`}</Latex>
          <p>
            {text(
              "Пара (m,n) невырождена, если m,n,m−n и m+n ненулевые. Одновременное умножение m и n на λ∈ℚ× умножает f на λ⁴, поэтому квадратный класс зависит только от проективной пары [m:n].",
              "A pair (m,n) is nondegenerate when m, n, m−n, and m+n are all nonzero. Simultaneously multiplying m and n by λ∈ℚ× multiplies f by λ⁴, so the square class depends only on the projective pair [m:n].",
            )}
          </p>
          <p>
            {text(
              "Зафиксируем положительное квадратсвободное целое T. Рассматриваем множество",
              "Fix a positive squarefree integer T. Consider the set",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal P_T=
\left\{
[m:n]\in\mathbb P^1(\mathbb Q):
mn(m-n)(m+n)\ne0,\quad
f(m,n)\in T(\mathbb Q^\times)^2
\right\}.`}</Latex>
          <p>
            {text(
              "Иными словами, [m:n] принадлежит 𝒫_T тогда и только тогда, когда для некоторого q∈ℚ× выполняется f(m,n)=Tq², то есть tf(m,n)=T.",
              "Thus [m:n] belongs to 𝒫_T exactly when f(m,n)=Tq² for some q∈ℚ×, equivalently tf(m,n)=T.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("О названии", "About the name")}</h3>
            <p>
              {text(
                "Обозначение F7+ возникло исторически. В этой статье оно означает всю поверхность кривых фиксированного квадратного класса и не зависит от какой-либо конечной нумерации формул.",
                "The label F7+ arose historically. In this article it denotes the entire surface of fixed-square-class curves and does not depend on any finite numbering of formulas.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("2. Кривая фиксированного T", "2. The curve for fixed T")}</h2>
          <p>
            {text(
              "К значению T относится конгруэнтная эллиптическая кривая",
              "Associated with T is the congruent-number elliptic curve",
            )}
          </p>
          <Latex display>{String.raw`
E_T:\qquad y^2=x^3-T^2x=x(x-T)(x+T).`}</Latex>
          <p>
            {text(
              "Её рациональные точки порядка 2 и нейтральный элемент равны",
              "Its rational 2-torsion points and identity are",
            )}
          </p>
          <Latex display>{String.raw`
E_T[2](\mathbb Q)=
\{\mathcal O,\ (0,0),\ (T,0),\ (-T,0)\}.`}</Latex>
          <p>
            {text(
              "Обозначим через E_T°(ℚ) дополнение к этим четырём точкам. На нём y≠0. Инволюция (x,y)↦(x,−y) меняет знак точки в группе E_T(ℚ), но сохраняет её x-координату.",
              "Let E_T°(ℚ) be the complement of these four points. There y≠0. The involution (x,y)↦(x,−y) negates a point in the group E_T(ℚ) while preserving its x-coordinate.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Теорема о биекции", "3. The bijection theorem")}</h2>
          <div className="theorem-block">
            <h3>{text("Теорема F7+", "F7+ theorem")}</h3>
            <p>
              {text(
                "Для каждого положительного квадратсвободного T существует биекция",
                "For every positive squarefree T there is a bijection",
              )}
            </p>
            <Latex display>{String.raw`
\Phi_T:\quad
\mathcal P_T
\overset{\sim}{\longrightarrow}
E_T^\circ(\mathbb Q)\big/\{(x,y)\sim(x,-y)\}.`}</Latex>
            <p>
              {text(
                "Если f(m,n)=Tq², то прямое отображение задаётся формулой",
                "If f(m,n)=Tq², the forward map is",
              )}
            </p>
            <Latex display>{String.raw`
\Phi_T([m:n])
=
\left[
\left(
\frac{Tm}{n},
\frac{T^2q}{n^2}
\right)
\right]_{\pm y}.`}</Latex>
            <p>
              {text(
                "Обратное отображение имеет особенно простой вид:",
                "The inverse map has the particularly simple form",
              )}
            </p>
            <Latex display>{String.raw`
\Psi_T([(x,y)]_{\pm y})=[x:T].`}</Latex>
          </div>
        </section>

        <section>
          <h2>{text("4. Вывод прямого отображения", "4. Derivation of the forward map")}</h2>
          <p>
            {text(
              "Пусть [m:n]∈𝒫_T и f(m,n)=Tq². Положим",
              "Let [m:n]∈𝒫_T and f(m,n)=Tq². Set",
            )}
          </p>
          <Latex display>{String.raw`
x=\frac{Tm}{n},\qquad
y=\frac{T^2q}{n^2}.`}</Latex>
          <p>
            {text(
              "Тогда уравнение кривой получается непосредственно из определения f:",
              "Then the curve equation follows directly from the definition of f:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
x^3-T^2x
&=\frac{T^3m(m^2-n^2)}{n^3}\\
&=\frac{T^3}{n^4}\,mn(m^2-n^2)\\
&=\frac{T^3}{n^4}\,f(m,n)\\
&=\frac{T^4q^2}{n^4}
=y^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Невырожденность пары даёт x≠0,±T, а q≠0 даёт y≠0. Следовательно построенная точка принадлежит E_T°(ℚ).",
              "Nondegeneracy gives x≠0,±T, while q≠0 gives y≠0. Hence the constructed point lies in E_T°(ℚ).",
            )}
          </p>

          <h3>{text("Почему отображение корректно определено", "Why the map is well defined")}</h3>
          <p>
            {text(
              "Число q определяется равенством f=Tq² только с точностью до знака; замена q на −q меняет y на −y. Именно поэтому справа берётся фактор по знаку y.",
              "The equation f=Tq² determines q only up to sign; replacing q by −q replaces y by −y. This is exactly why the target is quotiented by the sign of y.",
            )}
          </p>
          <p>
            {text(
              "Если заменить представителя пары на (λm,λn), то q заменяется на ±λ²q. Обе дроби Tm/n и T²q/n² сохраняются с точностью до уже учтённого знака y. Поэтому Φ_T зависит только от [m:n].",
              "Replacing the representative by (λm,λn) replaces q by ±λ²q. Both fractions Tm/n and T²q/n² remain unchanged, apart from the already-quotiented sign of y. Thus Φ_T depends only on [m:n].",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Вывод обратного отображения", "5. Derivation of the inverse map")}</h2>
          <p>
            {text(
              "Пусть (x,y)∈E_T°(ℚ). Из уравнения кривой следует",
              "Let (x,y)∈E_T°(ℚ). The curve equation gives",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
f(x,T)
&=xT(x-T)(x+T)\\
&=T(x^3-T^2x)\\
&=Ty^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Поэтому [x:T] принадлежит 𝒫_T. Замена y на −y не меняет эту пару, так что Ψ_T корректно определено на факторе.",
              "Therefore [x:T] belongs to 𝒫_T. Replacing y by −y does not change this pair, so Ψ_T is well defined on the quotient.",
            )}
          </p>
          <p>
            {text(
              "Остаётся проверить композиции. Для исходной пары",
              "It remains to check the two compositions. For the original pair,",
            )}
          </p>
          <Latex display>{String.raw`
\Psi_T(\Phi_T([m:n]))
=
\left[\frac{Tm}{n}:T\right]
=[m:n].`}</Latex>
          <p>
            {text(
              "Для исходной точки применим прямую формулу к паре [x:T]. В равенстве f(x,T)=Ty² можно взять q=y, после чего",
              "For the original point, apply the forward formula to [x:T]. In f(x,T)=Ty² one may take q=y, and then",
            )}
          </p>
          <Latex display>{String.raw`
\Phi_T([x:T])
=
\left[
\left(
\frac{Tx}{T},
\frac{T^2y}{T^2}
\right)
\right]_{\pm y}
=[(x,y)]_{\pm y}.`}</Latex>
          <p>
            {text(
              "Обе композиции тождественны. Это одновременно доказывает существование, инъективность и сюръективность соответствия.",
              "Both compositions are identities. This proves existence, injectivity, and surjectivity at once.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Точная вырожденная граница", "6. The exact degenerate boundary")}</h2>
          <p>
            {text(
              "Четыре удалённые точки соответствуют ровно четырём способам обратить один из множителей f в нуль:",
              "The four removed points correspond exactly to the four ways in which a factor of f can vanish:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{array}{c|c|c}
\text{точка на }E_T & \text{проективная пара} & \text{вырождение}\\ \hline
\mathcal O &[1:0]&n=0\\
(0,0)&[0:1]&m=0\\
(T,0)&[1:1]&m=n\\
(-T,0)&[-1:1]&m=-n
\end{array}`}</Latex>
          <p>
            {text(
              "Других исключений нет: всякая рациональная точка с y≠0 даёт невырожденную пару, а всякая невырожденная пара даёт такую точку.",
              "There are no further exceptions: every rational point with y≠0 gives a nondegenerate pair, and every nondegenerate pair gives such a point.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Прямоугольный треугольник в обеих координатах", "7. The right triangle in both coordinate systems")}</h2>
          <p>
            {text(
              "Равенство f(m,n)=Tq² сразу даёт рациональный прямоугольный треугольник",
              "The equality f(m,n)=Tq² immediately gives the rational right triangle",
            )}
          </p>
          <Latex display>{String.raw`
A=\frac{m^2-n^2}{q},\qquad
B=\frac{2mn}{q},\qquad
H=\frac{m^2+n^2}{q}.`}</Latex>
          <p>
            {text(
              "Действительно, A²+B²=H², а площадь равна",
              "Indeed, A²+B²=H², and the area is",
            )}
          </p>
          <Latex display>{String.raw`
\frac{AB}{2}
=\frac{mn(m^2-n^2)}{q^2}
=\frac{f(m,n)}{q^2}
=T.`}</Latex>
          <p>
            {text(
              "В координатах точки (x,y) тот же треугольник записывается как",
              "In the point coordinates (x,y), the same triangle is",
            )}
          </p>
          <Latex display>{String.raw`
A=\frac{x^2-T^2}{y},\qquad
B=\frac{2Tx}{y},\qquad
H=\frac{x^2+T^2}{y}.`}</Latex>
          <p>
            {text(
              "Подстановка x=Tm/n и y=T²q/n² переводит эти три выражения точно в предыдущие. Поэтому пара параметров, точка эллиптической кривой и треугольник площади T — три координатных представления одного объекта.",
              "Substituting x=Tm/n and y=T²q/n² turns these expressions exactly into the preceding ones. Thus a parameter pair, an elliptic-curve point, and a triangle of area T are three coordinate representations of the same object.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Групповой закон как операция над парами", "8. The group law as an operation on pairs")}</h2>
          <p>
            {text(
              "Чтобы складывать точки, необходимо выбрать один из двух знаков q и тем самым один знак y. После сложения обратное отображение забывает знак результата и возвращает новую проективную пару. В частности, для удвоения точки",
              "To add points, one chooses one of the two signs of q and hence one sign of y. After the addition, the inverse map forgets the sign of the result and returns a new projective pair. In particular, for point doubling,",
            )}
          </p>
          <Latex display>{String.raw`
x(2P)
=
\frac{(x^2+T^2)^2}{4y^2}.`}</Latex>
          <p>
            {text(
              "Для точки, соответствующей [m:n], положим",
              "For the point corresponding to [m:n], put",
            )}
          </p>
          <Latex display>{String.raw`
V=(m^2+n^2)^2,\qquad
D=4f(m,n).`}</Latex>
          <p>
            {text(
              "Подстановка x=Tm/n, y=T²q/n² и f(m,n)=Tq² даёт",
              "Substituting x=Tm/n, y=T²q/n², and f(m,n)=Tq² gives",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
x(2P)
&=\frac{T^4(m^2+n^2)^2/n^4}{4T^4q^2/n^4}\\
&=\frac{(m^2+n^2)^2}{4q^2}\\
&=T\,\frac{V}{D}.
\end{aligned}`}</Latex>
          <p>
            {text(
              "По обратной формуле точке 2P соответствует пара",
              "By the inverse formula, the point 2P corresponds to the pair",
            )}
          </p>
          <Latex display>{String.raw`
[x(2P):T]
=
\left[T\frac VD:T\right]
=[V:D].`}</Latex>
          <p>
            {text(
              "Таким образом, известная саморекурсия параметров является не отдельным семейством решений, а обычным удвоением на каждой фибре E_T. Более общие суммы точек аналогично задают операции над парами, хотя их явные формулы могут быть значительно сложнее.",
              "Thus the familiar self-recurrence of the parameters is not a separate family of solutions but ordinary point doubling on each fiber E_T. More general sums of points similarly define operations on pairs, although their explicit formulas may be considerably more complicated.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("9. Вся поверхность и граница результата", "9. The full surface and the scope of the result")}</h2>
          <p>
            {text(
              "Если разрешить T меняться, кривые E_T образуют поверхность конгруэнтных чисел",
              "Allowing T to vary gives the congruent-number surface",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal E:\qquad y^2=x^3-T^2x,\qquad T\ne0.`}</Latex>
          <p>
            {text(
              "Каждая невырожденная рациональная пара с f(m,n)>0 имеет единственного положительного квадратсвободного представителя T своего квадратного класса и потому попадает ровно на одну такую фибру. Это именно область обычной задачи о конгруэнтных числах.",
              "Every nondegenerate rational pair with f(m,n)>0 has a unique positive squarefree representative T of its square class and therefore lies on exactly one such fiber. This is precisely the domain of the usual congruent-number problem.",
            )}
          </p>
          <p>
            {text(
              "Если сохранять ориентированный знак f, та же теорема дословно работает для любого ненулевого квадратсвободного целого T. При этом E_T=E_{−T}, поскольку уравнение зависит от T², но обратная формула [x:T] различает два знака квадратного класса. Поэтому положительная версия ничего не теряет в геометрии кривой, а знаковое расширение покрывает все ориентированные значения tf.",
              "If the oriented sign of f is retained, the same theorem works verbatim for every nonzero squarefree integer T. Here E_T=E_{−T}, because the equation depends on T², while the inverse formula [x:T] distinguishes the two square-class signs. Thus the positive version loses no curve geometry, and the signed extension covers every oriented tf value.",
            )}
          </p>
          <p>
            {text(
              "Полнота координатного описания не означает готового перечисления точек. Для фиксированного T нахождение группы E_T(ℚ), её ранга и образующих остаётся самостоятельной арифметической задачей. Групповой закон позволяет из известных точек получать новые пары через обратную формулу [x:T], но не гарантирует, что известные точки порождают всю группу.",
              "Completeness of the coordinate description is not a ready enumeration of points. For fixed T, determining E_T(ℚ), its rank, and its generators remains a separate arithmetic problem. The group law turns known points into new pairs through the inverse formula [x:T], but does not guarantee that the known points generate the entire group.",
            )}
          </p>
          <p>
            {text(
              "Итак, F7+ покрывает все решения не списком формул, а биекцией с рациональными точками эллиптической поверхности. Это точная граница утверждения.",
              "Thus F7+ covers every solution not by a list of formulas but by a bijection with rational points on an elliptic surface. This is the exact boundary of the claim.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory">
              {text("К оглавлению теории", "Theory contents")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/fmn-tfmn">
              {text("Функции fmn и tfmn", "The fmn and tfmn functions")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

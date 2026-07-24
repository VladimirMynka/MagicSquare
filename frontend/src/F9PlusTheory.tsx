import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function F9PlusTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page f9-plus-theory-page">
      <TheoryLink className="back-link" to="/theory#elliptic-tfmn">
        ← {text("К циклу об эллиптической геометрии tfmn", "Back to the elliptic geometry of tfmn")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптическая геометрия tfmn · 4.4",
              "Elliptic geometry of tfmn · 4.4",
            )}
          </p>
          <h1>
            {text(
              "F9+: квадратичные подстановки и теорема сокращения",
              "F9+: Quadratic Substitutions and the Cancellation Theorem",
            )}
          </h1>
          <p>
            {text(
              "Однородная квадратичная подстановка превращает равенство квадратных классов двух пифагоровых площадей в условие квадратности одной бинарной квартиты. Все подстановки, для которых это сокращение является полиномиальным тождеством, образуют конечное линейное расположение.",
              "A homogeneous quadratic substitution turns equality of two Pythagorean-area square classes into a single binary-quartic square condition. All substitutions for which this cancellation is a polynomial identity form a finite linear arrangement.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document f9-plus-theory-document">
        <section>
          <h2>{text("1. Прямой остаточный механизм", "1. The direct residual mechanism")}</h2>
          <p>
            {text(
              "Для рациональной пары положим",
              "For a rational pair, put",
            )}
          </p>
          <Latex display>{String.raw`
f(a,b)=ab(a-b)(a+b)=ab(a^2-b^2).`}</Latex>
          <p>
            {text(
              "Ищется подстановка, которая сопоставляет исходной паре (a,b) новую пару (C(a,b),D(a,b)) так, чтобы отношение соответствующих значений f сокращалось до одного однородного многочлена q:",
              "We seek a substitution sending the initial pair (a,b) to a new pair (C(a,b),D(a,b)) such that the quotient of the corresponding f-values reduces to one homogeneous polynomial q:",
            )}
          </p>
          <Latex display>{String.raw`
f(C(a,b),D(a,b))=f(a,b)\,q(a,b).`}</Latex>
          <p>
            {text(
              "Тогда совпадение tf определяется единственным остаточным условием q(a,b)=s². Обозначение F9+ историческое; здесь оно относится ко всему слою таких квадратичных подстановок, а не к одной формуле.",
              "Then equality of tf values is governed by the single residual condition q(a,b)=s². The label F9+ is historical; here it denotes the entire layer of such quadratic substitutions, not one formula.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Общая квадратичная подстановка", "2. The general quadratic substitution")}</h2>
          <p>
            {text(
              "Пусть C и D — произвольные однородные квадратичные формы над ℚ:",
              "Let C and D be arbitrary homogeneous quadratic forms over ℚ:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
C(a,b)&=A a^2+B ab+C_0 b^2,\\
D(a,b)&=E a^2+F ab+G b^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Общий множитель всех шести коэффициентов несущественен. Замена (C,D) на (λC,λD) умножает f(C,D) на λ⁴, то есть не меняет его рациональный квадратный класс. Поэтому коэффициенты естественно рассматриваются проективно.",
              "A common factor of all six coefficients is immaterial. Replacing (C,D) by (λC,λD) multiplies f(C,D) by λ⁴ and hence leaves its rational square class unchanged. The coefficients are therefore naturally projective.",
            )}
          </p>
          <p>
            {text(
              "Разложение числителя имеет четыре квадратичных множителя:",
              "The numerator splits into four quadratic factors:",
            )}
          </p>
          <Latex display>{String.raw`
f(C,D)=C\,D\,(C-D)(C+D).`}</Latex>
          <p>
            {text(
              "Знаменатель, который требуется сократить, состоит из четырёх попарно различных прямых:",
              "The denominator to be cancelled consists of four distinct lines:",
            )}
          </p>
          <Latex display>{String.raw`
f(a,b)=a\,b\,(a-b)(a+b).`}</Latex>
        </section>

        <section>
          <h2>{text("3. Теорема сокращения", "3. The cancellation theorem")}</h2>
          <div className="theorem-block">
            <h3>{text("Теорема F9+", "F9+ theorem")}</h3>
            <p>
              {text(
                "Многочлен f(C,D) делится на f(a,b) тогда и только тогда, когда на каждой из четырёх прямых a=0, b=0, a=b, a=−b тождественно обращается в нуль хотя бы один из четырёх множителей C, D, C−D, C+D.",
                "The polynomial f(C,D) is divisible by f(a,b) if and only if, on each of the four lines a=0, b=0, a=b, and a=−b, at least one of C, D, C−D, and C+D vanishes identically.",
              )}
            </p>
          </div>

          <h3>{text("Необходимость", "Necessity")}</h3>
          <p>
            {text(
              "Если, например, a делит f(C,D), то ограничение f(C,D) на прямую a=0 является нулевым многочленом от b. После ограничения каждый из C, D, C−D, C+D становится константой, умноженной на b². Поскольку ℚ[b] не имеет делителей нуля, произведение равно нулю только тогда, когда один из четырёх множителей равен нулю тождественно. Тот же аргумент применяется к остальным трём прямым.",
              "If, for example, a divides f(C,D), then the restriction of f(C,D) to a=0 is the zero polynomial in b. On that line each of C, D, C−D, and C+D becomes a constant times b². Since ℚ[b] has no zero divisors, their product is zero only when one factor vanishes identically. The same argument applies to the other three lines.",
            )}
          </p>

          <h3>{text("Достаточность", "Sufficiency")}</h3>
          <p>
            {text(
              "Если на каждой базовой прямой исчезает один множитель, то f(C,D) обращается в нуль на этой прямой. Следовательно, соответствующая линейная форма делит f(C,D). Формы a, b, a−b и a+b попарно взаимно просты, поэтому их произведение также делит f(C,D).",
              "If one factor vanishes on every base line, then f(C,D) vanishes on that line. Hence the corresponding linear form divides f(C,D). The forms a, b, a−b, and a+b are pairwise coprime, so their product also divides f(C,D).",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Конечное линейное расположение", "4. The finite linear arrangement")}</h2>
          <p>
            {text(
              "Для каждой из четырёх базовых прямых имеется четыре выбора исчезающего множителя. Получаются 4⁴=256 назначений. Каждое назначение задаёт четыре линейных условия на шесть коэффициентов A,B,C₀,E,F,G.",
              "For each of the four base lines there are four choices of a vanishing factor, giving 4⁴=256 assignments. Every assignment imposes four linear conditions on the six coefficients A, B, C₀, E, F, and G.",
            )}
          </p>
          <p>
            {text(
              "После отождествления одинаковых линейных систем возникают 224 подпространства: 220 проективных прямых и четыре проективные плоскости. Четыре плоскости являются ровно тождественными вырождениями",
              "After identical linear systems are identified, 224 subspaces remain: 220 projective lines and four projective planes. The four planes are precisely the identically degenerate cases",
            )}
          </p>
          <Latex display>{String.raw`
C=0,\qquad D=0,\qquad C=D,\qquad C=-D.`}</Latex>
          <p>
            {text(
              "Ещё 16 из 220 прямых целиком лежат в этих плоскостях. После их удаления остаются 204 проективные прямые, на открытых частях которых f(C,D) не тождественно равно нулю. Это точное покрытие полиномиального слоя до факторизации по естественным симметриям входной и выходной пар.",
              "A further 16 of the 220 lines lie entirely inside those planes. Removing them leaves 204 projective lines whose open parts have f(C,D) not identically zero. This is an exact cover of the polynomial layer before quotienting by the natural symmetries of the input and output pairs.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Что означает число 204", "What the number 204 means")}</h3>
            <p>
              {text(
                "Это число линейных ветвей в выбранных координатах, а не число существенно различных семейств. Перестановки, смены знаков и линейные симметрии формы f могут переводить ветви друг в друга; соответствующий фактор по симметриям здесь не утверждается.",
                "This is the number of linear branches in the chosen coordinates, not the number of essentially distinct families. Swaps, sign changes, and linear symmetries of f may carry branches into one another; no quotient by those symmetries is claimed here.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("5. Остаточная квартита и точный критерий tf", "5. The residual quartic and the exact tf criterion")}</h2>
          <p>
            {text(
              "На любой невырожденной ветви частное",
              "On every nondegenerate branch, the quotient",
            )}
          </p>
          <Latex display>{String.raw`
q(a,b)=\frac{f(C(a,b),D(a,b))}{f(a,b)}`}</Latex>
          <p>
            {text(
              "является однородной формой степени 4. Для рациональной точки, в которой оба значения f ненулевые, выполняется точная эквивалентность",
              "is a homogeneous form of degree 4. At a rational point where both f-values are nonzero, one has the exact equivalence",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{tf}(C(a,b),D(a,b))
=
\operatorname{tf}(a,b)
\iff
q(a,b)\in(\mathbb Q^\times)^2.`}</Latex>
          <p>
            {text(
              "Действительно, два ненулевых рациональных числа имеют одну и ту же свободную от квадратов часть тогда и только тогда, когда их отношение является положительным рациональным квадратом. Если ориентация пары забывается, сменой знака одного выходного параметра можно заменить q на −q.",
              "Indeed, two nonzero rational numbers have the same squarefree part exactly when their quotient is a positive rational square. If pair orientation is forgotten, changing the sign of one output parameter replaces q by −q.",
            )}
          </p>
          <p>
            {text(
              "Однородность делает условие проективным. При b≠0 положим r=a/b и s=b²z. Тогда",
              "Homogeneity makes the condition projective. For b≠0, set r=a/b and s=b²z. Then",
            )}
          </p>
          <Latex display>{String.raw`
s^2=q(a,b)
\iff
z^2=q(r,1).`}</Latex>
        </section>

        <section>
          <h2>{text("6. Почему возникают кривые рода 1", "6. Why genus-one curves appear")}</h2>
          <p>
            {text(
              "Если квартита q(r,1) квадратсвободна и имеет степень 3 или 4, гладкая проективная модель кривой z²=q(r,1) имеет род 1. Её факторизация определяет не род, а доступность рациональной исходной точки и структуру 2-кручения.",
              "If the quartic q(r,1) is squarefree and has degree 3 or 4, the smooth projective model of z²=q(r,1) has genus one. Its factorization controls not the genus but the availability of a rational base point and the structure of 2-torsion.",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Факторизация q", "Factorization of q")}</th>
                  <th>{text("Геометрический смысл", "Geometric meaning")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1+1+2</td>
                  <td>
                    {text(
                      "Кривая рода 1 с рациональными точками над линейными корнями; после выбора начала — эллиптическая кривая с видимым рациональным 2-кручением.",
                      "A genus-one curve with rational points above the linear roots; after choosing an origin, an elliptic curve with visible rational 2-torsion.",
                    )}
                  </td>
                </tr>
                <tr>
                  <td>2+2</td>
                  <td>
                    {text(
                      "Кривая рода 1, но рациональная точка не гарантирована. В общем случае это торсор под её якобианом.",
                      "A genus-one curve, but a rational point is not guaranteed. In general it is a torsor under its Jacobian.",
                    )}
                  </td>
                </tr>
                <tr>
                  <td>1+1+1+1</td>
                  <td>
                    {text(
                      "Кривая рода 1 с четырьмя рациональными точками ветвления; после выбора начала видна полная подгруппа рационального 2-кручения.",
                      "A genus-one curve with four rational branch points; after choosing an origin, its full rational 2-torsion subgroup is visible.",
                    )}
                  </td>
                </tr>
                <tr>
                  <td>{text("Повторный множитель", "Repeated factor")}</td>
                  <td>
                    {text(
                      "Проективная кривая сингулярна; после нормализации получается род 0 либо вырожденный случай.",
                      "The projective curve is singular; its normalization has genus zero or is degenerate.",
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>{text("7. Точная область полноты", "7. Exact completeness boundary")}</h2>
          <div className="theorem-block">
            <h3>{text("Что классифицировано полностью", "What is classified completely")}</h3>
            <p>
              {text(
                "Теорема охватывает все пары однородных квадратичных форм C,D, для которых f(C,D)/f(a,b) является многочленом. Внутри каждой такой подстановки уравнение z²=q(r,1) является необходимым и достаточным условием совпадения ориентированных значений tf.",
                "The theorem covers every pair of homogeneous quadratic forms C,D for which f(C,D)/f(a,b) is a polynomial. Within each such substitution, z²=q(r,1) is necessary and sufficient for equality of the oriented tf values.",
              )}
            </p>
          </div>
          <p>
            {text(
              "Не утверждается, что этим исчерпываются все квадратичные способы получать совпадения tf: рациональное отношение без полиномиального сокращения также может становиться квадратом на некоторой кривой. Тем более не классифицируются все совпадения tf между произвольными рациональными парами — их полные координатные описания дают F4+ и F7+.",
              "This does not exhaust every quadratic way of producing equal tf values: a rational quotient without polynomial cancellation may still become a square on a curve. Nor does it classify all coincidences between arbitrary rational pairs; their complete coordinate descriptions are supplied by F4+ and F7+.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Роль F9+", "8. The role of F9+")}</h2>
          <p>
            {text(
              "F4+ и F7+ описывают все решения в двух универсальных системах координат, но сами по себе не перечисляют рациональные точки. F9+ решает другую задачу: он выделяет явные однопараметрические слои, на которых поиск пар переносится на конкретные кривые рода 1. Рациональные точки этих кривых непосредственно порождают пары с совпадающим tf.",
              "F4+ and F7+ describe all solutions in two universal coordinate systems, but do not themselves enumerate rational points. F9+ serves a different purpose: it selects explicit one-parameter layers on which the search for pairs is transferred to concrete genus-one curves. Rational points on those curves directly produce pairs with equal tf.",
            )}
          </p>
          <nav className="proof-navigation" aria-label={text("Навигация по теории", "Theory navigation")}>
            <TheoryLink className="button button-primary" to="/theory/f9-plus-elliptic-layers">
              {text("Далее: эллиптические слои F9+", "Next: the elliptic layers of F9+")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/tf-pair-generation">
              {text("F7+ и F4+", "F7+ and F4+")}
            </TheoryLink>
          </nav>
        </section>
      </div>
    </article>
  );
}

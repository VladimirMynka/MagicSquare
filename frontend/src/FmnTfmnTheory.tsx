import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function FmnTfmnTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page fmn-tfmn-theory-page">
      <TheoryLink className="back-link" to="/theory#partial-configurations">
        ← {text("К циклу о частичных конфигурациях", "Back to the partial-configurations series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Частичные квадратные конфигурации · 3.2",
              "Partial square configurations · 3.2",
            )}
          </p>
          <h1>
            {text(
              "Функции fmn и tfmn",
              "The fmn and tfmn functions",
            )}
          </h1>
          <p>
            {text(
              "Функция fmn(m,n) одновременно выражает площадь пифагорового треугольника и четверть шага параметризованной прогрессии квадратов. Функция tfmn(m,n) сохраняет только квадратный класс этой величины. Равенство двух tfmn является точным критерием того, что две прогрессии можно масштабировать до общего шага.",
              "The function fmn(m,n) is simultaneously the area of a Pythagorean triangle and one quarter of the difference in a parametrized progression of squares. The function tfmn(m,n) retains only the square class of that quantity. Equality of two tfmn values is the exact criterion for scaling two progressions to a common difference.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document fmn-tfmn-theory-document">
        <section>
          <h2>{text("1. Площадь и шаг прогрессии", "1. Area and progression difference")}</h2>
          <p>
            {text("Для ненулевых рациональных m,n положим", "For nonzero rational m,n, define")}
          </p>
          <Latex display>{String.raw`
\operatorname{fmn}(m,n)=f(m,n)=mn(m^2-n^2)
=mn(m-n)(m+n).`}</Latex>
          <p>
            {text(
              "Эта форма возникает из классической параметризации пифагоровых троек:",
              "This form arises from the classical parametrization of Pythagorean triples:",
            )}
          </p>
          <Latex display>{String.raw`
(m^2-n^2)^2+(2mn)^2=(m^2+n^2)^2,\qquad
\frac{(m^2-n^2)(2mn)}2=f(m,n).`}</Latex>
          <p>
            {text(
              "При m>n>0 значение f(m,n) является площадью прямоугольного треугольника с катетами m²−n² и 2mn. Для произвольного порядка и знаков параметров f хранит также ориентацию.",
              "For m>n>0, the value f(m,n) is the area of the right triangle with legs m²−n² and 2mn. For arbitrary orders and signs of the parameters, f also records orientation.",
            )}
          </p>
          <p>
            {text(
              "Связь с арифметическими прогрессиями квадратов получается из тождеств",
              "The connection with arithmetic progressions of squares follows from the identities",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
(m^2+n^2)^2-4f(m,n)&=(-m^2+2mn+n^2)^2,\\
(m^2+n^2)^2+4f(m,n)&=(m^2+2mn-n^2)^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Следовательно, три выражения",
              "Consequently, the three expressions",
            )}
          </p>
          <Latex display>{String.raw`
V-4f(m,n),\qquad V,\qquad V+4f(m,n),
\qquad V=(m^2+n^2)^2,`}</Latex>
          <p>
            {text(
              "являются квадратами и образуют арифметическую прогрессию с ориентированным шагом 4f(m,n). Именно это тождество связывает fmn с восемью прогрессиями магического квадрата.",
              "are squares and form an arithmetic progression with oriented difference 4f(m,n). This identity is what connects fmn with the eight progressions in a magic square.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Квадратные классы", "2. Square classes")}</h2>
          <p>
            {text(
              "Для ненулевых рациональных чисел отношение «отличаются в рациональный квадрат раз» задаётся фактор-группой",
              "For nonzero rational numbers, the relation “differ by a rational-square factor” is encoded by the quotient group",
            )}
          </p>
          <Latex display>{String.raw`
\mathbb Q^\times/(\mathbb Q^\times)^2,\qquad
[a]=[b]\ \Longleftrightarrow\ \frac ab\in(\mathbb Q^\times)^2.`}</Latex>
          <p>
            {text(
              "Для целого N≠0 этот абстрактный класс имеет единственного знакового бесквадратного представителя. Если",
              "For an integer N≠0, this abstract class has a unique signed squarefree representative. If",
            )}
          </p>
          <Latex display>{String.raw`
N=\operatorname{sgn}(N)\prod_p p^{e_p},`}</Latex>
          <p>{text("то определим", "define")}</p>
          <Latex display>{String.raw`
\tau(N)=\operatorname{sgn}(N)\prod_{e_p\ \mathrm{odd}}p.`}</Latex>
          <p>
            {text(
              "Действительно, N=τ(N)q², где q=∏p^{⌊eₚ/2⌋}. Чётности всех показателей простых и знак неизменны при умножении на ненулевой рациональный квадрат, поэтому τ(N) определяется квадратным классом и определяет его однозначно.",
              "Indeed, N=τ(N)q² with q=∏p^{⌊eₚ/2⌋}. The parities of all prime exponents and the sign are unchanged by multiplication by a nonzero rational square, so τ(N) is determined by the square class and determines it uniquely.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Определение tfmn", "Definition of tfmn")}</h3>
            <Latex display>{String.raw`
\operatorname{tfmn}(m,n)=\tau\!\left(\operatorname{fmn}(m,n)\right),
\qquad m,n\in\mathbb Z,\quad f(m,n)\ne0.`}</Latex>
            <p>
              {text(
                "Таким образом, fmn хранит величину и масштаб, а tfmn — только её квадратный класс. При f(m,n)=0 прогрессия постоянна и tfmn не определяется.",
                "Thus fmn retains magnitude and scale, whereas tfmn retains only the square class. When f(m,n)=0, the progression is constant and tfmn is undefined.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("3. tfmn как конгруэнтное число", "3. tfmn as a congruent number")}</h2>
          <p>
            {text(
              "Пусть m>n>0 — целые числа и",
              "Let m>n>0 be integers and write",
            )}
          </p>
          <Latex display>{String.raw`
f(m,n)=Tq^2,\qquad T=\operatorname{tfmn}(m,n)>0.`}</Latex>
          <p>
            {text(
              "Разделим стороны соответствующего пифагорова треугольника на q:",
              "Divide the sides of the corresponding Pythagorean triangle by q:",
            )}
          </p>
          <Latex display>{String.raw`
A=\frac{m^2-n^2}{q},\qquad
B=\frac{2mn}{q},\qquad
H=\frac{m^2+n^2}{q}.`}</Latex>
          <p>
            {text(
              "Получается рациональный прямоугольный треугольник площади",
              "This gives a rational right triangle of area",
            )}
          </p>
          <Latex display>{String.raw`
\frac{AB}{2}=\frac{mn(m^2-n^2)}{q^2}=T.`}</Latex>
          <p>
            {text(
              "Следовательно, положительное tfmn-значение является квадратсвободным конгруэнтным числом. Здесь «каноничность» означает только выбор бесквадратного представителя квадратного класса: различные пары (m,n) могут задавать одно и то же T.",
              "Therefore a positive tfmn value is a squarefree congruent number. Here “canonical” refers only to the choice of the squarefree representative of a square class: distinct pairs (m,n) may determine the same T.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Критерии равенства tfmn", "4. Criteria for equality of tfmn")}</h2>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <p>
              {text(
                "Пусть F₁ и F₂ — два ненулевых целых значения fmn и G=gcd(|F₁|,|F₂|). Следующие условия эквивалентны:",
                "Let F₁ and F₂ be two nonzero integral fmn values and let G=gcd(|F₁|,|F₂|). The following conditions are equivalent:",
              )}
            </p>
            <ol>
              <li><Latex>{String.raw`\tau(F_1)=\tau(F_2)`}</Latex>;</li>
              <li><Latex>{String.raw`F_1/F_2`}</Latex> {text("является квадратом в ℚ", "is a square in ℚ")};</li>
              <li><Latex>{String.raw`F_1F_2`}</Latex> {text("является положительным полным квадратом", "is a positive perfect square")};</li>
              <li>
                {text("знаки F₁,F₂ совпадают, а ", "F₁,F₂ have the same sign, and ")}
                <Latex>{String.raw`|F_1|/G`}</Latex>
                {text(" и ", " and ")}
                <Latex>{String.raw`|F_2|/G`}</Latex>
                {text(" являются полными квадратами", " are perfect squares")}.
              </li>
            </ol>
          </div>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Запишем Fᵢ=Tᵢqᵢ², где Tᵢ=τ(Fᵢ) — знаковое бесквадратное число. Отношение F₁/F₂ является квадратом тогда и только тогда, когда совпадают знак и чётности показателей каждого простого, то есть T₁=T₂. Произведение F₁F₂ является положительным квадратом при том же условии.",
              "Write Fᵢ=Tᵢqᵢ², where Tᵢ=τ(Fᵢ) is signed and squarefree. The quotient F₁/F₂ is a square exactly when the sign and the parity of every prime exponent agree, that is, exactly when T₁=T₂. The product F₁F₂ is a positive square under the same condition.",
            )}
          </p>
          <p>
            {text(
              "Если T₁=T₂=T, то G=|T|gcd(q₁,q₂)², поэтому оба частных |Fᵢ|/G — квадраты. Обратно, квадратность этих двух частных и совпадение знаков делают их отношение F₁/F₂ рациональным квадратом. Тем самым все четыре условия эквивалентны.",
              "If T₁=T₂=T, then G=|T|gcd(q₁,q₂)², so both quotients |Fᵢ|/G are squares. Conversely, if those two quotients are squares and the signs agree, their quotient F₁/F₂ is a rational square. Hence all four conditions are equivalent.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Согласование масштабов прогрессий", "5. Matching the scales of progressions")}</h2>
          <p>
            {text(
              "Умножение всех трёх членов прогрессии квадратов на λ² сохраняет квадратность и умножает её шаг на λ². Поэтому для двух параметрических прогрессий с fmn-значениями F₁,F₂ общий ориентированный шаг существует тогда и только тогда, когда найдутся ненулевые α,β∈ℚ такие, что",
              "Multiplying all three terms of a progression of squares by λ² preserves squarehood and multiplies its difference by λ². Thus two parametrized progressions with fmn values F₁,F₂ admit a common oriented difference exactly when there exist nonzero α,β∈ℚ such that",
            )}
          </p>
          <Latex display>{String.raw`
4\alpha^2F_1=4\beta^2F_2.`}</Latex>
          <p>
            {text(
              "После сокращения это равенство совпадает со вторым условием предыдущей теоремы. Следовательно,",
              "After cancellation, this equality is precisely the second condition of the preceding theorem. Therefore,",
            )}
          </p>
          <Latex display>
            {text(
              String.raw`\operatorname{tfmn}(m_1,n_1)=\operatorname{tfmn}(m_2,n_2)
\iff
\text{прогрессии масштабируются до общего ориентированного шага}.`,
              String.raw`\operatorname{tfmn}(m_1,n_1)=\operatorname{tfmn}(m_2,n_2)
\iff
\text{the progressions scale to a common oriented difference}.`,
            )}
          </Latex>
          <p>
            {text(
              "Конструктивно, если F₁=Tu² и F₂=Tv², первую прогрессию следует умножить на v², а вторую на u². Их шаги станут равны 4Tu²v². Это и есть арифметическое содержание tfmn-совпадения.",
              "Constructively, if F₁=Tu² and F₂=Tv², multiply the first progression by v² and the second by u². Their differences both become 4Tu²v². This is the arithmetic content of an equality of tfmn values.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Симметрии параметров", "6. Parameter symmetries")}</h2>
          <p>
            {text(
              "Часть равенств tfmn возникает из замен параметров, которые не меняют квадратный класс или только обращают ориентацию прогрессии:",
              "Some tfmn equalities arise from parameter substitutions that preserve the square class or merely reverse the orientation of the progression:",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Замена", "Substitution")}</th>
                  <th>{text("Изменение fmn", "Effect on fmn")}</th>
                  <th>{text("Смысл", "Meaning")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Latex>{String.raw`(m,n)\mapsto(\lambda m,\lambda n)`}</Latex></td>
                  <td><Latex>{String.raw`f\mapsto\lambda^4f`}</Latex></td>
                  <td>{text("общий масштаб параметров", "common parameter scale")}</td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`(m,n)\mapsto(-m,-n)`}</Latex></td>
                  <td><Latex>{String.raw`f\mapsto f`}</Latex></td>
                  <td>{text("одновременная смена знаков", "simultaneous sign change")}</td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`(m,n)\mapsto(n,m)`}</Latex></td>
                  <td><Latex>{String.raw`f\mapsto-f`}</Latex></td>
                  <td>{text("обращение прогрессии", "reversal of the progression")}</td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`(m,n)\mapsto(m,-n)`}</Latex></td>
                  <td><Latex>{String.raw`f\mapsto-f`}</Latex></td>
                  <td>{text("обращение прогрессии", "reversal of the progression")}</td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`(m,n)\mapsto(m+n,m-n)`}</Latex></td>
                  <td><Latex>{String.raw`f\mapsto4f`}</Latex></td>
                  <td>{text("та же нормированная прогрессия", "the same normalized progression")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Последняя строка следует из",
              "The last row follows from",
            )}
          </p>
          <Latex display>{String.raw`
f(m+n,m-n)=4mn(m^2-n^2)=4f(m,n),`}</Latex>
          <p>
            {text(
              "а средний квадрат V=(m²+n²)² при той же замене также умножается на 4. Поэтому отношение 4f/V, то есть dir, не меняется. При классификации неориентированных прогрессий дополнительно отождествляются противоположные знаки tfmn.",
              "while the middle square V=(m²+n²)² is also multiplied by 4 under the same substitution. Hence the ratio 4f/V, namely dir, is unchanged. When unoriented progressions are classified, opposite signs of tfmn are identified as well.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Саморекурсия tfmn", "7. The tfmn self-recurrence")}</h2>
          <p>
            {text(
              "Одна прогрессия квадратов сама задаёт новую пару параметров. Положим",
              "A progression of squares itself supplies a new parameter pair. Set",
            )}
          </p>
          <Latex display>{String.raw`
V=(m^2+n^2)^2,\qquad D=4f(m,n).`}</Latex>
          <p>
            {text(
              "Если r=−m²+2mn+n², s=m²+n² и w=m²+2mn−n², то V=s², V−D=r² и V+D=w². Поэтому",
              "If r=−m²+2mn+n², s=m²+n², and w=m²+2mn−n², then V=s², V−D=r², and V+D=w². Therefore",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
f(V,D)
&=VD(V^2-D^2)\\
&=s^2\cdot4f(m,n)\cdot r^2w^2\\
&=f(m,n)(2srw)^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Отношение f(V,D)/f(m,n) является квадратом, и теорема о квадратных классах даёт тождество",
              "The quotient f(V,D)/f(m,n) is a square, and the square-class theorem gives the identity",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{tfmn}(m,n)
=
\operatorname{tfmn}\!\left((m^2+n^2)^2,\;4f(m,n)\right).`}</Latex>
        </section>

        <section>
          <h2>{text("8. Эллиптическая кривая одного tfmn", "8. The elliptic curve of a tfmn value")}</h2>
          <p>
            {text(
              "Для T=tfmn(m,n)>0 и f(m,n)=Tq² рациональный треугольник из третьего раздела соответствует точке на конгруэнтной эллиптической кривой",
              "For T=tfmn(m,n)>0 and f(m,n)=Tq², the rational triangle from Section 3 corresponds to a point on the congruent-number elliptic curve",
            )}
          </p>
          <Latex display>{String.raw`
E_T:\quad y^2=x^3-T^2x.`}</Latex>
          <p>
            {text("В координатах m,n эта точка записывается особенно просто:", "In terms of m,n, this point has the particularly simple form")}
          </p>
          <Latex display>{String.raw`
P_{m,n}=
\left(
\frac{Tm}{n},
\frac{T^2q}{n^2}
\right).`}</Latex>
          <p>
            {text(
              "Подстановка f(m,n)=Tq² непосредственно проверяет уравнение кривой. Обратное соответствие для точки (x,y) с y≠0 задаёт рациональный прямоугольный треугольник",
              "Substitution of f(m,n)=Tq² directly verifies the curve equation. Conversely, a point (x,y) with y≠0 gives the rational right triangle",
            )}
          </p>
          <Latex display>{String.raw`
A=\frac{x^2-T^2}{y},\qquad
B=\frac{2Tx}{y},\qquad
H=\frac{x^2+T^2}{y},`}</Latex>
          <p>
            {text(
              "у которого A²+B²=H² и AB/2=T. Параметризация этого треугольника восстанавливает рациональное отношение m:n. Поэтому множество пар с фиксированным tfmn=T является параметрическим представлением рациональных точек одной и той же кривой E_T с учётом описанных симметрий.",
              "for which A²+B²=H² and AB/2=T. Parametrizing this triangle recovers the rational ratio m:n. Thus the pairs with fixed tfmn=T parametrize rational points on one and the same curve E_T, modulo the symmetries described above.",
            )}
          </p>
          <p>
            {text(
              "Саморекурсия предыдущего раздела имеет на этой кривой стандартный смысл. Формула удвоения даёт",
              "The self-recurrence of the preceding section has a standard meaning on this curve. The duplication formula gives",
            )}
          </p>
          <Latex display>{String.raw`
x(2P_{m,n})
=
T\,\frac{(m^2+n^2)^2}{4f(m,n)}
=T\,\frac VD.`}</Latex>
          <p>
            {text(
              "Это x-координата точки, построенной из новой пары (V,D); выбор ориентации определяет знак y. Следовательно, саморекурсия является удвоением точки, а не независимым источником второй точки на E_T.",
              "This is the x-coordinate of the point constructed from the new pair (V,D); the choice of orientation determines the sign of y. Thus the self-recurrence is point doubling rather than an independent source of a second point on E_T.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("9. От tfmn к конфигурациям 6/9", "9. From tfmn to 6/9 configurations")}</h2>
          <p>
            {text(
              "Равенство tfmn решает задачу согласования шагов двух прогрессий квадратов. Чтобы разместить обе прогрессии в одном магическом квадрате, необходимо дополнительно согласовать их средние члены, общие клетки и линейные координаты E,x,y. Эти условия зависят от позиционного типа конфигурации.",
              "Equality of tfmn solves the problem of matching the differences of two progressions of squares. To place both progressions in one magic square, their middle terms, shared entries, and linear coordinates E,x,y must also be compatible. Those conditions depend on the positional type of the configuration.",
            )}
          </p>
          <p>
            {text(
              "Для классов 6/9 с двумя параллельными прогрессиями tfmn служит естественной арифметической координатой: сначала выбираются две точки одной кривой E_T, затем решаются оставшиеся уравнения их размещения в общей форме магического квадрата. В исследованных классах дополнительные уравнения размещения приводят к коникам и эллиптическим поверхностям конкретных семейств.",
              "For 6/9 classes containing two parallel progressions, tfmn is the natural arithmetic coordinate: one first chooses two points on the same curve E_T and then solves the remaining equations that place them in the general form of a magic square. In the classes studied so far, the additional placement equations lead to conics and elliptic surfaces associated with particular families.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/proofs/general">
              {text("Общая теория масок 4/9 и 5/9", "General theory of 4/9 and 5/9 patterns")}{" "}
              <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/arithmetic-progressions-dir">
              {text("Прогрессии квадратов и dir", "Progressions of squares and dir")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

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
              "fmn и tfmn",
              "fmn and tfmn",
            )}
          </h1>
          <p>
            {text(
              "fmn и tfmn — названия двух связанных конструкций; сами функции обозначаются f и tf. Функция f(m,n) одновременно выражает площадь пифагорового треугольника и четверть шага параметризованной прогрессии квадратов, а tf(m,n)=t(f(m,n)) является свободной от квадратов частью f(m,n). Равенство двух значений tf служит точным критерием того, что две прогрессии можно масштабировать до общего шага.",
              "fmn and tfmn are the names of two related constructions; the functions themselves are denoted by f and tf. The function f(m,n) is simultaneously the area of a Pythagorean triangle and one quarter of the difference in a parametrized progression of squares, while tf(m,n)=t(f(m,n)) is the squarefree part of f(m,n). Equality of two tf values is the exact criterion for scaling two progressions to a common difference.",
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
f(m,n)=mn(m^2-n^2)
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
              "являются квадратами и образуют арифметическую прогрессию с ориентированным шагом 4f(m,n). Именно это тождество лежит в основе применения конструкции fmn к восьми прогрессиям магического квадрата.",
              "are squares and form an arithmetic progression with oriented difference 4f(m,n). This identity underlies the application of the fmn construction to the eight progressions in a magic square.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Свободная от квадратов часть", "2. The squarefree part")}</h2>
          <p>
            {text(
              "Для рационального r∈ℚ× обозначим через t(r) свободную от квадратов часть r. Это единственное свободное от квадратов целое число того же знака, для которого",
              "For a rational number r∈ℚ×, let t(r) denote the squarefree part of r. It is the unique squarefree integer with the same sign as r for which",
            )}
          </p>
          <Latex display>{String.raw`
r=t(r)q^2,\qquad q\in\mathbb Q_{>0}.`}</Latex>
          <p>
            {text(
              "Запишем рациональное число через его p-адические показатели:",
              "Write the rational number in terms of its p-adic valuations:",
            )}
          </p>
          <Latex display>{String.raw`
r=\operatorname{sgn}(r)\prod_p p^{v_p(r)},
\qquad v_p(r)\in\mathbb Z,`}</Latex>
          <p>{text("то", "then")}</p>
          <Latex display>{String.raw`
t(r)=\operatorname{sgn}(r)
\prod_{v_p(r)\ \mathrm{odd}}p.`}</Latex>
          <p>
            {text(
              "Здесь нечётность имеет обычный смысл и для отрицательных показателей. После удаления из каждого vₚ(r) его остатка по модулю 2 все показатели становятся чётными, а оставшееся произведение является квадратом рационального числа. Единственность следует из того, что знак t(r) задан знаком r, а показатель каждого простого в квадратсвободном представителе может быть только 0 или 1 и обязан совпадать с vₚ(r) по модулю 2.",
              "Parity has its usual meaning for negative valuations as well. Removing the residue of every vₚ(r) modulo 2 leaves only even exponents, and their product is a rational square. Uniqueness follows because the sign of t(r) is fixed by the sign of r, while every prime exponent in a squarefree representative can only be 0 or 1 and must agree with vₚ(r) modulo 2.",
            )}
          </p>
          <p>
            {text(
              "Для любой записи r=a/b с ненулевыми целыми a,b получается особенно простая формула:",
              "For any representation r=a/b with nonzero integers a,b, this gives the particularly simple formula",
            )}
          </p>
          <Latex display>{String.raw`
t\!\left(\frac ab\right)=t(ab),`}</Latex>
          <p>
            {text(
              "поскольку a/b=ab/b². Формула не зависит от выбора числителя и знаменателя: если a/b=c/d, то a/c=b/d, а потому ab/(cd)=(a/c)² — рациональный квадрат.",
              "because a/b=ab/b². The formula is independent of the chosen numerator and denominator: if a/b=c/d, then a/c=b/d, and hence ab/(cd)=(a/c)² is a rational square.",
            )}
          </p>
          <p>
            {text(
              "На языке квадратных классов это означает",
              "In the language of square classes, this means",
            )}
          </p>
          <Latex display>{String.raw`
t(A)=t(B)
\iff
\frac AB\in(\mathbb Q^\times)^2,
\qquad A,B\in\mathbb Q^\times.`}</Latex>
          <p>
            {text(
              "Таким образом, t(r) является каноническим целым представителем класса r в группе ℚ×/(ℚ×)².",
              "Thus t(r) is the canonical integral representative of the class of r in ℚ×/(ℚ×)².",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Определение функции tf", "Definition of the function tf")}</h3>
            <Latex display>{String.raw`
\operatorname{tf}(m,n)=t\!\left(f(m,n)\right),
\qquad m,n\in\mathbb Q,\quad f(m,n)\ne0.`}</Latex>
            <p>
              {text(
                "Таким образом, tf(m,n) — свободная от квадратов часть f(m,n). При f(m,n)=0 прогрессия постоянна и tf не определяется.",
                "Thus tf(m,n) is the squarefree part of f(m,n). When f(m,n)=0, the progression is constant and tf is undefined.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("3. tf(m,n) как конгруэнтное число", "3. tf(m,n) as a congruent number")}</h2>
          <p>
            {text(
              "Пусть m>n>0 — целые числа и",
              "Let m>n>0 be integers and write",
            )}
          </p>
          <Latex display>{String.raw`
f(m,n)=Tq^2,\qquad T=\operatorname{tf}(m,n)>0.`}</Latex>
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
              "Следовательно, положительное значение tf(m,n) является свободной от квадратов частью площади и одновременно конгруэнтным числом. Различные пары (m,n) могут иметь одну и ту же свободную от квадратов часть и потому задавать одно и то же T.",
              "Therefore a positive value of tf(m,n) is the squarefree part of the area and is also a congruent number. Distinct pairs (m,n) may have the same squarefree part and hence determine the same T.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Критерии равенства значений tf", "4. Criteria for equality of tf values")}</h2>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <p>
              {text(
                "Пусть Fᵢ=f(mᵢ,nᵢ) — два ненулевых целых значения функции f и G=gcd(|F₁|,|F₂|). Следующие условия эквивалентны:",
                "Let Fᵢ=f(mᵢ,nᵢ) be two nonzero integral values of f and let G=gcd(|F₁|,|F₂|). The following conditions are equivalent:",
              )}
            </p>
            <ol>
              <li><Latex>{String.raw`t(F_1)=t(F_2)`}</Latex>;</li>
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
              "Запишем Fᵢ=Tᵢqᵢ², где Tᵢ=t(Fᵢ) — свободная от квадратов часть Fᵢ. Отношение F₁/F₂ является квадратом тогда и только тогда, когда совпадают знак и чётности показателей каждого простого, то есть T₁=T₂. Произведение F₁F₂ является положительным квадратом при том же условии.",
              "Write Fᵢ=Tᵢqᵢ², where Tᵢ=t(Fᵢ) is the squarefree part of Fᵢ. The quotient F₁/F₂ is a square exactly when the sign and the parity of every prime exponent agree, that is, exactly when T₁=T₂. The product F₁F₂ is a positive square under the same condition.",
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
              "Умножение всех трёх членов прогрессии квадратов на λ² сохраняет квадратность и умножает её шаг на λ². Поэтому для двух параметрических прогрессий со значениями F₁=f(m₁,n₁) и F₂=f(m₂,n₂) общий ориентированный шаг существует тогда и только тогда, когда найдутся ненулевые α,β∈ℚ такие, что",
              "Multiplying all three terms of a progression of squares by λ² preserves squarehood and multiplies its difference by λ². Thus two parametrized progressions with values F₁=f(m₁,n₁) and F₂=f(m₂,n₂) admit a common oriented difference exactly when there exist nonzero α,β∈ℚ such that",
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
              String.raw`\operatorname{tf}(m_1,n_1)=\operatorname{tf}(m_2,n_2)
\iff
\text{прогрессии масштабируются до общего ориентированного шага}.`,
              String.raw`\operatorname{tf}(m_1,n_1)=\operatorname{tf}(m_2,n_2)
\iff
\text{the progressions scale to a common oriented difference}.`,
            )}
          </Latex>
          <p>
            {text(
              "Конструктивно, если F₁=Tu² и F₂=Tv², первую прогрессию следует умножить на v², а вторую на u². Их шаги станут равны 4Tu²v². Это и есть арифметическое содержание равенства значений tf.",
              "Constructively, if F₁=Tu² and F₂=Tv², multiply the first progression by v² and the second by u². Their differences both become 4Tu²v². This is the arithmetic content of equality between tf values.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Симметрии параметров", "6. Parameter symmetries")}</h2>
          <p>
            {text(
              "Часть равенств значений tf возникает из замен параметров, которые не меняют квадратный класс или только обращают ориентацию прогрессии:",
              "Some equalities between tf values arise from parameter substitutions that preserve the square class or merely reverse the orientation of the progression:",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Замена", "Substitution")}</th>
                  <th>{text("Изменение f", "Effect on f")}</th>
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
              "Последняя строка непосредственно следует из факторизации f(a,b)=ab(a+b)(a−b):",
              "The last row follows immediately from the factorization f(a,b)=ab(a+b)(a−b):",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
f(m+n,m-n)
&=(m+n)(m-n)\cdot2m\cdot2n\\
&=4f(m,n).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Средний квадрат V=(m²+n²)² при той же замене также умножается на 4. Поэтому отношение 4f/V, то есть dir, не меняется. Поскольку множитель 4 является квадратом, значение tf также сохраняется. При классификации неориентированных прогрессий дополнительно отождествляются противоположные знаки tf.",
              "The middle square V=(m²+n²)² is also multiplied by 4 under the same substitution. Hence the ratio 4f/V, namely dir, is unchanged. Since the factor 4 is a square, the value of tf is preserved as well. When unoriented progressions are classified, opposite signs of tf are identified as well.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Саморекурсия функции tf", "7. The self-recurrence of tf")}</h2>
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
\operatorname{tf}(m,n)
=
\operatorname{tf}\!\left((m^2+n^2)^2,\;4f(m,n)\right).`}</Latex>
        </section>

        <section>
          <h2>{text("8. От фиксированного tf к F7+", "8. From fixed tf to F7+")}</h2>
          <p>
            {text(
              "Фиксированное положительное значение T=tf(m,n) задаёт конгруэнтную эллиптическую кривую",
              "A fixed positive value T=tf(m,n) determines the congruent-number elliptic curve",
            )}
          </p>
          <Latex display>{String.raw`
E_T:\quad y^2=x^3-T^2x.`}</Latex>
          <p>
            {text(
              "Это не только источник примеров. После проективного отождествления общего масштаба пары существует точная биекция между всеми невырожденными рациональными парами фиксированного квадратного класса и нетривиальными рациональными точками E_T с точностью до знака y. Отдельная статья F7+ выводит оба отображения, доказывает их взаимную обратность и описывает точную вырожденную границу.",
              "This is not merely a source of examples. After quotienting parameter pairs by their common scale, there is an exact bijection between all nondegenerate rational pairs of the fixed square class and the nontrivial rational points of E_T, up to the sign of y. The separate F7+ article derives both maps, proves that they are inverse, and describes the exact degenerate boundary.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/f7-plus">
              {text("F7+: полная биекция", "F7+: the complete bijection")}{" "}
              <span>→</span>
            </TheoryLink>
          </div>
        </section>

        <section>
          <h2>{text("9. От метода tfmn к конфигурациям 6/9", "9. From the tfmn method to 6/9 configurations")}</h2>
          <p>
            {text(
              "Равенство значений tf решает задачу согласования шагов двух прогрессий квадратов. Чтобы разместить обе прогрессии в одном магическом квадрате, необходимо дополнительно согласовать их средние члены, общие клетки и линейные координаты E,x,y. Эти условия зависят от позиционного типа конфигурации.",
              "Equality of tf values solves the problem of matching the differences of two progressions of squares. To place both progressions in one magic square, their middle terms, shared entries, and linear coordinates E,x,y must also be compatible. Those conditions depend on the positional type of the configuration.",
            )}
          </p>
          <p>
            {text(
              "Для классов 6/9 с двумя параллельными прогрессиями значение tf служит естественной арифметической координатой метода tfmn: сначала выбираются две точки одной кривой E_T, затем решаются оставшиеся уравнения их размещения в общей форме магического квадрата. В исследованных классах дополнительные уравнения размещения приводят к коникам и эллиптическим поверхностям конкретных семейств.",
              "For 6/9 classes containing two parallel progressions, the tf value is the natural arithmetic coordinate of the tfmn method: one first chooses two points on the same curve E_T and then solves the remaining equations that place them in the general form of a magic square. In the classes studied so far, the additional placement equations lead to conics and elliptic surfaces associated with particular families.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/f7-plus">
              {text("F7+: эллиптическая поверхность", "F7+: the elliptic surface")}{" "}
              <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/early-tf-families">
              {text("Ранняя классификация", "The early classification")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

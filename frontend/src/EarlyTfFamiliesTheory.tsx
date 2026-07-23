import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function EarlyTfFamiliesTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page early-tf-families-theory-page">
      <TheoryLink className="back-link" to="/theory#partial-configurations">
        ← {text("К циклу о частичных конфигурациях", "Back to the partial-configurations series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Частичные квадратные конфигурации · 3.3",
              "Partial square configurations · 3.3",
            )}
          </p>
          <h1>
            {text(
              "Ранние семейства F1–F8",
              "The Early F1–F8 Families",
            )}
          </h1>
          <p>
            {text(
              "F1, F2, F3, F4, F7 и F8 — ранняя упрощённая классификация явных совпадений значений tf. Как классификация она устарела: семейства не образуют непересекающихся классов и не исчерпывают все решения. Однако лежащие в её основе тождества остаются верными и дают доступное введение в более общие конструкции F4+, F7+ и нормовые семейства.",
              "F1, F2, F3, F4, F7, and F8 form an early simplified classification of explicit coincidences between tf values. As a classification it is outdated: the families are neither disjoint nor exhaustive. The identities behind them remain valid, however, and provide an accessible introduction to the more general F4+, F7+, and norm-based constructions.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document early-tf-families-theory-document">
        <section>
          <h2>{text("1. Решаемое уравнение", "1. The equation being solved")}</h2>
          <p>
            {text(
              "Напомним обозначения предыдущей статьи:",
              "Recall the notation from the preceding article:",
            )}
          </p>
          <Latex display>{String.raw`
f(a,b)=ab(a-b)(a+b),\qquad
\operatorname{tf}(a,b)=t\!\left(f(a,b)\right).`}</Latex>
          <p>
            {text(
              "Пара (a,b) называется невырожденной, если ни один из четырёх множителей функции f не равен нулю. Для двух невырожденных целых пар равенство значений tf эквивалентно условию",
              "A pair (a,b) is called nondegenerate when none of the four factors of f vanishes. For two nondegenerate integral pairs, equality of tf values is equivalent to",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{tf}(a,b)=\operatorname{tf}(c,d)
\iff
\frac{f(a,b)}{f(c,d)}\in(\mathbb Q^\times)^2.`}</Latex>
          <p>
            {text(
              "Все формулы ниже можно рассматривать над ℚ. После умножения каждой пары на общий знаменатель она становится целочисленной, а значение f умножается на четвёртую степень; квадратный класс и значение tf при этом не меняются.",
              "All formulas below may be read over ℚ. Multiplying each pair by a common denominator makes it integral and multiplies f by a fourth power, so its square class and tf value are unchanged.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Статус нумерации", "Status of the numbering")}</h3>
            <p>
              {text(
                "Индекс F фиксирует историческую форму подстановки, а не современный структурный класс. Поэтому два разных индекса могут описывать эквивалентные механизмы, а отсутствие индекса не означает отсутствие решений.",
                "The index F records the historical shape of a substitution rather than a modern structural class. Different indices may therefore describe equivalent mechanisms, and the absence of an index does not imply the absence of solutions.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("2. Линейные семейства F1, F2 и F3", "2. The linear families F1, F2, and F3")}</h2>
          <p>
            {text(
              "В первых трёх семействах вторая пара линейно выражается через первую:",
              "In the first three families, the second pair depends linearly on the first:",
            )}
          </p>
          <Latex display>
            {text(
              String.raw`\begin{array}{c|c}
\mathrm{F1} & (a,b)\longmapsto(2a,a+b)\\
\mathrm{F2} & (a,b)\longmapsto(2a,a-b)\\
\mathrm{F3} & (a,b)\longmapsto(a+b,b)
\end{array}`,
              String.raw`\begin{array}{c|c}
\mathrm{F1} & (a,b)\longmapsto(2a,a+b)\\
\mathrm{F2} & (a,b)\longmapsto(2a,a-b)\\
\mathrm{F3} & (a,b)\longmapsto(a+b,b)
\end{array}`,
            )}
          </Latex>
          <p>
            {text(
              "Раскрытие f сокращает по три из четырёх линейных множителей:",
              "Expanding f cancels three of its four linear factors:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
f(2a,a+b)
&=2a(a+b)(a-b)(3a+b),\\
f(2a,a-b)
&=2a(a-b)(a+b)(3a-b),\\
f(a+b,b)
&=(a+b)ba(a+2b).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Поэтому условия совпадения квадратных классов принимают вид",
              "Hence equality of square classes reduces to",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
\mathrm{F1}:&\quad
\frac{f(a,b)}{f(2a,a+b)}
=\frac{b}{2(3a+b)}\in(\mathbb Q^\times)^2,\\
\mathrm{F2}:&\quad
\frac{f(a,b)}{f(2a,a-b)}
=\frac{b}{2(3a-b)}\in(\mathbb Q^\times)^2,\\
\mathrm{F3}:&\quad
\frac{f(a,b)}{f(a+b,b)}
=\frac{a-b}{a+2b}\in(\mathbb Q^\times)^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "В каждом случае после сокращения остаётся только отношение двух линейных форм. Именно поэтому все три уравнения сводятся к коникам и имеют полные квадратичные параметризации.",
              "In every case only a ratio of two linear forms remains. This is why all three equations reduce to conics and admit complete quadratic parametrizations.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Полные параметризации F1–F3", "3. Complete parametrizations of F1–F3")}</h2>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <p>
              {text(
                "Пусть λ,m,n∈ℚ и λmn≠0. Следующие формулы задают решения соответствующих уравнений:",
                "Let λ,m,n∈ℚ with λmn≠0. The following formulas solve the corresponding equations:",
              )}
            </p>
            <Latex display>{String.raw`
\begin{array}{c|c|c}
& (a,b) & (c,d)\\ \hline
\mathrm{F1}
& \lambda(m^2-2n^2,\;6n^2)
& \lambda(2m^2-4n^2,\;m^2+4n^2)\\[2pt]
\mathrm{F2}
& \lambda(m^2+2n^2,\;6n^2)
& \lambda(2m^2+4n^2,\;m^2-4n^2)\\[2pt]
\mathrm{F3}
& \lambda(m^2+2n^2,\;m^2-n^2)
& \lambda(2m^2+n^2,\;m^2-n^2)
\end{array}`}</Latex>
            <p>
              {text(
                "Для F2 дополнительно требуется m²≠4n², а для F3 — m²≠n²; эти исключения в точности удаляют вырожденные пары. В F1 при λmn≠0 вырождение над ℚ невозможно.",
                "For F2 one must additionally require m²≠4n², and for F3, m²≠n²; these exclusions remove precisely the degenerate pairs. In F1, no degeneration over ℚ is possible when λmn≠0.",
              )}
            </p>
            <p>
              {text(
                "Обратно, всякое невырожденное рациональное решение каждого из трёх указанных линейных уравнений получается соответствующей формулой.",
                "Conversely, every nondegenerate rational solution of each of the three stated linear equations is obtained from the corresponding formula.",
              )}
            </p>
          </div>

          <h3>{text("Проверка формул", "Verification of the formulas")}</h3>
          <p>
            {text(
              "Общий множитель λ можно опустить: он умножает оба аргумента пары и потому меняет f в λ⁴ раз. Подстановка оставшихся форм в три сокращённых отношения даёт",
              "The common factor λ may be omitted: it scales both entries of a pair and therefore multiplies f by λ⁴. Substitution of the remaining forms into the three reduced ratios gives",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
\mathrm{F1}:&\quad
\frac{6n^2}
{2\bigl(3(m^2-2n^2)+6n^2\bigr)}
=\frac{n^2}{m^2},\\
\mathrm{F2}:&\quad
\frac{6n^2}
{2\bigl(3(m^2+2n^2)-6n^2\bigr)}
=\frac{n^2}{m^2},\\
\mathrm{F3}:&\quad
\frac{(m^2+2n^2)-(m^2-n^2)}
{(m^2+2n^2)+2(m^2-n^2)}
=\frac{n^2}{m^2}.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Все три отношения являются рациональными квадратами, поэтому соответствующие значения tf совпадают.",
              "All three ratios are rational squares, so the corresponding tf values are equal.",
            )}
          </p>

          <h3>{text("Доказательство полноты", "Proof of completeness")}</h3>
          <p>
            {text(
              "Пусть сокращённое отношение равно (n/m)². После перекрёстного умножения три случая дают",
              "Suppose the reduced ratio equals (n/m)². Cross multiplication gives",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
\mathrm{F1}:&\quad
b(m^2-2n^2)=6an^2,\\
\mathrm{F2}:&\quad
b(m^2+2n^2)=6an^2,\\
\mathrm{F3}:&\quad
a(m^2-n^2)=b(m^2+2n^2).
\end{aligned}`}</Latex>
          <p>
            {text(
              "В F1 и F2 положим λ=b/(6n²), а в F3 — λ=a/(m²+2n²). Получаются ровно формулы теоремы. Невырожденность исключает нулевые знаменатели и завершает доказательство в обоих направлениях.",
              "For F1 and F2 set λ=b/(6n²), and for F3 set λ=a/(m²+2n²). This recovers exactly the formulas in the theorem. Nondegeneracy excludes zero denominators and completes the proof in both directions.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. F4: равенство самих значений f", "4. F4: equality of the f values themselves")}</h2>
          <p>
            {text(
              "F4 начинается с более сильного условия: первые аргументы двух пар совпадают, а значения f не просто принадлежат одному квадратному классу, но равны:",
              "F4 starts from a stronger condition: the first entries of the two pairs agree, and the f values are not merely in the same square class but are equal:",
            )}
          </p>
          <Latex display>{String.raw`
f(a,b)=f(a,d).`}</Latex>
          <p>
            {text(
              "При a≠0 раскрытие и сокращение общего множителя дают",
              "For a≠0, expansion and cancellation of the common factor give",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
b(a^2-b^2)&=d(a^2-d^2),\\
a^2(b-d)&=b^3-d^3\\
&=(b-d)(b^2+bd+d^2).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Ветвь b=d тривиальна. На нетривиальной ветви b≠d остаётся коника",
              "The branch b=d is trivial. On the nontrivial branch b≠d one obtains the conic",
            )}
          </p>
          <Latex display>{String.raw`
a^2=b^2+bd+d^2.`}</Latex>

          <div className="theorem-block">
            <h3>{text("Полная параметризация F4", "Complete parametrization of F4")}</h3>
            <p>
              {text(
                "Все рациональные точки нетривиальной ветви, кроме вырожденных точек, задаются формулами",
                "All rational points on the nontrivial branch, apart from degenerate points, are given by",
              )}
            </p>
            <Latex display>{String.raw`
\begin{aligned}
a&=\lambda(m^2+mn+n^2),\\
b&=\lambda(m^2-n^2),\\
d&=\lambda(2mn+n^2),
\end{aligned}
\qquad \lambda\in\mathbb Q^\times.`}</Latex>
            <p>
              {text(
                "Для невырожденности требуется mn(m−n)(m+n)(2m+n)(m+2n)≠0.",
                "Nondegeneracy requires mn(m−n)(m+n)(2m+n)(m+2n)≠0.",
              )}
            </p>
          </div>

          <h3>{text("Проверка", "Verification")}</h3>
          <p>
            {text(
              "После удаления общего масштаба λ обозначим правые части через A,B,D. Их линейные множители равны",
              "After removing the common scale λ, denote the right-hand sides by A,B,D. Their linear factors are",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
B&=(m-n)(m+n),&
A-B&=n(m+2n),&
A+B&=m(2m+n),\\
D&=n(2m+n),&
A-D&=m(m-n),&
A+D&=(m+n)(m+2n).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Поэтому обе стороны состоят из одних и тех же множителей:",
              "Thus both sides consist of exactly the same factors:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
f(A,B)
&=A\,mn(m-n)(m+n)(m+2n)(2m+n)\\
&=f(A,D).
\end{aligned}`}</Latex>

          <h3>{text("Почему параметризация полна", "Why the parametrization is complete")}</h3>
          <p>
            {text(
              "При b≠0 разделим конику на b² и положим x=d/b, y=a/b. Получим y²=1+x+x² с рациональной точкой (0,1). Прямая y=1+sx пересекает конику второй раз в точке",
              "For b≠0, divide the conic by b² and put x=d/b, y=a/b. This gives y²=1+x+x² with the rational point (0,1). The line y=1+sx meets the conic again at",
            )}
          </p>
          <Latex display>{String.raw`
x=\frac{1-2s}{s^2-1},\qquad
y=\frac{s^2-s+1}{1-s^2}.`}</Latex>
          <p>
            {text(
              "Это стандартная параметризация всех рациональных точек коники. Подстановка s=(m+2n)/(2m+n) и восстановление общего масштаба приводит к формулам для a,b,d выше. Значение 2m+n=0 соответствует проективной предельной точке с d=0 и уже исключено условием невырожденности.",
              "This is the standard parametrization of every rational point on the conic. Substituting s=(m+2n)/(2m+n) and restoring the common scale gives the formulas for a,b,d above. The value 2m+n=0 corresponds to the projective limiting point with d=0 and is already excluded by nondegeneracy.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. F7: саморекурсия прогрессии квадратов", "5. F7: self-recurrence of a progression of squares")}</h2>
          <p>
            {text(
              "F7 сопоставляет исходной паре (m,n) средний член и шаг порождённой ею прогрессии квадратов:",
              "F7 assigns to the original pair (m,n) the middle term and the difference of the progression of squares it generates:",
            )}
          </p>
          <Latex display>{String.raw`
(m,n)\longmapsto(C,D),\qquad
C=(m^2+n^2)^2,\qquad
D=4f(m,n).`}</Latex>
          <p>
            {text(
              "Положим",
              "Put",
            )}
          </p>
          <Latex display>{String.raw`
S=m^2+n^2,\qquad
R=-m^2+2mn+n^2,\qquad
W=m^2+2mn-n^2.`}</Latex>
          <p>
            {text(
              "Тождества прогрессии квадратов дают C−D=R² и C+D=W². Поэтому",
              "The progression-of-squares identities give C−D=R² and C+D=W². Therefore",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
f(C,D)
&=CD(C-D)(C+D)\\
&=S^2\cdot4f(m,n)\cdot R^2W^2\\
&=f(m,n)(2SRW)^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Отношение двух значений f является квадратом, следовательно",
              "The ratio of the two f values is a square, hence",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{tf}(m,n)
=
\operatorname{tf}\!\left((m^2+n^2)^2,\;4f(m,n)\right).`}</Latex>
          <p>
            {text(
              "Формула верна для всякой невырожденной рациональной пары. Она строит одно новое представление того же значения tf, но не утверждает, что все пары с этим значением получаются итерациями F7. На конгруэнтной эллиптической кривой эта операция соответствует удвоению точки.",
              "The formula holds for every nondegenerate rational pair. It constructs one new representation of the same tf value, but does not claim that every pair with that value is obtained by iterating F7. On the congruent-number elliptic curve, this operation is point doubling.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. F8: четвертичный подъём", "6. F8: a quartic lift")}</h2>
          <p>
            {text(
              "F8 использует четыре выражения",
              "F8 uses the four expressions",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
A&=u^4+2v^4,&\qquad B&=2v^4,\\
C&=u^4+4v^4,&\qquad D&=4u^2v^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Первые четыре множителя раскрываются особенно просто:",
              "The relevant factors split particularly simply:",
            )}
          </p>
          <Latex display>{String.raw`
A-B=u^4,\qquad A+B=C,\qquad
C-D=(u^2-2v^2)^2,\qquad
C+D=(u^2+2v^2)^2.`}</Latex>
          <p>
            {text(
              "Отсюда",
              "Hence",
            )}
          </p>
          <Latex display>{String.raw`
\frac{f(C,D)}{f(A,B)}
=
\frac{
2(u^2-2v^2)^2(u^2+2v^2)^2
}{
u^2v^2(u^4+2v^4)
}.`}</Latex>
          <p>
            {text(
              "Все множители этого отношения, кроме 2/(u⁴+2v⁴), уже являются квадратами. Поэтому для невырожденных u,v равенство tf(A,B)=tf(C,D) выполняется тогда и только тогда, когда существует w∈ℚ такое, что",
              "Every factor in this ratio except 2/(u⁴+2v⁴) is already a square. Thus for nondegenerate u,v, the equality tf(A,B)=tf(C,D) holds exactly when there exists w∈ℚ such that",
            )}
          </p>
          <Latex display>{String.raw`
w^2=\frac{u^4}{2}+v^4.`}</Latex>
          <p>
            {text(
              "При выполнении этого условия отношение действительно становится явным квадратом:",
              "Under this condition the ratio becomes the explicit square",
            )}
          </p>
          <Latex display>{String.raw`
\frac{f(C,D)}{f(A,B)}
=
\left(
\frac{(u^2-2v^2)(u^2+2v^2)}{uvw}
\right)^2.`}</Latex>

          <h3>{text("Эллиптическая кривая F8", "The elliptic curve of F8")}</h3>
          <p>
            {text(
              "Условие на w является кривой рода 1. Подстановка",
              "The condition on w is a genus-one curve. The substitution",
            )}
          </p>
          <Latex display>{String.raw`
x=\frac{2u^2}{v^2},\qquad
y=\frac{4uw}{v^3}`}</Latex>
          <p>
            {text(
              "переводит её в эллиптическую кривую",
              "maps it to the elliptic curve",
            )}
          </p>
          <Latex display>{String.raw`
y^2=x^3+8x.`}</Latex>
          <p>
            {text(
              "Действительно, подстановка w²=u⁴/2+v⁴ даёт",
              "Indeed, substituting w²=u⁴/2+v⁴ gives",
            )}
          </p>
          <Latex display>{String.raw`
y^2
=\frac{16u^2}{v^6}\left(\frac{u^4}{2}+v^4\right)
=\frac{8u^6}{v^6}+\frac{16u^2}{v^2}
=x^3+8x.`}</Latex>
          <p>
            {text(
              "Таким образом, сама формула F8 элементарна, но выбор допустимых u,v уже является эллиптической задачей. F8 даёт точное семейство решений для рациональных точек указанного четвертичного подъёма, а не классификацию всех совпадений tf такого типа.",
              "Thus the F8 identity itself is elementary, but choosing admissible u,v is already an elliptic problem. F8 gives an exact family of solutions arising from rational points of the displayed quartic lift, not a classification of every tf coincidence of this kind.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Что именно классифицируют старые индексы", "7. What the old indices actually classify")}</h2>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Семейства", "Families")}</th>
                  <th>{text("Доказанная область", "Proved scope")}</th>
                  <th>{text("Современная интерпретация", "Modern interpretation")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>F1–F3</td>
                  <td>
                    {text(
                      "Полное покрытие каждого указанного линейного анзаца",
                      "Complete coverage of each stated linear ansatz",
                    )}
                  </td>
                  <td>
                    {text(
                      "Разные представители одного линейного структурного слоя",
                      "Different representatives of one linear structural layer",
                    )}
                  </td>
                </tr>
                <tr>
                  <td>F4</td>
                  <td>
                    {text(
                      "Полная нетривиальная ветвь f(a,b)=f(a,d)",
                      "The complete nontrivial branch of f(a,b)=f(a,d)",
                    )}
                  </td>
                  <td>
                    {text(
                      "Конический предельный слой будущей конструкции F4+",
                      "The conic boundary layer of the later F4+ construction",
                    )}
                  </td>
                </tr>
                <tr>
                  <td>F7</td>
                  <td>
                    {text(
                      "Тождество для каждой невырожденной исходной пары",
                      "An identity for every nondegenerate starting pair",
                    )}
                  </td>
                  <td>
                    {text(
                      "Удвоение точки на кривой фиксированного значения tf",
                      "Point doubling on the curve of a fixed tf value",
                    )}
                  </td>
                </tr>
                <tr>
                  <td>F8</td>
                  <td>
                    {text(
                      "Точное условие внутри указанного четвертичного анзаца",
                      "An exact condition within the stated quartic ansatz",
                    )}
                  </td>
                  <td>
                    {text(
                      "Четвертичный подъём нормового семейства к эллиптической кривой",
                      "A quartic lift of a norm family to an elliptic curve",
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Поэтому раннюю нумерацию удобно сохранять как словарь конкретных формул, но нельзя использовать как доказательство полноты общего уравнения tf(a,b)=tf(c,d). Более общая теория должна классифицировать механизмы и геометрические пространства решений, а не последовательность исторически найденных подстановок.",
              "The early numbering is therefore useful as a dictionary of concrete formulas, but it cannot serve as a completeness proof for the general equation tf(a,b)=tf(c,d). A more general theory must classify mechanisms and geometric spaces of solutions rather than the sequence in which substitutions were historically found.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/proofs/general">
              {text("Общая теория масок 4/9 и 5/9", "General theory of 4/9 and 5/9 patterns")}{" "}
              <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/fmn-tfmn">
              {text("Назад к fmn и tfmn", "Back to fmn and tfmn")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

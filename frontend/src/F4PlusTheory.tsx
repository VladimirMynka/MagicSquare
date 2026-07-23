import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function F4PlusTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page f4-plus-theory-page">
      <TheoryLink className="back-link" to="/theory#elliptic-tfmn">
        ← {text(
          "К циклу об эллиптической геометрии квадратных классов",
          "Back to elliptic geometry of square classes",
        )}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптическая геометрия квадратных классов · 4.2",
              "Elliptic geometry of square classes · 4.2",
            )}
          </p>
          <h1>
            {text(
              "F4+: эллиптическая поверхность пар пифагоровых площадей",
              "F4+: An Elliptic Surface for Pairs of Pythagorean Areas",
            )}
          </h1>
          <p>
            {text(
              "Совпадение рациональных квадратных классов площадей двух пифагоровых треугольников сводится к одной кубике с общим параметром. Её модель Вейерштрасса образует рациональную эллиптическую поверхность ранга Морделла—Вейля 2; после квадратичной замены базы возникает эллиптическая K3-поверхность того же геометрического ранга. Две исходные параметризации одновременно задают две независимые точки на универсальной кривой конгруэнтного числа, поэтому над полем функций F4+ эта кривая имеет ранг не меньше 2.",
              "Equality of rational square classes of two Pythagorean-triangle areas reduces to one cubic with a common parameter. Its Weierstrass model forms a rational elliptic surface of Mordell–Weil rank 2; a quadratic base change produces an elliptic K3 surface of the same geometric rank. The two original parametrizations also determine two independent points on the universal congruent-number curve, so that curve has rank at least 2 over the function field of F4+.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document f4-plus-theory-document">
        <section>
          <h2>
            {text(
              "1. Пифагоровы площади и кривые конгруэнтных чисел",
              "1. Pythagorean areas and congruent-number curves",
            )}
          </h2>
          <p>
            {text(
              "Для ненулевых рациональных u,v положим",
              "For nonzero rational u,v, put",
            )}
          </p>
          <Latex display>{String.raw`
f(u,v)=uv(u^2-v^2).`}</Latex>
          <p>
            {text(
              "Классическая пифагорова параметризация даёт прямоугольный треугольник",
              "The classical Pythagorean parametrization gives the right triangle",
            )}
          </p>
          <Latex display>{String.raw`
(u^2-v^2)^2+(2uv)^2=(u^2+v^2)^2,
\qquad
\frac{(u^2-v^2)(2uv)}2=f(u,v).`}</Latex>
          <p>
            {text(
              "Таким образом, f(u,v) является его ориентированной площадью. Пара называется невырожденной, если uv(u−v)(u+v)≠0. Одновременное масштабирование пары не меняет квадратный класс площади:",
              "Thus f(u,v) is its oriented area. The pair is nondegenerate when uv(u−v)(u+v)≠0. Simultaneous scaling of the pair does not change the square class of the area:",
            )}
          </p>
          <Latex display>{String.raw`
f(\lambda u,\lambda v)=\lambda^4f(u,v),
\qquad \lambda\in\mathbb Q^\times.`}</Latex>
          <p>
            {text(
              "Пусть положительный квадратный класс f(u,v) представлен квадратсвободным целым T и f(u,v)=Tq². После деления сторон треугольника на q получается рациональный прямоугольный треугольник площади T. Эквивалентно, пара задаёт нетривиальную рациональную точку на кривой конгруэнтного числа",
              "Suppose the positive square class of f(u,v) is represented by the squarefree integer T and f(u,v)=Tq². Dividing the triangle sides by q gives a rational right triangle of area T. Equivalently, the pair determines a nontrivial rational point on the congruent-number curve",
            )}
          </p>
          <Latex display>{String.raw`
C_T:\quad V^2=U^3-T^2U,
\qquad
(U,V)=
\left(
\frac{Tu}{v},
\frac{T^2q}{v^2}
\right).`}</Latex>
          <p>
            {text(
              "Поэтому две параметрические пары с одинаковым положительным квадратным классом площади задают две рациональные точки на одной и той же кривой C_T. Ниже классифицируется именно отношение между такими парами; сама кривая C_T и вспомогательная поверхность F4+ — разные эллиптические объекты.",
              "Therefore two parameter pairs whose areas have the same positive square class determine two rational points on the same curve C_T. What follows classifies the relation between such pairs; the curve C_T and the auxiliary F4+ surface are distinct elliptic objects.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "2. Полная нормализация к общему параметру",
              "2. Complete normalization to a common parameter",
            )}
          </h2>
          <div className="theorem-block">
            <h3>
              {text(
                "Теорема о нормализации",
                "Normalization theorem",
              )}
            </h3>
            <p>
              {text(
                "Пусть (u,v) и (r,s) — две невырожденные рациональные пары. Их площади принадлежат одному ориентированному квадратному классу тогда и только тогда, когда после проективного масштабирования второй пары существуют ρ∈ℚ× и невырожденная тройка a,b,d∈ℚ, для которых",
                "Let (u,v) and (r,s) be two nondegenerate rational pairs. Their areas belong to the same oriented square class if and only if, after projectively scaling the second pair, there are ρ∈ℚ× and a nondegenerate triple a,b,d∈ℚ such that",
              )}
            </p>
            <Latex display>{String.raw`
[(u,v)]=[(a,b)],\qquad
[(r,s)]=[(a,d)],\qquad
f(a,b)=\rho^2f(a,d).`}</Latex>
          </div>
          <p>
            {text(
              "Здесь невырожденность тройки означает abd(a²−b²)(a²−d²)≠0.",
              "Here nondegeneracy of the triple means abd(a²−b²)(a²−d²)≠0.",
            )}
          </p>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Если квадратные классы совпадают, то для некоторого σ∈ℚ× выполнено f(u,v)=σ²f(r,s). Масштабируем вторую пару множителем u/r и положим",
              "If the square classes agree, then f(u,v)=σ²f(r,s) for some σ∈ℚ×. Scale the second pair by u/r and put",
            )}
          </p>
          <Latex display>{String.raw`
a=u,\qquad b=v,\qquad
d=\frac{us}{r},\qquad
\rho=\sigma\left(\frac ru\right)^2.`}</Latex>
          <p>
            {text(
              "Однородность четвёртой степени даёт",
              "Fourth-degree homogeneity gives",
            )}
          </p>
          <Latex display>{String.raw`
f(a,d)
=
f\!\left(\frac ur r,\frac ur s\right)
=
\left(\frac ur\right)^4f(r,s),
\qquad
\rho^2f(a,d)=\sigma^2f(r,s)=f(a,b).`}</Latex>
          <p>
            {text(
              "Обратное утверждение следует непосредственно из последнего равенства. Тем самым общий первый параметр не является дополнительным ограничением: это координатная нормализация любой пары совпадающих квадратных классов.",
              "The converse follows immediately from the last equality. Thus the common first parameter is not an additional restriction: it is a coordinate normalization for every pair of equal square classes.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "3. Нормализованная кубика",
              "3. The normalized cubic",
            )}
          </h2>
          <p>
            {text(
              "Рассмотрим теперь полное уравнение",
              "Now consider the complete equation",
            )}
          </p>
          <Latex display>{String.raw`
ab(a^2-b^2)=\rho^2ad(a^2-d^2).`}</Latex>
          <p>
            {text(
              "Для невырожденных троек a,b,d можно разделить на ab³ и ввести отношения",
              "For nondegenerate triples a,b,d, divide by ab³ and introduce the ratios",
            )}
          </p>
          <Latex display>{String.raw`
x=\frac ab,\qquad y=\frac db,\qquad \tau=\rho^2.`}</Latex>
          <p>
            {text(
              "Получается семейство плоских кубик",
              "This gives the family of plane cubics",
            )}
          </p>
          <Latex display>{String.raw`
S_\tau:\qquad
x^2-1=\tau y(x^2-y^2).`}</Latex>
          <p>
            {text(
              "В исходной арифметической задаче τ обязано быть ненулевым рациональным квадратом. Для изучения поверхности полезно временно рассматривать τ как независимый параметр над ℚ.",
              "In the original arithmetic problem, τ must be a nonzero rational square. To study the surface, it is useful to regard τ temporarily as an independent parameter over ℚ.",
            )}
          </p>
          <div className="theorem-block">
            <h3>
              {text(
                "Теорема о модели Вейерштрасса",
                "Weierstrass-model theorem",
              )}
            </h3>
            <p>
              {text(
                "При τ≠0 и τ²≠1 кубика S_τ бирационально эквивалентна эллиптической кривой",
                "For τ≠0 and τ²≠1, the cubic S_τ is birationally equivalent to the elliptic curve",
              )}
            </p>
            <Latex display>{String.raw`
\mathcal E_\tau:\qquad
Y^2=X^3-3\tau^2X+\tau^2(\tau^2+1).`}</Latex>
            <p>{text("Прямое отображение:", "The forward map is")}</p>
            <Latex display>{String.raw`
X=\frac{\tau(\tau-y)}{1-\tau y},
\qquad
Y=\frac{\tau(\tau^2-1)x}{1-\tau y}.`}</Latex>
            <p>{text("Обратное отображение:", "The inverse map is")}</p>
            <Latex display>{String.raw`
x=\frac{Y}{\tau(X-1)},
\qquad
y=\frac{X-\tau^2}{\tau(X-1)}.`}</Latex>
          </div>
        </section>

        <section>
          <h2>
            {text(
              "4. Доказательство бирациональности",
              "4. Proof of birationality",
            )}
          </h2>
          <p>
            {text(
              "Обозначим левую часть уравнения S_τ через",
              "Denote the left-hand side of the equation of S_τ by",
            )}
          </p>
          <Latex display>{String.raw`
R_\tau(x,y)=x^2-1-\tau y(x^2-y^2).`}</Latex>
          <p>
            {text(
              "Прямая подстановка в модель Вейерштрасса даёт точное факторное тождество",
              "Direct substitution into the Weierstrass model gives the exact factor identity",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
Y^2-&\left(X^3-3\tau^2X+\tau^2(\tau^2+1)\right)\\
&=
\frac{\tau^2(\tau^2-1)^2}
{(1-\tau y)^3}
R_\tau(x,y).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Следовательно, всякая точка S_τ из области определения отображается в 𝓔_τ. В обратную сторону выполняется",
              "Hence every point of S_τ in the domain of the map is sent to 𝓔_τ. Conversely,",
            )}
          </p>
          <Latex display>{String.raw`
R_\tau\!\left(
\frac{Y}{\tau(X-1)},
\frac{X-\tau^2}{\tau(X-1)}
\right)
=
\frac{\tau^2-1}{\tau^2(X-1)^3}
\left[
Y^2-X^3+3\tau^2X-\tau^2(\tau^2+1)
\right].`}</Latex>
          <p>
            {text(
              "Обе композиции являются тождественными. Для первой это сразу видно из равенств",
              "Both compositions are identities. For the first one, this follows immediately from",
            )}
          </p>
          <Latex display>{String.raw`
X-1=\frac{\tau^2-1}{1-\tau y},
\qquad
X-\tau^2=
\frac{\tau y(\tau^2-1)}{1-\tau y}.`}</Latex>
          <p>
            {text(
              "Подстановка y=1/τ в R_τ даёт (1−τ²)/τ². Поэтому знаменатель прямого отображения не обращается в нуль на S_τ при τ²≠1. В обратном отображении исключаются две точки",
              "Substituting y=1/τ into R_τ gives (1−τ²)/τ². Thus the denominator of the forward map cannot vanish on S_τ when τ²≠1. The inverse map excludes the two points",
            )}
          </p>
          <Latex display>{String.raw`
(X,Y)=\left(1,\pm(\tau^2-1)\right),`}</Latex>
          <p>
            {text(
              "которые являются границей выбранной аффинной нормализации b≠0. Для исходной задачи дополнительно удаляются точки, у которых восстановленная тройка вырождена:",
              "which form the boundary of the chosen affine normalization b≠0. For the original problem one must additionally remove points whose recovered triple is degenerate:",
            )}
          </p>
          <Latex display>{String.raw`
xy(x^2-1)(x^2-y^2)=0.`}</Latex>
        </section>

        <section>
          <h2>
            {text(
              "5. Особые слои и известная коника",
              "5. Singular fibers and the known conic",
            )}
          </h2>
          <p>
            {text(
              "Для модели 𝓔_τ инварианты равны",
              "For the model 𝓔_τ, the invariants are",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
\Delta&=-432\,\tau^4(\tau-1)^2(\tau+1)^2,\\
c_4&=144\,\tau^2,\\
j&=-\frac{6912\,\tau^2}{(\tau-1)^2(\tau+1)^2}.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Поэтому гладкие эллиптические слои вырождаются при τ=0,±1 и на бесконечности. При τ=1 исходная кубика распадается точно на две компоненты:",
              "Thus the smooth elliptic fibers degenerate at τ=0,±1 and at infinity. At τ=1, the original cubic splits into exactly two components:",
            )}
          </p>
          <Latex display>{String.raw`
R_1(x,y)
=(1-y)(x^2-y^2-y-1).`}</Latex>
          <p>
            {text(
              "Компонента y=1 означает d=b и даёт тривиальное совпадение пары с самой собой. Нетривиальная компонента является коникой",
              "The component y=1 means d=b and gives the trivial pairing of a pair with itself. The nontrivial component is the conic",
            )}
          </p>
          <Latex display>{String.raw`
x^2=y^2+y+1,
\qquad\text{то есть}\qquad
a^2=b^2+bd+d^2.`}</Latex>
          <p>
            {text(
              "Именно этот слой ранее использовался для построения семейств кривых конгруэнтных чисел ранга не меньше 2. При τ=−1 аналогично",
              "This is precisely the layer previously used to construct families of congruent-number curves of rank at least 2. At τ=−1, similarly,",
            )}
          </p>
          <Latex display>{String.raw`
R_{-1}(x,y)
=(1+y)(x^2-y^2+y-1).`}</Latex>
          <p>
            {text(
              "Слой τ=−1 необходим для геометрического паспорта поверхности, хотя он не возникает из рационального ρ в равенстве τ=ρ².",
              "The fiber τ=−1 is needed for the geometric passport of the surface, although it does not arise from rational ρ in τ=ρ².",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "6. Видимые секции и явные семейства",
              "6. Visible sections and explicit families",
            )}
          </h2>
          <p>
            {text(
              "На поверхности сразу видны две рациональные секции",
              "The surface has two immediately visible rational sections",
            )}
          </p>
          <Latex display>{String.raw`
P(\tau)=\bigl(\tau,\tau(\tau-1)\bigr),
\qquad
Q(\tau)=\bigl(\tau^2,\tau(\tau^2-1)\bigr).`}</Latex>
          <p>
            {text(
              "Сами P и Q лежат на вырожденной границе: обратное отображение даёт соответственно (x,y)=(1,−1) и (1,0). То же верно для P+Q, который даёт (−1,1). Их роль состоит не в этих трёх тривиальных решениях, а в арифметике группы Морделла—Вейля: другие комбинации секций уже восстанавливают невырожденные пары.",
              "The sections P and Q themselves lie on the degenerate boundary: the inverse map gives (x,y)=(1,−1) and (1,0), respectively. The same holds for P+Q, which gives (−1,1). Their role is not in these three trivial solutions but in the Mordell–Weil group: other section combinations already recover nondegenerate pairs.",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Секция", "Section")}</th>
                  <th><Latex>{String.raw`X`}</Latex></th>
                  <th><Latex>{String.raw`Y`}</Latex></th>
                  <th><Latex>{String.raw`x=a/b`}</Latex></th>
                  <th><Latex>{String.raw`y=d/b`}</Latex></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Latex>{String.raw`P-Q`}</Latex></td>
                  <td><Latex>{String.raw`3\tau+4`}</Latex></td>
                  <td><Latex>{String.raw`(\tau+1)(\tau+8)`}</Latex></td>
                  <td><Latex>{String.raw`\dfrac{\tau+8}{3\tau}`}</Latex></td>
                  <td><Latex>{String.raw`\dfrac{4-\tau}{3\tau}`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`2P`}</Latex></td>
                  <td><Latex>{String.raw`-2\tau`}</Latex></td>
                  <td><Latex>{String.raw`-\tau(\tau-1)`}</Latex></td>
                  <td><Latex>{String.raw`\dfrac{\tau-1}{2\tau+1}`}</Latex></td>
                  <td><Latex>{String.raw`\dfrac{\tau+2}{2\tau+1}`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`P+2Q`}</Latex></td>
                  <td><Latex>{String.raw`4-3\tau`}</Latex></td>
                  <td><Latex>{String.raw`(\tau-1)(\tau-8)`}</Latex></td>
                  <td><Latex>{String.raw`\dfrac{8-\tau}{3\tau}`}</Latex></td>
                  <td><Latex>{String.raw`\dfrac{\tau+4}{3\tau}`}</Latex></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Каждая строка является тождественным рациональным семейством решений x²−1=τy(x²−y²). Однако конечная таблица комбинаций не заменяет множество 𝓔_τ(ℚ): для фиксированного τ задача нахождения всех рациональных точек остаётся самостоятельной арифметической задачей.",
              "Each row is an identically valid rational family of solutions to x²−1=τy(x²−y²). A finite table of combinations does not replace the set 𝓔_τ(ℚ), however: for fixed τ, determining all rational points remains a separate arithmetic problem.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "7. Паспорт рациональной эллиптической поверхности",
              "7. Passport of the rational elliptic surface",
            )}
          </h2>
          <p>
            {text(
              "Рассмотрим τ как координату проективной прямой. Минимальная эллиптическая поверхность 𝓔→ℙ¹_τ имеет четыре особых слоя:",
              "Regard τ as a coordinate on the projective line. The minimal elliptic surface 𝓔→ℙ¹_τ has four singular fibers:",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Точка базы", "Base point")}</th>
                  <th>{text("Тип Кодайры", "Kodaira type")}</th>
                  <th>{text("Корневая решётка", "Root lattice")}</th>
                  <th>{text("Число Эйлера", "Euler number")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><Latex>{String.raw`\tau=0`}</Latex></td><td>IV</td><td>A₂</td><td>4</td></tr>
                <tr><td><Latex>{String.raw`\tau=1`}</Latex></td><td>I₂</td><td>A₁</td><td>2</td></tr>
                <tr><td><Latex>{String.raw`\tau=-1`}</Latex></td><td>I₂</td><td>A₁</td><td>2</td></tr>
                <tr><td><Latex>{String.raw`\tau=\infty`}</Latex></td><td>IV</td><td>A₂</td><td>4</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Сумма чисел Эйлера равна 12, поэтому это рациональная эллиптическая поверхность. Над алгебраическим замыканием её число Пикара равно 10. Суммарный ранг корневых решёток особых слоёв равен 2+1+1+2=6. Формула Шиоды—Тейта даёт",
              "The Euler numbers sum to 12, so this is a rational elliptic surface. Over an algebraic closure its Picard number is 10. The total root-lattice rank of the singular fibers is 2+1+1+2=6. The Shioda–Tate formula gives",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{rank}
\mathcal E_\tau(\overline{\mathbb Q}(\tau))
=10-2-6=2.`}</Latex>
          <p>
            {text(
              "Секции P и Q независимы. Действительно, всякое целочисленное отношение между ними специализировалось бы на любом хорошем слое, где обе секции определены. При τ=9 получается",
              "The sections P and Q are independent. Indeed, any integral relation between them would specialize on every good fiber where both sections are defined. At τ=9 one obtains",
            )}
          </p>
          <Latex display>{String.raw`
Y^2=X^3-243X+6642,
\qquad
P=(9,72),\quad Q=(81,720).`}</Latex>
          <p>
            {text(
              "Точный расчёт группы рациональных точек этой кривой даёт ранг 2 и P,Q в качестве независимых образующих. Следовательно, P,Q обеспечивают нижнюю оценку 2 уже над ℚ(τ), а формула Шиоды—Тейта даёт совпадающую геометрическую верхнюю оценку:",
              "An exact computation of the rational-point group of this curve gives rank 2 and P,Q as independent generators. Hence P,Q give the lower bound 2 already over ℚ(τ), while Shioda–Tate gives the matching geometric upper bound:",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{rank}\mathcal E_\tau(\mathbb Q(\tau))
=
\operatorname{rank}\mathcal E_\tau(\overline{\mathbb Q}(\tau))
=2.`}</Latex>
          <p>
            {text(
              "Хорошая специализация при τ=2 имеет тривиальный торсион, поэтому специализация торсиона исключает и нетривиальный торсион над ℚ(τ). Таким образом, P и Q исчерпывают свободный ранг с точностью до конечного индекса. Это утверждение относится к функциональному полю и не означает, что каждый рациональный специализированный слой имеет ранг ровно 2.",
              "The good specialization at τ=2 has trivial torsion, so specialization of torsion also rules out nontrivial torsion over ℚ(τ). Thus P and Q exhaust the free rank up to finite index. This is a statement over the function field; it does not say that every rational specialization has rank exactly 2.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "8. Квадратичная замена базы и K3-поверхность",
              "8. Quadratic base change and the K3 surface",
            )}
          </h2>
          <p>
            {text(
              "Для равенства квадратных классов параметр τ должен иметь вид τ=ρ². После этой замены получается исходное семейство",
              "For equality of square classes, the parameter τ must have the form τ=ρ². This base change gives the original family",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal E_\rho:\qquad
Y^2=X^3-3\rho^4X+\rho^4(\rho^4+1).`}</Latex>
          <p>
            {text(
              "Разветвлённый подъём двух слоёв типа IV даёт слои IV* при ρ=0 и ρ=∞. Слои τ=1 и τ=−1 поднимаются в четыре слоя I₂ при ρ=±1,±i. Их числа Эйлера суммируются в",
              "The ramified pullback of the two type-IV fibers gives type-IV* fibers at ρ=0 and ρ=∞. The fibers τ=1 and τ=−1 lift to four type-I₂ fibers at ρ=±1,±i. Their Euler numbers sum to",
            )}
          </p>
          <Latex display>{String.raw`
8+8+2+2+2+2=24,`}</Latex>
          <p>
            {text(
              "поэтому минимальная поверхность является эллиптической K3-поверхностью. Суммарный ранг её корневых решёток равен",
              "so the minimal surface is an elliptic K3 surface. The total rank of its root lattices is",
            )}
          </p>
          <Latex display>{String.raw`
6+6+1+1+1+1=16.`}</Latex>
          <p>
            {text(
              "Для комплексной K3-поверхности число Пикара не превосходит 20. По формуле Шиоды—Тейта",
              "For a complex K3 surface the Picard number is at most 20. By Shioda–Tate,",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{rank}
\mathcal E_\rho(\overline{\mathbb Q}(\rho))
\le 20-2-16=2.`}</Latex>
          <p>
            {text(
              "Поднятые секции P,Q остаются независимыми, поэтому неравенство является равенством. Итак, квадратичная замена τ=ρ² не создаёт новых свободных секций над алгебраическим замыканием:",
              "The pulled-back sections P,Q remain independent, so equality holds. Thus the quadratic base change τ=ρ² creates no new free sections over an algebraic closure:",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{rank}
\mathcal E_\rho(\overline{\mathbb Q}(\rho))=2.`}</Latex>
        </section>

        <section>
          <h2>
            {text(
              "9. Универсальная кривая конгруэнтного числа ранга не меньше 2",
              "9. A universal congruent-number curve of rank at least 2",
            )}
          </h2>
          <p>
            {text(
              "У поверхности F4+ есть два разных эллиптических прочтения. Поверхность 𝓔_ρ описывает сами тройки параметров. Каждая такая тройка, в свою очередь, задаёт две точки на одной кривой конгруэнтного числа. Для нормировки a=1 запишем",
              "F4+ has two distinct elliptic interpretations. The surface 𝓔_ρ parametrizes the triples themselves. Every such triple, in turn, gives two points on one congruent-number curve. In the normalization a=1, write",
            )}
          </p>
          <Latex display>{String.raw`
A=x(x^2-1),\qquad
\mathcal C_A:\quad v^2=u^3-A^2u.`}</Latex>
          <p>
            {text(
              "На поверхности",
              "On the surface",
            )}
          </p>
          <Latex display>{String.raw`
x^2-1=\rho^2y(x^2-y^2)`}</Latex>
          <p>
            {text(
              "двум пифагоровым треугольникам отвечают следующие рациональные точки:",
              "the two Pythagorean triangles give the following rational points:",
            )}
          </p>
          <Latex display>{String.raw`
R_x=
\left(x^2(x^2-1),\,x^2(x^2-1)^2\right),
\qquad
R_y=
\left(\rho^2x^2(x^2-y^2),\,
\rho^3x^2(x^2-y^2)^2\right).`}</Latex>

          <div className="theorem-block">
            <h3>
              {text(
                "Теорема о двух независимых точках",
                "Theorem on two independent points",
              )}
            </h3>
            <p>
              {text(
                "Пусть K — поле функций неприводимой поверхности x²−1=ρ²y(x²−y²) над ℚ. Тогда Rₓ и Rᵧ принадлежат 𝓒_A(K) и независимы с точностью до кручения. В частности,",
                "Let K be the function field over ℚ of the irreducible surface x²−1=ρ²y(x²−y²). Then Rₓ and Rᵧ lie in 𝓒_A(K) and are independent modulo torsion. In particular,",
              )}
            </p>
            <Latex display>{String.raw`
\operatorname{rank}\mathcal C_A(K)\ge 2.`}</Latex>
          </div>

          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Сначала заметим, что определяющий многочлен поверхности неприводим: как квадратный многочлен по ρ он мог бы разложиться над ℚ(x,y) только в том случае, если (x²−1)/(y(x²−y²)) было бы квадратом, но его порядок при y=0 равен −1.",
              "First note that the defining polynomial of the surface is irreducible: as a quadratic polynomial in ρ, it could factor over ℚ(x,y) only if (x²−1)/(y(x²−y²)) were a square, but its order at y=0 is −1.",
            )}
          </p>
          <p>
            {text(
              "Подстановка Rₓ в уравнение 𝓒_A является стандартным переходом от пифагорова треугольника к кривой его площади. Для Rᵧ та же проверка после вынесения общих множителей сводится ровно к определяющему уравнению F4+:",
              "Substitution of Rₓ into 𝓒_A is the standard passage from a Pythagorean triangle to the curve of its area. For Rᵧ, the same calculation, after removing common factors, reduces exactly to the defining equation of F4+:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
v(R_x)^2-u(R_x)^3+A^2u(R_x)&=0,\\
v(R_y)^2-u(R_y)^3+A^2u(R_y)
&=\rho^2x^4(x^2-y^2)
\Bigl((x^2-1)^2-\rho^4y^2(x^2-y^2)^2\Bigr)\\
&=\rho^2x^4(x^2-y^2)
\bigl(x^2-1-\rho^2y(x^2-y^2)\bigr)
\bigl(x^2-1+\rho^2y(x^2-y^2)\bigr)=0.
\end{aligned}`}</Latex>
          <p>
            {text(
              "так что последнее выражение обращается в нуль на поверхности. Для независимости достаточно одной хорошей специализации. Возьмём",
              "so the last expression vanishes on the surface. A single good specialization is enough to prove independence. Take",
            )}
          </p>
          <Latex display>{String.raw`
\rho=1,\qquad x=\frac73,\qquad y=\frac53,
\qquad
7^2=3^2+3\cdot5+5^2.`}</Latex>
          <p>
            {text(
              "После общего масштабирования сторон на 9/2 получаются два прямоугольных треугольника (20,21,29) и (12,35,37), оба площади 210. Поэтому специализация универсальной кривой и двух секций равна",
              "After scaling all sides by 9/2, this gives the right triangles (20,21,29) and (12,35,37), both of area 210. Hence the specialized universal curve and sections are",
            )}
          </p>
          <Latex display>{String.raw`
E_{210}:\quad v^2=u^3-210^2u,
\qquad
R_x=(490,9800),\quad R_y=(294,3528).`}</Latex>
          <p>
            {text(
              "Используем стандартное отображение Куммера для кривой с полным рациональным 2-кручением; в точках 2-кручения берутся его обычные предельные значения:",
              "Use the standard Kummer map for a curve with full rational 2-torsion, with its usual limiting values at the 2-torsion points:",
            )}
          </p>
          <Latex display>{String.raw`
\delta:E_{210}(\mathbb Q)/2E_{210}(\mathbb Q)
\longrightarrow
(\mathbb Q^\times/\mathbb Q^{\times2})^2,
\qquad
(u,v)\longmapsto(u,u-210).`}</Latex>
          <p>
            {text(
              "Для двух независимых точек 2-кручения T₀=(0,0), T₊=(210,0) и двух рассматриваемых точек квадратные классы равны",
              "For the two independent 2-torsion points T₀=(0,0), T₊=(210,0) and the two points under consideration, the square classes are",
            )}
          </p>
          <Latex display>{String.raw`
\delta(T_0)=(-1,-210),\quad
\delta(T_+)=(210,2),\quad
\delta(R_x)=(10,70),\quad
\delta(R_y)=(6,21).`}</Latex>
          <p>
            {text(
              "В базисе квадратных классов (−1,2,3,5,7) эти четыре элемента дают матрицу",
              "In the square-class basis (−1,2,3,5,7), these four elements give the matrix",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\left(
\begin{array}{ccccc|ccccc}
1&0&0&0&0&1&1&1&1&1\\
0&1&1&1&1&0&1&0&0&0\\
0&1&0&1&0&0&1&0&1&1\\
0&1&1&0&0&0&0&1&0&1
\end{array}
\right),`}</Latex>
          </div>
          <p>
            {text(
              "имеющую ранг 4 над 𝔽₂. Кроме того, прямой подсчёт даёт #E₂₁₀(𝔽₁₁)=12 и #E₂₁₀(𝔽₁₃)=20. Поскольку обе редукции хорошие, порядок рационального кручения делит 4; видимые точки (0,0), (±210,0) уже образуют группу порядка 4. Следовательно, кручение в точности равно E₂₁₀[2]. В любом соотношении aRₓ+bRᵧ=T с T∈E₂₁₀[2] ранг матрицы заставляет a и b быть чётными, а T — нулём. Полученное соотношение можно разделить на 2 и повторить рассуждение; поэтому a и b делятся на любую степень 2 и равны нулю. Точки Rₓ и Rᵧ независимы.",
              "It has rank 4 over 𝔽₂. Moreover, direct counting gives #E₂₁₀(𝔽₁₁)=12 and #E₂₁₀(𝔽₁₃)=20. Both reductions are good, so the order of the rational torsion divides 4; the visible points (0,0), (±210,0) already form a group of order 4. Thus the torsion is exactly E₂₁₀[2]. In any relation aRₓ+bRᵧ=T with T∈E₂₁₀[2], the matrix rank forces a and b to be even and T to vanish. Divide the resulting relation by 2 and repeat: a and b are divisible by every power of 2, hence zero. The points Rₓ and Rᵧ are independent.",
            )}
          </p>
          <p>
            {text(
              "Любое целочисленное отношение между универсальными секциями специализировалось бы в это отношение на E₂₁₀, что невозможно. Поэтому секции независимы над K.",
              "Any integral relation between the universal sections would specialize to the same relation on E₂₁₀, which is impossible. Therefore the sections are independent over K.",
            )}
          </p>

          <div className="theorem-block">
            <h3>{text("Точная граница результата", "Exact scope of the result")}</h3>
            <ul>
              <li>
                {text(
                  "F4+ даёт полную координатную модель всех совпадений квадратных классов двух невырожденных пифагоровых параметризаций.",
                  "F4+ gives a complete coordinate model for every equality of square classes between two nondegenerate Pythagorean parametrizations.",
                )}
              </li>
              <li>
                {text(
                  "Две естественные точки независимы над полем функций полной F4+-поверхности; это отдельная теорема, не следствие ранга вспомогательной поверхности 𝓔_ρ.",
                  "The two natural points are independent over the function field of the full F4+ surface; this is a separate theorem, not a consequence of the rank of the auxiliary surface 𝓔_ρ.",
                )}
              </li>
              <li>
                {text(
                  "Теорема не утверждает, что независимость сохраняется при каждой рациональной специализации, и сама по себе не доказывает, что зависимые специализации имеют плотность нуль.",
                  "The theorem does not say that independence survives every rational specialization, nor does it by itself prove that dependent specializations have density zero.",
                )}
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2>
            {text(
              "10. Соотношение с известными результатами",
              "10. Relation to previous work",
            )}
          </h2>
          <div className="literature-note">
            <h3>{text("Что известно независимо от F4+", "What is known independently of F4+")}</h3>
            <ul>
              <li>
                {text(
                  "Мальвина Баика исследовала построение нескольких рациональных пифагоровых треугольников одной площади.",
                  "Malvina Baica studied constructions of several rational Pythagorean triangles with one common area.",
                )}{" "}
                <a href="https://eudml.org/doc/46317" rel="noreferrer" target="_blank">
                  {text("Статья 1988 года", "1988 paper")}
                </a>.
              </li>
              <li>
                {text(
                  "Лоренц Хальбайзен и Норберт Хунгербюлер использовали конику a²=b²+bd+d² — слой ρ=1 нашей модели — для построения бесконечного семейства кривых конгруэнтных чисел ранга не меньше 2.",
                  "Lorenz Halbeisen and Norbert Hungerbühler used the conic a²=b²+bd+d²—the ρ=1 layer of our model—to construct an infinite family of congruent-number curves of rank at least 2.",
                )}{" "}
                <a
                  href="https://cs.uwaterloo.ca/journals/JIS/VOL22/Halbeisen/halb4.html"
                  rel="noreferrer"
                  target="_blank"
                >
                  {text("Статья 2019 года", "2019 paper")}
                </a>.
              </li>
              <li>
                {text(
                  "Raiza Corpuz дала 2-десцентное доказательство классической связи nm²=uv(u²−v²) с кривой y²=x³−n²x и построила семейства ранга не меньше 2 и 3.",
                  "Raiza Corpuz gave a 2-descent proof of the classical relation between nm²=uv(u²−v²) and y²=x³−n²x, and constructed families of rank at least 2 and 3.",
                )}{" "}
                <a href="https://arxiv.org/abs/2006.08113" rel="noreferrer" target="_blank">
                  {text("Препринт 2020 года", "2020 preprint")}
                </a>.
              </li>
              <li>
                {text(
                  "Рациональные эллиптические поверхности с четырьмя особыми слоями классифицированы Херфуртнером; конфигурация IV²I₂² присутствует в списке Перссона—Миранды. Поэтому абстрактный тип вспомогательной поверхности не заявляется как новый.",
                  "Rational elliptic surfaces with four singular fibers were classified by Herfurtner; the configuration IV²I₂² occurs in the Persson–Miranda list. The abstract type of the auxiliary surface is therefore not claimed as new.",
                )}{" "}
                <a href="https://archive.mpim-bonn.mpg.de/id/eprint/860/" rel="noreferrer" target="_blank">
                  Herfurtner
                </a>
                {" · "}
                <a
                  href="https://www.math.colostate.edu/~miranda/preprints/Perssonslist.pdf"
                  rel="noreferrer"
                  target="_blank"
                >
                  Miranda
                </a>.
              </li>
            </ul>
          </div>
          <h3>{text("Что добавляет F4+", "What F4+ adds")}</h3>
          <p>
            {text(
              "F4+ объединяет эти сюжеты в полной модели произвольного квадратного отношения двух пифагоровых площадей: доказывает нормализацию к общему первому параметру, даёт явную бирациональную координатную систему, определяет паспорт рациональной поверхности и её K3-замены базы, а также доказывает независимость двух естественных точек на универсальной кривой конгруэнтного числа. В перечисленных источниках такая полная конструкция и последняя теорема не обнаружены; это утверждение относится к приведённому обзору литературы и может уточняться при появлении более ранних источников.",
              "F4+ unifies these themes in a complete model for an arbitrary square ratio between two Pythagorean areas: it proves normalization to a common first parameter, gives explicit birational coordinates, determines the passport of the rational surface and its K3 base change, and proves independence of the two natural points on the universal congruent-number curve. We did not find this complete construction or the final theorem in the sources listed above; that statement is relative to the literature reviewed here and may be refined if an earlier source is identified.",
            )}
          </p>
          <p>
            {text(
              "Обозначение F4+ возникло исторически внутри исследования магических квадратов: равенство квадратных классов появилось при согласовании шагов двух арифметических прогрессий квадратов. Эта мотивация не входит в доказательство поверхности, но объясняет название.",
              "The label F4+ arose historically within the study of magic squares: equality of square classes appeared when matching the differences of two arithmetic progressions of squares. This motivation is not used in the proof of the surface, but it explains the name.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/tf-pair-generation">
              {text(
                "Генерация пар через F4+ и F7+",
                "Generating pairs with F4+ and F7+",
              )}{" "}
              <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/f7-plus">
              {text(
                "Биекция с кривой конгруэнтного числа",
                "The congruent-curve bijection",
              )}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory">
              {text(
                "К оглавлению теории",
                "Theory contents",
              )}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

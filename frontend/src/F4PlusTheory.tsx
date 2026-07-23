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
              "Совпадение рациональных квадратных классов площадей двух пифагоровых треугольников сводится к одной кубике с общим параметром. Её модель Вейерштрасса образует рациональную эллиптическую поверхность ранга Морделла—Вейля 2; после необходимой для исходной задачи квадратичной замены базы возникает эллиптическая K3-поверхность того же геометрического ранга.",
              "Equality of rational square classes of two Pythagorean-triangle areas reduces to one cubic with a common parameter. Its Weierstrass model forms a rational elliptic surface of Mordell–Weil rank 2; the quadratic base change required by the original arithmetic problem produces an elliptic K3 surface of the same geometric rank.",
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
              "9. Что именно получено для конгруэнтных чисел",
              "9. What this gives for congruent numbers",
            )}
          </h2>
          <p>
            {text(
              "Рациональная точка вспомогательного слоя 𝓔_ρ восстанавливает тройку (a:b:d) и равенство",
              "A rational point on the auxiliary fiber 𝓔_ρ recovers a triple (a:b:d) and an equality",
            )}
          </p>
          <Latex display>{String.raw`
f(a,b)=\rho^2f(a,d).`}</Latex>
          <p>
            {text(
              "Если общий положительный квадратный класс представлен T и",
              "If the common positive square class is represented by T and",
            )}
          </p>
          <Latex display>{String.raw`
f(a,b)=Tq_b^2,\qquad
f(a,d)=Tq_d^2,\qquad
q_b=\pm\rho q_d,`}</Latex>
          <p>
            {text(
              "то две исходные параметризации дают точки одной кривой конгруэнтного числа C_T:",
              "then the two original parametrizations give points on the same congruent-number curve C_T:",
            )}
          </p>
          <Latex display>{String.raw`
\left(
\frac{Ta}{b},
\frac{T^2q_b}{b^2}
\right),
\qquad
\left(
\frac{Ta}{d},
\frac{T^2q_d}{d^2}
\right)
\in C_T(\mathbb Q).`}</Latex>
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
                  "Для фиксированного ρ эта модель не перечисляет автоматически все точки 𝓔_ρ(ℚ); группу Морделла—Вейля конкретного слоя всё ещё требуется определять.",
                  "For fixed ρ, the model does not automatically enumerate all points of 𝓔_ρ(ℚ); the Mordell–Weil group of the individual fiber must still be determined.",
                )}
              </li>
              <li>
                {text(
                  "Ранг 2 относится к вспомогательной поверхности над функциональным полем. Он сам по себе не доказывает независимость двух полученных точек на C_T и не ограничивает сверху ранги специальных слоёв или дополнительных замен базы.",
                  "Rank 2 belongs to the auxiliary surface over its function field. By itself it neither proves that the two resulting points on C_T are independent nor bounds the ranks of special fibers or further base changes.",
                )}
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2>
            {text(
              "10. Известный слой, название и происхождение",
              "10. The known layer, the name, and the origin",
            )}
          </h2>
          <p>
            {text(
              "Коника τ=1, или a²=b²+bd+d², была использована Лоренцем Хальбайзеном и Норбертом Хунгербюлером для построения бесконечного семейства кривых конгруэнтных чисел ранга не меньше 2. Полная τ-поверхность выше продолжает этот слой, сохраняя произвольное квадратное отношение между двумя площадями.",
              "The τ=1 conic, equivalently a²=b²+bd+d², was used by Lorenz Halbeisen and Norbert Hungerbühler to construct an infinite family of congruent-number curves of rank at least 2. The full τ-surface above extends this layer by retaining an arbitrary square ratio between the two areas.",
            )}
          </p>
          <p>
            <a
              href="https://cs.uwaterloo.ca/journals/JIS/VOL22/Halbeisen/halb4.html"
              rel="noreferrer"
              target="_blank"
            >
              {text(
                "Congruent Number Elliptic Curves Related to Integral Solutions of m²=n²+nl+l²",
                "Congruent Number Elliptic Curves Related to Integral Solutions of m²=n²+nl+l²",
              )}
            </a>
            {" — "}
            {text(
              "Journal of Integer Sequences 22 (2019), Article 19.3.1.",
              "Journal of Integer Sequences 22 (2019), Article 19.3.1.",
            )}
          </p>
          <p>
            {text(
              "Обозначение F4+ возникло исторически внутри исследования магических квадратов: равенство квадратных классов появилось при согласовании шагов двух арифметических прогрессий квадратов. Эта мотивация не входит в доказательство поверхности, но объясняет название.",
              "The label F4+ arose historically within the study of magic squares: equality of square classes appeared when matching the differences of two arithmetic progressions of squares. This motivation is not used in the proof of the surface, but it explains the name.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/f7-plus">
              {text(
                "Биекция с кривой конгруэнтного числа",
                "The congruent-curve bijection",
              )}{" "}
              <span>→</span>
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

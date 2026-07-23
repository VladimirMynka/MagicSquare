import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function DirProgressionsTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page dir-progressions-theory-page">
      <TheoryLink className="back-link" to="/theory#partial-configurations">
        ← {text("К циклу о частичных конфигурациях", "Back to the partial-configurations series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Частичные квадратные конфигурации · 3.1",
              "Partial square configurations · 3.1",
            )}
          </p>
          <h1>
            {text(
              "Арифметические прогрессии квадратов и dir-функция",
              "Arithmetic progressions of squares and the dir function",
            )}
          </h1>
          <p>
            {text(
              "Линейная структура магического квадрата 3×3 выделяет восемь троек клеток, значения в которых всегда образуют арифметические прогрессии. Если значения этих клеток должны быть квадратами, каждая тройка приводит к одной и той же рациональной конике. Её полная параметризация позволяет отделить общий масштаб прогрессии от её формы и ввести нормированный шаг dir(m,n).",
              "The linear structure of a 3×3 magic square singles out eight triples of entries whose values always form arithmetic progressions. When those entries are required to be squares, every triple leads to the same rational conic. Its complete parametrization separates the common scale of a progression from its shape and yields the normalized difference dir(m,n).",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document dir-progressions-theory-document">
        <section>
          <h2>
            {text(
              "1. Восемь прогрессий магического квадрата",
              "1. The eight progressions in a magic square",
            )}
          </h2>
          <p>
            {text("По ", "By ")}
            <TheoryLink to="/theory/magic-squares-3x3">
              {text("теореме об общей форме", "the general-form theorem")}
            </TheoryLink>
            {text(
              " любой магический квадрат 3×3 однозначно определяется тремя координатами E,x,y. При принятой нумерации клеток он имеет вид",
              ", every 3×3 magic square is uniquely determined by three coordinates E,x,y. With the chosen labels for the entries it has the form",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{pmatrix}A&B&C\\D&E&F\\G&H&J\end{pmatrix}
=
\begin{pmatrix}
E+x&E-x+y&E-y\\
E-x-y&E&E+x+y\\
E+y&E+x-y&E-x
\end{pmatrix}.`}</Latex>
          </div>
          <p>
            {text(
              "Три клетки U,V,W образуют арифметическую прогрессию в указанном порядке тогда и только тогда, когда U+W=2V. Для общего магического квадрата это тождество выполняется ровно для следующих восьми путей, если не различать путь и его обращение:",
              "Three entries U,V,W form an arithmetic progression in the displayed order exactly when U+W=2V. In the general magic square this identity holds for exactly the following eight paths, with a path and its reversal identified:",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Тип", "Type")}</th>
                  <th>{text("Путь", "Path")}</th>
                  <th>{text("Тождество", "Identity")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={4}>{text("Через центр", "Through the center")}</td>
                  <td><Latex>{String.raw`J,E,A`}</Latex></td>
                  <td><Latex>{String.raw`J+A=2E`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`H,E,B`}</Latex></td>
                  <td><Latex>{String.raw`H+B=2E`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`C,E,G`}</Latex></td>
                  <td><Latex>{String.raw`C+G=2E`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`D,E,F`}</Latex></td>
                  <td><Latex>{String.raw`D+F=2E`}</Latex></td>
                </tr>
                <tr>
                  <td rowSpan={4}>{text("Ход конём", "Knight path")}</td>
                  <td><Latex>{String.raw`F,A,H`}</Latex></td>
                  <td><Latex>{String.raw`F+H=2A`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`D,C,H`}</Latex></td>
                  <td><Latex>{String.raw`D+H=2C`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`B,G,F`}</Latex></td>
                  <td><Latex>{String.raw`B+F=2G`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`B,J,D`}</Latex></td>
                  <td><Latex>{String.raw`B+D=2J`}</Latex></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "В первых четырёх последовательностях средним членом служит центр квадрата. В каждой из остальных четырёх переход от первого члена ко второму и затем от второго к третьему геометрически является шахматным ходом коня; поэтому их будем называть прогрессиями ходом коня.",
              "In the first four sequences the center of the square is the middle term. In each of the remaining four, the move from the first term to the second and then from the second to the third is geometrically a chess knight move; these will therefore be called knight-move progressions.",
            )}
          </p>
          <h3>{text("Полнота списка", "Completeness of the list")}</h3>
          <p>
            {text(
              "После вычитания E девять клеток имеют коэффициенты при x,y",
              "After subtracting E, the nine entries have the following x,y coefficients:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{pmatrix}
(1,0)&(-1,1)&(0,-1)\\
(-1,-1)&(0,0)&(1,1)\\
(0,1)&(1,-1)&(-1,0)
\end{pmatrix}.`}</Latex>
          <p>
            {text(
              "Пусть v — коэффициентный вектор средней клетки. Два различных конца с векторами u и w образуют с ней прогрессию тогда и только тогда, когда w=2v−u также присутствует в таблице. Для v=(0,0) существуют четыре противоположные пары; для каждого из четырёх угловых векторов (±1,0),(0,±1) — ровно одна пара; для четырёх боковых векторов пар нет. Следовательно, перечисленные восемь прогрессий исчерпывают все тождества вида U+W=2V между различными клетками общего магического квадрата.",
              "Let v be the coefficient vector of the middle entry. Two distinct endpoints with vectors u and w form a progression with it exactly when w=2v−u also occurs in the table. For v=(0,0) there are four opposite pairs; for each of the four corner vectors (±1,0),(0,±1) there is exactly one pair; and for the four side vectors there are none. Hence the eight displayed progressions exhaust all identities U+W=2V among distinct entries of the general magic square.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "2. Полная параметризация трёх квадратов",
              "2. Complete parametrization of three squares",
            )}
          </h2>
          <p>
            {text(
              "Рассмотрим одну из найденных прогрессий и потребуем, чтобы все три её члена были рациональными квадратами. Записав их как r²,s²,t² в порядке прогрессии, получаем",
              "Consider one of the progressions above and require all three of its terms to be rational squares. Writing them as r²,s²,t² in progression order gives",
            )}
          </p>
          <Latex display>{String.raw`
r^2+t^2=2s^2.`}</Latex>
          <p>
            {text(
              "Таким образом, одна квадратная прогрессия задаётся рациональной точкой на конике. Следующая теорема описывает все её точки.",
              "Thus a progression of squares is a rational point on a conic. The following theorem describes all of its points.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <p>
              {text(
                "Все рациональные решения уравнения r²+t²=2s² и только они задаются формулами",
                "All rational solutions of r²+t²=2s², and only those solutions, are given by",
              )}
            </p>
            <Latex display>{String.raw`
\begin{aligned}
r&=k(-m^2+2mn+n^2),\\
s&=k(m^2+n^2),\\
t&=k(m^2+2mn-n^2),
\end{aligned}
\qquad k,m,n\in\mathbb Q.`}</Latex>
          </div>
          <p>
            {text(
              "Следовательно, r²,s²,t² образуют арифметическую прогрессию. Знаки r,s,t не влияют на её квадратные члены.",
              "Consequently, r²,s²,t² form an arithmetic progression. The signs of r,s,t do not affect its squared entries.",
            )}
          </p>
          <h3>{text("Прямое направление", "Forward direction")}</h3>
          <p>{text("Непосредственное раскрытие скобок даёт", "Direct expansion gives")}</p>
          <Latex display>{String.raw`
r^2+t^2=2k^2(m^2+n^2)^2=2s^2,`}</Latex>
          <p>
            {text(
              "поэтому s²−r²=t²−s².",
              "so s²−r²=t²−s².",
            )}
          </p>
          <h3>{text("Обратное направление", "Reverse direction")}</h3>
          <p>
            {text(
              "Пусть r²+t²=2s². Введём",
              "Suppose r²+t²=2s². Define",
            )}
          </p>
          <Latex display>{String.raw`
u=\frac{r+t}{2},\qquad v=\frac{t-r}{2}.`}</Latex>
          <p>
            {text(
              "Тогда u²+v²=s². Если s+v≠0, положим",
              "Then u²+v²=s². If s+v≠0, set",
            )}
          </p>
          <Latex display>{String.raw`
m=s+v,\qquad n=u,\qquad k=\frac1{2(s+v)}.`}</Latex>
          <p>
            {text(
              "Из u²=s²−v² следуют равенства",
              "Using u²=s²−v² gives",
            )}
          </p>
          <Latex display>{String.raw`
2kmn=u,\qquad k(m^2-n^2)=v,\qquad k(m^2+n^2)=s.`}</Latex>
          <p>
            {text(
              "Так как r=u−v и t=u+v, получаются в точности заявленные формулы. В исключительном случае s+v=0 имеем u=0 и v=−s; его покрывает выбор m=0,n=1,k=s. Нулевое решение покрывается k=0. Значит, параметризация сюръективна.",
              "Since r=u−v and t=u+v, these are exactly the displayed formulas. In the exceptional case s+v=0, one has u=0 and v=−s; it is covered by m=0,n=1,k=s. The zero solution is covered by k=0. Hence the parametrization is surjective.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "3. Примитивные целочисленные прогрессии",
              "3. Primitive integral progressions",
            )}
          </h2>
          <p>
            {text(
              "Для ненулевой целочисленной тройки корней назовём представление примитивным, если gcd(r,s,t)=1. Всякая непостоянная примитивная тройка после выбора знаков корней и, при необходимости, обращения прогрессии получается из взаимно простых целых m,n разной чётности при k=1. Произвольная целочисленная тройка получается последующим умножением всех корней на общий целый множитель k.",
              "Call a nonzero integral root triple primitive when gcd(r,s,t)=1. Every nonconstant primitive triple, after choosing root signs and reversing the progression if necessary, is obtained with k=1 from coprime integers m,n of opposite parity. Every integral triple is then obtained by multiplying all roots by a common integer k.",
            )}
          </p>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Из r²+t²=2s² по модулю 2 следует, что r и t имеют одинаковую чётность. Если бы оба были чётными, то s²=2((r/2)²+(t/2)²) также было бы чётным, а значит, чётным было бы и s; это противоречит примитивности тройки. Поэтому r и t нечётны. Квадрат нечётного числа сравним с 1 по модулю 8, так что 2s²=r²+t²≡2 (mod 8). Следовательно, s²≡1 (mod 4), и s тоже нечётно. Теперь u=(r+t)/2 и v=(t−r)/2 целые и удовлетворяют u²+v²=s². Их общий делитель делил бы r=u−v, t=u+v, а затем и s, поэтому gcd(u,v)=1. Одинаковой чётности они также быть не могут: чётность 0 противоречит взаимной простоте, а сумма двух нечётных квадратов не является квадратом по модулю 4.",
              "Reducing r²+t²=2s² modulo 2 shows that r and t have the same parity. If both were even, then s²=2((r/2)²+(t/2)²) would also be even, hence s would be even as well, contradicting primitiveness. Thus r and t are odd. The square of an odd integer is 1 modulo 8, so 2s²=r²+t²≡2 (mod 8). Therefore s²≡1 (mod 4), and s is odd too. Now u=(r+t)/2 and v=(t−r)/2 are integers satisfying u²+v²=s². A common divisor would divide r=u−v and t=u+v, and then s as well, so gcd(u,v)=1. They cannot have the same parity either: even parity contradicts coprimality, while a sum of two odd squares is not a square modulo 4.",
            )}
          </p>
          <p>
            {text(
              "После перестановки u,v можно считать u чётным. Тогда (s+v)(s−v)=u², причём gcd(s+v,s−v)=2. Поэтому взаимно простые числа (s+v)/2 и (s−v)/2 имеют квадратное произведение и сами являются квадратами m² и n². Получаем u=2mn, v=m²−n², s=m²+n², где gcd(m,n)=1 и m,n разной чётности. Возвращение к r=u−v и t=u+v даёт формулы предыдущей теоремы.",
              "After swapping u and v, assume u is even. Then (s+v)(s−v)=u² and gcd(s+v,s−v)=2. Hence the coprime integers (s+v)/2 and (s−v)/2 have square product and are themselves squares m² and n². Thus u=2mn, v=m²−n², s=m²+n², where gcd(m,n)=1 and m,n have opposite parity. Returning to r=u−v and t=u+v gives the formulas of the preceding theorem.",
            )}
          </p>
          <p>
            {text(
              "Постоянная прогрессия r²=s²=t² соответствует вырожденному случаю mn(m²−n²)=0. В задачах с попарно различными клетками этот случай исключается.",
              "The constant progression r²=s²=t² is the degenerate case mn(m²−n²)=0. It is excluded in problems requiring pairwise distinct entries.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Нормированный шаг dir(m,n)", "4. The normalized difference dir(m,n)")}</h2>
          <p>
            {text(
              "Параметр k отвечает только за общий масштаб корней: его умножение на λ умножает все три квадратных члена на λ². Для сопоставления прогрессий внутри одного магического квадрата удобно выделить величины, зависящие только от отношения m:n. Введём",
              "The parameter k controls only the common scale of the roots: multiplying it by λ multiplies all three squared terms by λ². To compare progressions within one magic square, it is useful to isolate quantities that depend only on the ratio m:n. Define",
            )}
          </p>
          <Latex display>{String.raw`
f(m,n)=mn(m^2-n^2),\qquad
c(m,n)=(m^2+n^2)^2,\qquad
\operatorname{dir}(m,n)=\frac{f(m,n)}{c(m,n)}.`}</Latex>
          <p>
            {text(
              "Для параметризованной прогрессии её средний квадрат V=s² и ориентированный шаг Δ=s²−r²=t²−s² равны",
              "For the parametrized progression, its middle square V=s² and oriented difference Δ=s²−r²=t²−s² are",
            )}
          </p>
          <Latex display>{String.raw`
V=k^2c(m,n),\qquad
\Delta=4k^2f(m,n).`}</Latex>
          <p>
            {text(
              "Если V≠0, общий масштаб k сокращается и остаётся безразмерное отношение",
              "If V≠0, the common scale k cancels and leaves the dimensionless ratio",
            )}
          </p>
          <Latex display>{String.raw`
\frac{\Delta}{V}=4\operatorname{dir}(m,n).`}</Latex>
          <aside className="literature-note">
            <h3>{text("Терминология", "Terminology")}</h3>
            <p>
              {text(
                "Параметризация трёх квадратов в арифметической прогрессии является классической. Обозначение dir и использование этой функции как нормированной координаты прогрессии приняты внутри проекта; это не общепринятый термин.",
                "The parametrization of three squares in arithmetic progression is classical. The notation dir and its use as a normalized coordinate of the progression are project conventions, not standard terminology.",
              )}
            </p>
          </aside>
        </section>

        <section>
          <h2>
            {text(
              "5. Восемь прогрессий в координатах dir",
              "5. The eight progressions in dir coordinates",
            )}
          </h2>
          <p>
            {text(
              "Вернёмся к общему магическому квадрату. Для каждой из восьми прогрессий средний член V и ориентированный шаг Δ являются линейными формами от E,x,y. Если её три члена — ненулевые рациональные квадраты, параметризация предыдущего раздела переводит условие квадратности в уравнение Δ/V=4dir(m,n):",
              "Return now to the general magic square. For each of its eight progressions, the middle term V and oriented difference Δ are linear forms in E,x,y. If its three terms are nonzero rational squares, the preceding parametrization turns the square condition into the equation Δ/V=4dir(m,n):",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Путь", "Path")}</th>
                  <th><Latex>{String.raw`V`}</Latex></th>
                  <th><Latex>{String.raw`\Delta`}</Latex></th>
                  <th>{text("Нормированное уравнение", "Normalized equation")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Latex>{String.raw`J,E,A`}</Latex></td>
                  <td><Latex>{String.raw`E`}</Latex></td>
                  <td><Latex>{String.raw`x`}</Latex></td>
                  <td><Latex>{String.raw`\frac{x}{E}=4\operatorname{dir}(m,n)`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`H,E,B`}</Latex></td>
                  <td><Latex>{String.raw`E`}</Latex></td>
                  <td><Latex>{String.raw`y-x`}</Latex></td>
                  <td><Latex>{String.raw`\frac{y-x}{E}=4\operatorname{dir}(m,n)`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`C,E,G`}</Latex></td>
                  <td><Latex>{String.raw`E`}</Latex></td>
                  <td><Latex>{String.raw`y`}</Latex></td>
                  <td><Latex>{String.raw`\frac{y}{E}=4\operatorname{dir}(m,n)`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`D,E,F`}</Latex></td>
                  <td><Latex>{String.raw`E`}</Latex></td>
                  <td><Latex>{String.raw`x+y`}</Latex></td>
                  <td><Latex>{String.raw`\frac{x+y}{E}=4\operatorname{dir}(m,n)`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`H,A,F`}</Latex></td>
                  <td><Latex>{String.raw`E+x`}</Latex></td>
                  <td><Latex>{String.raw`y`}</Latex></td>
                  <td><Latex>{String.raw`\frac{y}{E+x}=4\operatorname{dir}(m,n)`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`D,C,H`}</Latex></td>
                  <td><Latex>{String.raw`E-y`}</Latex></td>
                  <td><Latex>{String.raw`x`}</Latex></td>
                  <td><Latex>{String.raw`\frac{x}{E-y}=4\operatorname{dir}(m,n)`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`B,G,F`}</Latex></td>
                  <td><Latex>{String.raw`E+y`}</Latex></td>
                  <td><Latex>{String.raw`x`}</Latex></td>
                  <td><Latex>{String.raw`\frac{x}{E+y}=4\operatorname{dir}(m,n)`}</Latex></td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`B,J,D`}</Latex></td>
                  <td><Latex>{String.raw`E-x`}</Latex></td>
                  <td><Latex>{String.raw`-y`}</Latex></td>
                  <td><Latex>{String.raw`\frac{-y}{E-x}=4\operatorname{dir}(m,n)`}</Latex></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Дробная запись удобна для сравнения линий, но не нужна для существования: однородные равенства V=k²c(m,n) и Δ=4k²f(m,n) остаются корректными и при V=0.",
              "The quotient form is convenient for comparing lines but is not needed for existence: the homogeneous equations V=k²c(m,n) and Δ=4k²f(m,n) remain valid when V=0.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Симметрии параметров", "6. Parameter symmetries")}</h2>
          <p>
            {text(
              "Функция dir зависит только от отношения m:n и учитывает ориентацию прогрессии. Непосредственно из определения следуют тождества",
              "The dir function depends only on the ratio m:n and records the orientation of the progression. Its definition immediately gives",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
\operatorname{dir}(\lambda m,\lambda n)&=\operatorname{dir}(m,n),&
\operatorname{dir}(n,m)&=-\operatorname{dir}(m,n),\\
\operatorname{dir}(m,-n)&=-\operatorname{dir}(m,n),&
\operatorname{dir}(m+n,m-n)&=\operatorname{dir}(m,n),
\end{aligned}
\qquad \lambda\ne0.`}</Latex>
          <p>
            {text(
              "Смена знака dir обращает порядок квадратных членов, а сохранение dir оставляет тот же нормированный шаг. Поэтому параметры одной прогрессии не уникальны. При работе с целыми примитивными тройками удобно выбирать m,n взаимно простыми, разной чётности и фиксировать порядок и знаки отдельно.",
              "Changing the sign of dir reverses the order of the squared entries, while preserving dir keeps the same normalized difference. Thus the parameters of one progression are not unique. For primitive integral triples it is convenient to choose coprime m,n of opposite parity and record order and signs separately.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "7. Конгруэнтные числа и квадратный класс шага",
              "7. Congruent numbers and the square class of the difference",
            )}
          </h2>
          <p>
            {text(
              "Из прогрессии r²,s²,t² с шагом Δ получается прямоугольный треугольник",
              "A progression r²,s²,t² with difference Δ gives the right triangle",
            )}
          </p>
          <Latex display>{String.raw`
(t-r)^2+(t+r)^2=(2s)^2,\qquad
\frac{(t-r)(t+r)}2=\Delta.`}</Latex>
          <p>
            {text(
              "Следовательно, положительный целый шаг является конгруэнтным числом. Для произвольного положительного рационального шага та же конструкция задаёт рациональный прямоугольный треугольник площади Δ; после умножения на рациональный квадрат можно выбрать целого представителя того же квадратного класса. Поскольку Δ=4k²f(m,n),",
              "Consequently, a positive integral difference is a congruent number. For an arbitrary positive rational difference, the same construction gives a rational right triangle of area Δ; after multiplication by a rational square, one may choose an integral representative of the same square class. Since Δ=4k²f(m,n),",
            )}
          </p>
          <Latex display>{String.raw`
[\Delta]=[f(m,n)].`}</Latex>
          <p>
            {text(
              "Две параметризованные прогрессии можно масштабировать до одного и того же ненулевого шага тогда и только тогда, когда отношение их f-значений является рациональным квадратом. Для целых параметров этот класс можно кодировать свободной от квадратов частью f(m,n); именно отсюда далее возникает tfmn-подход.",
              "Two parametrized progressions can be scaled to the same nonzero difference exactly when the ratio of their f-values is a rational square. For integral parameters this class can be encoded by the squarefree part of f(m,n); this is the source of the tfmn method developed later.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "8. От одной прогрессии к квадратным конфигурациям",
              "8. From one progression to square configurations",
            )}
          </h2>
          <p>
            {text(
              "Параметризация одной прогрессии является полным локальным строительным блоком: она перечисляет все рациональные прогрессии квадратов и после примитивной нормализации — все целочисленные. Если квадратная конфигурация 4/9 или 5/9 содержит только одну нелинейную связь такого типа, сначала выбирается параметризованная прогрессия, после чего E,x,y восстанавливаются из оставшихся линейных условий.",
              "The parametrization of one progression is a complete local building block: it lists every rational progression of squares and, after primitive normalization, every integral one. If a 4/9 or 5/9 square configuration contains only one nonlinear relation of this kind, one first chooses a parametrized progression and then recovers E,x,y from the remaining linear conditions.",
            )}
          </p>
          <p>
            {text(
              "При наличии нескольких квадратных прогрессий их параметры должны одновременно описывать общие клетки и одни и те же координаты E,x,y. Поэтому локальные параметризации дополняются уравнениями совместимости масштабов. Совпадение квадратных классов шагов приводит к tfmn-уравнениям; другие способы совмещения дают коники, уравнения норм и эллиптические кривые. Так параметризация одной прогрессии переходит в теорию конфигураций 5/9, 6/9 и 7/9.",
              "When several progressions are required to consist of squares, their parameters must simultaneously describe shared entries and the same coordinates E,x,y. The local parametrizations are therefore supplemented by scale-compatibility equations. Equality of the square classes of the differences leads to tfmn equations; other compatibility patterns produce conics, norm equations, and elliptic curves. In this way the parametrization of one progression develops into the theory of 5/9, 6/9, and 7/9 configurations.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/fmn-tfmn">
              {text("Функции fmn и tfmn", "The fmn and tfmn functions")}{" "}
              <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/proofs/general">
              {text("Общая теория масок 4/9 и 5/9", "General theory of 4/9 and 5/9 patterns")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

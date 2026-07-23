import { Latex } from "./components/Latex";
import { TheoryLink } from "./TheoryPages";
import { useLocale } from "./i18n";

export function PrimeDivisorsTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page prime-divisors-theory-page">
      <TheoryLink className="back-link" to="/theory">
        ← {text("К оглавлению теории", "Back to theory contents")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text("Арифметика минимального 9/9", "Arithmetic of a minimal 9/9 square")}
          </p>
          <h1>
            {text(
              "Простые делители минимального квадрата 9/9",
              "Prime divisors in a minimal 9/9 square",
            )}
          </h1>
          <p>
            {text(
              "Разложения в суммы двух квадратов определяют возможные простые делители центрального корня и исключают простые 8k+3 из всех остальных корней.",
              "Representations as sums of two squares determine the possible prime divisors of the central root and exclude primes of the form 8k+3 from every other root.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document prime-divisors-theory-document">
        <section>
          <h2>{text("1. Условия и обозначения", "1. Assumptions and notation")}</h2>
          <p>
            {text(
              "Рассмотрим магический квадрат 3×3, все девять клеток которого являются положительными попарно различными квадратами целых чисел:",
              "Consider a 3×3 magic square whose nine entries are positive, pairwise distinct squares of integers:",
            )}
          </p>
          <Latex display>{String.raw`\mathcal M(e^2,x,y)=
\begin{pmatrix}
a^2&b^2&c^2\\
d^2&e^2&f^2\\
g^2&h^2&j^2
\end{pmatrix}.`}</Latex>
          <p>
            {text(
              "Квадрат называется минимальным, если корни его клеток взаимно просты в совокупности:",
              "The square is called minimal when all entry roots are coprime as a collection:",
            )}
          </p>
          <Latex display>{String.raw`\gcd(a,b,c,d,e,f,g,h,j)=1.`}</Latex>
          <p>
            {text(
              "Это равносильно невозможности разделить все клетки на один и тот же квадрат целого числа, больший единицы. Далее факторизуются именно корни клеток; показатели простых в самих клетках вдвое больше.",
              "Equivalently, the entries cannot all be divided by the same integer square greater than one. All factorizations below concern entry roots; prime exponents in the entries themselves are twice as large.",
            )}
          </p>
          <p>
            <TheoryLink className="general-proof-link" to="/theory/magic-squares-3x3">
              {text(
                "Общая форма магического квадрата 3×3",
                "The general form of a 3×3 magic square",
              )} →
            </TheoryLink>
          </p>
        </section>

        <section>
          <h2>{text("2. Два набора тождеств", "2. Two sets of identities")}</h2>
          <p>
            {text(
              "Каждая пара клеток, противоположных относительно центра, имеет сумму 2e²:",
              "Every pair of entries opposite through the center has sum 2e²:",
            )}
          </p>
          <Latex display>{String.raw`
a^2+j^2=b^2+h^2=c^2+g^2=d^2+f^2=2e^2.
`}</Latex>
          <p>
            {text(
              "Кроме того, каждый угол является средним членом арифметической прогрессии, концы которой находятся в двух боковых клетках:",
              "Moreover, every corner is the middle term of an arithmetic progression whose endpoints are two side entries:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
f^2+h^2&=2a^2,& d^2+h^2&=2c^2,\\
b^2+f^2&=2g^2,& b^2+d^2&=2j^2.
\end{aligned}
`}</Latex>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "В форме m(e²,x,y) отклонения четырёх противоположных пар от центра равны x, y−x, y и x+y. Сложение элементов каждой пары уничтожает отклонение и даёт 2e². Для первой угловой прогрессии получаем",
              "In the form m(e²,x,y), the offsets of the four opposite pairs from the center are x, y−x, y, and x+y. Adding each pair cancels its offset and gives 2e². For the first corner-centered progression,",
            )}
          </p>
          <Latex display>{String.raw`
(e^2+x+y)+(e^2+x-y)=2(e^2+x)=2a^2.
`}</Latex>
          <p>
            {text(
              "Остальные три равенства получаются тем же раскрытием или поворотом квадрата.",
              "The other three identities follow by the same expansion or by rotating the square.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "3. Простые 4k+3 и сумма двух квадратов",
              "3. Primes 4k+3 and a sum of two squares",
            )}
          </h2>
          <div className="theorem-block">
            <h3>{text("Лемма", "Lemma")}</h3>
            <p>
              {text(
                "Пусть q — простое число, q≡3 (mod 4). Если q делит u²+v², то q делит и u, и v.",
                "Let q be prime with q≡3 (mod 4). If q divides u²+v², then q divides both u and v.",
              )}
            </p>
          </div>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "Если v не делится на q, то класс uv⁻¹ был бы квадратным корнем из −1 по модулю q. Но по критерию Эйлера",
              "If v were not divisible by q, then the class uv⁻¹ would be a square root of −1 modulo q. Euler's criterion gives",
            )}
          </p>
          <Latex display>{String.raw`
\left(\frac{-1}{q}\right)=(-1)^{(q-1)/2}=-1,
`}</Latex>
          <p>
            {text(
              "поэтому такого корня нет. Значит, q делит v, после чего из q∣u² следует q∣u.",
              "so no such root exists. Hence q divides v, and then q∣u² implies q∣u.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Форма через показатели", "Valuation form")}</h3>
            <p>
              {text(
                "Если u и v не равны нулю одновременно, то",
                "If u and v are not both zero, then",
              )}
            </p>
            <Latex display>{String.raw`
v_q(u^2+v^2)=2\min\{v_q(u),v_q(v)\}.
`}</Latex>
          </div>
          <p>
            {text(
              "Действительно, после вынесения общей степени q оставшаяся сумма двух квадратов не делится на q по доказанной лемме.",
              "Indeed, after removing the common power of q, the remaining sum of two squares is not divisible by q by the lemma.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "4. Единственное примитивное разложение одной простой степени",
              "4. The unique primitive representation of one prime power",
            )}
          </h2>
          <h3>{text("Почему в ℤ[i] есть единственность факторизации", "Why factorization is unique in ℤ[i]")}</h3>
          <p>
            {text(
              "Для z=u+iv положим N(z)=u²+v². Если α,β∈ℤ[i] и β≠0, округлим действительную и мнимую части α/β до ближайших целых чисел и получим γ∈ℤ[i]. Тогда для остатка ρ=α−γβ выполняется",
              "For z=u+iv put N(z)=u²+v². Given α,β∈ℤ[i] with β≠0, round the real and imaginary parts of α/β to the nearest integers to obtain γ∈ℤ[i]. Then the remainder ρ=α−γβ satisfies",
            )}
          </p>
          <Latex display>{String.raw`
N(\rho)=N(\beta)\left|\frac{\alpha}{\beta}-\gamma\right|^2
\le\frac12N(\beta)<N(\beta).
`}</Latex>
          <p>
            {text(
              "Следовательно, норма является евклидовой функцией. Евклидов алгоритм даёт наибольший общий делитель и тождество Безу. Поэтому каждый неприводимый элемент прост: если π∣αβ и π∤α, то gcd(π,α)=1, а умножение тождества Безу на β даёт π∣β. Разложение на неприводимые существует по убыванию положительной нормы, а простота неприводимых последовательно сокращает одинаковые множители в двух разложениях. Тем самым ℤ[i] является кольцом с единственностью факторизации.",
              "Thus the norm is Euclidean. The Euclidean algorithm gives greatest common divisors and Bézout identities. Hence every irreducible is prime: if π∣αβ and π∤α, then gcd(π,α)=1, and multiplying a Bézout identity by β gives π∣β. Factorization into irreducibles exists by descent on the positive norm, and primality of irreducibles successively cancels matching factors from any two factorizations. Therefore ℤ[i] is a unique factorization domain.",
            )}
          </p>

          <h3>{text("Расщепление простого p≡1 (mod 4)", "Splitting a prime p≡1 (mod 4)")}</h3>
          <p>
            {text(
              "По критерию Эйлера существует t, для которого t²≡−1 (mod p). Поэтому p делит (t+i)(t−i), но не делит ни один множитель в ℤ[i]: делимость на рациональное p потребовала бы делимости на p обеих координат, включая координату ±1. Значит, p не является простым элементом ℤ[i] и раскладывается нетривиально. Нормы двух нетривиальных множителей перемножаются в p², поэтому каждая равна p. Выбирая один из них как π, получаем",
              "Euler's criterion gives an integer t with t²≡−1 (mod p). Hence p divides (t+i)(t−i), but divides neither factor in ℤ[i]: divisibility by the rational integer p would require both coordinates, including ±1, to be divisible by p. Thus p is not prime in ℤ[i] and factors nontrivially. The norms of the two nonunit factors multiply to p², so each norm is p. Choosing one factor as π gives",
            )}
          </p>
          <Latex display>{String.raw`p=\pi\bar\pi,\qquad N(\pi)=p.`}</Latex>

          <p>
            {text(
              "Два представления N=u²+v² считаются одинаковыми, если они отличаются перестановкой u,v или знаками. Представление называется p-примитивным, если p не делит одновременно u и v.",
              "Two representations N=u²+v² are identified when they differ only by swapping u,v or changing signs. A representation is p-primitive when p does not divide both u and v.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Гауссова лемма", "Gaussian lemma")}</h3>
            <p>
              {text(
                "Если p≡1 (mod 4) — простое и α≥1, то число 2p²ᵅ имеет ровно одно p-примитивное представление суммой двух квадратов с точностью до указанной эквивалентности.",
                "If p≡1 (mod 4) is prime and α≥1, then 2p²ᵅ has exactly one p-primitive representation as a sum of two squares, up to the stated equivalence.",
              )}
            </p>
          </div>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "В кольце гауссовых целых выберем простое π, для которого p=ππ̄. Из единственности факторизации любой элемент z=u+iv нормы 2p²ᵅ с точностью до умножения на единицу имеет вид",
              "In the Gaussian integers choose a prime π with p=ππ̄. By unique factorization, every element z=u+iv of norm 2p²ᵅ has, up to a unit, the form",
            )}
          </p>
          <Latex display>{String.raw`
z\sim(1+i)\pi^r\bar\pi^{\,2\alpha-r},
\qquad 0\le r\le2\alpha.
`}</Latex>
          <p>
            {text(
              "Условие p∣u и p∣v равносильно делимости z на p=ππ̄. Оно выполняется ровно при 1≤r≤2α−1. Остаются r=0 и r=2α; соответствующие элементы сопряжены и задают одно представление после перестановки и изменения знаков.",
              "The condition p∣u and p∣v is equivalent to divisibility of z by p=ππ̄. It holds exactly for 1≤r≤2α−1. The remaining cases r=0 and r=2α are conjugate and yield one representation after swapping coordinates and changing signs.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "5. Факторизация центрального корня",
              "5. Factorization of the central root",
            )}
          </h2>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <p>
              {text(
                "Центральный корень e минимального квадрата 9/9 имеет вид",
                "The central root e of a minimal 9/9 square has the form",
              )}
            </p>
            <Latex display>{String.raw`
e=\prod_{i=1}^{r}p_i^{\alpha_i},
\qquad
r\ge2,\quad p_i\equiv1\pmod4,\quad \alpha_i\ge1,
`}</Latex>
            <p>
              {text(
                "где p₁,…,pᵣ — попарно различные простые числа.",
                "where p₁,…,pᵣ are pairwise distinct primes.",
              )}
            </p>
          </div>

          <h3>{text("Исключение простых 4k+3", "Excluding primes 4k+3")}</h3>
          <p>
            {text(
              "Пусть простое q≡3 (mod 4) делит e. Каждая из четырёх противоположных пар удовлетворяет u²+v²=2e², поэтому предыдущая лемма заставляет q делить оба её корня. Тогда q делит все девять корней, что противоречит минимальности.",
              "Suppose a prime q≡3 (mod 4) divides e. Each of the four opposite pairs satisfies u²+v²=2e², so the preceding lemma forces q to divide both roots in every pair. Thus q divides all nine roots, contradicting minimality.",
            )}
          </p>

          <h3>{text("Исключение числа 2", "Excluding 2")}</h3>
          <p>
            {text(
              "Если e чётно, то 2e² делится на 8. Сумма двух квадратов может делиться на 8 только тогда, когда оба корня чётны. Четыре равенства для противоположных пар снова сделали бы все корни чётными. Следовательно, e нечётно.",
              "If e were even, then 2e² would be divisible by 8. A sum of two squares can be divisible by 8 only when both roots are even. The four opposite-pair equations would again make every root even. Hence e is odd.",
            )}
          </p>
          <p>
            {text(
              "Итак, каждый простой делитель e имеет вид 4k+1.",
              "Therefore every prime divisor of e is congruent to 1 modulo 4.",
            )}
          </p>

          <h3>
            {text(
              "Не менее двух различных делителей",
              "At least two distinct divisors",
            )}
          </h3>
          <p>
            {text(
              "Случай e=1 невозможен: число 2 имеет только представление 1²+1², тогда как четыре пары различных нецентральных клеток должны давать четыре различных представления 2e².",
              "The case e=1 is impossible: 2 has only the representation 1²+1², whereas the four pairs of distinct noncentral entries must give four distinct representations of 2e².",
            )}
          </p>
          <p>
            {text(
              "Предположим теперь, что у e имеется только один различный простой делитель. Тогда e=pᵅ для некоторого p≡1 (mod 4). Четыре пары противоположных нецентральных клеток дают четыре различных представления 2p²ᵅ. По гауссовой лемме не более одной пары является p-примитивной. Поэтому по модулю p ненулевой может остаться не более чем одна пара противоположных клеток.",
              "Now suppose e has only one distinct prime divisor. Then e=pᵅ for some p≡1 (mod 4). The four opposite pairs of noncentral entries give four distinct representations of 2p²ᵅ. By the Gaussian lemma, at most one pair is p-primitive. Thus modulo p at most one pair of opposite entries can remain nonzero.",
            )}
          </p>
          <p>
            {text(
              "Магическая константа равна 3e² и потому равна нулю по модулю p. Возьмём строку или столбец, содержащие одну клетку оставшейся пары, но не содержащие противоположную. Две другие клетки этой линии равны нулю, поэтому её сумма заставляет равняться нулю и третью клетку. Значит, p делит также корни последней пары, а затем все девять корней. Получено противоречие с минимальностью.",
              "The magic constant is 3e² and is therefore zero modulo p. Choose a row or column containing one entry of the remaining pair but not its opposite. The other two entries on that line are zero, so the line sum forces the third one to be zero as well. Hence p also divides the roots in the last pair and therefore all nine roots, again contradicting minimality.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "6. Число представлений числа 2e²",
              "6. The number of representations of 2e²",
            )}
          </h2>
          <p>
            {text(
              "Пусть e имеет доказанную факторизацию. Число неупорядоченных положительных представлений 2e²=u²+v² с точностью до знаков равно",
              "Let e have the proved factorization. The number of unordered positive representations 2e²=u²+v², up to signs, is",
            )}
          </p>
          <Latex display>{String.raw`
R(2e^2)=\frac{1+\prod_{i=1}^{r}(2\alpha_i+1)}{2}.
`}</Latex>
          <h3>{text("Доказательство", "Proof")}</h3>
          <p>
            {text(
              "В гауссовой факторизации для каждой пары πᵢ,π̄ᵢ можно независимо выбрать показатель πᵢ от 0 до 2αᵢ; это даёт ∏(2αᵢ+1) вариантов до умножения на единицы. В обычном подсчёте упорядоченных представлений получается 4∏(2αᵢ+1) решений со знаками. Единственное диагональное представление — e²+e². Оно имеет четыре, а каждое недиагональное неупорядоченное представление — восемь упорядоченных знаковых вариантов, откуда следует формула.",
              "In the Gaussian factorization, for each pair πᵢ,π̄ᵢ one may independently choose the exponent of πᵢ from 0 through 2αᵢ, giving ∏(2αᵢ+1) choices before units. The standard ordered count is therefore 4∏(2αᵢ+1), including signs. The unique diagonal representation is e²+e²; it contributes four signed ordered solutions, whereas every nondiagonal unordered representation contributes eight. The formula follows.",
            )}
          </p>
          <p>
            {text(
              "Сам квадрат использует пять различных представлений: четыре пары противоположных клеток и центральную пару e²+e².",
              "The square itself uses five distinct representations: four opposite-entry pairs and the central pair e²+e².",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "7. Простые делители нецентральных корней",
              "7. Prime divisors of noncentral roots",
            )}
          </h2>
          <div className="theorem-block">
            <h3>{text("Теорема", "Theorem")}</h3>
            <p>
              {text(
                "Пусть q≡3 (mod 4) — простой делитель любого из восьми нецентральных корней минимального квадрата 9/9. Тогда",
                "Let q≡3 (mod 4) be a prime divisor of any of the eight noncentral roots of a minimal 9/9 square. Then",
              )}
            </p>
            <Latex display>{String.raw`q\equiv7\pmod8.`}</Latex>
          </div>
          <p>
            {text(
              "Из теоремы о центре следует q∤e.",
              "The central-root theorem gives q∤e.",
            )}
          </p>

          <h3>{text("Угловая клетка", "A corner entry")}</h3>
          <p>
            {text(
              "По симметрии достаточно рассмотреть q∣a. Из f²+h²=2a² и леммы о простых 4k+3 следует q∣f и q∣h. В координатах m(e²,x,y) разности f²−a²=y и h²−a²=−y, поэтому y≡0 (mod q). Из a²=e²+x≡0 получаем x≡−e². Следовательно,",
              "By symmetry it suffices to assume q∣a. From f²+h²=2a² and the lemma for primes 4k+3, q divides both f and h. In the coordinates m(e²,x,y), the differences f²−a²=y and h²−a²=−y give y≡0 (mod q). Since a²=e²+x≡0, we obtain x≡−e². Therefore",
            )}
          </p>
          <Latex display>{String.raw`b^2=e^2-x+y\equiv2e^2\pmod q.`}</Latex>
          <p>
            {text(
              "Поскольку q не делит e, число 2 является ненулевым квадратом по модулю q.",
              "Since q does not divide e, the number 2 is a nonzero square modulo q.",
            )}
          </p>

          <h3>{text("Боковая клетка", "A side entry")}</h3>
          <p>
            {text(
              "По симметрии положим q∣b. Используем две угловые прогрессии",
              "By symmetry assume q∣b. Use the two corner-centered progressions",
            )}
          </p>
          <Latex display>{String.raw`
b^2+d^2=2j^2,\qquad b^2+f^2=2g^2.
`}</Latex>
          <p>
            {text(
              "Если хотя бы один из j,g не делится на q, соответствующее равенство сразу показывает, что 2 — квадрат по модулю q. Если q делит и j, и g, то он делит также d и f. Равенства j²=e²−x≡0 и g²=e²+y≡0 дают x≡e² и y≡−e², после чего f²=e²+x+y≡e². Это противоречит одновременно q∣f и q∤e. Следовательно, 2 снова является квадратом по модулю q.",
              "If at least one of j,g is not divisible by q, the corresponding identity immediately shows that 2 is a square modulo q. If q divides both j and g, then it also divides d and f. The congruences j²=e²−x≡0 and g²=e²+y≡0 give x≡e² and y≡−e², whence f²=e²+x+y≡e². This contradicts q∣f together with q∤e. Thus 2 is again a square modulo q.",
            )}
          </p>

          <h3>{text("Завершение", "Conclusion")}</h3>
          <p>
            {text(
              "Дополнительный закон для символа Лежандра имеет вид",
              "The supplementary law for the Legendre symbol is",
            )}
          </p>
          <Latex display>{String.raw`
\left(\frac2q\right)=(-1)^{(q^2-1)/8}.
`}</Latex>
          <p>
            {text(
              "При q≡3 (mod 4) возможны классы 3 и 7 по модулю 8. Число 2 является квадратом только во втором из них, поэтому q≡7 (mod 8).",
              "For q≡3 (mod 4), the possible classes modulo 8 are 3 and 7. The number 2 is a square only in the latter class, so q≡7 (mod 8).",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Итоговая факторизационная граница", "8. Final factorization boundary")}</h2>
          <p>
            {text(
              "В центральном корне встречаются только простые 1 или 5 по модулю 8, причём различных простых не менее двух. В любом нецентральном корне простой делитель 3 по модулю 4 может иметь только класс 7 по модулю 8; классы 3 по модулю 8 исключены.",
              "The central root contains only primes congruent to 1 or 5 modulo 8, with at least two distinct primes. In every noncentral root, a prime divisor congruent to 3 modulo 4 can only lie in the class 7 modulo 8; primes congruent to 3 modulo 8 are excluded.",
            )}
          </p>
          <p>
            {text(
              "Вместе с ограничениями по модулю 24 все девять корней нечётны и не делятся на 3. Эти условия необходимы, но сами по себе не достаточны для существования квадрата 9/9.",
              "Together with the restrictions modulo 24, all nine roots are odd and not divisible by 3. These conditions are necessary but are not by themselves sufficient for the existence of a 9/9 square.",
            )}
          </p>
          <p>
            <TheoryLink className="general-proof-link" to="/theory/residues">
              {text(
                "Вычеты и квадратичные вычеты",
                "Residues and quadratic residues",
              )} →
            </TheoryLink>
          </p>
        </section>
      </div>
    </article>
  );
}

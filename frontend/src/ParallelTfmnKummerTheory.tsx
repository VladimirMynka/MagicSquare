import { Latex } from "./components/Latex";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { EllipticTermsNote, TheoryLink } from "./TheoryPages";

export function ParallelTfmnKummerTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page parallel-tfmn-kummer-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.10",
              "Elliptic surfaces for 6/9 patterns · 5.10",
            )}
          </p>
          <h1>
            {text(
              "Маски ABEFGJ и ABDFHJ: tfmn как общая Kummer–K3-поверхность",
              "The ABEFGJ and ABDFHJ Patterns: tfmn as a Shared Kummer K3 Surface",
            )}
          </h1>
          <p>
            {text(
              "У двух параллельных прямоугольных типов параметризация красных коник превращает жёлтую квадрику в точное равенство шагов, эквивалентное равенству tf. Обе маски являются двумя линейными прочтениями одной Kummer–K3-поверхности.",
              "For the two parallel rectangular types, parametrizing the red conics turns the yellow quadric into exact equality of their differences, equivalently equality of tf. The two patterns are linear readings of the same Kummer K3 surface.",
            )}
          </p>
        </div>
        <aside
          aria-label={text(
            "Сравнение масок ABEFGJ и ABDFHJ",
            "Comparison of the ABEFGJ and ABDFHJ patterns",
          )}
          className="six-nine-theory-mask-pair proof-header-mask-pair"
        >
          <SixNineMaskDiagram
            caption={text(
              "ABEFGJ: красные AEJ, BFG; жёлтая ABFJ",
              "ABEFGJ: red AEJ, BFG; yellow ABFJ",
            )}
            first="AEJ"
            mask="ABEFGJ"
            second="BFG"
            third="ABFJ"
          />
          <SixNineMaskDiagram
            caption={text(
              "ABDFHJ: красные AFH, BDJ; жёлтая BDFH",
              "ABDFHJ: red AFH, BDJ; yellow BDFH",
            )}
            first="AFH"
            mask="ABDFHJ"
            second="BDJ"
            third="BDFH"
          />
        </aside>
      </header>

      <div className="proof-document topic-document parallel-tfmn-kummer-theory-document">
        <EllipticTermsNote />
        <section>
          <h2>{text("1. Две точные системы", "1. Two exact systems")}</h2>
          <p>
            {text(
              "Пусть строчные буквы обозначают рациональные корни выбранных клеток. Предпочтительный базис квадрик для ABEFGJ имеет вид",
              "Let lowercase letters denote rational square roots of the selected entries. The preferred basis of quadrics for ABEFGJ is",
            )}
          </p>
          <Latex display>{String.raw`
\mathrm{ABEFGJ}:\qquad
\begin{cases}
a^2+j^2=2e^2,\\
b^2+f^2=2g^2,\\
a^2+b^2=f^2+j^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Первые две строки — прогрессии AEJ и BGF. Третья строка — жёлтая гауссова связь ABFJ. Для ABDFHJ соответствующая система равна",
              "The first two equations are the AEJ and BGF progressions. The third is the yellow Gaussian relation ABFJ. For ABDFHJ the corresponding system is",
            )}
          </p>
          <Latex display>{String.raw`
\mathrm{ABDFHJ}:\qquad
\begin{cases}
f^2+h^2=2a^2,\\
b^2+d^2=2j^2,\\
b^2+h^2=d^2+f^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Здесь красными прогрессиями являются HAF и DJB, а жёлтая связь имеет поддержку BDFH. По общей теории масок каждая из этих трёхстрочных систем необходима и достаточна для восстановления координат E,x,y своего магического квадрата.",
              "Here the red progressions are HAF and DJB, and the yellow relation is supported on BDFH. By the general pattern theory, each three-equation system is necessary and sufficient for recovering the coordinates E,x,y of its magic square.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Универсальная красная коника", "2. The universal red conic")}</h2>
          <p>{text("Для рациональных m,n положим", "For rational m,n put")}</p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
R(m,n)&=-m^2+2mn+n^2,\\
S(m,n)&=m^2+n^2,\\
W(m,n)&=m^2+2mn-n^2,\\
f(m,n)&=mn(m-n)(m+n).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Два тождества",
              "The two identities",
            )}
          </p>
          <Latex display>{String.raw`
S^2-R^2=4f(m,n),\qquad
W^2-S^2=4f(m,n)`}</Latex>
          <p>
            {text(
              "показывают, что R²,S²,W² образуют прогрессию квадратов с ориентированным шагом 4f(m,n). После умножения корней на λ её клетки умножаются на λ², а шаг становится 4λ²f(m,n). Вне постоянных прогрессий эта параметризация коники полна с точностью до обычных проективных симметрий пары (m,n).",
              "show that R²,S²,W² form a progression of squares with oriented difference 4f(m,n). Multiplying the roots by λ multiplies the entries by λ² and changes the difference to 4λ²f(m,n). Away from constant progressions this parametrization of the conic is complete, up to the usual projective symmetries of the pair (m,n).",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. ABEFGJ: жёлтая квадрика равна равенству шагов", "3. ABEFGJ: the yellow quadric is equality of differences")}</h2>
          <p>
            {text(
              "Возьмём две независимые параметрические прогрессии и обозначим их формы индексами 1 и 2:",
              "Take two independent parametrized progressions and mark their forms by subscripts 1 and 2:",
            )}
          </p>
          <Latex display>{String.raw`
(j,e,a)=\lambda(R_1,S_1,W_1),\qquad
(b,g,f)=\mu(R_2,S_2,W_2).`}</Latex>
          <p>
            {text(
              "Обе красные квадрики теперь выполнены тождественно. Остаток жёлтой квадрики факторизуется без новой кривой:",
              "Both red quadrics now hold identically. The residual yellow quadric factors without introducing a new curve:",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
a^2+b^2-f^2-j^2
&=(a^2-j^2)-(f^2-b^2)\\
&=8\bigl(\lambda^2f(m,n)-\mu^2f(p,q)\bigr).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Иными словами, ABFJ не добавляет независимую геометрию поверх уже параметризованных красных коник: оно требует, чтобы прогрессии JEA и BGF имели один ориентированный шаг.",
              "Thus ABFJ adds no independent geometry after the red conics have been parametrized: it requires the JEA and BGF progressions to have the same oriented difference.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. ABDFHJ: то же уравнение в другом размещении", "4. ABDFHJ: the same equation in another placement")}</h2>
          <p>
            {text(
              "Для второй маски разместим те же две прогрессии иначе:",
              "For the second pattern, place the same two progressions differently:",
            )}
          </p>
          <Latex display>{String.raw`
(h,a,f)=\lambda(R_1,S_1,W_1),\qquad
(d,j,b)=\mu(R_2,S_2,W_2).`}</Latex>
          <p>
            {text(
              "После этого",
              "Then",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
b^2+h^2-d^2-f^2
&=(b^2-d^2)-(f^2-h^2)\\
&=-8\bigl(\lambda^2f(m,n)-\mu^2f(p,q)\bigr).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Знак изменился только из-за выбранного порядка членов. Геометрическое условие осталось тем же: две параллельные прогрессии должны иметь одинаковый шаг.",
              "Only the sign changed because of the chosen ordering. The geometric condition is unchanged: the two parallel progressions must have the same difference.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Точная теорема tfmn для двух масок", "5. The exact tfmn theorem for the two patterns")}</h2>
          <div className="theorem-block">
            <h3>{text("Необходимость и достаточность", "Necessity and sufficiency")}</h3>
            <p>
              {text(
                "Пусть обе параметрические прогрессии невырождены. Следующие условия эквивалентны:",
                "Suppose both parametrized progressions are nondegenerate. The following conditions are equivalent:",
              )}
            </p>
            <Latex display>{text(String.raw`
\begin{aligned}
&\text{существуют }\lambda,\mu\in\mathbb Q^\times:
\quad \lambda^2f(m,n)=\mu^2f(p,q);\\
&\frac{f(m,n)}{f(p,q)}\in(\mathbb Q^\times)^2;\\
&\operatorname{tf}(m,n)=\operatorname{tf}(p,q);\\
&\text{пары задают рациональное решение ABEFGJ;}\\
&\text{пары задают рациональное решение ABDFHJ.}
\end{aligned}`, String.raw`
\begin{aligned}
&\text{there exist }\lambda,\mu\in\mathbb Q^\times:
\quad \lambda^2f(m,n)=\mu^2f(p,q);\\
&\frac{f(m,n)}{f(p,q)}\in(\mathbb Q^\times)^2;\\
&\operatorname{tf}(m,n)=\operatorname{tf}(p,q);\\
&\text{the pairs give a rational ABEFGJ solution;}\\
&\text{the pairs give a rational ABDFHJ solution.}
\end{aligned}`)}</Latex>
          </div>
          <p>
            {text(
              "Последние две импликации конструктивны. Для ABEFGJ положим",
              "The last two implications are constructive. For ABEFGJ put",
            )}
          </p>
          <Latex display>{String.raw`
E=\lambda^2S_1^2,\qquad
x=4\lambda^2f_1,\qquad
y=\mu^2S_2^2-E.`}</Latex>
          <p>
            {text(
              "Тогда A,E,J становятся первой прогрессией, а B,G,F — второй. Для ABDFHJ сначала положим",
              "Then A,E,J become the first progression and B,G,F the second. For ABDFHJ first put",
            )}
          </p>
          <Latex display>{String.raw`
\mathsf A=\lambda^2S_1^2,\qquad
\mathsf J=\mu^2S_2^2,\qquad
d_0=4\lambda^2f_1=4\mu^2f_2,`}</Latex>
          <p>{text("а затем", "and then")}</p>
          <Latex display>{String.raw`
E=\frac{\mathsf A+\mathsf J}{2},\qquad
x=\frac{\mathsf A-\mathsf J}{2},\qquad
y=d_0.`}</Latex>
          <p>
            {text(
              "Эти формулы восстанавливают все шесть выбранных квадратных клеток. Поэтому после равенства tf никаких дополнительных уравнений размещения для ABEFGJ и ABDFHJ не остаётся.",
              "These formulas recover all six selected square entries. Hence no additional placement equations remain for ABEFGJ or ABDFHJ after equality of tf has been imposed.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Два линейных прочтения", "6. Two linear readings")}</h2>
          <p>
            {text(
              "Связь между масками сильнее общего уравнения. Пусть (E,x,y) задаёт квадрат ABEFGJ. Выполним линейную замену",
              "The relation between the patterns is stronger than sharing an equation. Let (E,x,y) define an ABEFGJ square. Apply the linear substitution",
            )}
          </p>
          <Latex display>{String.raw`
(E,x,y)\longmapsto
\left(E+\frac y2,\,-\frac y2,\,x\right)
=(E',x',y').`}</Latex>
          <p>
            {text(
              "В новом квадрате клетки ABDFHJ получают ровно старые выбранные значения:",
              "In the new square, the ABDFHJ entries receive exactly the old selected values:",
            )}
          </p>
          <Latex display>{String.raw`
A'=E,\qquad
B'=F,\qquad
D'=B,\qquad
F'=A,\qquad
H'=J,\qquad
J'=G.`}</Latex>
          <p>
            {text(
              "Обратная замена равна E=E′+x′, x=y′, y=−2x′. Следовательно, проектированные пространства решений двух масок рационально и линейно изоморфны. Это не симметрия доски D₄: она меняет позиционный тип, но сохраняет диофантову поверхность.",
              "The inverse substitution is E=E′+x′, x=y′, y=−2x′. Thus the projectivized solution spaces of the two patterns are rationally and linearly isomorphic. This is not a D₄ board symmetry: it changes the positional type while preserving the Diophantine surface.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Общая Kummer–K3-поверхность", "7. The shared Kummer K3 surface")}</h2>
          <p>
            {text(
              "Удалим общий масштаб каждой пары и на аффинной карте положим r=m/n, s=p/q и ρ=μ/λ. Равенство шагов принимает вид",
              "Remove the common scale of each pair and on the affine chart put r=m/n, s=p/q, and ρ=μ/λ. Equality of differences becomes",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal S:\qquad
r(r^2-1)=\rho^2s(s^2-1).`}</Latex>
          <p>
            {text(
              "Рассмотрим эллиптическую кривую",
              "Consider the elliptic curve",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal C:\qquad U^2=r(r^2-1)=r^3-r.`}</Latex>
          <p>
            {text(
              "На произведении двух её копий имеем U²=r(r²−1), V²=s(s²−1). Отношение ρ=U/V инвариантно относительно одновременной смены знаков (U,V)↦(−U,−V) и удовлетворяет уравнению 𝒮. Обратно, это уравнение задаёт то же поле функций. Поэтому",
              "On the product of two copies, U²=r(r²−1) and V²=s(s²−1). The ratio ρ=U/V is invariant under the simultaneous sign change (U,V)↦(−U,−V) and satisfies the equation of 𝒮. Conversely, that equation gives the same function field. Hence",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal S\sim
(\mathcal C\times\mathcal C)/\{\pm1\}.`}</Latex>
          <p>
            {text(
              "Двойное накрытие ℙ¹×ℙ¹ ветвится над четырьмя вертикальными и четырьмя горизонтальными прямыми, соответствующими r,s∈{0,1,−1,∞}. Шестнадцать пересечений дают обычные двойные точки. Минимальное разрешение является Kummer-поверхностью Km(𝒞×𝒞), а следовательно K3-поверхностью.",
              "The double cover of ℙ¹×ℙ¹ is branched over four vertical and four horizontal lines corresponding to r,s∈{0,1,−1,∞}. Their sixteen intersections give ordinary double points. The minimal resolution is the Kummer surface Km(𝒞×𝒞), hence a K3 surface.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Где находятся F4+, F7+ и F9+", "8. Where F4+, F7+, and F9+ fit")}</h2>
          <p>
            {text(
              "Уравнение поверхности — алгебраическая форма tfmn. Сама функция tf выбирает канонического квадратсвободного представителя и переводит существование рационального ρ в дискретное равенство квадратных классов.",
              "The surface equation is the algebraic form of tfmn. The function tf chooses the canonical squarefree representative and turns the existence of rational ρ into a discrete equality of square classes.",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Язык", "Language")}</th>
                  <th>{text("Роль на общей поверхности", "Role on the common surface")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>F4+</td>
                  <td>
                    {text(
                      "Общая аффинная карта: обе проективные пары нормируются до общего первого параметра.",
                      "A general affine chart: both projective pairs are normalized to a common first parameter.",
                    )}
                  </td>
                </tr>
                <tr>
                  <td>F7+</td>
                  <td>
                    {text(
                      "Каждая пара становится точкой конгруэнтной кривой E_T; решение tfmn — это две точки одной фибры.",
                      "Each pair becomes a point on a congruent-number curve E_T; a tfmn solution is a pair of points on one fiber.",
                    )}
                  </td>
                </tr>
                <tr>
                  <td>F9+</td>
                  <td>
                    {text(
                      "Явные кривые и однопараметрические слои внутри общей поверхности.",
                      "Explicit curves and one-parameter layers inside the common surface.",
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Общая теория масок задаёт три квадрики, tfmn классифицирует их невырожденные рациональные решения, а F-цикл описывает связанные эллиптические координаты и групповой закон.",
              "The general pattern theory supplies the three quadrics, tfmn classifies their nondegenerate rational solutions, and the F-series describes the associated elliptic coordinates and group law.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("9. Точная граница результата", "9. Exact scope of the result")}</h2>
          <p>
            {text(
              "Из рассмотрения исключены постоянные прогрессии f(m,n)=0, то есть m=0, n=0 или m=±n. Перестановка и смена знаков параметров могут обратить ориентацию шага; это учитывается выбором порядка членов и знаком tf.",
              "Constant progressions f(m,n)=0, namely m=0, n=0, or m=±n, are excluded. Swapping or changing signs of parameters may reverse the orientation; this is handled by the ordering of the entries and the sign of tf.",
            )}
          </p>
          <p>
            {text(
              "Теорема покрывает все невырожденные рациональные решения трёх квадрик обеих масок, а не только известные формульные семейства. Требования положительности, попарного различия клеток и отсутствия дополнительных квадратов в дополнении маски являются отдельными условиями на специализацию и не входят в определение поверхности.",
              "The theorem covers every nondegenerate rational solution of the three quadrics for both patterns, not merely the known formula families. Positivity, pairwise distinctness, and the absence of extra square entries in the complement are separate conditions on a specialization and are not part of the surface definition.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Итог", "Conclusion")}</h3>
            <p>
              {text(
                "ABEFGJ и ABDFHJ — два различных позиционных типа, но одна диофантова поверхность. tfmn естественно получается из общей системы трёх квадрик и даёт её полное рациональное описание после параметризации двух красных коник.",
                "ABEFGJ and ABDFHJ are distinct positional types but the same Diophantine surface. The tfmn relation arises naturally from the general three-quadric system and gives its complete rational description after the two red conics are parametrized.",
              )}
            </p>
          </div>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/fmn-tfmn">
              {text("К арифметике fmn и tfmn", "Open the arithmetic of fmn and tfmn")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/f4-plus">
              {text("F4+: общая карта поверхности", "F4+: a general surface chart")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcdef">
              {text("Предыдущая поверхность: ABCDEF", "Previous surface: ABCDEF")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcdeg">
              {text("Следующая поверхность: ABCDEG", "Next surface: ABCDEG")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

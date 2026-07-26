import { ExactMagicSquareExample } from "./components/ExactMagicSquareExample";
import { Latex } from "./components/Latex";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { EllipticTermsNote, TheoryLink } from "./TheoryPages";

export function AbcdgjSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abcdgj-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.13",
              "Elliptic surfaces for 6/9 patterns · 5.13",
            )}
          </p>
          <h1>
            {text(
              "Маска ABCDGJ: одна прогрессия и две гауссовы нормы",
              "The ABCDGJ Pattern: One Progression and Two Gaussian Norms",
            )}
          </h1>
          <p>
            {text(
              "Красная прогрессия BDJ задаёт разность квадратов в обеих жёлтых квадриках. После её параметризации система сводится к чётной кривой рода 1. Её якобиан — расщеплённая эллиптическая K3-поверхность 12I₂ с неторсионной секцией.",
              "The red BDJ progression fixes the difference of squares in both yellow quadrics. After parametrizing it, the system reduces to an even genus-one curve. Its Jacobian is a split 12I₂ elliptic K3 surface with a non-torsion section.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABCDGJ: красная BDJ; жёлтые ACGJ и BCDG",
            "ABCDGJ: red BDJ; yellow ACGJ and BCDG",
          )}
          first="BDJ"
          firstKind="red"
          mask="ABCDGJ"
          second="ACGJ"
          secondKind="yellow"
          third="BCDG"
          thirdKind="yellow"
        />
      </header>

      <div className="proof-document topic-document abcdgj-surface-theory-document">
        <EllipticTermsNote />
        <section>
          <h2>{text("1. Точная красно-жёлто-жёлтая система", "1. The exact red-yellow-yellow system")}</h2>
          <p>
            {text(
              "Пусть a,b,c,d,g,j — рациональные корни выбранных клеток. Маска ABCDGJ определяется тремя независимыми условиями",
              "Let a,b,c,d,g,j be rational square roots of the selected entries. The ABCDGJ pattern is defined by three independent conditions",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
b^2+d^2&=2j^2,\\
a^2+j^2&=c^2+g^2,\\
b^2+c^2&=d^2+g^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Первая строка — красная прогрессия BDJ. Вторая и третья — равенства гауссовых норм на ACGJ и BCDG. Вместе они необходимы и достаточны для шести выбранных клеток.",
              "The first equation is the red BDJ progression. The other two are equalities of Gaussian norms on ACGJ and BCDG. Together they are necessary and sufficient for the six selected entries.",
            )}
          </p>
          <p>{text("Для восстановления всего квадрата положим", "To recover the whole square, put")}</p>
          <Latex display>{String.raw`
E_0=\frac{a^2+j^2}{2},\qquad
x=\frac{a^2-j^2}{2},\qquad
y=\frac{c^2-g^2}{2}.`}</Latex>
          <Latex display>{String.raw`
\begin{pmatrix}
E_0+x&E_0-x-y&E_0+y\\
E_0-x+y&E_0&E_0+x-y\\
E_0-y&E_0+x+y&E_0-x
\end{pmatrix}.`}</Latex>
        </section>

        <section>
          <h2>{text("2. Красная прогрессия BDJ", "2. The red BDJ progression")}</h2>
          <p>{text("Используем стандартную тройку", "Use the standard triple")}</p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
L(t)=t^2-2t-1,\qquad
C(t)=t^2+1,\qquad
R(t)=t^2+2t-1.`}</Latex>
          </div>
          <p>
            {text(
              "Тождество L²+R²=2C² параметризует красное условие. На выбранной аффинной карте берём",
              "The identity L²+R²=2C² parametrizes the red condition. On the chosen affine chart take",
            )}
          </p>
          <Latex display>{String.raw`
b=L(t),\qquad j=C(t),\qquad d=R(t).`}</Latex>
          <p>
            {text(
              "Разность крайних квадратов равна",
              "The difference of the endpoint squares is",
            )}
          </p>
          <Latex display>{String.raw`
\delta(t):=R(t)^2-L(t)^2=8t(t^2-1).`}</Latex>
          <p>
            {text(
              "Третья квадрика теперь просто утверждает c²−g²=δ. Тем самым одна и та же величина δ связывает красную прогрессию с обеими жёлтыми нормами.",
              "The third quadric now simply says c²−g²=δ. Thus the same quantity δ links the red progression to both yellow norm equalities.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Остаточная чётная квартика", "3. The residual even quartic")}</h2>
          <p>
            {text(
              "Положим v=c+g. При v≠0 равенство c²−g²=δ обращается полностью:",
              "Put v=c+g. For v≠0 the equality c²−g²=δ is inverted completely:",
            )}
          </p>
          <Latex display>{String.raw`
c=\frac12\left(v+\frac{\delta}{v}\right),\qquad
g=\frac12\left(v-\frac{\delta}{v}\right).`}</Latex>
          <p>
            {text(
              "Подстановка во вторую жёлтую квадрику и замена Y=2av дают",
              "Substitution into the other yellow quadric and the change Y=2av give",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\mathcal C_t:\qquad
Y^2=2v^4-4C(t)^2v^2+2\delta(t)^2.`}</Latex>
          </div>
          <div className="theorem-block">
            <h3>{text("Точный обратный подъём", "Exact lift back")}</h3>
            <p>
              {text(
                "Каждая рациональная точка (v,Y) с v≠0 возвращает решение ABCDGJ:",
                "Every rational point (v,Y) with v≠0 lifts to an ABCDGJ solution:",
              )}
            </p>
            <div className="formula-scroll">
              <Latex display>{String.raw`
\begin{aligned}
a&=\frac{Y}{2v},&
b&=L(t),&
c&=\frac12\left(v+\frac{\delta}{v}\right),\\
d&=R(t),&
g&=\frac12\left(v-\frac{\delta}{v}\right),&
j&=C(t).
\end{aligned}`}</Latex>
            </div>
          </div>
          <p>
            {text(
              "Квартика имеет естественные рациональные точки (R+L,2C(R+L)) и (R−L,±2C(R−L)). Они соответствуют диагональным решениям a²=j², c²=d², g²=b². Поэтому общий гладкий слой является отмеченной кривой рода 1.",
              "The quartic has the natural rational points (R+L,2C(R+L)) and (R−L,±2C(R−L)). They correspond to the diagonal solutions a²=j², c²=d², g²=b². Hence the generic smooth fiber is a pointed genus-one curve.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Якобиан и полное 2-кручение", "4. The Jacobian and full 2-torsion")}</h2>
          <p>
            {text(
              "Для бинарной квартики из предыдущего раздела классические инварианты равны",
              "For the binary quartic in the preceding section, the classical invariants are",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
I={}&16(t^8+196t^6-378t^4+196t^2+1),\\
J={}&128C(t)^2
(t^4-24t^3+2t^2+24t+1)\\
&\qquad\cdot(t^4+24t^3+2t^2-24t+1).
\end{aligned}`}</Latex>
          </div>
          <p>{text("Возьмём короткую модель якобиана", "Take the short Jacobian model")}</p>
          <Latex display>{String.raw`
\mathcal E_t:\qquad
\mathsf Y^2=\mathsf X^3-27I(t)\mathsf X-27J(t).`}</Latex>
          <p>
            {text(
              "Её кубика полностью раскладывается над ℚ(t):",
              "Its cubic splits completely over ℚ(t):",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
\mathsf Y^2={}&(\mathsf X-24C^2)\\
&\cdot\bigl(\mathsf X+12(t^4-24t^3+2t^2+24t+1)\bigr)\\
&\cdot\bigl(\mathsf X+12(t^4+24t^3+2t^2-24t+1)\bigr).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Следовательно, якобиан имеет полное рациональное 2-кручение. Две жёлтые квадрики не создают нового квадратного расширения: их симметрия уже видна в трёх линейных множителях.",
              "Hence the Jacobian has full rational 2-torsion. The two yellow quadrics introduce no new quadratic extension: their symmetry is already visible in the three linear factors.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Паспорт K3-поверхности", "5. The K3 surface passport")}</h2>
          <p>
            {text(
              "С точностью до ненулевой константы дискриминант имеет вид",
              "Up to a nonzero constant, the discriminant is",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
\Delta(t)\sim{}&
t^2(t-1)^2(t+1)^2\\
&\cdot(t^4-8t^3+2t^2+8t+1)^2\\
&\cdot(t^4+8t^3+2t^2-8t+1)^2.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Одиннадцать конечных корней основания дискриминанта просты, а c₄ на них не обращается в нуль: это одиннадцать слоёв I₂. После минимального преобразования в карте s=1/t над бесконечностью появляется ещё один I₂.",
              "The eleven finite roots of the reduced discriminant support are simple, while c₄ does not vanish there: these are eleven I₂ fibers. After the minimal transformation in the chart s=1/t, one further I₂ appears at infinity.",
            )}
          </p>
          <Latex display>{String.raw`\text{fiber configuration}=12I_2.`}</Latex>
          <p>
            {text(
              "Суммарное число Эйлера равно 24, поэтому минимальная эллиптическая поверхность является K3.",
              "For the relatively minimal model with a section and no multiple fibers, the total Euler number is 24; the canonical-bundle formula gives chi(O)=2, so the smooth minimal elliptic surface is K3.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Неторсионная секция и ранг", "6. A non-torsion section and the rank")}</h2>
          <p>
            {text(
              "Ковариантное отображение полного пересечения двух квадрик переводит диагональную точку (a,c,g)=(C,R,L) в секцию",
              "The covariant map of the complete intersection of two quadrics sends the diagonal point (a,c,g)=(C,R,L) to the section",
            )}
          </p>
          <Latex display>{String.raw`
P(t)=\left(
\frac{24U_{16}(t)}{(LCR)^2},
\frac{3456t^2(t^2-1)^2V_1V_2V_3V_4}{(LCR)^3}
\right),`}</Latex>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
U_{16}={}&t^{16}-8t^{14}+380t^{12}-1464t^{10}+2438t^8\\
&-1464t^6+380t^4-8t^2+1,\\
V_1={}&t^4-6t^3+2t-1,&
V_2={}&t^4-2t^3+6t-1,\\
V_3={}&t^4+2t^3-6t-1,&
V_4={}&t^4+6t^3-2t-1.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "При t=2 получаем кривую и точку",
              "At t=2 this gives the curve and point",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
E_2:\quad y^2&=x^3-3255984x+1737590400,\\
P_2&=\left(\frac{12678936}{1225},
\frac{44491037184}{42875}\right).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "В хороших редукциях #E₂(𝔽₁₁)=16 и #E₂(𝔽₁₃)=20, поэтому рациональное кручение имеет порядок, делящий 4. При этом образ P₂ по модулю 13 имеет порядок 5. Значит P₂, а вместе с ним и общая секция P(t), неторсионны.",
              "At the good reductions #E₂(𝔽₁₁)=16 and #E₂(𝔽₁₃)=20, so rational torsion has order dividing 4. Yet the reduction of P₂ modulo 13 has order 5. Therefore P₂, and hence the generic section P(t), is non-torsion.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Граница Морделла—Вейля", "Mordell–Weil bound")}</h3>
            <p>
              {text(
                "Неторсионная секция даёт нижнюю границу 1. Для конфигурации 12I₂ тривиальная решётка имеет ранг 14; из ρ≤20 для K3-поверхности по формуле Шиоды—Тейта следует",
                "The non-torsion section gives the lower bound 1. For the configuration 12I₂ the trivial lattice has rank 14; using ρ≤20 for a K3 surface, the Shioda–Tate formula gives",
              )}
            </p>
            <Latex display>{String.raw`1\le \operatorname{rank}\mathcal E(\overline{\mathbb Q}(t))\le6.`}</Latex>
          </div>
        </section>

        <section>
          <h2>{text("7. Явное бесконечное семейство", "7. An explicit infinite family")}</h2>
          <p>
            {text(
              "Проведём через точку (R+L,2C(R+L)) параболу, касательную к квартике, и потребуем, чтобы она проходила через (R−L,−2C(R−L)). Четвёртая точка пересечения имеет координаты",
              "Pass through (R+L,2C(R+L)) a parabola tangent to the quartic and require it to pass through (R−L,−2C(R−L)). The fourth intersection point has coordinates",
            )}
          </p>
          <Latex display>{String.raw`
v=-\frac{4tN_8}{Q_8},\qquad
Y=\frac{8tC\,M_{16}}{Q_8^2},`}</Latex>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
Q_8={}&t^8-20t^6+22t^4-20t^2+1,\\
N_8={}&t^8+12t^6-42t^4+12t^2+1,\\
M_{16}={}&t^{16}-72t^{14}+636t^{12}-2936t^{10}+4998t^8\\
&-2936t^6+636t^4-72t^2+1.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "После обратного подъёма и удаления общего знаменателя получаем корни степени 18:",
              "After lifting back and clearing the common denominator, one obtains degree-18 roots:",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
a&=-C\,M_{16},&
b&=L\,Q_8N_8,&
d&=R\,Q_8N_8,\\
j&=C\,Q_8N_8,&
c&=-2tN_8^2-(t^2-1)Q_8^2,\\
g&=-2tN_8^2+(t^2-1)Q_8^2.
\end{aligned}`}</Latex>
          </div>
          <div className="theorem-block">
            <h3>{text("Тождественная корректность", "Identity-level correctness")}</h3>
            <p>
              {text(
                "Подстановка обращает все три квадрики ABCDGJ в нуль в ℤ[t]. Отношение a/j непостоянно, поэтому вне конечного набора вырожденных параметров семейство содержит бесконечно много проективно различных рациональных решений.",
                "Substitution makes all three ABCDGJ quadrics vanish in ℤ[t]. The ratio a/j is nonconstant, so outside a finite set of degenerate parameters the family contains infinitely many projectively distinct rational solutions.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("8. Точный положительный пример", "8. An exact positive example")}</h2>
          <p>
            {text(
              "При t=−3 после удаления общего множителя корней получается следующий магический квадрат. Знаки корней не влияют на клетки.",
              "At t=−3, after removing the common factor of the roots, one obtains the following magic square. Root signs do not affect the entries.",
            )}
          </p>
          <ExactMagicSquareExample
            ariaLabel={text(
              "Точный квадрат ABCDGJ с факторизациями квадратных клеток",
              "An exact ABCDGJ square with factored square entries",
            )}
            roots={{
              A: "2070235",
              B: "-2108057",
              C: "1048799",
              D: "-301151",
              G: "2335207",
              J: "-1505755",
            }}
            values={[
              "4285872955225",
              "4443904315249",
              "1099979342401",
              "90691924801",
              "3276585537625",
              "6462479150449",
              "5453191732849",
              "2109266760001",
              "2267298120025",
            ]}
          />
          <p>
            {text(
              "Магическая сумма равна 9 829 756 612 875. Все девять клеток положительны и попарно различны; полными квадратами являются ровно A,B,C,D,G,J.",
              "The magic sum is 9,829,756,612,875. All nine entries are positive and pairwise distinct; exactly A,B,C,D,G,J are perfect squares.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("9. Точная граница результата", "9. Exact scope of the result")}</h2>
          <p>
            {text(
              "Квартическая модель описывает общий невырожденный открытый слой ABCDGJ. Значения v=0, постоянная красная прогрессия, нули Q₈N₈ и карта t=∞ требуют соседних проективных карт, но не меняют якобиан общего слоя.",
              "The quartic model describes the generic nondegenerate open part of ABCDGJ. The cases v=0, a constant red progression, zeros of Q₈N₈, and the chart t=∞ require adjacent projective charts, but do not change the generic Jacobian.",
            )}
          </p>
          <p>
            {text(
              "Доказаны K3-паспорт, существование неторсионной секции, граница геометрического ранга и бесконечное явное семейство. Не утверждаются точный ранг, полнота выписанного семейства или положительность каждой рациональной специализации.",
              "The K3 passport, existence of a non-torsion section, geometric rank bound, and an explicit infinite family are proved. The exact rank, completeness of the displayed family, and positivity of every rational specialization are not asserted.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcghj">
              {text("Следующая поверхность: ABCGHJ", "Next surface: ABCGHJ")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcdfg">
              {text("Предыдущая поверхность: ABCDFG", "Previous surface: ABCDFG")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory">
              {text("К оглавлению теории", "Theory contents")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

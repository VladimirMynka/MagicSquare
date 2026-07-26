import { ExactMagicSquareExample } from "./components/ExactMagicSquareExample";
import { Latex } from "./components/Latex";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function AbcdfgSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abcdfg-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.12",
              "Elliptic surfaces for 6/9 patterns · 5.12",
            )}
          </p>
          <h1>
            {text(
              "Маска ABCDFG: красная, жёлтая и голубая квадрики",
              "The ABCDFG Pattern: Red, Yellow, and Blue Quadrics",
            )}
          </h1>
          <p>
            {text(
              "Первый трёхцветный тип цикла сочетает прогрессию BFG, гауссову норму BCDG и норму x²+2y² на ACFG. После параметризации красной строки две оставшиеся квадрики сводятся к чётной кривой рода 1. Её якобиан — расщеплённая эллиптическая K3-поверхность 12I₂ с неторсионной секцией.",
              "The first three-color type in the series combines the BFG progression, the Gaussian norm on BCDG, and an x²+2y² norm on ACFG. After parametrizing the red equation, the remaining two quadrics reduce to an even genus-one curve. Its Jacobian is a split 12I₂ elliptic K3 surface with a non-torsion section.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABCDFG: красная BFG; жёлтая BCDG; голубая ACFG",
            "ABCDFG: red BFG; yellow BCDG; blue ACFG",
          )}
          first="BFG"
          firstKind="red"
          mask="ABCDFG"
          second="BCDG"
          secondKind="yellow"
          third="ACFG"
          thirdKind="blue"
        />
      </header>

      <div className="proof-document topic-document abcdfg-surface-theory-document">
        <section>
          <h2>{text("1. Точная трёхцветная система", "1. The exact three-color system")}</h2>
          <p>
            {text(
              "Пусть a,b,c,d,f,g — рациональные корни выбранных клеток. Для маски ABCDFG остаются три независимые квадрики",
              "Let a,b,c,d,f,g be rational square roots of the selected entries. The ABCDFG pattern leaves three independent quadrics",
            )}
          </p>
          <Latex display>{String.raw`
\begin{cases}
b^2+f^2=2g^2,\\
b^2+c^2=d^2+g^2,\\
2a^2+g^2=c^2+2f^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Первая строка — красная прогрессия BFG; вторая — жёлтое равенство гауссовых норм на BCDG; третья — голубое равенство норм формы X²+2Y² на ACFG. Вместе они необходимы и достаточны для выбранных шести клеток.",
              "The first equation is the red BFG progression; the second is the yellow equality of Gaussian norms on BCDG; the third is the blue equality of X²+2Y² norms on ACFG. Together they are necessary and sufficient for the six selected entries.",
            )}
          </p>
          <p>{text("Для восстановления всего квадрата положим", "To recover the whole square, put")}</p>
          <Latex display>{String.raw`
E_0=\frac{c^2+g^2}{2},\qquad
x=a^2-E_0,\qquad
y=\frac{c^2-g^2}{2}.`}</Latex>
          <Latex display>{String.raw`
\begin{pmatrix}
E_0+x&E_0-x-y&E_0+y\\
E_0-x+y&E_0&E_0+x-y\\
E_0-y&E_0+x+y&E_0-x
\end{pmatrix}.`}</Latex>
        </section>

        <section>
          <h2>{text("2. Красная прогрессия BFG", "2. The red BFG progression")}</h2>
          <p>{text("Используем стандартные формы", "Use the standard forms")}</p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
L(t)=t^2-2t-1,\qquad
C(t)=t^2+1,\qquad
R(t)=t^2+2t-1.`}</Latex>
          </div>
          <p>
            {text(
              "Тождество L²+R²=2C² параметризует первую квадрику. На выбранной аффинной карте берём",
              "The identity L²+R²=2C² parametrizes the first quadric. On the chosen affine chart take",
            )}
          </p>
          <Latex display>{String.raw`
b=L(t),\qquad g=C(t),\qquad f=R(t).`}</Latex>
          <p>
            {text(
              "Для двух оставшихся условий удобно выделить сдвиги",
              "For the two remaining conditions, isolate the shifts",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
\alpha(t)&:=L(t)^2-C(t)^2=-4t(t^2-1),\\
\beta(t)&:=2R(t)^2-C(t)^2\\
&=t^4+8t^3+2t^2-8t+1.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Жёлтая и голубая строки теперь принимают форму",
              "The yellow and blue equations now become",
            )}
          </p>
          <Latex display>{String.raw`
d^2-c^2=\alpha(t),\qquad
2a^2-c^2=\beta(t).`}</Latex>
        </section>

        <section>
          <h2>{text("3. Остаточная чётная квартика", "3. The residual even quartic")}</h2>
          <p>
            {text(
              "Положим v=c+d. При v≠0 жёлтое условие обращается полностью:",
              "Put v=c+d. For v≠0 the yellow condition is inverted completely:",
            )}
          </p>
          <Latex display>{String.raw`
c=\frac12\left(v-\frac{\alpha}{v}\right),\qquad
d=\frac12\left(v+\frac{\alpha}{v}\right).`}</Latex>
          <p>
            {text(
              "Подставляя c в голубую квадрику и вводя Y=4av, получаем",
              "Substituting c into the blue quadric and setting Y=4av gives",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\mathcal C_t:\qquad
Y^2=2v^4+(8\beta(t)-4\alpha(t))v^2+2\alpha(t)^2.`}</Latex>
          </div>
          <div className="theorem-block">
            <h3>{text("Точный обратный подъём", "Exact lift back")}</h3>
            <p>
              {text(
                "Каждая рациональная точка (v,Y) с v≠0 возвращает решение ABCDFG:",
                "Every rational point (v,Y) with v≠0 lifts to an ABCDFG solution:",
              )}
            </p>
            <div className="formula-scroll">
              <Latex display>{String.raw`
\begin{aligned}
a&=\frac{Y}{4v},&
b&=L(t),&
c&=\frac12\left(v-\frac{\alpha}{v}\right),\\
d&=\frac12\left(v+\frac{\alpha}{v}\right),&
f&=R(t),&
g&=C(t).
\end{aligned}`}</Latex>
            </div>
          </div>
          <p>
            {text(
              "Квартика уже имеет рациональные точки (C+L,4R(C+L)) и (C−L,±4R(C−L)). Они отвечают диагональным подъёмам a²=f², c²=g², d²=b². Поэтому общий гладкий слой является отмеченной кривой рода 1.",
              "The quartic already has the rational points (C+L,4R(C+L)) and (C−L,±4R(C−L)). They correspond to the diagonal lifts a²=f², c²=g², d²=b². Thus the generic smooth fiber is a pointed genus-one curve.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Якобиан и полное 2-кручение", "4. The Jacobian and full 2-torsion")}</h2>
          <p>
            {text(
              "Классические инварианты бинарной квартики равны",
              "The classical binary-quartic invariants are",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
I={}&64(t^8+20t^7+116t^6+20t^5-218t^4\\
&\qquad-20t^3+116t^2-20t+1),\\
J={}&-1024R(t)^2
(t^4+10t^3+2t^2-10t+1)\\
&\qquad\cdot(t^4+16t^3+2t^2-16t+1).
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
\mathsf Y^2={}&
\bigl(\mathsf X-24(t^4+16t^3+2t^2-16t+1)\bigr)\\
&\cdot\bigl(\mathsf X-24(t^4+4t^3+2t^2-4t+1)\bigr)\\
&\cdot\bigl(\mathsf X+48(t^4+10t^3+2t^2-10t+1)\bigr).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Следовательно, якобиан имеет полное рациональное 2-кручение. Три цвета исходной системы не мешают поверхности расщепиться столь же полно, как в предыдущих случаях.",
              "Hence the Jacobian has full rational 2-torsion. The three colors of the original system do not prevent the surface from splitting as completely as in the preceding cases.",
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
&\cdot(t^4+8t^3+2t^2-8t+1)^2\\
&\cdot(t^4+12t^3+2t^2-12t+1)^2.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Одиннадцать конечных корней основания дискриминанта просты, и c₄ на них не обращается в нуль: это одиннадцать слоёв I₂. После минимального преобразования в карте s=1/t над бесконечностью появляется ещё один I₂.",
              "The eleven finite roots of the reduced discriminant support are simple, and c₄ does not vanish there: these are eleven I₂ fibers. After the minimal transformation in the chart s=1/t, one further I₂ appears at infinity.",
            )}
          </p>
          <Latex display>{String.raw`\text{fiber configuration}=12I_2.`}</Latex>
          <p>
            {text(
              "Суммарное число Эйлера равно 24, поэтому минимальная эллиптическая поверхность является K3.",
              "The total Euler number is 24, so the minimal elliptic surface is K3.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Неторсионная секция и ранг", "6. A non-torsion section and the rank")}</h2>
          <p>
            {text(
              "Ковариантное отображение отмеченной квартики в якобиан переводит диагональную точку в секцию",
              "The covariant map from the pointed quartic to its Jacobian sends the diagonal point to the section",
            )}
          </p>
          <Latex display>{String.raw`
P(t)=\left(
\frac{3U_{16}(t)}{(LCR)^2},
-\frac{27V_1(t)V_2(t)V_3(t)}{(LCR)^3}
\right),`}</Latex>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
U_{16}={}&11t^{16}+56t^{15}+200t^{14}+536t^{13}+3604t^{12}\\
&+248t^{11}-11784t^{10}-232t^9+18754t^8+232t^7\\
&-11784t^6-248t^5+3604t^4-536t^3+200t^2-56t+11,\\
V_1={}&t^8-12t^7-28t^6-12t^5+70t^4+12t^3-28t^2+12t+1,\\
V_2={}&3t^8+12t^7-20t^6+12t^5+82t^4-12t^3-20t^2-12t+3,\\
V_3={}&t^8+4t^7+36t^6+4t^5-58t^4-4t^3+36t^2-4t+1.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Неторсионность проверяется точной специализацией при t=2:",
              "Non-torsion is certified by the exact specialization at t=2:",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\mathcal E_2:\quad
y^2=x^3-13231296x+13933624320,
\quad
P_2=\left(\frac{52291761}{1225},
-\frac{376796256759}{42875}\right).`}</Latex>
          </div>
          <p>
            {text(
              "Хорошие редукции имеют #E₂(𝔽₁₁)=12 и #E₂(𝔽₁₃)=16, поэтому порядок рационального кручения делит 4. Но образ P₂ по модулю 11 имеет порядок 3. Следовательно, P имеет бесконечный порядок.",
              "Good reductions satisfy #E₂(𝔽₁₁)=12 and #E₂(𝔽₁₃)=16, so the rational torsion order divides 4. Yet the image of P₂ modulo 11 has order 3. Therefore P has infinite order.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Доказанная граница ранга", "Proved rank bound")}</h3>
            <Latex display>{String.raw`
1\le\operatorname{rank}
\mathcal E(\overline{\mathbb Q}(t))\le6.`}</Latex>
            <p>
              {text(
                "Нижнюю границу даёт P. Двенадцать слоёв I₂ имеют суммарный корневой ранг 12; формула Шиоды—Тейта и ρ≤20 для комплексной K3 дают верхнюю границу 20−2−12=6. Речь идёт о ранге глобальных секций, а не об универсальной верхней границе рангов отдельных специализаций.",
                "The section P gives the lower bound. The twelve I₂ fibers have total root rank 12; Shioda–Tate and ρ≤20 for a complex K3 give the upper bound 20−2−12=6. This is the rank of global sections, not a universal upper bound for the ranks of individual specializations.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Явное полиномиальное семейство", "7. An explicit polynomial family")}</h2>
          <p>
            {text(
              "Проведём параболу через точки (C+L,4R(C+L)) и (C−L,−4R(C−L)) и потребуем касание в первой. Четвёртое пересечение имеет координаты",
              "Take a parabola through (C+L,4R(C+L)) and (C−L,−4R(C−L)), tangent at the first point. The fourth intersection has coordinates",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
v_1=-\frac{2(t+1)Q_8(t)}{D_8(t)},\qquad
Y_1=-\frac{8(t+1)R(t)M_{16}(t)}{D_8(t)^2}.`}</Latex>
          </div>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
Q_8={}&7t^8+20t^7-44t^6-28t^5+82t^4-52t^3+4t^2-4t-1,\\
D_8={}&t^8-4t^7-4t^6-52t^5-82t^4-28t^3+44t^2+20t-7,\\
M_{16}={}&5t^{16}+8t^{15}-72t^{14}+808t^{13}+940t^{12}-696t^{11}\\
&-3704t^{10}-1496t^9+6942t^8+1496t^7-3704t^6+696t^5\\
&+940t^4-808t^3-72t^2-8t+5.
\end{aligned}`}</Latex>
          </div>
          <p>{text("Для компактной записи определим ещё", "For a compact formula, define also")}</p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
S_4={}&t^4+12t^3+2t^2-12t+1,\\
F_{12}={}&t^{12}+28t^{11}+6t^{10}-172t^9+15t^8+824t^7+20t^6\\
&-824t^5+15t^4+172t^3+6t^2-28t+1,\\
D_{16}={}&t^{16}-56t^{15}-424t^{14}-1048t^{13}+188t^{12}+264t^{11}\\
&-3608t^{10}+1256t^9+7942t^8-1256t^7-3608t^6-264t^5\\
&+188t^4+1048t^3-424t^2+56t+1.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "После обратного подъёма и удаления общего знаменателя получаем корни степени 18:",
              "After lifting back and clearing the common denominator, one obtains degree-18 roots:",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
a&=-R\,M_{16},&
b&=-L\,D_8Q_8,&
c&=C\,S_4F_{12},\\
d&=-L\,D_{16},&
f&=-R\,D_8Q_8,&
g&=-C\,D_8Q_8.
\end{aligned}`}</Latex>
          </div>
          <div className="theorem-block">
            <h3>{text("Тождественная корректность", "Identity-level correctness")}</h3>
            <p>
              {text(
                "Подстановка обращает красную, жёлтую и голубую квадрики в нуль в ℤ[t]. Отношение a/g непостоянно, поэтому вне конечного набора вырожденных параметров семейство содержит бесконечно много проективно различных рациональных решений.",
                "Substitution makes the red, yellow, and blue quadrics vanish in ℤ[t]. The ratio a/g is nonconstant, so outside a finite set of degenerate parameters the family contains infinitely many projectively distinct rational solutions.",
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
              "Точный квадрат ABCDFG с факторизациями квадратных клеток",
              "An exact ABCDFG square with factored square entries",
            )}
            roots={{
              A: "4136971",
              B: "7982303",
              C: "8008565",
              D: "-9764503",
              F: "1140329",
              G: "5701645",
            }}
            values={[
              "17114529054841",
              "63717161183809",
              "64137113359225",
              "95345518837009",
              "48322934532625",
              "1300350228241",
              "32508755706025",
              "32928707881441",
              "79531340010409",
            ]}
          />
          <p>
            {text(
              "Магическая сумма равна 144 968 803 597 875. Все девять клеток положительны и попарно различны; полными квадратами являются ровно A,B,C,D,F,G.",
              "The magic sum is 144,968,803,597,875. All nine entries are positive and pairwise distinct; exactly A,B,C,D,F,G are perfect squares.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("9. Точная граница результата", "9. Exact scope of the result")}</h2>
          <p>
            {text(
              "Квартическая модель описывает общий невырожденный открытый слой ABCDFG. Значения v=0, постоянная красная прогрессия, нули знаменателей и карта t=∞ требуют соседних проективных карт, но не меняют якобиан общего слоя.",
              "The quartic model describes the generic nondegenerate open part of ABCDFG. The cases v=0, a constant red progression, denominator zeros, and the chart t=∞ require adjacent projective charts, but do not change the generic Jacobian.",
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
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcdeg">
              {text("Предыдущая поверхность: ABCDEG", "Previous surface: ABCDEG")}
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

import { ExactMagicSquareExample } from "./components/ExactMagicSquareExample";
import { Latex } from "./components/Latex";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { EllipticTermsNote, TheoryLink } from "./TheoryPages";

export function AbcdegSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abcdeg-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.11",
              "Elliptic surfaces for 6/9 patterns · 5.11",
            )}
          </p>
          <h1>
            {text(
              "Маска ABCDEG: две гауссовы склейки и поверхность 12I₂",
              "The ABCDEG Pattern: Two Gaussian Gluings and a 12I₂ Surface",
            )}
          </h1>
          <p>
            {text(
              "Центральная прогрессия CEG и две жёлтые квадрики сводятся к равенству разностей двух пар квадратов, а затем — к чётной квартике рода 1. Её якобиан является расщеплённой эллиптической K3-поверхностью с паспортом 12I₂; неторсионная секция и касательная конструкция дают явное полиномиальное семейство ABCDEG.",
              "The central CEG progression and two yellow quadrics reduce to equality of the differences of two square pairs and then to an even genus-one quartic. Its Jacobian is a split elliptic K3 surface with passport 12I₂; a non-torsion section and a tangent construction give an explicit polynomial ABCDEG family.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABCDEG: красная CEG; жёлтые ACDE и ABEG",
            "ABCDEG: red CEG; yellow ACDE and ABEG",
          )}
          first="CEG"
          firstKind="red"
          mask="ABCDEG"
          second="ACDE"
          secondKind="yellow"
          third="ABEG"
          thirdKind="yellow"
        />
      </header>

      <div className="proof-document topic-document abcdeg-surface-theory-document">
        <EllipticTermsNote />
        <section>
          <h2>{text("1. Точная система", "1. The exact system")}</h2>
          <p>
            {text(
              "Пусть a,b,c,d,e,g — рациональные корни выбранных клеток. Для маски ABCDEG остаются три независимые квадрики",
              "Let a,b,c,d,e,g be rational square roots of the selected entries. The ABCDEG pattern leaves three independent quadrics",
            )}
          </p>
          <Latex display>{String.raw`
\begin{cases}
c^2+g^2=2e^2,\\
a^2+d^2=c^2+e^2,\\
a^2+b^2=e^2+g^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Первая строка — красная прогрессия CEG; две следующие строки — жёлтые равенства гауссовых норм на ACDE и ABEG. Система необходима и достаточна для выбранных шести клеток. Положив",
              "The first equation is the red CEG progression; the next two are yellow equalities of Gaussian norms on ACDE and ABEG. The system is necessary and sufficient for the six selected entries. Put",
            )}
          </p>
          <Latex display>{String.raw`
E_0=e^2,\qquad x=a^2-E_0,\qquad y=E_0-g^2.`}</Latex>
          <p>
            {text(
              "Тогда весь магический квадрат восстанавливается в обычной форме",
              "Then the whole magic square is recovered in the standard form",
            )}
          </p>
          <Latex display>{String.raw`
\begin{pmatrix}
E_0+x&E_0-x-y&E_0+y\\
E_0-x+y&E_0&E_0+x-y\\
E_0-y&E_0+x+y&E_0-x
\end{pmatrix}.`}</Latex>
        </section>

        <section>
          <h2>{text("2. Центральная прогрессия CEG", "2. The central CEG progression")}</h2>
          <p>{text("Введём стандартные формы", "Introduce the standard forms")}</p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
L(t)=t^2-2t-1,\qquad
C(t)=t^2+1,\qquad
R(t)=t^2+2t-1.`}</Latex>
          </div>
          <p>
            {text(
              "Тождество L²+R²=2C² даёт полную проективную параметризацию непостоянной прогрессии квадратов. На выбранной аффинной карте положим",
              "The identity L²+R²=2C² gives the complete projective parametrization of a nonconstant progression of squares. On the chosen affine chart put",
            )}
          </p>
          <Latex display>{String.raw`
c=L(t),\qquad e=C(t),\qquad g=R(t).`}</Latex>
          <p>
            {text(
              "Разность крайних клеток равна",
              "The difference of the endpoint entries is",
            )}
          </p>
          <Latex display>{String.raw`
\delta(t):=c^2-g^2=L(t)^2-R(t)^2=-8t(t^2-1).`}</Latex>
          <p>
            {text(
              "Вычитание двух жёлтых уравнений теперь устраняет a и даёт особенно простую связь",
              "Subtracting the two yellow equations now eliminates a and gives the particularly simple relation",
            )}
          </p>
          <Latex display>{String.raw`
d^2-b^2=c^2-g^2=\delta(t).`}</Latex>
        </section>

        <section>
          <h2>{text("3. Остаточная чётная квартика", "3. The residual even quartic")}</h2>
          <p>
            {text(
              "Положим v=b+d. При v≠0 предыдущее равенство полностью обращается:",
              "Put v=b+d. For v≠0 the preceding equality is inverted completely:",
            )}
          </p>
          <Latex display>{String.raw`
b=\frac12\left(v-\frac{\delta}{v}\right),\qquad
d=\frac12\left(v+\frac{\delta}{v}\right).`}</Latex>
          <p>
            {text(
              "Остаётся потребовать, чтобы восстановленное значение a² также было квадратом. После замены Y=2av обе жёлтые строки дают одно и то же уравнение",
              "It remains to require that the recovered value a² also be a square. After setting Y=2av, both yellow equations give the same equation",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\mathcal C_t:\qquad
Y^2=-v^4+8C(t)^2v^2-\delta(t)^2.`}</Latex>
          </div>
          <div className="theorem-block">
            <h3>{text("Точный обратный подъём", "Exact lift back")}</h3>
            <p>
              {text(
                "Каждая рациональная точка (v,Y) этой квартики с v≠0 возвращает решение ABCDEG по формулам",
                "Every rational point (v,Y) on this quartic with v≠0 lifts to an ABCDEG solution through",
              )}
            </p>
            <div className="formula-scroll">
              <Latex display>{String.raw`
\begin{aligned}
a&=\frac{Y}{2v},&
b&=\frac12\left(v-\frac{\delta}{v}\right),&
c&=L(t),\\
d&=\frac12\left(v+\frac{\delta}{v}\right),&
e&=C(t),&
g&=R(t).
\end{aligned}`}</Latex>
            </div>
          </div>
          <p>
            {text(
              "Квартика имеет рациональные точки v=L+R, Y=2C(L+R) и v=L−R, Y=±2C(L−R). Они отвечают знаковым подъёмам диагонального решения a²=e², b²=g², d²=c². Поэтому общий гладкий слой является отмеченной кривой рода 1, а не нетривиальным торсором без рациональной точки.",
              "The quartic has rational points v=L+R, Y=2C(L+R) and v=L−R, Y=±2C(L−R). They correspond to sign lifts of the diagonal solution a²=e², b²=g², d²=c². Thus the generic smooth fiber is a pointed genus-one curve rather than a nontrivial torsor without a rational point.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Якобиан и полное 2-кручение", "4. The Jacobian and full 2-torsion")}</h2>
          <p>
            {text(
              "Для бинарной квартики вычисляются классические инварианты",
              "The classical invariants of the binary quartic are",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
I={}&64(t^8+16t^6-18t^4+16t^2+1),\\
J={}&-1024C(t)^2
(t^4-6t^3+2t^2+6t+1)\\
&\hspace{5.7em}\cdot(t^4+6t^3+2t^2-6t+1).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Возьмём короткую модель якобиана",
              "Take the short Jacobian model",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal E_t:\qquad
\mathsf Y^2=\mathsf X^3-27I(t)\mathsf X-27J(t).`}</Latex>
          <p>
            {text(
              "Её кубика раскладывается над ℚ(t) полностью:",
              "Its cubic splits completely over ℚ(t):",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
\mathsf Y^2={}&
\bigl(\mathsf X-24(t^4+6t^3+2t^2-6t+1)\bigr)\\
&\cdot\bigl(\mathsf X-24(t^4-6t^3+2t^2+6t+1)\bigr)\\
&\cdot\bigl(\mathsf X+48C(t)^2\bigr).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Следовательно, якобиан имеет полную рациональную подгруппу 2-кручения. Это свойство относится к выбранной фибрации поверхности; оно не означает, что все рациональные точки уже перечислены.",
              "Hence the Jacobian has full rational 2-torsion. This is a property of the chosen fibration of the surface; it does not mean that all rational points have already been enumerated.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Паспорт K3-поверхности", "5. The K3 surface passport")}</h2>
          <p>
            {text(
              "С точностью до ненулевой константы дискриминант равен",
              "Up to a nonzero constant, the discriminant is",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
\Delta(t)\sim{}&
t^2(t-1)^2(t+1)^2\\
&\cdot(t^4-2t^3+2t^2+2t+1)^2\\
&\cdot(t^4+2t^3+2t^2-2t+1)^2.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Одиннадцать конечных корней основания дискриминанта просты, и c₄ на них не обращается в нуль. Поэтому над ними находятся одиннадцать слоёв I₂. После замены s=1/t и минимального масштабирования порядок дискриминанта при s=0 равен 2, а c₄ остаётся ненулевым: над бесконечностью находится ещё один I₂.",
              "The eleven finite roots of the reduced discriminant support are simple, and c₄ does not vanish at them. They therefore give eleven I₂ fibers. After setting s=1/t and applying the minimal rescaling, the discriminant has order 2 at s=0 while c₄ remains nonzero: there is one further I₂ fiber at infinity.",
            )}
          </p>
          <Latex display>{String.raw`\text{fiber configuration}=12I_2.`}</Latex>
          <p>
            {text(
              "Для относительно минимальной модели с сечением и без кратных слоёв сумма чисел Эйлера равна 24; формула канонического пучка даёт χ(𝒪)=2, поэтому гладкая минимальная эллиптическая поверхность является K3.",
              "For the relatively minimal model with a section and no multiple fibers, the Euler numbers sum to 24; the canonical-bundle formula gives chi(O)=2, so the smooth minimal elliptic surface is K3.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Неторсионная секция и ранг", "6. A non-torsion section and the rank")}</h2>
          <p>{text("Обозначим", "Write")}</p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
U={}&t^8-2t^6+18t^4-2t^2+1,\\
V_-={}&t^4-2t^3+2t^2+2t+1,\\
V_+={}&t^4+2t^3+2t^2-2t+1.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Ковариантное отображение квартики в её якобиан даёт сечение",
              "The covariant map from the quartic to its Jacobian gives the section",
            )}
          </p>
          <Latex display>{String.raw`
P(t)=\left(
\frac{96U(t)}{C(t)^2},
\frac{864L(t)R(t)V_-(t)V_+(t)}{C(t)^3}
\right).`}</Latex>
          <p>
            {text(
              "Неторсионность проверяется точной специализацией при t=2:",
              "Non-torsion is certified by the exact specialization at t=2:",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\mathcal E_2:\quad
y^2=x^3-1826496x-463795200,
\qquad
P_2=\left(\frac{39264}{25},-\frac{2909088}{125}\right).`}</Latex>
          </div>
          <p>
            {text(
              "Хорошие редукции имеют #E₂(𝔽₇)=4 и #E₂(𝔽₂₃)=20, поэтому порядок рационального кручения делит 4. Но образ P₂ по модулю 11 имеет порядок 6. Для точки кручения это невозможно, следовательно P имеет бесконечный порядок.",
              "Good reductions satisfy #E₂(𝔽₇)=4 and #E₂(𝔽₂₃)=20, so the rational torsion order divides 4. Yet the image of P₂ modulo 11 has order 6. This is impossible for a torsion point, so P has infinite order.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Доказанная граница ранга", "Proved rank bound")}</h3>
            <Latex display>{String.raw`
1\le\operatorname{rank}
\mathcal E(\overline{\mathbb Q}(t))\le6.`}</Latex>
            <p>
              {text(
                "Нижнюю границу даёт P. Двенадцать слоёв I₂ имеют суммарный корневой ранг 12; формула Шиоды—Тейта и ρ≤20 для комплексной K3 дают верхнюю границу 20−2−12=6. Точный геометрический ранг здесь не утверждается.",
                "The section P gives the lower bound. The twelve I₂ fibers have total root rank 12; Shioda–Tate and ρ≤20 for a complex K3 give the upper bound 20−2−12=6. The exact geometric rank is not claimed here.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Явное полиномиальное семейство", "7. An explicit polynomial family")}</h2>
          <p>
            {text(
              "Чтобы получить недиагональную точку самой квартики, проведём параболу через",
              "To obtain a non-diagonal point on the quartic itself, take a parabola through",
            )}
          </p>
          <Latex display>{String.raw`
(L+R,\,2C(L+R)),\qquad
(L-R,\,-2C(L-R))`}</Latex>
          <p>
            {text(
              "и потребуем касание в первой точке. Четвёртое пересечение имеет координату",
              "and require tangency at the first point. The fourth intersection has coordinate",
            )}
          </p>
          <Latex display>{String.raw`
v_1=-\frac{4tQ_1(t)Q_2(t)}{P_-(t)P_+(t)},`}</Latex>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
P_\pm&=t^4\pm4t^3+10t^2\pm4t+1,\\
Q_1&=t^4-2t^2+5,\qquad
Q_2=5t^4-2t^2+1,\\
H&=P_-P_+Q_1Q_2.
\end{aligned}`}</Latex>
          </div>
          <p>{text("Определим ещё два многочлена", "Define two further polynomials")}</p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
A_{16}={}&7t^{16}-168t^{14}+516t^{12}-2456t^{10}+5994t^8\\
&-2456t^6+516t^4-168t^2+7,\\
B_{16}={}&t^{16}+48t^{15}-88t^{14}-16t^{13}+92t^{12}+688t^{11}\\
&-872t^{10}+752t^9+1990t^8-752t^7-872t^6-688t^5\\
&+92t^4+16t^3-88t^2-48t+1.
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "После обратного подъёма и удаления общего знаменателя корни шести квадратных клеток равны",
              "After lifting back and clearing the common denominator, the six square roots are",
            )}
          </p>
          <div className="formula-scroll">
            <Latex display>{String.raw`
\begin{aligned}
a&=C(t)A_{16}(t),&
b&=-R(t)B_{16}(t),&
c&=L(t)H(t),\\
d&=L(t)B_{16}(-t),&
e&=C(t)H(t),&
g&=R(t)H(t).
\end{aligned}`}</Latex>
          </div>
          <div className="theorem-block">
            <h3>{text("Тождественная корректность", "Identity-level correctness")}</h3>
            <p>
              {text(
                "Подстановка этих многочленов обращает все три уравнения ABCDEG в нуль в ℤ[t]. Отношение a/e непостоянно, поэтому вне конечного набора вырожденных параметров семейство содержит бесконечно много проективно различных рациональных решений. Групповой закон якобиана даёт дальнейшие семейства, но выписанное семейство не объявляется полным перечислением всех рациональных точек.",
                "Substitution makes all three ABCDEG equations vanish in ℤ[t]. The ratio a/e is nonconstant, so outside a finite set of degenerate parameters the family contains infinitely many projectively distinct rational solutions. The Jacobian group law gives further families, but the displayed family is not claimed to enumerate every rational point.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("8. Точный положительный пример", "8. An exact positive example")}</h2>
          <p>
            {text(
              "При t=4/5 после удаления общего рационального масштаба получается следующий магический квадрат. Знаки корней не влияют на клетки.",
              "At t=4/5, after removing the common rational scale, one obtains the following magic square. Root signs do not affect the entries.",
            )}
          </p>
          <ExactMagicSquareExample
            ariaLabel={text(
              "Точный квадрат ABCDEG с факторизациями квадратных клеток",
              "An exact ABCDEG square with factored square entries",
            )}
            roots={{
              A: "1483890419260127",
              B: "1211069693781089",
              C: "-1825917169339445",
              D: "-1861784295383089",
              E: "1527808243733005",
              G: "1155172086724955",
            }}
            values={[
              "2201930776371995487114092056129",
              "1466689803195020680481454025921",
              "3333973509288571467977632908025",
              "3466240762535105192721267181921",
              "2334198029618529211857726330025",
              "1202155296701953230994185478129",
              "1334422549948486955737819752025",
              "3201706256042037743233998634129",
              "2466465282865062936601360603921",
            ]}
          />
          <p>
            {text(
              "Магическая сумма равна 7 002 594 088 855 587 635 573 178 990 075. Все девять клеток положительны и попарно различны; полными квадратами являются ровно A,B,C,D,E,G.",
              "The magic sum is 7,002,594,088,855,587,635,573,178,990,075. All nine entries are positive and pairwise distinct; exactly A,B,C,D,E,G are perfect squares.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("9. Точная граница результата", "9. Exact scope of the result")}</h2>
          <p>
            {text(
              "Квартическая модель описывает общий невырожденный открытый слой маски ABCDEG. Исключённые значения v=0, постоянная красная прогрессия и бесконечная карта параметра требуют соседних проективных карт, но не меняют вычисленный якобиан общего слоя.",
              "The quartic model describes the generic nondegenerate open part of the ABCDEG pattern. The excluded cases v=0, a constant red progression, and the parameter chart at infinity require adjacent projective charts, but they do not change the computed Jacobian of the generic fiber.",
            )}
          </p>
          <p>
            {text(
              "Доказаны существование неторсионной секции, граница геометрического ранга и бесконечное явное семейство. Не утверждается ни точное значение ранга, ни полнота одного семейства, ни автоматическая положительность каждой рациональной специализации.",
              "The existence of a non-torsion section, the geometric rank bound, and an explicit infinite family are proved. Neither the exact rank, completeness of one family, nor automatic positivity of every rational specialization is asserted.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abefgj-abdfhj">
              {text(
                "Предыдущая поверхность: ABEFGJ / ABDFHJ",
                "Previous surface: ABEFGJ / ABDFHJ",
              )}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcdfg">
              {text("Следующая поверхность: ABCDFG", "Next surface: ABCDFG")}
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

import { Latex } from "./components/Latex";
import { ExactMagicSquareExample } from "./components/ExactMagicSquareExample";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { EllipticTermsNote, TheoryLink } from "./TheoryPages";

export function AbefghSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abefgh-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.8",
              "Elliptic surfaces for 6/9 patterns · 5.8",
            )}
          </p>
          <h1>
            {text(
              "Маска ABEFGH: треугольник попарных средних",
              "The ABEFGH Pattern: A Triangle of Pairwise Means",
            )}
          </h1>
          <p>
            {text(
              "Шесть квадратных клеток образуют здесь три арифметические прогрессии без выделенной центральной вершины: три исходных квадрата попарно имеют квадратные средние. Совместность этих прогрессий приводит к одной мультипликативной задаче для рациональной функции r, а её якобиан оказывается обратным образом семейства Лежандра на эллиптической K3-поверхности.",
              "Here the six square entries form three arithmetic progressions with no distinguished central vertex: three initial squares have pairwise square means. Compatibility of the progressions reduces to one multiplicative problem for a rational function r, whose Jacobian is a pullback of the Legendre family on an elliptic K3 surface.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABEFGH: красные AFH, BEH и BFG",
            "ABEFGH: red AFH, BEH, and BFG",
          )}
          first="AFH"
          mask="ABEFGH"
          second="BEH"
          third="BFG"
          thirdKind="red"
        />
      </header>

      <div className="proof-document topic-document abefgh-surface-theory-document">
        <EllipticTermsNote />
        <section>
          <h2>{text("1. Точная система", "1. The exact system")}</h2>
          <p>
            {text(
              "Пусть a,b,e,f,g,h — рациональные корни выбранных клеток. Три красных условия имеют вид",
              "Let a,b,e,f,g,h be rational square roots of the selected entries. The three red conditions are",
            )}
          </p>
          <Latex display>{String.raw`
\begin{cases}
f^2+h^2=2a^2,\\
b^2+h^2=2e^2,\\
b^2+f^2=2g^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Это треугольник попарных средних: исходными вершинами можно считать b²,f²,h², а a²,e²,g² являются средними трёх их пар. Система не только необходима, но и достаточна для восстановления магического квадрата. Положим",
              "This is a triangle of pairwise means: b²,f²,h² may be regarded as the initial vertices, while a²,e²,g² are the means of their three pairs. The system is not only necessary but also sufficient to reconstruct the magic square. Put",
            )}
          </p>
          <Latex display>{String.raw`
E_0=e^2,\qquad x=a^2-E_0,\qquad y=a^2-h^2.`}</Latex>
          <p>
            {text(
              "Тогда A=a², E=e² и H=h² по построению. Второе равенство даёт B=b², первое — F=f², а третье — G=g². Остальные клетки однозначно восстанавливаются общей формой магического квадрата.",
              "Then A=a², E=e², and H=h² by construction. The second equation gives B=b², the first gives F=f², and the third gives G=g². The remaining entries are uniquely recovered from the general form of a magic square.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Замыкание трёх прогрессий", "2. Closing the three progressions")}</h2>
          <p>{text("Обозначим стандартные формы", "Introduce the standard forms")}</p>
          <Latex display>{String.raw`
L(t)=t^2-2t-1,\qquad
C(t)=t^2+1,\qquad
R(t)=t^2+2t-1.`}</Latex>
          <Latex display>{String.raw`L(t)^2+R(t)^2=2C(t)^2.`}</Latex>
          <p>
            {text(
              "Каждую из трёх прогрессий можно записать, с точностью до общего масштаба, тройкой L,C,R. Введём параметры x,z,y соответственно для BEH, AFH и BFG. Тогда отношения концов равны",
              "Each of the three progressions can be written, up to a common scale, as an L,C,R triple. Introduce parameters x,z,y for BEH, AFH, and BFG respectively. The endpoint ratios are then",
            )}
          </p>
          <Latex display>{String.raw`
\frac bh=\frac{L(x)}{R(x)},\qquad
\frac hf=\frac{L(z)}{R(z)},\qquad
\frac bf=\frac{L(y)}{R(y)}.`}</Latex>
          <p>
            {text(
              "Условие замыкания треугольника выражает третье отношение через первые два. Поэтому, если",
              "Closing the triangle expresses the third ratio through the first two. Thus, if",
            )}
          </p>
          <Latex display>{String.raw`
r(t)=\frac{L(t)}{R(t)}
=\frac{t^2-2t-1}{t^2+2t-1},`}</Latex>
          <p>{text("то вся совместность масштабов сводится к", "all scale compatibility reduces to")}</p>
          <Latex display>{String.raw`r(x)\,r(z)=r(y).`}</Latex>
          <p>
            {text(
              "Далее исследуется эта рациональная карта. Она порождает решения исходной системы, но полнота карты для всех рациональных решений ABEFGH здесь не утверждается.",
              "The remainder studies this rational chart. It generates solutions of the original system, but no claim is made here that the chart covers every rational ABEFGH solution.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Склейка двух коник", "3. A fiber product of two conics")}</h2>
          <p>
            {text(
              "Уравнение по y квадратично. После выделения его дискриминанта и замены s=z−1/z условие рациональности распадается на две коники. Их произведение даёт квартку рода 1",
              "The equation is quadratic in y. After isolating its discriminant and substituting s=z−1/z, rationality splits into two conics. Their product gives the genus-one quartic",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
U^2=(s^2+4)\Bigl(
(x^2+1)^2s^2+16x(x^2-1)s+4(x^2+1)^2
\Bigr).`}</Latex>
          </div>
          <p>
            {text(
              "Первый множитель кодирует обратимость замены z−1/z, второй — квадратность дискриминанта уравнения для y. Поэтому исходная громоздкая совместность читается как fiber product двух рациональных коник над одной s-прямой.",
              "The first factor records invertibility of the substitution z−1/z; the second records that the discriminant of the equation for y is a square. Thus the original compatibility condition is read as a fiber product of two rational conics over the same s-line.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Якобиан и форма Лежандра", "4. The Jacobian and Legendre form")}</h2>
          <p>
            {text(
              "Здесь «форма Лежандра» означает нормальную форму семейства эллиптических кривых v²=u(u−1)(u−λ). Это не символ Лежандра (a/p), используемый для квадратичных вычетов.",
              "Here “Legendre form” means the normal form v²=u(u−1)(u−lambda) for a family of elliptic curves. It is unrelated to the Legendre symbol (a/p) used for quadratic residues.",
            )}
          </p>
          <p>
            {text(
              "Инварианты бинарной квартики приводят к компактной модели якобиана",
              "The binary-quartic invariants give the compact Jacobian model",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal E_x:\quad
Y^2=X^3-27P(x)X-54Q(x),`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
P(x)&=x^8-8x^6+30x^4-8x^2+1,\\
Q(x)&=(x^2+1)^2(x^4-10x^2+1)(x^4-4x^2+1).
\end{aligned}`}</Latex>
          <p>{text("Кубический многочлен полностью раскладывается:", "The cubic polynomial splits completely:")}</p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
Y^2={}&\bigl(X+3(x^2+1)^2\bigr)
\bigl(X+3(x^4-10x^2+1)\bigr)\\
&\cdot\bigl(X-6(x^4-4x^2+1)\bigr).
\end{aligned}`}</Latex>
          </div>
          <p>
            {text(
              "Следовательно, над ℚ(x) видно полное рациональное 2-кручение. Перенос трёх корней в 0,1,λ даёт форму Лежандра",
              "Hence full rational 2-torsion is visible over ℚ(x). Sending the three roots to 0,1,λ gives the Legendre form",
            )}
          </p>
          <Latex display>{String.raw`
v^2=u(u-1)(u-\lambda),\qquad
\lambda=\frac{4x^2}{(x^2-1)^2}.`}</Latex>
          <p>
            {text(
              "Таким образом, поверхность ABEFGH является явным обратным образом стандартного однопараметрического семейства Лежандра при рациональной замене λ=4x²/(x²−1)².",
              "Thus the ABEFGH surface is an explicit pullback of the standard one-parameter Legendre family under the rational substitution λ=4x²/(x²−1)².",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Паспорт эллиптической K3-поверхности", "5. The elliptic K3 surface passport")}</h2>
          <p>
            {text(
              "Дискриминант компактной модели факторизуется как",
              "The discriminant of the compact model factors as",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\Delta=
2^8 3^{12}x^4(x-1)^4(x+1)^4
(x^2-2x-1)^2(x^2+2x-1)^2.`}</Latex>
          </div>
          <p>
            {text(
              "Точки x=0,±1 и бесконечность дают четыре слоя I₄; четыре корня двух оставшихся квадратичных множителей дают четыре слоя I₂. Все слои полустабильны. Для относительно минимальной модели с сечением их числа Эйлера суммируются в 24, а формула канонического пучка даёт χ(𝒪)=2. Поэтому гладкая минимальная эллиптическая поверхность является K3 и имеет паспорт",
              "The points x=0,±1 and infinity give four I₄ fibers; the four roots of the remaining quadratic factors give four I₂ fibers. All fibers are semistable. For the relatively minimal model with a section, their Euler numbers sum to 24 and the canonical-bundle formula gives chi(O)=2. Hence the smooth minimal elliptic surface is K3 with passport",
            )}
          </p>
          <Latex display>{String.raw`4I_4+4I_2.`}</Latex>
        </section>

        <section>
          <h2>{text("6. Неторсионная секция и граница ранга", "6. A non-torsion section and the rank bound")}</h2>
          <p>{text("На модели Лежандра видна секция", "The Legendre model has the visible section")}</p>
          <Latex display>{String.raw`
u=\left(\frac{x^2+1}{x^2-1}\right)^2,\qquad
v=\frac{2x(x^2+1)}{(x^2-1)^2}.`}</Latex>
          <p>
            {text(
              "Её неторсионность можно доказать точной специализацией. При x=2 секция переходит в точку (17,−60) на кривой",
              "Its non-torsion can be proved by an exact specialization. At x=2 the section maps to (17,−60) on the curve",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal E_2:\quad
y^2=x^3-x^2-64x+64
=(x-8)(x-1)(x+8).`}</Latex>
          <p>
            {text(
              "Точные подсчёты дают #𝓔₂(𝔽₅)=8 и #𝓔₂(𝔽₁₁)=16, поэтому порядок рационального кручения делит 8. По модулю 17 выбранная точка имеет порядок 3, что для такой точки кручения невозможно. Следовательно, секция имеет бесконечный порядок.",
              "Exact point counts give #𝓔₂(𝔽₅)=8 and #𝓔₂(𝔽₁₁)=16, so the rational torsion order divides 8. Modulo 17 the selected point has order 3, which is impossible for such a torsion point. Therefore the section has infinite order.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Доказанная граница", "Proved bound")}</h3>
            <Latex display>{String.raw`
1\le\operatorname{rank}\mathcal E(\overline{\mathbb Q}(x))\le2.`}</Latex>
            <p>
              {text(
                "Неторсионная секция даёт нижнюю границу. Корневой ранг конфигурации 4I₄+4I₂ равен 16; формула Шиоды—Тейта и ρ≤20 для комплексной K3 дают верхнюю границу 2. Точный геометрический ранг пока не установлен.",
                "The non-torsion section gives the lower bound. The root rank of 4I₄+4I₂ is 16; Shioda–Tate and ρ≤20 for a complex K3 surface give the upper bound 2. The exact geometric rank has not yet been determined.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Обратный подъём и полиномиальное семейство", "7. Lifting back and a polynomial family")}</h2>
          <p>
            {text(
              "Удвоим секцию и поднимем 2S с модели Лежандра обратно к уравнению для r. Получаются рациональные функции",
              "Double the section and lift 2S from the Legendre model back to the r-equation. This gives the rational functions",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
z(x)&=\frac{x^4-2x^3+2x^2+2x+1}
{x^4+2x^3+2x^2-2x+1},\\[1mm]
y(x)&=\frac{(x+1)(x^4-2x^3-2x^2-2x+1)}
{(x-1)(x^4+2x^3-2x^2+2x+1)}.
\end{aligned}`}</Latex>
          </div>
          <p>{text("Для них тождественно выполнено", "They satisfy the identity")}</p>
          <Latex display>{String.raw`r(x)r(z(x))=r(y(x)).`}</Latex>
          <p>
            {text(
              "Знаменатели можно убрать без раскрытия громоздких произведений. Для пары T=(T₀,T₁) положим",
              "The denominators can be cleared without expanding the large products. For a pair T=(T₀,T₁), put",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
L_T&=T_0^2-2T_0T_1-T_1^2,\\
C_T&=T_0^2+T_1^2,\\
R_T&=T_0^2+2T_0T_1-T_1^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Возьмём X=(x,1), а Z=(Z₀,Z₁) и Y=(Y₀,Y₁) — соответственно числители и знаменатели выписанных z(x),y(x). Тогда явное полиномиальное семейство корней имеет компактный вид",
              "Take X=(x,1), and let Z=(Z₀,Z₁) and Y=(Y₀,Y₁) be the numerator-denominator pairs displayed for z(x),y(x). Then an explicit polynomial family of square roots has the compact form",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
a&=R_XC_ZR_Y,& b&=L_XL_ZR_Y,& e&=C_XL_ZR_Y,\\
f&=R_XR_ZR_Y,& g&=R_XR_ZC_Y,& h&=R_XL_ZR_Y.
\end{aligned}`}</Latex>
          <Latex display>{String.raw`L_XL_ZR_Y=R_XR_ZL_Y.`}</Latex>
          <p>
            {text(
              "Тождества L²+R²=2C² сразу доказывают условия AFH и BEH. Поднятое равенство между двумя выражениями для b заменяет его в третьем условии и доказывает BFG. Поэтому все три уравнения ABEFGH выполняются тождественно в ℤ[x]. Непостоянство отношений даёт бесконечно много проективно различных решений вне конечного набора вырожденных специализаций.",
              "The identities L²+R²=2C² immediately prove AFH and BEH. The lifted equality between the two expressions for b substitutes it into the third condition and proves BFG. Hence all three ABEFGH equations hold identically in ℤ[x]. Nonconstant ratios yield infinitely many projectively distinct solutions outside a finite set of degenerate specializations.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Точный положительный пример", "8. An exact positive example")}</h2>
          <p>
            {text(
              "При x=2, после удаления общего множителя корней, семейство даёт следующий магический квадрат. Знаки корней не влияют на его клетки.",
              "At x=2, after removing the common factor of the square roots, the family gives the following magic square. Root signs do not affect its entries.",
            )}
          </p>
          <ExactMagicSquareExample
            ariaLabel={text(
              "Точный квадрат ABEFGH с факторизациями квадратных клеток",
              "An exact ABEFGH square with factored square entries",
            )}
            roots={{
              A: "5383",
              B: "1081",
              E: "5405",
              F: "833",
              G: "965",
              H: "7567",
            }}
            values={[
              "28976689",
              "1168561",
              "57496825",
              "57734161",
              "29214025",
              "693889",
              "931225",
              "57259489",
              "29451361",
            ]}
          />
          <p>
            {text(
              "Его магическая сумма равна 87 642 075. Все клетки положительны и попарно различны; полными квадратами являются ровно A,B,E,F,G,H. Это точный невырожденный сертификат маски ABEFGH.",
              "Its magic sum is 87,642,075. All entries are positive and pairwise distinct; exactly A,B,E,F,G,H are perfect squares. This is an exact nondegenerate certificate for the ABEFGH pattern.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/6-9/abcdef">
              {text("Следующая поверхность: ABCDEF", "Next surface: ABCDEF")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abdefj">
              {text("Предыдущая поверхность: ABDEFJ", "Previous surface: ABDEFJ")}
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

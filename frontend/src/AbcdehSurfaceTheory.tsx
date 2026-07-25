import { Latex } from "./components/Latex";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function AbcdehSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abcdeh-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.1",
              "Elliptic surfaces for 6/9 patterns · 5.1",
            )}
          </p>
          <h1>
            {text(
              "Маска ABCDEH: от двух прогрессий к эллиптической K3-поверхности",
              "The ABCDEH Pattern: From Two Progressions to an Elliptic K3 Surface",
            )}
          </h1>
          <p>
            {text(
              "Две пересекающиеся прогрессии квадратов сводят маску ABCDEH к явной квартике рода 1. Её якобиан — расщеплённая эллиптическая K3-поверхность с двумя доказанно независимыми сечениями.",
              "Two intersecting progressions of squares reduce the ABCDEH pattern to an explicit genus-one quartic. Its Jacobian is a split elliptic K3 surface with two provably independent sections.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABCDEH: прогрессии BEH и CDH пересекаются в H",
            "ABCDEH: the BEH and CDH progressions meet at H",
          )}
          first="BEH"
          mask="ABCDEH"
          second="CDH"
        />
      </header>

      <div className="proof-document topic-document abcdeh-surface-theory-document">
        <section>
          <h2>{text("1. Исходная система", "1. The initial system")}</h2>
          <p>
            {text(
              "Малыми буквами обозначим рациональные корни выбранных клеток. Из общей формы магического квадрата для маски ABCDEH остаются три независимых условия:",
              "Write the rational square roots of the selected entries in lowercase. The general form of a magic square leaves three independent conditions for the ABCDEH pattern:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{cases}
b^2+h^2=2e^2,\\
d^2+h^2=2c^2,\\
a^2+c^2=e^2+h^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Первые две строки — арифметические прогрессии квадратов с общим крайним членом h². Третья строка связывает их и является единственным оставшимся препятствием.",
              "The first two equations are arithmetic progressions of squares with the common endpoint h². The third equation couples them and is the only remaining obstruction.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Одновременная параметризация двух прогрессий", "2. Parametrizing both progressions at once")}</h2>
          <p>{text("Положим", "Put")}</p>
          <Latex display>{String.raw`
L(z)=z^2-2z-1,\qquad
C(z)=z^2+1,\qquad
R(z)=z^2+2z-1.`}</Latex>
          <p>
            {text(
              "Непосредственное раскрытие скобок даёт тождество",
              "Direct expansion gives the identity",
            )}
          </p>
          <Latex display>{String.raw`L(z)^2+R(z)^2=2C(z)^2.`}</Latex>
          <p>
            {text(
              "Чтобы обе прогрессии имели один и тот же корень h, берём два параметра p,q и перемножаем соответствующие множители:",
              "To make the two progressions share the same root h, take two parameters p,q and multiply the corresponding factors:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
b&=L(p)R(q), & e&=C(p)R(q),\\
d&=L(q)R(p), & c&=C(q)R(p),\\
h&=R(p)R(q).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Тогда первые два уравнения выполняются тождественно. Никакие числовые коэффициенты здесь не подобраны: каждая строка является копией тождества L²+R²=2C², умноженной на общий квадрат.",
              "The first two equations now hold identically. No numerical coefficients have been guessed: each row is a copy of L²+R²=2C² multiplied by a common square.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Остаточная квартика", "3. The residual quartic")}</h2>
          <p>
            {text(
              "Подставим найденные b,c,d,e,h в третье условие и обозначим a=V. После приведения подобных членов получается одно уравнение",
              "Substitute the expressions for b,c,d,e,h into the third condition and write a=V. Collecting terms gives the single equation",
            )}
          </p>
          <Latex display>{String.raw`
V^2=C(p)^2(q^2+1)^2+8K(p)q(q^2-1),`}</Latex>
          <Latex display>{String.raw`
K(p)=p^4+2p^3+2p^2-2p+1.`}</Latex>
          <div className="theorem-block">
            <h3>{text("Точный критерий конструкции", "Exact construction criterion")}</h3>
            <p>
              {text(
                "Для любых рациональных p,q,V, удовлетворяющих этой квартике, шесть чисел",
                "For any rational p,q,V satisfying this quartic, the six numbers",
              )}
            </p>
            <Latex display>{String.raw`
\begin{aligned}
a&=V,& b&=L(p)R(q),& c&=C(q)R(p),\\
d&=L(q)R(p),& e&=C(p)R(q),& h&=R(p)R(q)
\end{aligned}`}</Latex>
            <p>
              {text(
                "задают квадратные клетки ABCDEH некоторого рационального магического квадрата. Его координаты восстанавливаются по формулам E=e², x=a²−e², y=e²−c².",
                "give the square entries ABCDEH of a rational magic square. Its coordinates are recovered as E=e², x=a²−e², and y=e²−c².",
              )}
            </p>
          </div>
          <p>
            {text(
              "При фиксированном p правая часть является квартическим многочленом по q. Точка q=1, V=±2C(p) рациональна, поэтому гладкий общий слой имеет род 1 и отмеченную рациональную точку.",
              "For fixed p, the right-hand side is a quartic polynomial in q. The point q=1, V=±2C(p) is rational, so the smooth generic fiber has genus one and a marked rational point.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Якобиан и расщепление кубики", "4. The Jacobian and the split cubic")}</h2>
          <p>
            {text(
              "Для бинарной квартики вычисление классических инвариантов I и J переводит отмеченную кривую рода 1 в короткую форму Вейерштрасса",
              "Computing the classical invariants I and J of the binary quartic sends the pointed genus-one curve to the short Weierstrass form",
            )}
          </p>
          <Latex display>{String.raw`
Y^2=X^3-432P(p)X+3456Q(p),`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
P(p)={}&13p^8+48p^7+100p^6+48p^5-18p^4\\
&-48p^3+100p^2-48p+13,\\
Q(p)={}&(p^2+1)^2
\cdot(5p^4+12p^3+10p^2-12p+5)\\
&\cdot(7p^4+12p^3+14p^2-12p+7).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Кубика полностью раскладывается над ℚ(p):",
              "The cubic splits completely over ℚ(p):",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
X_0&=24(p^2+1)^2,\\
X_1&=12(5p^4+12p^3+10p^2-12p+5),\\
X_2&=-12(7p^4+12p^3+14p^2-12p+7).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Следовательно, якобиан имеет полную рациональную 2-кручение над ℚ(p). Это существенно и для вычисления особых слоёв, и для точной проверки независимости найденных сечений.",
              "Thus the Jacobian has full rational 2-torsion over ℚ(p). This is useful both for computing the singular fibers and for an exact independence test for the sections found below.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Два независимых сечения", "5. Two independent sections")}</h2>
          <p>
            {text(
              "Кроме базовой точки q=1, квартика имеет симметричную пару точек",
              "Besides the base point q=1, the quartic has the symmetric pair of points",
            )}
          </p>
          <Latex display>{String.raw`
q=-\frac1p,\qquad
V=\pm\frac{(p^2+2p-1)^2}{p^2}.`}</Latex>
          <p>
            {text(
              "Стандартное преобразование отмеченной квартики в модель Вейерштрасса переводит два выбора знака в два сечения. Их независимость проверяется не численным перебором: при специализации p=3 их образы вместе с двумя классами 2-кручения имеют ранг 4 в точном куммеровом отображении. Поэтому два сечения независимы над ℚ(p).",
              "The standard pointed-quartic transformation maps the two sign choices to two sections of the Weierstrass model. Their independence is not inferred from numerical sampling: at p=3 their images together with two 2-torsion classes have rank 4 in the exact Kummer map. Hence the two sections are independent over ℚ(p).",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Паспорт K3-поверхности", "6. The K3 surface passport")}</h2>
          <p>
            {text(
              "Дискриминант якобиана, с точностью до ненулевой константы, равен",
              "Up to a nonzero constant, the Jacobian discriminant is",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
\Delta(p)\sim{}&
(p^2+2p-1)^4
\cdot(p^2+2p+3)^2\\
&\cdot(3p^2-2p+1)^2
\cdot(p^4+2p^3+2p^2-2p+1)^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Корни первого множителя дают два слоя типа I₄; корни остальных — восемь слоёв типа I₂. Слой над бесконечностью гладок. Сумма чисел Эйлера равна 24, поэтому минимальная эллиптическая поверхность является K3.",
              "The roots of the first factor give two I₄ fibers; the roots of the remaining factors give eight I₂ fibers. The fiber at infinity is smooth. The Euler numbers sum to 24, so the minimal elliptic surface is a K3 surface.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Доказанная граница ранга", "Proved rank bound")}</h3>
            <Latex display>{String.raw`2\le \operatorname{rank}E(\overline{\mathbb Q}(p))\le4.`}</Latex>
            <p>
              {text(
                "Нижняя граница дана двумя независимыми сечениями. Для верхней границы конфигурация 2I₄+8I₂ имеет корневой ранг 14; формула Шиоды—Тейта и неравенство ρ≤20 для комплексной K3 дают rank≤20−2−14=4. Равенство точному рангу 2 пока не утверждается.",
                "The two independent sections give the lower bound. For the upper bound, the configuration 2I₄+8I₂ has root rank 14; Shioda–Tate and ρ≤20 for a complex K3 surface give rank≤20−2−14=4. Exact rank 2 is not claimed.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Точный пример", "7. An exact example")}</h2>
          <p>
            {text(
              "Возьмём p=3, q=−12. Квартика даёт V=266. Формулы конструкции дают корни",
              "Take p=3 and q=−12. The quartic gives V=266. The construction formulas give the roots",
            )}
          </p>
          <Latex display>{String.raw`
(a,b,c,d,e,h)=(266,238,2030,2338,1190,1666).`}</Latex>
          <p>
            {text(
              "После общего деления на 14 получаем примитивное представление",
              "After dividing by the common factor 14, one obtains the primitive representation",
            )}
          </p>
          <Latex display>{String.raw`
(a,b,c,d,e,h)=(19,17,145,167,85,119).`}</Latex>
          <p>
            {text(
              "Подстановка в исходные три уравнения является точным сертификатом именно этого примера; общая корректность следует из тождественного вывода выше.",
              "Substitution into the three initial equations is an exact certificate for this particular example; general correctness follows from the symbolic derivation above.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Граница результата", "8. Scope of the result")}</h2>
          <p>
            {text(
              "Получена явная порождающая поверхность, а не набор разрозненных примеров. Рациональные точки её слоёв дают семейства квадратов ABCDEH, и два независимых сечения гарантируют нетривиальный запас таких точек.",
              "The result is an explicit generating surface, not a collection of isolated examples. Rational points on its fibers give families of ABCDEH squares, and two independent sections guarantee a nontrivial supply of such points.",
            )}
          </p>
          <p>
            {text(
              "При этом здесь не доказано, что одна выбранная пара параметров p,q перечисляет все рациональные решения исходной маски, и не определён точный геометрический ранг поверхности. Эти два утверждения остаются за пределами доказанного результата.",
              "What is not proved here is that the chosen pair of parameters p,q enumerates every rational solution of the original pattern, nor is the exact geometric rank of the surface determined. Both statements remain outside the proved result.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/f7-plus">
              {text("Цикл F7+, F4+ и F9+", "The F7+, F4+, and F9+ series")}
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

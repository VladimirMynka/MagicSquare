import { Latex } from "./components/Latex";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function AbcdejSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abcdej-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.2",
              "Elliptic surfaces for 6/9 patterns · 5.2",
            )}
          </p>
          <h1>
            {text(
              "Маска ABCDEJ: общая вершина двух прогрессий",
              "The ABCDEJ Pattern: Two Progressions with a Common Endpoint",
            )}
          </h1>
          <p>
            {text(
              "Прогрессии AEJ и BDJ пересекаются в J. Их одновременная параметризация оставляет одну квартику рода 1; её расщеплённый якобиан является эллиптической K3-поверхностью с неторсионным сечением.",
              "The AEJ and BDJ progressions meet at J. Parametrizing them simultaneously leaves one genus-one quartic; its split Jacobian is an elliptic K3 surface with a non-torsion section.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABCDEJ: красные AEJ, BDJ; жёлтая ACDE",
            "ABCDEJ: red AEJ, BDJ; yellow ACDE",
          )}
          first="AEJ"
          mask="ABCDEJ"
          second="BDJ"
          third="ACDE"
        />
      </header>

      <div className="proof-document topic-document abcdej-surface-theory-document">
        <section>
          <h2>{text("1. Три независимых условия", "1. The three independent conditions")}</h2>
          <p>
            {text(
              "Пусть a,b,c,d,e,j — рациональные корни шести выбранных клеток. Для маски ABCDEJ исходная система имеет вид",
              "Let a,b,c,d,e,j be the rational square roots of the six selected entries. The initial ABCDEJ system is",
            )}
          </p>
          <Latex display>{String.raw`
\begin{cases}
a^2+j^2=2e^2,\\
b^2+d^2=2j^2,\\
a^2+d^2=c^2+e^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Первые две строки параметризуют две прогрессии квадратов. Последняя строка — жёлтая связь ACDE — определяет, когда обе прогрессии принадлежат одному магическому квадрату.",
              "The first two equations describe two progressions of squares. The last equation is the yellow ACDE relation that determines when both progressions belong to one magic square.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Склейка прогрессий в общей клетке J", "2. Gluing the progressions at J")}</h2>
          <p>{text("Используем стандартные многочлены", "Use the standard polynomials")}</p>
          <Latex display>{String.raw`
L(z)=z^2-2z-1,\qquad
C(z)=z^2+1,\qquad
R(z)=z^2+2z-1,`}</Latex>
          <Latex display>{String.raw`L(z)^2+R(z)^2=2C(z)^2.`}</Latex>
          <p>
            {text(
              "Два параметра p,q позволяют сделать корень j общим:",
              "Two parameters p,q make the root j common to both progressions:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
a&=L(p)C(q),& e&=C(p)C(q),& j&=R(p)C(q),\\
b&=L(q)R(p),& d&=R(q)R(p).
\end{aligned}`}</Latex>
          <p>
            {text(
              "После этой подстановки обе красные строки выполняются тождественно. Остаётся потребовать квадратность c²=a²+d²−e².",
              "After this substitution both red equations hold identically. It remains to require c²=a²+d²−e² to be a square.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Остаточная квартика", "3. The residual quartic")}</h2>
          <p>
            {text(
              "Обозначив c=V и сократив выражение, получаем",
              "Writing c=V and simplifying gives",
            )}
          </p>
          <Latex display>{String.raw`
V^2=R(p)^2R(q)^2-4p(p^2-1)C(q)^2.`}</Latex>
          <p>
            {text(
              "Это квартика по q. При q=0 её правая часть равна C(p)², поэтому общий слой имеет рациональную базовую точку (0,C(p)). При q=1 появляется ещё одна рациональная точка (1,2C(p)); именно она породит неторсионное сечение.",
              "This is a quartic in q. At q=0 its right-hand side is C(p)², so the generic fiber has the rational base point (0,C(p)). At q=1 there is another rational point (1,2C(p)); this point will produce the non-torsion section.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Точный критерий", "Exact criterion")}</h3>
            <p>
              {text(
                "Рациональные p,q,V задают решение ABCDEJ по формулам раздела 2 и равенству c=V тогда и только тогда, когда лежат на этой квартике. Координаты магического квадрата восстанавливаются как E=e², x=a²−e², y=e²−c².",
                "Rational p,q,V give an ABCDEJ solution through the formulas of Section 2 and c=V exactly when they lie on this quartic. The magic-square coordinates are recovered as E=e², x=a²−e², and y=e²−c².",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("4. Расщеплённый якобиан", "4. The split Jacobian")}</h2>
          <p>
            {text(
              "Классические инварианты бинарной квартики дают короткую модель",
              "The classical binary-quartic invariants give the short model",
            )}
          </p>
          <Latex display>{String.raw`
Y^2=X^3-1728P(p)X+27648Q(p),`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
P(p)={}&p^8+6p^7+16p^6+6p^5-18p^4\\
&-6p^3+16p^2-6p+1,\\
Q(p)={}&(p^2+1)^2\cdot
(p^4+3p^3+2p^2-3p+1)\\
&\cdot(p^4+6p^3+2p^2-6p+1).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Кубический многочлен полностью раскладывается:",
              "The cubic polynomial splits completely:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
X_0&=24(p^2+1)^2,\\
X_1&=24(p^4+6p^3+2p^2-6p+1),\\
X_2&=-48(p^4+3p^3+2p^2-3p+1).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Следовательно, над ℚ(p) вся группа 2-кручения рациональна. В форме Лежандра поверхность имеет параметр",
              "Thus full rational 2-torsion is visible over ℚ(p). In Legendre form the surface has parameter",
            )}
          </p>
          <Latex display>{String.raw`
\lambda(p)=-
\frac{p^4+2p^3+2p^2-2p+1}
{2p(p^2-1)}.`}</Latex>
        </section>

        <section>
          <h2>{text("5. Неторсионное сечение и бесконечная подгруппа", "5. A non-torsion section and an infinite subgroup")}</h2>
          <p>
            {text(
              "Точка квартики q=1, V=2C(p) переходит в рациональное сечение P якобиана. Точная специализация при p=2 и куммерово отображение показывают, что P не является кручением. Поэтому",
              "The quartic point q=1, V=2C(p) maps to a rational section P of the Jacobian. Exact specialization at p=2 and the Kummer map show that P is non-torsion. Therefore",
            )}
          </p>
          <Latex display>{String.raw`
\langle2P\rangle
=\{\,2nP:n\in\mathbb Z\,\}
\cong\mathbb Z.`}</Latex>
          <p>
            {text(
              "Обратное бирациональное преобразование переводит каждое 2nP в рациональные функции qₙ(p),Vₙ(p), а затем в шесть корней ABCDEJ. Это бесконечный механизм генерации параметризаций.",
              "The inverse birational transformation sends each 2nP to rational functions qₙ(p),Vₙ(p), and then to six ABCDEJ roots. This is an infinite mechanism for generating parametrizations.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Явное семейство из сечения 2P", "6. An explicit family from the section 2P")}</h2>
          <p>
            {text(
              "Для первого чётного кратного p является единственным свободным параметром:",
              "For the first even multiple, p is the only free parameter:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
q(p)&=-\frac{2C(p)^2}{R(p)^2},\\
V(p)&=\frac{C(p)V_0(p)}{R(p)^4},
\end{aligned}`}</Latex>
          <p>{text("где", "where")}</p>
          <Latex display>{String.raw`
\begin{aligned}
U(p)={}&(p^4+6p^2-8p+5)
\cdot(5p^4+8p^3+6p^2+1),\\
B_0(p)={}&7p^8+8p^7+12p^6+8p^5+74p^4\\
&-8p^3+12p^2-8p+7,\\
V_0(p)={}&p^8-24p^7-44p^6-24p^5+102p^4\\
&+24p^3-44p^2+24p+1,\\
D_0(p)={}&p^8+24p^7+20p^6+24p^5-26p^4\\
&-24p^3+20p^2-24p+1.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Умножение корней на общий знаменатель R(p)⁴ даёт полиномиальное семейство",
              "Multiplying the roots by the common denominator R(p)⁴ gives the polynomial family",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
a&=L(p)U(p),&
b&=R(p)B_0(p),\\
c&=C(p)V_0(p),&
d&=-R(p)D_0(p),\\
e&=C(p)U(p),&
j&=R(p)U(p).
\end{aligned}`}</Latex>
          <div className="theorem-block">
            <h3>{text("Тождественная корректность", "Identity-level correctness")}</h3>
            <p>
              {text(
                "Шесть многочленов тождественно удовлетворяют всем трём уравнениям ABCDEJ. Значения p, при которых нарушаются требуемые условия невырожденности, следует исключить. Кратные 4P,6P,… тем же способом создают следующие семейства.",
                "The six polynomials identically satisfy all three ABCDEJ equations. Values of p at which the required nondegeneracy conditions fail must be excluded. The multiples 4P,6P,… produce further families in the same way.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Паспорт поверхности и граница ранга", "7. Surface passport and rank bound")}</h2>
          <p>
            {text(
              "С точностью до ненулевой константы дискриминант равен",
              "Up to a nonzero constant, the discriminant is",
            )}
          </p>
          <Latex display>{String.raw`
\Delta(p)\sim
p^2(p-1)^2(p+1)^2R(p)^4\cdot
(p^4+2p^3+2p^2-2p+1)^2.`}</Latex>
          <p>
            {text(
              "Два корня R(p) дают слои I₄. Точки p=0,±1, четыре корня последнего множителя и бесконечность дают восемь слоёв I₂. Сумма чисел Эйлера равна 24, поэтому минимальная поверхность является K3.",
              "The two roots of R(p) give I₄ fibers. The points p=0,±1, the four roots of the last factor, and infinity give eight I₂ fibers. Their Euler numbers sum to 24, so the minimal surface is a K3 surface.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Доказанная граница ранга", "Proved rank bound")}</h3>
            <Latex display>{String.raw`
1\le\operatorname{rank}E(\overline{\mathbb Q}(p))\le4.`}</Latex>
            <p>
              {text(
                "Неторсионное сечение даёт нижнюю границу 1. Корневой ранг конфигурации 2I₄+8I₂ равен 14; формула Шиоды—Тейта и ρ≤20 для комплексной K3 дают верхнюю границу 4. Точный ранг пока не определён.",
                "The non-torsion section gives the lower bound 1. The root rank of the 2I₄+8I₂ configuration is 14; Shioda–Tate and ρ≤20 for a complex K3 surface give the upper bound 4. The exact rank is not yet determined.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("8. Граница результата", "8. Scope of the result")}</h2>
          <p>
            {text(
              "Построена явная порождающая K3-поверхность и бесконечная циклическая подгруппа её сечений. Это даёт бесконечно много однопараметрических семейств ABCDEJ, начиная с выписанного семейства 2P.",
              "An explicit generating K3 surface and an infinite cyclic subgroup of its sections have been constructed. This gives infinitely many one-parameter ABCDEJ families, beginning with the displayed 2P family.",
            )}
          </p>
          <p>
            {text(
              "Не утверждается, что эта подгруппа исчерпывает всю группу Морделла—Вейля или что выбранная квартическая карта перечисляет все рациональные решения исходной маски.",
              "It is not claimed that this subgroup exhausts the full Mordell–Weil group or that the chosen quartic chart enumerates every rational solution of the original pattern.",
            )}
          </p>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/6-9/abcdfh">
              {text("Далее: поверхность ABCDFH", "Next: the ABCDFH surface")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcdeh">
              {text("Предыдущая поверхность: ABCDEH", "Previous surface: ABCDEH")}
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

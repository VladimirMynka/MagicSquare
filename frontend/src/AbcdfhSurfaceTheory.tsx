import { Latex } from "./components/Latex";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function AbcdfhSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abcdfh-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.3",
              "Elliptic surfaces for 6/9 patterns · 5.3",
            )}
          </p>
          <h1>
            {text(
              "Маска ABCDFH: две прогрессии и палиндромная квартика",
              "The ABCDFH Pattern: Two Progressions and a Palindromic Quartic",
            )}
          </h1>
          <p>
            {text(
              "Прогрессии AFH и CDH имеют общий крайний квадрат H. Их жёлтая склейка BDFH приводит к палиндромной квартике рода 1, расщеплённой эллиптической K3-поверхности и явному бесконечному семейству решений.",
              "The AFH and CDH progressions share the endpoint H. Their yellow BDFH compatibility relation leads to a palindromic genus-one quartic, a split elliptic K3 surface, and an explicit infinite family of solutions.",
            )}
          </p>
        </div>
        <SixNineMaskDiagram
          caption={text(
            "ABCDFH: красные AFH, CDH; жёлтая BDFH",
            "ABCDFH: red AFH, CDH; yellow BDFH",
          )}
          first="AFH"
          mask="ABCDFH"
          second="CDH"
          third="BDFH"
        />
      </header>

      <div className="proof-document topic-document abcdfh-surface-theory-document">
        <section>
          <h2>{text("1. Исходная система и обратное восстановление", "1. The initial system and reconstruction")}</h2>
          <p>
            {text(
              "Пусть a,b,c,d,f,h — рациональные корни шести выбранных клеток. Из общей формы магического квадрата следуют три независимых отношения:",
              "Let a,b,c,d,f,h be the rational square roots of the six selected entries. The general form of a magic square gives three independent relations:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{cases}
f^2+h^2=2a^2,\\
d^2+h^2=2c^2,\\
b^2+h^2=d^2+f^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Первые две строки — красные арифметические прогрессии AFH и CDH. Последняя строка — жёлтая квадрика BDFH. Эти условия не только необходимы: по любому их рациональному решению восстанавливается весь магический квадрат.",
              "The first two equations are the red arithmetic progressions AFH and CDH. The last equation is the yellow BDFH quadric. These conditions are not merely necessary: every rational solution reconstructs a complete magic square.",
            )}
          </p>
          <Latex display>{String.raw`
E_0=\frac{b^2+h^2}{2}=\frac{d^2+f^2}{2},
\qquad x=a^2-E_0,\qquad y=E_0-c^2.`}</Latex>
          <p>
            {text(
              "Подстановка этих E₀,x,y в m(E₀,x,y) возвращает клетки A,B,C,D,F,H. Например, значение клетки F равно a²+E₀−c²=f²: последнее равенство получается сложением первых двух строк и жёлтой связи. Остальные клетки проверяются так же.",
              "Substituting these E₀,x,y into m(E₀,x,y) recovers the entries A,B,C,D,F,H. For example, the F entry is a²+E₀−c²=f²; the final equality follows by combining the first two equations with the yellow relation. The other entries follow in the same way.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Одновременная параметризация прогрессий", "2. Parametrizing both progressions at once")}</h2>
          <p>{text("Введём стандартные многочлены", "Introduce the standard polynomials")}</p>
          <Latex display>{String.raw`
L(z)=z^2-2z-1,\qquad
C(z)=z^2+1,\qquad
R(z)=z^2+2z-1,`}</Latex>
          <Latex display>{String.raw`L(z)^2+R(z)^2=2C(z)^2.`}</Latex>
          <p>
            {text(
              "Два параметра p,q позволяют сделать корень h общим:",
              "Two parameters p,q make the root h common:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
f&=L(p)R(q),& a&=C(p)R(q),\\
d&=L(q)R(p),& c&=C(q)R(p),\\
h&=R(p)R(q).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Обе красные строки теперь выполняются тождественно. В этой рациональной карте единственным оставшимся условием является квадратность d²+f²−h².",
              "Both red equations now hold identically. In this rational chart the only remaining condition is that d²+f²−h² be a square.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Палиндромная квартика", "3. The palindromic quartic")}</h2>
          <p>
            {text(
              "Обозначим искомый корень b через V и положим",
              "Write the required root b as V and put",
            )}
          </p>
          <Latex display>{String.raw`
K(p)=p^4+12p^3+2p^2-12p+1.`}</Latex>
          <p>{text("После раскрытия скобок остаётся", "Expanding and collecting terms leaves")}</p>
          <Latex display>{String.raw`
\begin{aligned}
V^2={}&L(p)^2q^4-4K(p)q^3+2L(p)^2q^2\\
&+4K(p)q+L(p)^2.
\end{aligned}`}</Latex>
          <div className="theorem-block">
            <h3>{text("Точный критерий внутри карты", "Exact criterion within the chart")}</h3>
            <p>
              {text(
                "Рациональные p,q,V задают решение ABCDFH по формулам раздела 2 и равенству b=V тогда и только тогда, когда лежат на этой квартике. Полнота этой конкретной карты для всех рациональных решений исходной маски здесь не утверждается.",
                "Rational p,q,V give an ABCDFH solution through the formulas of Section 2 and b=V exactly when they lie on this quartic. This does not claim that the chosen chart covers every rational solution of the original pattern.",
              )}
            </p>
          </div>
          <p>
            {text(
              "Палиндромная форма показывает внутреннюю геометрию уравнения. При z=q−1/q после деления на q² получаем пару коник",
              "The palindromic form exposes the geometry of the equation. With z=q−1/q, division by q² gives the pair of conics",
            )}
          </p>
          <Latex display>{String.raw`
\left(\frac Vq\right)^2=L(p)^2(z^2+4)-4K(p)z,
\qquad
\left(q+\frac1q\right)^2=z^2+4.`}</Latex>
          <p>
            {text(
              "Их расслоенное произведение по z является исходной квартикой. Для общего p её дискриминант ненулевой; отмеченные точки q=0,V=L(p) и q=1,V=−2L(p) превращают гладкий слой в эллиптическую кривую.",
              "Their fiber product over z is the original quartic. Its discriminant is nonzero for generic p; the marked points q=0,V=L(p) and q=1,V=−2L(p) turn a smooth fiber into an elliptic curve.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Расщеплённый якобиан", "4. The split Jacobian")}</h2>
          <p>
            {text(
              "Классические инварианты бинарной квартики дают короткую модель якобиана",
              "The classical invariants of the binary quartic give the short Jacobian model",
            )}
          </p>
          <Latex display>{String.raw`
Y^2=X^3-1728P(p)X+27648L(p)^2Q_1(p)Q_2(p),`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
P(p)={}&p^8+16p^7+116p^6+16p^5-218p^4\\
&-16p^3+116p^2-16p+1,\\
Q_1(p)={}&p^4+8p^3+2p^2-8p+1,\\
Q_2(p)={}&p^4+20p^3+2p^2-20p+1.
\end{aligned}`}</Latex>
          <p>{text("Правая часть полностью раскладывается:", "The cubic splits completely:")}</p>
          <Latex display>{String.raw`
\begin{aligned}
X_0&=24L(p)^2,\\
X_1&=24Q_2(p),\\
X_2&=-48Q_1(p).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Следовательно, над ℚ(p) видно всё рациональное 2-кручение. Эта факторизация также позволяет читать особые слои непосредственно по разностям трёх корней.",
              "Thus full rational 2-torsion is visible over ℚ(p). The same factorization makes the singular fibers readable directly from the differences of the three roots.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Неторсионное сечение", "5. A non-torsion section")}</h2>
          <p>
            {text(
              "Парабола, проходящая через (0,L(p)) и касающаяся квартики в точке (1,−2L(p)), даёт третью рациональную точку",
              "A parabola through (0,L(p)) and tangent to the quartic at (1,−2L(p)) gives the third rational point",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
q(p)&=\frac{2L(p)^2}{K(p)},\\
V(p)&=\frac{L(p)B_0(p)}{K(p)^2},
\end{aligned}`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
B_0(p)={}&p^8-104p^7-364p^6-104p^5+742p^4\\
&+104p^3-364p^2+104p+1.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Она задаёт сечение P якобиана. Его неторсионность имеет точный сертификат. При p=2 короткая модель и точка специализируются в",
              "This point defines a section P of the Jacobian. Its non-torsion has an exact certificate. At p=2 the short model and the point specialize to",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
E_2:\quad y^2&=x^3-12194496x+292654080,\\
P_2&=(338712,\ 197116416).
\end{aligned}`}</Latex>
          <p>
            {text(
              "Минимальная модель равна y²=x³−x²−9409x+9409, а образ P₂ — точка (9409,912576). На хороших простых 5 и 13 числа точек равны 8 и 12, поэтому порядок рациональной группы кручения делит 4. Кубика (x−1)(x−97)(x+97) уже даёт четыре точки 2-кручения; иных точек кручения нет. Образ P₂ имеет ненулевую y-координату, следовательно, он бесконечного порядка. Поэтому P неторсионно над ℚ(p).",
              "The minimal model is y²=x³−x²−9409x+9409, and P₂ maps to (9409,912576). At the good primes 5 and 13 the curve has 8 and 12 points, so the rational torsion order divides 4. The factorization (x−1)(x−97)(x+97) already gives four 2-torsion points, hence there is no other torsion. The image of P₂ has nonzero y-coordinate and therefore infinite order. Thus P is non-torsion over ℚ(p).",
            )}
          </p>
          <Latex display>{String.raw`
\langle P\rangle=\{\,nP:n\in\mathbb Z\,\}\cong\mathbb Z.`}</Latex>
          <p>
            {text(
              "После обратного бирационального преобразования кратные nP дают бесконечную последовательность рациональных секций исходной квартики и, следовательно, новые однопараметрические семейства ABCDFH.",
              "Under the inverse birational transformation, the multiples nP give an infinite sequence of rational sections of the original quartic and therefore new one-parameter ABCDFH families.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Явное полиномиальное семейство", "6. An explicit polynomial family")}</h2>
          <p>
            {text(
              "Первое сечение уже можно записать без рациональных знаменателей. Положим",
              "The first section can already be written without rational denominators. Put",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
N&=2L(p)^2,\\
U_R&=N^2+2NK-K^2,\\
U_L&=N^2-2NK-K^2,\\
U_C&=N^2+K^2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Тогда после умножения всех корней на общий знаменатель K(p)² получаем",
              "After multiplying all roots by the common denominator K(p)², one obtains",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
a&=C(p)U_R,& b&=L(p)B_0(p),\\
c&=R(p)U_C,& d&=R(p)U_L,\\
f&=L(p)U_R,& h&=R(p)U_R.
\end{aligned}`}</Latex>
          <div className="theorem-block">
            <h3>{text("Тождественная корректность", "Identity-level correctness")}</h3>
            <Latex display>{String.raw`
f^2+h^2=2a^2,\qquad
d^2+h^2=2c^2,\qquad
b^2+h^2=d^2+f^2.`}</Latex>
            <p>
              {text(
                "Все три равенства являются тождествами в ℤ[p]. Поскольку отношение f/h=L(p)/R(p) непостоянно, семейство содержит бесконечно много проективно различных рациональных решений. Нужно исключить лишь конечное множество нулей знаменателей, совпадений и других вырожденных специализаций.",
                "All three equalities are identities in ℤ[p]. Since f/h=L(p)/R(p) is nonconstant, the family contains infinitely many projectively distinct rational solutions. Only a finite set of denominator zeros, collisions, and other degenerate specializations must be excluded.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Точный пример при p=2", "7. An exact example at p=2")}</h2>
          <p>
            {text(
              "Специализация полиномиального семейства даёт корни выбранных клеток",
              "Specializing the polynomial family gives the selected-entry roots",
            )}
          </p>
          <Latex display>{String.raw`
(a,b,c,d,f,h)=
(45085,\ 28223,\ 65891,\ 68551,\ 9017,\ 63119),`}</Latex>
          <p>
            {text(
              "где знаки корней опущены. Восстановленный положительный магический квадрат равен",
              "where root signs have been omitted. The reconstructed positive magic square is",
            )}
          </p>
          <Latex display>{String.raw`
\begin{pmatrix}
2032657225&796537729&4341623881\\
4699239601&2390272945&81306289\\
438922009&3984008161&2747888665
\end{pmatrix}.`}</Latex>
          <p>
            {text(
              "Его магическая сумма равна 7 170 818 835. Ровно клетки A,B,C,D,F,H являются попарно различными полными квадратами; E,G,J положительны и квадратами не являются. Это сертификат конкретного невырожденного решения 6/9, а общая бесконечность следует из тождественного семейства выше.",
              "Its magic sum is 7,170,818,835. Exactly the entries A,B,C,D,F,H are pairwise distinct perfect squares; E,G,J are positive nonsquares. This certifies one concrete nondegenerate 6/9 solution, while the general infinitude follows from the identity-level family above.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Паспорт поверхности и граница результата", "8. Surface passport and scope")}</h2>
          <p>
            {text(
              "С точностью до ненулевой константы дискриминант якобиана равен",
              "Up to a nonzero constant, the Jacobian discriminant is",
            )}
          </p>
          <Latex display>{String.raw`
\Delta(p)\sim
p^2(p-1)^2(p+1)^2R(p)^4K(p)^2.`}</Latex>
          <p>
            {text(
              "Два корня R(p) дают слои I₄. Точки p=0,±1, четыре корня K(p) и бесконечность дают восемь слоёв I₂. Их числа Эйлера суммируются в 24, поэтому минимальная эллиптическая поверхность является K3.",
              "The two roots of R(p) give I₄ fibers. The points p=0,±1, the four roots of K(p), and infinity give eight I₂ fibers. Their Euler numbers sum to 24, so the minimal elliptic surface is a K3 surface.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Доказанная граница ранга", "Proved rank bound")}</h3>
            <Latex display>{String.raw`
1\le\operatorname{rank}E(\overline{\mathbb Q}(p))\le4.`}</Latex>
            <p>
              {text(
                "Неторсионное сечение даёт нижнюю границу 1. Корневой ранг конфигурации 2I₄+8I₂ равен 14; формула Шиоды—Тейта и ρ≤20 для комплексной K3 дают верхнюю границу 4. Точный ранг и полнота выбранной квартической карты не утверждаются.",
                "The non-torsion section gives the lower bound 1. The root rank of the 2I₄+8I₂ configuration is 14; Shioda–Tate and ρ≤20 for a complex K3 surface give the upper bound 4. Neither the exact rank nor completeness of the chosen quartic chart is claimed.",
              )}
            </p>
          </div>
          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcdej">
              {text("Предыдущая поверхность: ABCDEJ", "Previous surface: ABCDEJ")}
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

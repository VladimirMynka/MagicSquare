import { Latex } from "./components/Latex";
import { ExactMagicSquareExample } from "./components/ExactMagicSquareExample";
import { SixNineMaskDiagram } from "./components/SixNineMaskDiagram";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function AbceCommonSurfaceTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page abce-common-surface-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.5",
              "Elliptic surfaces for 6/9 patterns · 5.5",
            )}
          </p>
          <h1>
            {text(
              "Маски ABCEGH и ABCEGJ: одна поверхность, два прочтения",
              "The ABCEGH and ABCEGJ Patterns: One Surface, Two Readings",
            )}
          </h1>
          <p>
            {text(
              "В обеих масках две прогрессии квадратов имеют общий центр E. После их одновременной параметризации две разные жёлтые связи приводят к одной и той же квартике рода 1 — расщеплённой эллиптической K3-поверхности с двумя доказанно независимыми сечениями.",
              "In both patterns two progressions of squares share the center E. After a simultaneous parametrization, the two different yellow relations lead to the same genus-one quartic: a split elliptic K3 surface with two provably independent sections.",
            )}
          </p>
        </div>
        <aside
          aria-label={text(
            "Сравнение масок ABCEGH и ABCEGJ",
            "Comparison of the ABCEGH and ABCEGJ patterns",
          )}
          className="six-nine-theory-mask-pair proof-header-mask-pair"
        >
          <SixNineMaskDiagram
            caption={text(
              "ABCEGH: красные CEG, BEH; жёлтая ACEH",
              "ABCEGH: red CEG, BEH; yellow ACEH",
            )}
            first="CEG"
            mask="ABCEGH"
            second="BEH"
            third="ACEH"
          />
          <SixNineMaskDiagram
            caption={text(
              "ABCEGJ: красные CEG, AEJ; жёлтая BEGJ",
              "ABCEGJ: red CEG, AEJ; yellow BEGJ",
            )}
            first="CEG"
            mask="ABCEGJ"
            second="AEJ"
            third="BEGJ"
          />
        </aside>
      </header>

      <div className="proof-document topic-document abce-common-surface-theory-document">
        <section>
          <h2>{text("1. Две точные системы", "1. Two exact systems")}</h2>
          <p>
            {text(
              "Пусть строчные буквы обозначают рациональные корни выбранных клеток. Для ABCEGH независимые условия имеют вид",
              "Let lowercase letters denote rational square roots of the selected entries. For ABCEGH the independent conditions are",
            )}
          </p>
          <Latex display>{String.raw`
\mathrm{ABCEGH}:\qquad
\begin{cases}
c^2+g^2=2e^2,\\
b^2+h^2=2e^2,\\
a^2+c^2=e^2+h^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Для ABCEGJ меняются вторая прогрессия и жёлтая связь:",
              "For ABCEGJ the second progression and the yellow relation change:",
            )}
          </p>
          <Latex display>{String.raw`
\mathrm{ABCEGJ}:\qquad
\begin{cases}
c^2+g^2=2e^2,\\
a^2+j^2=2e^2,\\
b^2+e^2=g^2+j^2.
\end{cases}`}</Latex>
          <p>
            {text(
              "Это не только необходимые следствия магичности. В обоих случаях положим",
              "These are not merely necessary consequences of magicity. In either case put",
            )}
          </p>
          <Latex display>{String.raw`
E_0=e^2,\qquad x=a^2-E_0,\qquad y=E_0-c^2.`}</Latex>
          <p>
            {text(
              "Тогда общая форма магического квадрата восстанавливает C=c² и E=e². Первое равенство даёт G=g². Для ABCEGH третье равенство даёт H=h², после чего второе даёт B=b². Для ABCEGJ второе равенство даёт J=j², а третье — B=b². Поэтому каждая система достаточна для своей маски.",
              "The general form of a magic square then reconstructs C=c² and E=e². The first equation gives G=g². For ABCEGH the third equation gives H=h² and the second then gives B=b². For ABCEGJ the second equation gives J=j² and the third gives B=b². Hence each system is sufficient for its pattern.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Общий центр E", "2. The shared center E")}</h2>
          <p>{text("Используем стандартную тройку", "Use the standard triple")}</p>
          <Latex display>{String.raw`
L(z)=z^2-2z-1,\qquad
C(z)=z^2+1,\qquad
R(z)=z^2+2z-1,`}</Latex>
          <Latex display>{String.raw`L(z)^2+R(z)^2=2C(z)^2.`}</Latex>
          <p>
            {text(
              "Общую прогрессию CEG и общий центр обеих вторых прогрессий зададим так:",
              "Parametrize the common progression CEG and the shared center of the two second progressions by",
            )}
          </p>
          <Latex display>{String.raw`
c=L(p)C(q),\qquad
e=C(p)C(q),\qquad
g=R(p)C(q).`}</Latex>
          <p>
            {text(
              "В маске ABCEGH к ней приклеивается BEH:",
              "For ABCEGH attach the progression BEH:",
            )}
          </p>
          <Latex display>{String.raw`
b=C(p)L(q),\qquad h=C(p)R(q),\qquad a=V.`}</Latex>
          <p>
            {text(
              "В маске ABCEGJ те же два крайних корня занимают клетки A и J, а неизвестным становится B:",
              "For ABCEGJ the same two endpoint roots occupy A and J, while B becomes the unknown entry:",
            )}
          </p>
          <Latex display>{String.raw`
a=C(p)L(q),\qquad j=C(p)R(q),\qquad b=V.`}</Latex>
          <p>
            {text(
              "Четыре красных отношения теперь выполняются тождественно. В каждом прочтении остаётся проверить только соответствующую жёлтую связь.",
              "All four red relations now hold identically. In each reading only the corresponding yellow relation remains to be imposed.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Почему квартика совпадает", "3. Why the quartic is identical")}</h2>
          <p>
            {text(
              "Для ABCEGH неизвестный квадрат равен e²+h²−c²; для ABCEGJ — g²+j²−e². Их совпадение следует из элементарного тождества",
              "For ABCEGH the unknown square is e²+h²−c²; for ABCEGJ it is g²+j²−e². Their equality follows from the elementary identity",
            )}
          </p>
          <Latex display>{String.raw`
C(p)^2-L(p)^2=R(p)^2-C(p)^2=4p(p^2-1).`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
V^2
&=C(p)^2R(q)^2+4p(p^2-1)C(q)^2\\
&=R(p)^2q^4+4C(p)^2q^3+2R(p)^2q^2\\
&\qquad-4C(p)^2q+R(p)^2.
\end{aligned}`}</Latex>
          <div className="theorem-block">
            <h3>{text("Одна кривая, два отображения", "One curve, two maps")}</h3>
            <p>
              {text(
                "Рациональная точка (p,q,V) этой квартики даёт одновременно решение обеих систем: в ABCEGH число V занимает клетку A, а в ABCEGJ — клетку B. Полнота этой карты для всех рациональных решений обеих масок не утверждается.",
                "A rational point (p,q,V) on this quartic simultaneously gives a solution to both systems: V occupies A in ABCEGH and B in ABCEGJ. Completeness of this chart for all rational solutions of either pattern is not claimed.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("4. Расщеплённый якобиан", "4. The split Jacobian")}</h2>
          <p>
            {text(
              "Инварианты бинарной квартики приводят к короткой модели",
              "The binary-quartic invariants give the short model",
            )}
          </p>
          <Latex display>{String.raw`
Y^2=X^3-1728P(p)X+27648R(p)^2Q_1(p)Q_2(p),`}</Latex>
          <Latex display>{String.raw`
\begin{aligned}
P(p)={}&p^8+2p^7+8p^6+2p^5-2p^4\\
&-2p^3+8p^2-2p+1,\\
Q_1(p)={}&p^4-2p^3+2p^2+2p+1,\\
Q_2(p)={}&p^4+p^3+2p^2-p+1.
\end{aligned}`}</Latex>
          <p>{text("Кубический многочлен полностью раскладывается:", "The cubic polynomial splits completely:")}</p>
          <Latex display>{String.raw`
(X-24R(p)^2)(X-24Q_1(p))(X+48Q_2(p)).`}</Latex>
          <p>
            {text(
              "Следовательно, над ℚ(p) видно полное рациональное 2-кручение. С точностью до ненулевой константы дискриминант равен",
              "Thus full rational 2-torsion is visible over ℚ(p). Up to a nonzero constant the discriminant is",
            )}
          </p>
          <Latex display>{String.raw`
\Delta(p)\sim
p^2(p-1)^2(p+1)^2C(p)^4D(p)^2,`}</Latex>
          <Latex display>{String.raw`
D(p)=p^4+2p^3+2p^2-2p+1.`}</Latex>
          <p>
            {text(
              "Два корня C дают слои I₄. Точки p=0,±1, четыре корня D и бесконечность дают восемь слоёв I₂. Сумма чисел Эйлера равна 24, поэтому минимальная эллиптическая поверхность является K3.",
              "The two roots of C give I₄ fibers. The points p=0,±1, the four roots of D, and infinity give eight I₂ fibers. Their Euler numbers sum to 24, so the minimal elliptic surface is K3.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Два рациональных сечения", "5. Two rational sections")}</h2>
          <h3>{text("Диагональное сечение", "The diagonal section")}</h3>
          <p>
            {text(
              "Подстановка q=−p немедленно даёт точку",
              "The substitution q=−p immediately gives the point",
            )}
          </p>
          <Latex display>{String.raw`q=-p,\qquad V=C(p)^2.`}</Latex>
          <p>
            {text(
              "В соответствующих квадратах некоторые выбранные клетки совпадают, поэтому само это семейство вырождено как семейство 6/9. На эллиптической поверхности, однако, оно задаёт полноценное сечение.",
              "Some selected entries coincide in the corresponding squares, so this family is degenerate as a 6/9 family. On the elliptic surface, however, it defines a genuine section.",
            )}
          </p>

          <h3>{text("Сечение из касательной параболы", "The tangent-parabola section")}</h3>
          <p>
            {text(
              "Пусть F(q) — правая часть квартики, а C=C(p), R=R(p). Парабола",
              "Let F(q) be the right-hand side of the quartic and write C=C(p), R=R(p). The parabola",
            )}
          </p>
          <Latex display>{String.raw`
\Pi(q)=
\frac{R^2-2C^2}{R}q^2
-2\frac{2R^2-C^2}{R}q+R`}</Latex>
          <p>
            {text(
              "проходит через (0,R) и касается ветви V=−2R при q=1. Разность раскладывается точно:",
              "passes through (0,R) and is tangent to the branch V=−2R at q=1. The difference factors exactly:",
            )}
          </p>
          <Latex display>{String.raw`
R^2\bigl(F(q)-\Pi(q)^2\bigr)=
4q(q-1)^2(C^2q+2R^2)(R^2-C^2).`}</Latex>
          <p>
            {text(
              "Оставшееся пересечение даёт второе сечение",
              "The remaining intersection gives the second section",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
q&=-\frac{2R(p)^2}{C(p)^2},\\
V&=\frac{R(p)B_0(p)}{C(p)^4},\\
B_0(p)&=4R(p)^4-3C(p)^4.
\end{aligned}`}</Latex>
        </section>

        <section>
          <h2>{text("6. Независимость и граница ранга", "6. Independence and the rank bound")}</h2>
          <p>
            {text(
              "Независимость секций проверяется не численным поиском, а точной специализацией p=2. После бирационального преобразования получается кривая",
              "The sections are proved independent by an exact specialization at p=2, not by a numerical search. A birational transformation gives the curve",
            )}
          </p>
          <Latex display>{String.raw`
E_2:\quad y^2=x^3-x^2-1425x+12177
=(x-33)(x-9)(x+41),`}</Latex>
          <p>{text("а две секции переходят в точки", "and the two sections specialize to")}</p>
          <Latex display>{String.raw`
P=\left(\frac{21}{4},\frac{555}{8}\right),
\qquad
Q=\left(-\frac{159}{49},\frac{44400}{343}\right).`}</Latex>
          <p>
            {text(
              "Точные подсчёты #E₂(𝔽₇)=8 и #E₂(𝔽₁₃)=20 ограничивают рациональное кручение порядком 4; видимое полное 2-кручение уже имеет этот порядок. В 2-десценте два класса кручения имеют ранг 2 над 𝔽₂, добавление P повышает ранг до 3, а добавление Q — до 4. Следовательно, P и Q независимы по модулю кручения.",
              "The exact counts #E₂(𝔽₇)=8 and #E₂(𝔽₁₃)=20 bound rational torsion by order 4; the visible full 2-torsion already has this order. In the 2-descent, the two torsion classes have rank 2 over 𝔽₂, adjoining P raises the rank to 3, and adjoining Q raises it to 4. Therefore P and Q are independent modulo torsion.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Доказанная граница", "Proved bound")}</h3>
            <Latex display>{String.raw`
2\le\operatorname{rank}E(\overline{\mathbb Q}(p))\le4.`}</Latex>
            <p>
              {text(
                "Два независимых сечения дают нижнюю границу. Корневой ранг конфигурации 2I₄+8I₂ равен 14; формула Шиоды—Тейта и ρ≤20 для комплексной K3 дают верхнюю границу 4. Точный геометрический ранг пока не установлен.",
                "The two independent sections give the lower bound. The root rank of the 2I₄+8I₂ configuration is 14; Shioda–Tate and ρ≤20 for a complex K3 surface give the upper bound 4. The exact geometric rank has not yet been determined.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("7. Общее полиномиальное семейство", "7. A shared polynomial family")}</h2>
          <p>
            {text(
              "Сечение из касательной параболы можно очистить от знаменателей сразу для обеих масок. Положим",
              "The tangent-parabola section can be cleared of denominators for both patterns at once. Put",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
N&=2R(p)^2,\\
U_R&=N^2-2NC(p)^2-C(p)^4,\\
U_L&=N^2+2NC(p)^2-C(p)^4,\\
U_C&=N^2+C(p)^4.
\end{aligned}`}</Latex>
          <p>{text("Тогда семейство ABCEGH задаётся корнями", "Then the ABCEGH family is given by the roots")}</p>
          <Latex display>{String.raw`
\begin{aligned}
a&=R B_0,& b&=C U_L,& c&=L U_C,\\
e&=C U_C,& g&=R U_C,& h&=C U_R,
\end{aligned}`}</Latex>
          <p>{text("а то же сечение в прочтении ABCEGJ даёт", "while the same section in the ABCEGJ reading gives")}</p>
          <Latex display>{String.raw`
\begin{aligned}
a&=C U_L,& b&=R B_0,& c&=L U_C,\\
e&=C U_C,& g&=R U_C,& j&=C U_R.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Здесь L,C,R и B₀ вычисляются при одном и том же p. Все шесть определяющих равенств двух масок являются тождествами в ℤ[p]. Отношение c/g=L(p)/R(p) непостоянно, поэтому после исключения конечного набора вырождений получаются бесконечно многие проективно различные рациональные решения.",
              "Here L,C,R, and B₀ are evaluated at the same p. All six defining equations of the two patterns are identities in ℤ[p]. The ratio c/g=L(p)/R(p) is nonconstant, so after excluding finitely many degeneracies the construction yields infinitely many projectively distinct rational solutions.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Парный положительный пример", "8. A paired positive example")}</h2>
          <p>
            {text(
              "При p=−7 общее сечение даёт сразу два положительных магических квадрата. Первое прочтение соответствует маске ABCEGH.",
              "At p=−7 the shared section gives two positive magic squares at once. The first reading corresponds to the ABCEGH pattern.",
            )}
          </p>
          <ExactMagicSquareExample
            ariaLabel={text(
              "Точный квадрат ABCEGH с факторизациями квадратных клеток",
              "An exact ABCEGH square with factored square entries",
            )}
            roots={{
              A: "14242447",
              B: "16648975",
              C: "22465979",
              E: "18117725",
              G: "12320053",
              H: "19476025",
            }}
            values={[
              "202847296547809",
              "277188368550625",
              "504720212428441",
              "630124875056257",
              "328251959175625",
              "26379043294993",
              "151783705922809",
              "379315549800625",
              "453656621803441",
            ]}
          />
          <p>
            {text(
              "Во втором прочтении A и B меняются ролями, а последний квадратный корень занимает J; получается маска ABCEGJ.",
              "In the second reading A and B exchange roles, while the final square root occupies J, giving the ABCEGJ pattern.",
            )}
          </p>
          <ExactMagicSquareExample
            ariaLabel={text(
              "Точный квадрат ABCEGJ с факторизациями квадратных клеток",
              "An exact ABCEGJ square with factored square entries",
            )}
            roots={{
              A: "16648975",
              B: "14242447",
              C: "22465979",
              E: "18117725",
              G: "12320053",
              J: "19476025",
            }}
            values={[
              "277188368550625",
              "202847296547809",
              "504720212428441",
              "555783803053441",
              "328251959175625",
              "100720115297809",
              "151783705922809",
              "453656621803441",
              "379315549800625",
            ]}
          />
          <p>
            {text(
              "Оба квадрата имеют магическую сумму 984 755 877 526 875, девять различных положительных клеток и ровно шесть квадратных клеток в заявленной маске.",
              "Both squares have magic sum 984,755,877,526,875, nine distinct positive entries, and exactly the six square entries specified by their respective patterns.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К полному атласу 6/9", "Open the complete 6/9 atlas")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcdhj">
              {text("Предыдущая поверхность: ABCDHJ", "Previous surface: ABCDHJ")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abdefh">
              {text("Следующая поверхность: ABDEFH", "Next surface: ABDEFH")}
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

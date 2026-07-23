import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function TfPairGenerationTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page tf-pair-generation-page">
      <TheoryLink className="back-link" to="/theory#elliptic-tfmn">
        ← {text(
          "К циклу об эллиптической геометрии tfmn",
          "Back to the elliptic geometry of tfmn",
        )}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптическая геометрия tfmn · 4.3",
              "Elliptic geometry of tfmn · 4.3",
            )}
          </p>
          <h1>
            {text(
              "F7+ и F4+: генерация совпадений tf",
              "F7+ and F4+: Generating Equal tf Values",
            )}
          </h1>
          <p>
            {text(
              "F7+ переводит параметры фиксированного квадратного класса в точки одной кривой конгруэнтного числа и позволяет применять групповой закон. F4+ решает предшествующую задачу: систематически порождает сам класс вместе как минимум с двумя его представлениями. Вместе эти конструкции превращают одну пару совпадающих значений tf в целую решётку новых пар.",
              "F7+ translates parameter pairs of a fixed square class into points on one congruent-number curve and makes the group law available. F4+ solves the preceding problem: it systematically produces the class itself together with at least two representations. Combined, the two constructions turn one equality of tf values into a lattice of further pairs.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document tf-pair-generation-document">
        <section>
          <h2>{text("1. Задача генерации", "1. The generation problem")}</h2>
          <p>
            {text(
              "Для невырожденной рациональной пары положим",
              "For a nondegenerate rational pair, put",
            )}
          </p>
          <Latex display>{String.raw`
f(a,b)=ab(a^2-b^2),\qquad
\operatorname{tf}(a,b)=t(f(a,b)).`}</Latex>
          <p>
            {text(
              "Одновременное масштабирование не меняет tf, поэтому естественными объектами являются проективные пары [a:b]. Требуется описывать и порождать множество",
              "Simultaneous scaling does not change tf, so the natural objects are projective pairs [a:b]. The object to be described and generated is",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal R=
\left\{
([a:b],[c:d]):
\operatorname{tf}(a,b)=\operatorname{tf}(c,d)
\right\}.`}</Latex>
          <p>
            {text(
              "Здесь ab(a²−b²)cd(c²−d²)≠0. Порядок двух пар пока сохраняется: перестановка пар является отдельной симметрией множества 𝓡.",
              "Here ab(a²−b²)cd(c²−d²)≠0. The two pairs remain ordered for now; interchanging them is a separate symmetry of 𝓡.",
            )}
          </p>
          <p>
            {text(
              "Основной текст использует положительный общий класс T. Для отрицательного ориентированного tf действуют те же формулы: уравнение E_T зависит от T², а обратная пара [x:T] сохраняет знак класса.",
              "The main text uses a positive common class T. The same formulas apply to negative oriented tf: the equation of E_T depends on T², while the inverse pair [x:T] retains the sign of the class.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("2. Что даёт F7+", "2. What F7+ provides")}</h2>
          <p>
            {text(
              "Зафиксируем положительное квадратсвободное значение T. Теорема F7+ устанавливает биекцию между проективными парами с tf=T и нетривиальными рациональными точками кривой",
              "Fix a positive squarefree value T. The F7+ theorem gives a bijection between projective pairs with tf=T and nontrivial rational points on",
            )}
          </p>
          <Latex display>{String.raw`
E_T:\quad y^2=x^3-T^2x`}</Latex>
          <p>{text("с точностью до знака y:", "up to the sign of y:")}</p>
          <Latex display>{String.raw`
\begin{aligned}
f(m,n)=Tq^2
&\quad\Longrightarrow\quad
[m:n]\longmapsto
\left[
\left(\frac{Tm}{n},\frac{T^2q}{n^2}\right)
\right]_{\pm y},\\
[(x,y)]_{\pm y}
&\quad\longmapsto\quad [x:T].
\end{aligned}`}</Latex>
          <p>
            {text(
              "Поэтому каждая известная точка P∈E_T(ℚ)∖E_T[2] даёт одну пару параметров, а любой нетривиальный кратный nP даёт следующую пару того же tf. Если известны две независимые точки P и Q, то для всех целых r,s можно рассматривать",
              "Thus every known point P∈E_T(ℚ)∖E_T[2] gives one parameter pair, and every nontrivial multiple nP gives another pair with the same tf. If two independent points P and Q are known, one may use",
            )}
          </p>
          <p>
            {text(
              "Перед сложением необходимо выбрать для каждой пары один из двух знаков y, то есть ориентацию соответствующей точки. Замена знака может изменить сумму, хотя исходная проективная пара остаётся той же.",
              "Before adding points, one must choose one of the two signs of y for every pair, that is, orient the corresponding point. Changing a sign may change the sum even though the original projective pair is unchanged.",
            )}
          </p>
          <Latex display>{String.raw`
R_{r,s}=rP+sQ,\qquad
\Psi_T(R_{r,s})=[x(R_{r,s}):T].`}</Latex>
          <p>
            {text(
              "Это уже двумерная решётка решений. Противоположные точки дают одну и ту же проективную пару, а точки 2-кручения соответствуют вырожденным парам и удаляются.",
              "This is already a two-dimensional lattice of solutions. Opposite points give the same projective pair, while the 2-torsion points correspond to degenerate pairs and are removed.",
            )}
          </p>
        </section>

        <section>
          <h2>
            {text(
              "3. Почему одной F7+ недостаточно для поиска",
              "3. Why F7+ alone is not a search engine",
            )}
          </h2>
          <p>
            {text(
              "F7+ является полной координатной теоремой, но не поставляет начальную точку. Если задано число T, а нетривиальные точки E_T(ℚ) ещё не известны, обратная формула [x:T] неприменима: складывать в группе пока нечего. Даже одна известная точка обычно даёт только циклическую цепочку её кратных и сама по себе не обнаруживает второе независимое направление.",
              "F7+ is a complete coordinate theorem, but it does not supply an initial point. If T is given and no nontrivial point of E_T(ℚ) is known, the inverse formula [x:T] has no input: there is nothing to add in the group. Even one known point usually gives only the cyclic sequence of its multiples and does not by itself reveal a second independent direction.",
            )}
          </p>
          <p>
            {text(
              "Следовательно, как генератор F7+ требует начального набора точек. Именно этот недостаток компенсирует F4+.",
              "Consequently, F7+ as a generator requires a seed set of points. This is precisely the gap filled by F4+.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. F4+ как полный источник пар", "4. F4+ as a complete source of pairs")}</h2>
          <div className="theorem-block">
            <h3>
              {text(
                "Теорема о нормализованной паре",
                "Normalized-pair theorem",
              )}
            </h3>
            <p>
              {text(
                "Каждый элемент 𝓡 единственным образом нормализуется к упорядоченной паре",
                "Every element of 𝓡 has a unique normalization to an ordered pair",
              )}
            </p>
            <Latex display>{String.raw`
([x:1],[x:y]),`}</Latex>
            <p>
              {text(
                "для которой существует рациональный квадрат τ∈(ℚ×)² такой, что",
                "for which there is a rational square τ∈(ℚ×)² satisfying",
              )}
            </p>
            <Latex display>{String.raw`
x^2-1=\tau y(x^2-y^2).`}</Latex>
            <p>
              {text(
                "Обратно, каждая невырожденная рациональная точка такого слоя F4+ задаёт элемент 𝓡.",
                "Conversely, every nondegenerate rational point on such an F4+ fiber gives an element of 𝓡.",
              )}
            </p>
          </div>

          <h3>{text("Прямой переход", "Forward passage")}</h3>
          <p>
            {text(
              "Пусть tf(u,v)=tf(r,s). Положим",
              "Suppose tf(u,v)=tf(r,s). Put",
            )}
          </p>
          <Latex display>{String.raw`
x=\frac uv,\qquad
y=\frac{us}{rv}.`}</Latex>
          <p>
            {text(
              "Тогда [u:v]=[x:1] и [r:s]=[x:y]. Равенство tf означает, что отношение двух f-значений является рациональным квадратом:",
              "Then [u:v]=[x:1] and [r:s]=[x:y]. Equality of tf means that the quotient of the two f-values is a rational square:",
            )}
          </p>
          <Latex display>{String.raw`
\tau=
\frac{f(x,1)}{f(x,y)}
=
\frac{x^2-1}{y(x^2-y^2)}
\in(\mathbb Q^\times)^2.`}</Latex>

          <h3>{text("Обратный переход", "Reverse passage")}</h3>
          <p>
            {text(
              "Если (x,y,τ) удовлетворяет уравнению F4+ и τ является рациональным квадратом, то",
              "If (x,y,τ) satisfies the F4+ equation and τ is a rational square, then",
            )}
          </p>
          <Latex display>{String.raw`
f(x,1)=\tau f(x,y),`}</Latex>
          <p>
            {text(
              "поэтому tf(x,1)=tf(x,y). Независимые масштабы возвращают произвольные представители двух проективных классов:",
              "and hence tf(x,1)=tf(x,y). Independent scalings recover arbitrary representatives of the two projective classes:",
            )}
          </p>
          <Latex display>{String.raw`
(a,b)=(\lambda x,\lambda),\qquad
(c,d)=(\mu x,\mu y),
\qquad \lambda,\mu\in\mathbb Q^\times.`}</Latex>
        </section>

        <section>
          <h2>{text("5. Эллиптический генератор F4+", "5. The F4+ elliptic generator")}</h2>
          <p>
            {text(
              "Пусть τ=ρ² и τ≠1. Кубика F4+ бирационально эквивалентна вспомогательной кривой",
              "Let τ=ρ² and τ≠1. The F4+ cubic is birational to the auxiliary curve",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal E_\tau:\quad
Y^2=X^3-3\tau^2X+\tau^2(\tau^2+1).`}</Latex>
          <p>
            {text(
              "Из её рациональной точки восстанавливаются",
              "A rational point on this curve recovers",
            )}
          </p>
          <Latex display>{String.raw`
x=\frac{Y}{\tau(X-1)},\qquad
y=\frac{X-\tau^2}{\tau(X-1)}.`}</Latex>
          <p>
            {text(
              "После исключения границы xy(x²−1)(x²−y²)=0 получаются две невырожденные пары [x:1] и [x:y] с общим tf. Для генерации двух различных точек дополнительно удаляется диагональ y=1. На поверхности известны рациональные секции; хотя простейшие из них сами лежат на вырожденной границе, их комбинации P−Q, 2P и P+2Q уже дают явные невырожденные семейства. Поэтому F4+ способен выбирать T и одновременно поставлять две начальные точки на E_T.",
              "After removing the boundary xy(x²−1)(x²−y²)=0, one obtains two nondegenerate pairs [x:1] and [x:y] with a common tf. To generate two distinct points, one also removes the diagonal y=1. The surface has rational sections; although the simplest sections themselves lie on the degenerate boundary, combinations such as P−Q, 2P, and P+2Q already give explicit nondegenerate families. Thus F4+ can choose T and simultaneously supply two seed points on E_T.",
            )}
          </p>
          <p>
            {text(
              "При τ=1 эллиптическая модель вырождается, но исходная задача не исчезает. Нетривиальная компонента становится коникой",
              "At τ=1 the elliptic model degenerates, but the original problem remains. Its nontrivial component is the conic",
            )}
          </p>
          <Latex display>{String.raw`
x^2=y^2+y+1,`}</Latex>
          <p>
            {text(
              "то есть старой F4. Она обрабатывается собственной полной рациональной параметризацией.",
              "which is the old F4 family. It is handled by its own complete rational parametrization.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Совместный алгоритм F4+ → F7+", "6. The combined F4+ → F7+ algorithm")}</h2>
          <ol>
            <li>
              {text(
                "Выбрать рациональное ρ и невырожденную рациональную точку соответствующего слоя F4+ — непосредственно либо из комбинации универсальных секций.",
                "Choose a rational ρ and a nondegenerate rational point on the corresponding F4+ fiber, directly or from a combination of the universal sections.",
              )}
            </li>
            <li>
              {text(
                "Восстановить две проективные пары [x:1] и [x:y].",
                "Recover the two projective pairs [x:1] and [x:y].",
              )}
            </li>
            <li>
              {text(
                "Вычислить общий квадратсвободный класс T=tf(x,1)=tf(x,y).",
                "Compute their common squarefree class T=tf(x,1)=tf(x,y).",
              )}
            </li>
            <li>
              {text(
                "Отобразить обе пары по F7+ в точки P,Q∈E_T(ℚ), выбрав знаки их y-координат.",
                "Map both pairs through F7+ to points P,Q∈E_T(ℚ), choosing the signs of their y-coordinates.",
              )}
            </li>
            <li>
              {text(
                "Для целых r,s вычислять R=rP+sQ и возвращать каждую нетривиальную точку в пару [x(R):T].",
                "For integers r,s, compute R=rP+sQ and return every nontrivial point to the pair [x(R):T].",
              )}
            </li>
          </ol>
          <p>
            {text(
              "Над полем функций полной F4+-поверхности две полученные точки независимы, поэтому универсально возникает решётка ранга не меньше 2. В конкретной рациональной специализации независимость необходимо проверять отдельно: она может выродиться.",
              "Over the function field of the full F4+ surface, the two resulting points are independent, so a lattice of rank at least 2 appears universally. Independence must still be checked in an individual rational specialization, where it may degenerate.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Точный пример: T=210", "7. Exact example: T=210")}</h2>
          <p>
            {text(
              "На слое τ=1 возьмём точку",
              "On the τ=1 fiber, take",
            )}
          </p>
          <Latex display>{String.raw`
x=\frac73,\qquad y=\frac53,
\qquad
7^2=3^2+3\cdot5+5^2.`}</Latex>
          <p>
            {text(
              "Она даёт две проективные пары",
              "It gives the two projective pairs",
            )}
          </p>
          <Latex display>{String.raw`
[7:3],\qquad [7:5],\qquad
f(7,3)=f(7,5)=840=210\cdot2^2.`}</Latex>
          <p>
            {text(
              "По F7+ им соответствуют точки",
              "Under F7+, they correspond to",
            )}
          </p>
          <Latex display>{String.raw`
P=(490,9800),\qquad
Q=(294,3528)
\quad\text{на}\quad
E_{210}:v^2=u^3-210^2u.`}</Latex>
          <p>
            {text(
              "Они независимы. Уже первое сложение даёт",
              "They are independent. Their first sum already gives",
            )}
          </p>
          <Latex display>{String.raw`
P+Q=(240,-1800),\qquad
\Psi_{210}(P+Q)=[240:210]=[8:7].`}</Latex>
          <p>
            {text(
              "Действительно, f(8,7)=840 и tf(8,7)=210. Дальнейшие комбинации rP+sQ порождают новые проективные пары того же квадратного класса.",
              "Indeed, f(8,7)=840 and tf(8,7)=210. Further combinations rP+sQ generate new projective pairs in the same square class.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Полнота и точная граница", "8. Completeness and exact scope")}</h2>
          <div className="theorem-block">
            <ul>
              <li>
                {text(
                  "F7+ полностью описывает пары фиксированного tf, но только через множество рациональных точек E_T(ℚ); это не готовый конечный список.",
                  "F7+ completely describes pairs of fixed tf through the rational points E_T(ℚ); this is not a ready finite list.",
                )}
              </li>
              <li>
                {text(
                  "F4+ полностью описывает упорядоченные совпадения tf после нормализации к общему первому параметру и одновременно даёт явные семейства начальных пар.",
                  "F4+ completely describes ordered tf coincidences after normalization to a common first parameter and also supplies explicit families of seed pairs.",
                )}
              </li>
              <li>
                {text(
                  "Комбинация F4+ → F7+ порождает подгруппу ⟨P,Q⟩ и все соответствующие ей пары. Для отдельного T равенство этой подгруппы всей E_T(ℚ) требует определения группы Морделла—Вейля конкретной кривой.",
                  "The F4+ → F7+ combination generates the subgroup ⟨P,Q⟩ and every pair corresponding to it. For an individual T, proving that this subgroup equals all of E_T(ℚ) requires determining the Mordell–Weil group of that particular curve.",
                )}
              </li>
            </ul>
          </div>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/theory/f7-plus">
              {text("Полное доказательство F7+", "Full proof of F7+")}{" "}
              <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/f4-plus">
              {text("Геометрия и ранг F4+", "Geometry and rank of F4+")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory">
              {text("К оглавлению", "Theory contents")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

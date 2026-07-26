import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

export function EllipticSurfacesPrimerTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page elliptic-surfaces-primer-page">
      <TheoryLink className="back-link" to="/theory#elliptic-tfmn">
        ← {text("К оглавлению теории", "Back to the theory contents")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптическая геометрия квадратных классов · 4.1",
              "Elliptic geometry of square classes · 4.1",
            )}
          </p>
          <h1>
            {text(
              "Кривые рода 1, якобианы и эллиптические поверхности",
              "Genus-One Curves, Jacobians, and Elliptic Surfaces",
            )}
          </h1>
          <p>
            {text(
              "Эта глава фиксирует общий язык последующих статей: как из квартики рода 1 возникает эллиптическая кривая, что меняется при переходе от слоя к поверхности и какие именно ранги ограничивает формула Шиоды—Тейта.",
              "This chapter fixes the common language used later: how a genus-one quartic produces an elliptic curve, what changes when a fiber is replaced by a surface, and exactly which ranks are bounded by the Shioda–Tate formula.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document elliptic-surfaces-primer-document">
        <section>
          <h2>{text("1. Кривая рода 1 и эллиптическая кривая", "1. Genus-one curves and elliptic curves")}</h2>
          <p>
            {text(
              "Гладкая проективная кривая рода 1 ещё не является эллиптической кривой: для этого на ней надо выбрать рациональную точку O, которая станет нулём группового закона. Если такая точка выбрана, кривая изоморфна собственной якобиане. Если рациональной точки не дано, якобиана всё равно существует, но исходная кривая является торсором под ней и может не иметь рациональных точек.",
              "A smooth projective curve of genus one is not yet an elliptic curve: one must choose a rational point O to serve as the identity of the group law. With such a point, the curve is isomorphic to its Jacobian. Without a rational point, the Jacobian still exists, but the original curve is a torsor under it and may have no rational points.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Что делается с квартикой", "What is done with a quartic")}</h3>
            <p>
              {text(
                "В статьях 6/9 после параметризации двух квадратичных условий обычно остаётся уравнение v²=Q₄(u). При ненулевом дискриминанте его гладкая проективизация имеет род 1. Выбранная рациональная точка позволяет выполнить точное бирациональное преобразование к модели Вейерштрасса",
                "In the 6/9 articles, parametrizing two quadratic conditions usually leaves an equation v²=Q₄(u). When the discriminant is nonzero, its smooth projective completion has genus one. A chosen rational point permits an exact birational transformation to a Weierstrass model",
              )}
            </p>
            <Latex display>{String.raw`
y^2=x^3+A x^2+B x+C.`}</Latex>
            <p>
              {text(
                "Такое преобразование описывает открытую карту: исключённые точки и вырожденные значения параметров необходимо проверять отдельно. Поэтому параметризация на одной карте не означает автоматической классификации всех рациональных точек исходной поверхности.",
                "Such a transformation describes an open chart: omitted points and degenerate parameter values must be checked separately. A parametrization on one chart therefore does not automatically classify every rational point of the original surface.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("2. Слой, сечение и полная поверхность", "2. Fibers, sections, and the total surface")}</h2>
          <p>
            {text(
              "Эллиптическая поверхность — это поверхность 𝓔 с морфизмом π:𝓔→C на базовую кривую C, общий слой которого является гладкой кривой рода 1, вместе с нулевым сечением. В рассматриваемых моделях C обычно равна ℙ¹, а её координата обозначается p, q, t или k.",
              "An elliptic surface is a surface 𝓔 equipped with a morphism π:𝓔→C to a base curve C whose generic fiber is a smooth genus-one curve, together with a zero section. In the models considered here, C is usually ℙ¹, with coordinate p, q, t, or k.",
            )}
          </p>
          <Latex display>{String.raw`
\pi:\mathcal E\longrightarrow C,\qquad
E_\eta/\mathbb Q(C).`}</Latex>
          <p>
            {text(
              "Рациональное сечение C→𝓔 равносильно точке общего слоя Eη над полем функций ℚ(C). Подстановка конкретного рационального значения параметра даёт специализированный слой — отдельную эллиптическую кривую над ℚ. Ранг общего слоя и ранг отдельной специализации являются разными величинами.",
              "A rational section C→𝓔 is the same as a point of the generic fiber Eη over the function field ℚ(C). Substituting a particular rational parameter gives a specialized fiber, an individual elliptic curve over ℚ. The rank of the generic fiber and the rank of a specialization are different quantities.",
            )}
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{text("Обозначение", "Notation")}</th>
                  <th>{text("Смысл", "Meaning")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Latex>{String.raw`\operatorname{rank}E(\mathbb Q(t))`}</Latex></td>
                  <td>{text("арифметический ранг рациональных сечений", "arithmetic rank of rational sections")}</td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`\operatorname{rank}E(\overline{\mathbb Q}(t))`}</Latex></td>
                  <td>{text("геометрический ранг после расширения поля констант", "geometric rank after extending the constant field")}</td>
                </tr>
                <tr>
                  <td><Latex>{String.raw`\operatorname{rank}E_{t_0}(\mathbb Q)`}</Latex></td>
                  <td>{text("арифметический ранг одного невырожденного слоя", "arithmetic rank of one nonsingular fiber")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Всегда rank E(ℚ(t))≤rank E(ℚ̄(t)). Теорема о специализации сохраняет независимость заданных сечений для всех рациональных значений вне тонкого исключительного множества, но не утверждает постоянство полного ранга каждого слоя.",
              "One always has rank E(ℚ(t))≤rank E(ℚ̄(t)). The specialization theorem preserves the independence of specified sections for all rational parameters outside a thin exceptional set, but it does not assert that every fiber has the same total rank.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("3. Модель Вейерштрасса и особые слои", "3. Weierstrass models and singular fibers")}</h2>
          <p>
            {text(
              "Уравнение Вейерштрасса над ℚ(t) сначала задаёт общий слой. Для геометрии поверхности его продолжают над всей базой, разрешают особенности и переходят к относительно минимальной модели. Нули дискриминанта отмечают возможные особые слои; их точный тип определяется минимальной локальной моделью, а не одной кратностью дискриминанта.",
              "A Weierstrass equation over ℚ(t) first defines the generic fiber. To study the surface, one extends it over the whole base, resolves singularities, and passes to a relatively minimal model. Zeros of the discriminant mark possible singular fibers; their exact type is determined from a minimal local model, not by the discriminant multiplicity alone.",
            )}
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{text("Тип Кодайры", "Kodaira type")}</th>
                  <th>{text("Корневая решётка", "Root lattice")}</th>
                  <th>{text("Число Эйлера", "Euler number")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>I<sub>n</sub></td><td>A<sub>n−1</sub></td><td>n</td></tr>
                <tr><td>I<sub>0</sub>*</td><td>D<sub>4</sub></td><td>6</td></tr>
                <tr><td>IV</td><td>A<sub>2</sub></td><td>4</td></tr>
                <tr><td>IV*</td><td>E<sub>6</sub></td><td>8</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Выражение «расщеплённый якобиан» в статьях означает, что три ненулевые точки порядка 2 видны над указанным полем функций, например в модели y²=x(x−a)(x−b). Оно не означает, что сама поверхность является произведением кривых.",
              "In these articles, “split Jacobian” means that all three nonzero 2-torsion points are visible over the stated function field, for example in a model y²=x(x−a)(x−b). It does not mean that the surface itself is a product of curves.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Рациональная поверхность или K3", "4. Rational elliptic surfaces and K3 surfaces")}</h2>
          <p>
            {text(
              "Для относительно минимальной эллиптической поверхности с сечением над ℙ¹ и без кратных слоёв фундаментальный линейный пучок имеет степень χ(𝒪𝓔), сумма чисел Эйлера особых слоёв равна 12χ(𝒪𝓔), а формула канонического пучка имеет вид",
              "For a relatively minimal elliptic surface with a section over ℙ¹ and without multiple fibers, the fundamental line bundle has degree χ(𝒪𝓔), the Euler numbers of the singular fibers sum to 12χ(𝒪𝓔), and the canonical-bundle formula is",
            )}
          </p>
          <Latex display>{String.raw`
K_{\mathcal E}\cong
\pi^*\!\left(K_{\mathbb P^1}\otimes\mathcal L\right),
\qquad
\deg\mathcal L=\chi(\mathcal O_{\mathcal E}).`}</Latex>
          <p>
            {text(
              "При χ=1 получается рациональная эллиптическая поверхность и сумма Эйлера 12. При χ=2 канонический пучок тривиален, сумма равна 24 и, при стандартных условиях гладкости и относительной минимальности, поверхность является эллиптической K3. Само равенство суммы 24 используется только после проверки этих гипотез.",
              "When χ=1, one obtains a rational elliptic surface and Euler sum 12. When χ=2, the canonical bundle is trivial, the sum is 24, and under the standard smoothness and relative-minimality hypotheses the surface is an elliptic K3 surface. The numerical sum 24 is used only after these hypotheses have been checked.",
            )}
          </p>
          <p>
            {text(
              "Есть и другой путь к K3: гладкое пересечение трёх квадрик в ℙ⁵ имеет тривиальный канонический пучок по формуле сопряжения, а H¹(𝒪)=0 следует из теоремы Лефшеца или комплекса Кошуля. Его минимальная гладкая модель поэтому является K3. Якобиан выбранного расслоения — дополнительная структура на этой поверхности.",
              "There is another route to a K3 surface: a smooth intersection of three quadrics in ℙ⁵ has trivial canonical bundle by adjunction, while H¹(𝒪)=0 follows from the Lefschetz theorem or the Koszul complex. Its smooth minimal model is therefore K3. The Jacobian of a chosen fibration is additional structure on that surface.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Формула Шиоды—Тейта", "5. The Shioda–Tate formula")}</h2>
          <p>
            {text(
              "Пусть ρ(𝓔) — геометрическое число Пикара, а Rᵥ — корневая решётка компонент особого слоя, не пересекающих нулевое сечение. Тогда",
              "Let ρ(𝓔) be the geometric Picard number and let Rᵥ be the root lattice formed by components of a singular fiber that do not meet the zero section. Then",
            )}
          </p>
          <Latex display>{String.raw`
\rho(\mathcal E)=
2+\sum_v\operatorname{rank}R_v+
\operatorname{rank}E(\overline{\mathbb Q}(t)).`}</Latex>
          <p>
            {text(
              "Для рациональной эллиптической поверхности ρ=10. Для комплексной K3-поверхности ρ≤20. Поэтому паспорт особых слоёв даёт верхнюю границу геометрического ранга. Нижнюю границу получают предъявлением независимых неторсионных сечений. Совпадение границ определяет точный геометрический ранг; без такого совпадения статья указывает только доказанный интервал.",
              "A rational elliptic surface has ρ=10. A complex K3 surface has ρ≤20. Hence the singular-fiber passport gives an upper bound on the geometric rank. A lower bound comes from explicit independent non-torsion sections. Matching bounds determine the exact geometric rank; otherwise an article records only the proved interval.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("6. Что доказывает явная секция", "6. What an explicit section proves")}</h2>
          <p>
            {text(
              "Формулы координат секции должны удовлетворять уравнению тождественно в поле функций. Для неторсионности недостаточно нескольких численных проверок: используется точная специализация с доказанной неторсионностью, высота, спуск или другой сертификат. Независимость нескольких секций требует отдельного точного аргумента.",
              "The coordinate formulas of a section must satisfy the equation identically in the function field. A few numerical checks do not prove non-torsion: one uses an exact specialization with certified non-torsion, a height computation, descent, or another certificate. Independence of several sections requires a separate exact argument.",
            )}
          </p>
          <p>
            {text(
              "Неторсионная секция даёт бесконечно много точек общего слоя и, после исключения вырожденных параметров, бесконечно много рациональных специализаций. Она не доказывает, что выбранная карта охватывает все рациональные точки поверхности или что каждая специализация положительна и имеет ровно требуемый тип 6/9.",
              "A non-torsion section gives infinitely many points on the generic fiber and, after excluding degenerate parameters, infinitely many rational specializations. It does not prove that the chosen chart covers every rational point of the surface or that every specialization is positive and has exactly the required 6/9 type.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Два значения слова «Лежандр»", "7. Two uses of the name Legendre")}</h2>
          <p>
            {text(
              "Символ Лежандра (a/p) из главы о вычетах определяет, является ли a квадратичным вычетом по модулю нечётного простого p. Нормальная форма Лежандра — это семейство эллиптических кривых",
              "The Legendre symbol (a/p) in the chapter on residues records whether a is a quadratic residue modulo an odd prime p. Legendre normal form is the family of elliptic curves",
            )}
          </p>
          <Latex display>{String.raw`
E_\lambda:\qquad y^2=x(x-1)(x-\lambda),
\qquad \lambda\ne0,1.`}</Latex>
          <p>
            {text(
              "Это независимые понятия, связанные только именем. В статье ABEFGH используется нормальная форма семейства кривых, а не символ квадратичного вычета.",
              "These are different notions that merely share a name. The ABEFGH article uses the normal form of a family of curves, not the quadratic-residue symbol.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Литература", "8. References")}</h2>
          <ul>
            <li>
              Rick Miranda,{" "}
              <a href="https://www.edizioniets.com/scheda.asp?n=462-6" rel="noreferrer" target="_blank">
                The Basic Theory of Elliptic Surfaces
              </a>.
            </li>
            <li>
              Matthias Schütt and Tetsuji Shioda,{" "}
              <a href="https://arxiv.org/abs/0907.0298" rel="noreferrer" target="_blank">
                Elliptic Surfaces
              </a>.
            </li>
            <li>
              Joseph H. Silverman, <i>Advanced Topics in the Arithmetic of Elliptic Curves</i>, Springer.
            </li>
            <li>
              Daniel Huybrechts,{" "}
              <a href="https://doi.org/10.1017/CBO9781316594193" rel="noreferrer" target="_blank">
                Lectures on K3 Surfaces
              </a>.
            </li>
          </ul>
        </section>

        <nav className="topic-next-links">
          <TheoryLink to="/theory/f7-plus">
            {text("Далее: F7+ →", "Next: F7+ →")}
          </TheoryLink>
        </nav>
      </div>
    </article>
  );
}

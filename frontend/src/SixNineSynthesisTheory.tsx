import { Latex } from "./components/Latex";
import { useLocale } from "./i18n";
import { TheoryLink } from "./TheoryPages";

interface LocalizedText {
  ru: string;
  en: string;
}

interface SynthesisAtlasEntry {
  mask: string;
  profile: "RRR" | "RRY" | "RYY" | "RYB" | "YYB";
  incidence: LocalizedText;
  model: LocalizedText;
  surface: string;
  rank: string;
  sections: LocalizedText;
  path: string;
}

interface SynthesisAtlasGroup {
  index: string;
  title: LocalizedText;
  note: LocalizedText;
  entries: readonly SynthesisAtlasEntry[];
}

const SYNTHESIS_ATLAS: readonly SynthesisAtlasGroup[] = [
  {
    index: "I",
    title: {
      ru: "Три красные прогрессии",
      en: "Three red progressions",
    },
    note: {
      ru: "Самые простые локальные условия: каждая квадрика является рациональной коникой прогрессии.",
      en: "The simplest local conditions: every quadric is a rational progression conic.",
    },
    entries: [
      {
        mask: "ABDEFH",
        profile: "RRR",
        incidence: {
          ru: "три прогрессии, два общих центра",
          en: "three progressions, two shared centers",
        },
        model: {
          ru: "правильно скрученная квартика",
          en: "a correctly twisted quartic",
        },
        surface: "4I₄+4I₂",
        rank: "1≤r≤2",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abdefh",
      },
      {
        mask: "ABDEFJ",
        profile: "RRR",
        incidence: {
          ru: "цепочка трёх прогрессий",
          en: "a chain of three progressions",
        },
        model: {
          ru: "палиндромная квартика",
          en: "a palindromic quartic",
        },
        surface: "4I₄+4I₂",
        rank: "1≤r≤2",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abdefj",
      },
      {
        mask: "ABEFGH",
        profile: "RRR",
        incidence: {
          ru: "треугольник попарных средних",
          en: "a triangle of pairwise means",
        },
        model: {
          ru: "обратный образ семейства Лежандра",
          en: "a pullback of the Legendre family",
        },
        surface: "4I₄+4I₂",
        rank: "1≤r≤2",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abefgh",
      },
    ],
  },
  {
    index: "II",
    title: {
      ru: "Две параллельные красные и жёлтая склейка",
      en: "Two parallel red conics and a yellow gluing",
    },
    note: {
      ru: "Особо простой глобальный случай: третья квадрика в точности становится равенством tf.",
      en: "A particularly simple global case: the third quadric becomes equality of tf exactly.",
    },
    entries: [
      {
        mask: "ABEFGJ",
        profile: "RRY",
        incidence: {
          ru: "параллельные прогрессии с центром E",
          en: "parallel progressions containing E",
        },
        model: {
          ru: "полная tfmn-нормализация",
          en: "complete tfmn normalization",
        },
        surface: "Km(E×E)",
        rank: "—",
        sections: {
          ru: "полное описание tfmn",
          en: "complete tfmn description",
        },
        path: "/theory/6-9/abefgj-abdfhj",
      },
      {
        mask: "ABDFHJ",
        profile: "RRY",
        incidence: {
          ru: "параллельные прогрессии без E",
          en: "parallel progressions omitting E",
        },
        model: {
          ru: "линейно то же пространство tfmn",
          en: "linearly the same tfmn space",
        },
        surface: "Km(E×E)",
        rank: "—",
        sections: {
          ru: "полное описание tfmn",
          en: "complete tfmn description",
        },
        path: "/theory/6-9/abefgj-abdfhj",
      },
    ],
  },
  {
    index: "III",
    title: {
      ru: "Две пересекающиеся красные и жёлтая склейка",
      en: "Two intersecting red conics and a yellow gluing",
    },
    note: {
      ru: "После параметризации двух прогрессий остаётся отмеченная квартика рода 1.",
      en: "After parametrizing the two progressions, a pointed genus-one quartic remains.",
    },
    entries: [
      {
        mask: "ABCDEH",
        profile: "RRY",
        incidence: {
          ru: "две прогрессии с общей H",
          en: "two progressions sharing H",
        },
        model: {
          ru: "остаточная квартика",
          en: "a residual quartic",
        },
        surface: "2I₄+8I₂",
        rank: "2≤r≤4",
        sections: { ru: "2 независимые", en: "2 independent" },
        path: "/theory/6-9/abcdeh",
      },
      {
        mask: "ABCDEJ",
        profile: "RRY",
        incidence: {
          ru: "две прогрессии с общей J",
          en: "two progressions sharing J",
        },
        model: {
          ru: "остаточная квартика",
          en: "a residual quartic",
        },
        surface: "2I₄+8I₂",
        rank: "1≤r≤4",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abcdej",
      },
      {
        mask: "ABCDFH",
        profile: "RRY",
        incidence: {
          ru: "две прогрессии с общей H",
          en: "two progressions sharing H",
        },
        model: {
          ru: "палиндромная квартика",
          en: "a palindromic quartic",
        },
        surface: "2I₄+8I₂",
        rank: "1≤r≤4",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abcdfh",
      },
      {
        mask: "ABCDHJ",
        profile: "RRY",
        incidence: {
          ru: "две прогрессии с общей D",
          en: "two progressions sharing D",
        },
        model: {
          ru: "палиндромная квартика",
          en: "a palindromic quartic",
        },
        surface: "2I₄+8I₂",
        rank: "1≤r≤4",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abcdhj",
      },
      {
        mask: "ABCEGH",
        profile: "RRY",
        incidence: {
          ru: "общий центр E; первое прочтение",
          en: "shared center E; first reading",
        },
        model: {
          ru: "общая квартика с ABCEGJ",
          en: "a quartic shared with ABCEGJ",
        },
        surface: "2I₄+8I₂",
        rank: "2≤r≤4",
        sections: { ru: "2 независимые", en: "2 independent" },
        path: "/theory/6-9/abcegh-abcegj",
      },
      {
        mask: "ABCEGJ",
        profile: "RRY",
        incidence: {
          ru: "общий центр E; второе прочтение",
          en: "shared center E; second reading",
        },
        model: {
          ru: "общая квартика с ABCEGH",
          en: "a quartic shared with ABCEGH",
        },
        surface: "2I₄+8I₂",
        rank: "2≤r≤4",
        sections: { ru: "2 независимые", en: "2 independent" },
        path: "/theory/6-9/abcegh-abcegj",
      },
    ],
  },
  {
    index: "IV",
    title: {
      ru: "Одна красная и две жёлтые нормы",
      en: "One red conic and two yellow norms",
    },
    note: {
      ru: "Одна рациональная прогрессия связывает две независимые гауссовы факторизации.",
      en: "One rational progression links two independent Gaussian factorizations.",
    },
    entries: [
      {
        mask: "ABCDEG",
        profile: "RYY",
        incidence: {
          ru: "центральная прогрессия CEG",
          en: "the central CEG progression",
        },
        model: {
          ru: "чётная квартика",
          en: "an even quartic",
        },
        surface: "12I₂",
        rank: "1≤r≤6",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abcdeg",
      },
      {
        mask: "ABCDGJ",
        profile: "RYY",
        incidence: {
          ru: "прогрессия BDJ и две нормы",
          en: "the BDJ progression and two norms",
        },
        model: {
          ru: "чётная квартика",
          en: "an even quartic",
        },
        surface: "12I₂",
        rank: "1≤r≤6",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abcdgj",
      },
    ],
  },
  {
    index: "V",
    title: {
      ru: "Красная, жёлтая и голубая нормы",
      en: "Red, yellow, and blue norms",
    },
    note: {
      ru: "Гауссова норма и норма x²+2y² должны одновременно согласоваться с прогрессией.",
      en: "A Gaussian norm and an x²+2y² norm must both agree with a progression.",
    },
    entries: [
      {
        mask: "ABCDEF",
        profile: "RYB",
        incidence: {
          ru: "три условия на общем блоке CDE",
          en: "three conditions on the CDE block",
        },
        model: {
          ru: "чётная квартика",
          en: "an even quartic",
        },
        surface: "12I₂",
        rank: "1≤r≤6",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abcdef",
      },
      {
        mask: "ABCDFG",
        profile: "RYB",
        incidence: {
          ru: "три нормы без центральной клетки",
          en: "three norms without the center",
        },
        model: {
          ru: "чётная квартика",
          en: "an even quartic",
        },
        surface: "12I₂",
        rank: "1≤r≤6",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abcdfg",
      },
    ],
  },
  {
    index: "VI",
    title: {
      ru: "Две жёлтые и голубая норма без красного",
      en: "Two yellow and one blue norm without red",
    },
    note: {
      ru: "Самый сложный по локальным условиям тип: ни одна квадрика заранее не параметризуется прогрессией.",
      en: "The locally hardest type: no quadric is parametrized in advance by a progression.",
    },
    entries: [
      {
        mask: "ABCGHJ",
        profile: "YYB",
        incidence: {
          ru: "единственный бескрасный тип",
          en: "the unique red-free type",
        },
        model: {
          ru: "гладкое (2,2,2)-пересечение; гауссова карта",
          en: "a smooth (2,2,2) intersection; Gaussian chart",
        },
        surface: "4I₄+4I₂",
        rank: "1≤r≤2",
        sections: { ru: "1 родная", en: "1 native" },
        path: "/theory/6-9/abcghj",
      },
    ],
  },
];

function ProfileBadge({ profile }: { profile: SynthesisAtlasEntry["profile"] }) {
  return (
    <span className={`synthesis-profile profile-${profile.toLowerCase()}`}>
      {profile.split("").map((kind, index) => (
        <i className={`profile-${kind.toLowerCase()}`} key={`${kind}-${index}`}>
          {kind}
        </i>
      ))}
    </span>
  );
}

export function SixNineSynthesisTheoryPage() {
  const { text } = useLocale();

  return (
    <article className="page proof-page topic-page six-nine-synthesis-theory-page">
      <TheoryLink className="back-link" to="/theory#six-nine-surfaces">
        ← {text("К циклу о поверхностях 6/9", "Back to the 6/9 surfaces series")}
      </TheoryLink>

      <header className="proof-page-header">
        <div>
          <p className="eyebrow">
            {text(
              "Эллиптические поверхности 6/9 · 5.15",
              "Elliptic surfaces for 6/9 patterns · 5.15",
            )}
          </p>
          <h1>
            {text(
              "Общая геометрия 6/9: расширенный атлас",
              "The General Geometry of 6/9: An Expanded Atlas",
            )}
          </h1>
          <p>
            {text(
              "Шестнадцать позиционных типов образуют не набор несвязанных исключений, а четыре геометрические серии K3. Расширенный атлас упорядочивает их по сложности исходных норм и сопоставляет каждой маске модель, паспорт слоёв, границу ранга и известные общие секции.",
              "The sixteen positional types are not a collection of unrelated exceptions but four geometric K3 series. This expanded atlas orders them by the complexity of their defining norms and records the model, fiber passport, rank bound, and known generic sections of every pattern.",
            )}
          </p>
        </div>
      </header>

      <div className="proof-document topic-document six-nine-synthesis-theory-document">
        <section>
          <h2>{text("1. Конечный результат классификации", "1. The finite classification result")}</h2>
          <p>
            {text(
              "С точностью до диэдральных симметрий квадрата существует ровно 16 масок 6/9. Для каждой шесть корней удовлетворяют трём независимым квадрикам. Порядок ниже задаётся не размером найденных чисел и не сложностью доказательства, а локальной сложностью предпочтительного базиса условий:",
              "Up to the dihedral symmetries of the square, there are exactly 16 patterns of type 6/9. For each one, six roots satisfy three independent quadrics. The order below is determined neither by the size of known examples nor by proof length, but by the local complexity of the preferred basis of conditions:",
            )}
          </p>
          <Latex display>{String.raw`
\mathrm{red}<\mathrm{yellow}<\mathrm{blue}.`}</Latex>
          <p>
            {text(
              "Внутри профиля RRY параллельный случай поставлен раньше пересекающегося: после параметризации двух красных коник он полностью решается одним равенством tf.",
              "Within the RRY profile, the parallel case precedes the intersecting one: after parametrizing the two red conics, it is completely solved by one equality of tf.",
            )}
          </p>
          <div className="theorem-block">
            <h3>{text("Разбиение шестнадцати типов", "Partition of the sixteen types")}</h3>
            <Latex display>{String.raw`
16=3_{\mathrm{RRR}}+2_{\mathrm{RRY,parallel}}
+6_{\mathrm{RRY,intersecting}}
+2_{\mathrm{RYY}}+2_{\mathrm{RYB}}+1_{\mathrm{YYB}}.`}</Latex>
          </div>
        </section>

        <section>
          <h2>{text("2. Расширенный атлас: от простых к сложным", "2. Expanded atlas: from simple to difficult")}</h2>
          <div className="synthesis-atlas">
            {SYNTHESIS_ATLAS.map((group) => (
              <div className="synthesis-atlas-group" key={group.index}>
                <header>
                  <span>{group.index}</span>
                  <div>
                    <h3>{text(group.title.ru, group.title.en)}</h3>
                    <p>{text(group.note.ru, group.note.en)}</p>
                  </div>
                </header>
                <div className="synthesis-atlas-cards">
                  {group.entries.map((entry) => (
                    <div className="synthesis-atlas-card" key={entry.mask}>
                      <div className="synthesis-atlas-card-header">
                        <TheoryLink to={entry.path}>{entry.mask} →</TheoryLink>
                        <ProfileBadge profile={entry.profile} />
                      </div>
                      <p>{text(entry.incidence.ru, entry.incidence.en)}</p>
                      <dl>
                        <div>
                          <dt>{text("Приведение", "Reduction")}</dt>
                          <dd>{text(entry.model.ru, entry.model.en)}</dd>
                        </div>
                        <div>
                          <dt>{text("Поверхность", "Surface")}</dt>
                          <dd>{entry.surface}</dd>
                        </div>
                        <div>
                          <dt>{text("Ранг MW", "MW rank")}</dt>
                          <dd>{entry.rank}</dd>
                        </div>
                        <div>
                          <dt>{text("Секции", "Sections")}</dt>
                          <dd>{text(entry.sections.ru, entry.sections.en)}</dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p>
            {text(
              "Для всех шестнадцати типов опубликованы бесконечные рациональные конструкции и точные положительные специализации ровно 6/9. В строке «секции» учитываются секции выбранного эллиптического расслоения; для двух Kummer-масок это поле оставлено без искусственного ранга, поскольку их сильнейший результат — полное tfmn-описание всей невырожденной рациональной поверхности.",
              "For all sixteen types, infinite rational constructions and exact positive specializations of type exactly 6/9 are published. The “sections” field refers to the chosen elliptic fibration; no artificial rank is assigned to the two Kummer patterns because their strongest result is the complete tfmn description of the entire nondegenerate rational surface.",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{Km}(E\times E),\qquad E:\ v^2=u^3-u.`}</Latex>
        </section>

        <section>
          <h2>{text("3. Три паспорта и лестница рангов", "3. Three passports and the rank ladder")}</h2>
          <p>
            {text(
              "Четырнадцать непараллельных масок распределяются между тремя полустабильными эллиптическими K3-паспортами:",
              "The fourteen nonparallel patterns fall into three semistable elliptic K3 passports:",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table synthesis-passport-table">
              <thead>
                <tr>
                  <th>{text("Паспорт", "Passport")}</th>
                  <th>{text("Масок", "Patterns")}</th>
                  <th>{text("Корневая решётка", "Root lattice")}</th>
                  <th>{text("Верхняя граница", "Upper bound")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12I₂</td>
                  <td>4</td>
                  <td>A₁¹²</td>
                  <td>r≤6</td>
                </tr>
                <tr>
                  <td>2I₄+8I₂</td>
                  <td>6</td>
                  <td>A₃²⊕A₁⁸</td>
                  <td>r≤4</td>
                </tr>
                <tr>
                  <td>4I₄+4I₂</td>
                  <td>4</td>
                  <td>A₃⁴⊕A₁⁴</td>
                  <td>r≤2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "Во всех трёх строках сумма чисел Эйлера равна 24. Формула Шиоды—Тейта и неравенство ρ(K3)≤20 дают одну и ту же лестницу:",
              "In all three rows, the Euler numbers sum to 24. The Shioda–Tate formula and the bound ρ(K3)≤20 give the same ladder:",
            )}
          </p>
          <Latex display>{String.raw`
\begin{aligned}
12I_2:\;&20-2-12=6,\\
2I_4+8I_2:\;&20-2-(2\cdot3+8)=4,\\
4I_4+4I_2:\;&20-2-(4\cdot3+4)=2.
\end{aligned}`}</Latex>
          <p>
            {text(
              "Чем больше компоненты особых слоёв занимают решётку Пикара, тем меньше места остаётся для свободной группы секций.",
              "The more of the Picard lattice is occupied by components of singular fibers, the less room remains for the free group of sections.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("4. Почему K3 возникает во всех ветвях", "4. Why K3 appears in every branch")}</h2>
          <p>
            {text(
              "Шесть выбранных квадратных клеток дают шесть корней и три однородные квадрики. Их естественный проективный объект — поверхность, а гладкое полное пересечение трёх квадрик в ℙ⁵ имеет тривиальный канонический класс. В вырожденных картах тот же объект появляется после минимального разрешения или через якобиан расслоения рода 1.",
              "Six selected square entries give six roots and three homogeneous quadrics. Their natural projective object is a surface, and a smooth complete intersection of three quadrics in ℙ⁵ has trivial canonical class. In degenerate charts, the same geometry appears after minimal resolution or through the Jacobian of a genus-one fibration.",
            )}
          </p>
          <p>
            {text(
              "Поэтому K3 здесь не неожиданная удача конкретной параметризации. Это естественный геометрический уровень условия 6/9. Различаются карты, особые слои и решётки секций, но не класс минимальной поверхности.",
              "Thus K3 is not an accidental success of a particular parametrization. It is the natural geometric level of the 6/9 condition. The charts, singular fibers, and section lattices vary, but the class of the minimal surface does not.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("5. Конгруэнтное семейство действительно не имеет общей неторсионной секции", "5. The congruent family really has no generic non-torsion section")}</h2>
          <p>
            {text(
              "Рассмотрим k как независимый параметр и кривую",
              "Regard k as an independent parameter and consider",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal C_k:\qquad y^2=x^3-k^2x.`}</Latex>
          <p>{text("Её инварианты равны", "Its invariants are")}</p>
          <Latex display>{String.raw`
\Delta=64k^6,\qquad c_4=48k^2.`}</Latex>
          <p>
            {text(
              "Минимальная эллиптическая поверхность над ℙ¹ₖ имеет два слоя I₀*: при k=0 и k=∞. Их корневая решётка D₄⊕D₄ имеет ранг 8, а сумма чисел Эйлера равна 12. Это рациональная эллиптическая поверхность, поэтому",
              "The minimal elliptic surface over ℙ¹ₖ has two I₀* fibers, at k=0 and k=∞. Their root lattice D₄⊕D₄ has rank 8 and their Euler numbers sum to 12. This is a rational elliptic surface, hence",
            )}
          </p>
          <Latex display>{String.raw`
\operatorname{rank}\mathcal C_k(\overline{\mathbb Q}(k))
=10-2-8=0.`}</Latex>
          <div className="theorem-block">
            <h3>{text("Все общие секции над ℚ(k)", "All generic sections over ℚ(k)")}</h3>
            <Latex display>{String.raw`
\mathcal C_k(\mathbb Q(k))
=\{\mathcal O,(0,0),(k,0),(-k,0)\}
\cong(\mathbb Z/2\mathbb Z)^2.`}</Latex>
            <p>
              {text(
                "Таким образом, тривиальные секции действительно есть — это нулевая секция и полное 2-кручение, — но общей неторсионной секции нет.",
                "Thus trivial sections do exist—the zero section and full 2-torsion—but there is no generic non-torsion section.",
              )}
            </p>
          </div>
        </section>

        <section>
          <h2>{text("6. Что именно делает F4+", "6. What F4+ actually does")}</h2>
          <p>
            {text(
              "F4+ не находит секции над исходной прямой k. Он заменяет поле ℚ(k) полем функций двумерной поверхности",
              "F4+ does not find sections over the original k-line. It replaces ℚ(k) by the function field of the two-dimensional surface",
            )}
          </p>
          <Latex display>{String.raw`
\mathcal S:\qquad
x^2-1=\rho^2y(x^2-y^2).`}</Latex>
          <p>
            {text(
              "На ней общий параметр площади A=x(x²−1) уже имеет два различных представления. Поэтому на той же конгруэнтной кривой C_A появляются две независимые точки:",
              "On this surface, the common area parameter A=x(x²−1) already has two different representations. Hence the same congruent-number curve C_A acquires two independent points:",
            )}
          </p>
          <div className="formula-scroll formula-scroll-wide">
            <Latex display>{String.raw`
\begin{aligned}
R_1&=\bigl(x^2(x^2-1),\,x^2(x^2-1)^2\bigr),\\
R_2&=\bigl(\rho^2x^2(x^2-y^2),\,
\rho^3x^2(x^2-y^2)^2\bigr).
\end{aligned}`}</Latex>
          </div>
          <Latex display>{String.raw`
\operatorname{rank}C_A(\mathbb Q(\mathcal S))\ge2.`}</Latex>
          <p>
            {text(
              "Отдельно сама нормализованная кубика F4+ в параметре τ=ρ² образует рациональную эллиптическую поверхность точного ранга 2. После возврата к полю ℚ(ρ) две секции сохраняются; один этот паспорт не исключает дополнительных антиинвариантных секций квадратичной замены. Эти утверждения связаны одной арифметикой, но относятся к двум различным эллиптическим объектам.",
              "Separately, the normalized F4+ cubic in the parameter τ=ρ² forms a rational elliptic surface of exact rank 2. After returning to ℚ(ρ), the two sections remain; this passport alone does not exclude additional anti-invariant sections of the quadratic base change. These statements are linked by the same arithmetic but concern two different elliptic objects.",
            )}
          </p>
          <p>
            {text(
              "Для ABEFGJ и ABDFHJ поверхность 𝒮 и есть точный универсальный объект 6/9. Поэтому здесь F4+ не аналогия, а буквальная общая теория этих двух масок.",
              "For ABEFGJ and ABDFHJ, the surface 𝒮 is precisely the universal 6/9 object. Here F4+ is not an analogy but the literal common theory of the two patterns.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("7. Есть ли F9+-аналоги у остальных поверхностей?", "7. Do the other surfaces have F9+ analogues?")}</h2>
          <p>
            {text(
              "Здесь необходимо различать слабый и сильный смысл.",
              "Two meanings must be distinguished.",
            )}
          </p>
          <div className="domain-table-wrap">
            <table className="domain-table">
              <thead>
                <tr>
                  <th>{text("Смысл", "Meaning")}</th>
                  <th>{text("Определение", "Definition")}</th>
                  <th>{text("Статус", "Status")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{text("Слабый", "Weak")}</td>
                  <td>
                    {text(
                      "Явная рациональная кривая или секция на K3, порождающая однопараметрическое семейство 6/9.",
                      "An explicit rational curve or section on the K3 surface generating a one-parameter 6/9 family.",
                    )}
                  </td>
                  <td>{text("Есть у всех 16 типов", "Available for all 16 types")}</td>
                </tr>
                <tr>
                  <td>{text("Сильный", "Strong")}</td>
                  <td>
                    {text(
                      "Специальная кривая C→ℙ¹ основания, после которой ранг расслоения строго возрастает.",
                      "A special base curve C→ℙ¹ after which the fibration rank strictly increases.",
                    )}
                  </td>
                  <td>
                    {text(
                      "Доказан для ветви F9+→F4+; для остальных 14 моделей не исследован",
                      "Proved for the F9+→F4+ branch; not assessed for the other 14 models",
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {text(
              "В исходной ветви F9+ кривая s²=x³−2x задаёт замену ρ=1/s и добавляет к двум секциям F4+ третью независимую секцию. Поэтому после этой замены общий ранг не меньше 3.",
              "In the original F9+ branch, the curve s²=x³−2x gives the substitution ρ=1/s and adds a third independent section to the two F4+ sections. Hence the generic rank after this base change is at least 3.",
            )}
          </p>
          <p>
            {text(
              "У четырнадцати остальных масок ситуация в одном отношении проще: их K3-якобианы уже имеют родные неторсионные секции над ℚ(t), без дополнительной замены основания. Но эти секции не являются сильными F9+-аналогами, потому что они не повышают ранг после base change — они уже входят в исходную группу Морделла—Вейля.",
              "For the other fourteen patterns, one aspect is simpler: their K3 Jacobians already have native non-torsion sections over ℚ(t), without an extra base change. But these sections are not strong F9+ analogues because they do not raise the rank after base change; they already belong to the original Mordell–Weil group.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("8. Программа поиска сильных аналогов", "8. A program for finding strong analogues")}</h2>
          <p>
            {text(
              "Для каждого расслоения E_t сильный аналог F9+ должен состоять из кривой C и отображения t=t(C), для которых появляется секция",
              "For each fibration E_t, a strong F9+ analogue should consist of a curve C and a map t=t(C) for which a section appears",
            )}
          </p>
          <Latex display>{String.raw`
\left[P_{\mathrm{new}}\right]\notin
E(\mathbb Q(t))\otimes_{\mathbb Z}\mathbb Q
\subset E(\mathbb Q(C))\otimes_{\mathbb Z}\mathbb Q.`}</Latex>
          <p>
            {text(
              "Наиболее естественный порядок поиска противоположен цветовому порядку атласа:",
              "The most natural search order is the reverse of the atlas color order:",
            )}
          </p>
          <ol>
            <li>
              {text(
                "Сначала поверхности 4I₄+4I₂ с 1≤r≤2: одна новая независимая секция сразу определит точный ранг 2.",
                "Start with the 4I₄+4I₂ surfaces with 1≤r≤2: one new independent section would immediately prove exact rank 2.",
              )}
            </li>
            <li>
              {text(
                "Затем 2I₄+8I₂: искать вторые и третьи секции через малые квадратичные замены основания.",
                "Then treat 2I₄+8I₂: search for second and third sections through low-degree quadratic base changes.",
              )}
            </li>
            <li>
              {text(
                "Наконец 12I₂: верхняя граница 6 оставляет больше возможных направлений и требует более широкой классификации multisection.",
                "Finally treat 12I₂: the upper bound 6 leaves more possible directions and requires a broader classification of multisections.",
              )}
            </li>
          </ol>
          <p>
            {text(
              "Кандидаты должны появляться из касательных парабол к квартикам, из низкостепенных квадратичных подстановок и из условий, что одна из трёх пока неквадратных клеток становится квадратом. Последний вариант одновременно связывает поиск секций с переходом 6/9→7/9.",
              "Candidates should arise from tangent parabolas to the quartics, low-degree quadratic substitutions, and conditions forcing one of the three remaining entries to become a square. The last option ties the search for sections directly to the transition 6/9→7/9.",
            )}
          </p>
        </section>

        <section>
          <h2>{text("9. Что это говорит о полной задаче 9/9", "9. What this says about the full 9/9 problem")}</h2>
          <p>
            {text(
              "На каждой поверхности 6/9 три пропущенные клетки являются рациональными функциями D₁,D₂,D₃. Полный квадрат требует одновременного подъёма",
              "On every 6/9 surface, the three omitted entries are rational functions D₁,D₂,D₃. A full square requires the simultaneous lift",
            )}
          </p>
          <Latex display>{String.raw`
u_1^2=D_1,\qquad u_2^2=D_2,\qquad u_3^2=D_3.`}</Latex>
          <p>
            {text(
              "Следовательно, препятствие 9/9 не находится ни в одной отдельной шестиклеточной конфигурации: каждая из них имеет бесконечно много рациональных и положительных точек. Оно должно возникать в совместимости трёх квадратных классов на одном из тройных квадратичных накрытий K3-поверхности.",
              "Thus the obstruction to 9/9 is not located in any individual six-entry configuration: every one has infinitely many rational and positive points. It must arise from compatibility of the three square classes on an iterated triple quadratic cover of a K3 surface.",
            )}
          </p>
          <p>
            {text(
              "Доказаны полнота шестнадцатитипной классификации, три паспорта, ранговая лестница, родные секции и tfmn-эквивалентность параллельной пары. Точные ранги большинства K3 и сильные F9+-аналоги для четырнадцати непараллельных типов пока не утверждаются.",
              "The completeness of the sixteen-type classification, the three passports, the rank ladder, native sections, and the tfmn equivalence of the parallel pair are proved. Exact ranks for most K3 surfaces and strong F9+ analogues for the fourteen nonparallel types are not yet asserted.",
            )}
          </p>

          <div className="topic-actions">
            <TheoryLink className="button button-primary" to="/orbits/6">
              {text("К карточному атласу 6/9", "Open the card atlas of 6/9")} <span>→</span>
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/f4-plus">
              {text("F4+: универсальная поверхность", "F4+: the universal surface")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/f9-plus">
              {text("F9+: замены, повышающие ранг", "F9+: rank-raising substitutions")}
            </TheoryLink>
            <TheoryLink className="button button-ghost" to="/theory/6-9/abcghj">
              {text("Предыдущая глава: ABCGHJ", "Previous chapter: ABCGHJ")}
            </TheoryLink>
          </div>
        </section>
      </div>
    </article>
  );
}

/* START_MODULE research_timeline */
/* START_CONTRACT
PURPOSE: Hold the author-reviewed bilingual chronology of the Magic Squares project.
MATHEMATICAL_SCOPE: Historical metadata only; no event is evidence for a mathematical claim.
PUBLIC_SURFACE: TimelineSource, TimelineEvent, TimelineMoment, researchTimeline.
KEYWORDS: timeline, chronology, attribution, source-records
COMPLEXITY: 3
END_CONTRACT */

import type { Locale } from "../i18n";

export type TimelineSide = "above" | "below";
export type TimelineVisualKind =
  | "atlas"
  | "code"
  | "coordinates"
  | "document"
  | "formula"
  | "language"
  | "mask"
  | "publication";

export interface TimelineVisual {
  kind: TimelineVisualKind;
  mark: string;
  detail?: string;
  familyId?: string;
}

export interface TimelineSource {
  label: string;
  href: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  summary: string;
  sources: readonly TimelineSource[];
  side: TimelineSide;
  visual: TimelineVisual;
}

export interface TimelineMoment {
  date: string;
  dateLabel: string;
  events: readonly TimelineEvent[];
}

interface BilingualTimelineSource extends TimelineSource {
  labelEn: string;
}

interface BilingualTimelineEvent
  extends Omit<TimelineEvent, "title" | "summary" | "sources"> {
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  sources: readonly BilingualTimelineSource[];
}

interface BilingualTimelineMoment {
  date: string;
  dateLabel: string;
  dateLabelEn: string;
  events: readonly BilingualTimelineEvent[];
}

const TIMELINE: readonly BilingualTimelineMoment[] = [
  {
    date: "2019-11-01",
    dateLabel: "ноябрь–декабрь 2019",
    dateLabelEn: "November–December 2019",
    events: [
      {
        id: "first-encounter",
        title: "Первое знакомство с задачей",
        titleEn: "First encounter with the problem",
        summary:
          "Алексей Халин знакомит Владимира Мынку с задачей о магическом квадрате 3×3 из полных квадратов. К самостоятельному исследованию это тогда ещё не приводит.",
        summaryEn:
          "Alexey Khalin introduces Vladimir Mynka to the problem of a 3×3 magic square of perfect squares. It does not yet lead to an independent investigation.",
        sources: [],
        side: "above",
        visual: { kind: "formula", mark: "3×3", detail: "first encounter" },
      },
    ],
  },
  {
    date: "2020-09-01",
    dateLabel: "сентябрь 2020",
    dateLabelEn: "September 2020",
    events: [
      {
        id: "research-begins",
        title: "Начало самостоятельного исследования",
        titleEn: "Independent research begins",
        summary:
          "Новая волна научно-популярных материалов возвращает Владимира к задаче, и в том же месяце начинается самостоятельная работа. Тогда он учится на первом курсе программной инженерии и третий год ведёт математическое сообщество примерно на 5 000 подписчиков. Работа начинается без предварительного знакомства со специальной литературой.",
        summaryEn:
          "A new wave of popular mathematics material brings Vladimir back to the problem, and independent work begins that month. He is then a first-year software engineering student and has run a mathematics community of about 5,000 subscribers for three years. The work starts without prior familiarity with the specialist literature.",
        sources: [],
        side: "below",
        visual: { kind: "publication", mark: "2020", detail: "research begins" },
      },
    ],
  },
  {
    date: "2020-09-15",
    dateLabel: "спустя две недели · осень 2020",
    dateLabelEn: "two weeks later · autumn 2020",
    events: [
      {
        id: "coauthor-joins",
        title: "Подключение соавтора",
        titleEn: "A co-author joins",
        summary:
          "К исследованию присоединяется соавтор, пожелавший сохранить анонимность. Уже в первом обсуждении формируется первый базис теории; в частности, устанавливается, что магическая константа квадрата 3×3 равна утроенному центральному элементу. Позже выясняется, что этот факт уже хорошо известен.",
        summaryEn:
          "A co-author who wishes to remain anonymous joins the investigation. The first discussion already produces an initial theoretical basis, including the fact that the magic constant of a 3×3 square is three times its central entry. The result is later found to be well known.",
        sources: [],
        side: "above",
        visual: { kind: "formula", mark: "S = 3E", detail: "central entry" },
      },
    ],
  },
  {
    date: "2020-10-01",
    dateLabel: "октябрь 2020 · предположительно",
    dateLabelEn: "October 2020 · approximate",
    events: [
      {
        id: "early-structure",
        title: "Симметрии и минимальный квадрат",
        titleEn: "Symmetries and the minimal square",
        summary:
          "Формируется система неравенств между элементами квадрата, выделяется эквивалентность по поворотам и отражениям, интуитивно обнаруживаются свойства векторного пространства и вводится понятие минимального целочисленного квадрата.",
        summaryEn:
          "A system of inequalities between the entries is formed, equivalence under rotations and reflections is separated out, vector-space properties are identified intuitively, and the notion of a minimal integral square is introduced.",
        sources: [],
        side: "below",
        visual: { kind: "coordinates", mark: "M₃(ℤ)", detail: "minimal" },
      },
    ],
  },
  {
    date: "2020-11-01",
    dateLabel: "ноябрь 2020",
    dateLabelEn: "November 2020",
    events: [
      {
        id: "residues-and-gaussian-integers",
        title: "Вычеты и гауссовы целые",
        titleEn: "Residues and Gaussian integers",
        summary:
          "Элементы квадрата рассматриваются через вычеты и квадратичные вычеты. Предложенная соавтором комбинаторика разложений в суммы квадратов в гауссовых целых позволяет восстановить почти все известные числовые ограничения для минимального квадрата 9/9: делимость на 2, 3 и 5 и ограничения на простые делители классов 4k+1 и 4k+3 в центральных, угловых и боковых клетках. Позже обнаруживается, что эти условия уже опубликованы на Multimagie.",
        summaryEn:
          "The entries are studied through residues and quadratic residues. A combinatorial treatment of sums of two squares in the Gaussian integers, proposed by the co-author, recovers nearly all known arithmetic restrictions for a minimal 9/9 square: divisibility by 2, 3, and 5, and restrictions on prime divisors of the forms 4k+1 and 4k+3 in central, corner, and side entries. These conditions are later found to have already been published on Multimagie.",
        sources: [],
        side: "above",
        visual: { kind: "formula", mark: "mod p", detail: "ℤ[i]" },
      },
    ],
  },
  {
    date: "2021-03-01",
    dateLabel: "1 марта 2021",
    dateLabelEn: "1 March 2021",
    events: [
      {
        id: "first-mathemynka-article",
        title: "Первая статья цикла",
        titleEn: "First article in the series",
        summary:
          "В сообществе mathemynka публикуется введение в исследование и модель размерностей. В изложении проекта впервые явно записывается модель m(E,x,y) и формулируется вывод о структуре векторного пространства или модуля магических квадратов.",
        summaryEn:
          "The mathemynka community publishes an introduction to the investigation and its dimensional model. The project writes the model m(E,x,y) explicitly for the first time, together with a first conclusion about the vector-space or module structure of magic squares.",
        sources: [
          {
            label: "mathemynka · часть I",
            labelEn: "mathemynka · part I",
            href: "https://m.vk.ru/@mathemynka-magicsquare1",
          },
        ],
        side: "above",
        visual: { kind: "coordinates", mark: "m(E,x,y)", detail: "module" },
      },
    ],
  },
  {
    date: "2021-03-02",
    dateLabel: "2 марта 2021",
    dateLabelEn: "2 March 2021",
    events: [
      {
        id: "second-mathemynka-article",
        title: "Вычеты, dir-база и первый крест 5/9",
        titleEn: "Residues, the dir basis, and the first 5/9 cross",
        summary:
          "Во второй статье цикла теория вычетов применяется к магическим квадратам, вводится база, из которой позднее вырастает dir-теория, и выводится первая параметризация крестовидного случая 5/9.",
        summaryEn:
          "The second article applies residue theory to magic squares, introduces the basis that later develops into dir theory, and derives the first parametrization of the cross-shaped 5/9 case.",
        sources: [
          {
            label: "mathemynka · часть II",
            labelEn: "mathemynka · part II",
            href: "https://m.vk.ru/@mathemynka-magicsquare2",
          },
        ],
        side: "below",
        visual: { kind: "mask", mark: "5/9", familyId: "bdefh" },
      },
    ],
  },
  {
    date: "2021-03-04",
    dateLabel: "4 марта 2021",
    dateLabelEn: "4 March 2021",
    events: [
      {
        id: "third-mathemynka-article",
        title: "Комбинаторные вычисления делимости",
        titleEn: "Combinatorial divisibility calculations",
        summary:
          "Третья статья впервые в рамках цикла формализует комбинаторные вычисления делимости для элементов магического квадрата. Ранняя версия содержит небольшие ошибки, позднее исправленные в развитии теории.",
        summaryEn:
          "The third article formalizes combinatorial divisibility calculations for entries of a magic square for the first time within the series. This early version contains minor errors that are corrected as the theory develops.",
        sources: [
          {
            label: "mathemynka · часть III",
            labelEn: "mathemynka · part III",
            href: "https://m.vk.ru/@mathemynka-magicsquare3",
          },
        ],
        side: "above",
        visual: { kind: "formula", mark: "p ∣ n", detail: "divisibility" },
      },
    ],
  },
  {
    date: "2021-03-07",
    dateLabel: "7 марта 2021",
    dateLabelEn: "7 March 2021",
    events: [
      {
        id: "fourth-mathemynka-article",
        title: "Квадратичные вычеты и «ход конём»",
        titleEn: "Quadratic residues and the “knight's move”",
        summary:
          "Последняя статья мартовского цикла описывает квадратичные вычеты и логику «хода конём». Через месяц это направление приводит к отдельной заметке о чарующих квадратах.",
        summaryEn:
          "The final article in the March series describes quadratic residues and the logic of the “knight's move”. A month later, this direction leads to a separate note on charming squares.",
        sources: [
          {
            label: "mathemynka · часть IV",
            labelEn: "mathemynka · part IV",
            href: "https://m.vk.ru/@mathemynka-magicsquare4",
          },
        ],
        side: "below",
        visual: { kind: "formula", mark: "♞", detail: "quadratic residues" },
      },
    ],
  },
  {
    date: "2021-04-01",
    dateLabel: "весна–лето 2021",
    dateLabelEn: "spring–summer 2021",
    events: [
      {
        id: "square-algebras",
        title: "Магические, чарующие и полумагические квадраты",
        titleEn: "Magic, charming, and semimagic squares",
        summary:
          "После первой статьи один из читателей замечает, что произведение двух магических квадратов не обязано быть магическим, тогда как тернарное произведение сохраняет свойство. К лету наблюдение развивается в теорию магических и чарующих квадратов и алгебру полумагических квадратов.",
        summaryEn:
          "After the first article, a reader observes that the product of two magic squares need not be magic, while a ternary product preserves the property. By summer, the observation develops into a theory of magic and charming squares and an algebra of semimagic squares.",
        sources: [],
        side: "above",
        visual: { kind: "formula", mark: "A·B·C", detail: "ternary product" },
      },
      {
        id: "first-calculator-and-algorithms",
        title: "Первый калькулятор и алгоритмы",
        titleEn: "First calculator and algorithms",
        summary:
          "Параллельно изучаются доступные материалы и сопоставляются с независимо полученными результатами. Владимир разрабатывает первую версию сайта-калькулятора, а соавтор — первые исследовательские алгоритмы.",
        summaryEn:
          "Available literature is studied in parallel and compared with the independently obtained results. Vladimir develops the first calculator website, while the co-author develops the first research algorithms.",
        sources: [],
        side: "below",
        visual: { kind: "publication", mark: "WEB", detail: "calculator" },
      },
    ],
  },
  {
    date: "2022-05-03",
    dateLabel: "3 мая 2022",
    dateLabelEn: "3 May 2022",
    events: [
      {
        id: "norm-theory-article",
        title: "Статья о теории норм",
        titleEn: "Article on norm theory",
        summary:
          "В новой статье систематически изложена теория норм и тождество Брахмагупты–Фибоначчи в применении к суммам двух квадратов. Эта теория уже была классической, но стала частью собственного изложения проекта.",
        summaryEn:
          "A new article gives a systematic account of norm theory and the Brahmagupta–Fibonacci identity as applied to sums of two squares. The theory was already classical, but now became part of the project's own exposition.",
        sources: [
          {
            label: "mathemynka · Брахмагупта 5.0",
            labelEn: "mathemynka · Brahmagupta 5.0",
            href: "https://m.vk.ru/@mathemynka-brahmagupta-5-0",
          },
        ],
        side: "above",
        visual: { kind: "formula", mark: "N(z)", detail: "norms" },
      },
    ],
  },
];

/* START_FUNCTION researchTimeline */
/* START_CONTRACT
PURPOSE: Return the author-reviewed chronology in the requested language.
CONTRACT: Preserve dates, source URLs, ordering, sides, and visuals; localize every public label and prose field.
FAILURE_MEANING: Missing localized copy would expose untranslated or unreviewed history.
KEYWORDS: localization, historical-record
COMPLEXITY: 2
END_CONTRACT */
export function researchTimeline(locale: Locale): readonly TimelineMoment[] {
  return TIMELINE.map((moment) => ({
    date: moment.date,
    dateLabel: locale === "ru" ? moment.dateLabel : moment.dateLabelEn,
    events: moment.events.map((event) => ({
      id: event.id,
      title: locale === "ru" ? event.title : event.titleEn,
      summary: locale === "ru" ? event.summary : event.summaryEn,
      sources: event.sources.map((source) => ({
        label: locale === "ru" ? source.label : source.labelEn,
        href: source.href,
      })),
      side: event.side,
      visual: event.visual,
    })),
  }));
}
/* END_FUNCTION researchTimeline */

/* END_MODULE research_timeline */

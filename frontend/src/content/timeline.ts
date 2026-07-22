/* START_MODULE research_timeline */
/* START_CONTRACT
PURPOSE: Record an auditable bilingual chronology of the Magic Squares project.
MATHEMATICAL_SCOPE: Historical metadata only; no event is evidence for a mathematical claim.
PUBLIC_SURFACE: TimelineEvent, TimelineMoment, researchTimeline.
KEYWORDS: timeline, chronology, attribution, repository-history
COMPLEXITY: 2
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

export interface TimelineEvent {
  id: string;
  title: string;
  summary: string;
  commit: string;
  side: TimelineSide;
  visual: TimelineVisual;
}

export interface TimelineMoment {
  date: string;
  events: readonly TimelineEvent[];
}

interface BilingualTimelineEvent extends Omit<TimelineEvent, "title" | "summary"> {
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
}

interface BilingualTimelineMoment {
  date: string;
  events: readonly BilingualTimelineEvent[];
}

const TIMELINE: readonly BilingualTimelineMoment[] = [
  {
    date: "2021-08-21",
    events: [
      {
        id: "repository-start",
        title: "Начало проекта",
        titleEn: "Project begins",
        summary:
          "Создан репозиторий MagicSquare для исследования и браузерной визуализации магических квадратов.",
        summaryEn:
          "The MagicSquare repository is created for research and browser-based visualization of magic squares.",
        commit: "ad0c09f",
        side: "above",
        visual: { kind: "coordinates", mark: "3×3", detail: "E · x · y" },
      },
    ],
  },
  {
    date: "2021-08-28",
    events: [
      {
        id: "six-of-nine-generation",
        title: "Генерация 6/9",
        titleEn: "6/9 generation",
        summary:
          "В ранний интерфейс добавлен вариант генерации квадратов с шестью гарантированно квадратными клетками.",
        summaryEn:
          "An early generator for squares with six guaranteed square-valued cells is added to the interface.",
        commit: "63cd5a6",
        side: "below",
        visual: { kind: "mask", mark: "6/9", familyId: "abehj" },
      },
    ],
  },
  {
    date: "2021-10-04",
    events: [
      {
        id: "polynomial-layer",
        title: "Полиномиальный слой",
        titleEn: "Polynomial layer",
        summary:
          "Зафиксированы полиномиальные инструменты, служебные функции и новые типы частичных квадратов.",
        summaryEn:
          "Polynomial tools, utility functions, and new classes of partial squares are recorded.",
        commit: "59edbc6",
        side: "above",
        visual: { kind: "formula", mark: "f(m,n)", detail: "ℤ[m,n]" },
      },
    ],
  },
  {
    date: "2021-10-15",
    events: [
      {
        id: "polynomial-collection",
        title: "Сбор параметризаций",
        titleEn: "Parametrization collection",
        summary:
          "Появился механизм систематического сбора найденных полиномиальных формул.",
        summaryEn:
          "A mechanism for systematically collecting discovered polynomial formulas is introduced.",
        commit: "dccaefd",
        side: "below",
        visual: { kind: "code", mark: "Σ poly", detail: "catalog" },
      },
    ],
  },
  {
    date: "2022-02-19",
    events: [
      {
        id: "bigint",
        title: "Переход на BigInt",
        titleEn: "Migration to BigInt",
        summary:
          "Целочисленные вычисления переведены на BigInt, чтобы не терять точность на больших параметрах.",
        summaryEn:
          "Integer computations move to BigInt so that large parameters can be handled without precision loss.",
        commit: "b6c17ee",
        side: "above",
        visual: { kind: "code", mark: "ℤ", detail: "BigInt" },
      },
    ],
  },
  {
    date: "2022-03-08",
    events: [
      {
        id: "generator-library",
        title: "Библиотека генераторов",
        titleEn: "Generator library",
        summary:
          "В проекте собран расширенный набор генераторов параметрических семейств.",
        summaryEn:
          "The project gains an expanded library of parametric-family generators.",
        commit: "dc1c384",
        side: "below",
        visual: { kind: "mask", mark: "5/9", familyId: "acegj" },
      },
    ],
  },
  {
    date: "2022-03-27",
    events: [
      {
        id: "theory-pdf",
        title: "Теоретический PDF и документация",
        titleEn: "Theory PDF and documentation",
        summary:
          "Обновлены теоретический текст и README; интерфейс связан с письменным изложением исследования.",
        summaryEn:
          "The theory document and README are updated, linking the interface to a written account of the research.",
        commit: "3297d63",
        side: "above",
        visual: { kind: "document", mark: "PDF", detail: "theory" },
      },
    ],
  },
  {
    date: "2022-04-21",
    events: [
      {
        id: "algebra-page",
        title: "Алгебраические операции",
        titleEn: "Algebraic operations",
        summary:
          "Добавлена отдельная страница для алгебраических операций и переходы между исследовательскими интерфейсами.",
        summaryEn:
          "A dedicated algebraic-operations page and navigation between research interfaces are added.",
        commit: "aeef84f",
        side: "below",
        visual: { kind: "formula", mark: "M₃", detail: "+ · ×" },
      },
    ],
  },
  {
    date: "2022-08-07",
    events: [
      {
        id: "rational-parametrization",
        title: "Рациональная параметризация",
        titleEn: "Rational parametrization",
        summary:
          "В код добавлена общая функция рациональной параметризации.",
        summaryEn:
          "A general rational-parametrization function is added to the codebase.",
        commit: "2d4ca42",
        side: "above",
        visual: { kind: "formula", mark: "ℚ(t)", detail: "conic" },
      },
      {
        id: "color-revision",
        title: "Пересмотр цветовой системы",
        titleEn: "Color-system revision",
        summary:
          "Теоретический PDF переработан: прежняя цветовая разметка удалена для последующего переосмысления.",
        summaryEn:
          "The theory PDF is revised: the previous color notation is removed before a later redesign.",
        commit: "3be0145",
        side: "below",
        visual: { kind: "document", mark: "R · Y · B", detail: "revision" },
      },
    ],
  },
  {
    date: "2022-08-28",
    events: [
      {
        id: "new-generator-page",
        title: "Новая страница генератора",
        titleEn: "New generator page",
        summary:
          "Собрана новая версия основного интерфейса генерации и исправлена рациональная параметризация.",
        summaryEn:
          "A new primary generator interface is assembled and the rational parametrization is corrected.",
        commit: "3906195",
        side: "above",
        visual: { kind: "publication", mark: "UI", detail: "generator" },
      },
      {
        id: "color-notes",
        title: "Возвращение цветовых заметок",
        titleEn: "Color notes return",
        summary:
          "В репозитории отдельно зафиксированы существенные замечания к смыслу раскрасок.",
        summaryEn:
          "Substantive notes on the meaning of the color system are recorded separately in the repository.",
        commit: "0d1f3d2",
        side: "below",
        visual: { kind: "document", mark: "R > Y > B", detail: "notes" },
      },
    ],
  },
  {
    date: "2022-09-03",
    events: [
      {
        id: "solution-viewer",
        title: "Просмотр найденных решений",
        titleEn: "Solution viewer",
        summary:
          "Добавлен отдельный интерфейс для просмотра собранных решений.",
        summaryEn:
          "A separate interface for inspecting collected solutions is added.",
        commit: "4b7435d",
        side: "above",
        visual: { kind: "publication", mark: "□ □ □", detail: "solutions" },
      },
    ],
  },
  {
    date: "2026-05-08",
    events: [
      {
        id: "colored-five-generators",
        title: "Цветовые генераторы 5/9",
        titleEn: "Colored 5/9 generators",
        summary:
          "После перерыва исследование продолжено: в код перенесены цветовые генераторы пяти квадратных клеток.",
        summaryEn:
          "After a hiatus, work resumes with colored five-square generators moved into the codebase.",
        commit: "dd87e42",
        side: "above",
        visual: { kind: "mask", mark: "5/9", familyId: "abcdh" },
      },
      {
        id: "red-red-red-six",
        title: "Семейство red–red–red 6/9",
        titleEn: "The red–red–red 6/9 family",
        summary:
          "Реализован отдельный генератор семейства с тремя красными арифметическими прогрессиями.",
        summaryEn:
          "A generator is implemented for a family containing three red arithmetic progressions.",
        commit: "72eab03",
        side: "below",
        visual: { kind: "formula", mark: "R · R · R", detail: "6/9" },
      },
    ],
  },
  {
    date: "2026-07-20",
    events: [
      {
        id: "abcdg-generator",
        title: "Семейство ABCDG",
        titleEn: "The ABCDG family",
        summary:
          "К интерфейсу подключён генератор жёлто-коричневого семейства ABCDG уровня 5/9.",
        summaryEn:
          "The yellow–brown ABCDG 5/9 generator is connected to the interface.",
        commit: "f2d5933",
        side: "above",
        visual: { kind: "mask", mark: "ABCDG", familyId: "abcdg" },
      },
    ],
  },
  {
    date: "2026-07-21",
    events: [
      {
        id: "react-atlas",
        title: "React-атлас доказательств",
        titleEn: "React proof atlas",
        summary:
          "Создан новый SPA-интерфейс, объединяющий лабораторию, семейства и доказательные материалы.",
        summaryEn:
          "A new SPA is created to unite the laboratory, families, and proof material.",
        commit: "6402cdd",
        side: "above",
        visual: { kind: "publication", mark: "SPA", detail: "proof atlas" },
      },
      {
        id: "coordinate-workbench",
        title: "Координатная лаборатория",
        titleEn: "Coordinate laboratory",
        summary:
          "Калькулятор снова строится вокруг однозначных координат E, x, y и преобразований самого квадрата.",
        summaryEn:
          "The calculator is centered again on the unique coordinates E, x, and y and transformations of the square itself.",
        commit: "f17ee31",
        side: "above",
        visual: { kind: "coordinates", mark: "E, x, y", detail: "workbench" },
      },
      {
        id: "inline-proofs",
        title: "Доказательства под квадратом",
        titleEn: "Proofs below the square",
        summary:
          "Семейные LaTeX-доказательства перенесены непосредственно на страницы лаборатории и орбит.",
        summaryEn:
          "Family LaTeX proofs are embedded directly in the laboratory and orbit pages.",
        commit: "1ed6761",
        side: "above",
        visual: { kind: "document", mark: "LaTeX", detail: "inline" },
      },
      {
        id: "factorization-state",
        title: "Сохраняемая факторизация",
        titleEn: "Persistent factorization",
        summary:
          "Режим факторизации становится состоянием лаборатории и сохраняется при минимизации и других преобразованиях.",
        summaryEn:
          "Factorization becomes persistent laboratory state and survives minimization and other transformations.",
        commit: "50ae373",
        side: "below",
        visual: { kind: "formula", mark: "n = ∏pᵏ", detail: "state" },
      },
      {
        id: "twenty-three-orbits",
        title: "23 орбиты 4/9 и 23 орбиты 5/9",
        titleEn: "23 orbits for 4/9 and 23 for 5/9",
        summary:
          "Атлас исправлен до 23 классов на каждом уровне; добавлены ACDH и дополнительная BEFGJ.",
        summaryEn:
          "The atlas is corrected to 23 classes at each level, adding ACDH and its complement BEFGJ.",
        commit: "58674a5",
        side: "below",
        visual: { kind: "atlas", mark: "23 + 23", detail: "D₄ orbits" },
      },
      {
        id: "bilingual-edition",
        title: "Русская и английская редакции",
        titleEn: "Russian and English editions",
        summary:
          "Интерфейс, атлас и доказательные тексты получили полные русскую и английскую версии.",
        summaryEn:
          "The interface, atlas, and proof text receive complete Russian and English editions.",
        commit: "05f2396",
        side: "below",
        visual: { kind: "language", mark: "RU / EN", detail: "parallel edition" },
      },
    ],
  },
  {
    date: "2026-07-22",
    events: [
      {
        id: "static-publication",
        title: "Статическая публикация",
        titleEn: "Static publication",
        summary:
          "Для всех публичных маршрутов генерируется готовый HTML с двуязычными метаданными и картой сайта.",
        summaryEn:
          "Every public route receives prerendered HTML with bilingual metadata and a sitemap.",
        commit: "ca95165",
        side: "above",
        visual: { kind: "publication", mark: "HTML", detail: "118 routes" },
      },
      {
        id: "project-statement",
        title: "Постановка задачи и вклад",
        titleEn: "Problem statement and contribution",
        summary:
          "Раздел «О проекте» переписан как постановка задачи, связь с конгруумами, новизна, вклад и границы результата.",
        summaryEn:
          "The About section is rewritten around the problem statement, congrua, novelty, contribution, and limitations.",
        commit: "5579195",
        side: "below",
        visual: { kind: "document", mark: "9/9", detail: "problem" },
      },
    ],
  },
];

/* START_FUNCTION researchTimeline */
/* START_CONTRACT
PURPOSE: Return the repository-backed chronology in the requested language.
CONTRACT: Preserve dates, commit references, ordering, sides, and visuals; localize prose only.
FAILURE_MEANING: Missing localized copy would expose untranslated or invented history.
KEYWORDS: localization, immutable-history
COMPLEXITY: 2
END_CONTRACT */
export function researchTimeline(locale: Locale): readonly TimelineMoment[] {
  return TIMELINE.map((moment) => ({
    date: moment.date,
    events: moment.events.map((event) => ({
      id: event.id,
      title: locale === "ru" ? event.title : event.titleEn,
      summary: locale === "ru" ? event.summary : event.summaryEn,
      commit: event.commit,
      side: event.side,
      visual: event.visual,
    })),
  }));
}
/* END_FUNCTION researchTimeline */

/* END_MODULE research_timeline */

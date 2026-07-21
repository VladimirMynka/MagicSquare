import type { Locale } from "../i18n";

export interface NewsArticle {
  slug: string;
  date: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  tags: readonly string[];
  body: readonly string[];
  bodyEn: readonly string[];
}

export const NEWS: readonly NewsArticle[] = [
  {
    slug: "bilingual-proof-atlas",
    date: "2026-07-21",
    title: "Proof Atlas стал полностью двуязычным",
    titleEn: "Proof Atlas is now fully bilingual",
    summary:
      "Русская и английская версии получили самостоятельные адреса, общий переключатель и полный перевод математического каталога.",
    summaryEn:
      "The Russian and English editions now have dedicated URLs, a route-preserving switcher, and complete translations of the mathematical catalog.",
    tags: ["i18n", "frontend", "release"],
    body: [
      "Каждая страница доступна с префиксом /ru или /en. Переключение языка сохраняет текущий маршрут, параметры семейства, поисковую строку и якорь доказательства, поэтому ссылкой можно поделиться сразу на нужном языке.",
      "Переведены не только навигация и кнопки, но и все 46 описаний орбит, общая теория, семейные доказательства, условия применимости, статусы полноты, цветовые леммы и новости. Формулы LaTeX остаются общими для двух редакций.",
      "Язык выбирается по сохранённому предпочтению и настройкам браузера. Документ получает корректный атрибут lang, а страницы публикуют canonical, hreflang для ru и en и x-default.",
    ],
    bodyEn: [
      "Every page is available under a /ru or /en prefix. Switching language preserves the current route, family parameters, query string, and proof anchor, so a link can be shared directly in the intended language.",
      "The translation covers more than navigation and controls: all 46 orbit descriptions, the general theory, family proofs, applicability conditions, coverage statuses, color lemmas, and news are available in English. The LaTeX formulas are shared by both editions.",
      "The initial language follows the saved preference and browser settings. The document receives the correct lang attribute, while each page publishes canonical and hreflang links for ru, en, and x-default.",
    ],
  },
  {
    slug: "complete-five-of-nine-atlas",
    date: "2026-07-21",
    title: "Атлас исправлен до 23 орбит 4/9 и 23 орбит 5/9",
    titleEn: "The atlas now contains all 23 orbits for both 4/9 and 5/9",
    summary:
      "В классификацию возвращена пропущенная орбита ACDH и её дополнение BEFGJ; общая теория и семейные доказательства отображаются прямо в лаборатории.",
    summaryEn:
      "The missing ACDH orbit and its complement BEFGJ have been restored; the general theory and family proofs now appear directly in the laboratory.",
    tags: ["4/9", "5/9", "latex"],
    body: [
      "Перебор четырёхэлементных подмножеств девяти клеток с точным фактором по симметриям D₄ даёт 23 орбиты, а не 22. В старом PDF отсутствовала маска ACDH; дополнение переводит её в ранее отсутствовавшую красно-жёлтую маску BEFGJ уровня 5/9. Теперь в лаборатории находятся все 23 орбиты каждого уровня.",
      "Цвет миниатюры больше не зависит от позиции клетки в списке. Он отмечает участие клетки в конкретном линейном тождестве: арифметической прогрессии, равенстве двух сумм, норме с коэффициентом 2 или взвешенной конике. Пересечение двух опор делит клетку на два цвета.",
      "Общая LaTeX-часть доказывает полноту списка орбит, выводит необходимые и достаточные квадратичные связи из исходной системы в E, x, y и вводит цветовые леммы. Для каждого семейства прямо под лабораторией показываются условия, явные корни, подстановка лемм, восстановление E, x, y и честный статус полноты параметризации. Все стартовые пресеты невырождены и имеют ровно заявленные четыре или пять квадратных клеток.",
    ],
    bodyEn: [
      "An exact enumeration of four-element subsets of the nine cells modulo D₄ gives 23 orbits, not 22. The old PDF omitted ACDH; taking complements produces the previously missing red–yellow 5/9 mask BEFGJ. The laboratory now contains all 23 orbits at each level.",
      "A miniature's color no longer depends on a cell's position in a list. It marks participation in a specific linear identity: an arithmetic progression, an equality of two sums, a norm with coefficient 2, or a weighted conic. A cell shared by two supports is split between their colors.",
      "The general LaTeX chapter proves completeness of the orbit list, derives the necessary and sufficient quadratic relations from the original system in E, x, and y, and introduces the color lemmas. Directly below the laboratory, each family shows its assumptions, explicit roots, lemma substitutions, reconstruction of E, x, and y, and an honest parametrization-coverage status. Every default preset is nondegenerate and has exactly the declared four or five square-valued cells.",
    ],
  },
  {
    slug: "academic-workbench-interface",
    date: "2026-07-21",
    title: "Квадрат снова стал центром математической мастерской",
    titleEn: "The square is once again the center of the mathematical workbench",
    summary:
      "Интерфейс получил прямое управление E, x, y и спокойную бумажно-пастельную систему без неоновых акцентов.",
    summaryEn:
      "The interface now offers direct control of E, x, and y in a calm paper-and-pastel visual system without neon accents.",
    tags: ["frontend", "workbench", "alpha"],
    body: [
      "Лаборатория снова построена вокруг одного текущего квадрата. Тройка E, x, y постоянно видна рядом с матрицей, доступна для прямого редактирования и остаётся общей для свободного режима и параметрических семейств.",
      "Палитра опирается на тёплую бумагу, графит, спокойные серые линии и приглушённые цвета математических классов. Кирпично-красная рамка зарезервирована за клетками, значения которых являются полными квадратами.",
      "Семейства работают как сертифицированные способы вычислить координаты. После прямого преобразования интерфейс честно переходит в свободный режим и больше не приписывает квадрату маску исходного семейства.",
    ],
    bodyEn: [
      "The laboratory is again organized around one current square. The triple E, x, y is always visible beside the matrix, can be edited directly, and is shared by free mode and every parametric family.",
      "The palette uses warm paper, graphite, quiet gray rules, and muted colors for mathematical classes. A brick-red frame is reserved for cells whose current values are perfect squares.",
      "Families act as certified ways to compute the coordinates. After a direct transformation, the interface honestly switches to free mode and no longer attributes the source family's mask to the transformed square.",
    ],
  },
  {
    slug: "colored-five-proof-core",
    date: "2026-07-21",
    title: "Семь цветных семейств 5/9 перенесены в proof-core",
    titleEn: "Seven colored 5/9 families moved into proof-core",
    summary:
      "Красно-голубые, жёлто-голубые и голубо-голубое семейства получили точные полиномиальные сертификаты.",
    summaryEn:
      "The red–blue, yellow–blue, and blue–blue families now have exact polynomial certificates.",
    tags: ["proof-core", "5/9", "release"],
    body: [
      "В доказательное ядро добавлены три красно-голубых, три жёлто-голубых и одно голубо-голубое семейство. Все заявленные квадратные маски проверяются тождествами над кольцом рациональных многочленов.",
      "Формальные деления в жёлто-голубых формулах и частное совместимости в голубо-голубой формуле сокращены символически. Поэтому браузерные генераторы теперь используют замкнутые полиномиальные выражения и корректно работают даже на вырожденных параметрах.",
    ],
    bodyEn: [
      "Proof-core now contains three red–blue, three yellow–blue, and one blue–blue family. Every declared square mask is verified as a polynomial identity over the rational polynomial ring.",
      "Formal divisions in the yellow–blue formulas and the compatibility quotient in the blue–blue formula were cancelled symbolically. The browser generators therefore use closed polynomial expressions and remain valid even for degenerate parameter values.",
    ],
  },
  {
    slug: "proof-atlas-preview",
    date: "2026-07-21",
    title: "Началась миграция интерфейса в React Proof Atlas",
    titleEn: "Migration to the React Proof Atlas has begun",
    summary:
      "Новая SPA отделяет доказанные семейства, исследовательский контекст и публикации от legacy-инструментов.",
    summaryEn:
      "The new SPA separates proved families, research context, and publications from the legacy tools.",
    tags: ["frontend", "react", "preview"],
    body: [
      "Первая версия нового интерфейса сосредоточена на восьми сертифицированных семействах 5/9. В ней параметры, фактическая квадратная маска и статус сертификата показаны рядом с самим квадратом.",
      "Новости пока входят в статическую сборку. Это сохраняет простой деплой через nginx и не требует отдельной базы данных, а при появлении редакторских ролей формат можно заменить API без перестройки пользовательского интерфейса.",
    ],
    bodyEn: [
      "The first version of the new interface focused on eight certified 5/9 families. Their parameters, actual square-valued mask, and certificate status were displayed beside the square itself.",
      "News remains part of the static build. This keeps nginx deployment simple and avoids a database; if editorial roles become necessary, the format can later be replaced by an API without rebuilding the user interface.",
    ],
  },
];

export function localizeNewsArticle(
  article: NewsArticle,
  locale: Locale,
): NewsArticle {
  if (locale === "ru") return article;
  return {
    ...article,
    title: article.titleEn,
    summary: article.summaryEn,
    body: article.bodyEn,
  };
}

export function news(locale: Locale): readonly NewsArticle[] {
  return NEWS.map((article) => localizeNewsArticle(article, locale));
}

export function newsBySlug(
  slug: string | undefined,
  locale: Locale = "ru",
): NewsArticle | undefined {
  const article = NEWS.find((candidate) => candidate.slug === slug);
  return article ? localizeNewsArticle(article, locale) : undefined;
}

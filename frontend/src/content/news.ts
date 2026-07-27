/* START_MODULE project_news */
/* START_CONTRACT
PURPOSE: Store the bilingual public record of research milestones and project publications.
MATHEMATICAL_SCOPE: News prose reports theorem status but does not replace the referenced proofs.
PUBLIC_SURFACE: NewsArticle, NEWS, localizeNewsArticle, news, newsBySlug.
KEYWORDS: news, publications, bilingual, research-history
COMPLEXITY: 2
END_CONTRACT */

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
    slug: "abcdg-global-completeness",
    date: "2026-07-27",
    title: "Доказана глобальная алгоритмическая полнота ABCDG",
    titleEn: "Global algorithmic completeness is proved for ABCDG",
    summary:
      "Коническое расслоение даёт эффективный алгоритм, перечисляющий все рациональные решения двух квадрик ABCDG.",
    summaryEn:
      "A conic bundle gives an effective algorithm enumerating every rational solution of the two ABCDG quadrics.",
    tags: ["5/9", "ABCDG", "CONIC BUNDLE"],
    body: [
      "Для маски ABCDG доказана глобальная полнота в эффективном алгоритмическом смысле. Результат относится ко всем рациональным знаковым векторам корней, а не только к образу ранее выписанной полиномиальной формулы.",
      "Жёлтая квадрика превращает матрицу из комбинаций корней в матрицу ранга один. Её направление задаёт базу [r:s], а коричневая квадрика становится гладкой коникой a²=(2s²−r²)P²+(2r²−s²)Q².",
      "Для каждой рациональной базы разрешимость коники решается точно. Если коника имеет рациональную точку, проекция из неё параметризует весь слой; совместный перебор высот базы и параметра слоя достигает каждой рациональной точки за конечное число шагов.",
      "Алгоритм имеет явный обратный ход. Тем самым доказаны корректность, сюръективность и конечная достижимость, без утверждения о существовании одной глобальной рациональной формулы или конечного рационального атласа.",
    ],
    bodyEn: [
      "Global completeness in the effective algorithmic sense is proved for the ABCDG pattern. The result concerns every rational signed root vector, not only the image of the previously displayed polynomial formula.",
      "The yellow quadric turns a matrix of root combinations into a rank-one matrix. Its direction supplies the base [r:s], while the brown quadric becomes the smooth conic a²=(2s²−r²)P²+(2r²−s²)Q².",
      "Conic solubility is decided exactly for every rational base. When a fiber has a rational point, projection from that point parametrizes the entire fiber; dovetailing the base and fiber-parameter heights reaches every rational point after finitely many steps.",
      "The algorithm has an explicit inverse. This proves soundness, surjectivity, and finite reachability without asserting one global rational formula or a finite rational atlas.",
    ],
  },
  {
    slug: "public-site-launched",
    date: "2026-07-22",
    title: "Открыт сайт проекта Magic Squares",
    titleEn: "The Magic Squares project website is now public",
    summary:
      "22 июля 2026 года открыт публичный сайт исследования магических квадратов 3×3 из полных квадратов.",
    summaryEn:
      "The public website for the study of 3×3 magic squares of perfect squares opened on 22 July 2026.",
    tags: ["WEB", "MAGIC SQUARES"],
    body: [
      "22 июля 2026 года открыт публичный сайт проекта Magic Squares.",
      "На сайте объединены постановка задачи, инструменты для работы с квадратами, классификация случаев 4/9 и 5/9 и тексты доказательств.",
      "Русская и английская редакции материалов публикуются параллельно.",
    ],
    bodyEn: [
      "The public Magic Squares project website opened on 22 July 2026.",
      "The site brings together the problem statement, tools for working with squares, the classification of the 4/9 and 5/9 cases, and the proof texts.",
      "Russian and English editions of the material are published in parallel.",
    ],
  },
  {
    slug: "all-five-of-nine-cases-solved",
    date: "2026-07-21",
    title: "Решены все 23 случая 5/9",
    titleEn: "All 23 cases at the 5/9 level are solved",
    summary:
      "Завершено построение параметрических решений для всех 23 орбит пяти гарантированно квадратных клеток.",
    summaryEn:
      "Parametric solutions have been constructed for all 23 orbits of five guaranteed perfect-square entries.",
    tags: ["5/9", "D₄"],
    body: [
      "21 июля 2026 года завершено построение параметрических решений для всех 23 орбит D₄ на уровне 5/9.",
      "Для каждой орбиты зафиксированы выбранные квадратные клетки, система квадрик, параметризация координат E, x, y и точный статус покрытия.",
      "На 21 июля полнота параметризации была доказана для 15 орбит. Для остальных восьми было указано максимально широкое подмножество с доказанным покрытием и описано исключительное множество.",
      "Результат завершает поорбитальное построение для задачи 5/9, но не решает открытую задачу существования квадрата 9/9.",
    ],
    bodyEn: [
      "On 21 July 2026, parametric solutions were completed for all 23 D₄ orbits at the 5/9 level.",
      "For each orbit, the selected square-valued entries, the system of quadrics, the parametrization of E, x, and y, and the precise coverage status are recorded.",
      "As of 21 July, completeness of the parametrization had been proved for 15 orbits. For each of the remaining eight, the widest subset with proved coverage and its exceptional locus were recorded.",
      "This completes the orbit-by-orbit construction for the 5/9 problem, but it does not solve the open existence problem at the 9/9 level.",
    ],
  },
];

/* START_FUNCTION localizeNewsArticle */
/* START_CONTRACT
PURPOSE: Select the public prose for one news article in the requested locale.
CONTRACT: Preserve slug, date, tags, and ordering while replacing every localized text field.
FAILURE_MEANING: An English route could expose untranslated or mismatched article content.
KEYWORDS: localization, news
COMPLEXITY: 1
END_CONTRACT */
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
/* END_FUNCTION localizeNewsArticle */

/* START_FUNCTION news */
/* START_CONTRACT
PURPOSE: Return all public news articles in reverse chronological order and in one locale.
CONTRACT: Preserve the order declared by NEWS and localize every article.
FAILURE_MEANING: The news index could display the wrong language or chronology.
KEYWORDS: news-index, localization
COMPLEXITY: 1
END_CONTRACT */
export function news(locale: Locale): readonly NewsArticle[] {
  return NEWS.map((article) => localizeNewsArticle(article, locale));
}
/* END_FUNCTION news */

/* START_FUNCTION newsBySlug */
/* START_CONTRACT
PURPOSE: Resolve one public news article by its stable slug.
CONTRACT: Return undefined for an unknown slug and localized content for a known slug.
FAILURE_MEANING: An invalid route could render unrelated publication content.
KEYWORDS: news-route, slug, localization
COMPLEXITY: 1
END_CONTRACT */
export function newsBySlug(
  slug: string | undefined,
  locale: Locale = "ru",
): NewsArticle | undefined {
  const article = NEWS.find((candidate) => candidate.slug === slug);
  return article ? localizeNewsArticle(article, locale) : undefined;
}
/* END_FUNCTION newsBySlug */

/* END_MODULE project_news */

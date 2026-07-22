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

// The section is intentionally empty until the project has an actual publication.
export const NEWS: readonly NewsArticle[] = [];

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

/* START_MODULE search_metadata */
/* START_CONTRACT
PURPOSE: Define bilingual search metadata, structured attribution, and the static route manifest.
MATHEMATICAL_SCOPE: Descriptive metadata only; it must not strengthen the status of mathematical claims.
PUBLIC_SURFACE: SITE_ORIGIN, SITE_NAME, socialImagesForLocale, seoForPath, indexableRouteSuffixes, alternatePath, orbitPath.
KEYWORDS: seo, prerender, schema-org, copyright, timeline
COMPLEXITY: 3
END_CONTRACT */

import { NEWS } from "./content/news";
import { COMMON_PROOFS } from "./content/proofs";
import {
  FAMILIES,
  familyOrbitDescription,
  familySummary,
  findFamilyById,
} from "./lib/families";

export const SITE_ORIGIN = "https://magic-squares.mynka.tech";
export const SITE_NAME = "Magic Squares";
const SITE_AUTHOR = "Vladimir Mynka";

export type SeoLocale = "ru" | "en";

export interface SocialImages {
  alt: string;
  openGraph: string;
  twitter: string;
}

/* START_FUNCTION socialImagesForLocale */
/* START_CONTRACT
PURPOSE: Return absolute localized social-preview image URLs and accessible alternative text.
CONTRACT: Keep Open Graph and Twitter assets aligned with the active route locale and canonical origin.
FAILURE_MEANING: Shared links may show a broken, untranslated, or inaccessible preview image.
KEYWORDS: open-graph, twitter-card, social-preview, localization
COMPLEXITY: 1
END_CONTRACT */
export function socialImagesForLocale(locale: SeoLocale): SocialImages {
  return {
    alt:
      locale === "ru"
        ? "Magic Squares — исследование магических квадратов 3×3"
        : "Magic Squares — research on 3×3 magic squares",
    openGraph: `${SITE_ORIGIN}/social/og-${locale}.png`,
    twitter: `${SITE_ORIGIN}/social/twitter-${locale}.png`,
  };
}
/* END_FUNCTION socialImagesForLocale */

export interface SeoMetadata {
  canonicalPath: string;
  description: string;
  index: boolean;
  locale: SeoLocale;
  schema: Readonly<Record<string, unknown>>;
  title: string;
}

interface LocalizedMetadata {
  description: string;
  title: string;
  type?: "Article" | "WebApplication" | "WebPage" | "WebSite";
}

const STATIC_METADATA: Readonly<
  Record<string, Readonly<Record<SeoLocale, LocalizedMetadata>>>
> = {
  "": {
    en: {
      title: "3×3 Magic Square of Squares — Proof Atlas",
      description:
        "Explore the 3×3 magic square of squares problem through an interactive calculator, 46 symmetry orbits, exact parametrizations, and complete proofs.",
      type: "WebSite",
    },
    ru: {
      title: "Магический квадрат из квадратов 3×3 — атлас доказательств",
      description:
        "Интерактивное исследование магического квадрата из квадратов 3×3: калькулятор, 46 орбит симметрии, точные параметризации и полные доказательства.",
      type: "WebSite",
    },
  },
  "squares-of-squares": {
    en: {
      title: "The 3×3 Magic Square of Squares Problem",
      description:
        "What is a 3×3 magic square of perfect squares, why is the nine-square problem open, and how four- and five-square masks organize partial constructions?",
      type: "Article",
    },
    ru: {
      title: "Задача о магическом квадрате из квадратов 3×3",
      description:
        "Что такое магический квадрат из полных квадратов, почему задача 9/9 остаётся открытой и как маски 4/9 и 5/9 организуют частичные конструкции.",
      type: "Article",
    },
  },
  "theory/magic-squares-3x3": {
    en: {
      title: "3×3 Magic Squares — General Form and Classification Proof",
      description:
        "A complete proof that every 3×3 magic square over an abelian group has magic sum 3E and a unique form m(E,x,y), with exact consequences over rings, fields, R, Q, and Z.",
      type: "Article",
    },
    ru: {
      title: "Магические квадраты 3×3 — общая форма и доказательство классификации",
      description:
        "Полное доказательство равенства M=3E и единственной формы m(E,x,y) над абелевой группой, с точными следствиями для колец, полей, R, Q и Z.",
      type: "Article",
    },
  },
  lab: {
    en: {
      title: "3×3 Magic Square Calculator — E, x, y Form",
      description:
        "Build and transform any 3×3 magic square from its unique coordinates E, x, and y, or load a proved four- or five-square parametric family.",
      type: "WebApplication",
    },
    ru: {
      title: "Калькулятор магического квадрата 3×3 — форма E, x, y",
      description:
        "Стройте и преобразуйте магический квадрат 3×3 по его однозначным координатам E, x, y или выбирайте доказанное параметрическое семейство 4/9 и 5/9.",
      type: "WebApplication",
    },
  },
  "proofs/general": {
    en: {
      title: "3×3 Magic Squares with 4 or 5 Square Entries",
      description:
        "A complete D4-orbit classification of four and five perfect-square entries, with elimination of E, x, y and necessary-and-sufficient quadratic systems.",
      type: "Article",
    },
    ru: {
      title: "Магические квадраты 3×3 с 4 или 5 квадратными клетками",
      description:
        "Полная классификация D₄-орбит четырёх и пяти квадратных клеток, исключение E, x, y и необходимые и достаточные системы квадрик.",
      type: "Article",
    },
  },
  "orbits/4": {
    en: {
      title: "Four Square Entries in a 3×3 Magic Square — 23 Orbits",
      description:
        "The 23 D4 symmetry orbits of four guaranteed perfect-square entries in a 3×3 magic square, with their defining quadratic relations.",
      type: "Article",
    },
    ru: {
      title: "Четыре квадратные клетки в магическом квадрате 3×3 — 23 орбиты",
      description:
        "Все 23 орбиты D₄ для четырёх гарантированно квадратных клеток магического квадрата 3×3 и определяющие их квадратичные соотношения.",
      type: "Article",
    },
  },
  "orbits/5": {
    en: {
      title: "Five Square Entries in a 3×3 Magic Square — 23 Orbits",
      description:
        "The 23 D4 symmetry orbits of five guaranteed perfect-square entries in a 3×3 magic square, with paired quadrics, parametrizations, and proofs.",
      type: "Article",
    },
    ru: {
      title: "Пять квадратных клеток в магическом квадрате 3×3 — 23 орбиты",
      description:
        "Все 23 орбиты D₄ для пяти гарантированно квадратных клеток магического квадрата 3×3: пары квадрик, параметризации и доказательства.",
      type: "Article",
    },
  },
  news: {
    en: {
      title: "Magic Squares Project News",
      description:
        "Research milestones and publications from the Magic Squares project.",
    },
    ru: {
      title: "Новости проекта Magic Squares",
      description:
        "Вехи исследования и публикации проекта Magic Squares.",
    },
  },
  timeline: {
    en: {
      title: "Magic Squares Research Timeline",
      description:
        "The history of the Magic Squares research project, from its first ideas and constructions to its proofs and present form.",
    },
    ru: {
      title: "Хронология исследования Magic Squares",
      description:
        "История исследования Magic Squares: от первых идей и найденных конструкций до доказательств и современной постановки задачи.",
    },
  },
  about: {
    en: {
      title: "About the Magic Squares Research Project",
      description:
        "The 9/9 and 7/9 problems, complete coverage of the 5/9 positional types, progress on 6/9, charming squares, the F4+ elliptic surface, authorship, and rights.",
    },
    ru: {
      title: "О проекте исследования магических квадратов",
      description:
        "Задачи 9/9 и 7/9, полное покрытие позиционных типов 5/9, продвижение для 6/9, чарующие квадраты, эллиптическая поверхность F4+, авторы и права.",
    },
  },
};

/* START_FUNCTION pageSchema */
/* START_CONTRACT
PURPOSE: Build one Schema.org record with consistent authorship and rights metadata.
CONTRACT: Attribute every public page to the three project authors and point redistribution terms to the localized copyright section.
FAILURE_MEANING: Search engines may expose incomplete or incorrect authorship metadata.
KEYWORDS: schema-org, author, copyright
COMPLEXITY: 2
END_CONTRACT */
function pageSchema(
  metadata: LocalizedMetadata,
  canonicalPath: string,
  locale: SeoLocale,
): Readonly<Record<string, unknown>> {
  const type = metadata.type ?? "WebPage";
  const socialImages = socialImagesForLocale(locale);
  const authors = [
    {
      "@type": "Person",
      name: SITE_AUTHOR,
    },
    {
      "@type": "Person",
      name: locale === "ru"
        ? "Автор, пожелавший сохранить анонимность"
        : "An author who wishes to remain anonymous",
    },
    {
      "@type": "Person",
      name: locale === "ru" ? "Алексей Поздеев" : "Alexey Pozdeev",
    },
  ];
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name: metadata.title,
    description: metadata.description,
    inLanguage: locale,
    url: `${SITE_ORIGIN}${canonicalPath}`,
    image: socialImages.openGraph,
    thumbnailUrl: socialImages.openGraph,
    creator: authors,
    contributor: {
      "@type": "Person",
      name: "Alexey Khalin",
      affiliation: {
        "@type": "Organization",
        name: "IITP RAS",
      },
    },
    copyrightHolder: {
      "@type": "Person",
      name: SITE_AUTHOR,
    },
    copyrightNotice: `© 2021–2026 ${SITE_AUTHOR}`,
    copyrightYear: 2021,
    license: `${SITE_ORIGIN}/${locale}/about#copyright`,
  };
  if (type === "Article") {
    schema.headline = metadata.title;
    schema.author = authors;
    schema.datePublished = "2026-07-21";
    schema.dateModified = "2026-07-22";
  }
  if (type === "WebApplication") {
    schema.applicationCategory = "EducationalApplication";
    schema.operatingSystem = "Any";
  }
  return schema;
}
/* END_FUNCTION pageSchema */

function localizedStatic(
  suffix: string,
  locale: SeoLocale,
): LocalizedMetadata | undefined {
  return STATIC_METADATA[suffix]?.[locale];
}

function normalizePath(value: string): string {
  const pathname = new URL(value, SITE_ORIGIN).pathname;
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function notFoundMetadata(pathname: string): SeoMetadata {
  const locale = pathname.startsWith("/ru") ? "ru" : "en";
  return {
    canonicalPath: pathname,
    description:
      locale === "ru"
        ? "Запрошенной страницы нет в атласе Magic Squares."
        : "The requested Magic Squares page does not exist.",
    index: false,
    locale,
    schema: {},
    title:
      locale === "ru"
        ? "Страница не найдена — Magic Squares"
        : "Page not found — Magic Squares",
  };
}

export function seoForPath(value: string): SeoMetadata {
  const pathname = normalizePath(value);
  const match = pathname.match(/^\/(ru|en)(?:\/(.*))?$/);
  if (!match) return notFoundMetadata(pathname);
  const locale = match[1] as SeoLocale;
  const suffix = match[2] ?? "";
  const staticMetadata = localizedStatic(suffix, locale);
  if (staticMetadata) {
    return {
      canonicalPath: pathname,
      description: staticMetadata.description,
      index: true,
      locale,
      schema: pageSchema(staticMetadata, pathname, locale),
      title: staticMetadata.title,
    };
  }

  const orbitMatch = suffix.match(/^orbits\/(4|5)\/([a-z]+)$/);
  if (orbitMatch) {
    const level = Number(orbitMatch[1]);
    const family = findFamilyById(orbitMatch[2]);
    if (family?.level === level) {
      const mask = family.title;
      const summary = familySummary(family, locale);
      const orbit = familyOrbitDescription(family, locale);
      const metadata: LocalizedMetadata =
        locale === "en"
          ? {
              title: `${mask}: ${level} Square Entries in a 3×3 Magic Square`,
              description: `${orbit ? `${orbit}. ` : ""}${summary} Includes the explicit parametrization, assumptions, and coverage proof.`,
              type: "Article",
            }
          : {
              title: `${mask}: ${level} квадратные клетки в магическом квадрате 3×3`,
              description: `${orbit ? `${orbit}. ` : ""}${summary} Приведены явная параметризация, условия и доказательство области покрытия.`,
              type: "Article",
            };
      return {
        canonicalPath: pathname,
        description: metadata.description,
        index: true,
        locale,
        schema: pageSchema(metadata, pathname, locale),
        title: metadata.title,
      };
    }
  }

  const proofMatch = suffix.match(/^proofs\/([a-z-]+)$/);
  if (proofMatch) {
    const proof = COMMON_PROOFS.find((item) => item.id === proofMatch[1]);
    if (proof) {
      const metadata: LocalizedMetadata = {
        title: locale === "en" ? proof.titleEn : proof.title,
        description: locale === "en" ? proof.summaryEn : proof.summary,
        type: "Article",
      };
      return {
        canonicalPath: pathname,
        description: metadata.description,
        index: true,
        locale,
        schema: pageSchema(metadata, pathname, locale),
        title: metadata.title,
      };
    }
  }

  const newsMatch = suffix.match(/^news\/([a-z0-9-]+)$/);
  if (newsMatch) {
    const article = NEWS.find((item) => item.slug === newsMatch[1]);
    if (article) {
      const metadata: LocalizedMetadata = {
        title: locale === "en" ? article.titleEn : article.title,
        description: locale === "en" ? article.summaryEn : article.summary,
        type: "Article",
      };
      const schema = {
        ...pageSchema(metadata, pathname, locale),
        datePublished: article.date,
      };
      return {
        canonicalPath: pathname,
        description: metadata.description,
        index: true,
        locale,
        schema,
        title: metadata.title,
      };
    }
  }

  return notFoundMetadata(pathname);
}

export function alternatePath(
  canonicalPath: string,
  locale: SeoLocale,
): string {
  return canonicalPath.replace(/^\/(ru|en)(?=\/|$)/, `/${locale}`);
}

export function orbitPath(familyId: string): string {
  const family = findFamilyById(familyId);
  return family ? `/orbits/${family.level}/${family.id}` : "/lab";
}

/* START_FUNCTION indexableRouteSuffixes */
/* START_CONTRACT
PURPOSE: Enumerate every localized route that must be prerendered and indexed.
CONTRACT: Include chronology, static research pages, every orbit, every common proof, and published news only.
FAILURE_MEANING: A declared public route may be omitted from static HTML and the sitemap.
KEYWORDS: route-manifest, sitemap, prerender
COMPLEXITY: 1
END_CONTRACT */
export function indexableRouteSuffixes(): readonly string[] {
  return [
    "",
    "squares-of-squares",
    "theory/magic-squares-3x3",
    "lab",
    "proofs/general",
    "orbits/4",
    "orbits/5",
    ...FAMILIES.map((family) => `orbits/${family.level}/${family.id}`),
    ...COMMON_PROOFS.map((proof) => `proofs/${proof.id}`),
    "news",
    ...NEWS.map((article) => `news/${article.slug}`),
    "timeline",
    "about",
  ];
}
/* END_FUNCTION indexableRouteSuffixes */

/* END_MODULE search_metadata */

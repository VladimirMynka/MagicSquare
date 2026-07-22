import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import {
  SITE_NAME,
  SITE_ORIGIN,
  alternatePath,
  seoForPath,
  socialImagesForLocale,
} from "./seo";

export const LOCALES = ["ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];

interface LocaleContextValue {
  locale: Locale;
  text: (ru: string, en: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

export function preferredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("magic-squares-locale");
  if (isLocale(stored ?? undefined)) return stored as Locale;
  return window.navigator.languages.some((language) =>
    language.toLowerCase().startsWith("ru"),
  )
    ? "ru"
    : "en";
}

export function localePath(locale: Locale, target: string): string {
  if (target.startsWith("#") || /^[a-z]+:/i.test(target)) return target;
  if (!target.startsWith("/")) return target;
  if (/^\/(ru|en)(?:\/|$)/.test(target)) {
    return target.replace(/^\/(ru|en)(?=\/|$)/, `/${locale}`);
  }
  return target === "/" ? `/${locale}` : `/${locale}${target}`;
}

function replaceLocale(pathname: string, locale: Locale): string {
  if (/^\/(ru|en)(?:\/|$)/.test(pathname)) {
    return pathname.replace(/^\/(ru|en)(?=\/|$)/, `/${locale}`);
  }
  return localePath(locale, pathname);
}

function setAlternateLink(language: string, href: string) {
  const selector = `link[data-magic-squares-locale="${language}"]`;
  let link = document.head.querySelector<HTMLLinkElement>(selector);
  if (!link) {
    link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = language;
    link.dataset.magicSquaresLocale = language;
    document.head.append(link);
  }
  link.href = href;
}

function setCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    "link[data-magic-squares-canonical]",
  );
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    link.dataset.magicSquaresCanonical = "true";
    document.head.append(link);
  }
  link.href = href;
}

function setNamedMeta(name: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`,
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.append(meta);
  }
  meta.content = content;
}

function setPropertyMeta(property: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.append(meta);
  }
  meta.content = content;
}

function setStructuredData(schema: Readonly<Record<string, unknown>>) {
  let script = document.head.querySelector<HTMLScriptElement>(
    "script[data-magic-squares-schema]",
  );
  if (Object.keys(schema).length === 0) {
    script?.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.magicSquaresSchema = "true";
    document.head.append(script);
  }
  script.textContent = JSON.stringify(schema);
}

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const location = useLocation();
  useEffect(() => {
    const metadata = seoForPath(location.pathname);
    const canonicalUrl = `${SITE_ORIGIN}${metadata.canonicalPath}`;
    const socialImages = socialImagesForLocale(metadata.locale);
    window.localStorage.setItem("magic-squares-locale", locale);
    document.documentElement.lang = metadata.locale;
    document.title = metadata.title;
    setNamedMeta("description", metadata.description);
    setNamedMeta(
      "robots",
      metadata.index ? "index, follow" : "noindex, follow",
    );
    setNamedMeta("twitter:card", "summary_large_image");
    setNamedMeta("twitter:title", metadata.title);
    setNamedMeta("twitter:description", metadata.description);
    setNamedMeta("twitter:image", socialImages.twitter);
    setNamedMeta("twitter:image:alt", socialImages.alt);
    setPropertyMeta(
      "og:type",
      metadata.schema["@type"] === "Article" ? "article" : "website",
    );
    setPropertyMeta("og:site_name", SITE_NAME);
    setPropertyMeta("og:title", metadata.title);
    setPropertyMeta("og:description", metadata.description);
    setPropertyMeta("og:url", canonicalUrl);
    setPropertyMeta("og:locale", locale === "ru" ? "ru_RU" : "en_US");
    setPropertyMeta("og:locale:alternate", locale === "ru" ? "en_US" : "ru_RU");
    setPropertyMeta("og:image", socialImages.openGraph);
    setPropertyMeta("og:image:secure_url", socialImages.openGraph);
    setPropertyMeta("og:image:type", "image/png");
    setPropertyMeta("og:image:width", "1200");
    setPropertyMeta("og:image:height", "630");
    setPropertyMeta("og:image:alt", socialImages.alt);

    if (metadata.index) {
      for (const language of LOCALES) {
        setAlternateLink(
          language,
          `${SITE_ORIGIN}${alternatePath(metadata.canonicalPath, language)}`,
        );
      }
      setAlternateLink(
        "x-default",
        `${SITE_ORIGIN}${alternatePath(metadata.canonicalPath, "en")}`,
      );
      setCanonicalLink(canonicalUrl);
    } else {
      document.head
        .querySelectorAll(
          'link[rel="canonical"], link[rel="alternate"][hreflang]',
        )
        .forEach((link) => link.remove());
    }
    setStructuredData(metadata.schema);
  }, [locale, location.pathname]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      text: (ru, en) => (locale === "ru" ? ru : en),
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return replaceLocale(pathname, locale);
}

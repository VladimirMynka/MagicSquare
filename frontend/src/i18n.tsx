import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

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

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const location = useLocation();
  useEffect(() => {
    window.localStorage.setItem("magic-squares-locale", locale);
    document.documentElement.lang = locale;
    document.title =
      locale === "ru"
        ? "Magic Squares — атлас доказательств"
        : "Magic Squares — Proof Atlas";
    const description = document.head.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (description) {
      description.content =
        locale === "ru"
          ? "Интерактивный атлас параметрических магических квадратов, полных LaTeX-доказательств и воспроизводимых сертификатов."
          : "An interactive atlas of parametric magic squares, complete LaTeX proofs, and reproducible certificates.";
    }

    for (const language of LOCALES) {
      const pathname = replaceLocale(location.pathname, language);
      setAlternateLink(
        language,
        new URL(
          `${pathname}${location.search}`,
          window.location.origin,
        ).href,
      );
    }
    const defaultPath = replaceLocale(location.pathname, "en");
    setAlternateLink(
      "x-default",
      new URL(`${defaultPath}${location.search}`, window.location.origin)
        .href,
    );
    setCanonicalLink(
      new URL(
        `${location.pathname}${location.search}`,
        window.location.origin,
      ).href,
    );
  }, [locale, location.pathname, location.search]);

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

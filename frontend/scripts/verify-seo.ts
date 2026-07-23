/* START_MODULE verify_search_publication */
/* START_CONTRACT
PURPOSE: Verify prerendered routes, sitemap entries, localized metadata, and public attribution.
MATHEMATICAL_SCOPE: Publication integrity only; this script does not validate proof claims.
PUBLIC_SURFACE: Executable verification script.
KEYWORDS: seo, sitemap, copyright, prerender
COMPLEXITY: 3
END_CONTRACT */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  SITE_ORIGIN,
  indexableRouteSuffixes,
  seoForPath,
  socialImagesForLocale,
} from "../src/seo";

const DIST_DIR = resolve("dist");
const locales = ["en", "ru"] as const;

function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function routeFile(pathname: string): string {
  return resolve(DIST_DIR, `${pathname.slice(1)}.html`);
}

const titles = new Map<string, string>();
let routeCount = 0;
for (const suffix of indexableRouteSuffixes()) {
  for (const locale of locales) {
    const pathname = `/${locale}${suffix ? `/${suffix}` : ""}`;
    const file = routeFile(pathname);
    invariant(existsSync(file), `${pathname} has no prerendered HTML file`);
    const html = readFileSync(file, "utf8");
    const metadata = seoForPath(pathname);
    const socialImages = socialImagesForLocale(locale);
    invariant(
      html.includes(`<html lang="${locale}">`),
      `${pathname} has the wrong document language`,
    );
    invariant(
      html.includes(`<title>${metadata.title}</title>`),
      `${pathname} has the wrong title`,
    );
    invariant(
      html.includes(`rel="canonical" href="${SITE_ORIGIN}${pathname}"`),
      `${pathname} has the wrong canonical URL`,
    );
    invariant(
      html.includes('name="robots" content="index, follow"'),
      `${pathname} is not indexable`,
    );
    invariant(
      html.includes('rel="icon" href="/favicon.svg"')
        && html.includes('rel="icon" href="/favicon-32x32.png"')
        && html.includes('rel="shortcut icon" href="/favicon.ico"')
        && html.includes('rel="apple-touch-icon" href="/apple-touch-icon.png"'),
      `${pathname} is missing favicon metadata`,
    );
    invariant(
      html.includes(`property="og:image" content="${socialImages.openGraph}"`)
        && html.includes('property="og:image:width" content="1200"')
        && html.includes('property="og:image:height" content="630"')
        && html.includes(`property="og:image:alt" content="${socialImages.alt}"`),
      `${pathname} is missing Open Graph image metadata`,
    );
    invariant(
      html.includes('name="twitter:card" content="summary_large_image"')
        && html.includes(`name="twitter:image" content="${socialImages.twitter}"`)
        && html.includes(`name="twitter:image:alt" content="${socialImages.alt}"`),
      `${pathname} is missing Twitter image metadata`,
    );
    invariant(
      html.includes("© 2021–2026") && html.includes("Vladimir Mynka"),
      `${pathname} is missing visible attribution`,
    );
    invariant(
      html.includes('"copyrightHolder"') && html.includes('"copyrightYear":2021'),
      `${pathname} is missing structured copyright metadata`,
    );
    invariant(
      html.includes(locale === "ru" ? "Алексей Поздеев" : "Alexey Pozdeev")
        && html.includes("Alexey Khalin")
        && html.includes("IITP RAS"),
      `${pathname} is missing structured project authorship`,
    );
    const root = html.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/);
    invariant(Boolean(root?.[1]) && root[1].length > 1000, `${pathname} has an empty app shell`);
    for (const match of html.matchAll(/href="(\/(?:en|ru)(?:[^"?#]*))/g)) {
      const linkedPath = match[1].replace(/\/$/, "");
      invariant(
        existsSync(routeFile(linkedPath)),
        `${pathname} links to an unprerendered route: ${linkedPath}`,
      );
    }
    const previous = titles.get(`${locale}:${metadata.title}`);
    invariant(!previous, `${pathname} and ${previous} share title: ${metadata.title}`);
    titles.set(`${locale}:${metadata.title}`, pathname);
    routeCount += 1;
  }
}

const sitemap = readFileSync(resolve(DIST_DIR, "sitemap.xml"), "utf8");
const sitemapUrls = sitemap.match(/<url>/g)?.length ?? 0;
invariant(sitemapUrls === routeCount, `Sitemap has ${sitemapUrls} URLs, expected ${routeCount}`);
const sitemapLastModified = sitemap.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g)?.length ?? 0;
invariant(
  sitemapLastModified === routeCount,
  `Sitemap has ${sitemapLastModified} lastmod entries, expected ${routeCount}`,
);
invariant(
  sitemap.includes('hreflang="x-default"'),
  "Sitemap has no x-default alternates",
);

for (const asset of [
  "favicon.svg",
  "favicon-32x32.png",
  "favicon.ico",
  "apple-touch-icon.png",
  "social/og-en.png",
  "social/og-ru.png",
  "social/twitter-en.png",
  "social/twitter-ru.png",
]) {
  invariant(existsSync(resolve(DIST_DIR, asset)), `Missing published brand asset: ${asset}`);
}

const notFound = readFileSync(resolve(DIST_DIR, "404.html"), "utf8");
invariant(
  notFound.includes('name="robots" content="noindex, follow"'),
  "404 page is missing noindex",
);
invariant(notFound.includes("Page not found"), "404 page has no visible error message");

console.log(`Verified ${routeCount} prerendered routes, sitemap entries, and 404 metadata.`);

/* END_MODULE verify_search_publication */

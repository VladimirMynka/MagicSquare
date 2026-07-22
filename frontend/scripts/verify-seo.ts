import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  SITE_ORIGIN,
  indexableRouteSuffixes,
  seoForPath,
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
invariant(
  sitemap.includes('hreflang="x-default"'),
  "Sitemap has no x-default alternates",
);

const notFound = readFileSync(resolve(DIST_DIR, "404.html"), "utf8");
invariant(
  notFound.includes('name="robots" content="noindex, follow"'),
  "404 page is missing noindex",
);
invariant(notFound.includes("Page not found"), "404 page has no visible error message");

console.log(`Verified ${routeCount} prerendered routes, sitemap entries, and 404 metadata.`);

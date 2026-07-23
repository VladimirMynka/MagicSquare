import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "../src/App";
import {
  SITE_NAME,
  SITE_ORIGIN,
  alternatePath,
  indexableRouteSuffixes,
  seoForPath,
  socialImagesForLocale,
  type SeoMetadata,
} from "../src/seo";

const DIST_DIR = resolve("dist");
const TEMPLATE_PATH = resolve(DIST_DIR, "index.html");
const template = readFileSync(TEMPLATE_PATH, "utf8");
const locales = ["en", "ru"] as const;

function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeXml(value: string): string {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function structuredData(metadata: SeoMetadata): string {
  return JSON.stringify(metadata.schema).replaceAll("<", "\\u003c");
}

function metadataHead(metadata: SeoMetadata): string {
  const canonicalUrl = `${SITE_ORIGIN}${metadata.canonicalPath}`;
  const englishUrl = `${SITE_ORIGIN}${alternatePath(metadata.canonicalPath, "en")}`;
  const russianUrl = `${SITE_ORIGIN}${alternatePath(metadata.canonicalPath, "ru")}`;
  const socialImages = socialImagesForLocale(metadata.locale);
  const tags = [
    `<meta name="robots" content="${metadata.index ? "index, follow" : "noindex, follow"}" />`,
    `<meta property="og:type" content="${metadata.schema["@type"] === "Article" ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:locale" content="${metadata.locale === "ru" ? "ru_RU" : "en_US"}" />`,
    `<meta property="og:locale:alternate" content="${metadata.locale === "ru" ? "en_US" : "ru_RU"}" />`,
    `<meta property="og:image" content="${escapeHtml(socialImages.openGraph)}" />`,
    `<meta property="og:image:secure_url" content="${escapeHtml(socialImages.openGraph)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(socialImages.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(socialImages.twitter)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(socialImages.alt)}" />`,
  ];
  if (metadata.index) {
    tags.splice(
      1,
      0,
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" data-magic-squares-canonical="true" />`,
      `<link rel="alternate" hreflang="en" href="${escapeHtml(englishUrl)}" data-magic-squares-locale="en" />`,
      `<link rel="alternate" hreflang="ru" href="${escapeHtml(russianUrl)}" data-magic-squares-locale="ru" />`,
      `<link rel="alternate" hreflang="x-default" href="${escapeHtml(englishUrl)}" data-magic-squares-locale="x-default" />`,
    );
  }
  if (Object.keys(metadata.schema).length > 0) {
    tags.push(
      `<script type="application/ld+json" data-magic-squares-schema>${structuredData(metadata)}</script>`,
    );
  }
  return tags.join("\n    ");
}

function renderDocument(pathname: string): string {
  const metadata = seoForPath(pathname);
  const application = renderToString(
    <StaticRouter location={pathname}>
      <App />
    </StaticRouter>,
  );
  invariant(application.length > 500, `${pathname} rendered too little HTML`);
  let html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${metadata.locale}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    )
    .replace("</head>", `    ${metadataHead(metadata)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${application}</div>`);
  invariant(html.includes(application), `${pathname} was not inserted into HTML`);
  return html;
}

function routeFile(pathname: string): string {
  invariant(pathname.startsWith("/"), `Invalid route: ${pathname}`);
  return resolve(DIST_DIR, `${pathname.slice(1)}.html`);
}

function writeRoute(pathname: string) {
  const document = renderDocument(pathname);
  const target = routeFile(pathname);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, document);
  const trailingSlashTarget = resolve(DIST_DIR, pathname.slice(1), "index.html");
  mkdirSync(dirname(trailingSlashTarget), { recursive: true });
  writeFileSync(trailingSlashTarget, document);
}

function sitemap(): string {
  const entries: string[] = [];
  for (const suffix of indexableRouteSuffixes()) {
    const localizedPaths = Object.fromEntries(
      locales.map((locale) => [
        locale,
        `/${locale}${suffix ? `/${suffix}` : ""}`,
      ]),
    ) as Record<(typeof locales)[number], string>;
    for (const locale of locales) {
      const metadata = seoForPath(localizedPaths[locale]);
      const canonical = `${SITE_ORIGIN}${localizedPaths[locale]}`;
      invariant(Boolean(metadata.lastModified), `${canonical} has no last-modified date`);
      entries.push(
        [
          "  <url>",
          `    <loc>${escapeXml(canonical)}</loc>`,
          `    <lastmod>${escapeXml(metadata.lastModified ?? "")}</lastmod>`,
          `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${SITE_ORIGIN}${localizedPaths.en}`)}" />`,
          `    <xhtml:link rel="alternate" hreflang="ru" href="${escapeXml(`${SITE_ORIGIN}${localizedPaths.ru}`)}" />`,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_ORIGIN}${localizedPaths.en}`)}" />`,
          "  </url>",
        ].join("\n"),
      );
    }
  }
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}

const suffixes = indexableRouteSuffixes();
invariant(
  new Set(suffixes).size === suffixes.length,
  "The indexable route manifest contains duplicate paths",
);
for (const suffix of suffixes) {
  for (const locale of locales) {
    writeRoute(`/${locale}${suffix ? `/${suffix}` : ""}`);
  }
}

writeFileSync(resolve(DIST_DIR, "404.html"), renderDocument("/en/__not-found__"));
writeFileSync(resolve(DIST_DIR, "sitemap.xml"), sitemap());

console.log(`Prerendered ${suffixes.length * locales.length} localized routes.`);

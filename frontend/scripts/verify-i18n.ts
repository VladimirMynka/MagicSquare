/* START_MODULE verify_localization */
/* START_CONTRACT
PURPOSE: Verify bilingual content and public routes, including chronology and attribution.
MATHEMATICAL_SCOPE: Localization integrity only; this script does not prove mathematical claims.
PUBLIC_SURFACE: Executable verification script.
KEYWORDS: i18n, verification, timeline, prerender
COMPLEXITY: 3
END_CONTRACT */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { App } from "../src/App";
import { familyProof } from "../src/content/familyProofs";
import { news } from "../src/content/news";
import { commonProofs } from "../src/content/proofs";
import { researchTimeline } from "../src/content/timeline";
import {
  FAMILIES,
  familyGroupLabel,
  familyOrbitDescription,
  familySummary,
  justificationLabel,
} from "../src/lib/families";

const CYRILLIC = /[А-Яа-яЁё]/;

function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertEnglish(label: string, values: readonly (string | undefined)[]) {
  for (const value of values) {
    if (value === undefined) continue;
    invariant(!CYRILLIC.test(value), `${label} contains Cyrillic text: ${value}`);
  }
}

function removeLocalizedCalls(source: string): string {
  let output = "";
  let cursor = 0;
  while (cursor < source.length) {
    const start = source.indexOf("text(", cursor);
    if (start < 0) return output + source.slice(cursor);
    output += source.slice(cursor, start) + "text()";
    let index = start + "text(".length;
    let depth = 1;
    let quote = "";
    let escaped = false;
    while (index < source.length && depth > 0) {
      const character = source[index];
      if (quote) {
        if (escaped) escaped = false;
        else if (character === "\\") escaped = true;
        else if (character === quote) quote = "";
      } else if (character === '"' || character === "'" || character === "`") {
        quote = character;
      } else if (character === "(") depth += 1;
      else if (character === ")") depth -= 1;
      index += 1;
    }
    invariant(depth === 0, `Unclosed text() call at offset ${start}`);
    cursor = index;
  }
  return output;
}

function verifyInterfaceLiterals() {
  const source = readFileSync(resolve("src/App.tsx"), "utf8");
  const untranslated = removeLocalizedCalls(source)
    .split("\n")
    .map((line, index) => ({ line, number: index + 1 }))
    .filter(({ line }) => CYRILLIC.test(line));
  invariant(
    untranslated.length === 0,
    untranslated
      .map(({ line, number }) => `App.tsx:${number}: ${line.trim()}`)
      .join("\n"),
  );
}

/* START_FUNCTION verifyContent */
/* START_CONTRACT
PURPOSE: Ensure every structured English content record is present and free of Cyrillic leakage.
CONTRACT: Cover families, proofs, news, and every timeline event.
FAILURE_MEANING: The English edition contains missing or untranslated structured content.
KEYWORDS: content, English, timeline
COMPLEXITY: 2
END_CONTRACT */
function verifyContent() {
  for (const family of FAMILIES) {
    const group = familyGroupLabel(family, "en");
    const orbit = familyOrbitDescription(family, "en");
    const summary = familySummary(family, "en");
    invariant(Boolean(group), `${family.id} has no English group label`);
    invariant(Boolean(summary), `${family.id} has no English summary`);
    if (family.level === 4) {
      invariant(Boolean(orbit), `${family.id} has no English orbit description`);
    }
    assertEnglish(`${family.id} catalog`, [
      group,
      orbit,
      summary,
      ...family.justifications.map((item) => justificationLabel(item, "en")),
    ]);
    const proof = familyProof(family, "en");
    invariant(Boolean(proof.assumptions), `${family.id} has no English assumptions`);
    invariant(
      Boolean(proof.parameterDerivation),
      `${family.id} has no English parameter derivation`,
    );
    invariant(
      Boolean(proof.coverageText),
      `${family.id} has no English coverage status`,
    );
    invariant(Boolean(proof.coverage), `${family.id} has no coverage theorem`);
    invariant(
      Boolean(proof.coverage?.guaranteedSubset),
      `${family.id} has no guaranteed coverage subset`,
    );
    invariant(
      Boolean(proof.coverage?.inverseArgument),
      `${family.id} has no inverse coverage argument`,
    );
    invariant(
      Boolean(proof.coverage?.exceptionalLocus),
      `${family.id} has no exceptional-locus statement`,
    );
    assertEnglish(`${family.id} proof`, [
      proof.assumptions,
      proof.identityDerivation,
      proof.integralityClearance,
      proof.parameterDerivation,
      proof.coverageText,
      proof.coverage?.guaranteedSubset,
      proof.coverage?.inverseArgument,
      proof.coverage?.exceptionalLocus,
      proof.coverage?.conclusion,
    ]);
  }

  for (const proof of commonProofs("en")) {
    assertEnglish(`${proof.id} common proof`, [
      proof.title,
      proof.colorLabel,
      proof.summary,
      proof.conclusion,
    ]);
  }

  for (const article of news("en")) {
    assertEnglish(`${article.slug} news`, [
      article.title,
      article.summary,
      ...article.body,
    ]);
  }

  for (const moment of researchTimeline("en")) {
    for (const event of moment.events) {
      assertEnglish(`${event.id} timeline event`, [
        event.title,
        event.summary,
        ...event.sources.map((source) => source.label),
      ]);
    }
  }
}
/* END_FUNCTION verifyContent */

/* START_FUNCTION verifyEnglishRoutes */
/* START_CONTRACT
PURPOSE: Render representative English and Russian routes and verify visible localized markers.
CONTRACT: Include the chronology route and locale-prefixed navigation.
FAILURE_MEANING: A route may be declared bilingual while rendering missing or untranslated copy.
KEYWORDS: routes, SSR, localization
COMPLEXITY: 2
END_CONTRACT */
function verifyEnglishRoutes(): number {
  const routes: Readonly<Record<string, string>> = {
    "/en": "Magic squares you can do more than look at",
    "/en/lab?family=befgj": "Family BEFGJ",
    "/en/theory": "Theory contents",
    "/en/squares-of-squares": "The 3×3 magic square of squares",
    "/en/theory/magic-squares-3x3": "3×3 magic squares over a general carrier",
    "/en/theory/residues": "Residues and quadratic residues",
    "/en/theory/prime-divisors": "Prime divisors in a minimal 9/9 square",
    "/en/theory/matrix-algebra/magic-charming-semimagic": "Magic, charming, and semimagic squares",
    "/en/theory/matrix-algebra/block-structure-split-quaternions": "Block structure and split quaternions",
    "/en/orbits/4": "Four square entries: 23 orbits",
    "/en/orbits/5": "Five square entries: 23 orbits",
    "/en/orbits/5/befgj": "Family BEFGJ",
    "/en/proofs/general": "Why there are exactly 23 orbits",
    "/en/proofs/arithmetic-progression": "Red lemma",
    "/en/news": "Research milestones and project publications",
    "/en/timeline": "Project timeline",
    "/en/about": "Research on 3×3 magic squares",
  };
  for (const [route, marker] of Object.entries(routes)) {
    const html = renderToStaticMarkup(
      createElement(
        MemoryRouter,
        { initialEntries: [route] },
        createElement(App),
      ),
    );
    invariant(html.includes(marker), `${route} is missing marker: ${marker}`);
    invariant(!CYRILLIC.test(html), `${route} renders untranslated Cyrillic text`);
    invariant(
      html.includes('href="/en'),
      `${route} does not render locale-prefixed links`,
    );
  }

  const russianHome = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: ["/ru"] },
      createElement(App),
    ),
  );
  invariant(
    russianHome.includes("Магические квадраты, которые можно не только увидеть"),
    "/ru is missing its Russian home-page copy",
  );
  invariant(
    russianHome.includes('href="/ru/lab"'),
    "/ru does not render Russian locale-prefixed links",
  );
  return Object.keys(routes).length;
}
/* END_FUNCTION verifyEnglishRoutes */

verifyInterfaceLiterals();
verifyContent();
const routeCount = verifyEnglishRoutes();
console.log(
  `Verified complete English copy and ${routeCount} localized routes for ${FAMILIES.length} families, ${commonProofs("en").length} shared proofs, and ${news("en").length} news articles.`,
);

/* END_MODULE verify_localization */

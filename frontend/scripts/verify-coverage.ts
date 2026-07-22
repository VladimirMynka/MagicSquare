import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { App } from "../src/App";
import { familyProof } from "../src/content/familyProofs";
import { FAMILIES } from "../src/lib/families";

function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const CONDITIONAL_FIVE = new Set([
  "bdfhj",
  "abdfj",
  "acehj",
  "acdef",
  "abefj",
  "abfgj",
  "befgj",
  "abcdg",
]);

let completeFive = 0;
let conditionalFive = 0;

for (const family of FAMILIES) {
  for (const locale of ["ru", "en"] as const) {
    const coverage = familyProof(family, locale).coverage;
    invariant(Boolean(coverage), `${family.id}/${locale}: missing coverage theorem`);
    invariant(
      coverage.conditions.length > 0,
      `${family.id}/${locale}: missing guaranteed-subset conditions`,
    );
    invariant(
      coverage.exceptionalConditions.length > 0,
      `${family.id}/${locale}: missing exceptional-locus conditions`,
    );
    invariant(
      Boolean(coverage.guaranteedSubset.trim()),
      `${family.id}/${locale}: empty guaranteed subset`,
    );
    invariant(
      Boolean(coverage.inverseArgument.trim()),
      `${family.id}/${locale}: empty inverse argument`,
    );
    invariant(
      Boolean(coverage.exceptionalLocus.trim()),
      `${family.id}/${locale}: empty exceptional locus`,
    );

    const route = `/${locale}/orbits/${family.level}/${family.id}`;
    const html = renderToStaticMarkup(
      createElement(
        MemoryRouter,
        { initialEntries: [route] },
        createElement(App),
      ),
    );
    invariant(
      html.includes(
        locale === "ru"
          ? "Максимально широкое гарантированное подмножество"
          : "Broadest guaranteed subset",
      ),
      `${family.id}/${locale}: coverage block is not rendered`,
    );
    invariant(!html.includes("katex-error"), `${family.id}/${locale}: invalid LaTeX`);
  }

  const status = familyProof(family, "en").coverage?.status;
  invariant(Boolean(status), `${family.id}: missing coverage status`);
  if (family.level === 4) {
    invariant(status === "complete", `${family.id}: every 4/9 orbit must be complete`);
    continue;
  }

  const expected = CONDITIONAL_FIVE.has(family.id) ? "conditional" : "complete";
  invariant(status === expected, `${family.id}: expected ${expected}, received ${status}`);
  if (status === "complete") completeFive += 1;
  else conditionalFive += 1;
}

invariant(completeFive === 15, `Expected 15 complete 5/9 families, received ${completeFive}`);
invariant(
  conditionalFive === 8,
  `Expected 8 conditional 5/9 families, received ${conditionalFive}`,
);

console.log(
  `Verified exact coverage metadata for ${FAMILIES.length} families: ${completeFive} complete and ${conditionalFive} conditional 5/9 families.`,
);

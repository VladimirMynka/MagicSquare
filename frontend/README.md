# Magic Squares Proof Atlas

React + TypeScript SPA for the proof-backed Magic Squares interface.

## Architecture

- Vite builds a static bundle in `dist/`.
- React Router owns the public routes; nginx falls back to `index.html`.
- Russian and English editions use stable `/ru/...` and `/en/...` routes. The
  language switch preserves the current path, query, and hash; legacy
  unprefixed links redirect according to the saved preference or browser
  language.
- News content lives in `src/content/news.ts` and is versioned with the UI.
- KaTeX renders local proof cards and shared lemmas without a server runtime.
- Exact integer calculations use native `BigInt` in the browser.
- The atlas exposes all 23 `4/9` and all 23 `5/9` orbits under `D4`. The exact
  finite census, relation bases, and nondegenerate defaults are checked during
  verification; proof-core and legacy formulas retain distinct statuses.
- The laboratory state is the canonical integer triple `(E, x, y)`:

  ```text
  E+x      E-x+y    E-y
  E-x-y    E        E+x+y
  E+y      E+x-y    E-x
  ```

  Families are presets that calculate this triple. Direct edits, rotations,
  reflection, minimization, scaling, and factorization operate on the same
  current square and do not retain an inapplicable family claim.

- The visual system is a warm academic workbench: paper and graphite neutrals,
  muted family colors, and brick red reserved for perfect-square values.
- Large squares color only values that are actually perfect squares. Family
  miniatures instead color the exact proof supports and split intersections
  between their two supporting identities.
- Every default family preset has nine positive pairwise-distinct entries and
  exactly the declared four or five square-valued positions.
- The selected family's sequential proof text is rendered directly below the
  laboratory: assumptions, explicit roots, algebraic identities, Magic3
  reconstruction, parity clearance, and the conclusion. It is not an
  abbreviated proof-summary card or a separate family page.
- English coverage is validated across interface literals, all 46 family
  descriptions and proofs, all shared lemmas, and every news article. Runtime
  metadata sets `lang`, canonical, `hreflang=ru`, `hreflang=en`, and
  `hreflang=x-default` for the current localized route.

A backend is intentionally not part of the first release. Add one when news
must be published without a Git deployment, or when accounts, subscriptions,
comments, dynamic search, or queued research jobs become product requirements.

## Development

```bash
npm install
npm run dev
npm run verify:i18n
```

The development server binds to `127.0.0.1:17601`.

## Build and nginx preview

```bash
npm run build
nginx -p "$PWD/" -c nginx/local.conf
```

The local nginx configuration serves `dist/` at `http://127.0.0.1:17601/` and
keeps client-side routes such as `/en/lab` and `/ru/news/...` reload-safe.

For a durable project preview, link `systemd/magic-squares-spa.service` into the
user systemd manager and enable it. The unit runs nginx in the foreground and
does not require privileged ports.

For a system deployment, copy `dist/` to `/var/www/magic-squares` and install
`nginx/production.conf` as a server block. Replace `server_name _` with the
actual host before enabling TLS.

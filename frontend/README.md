# Magic Squares Proof Atlas

React + TypeScript SPA for the proof-backed Magic Squares interface.

## Architecture

- Vite builds a static bundle in `dist/`.
- React Router owns the public routes; nginx falls back to `index.html`.
- News content lives in `src/content/news.ts` and is versioned with the UI.
- Exact integer calculations use native `BigInt` in the browser.
- The first migration slice exposes only families with a symbolic certificate
  in `magic-squares-core`.
- The laboratory state is the canonical integer triple `(E, x, y)`:

  ```text
  E+x      E-x+y    E-y
  E-x-y    E        E+x+y
  E+y      E+x-y    E-x
  ```

  Families are certified presets that calculate this triple. Direct edits,
  rotations, reflection, minimization, scaling, and factorization operate on
  the same current square and do not retain an inapplicable family claim.

- The visual system is a warm academic workbench: paper and graphite neutrals,
  muted family colors, and brick red reserved for perfect-square values.

A backend is intentionally not part of the first release. Add one when news
must be published without a Git deployment, or when accounts, subscriptions,
comments, dynamic search, or queued research jobs become product requirements.

## Development

```bash
npm install
npm run dev
```

The development server binds to `127.0.0.1:17601`.

## Build and nginx preview

```bash
npm run build
nginx -p "$PWD/" -c nginx/local.conf
```

The local nginx configuration serves `dist/` at `http://127.0.0.1:17601/` and
keeps client-side routes such as `/lab` and `/news/...` reload-safe.

For a durable project preview, link `systemd/magic-squares-spa.service` into the
user systemd manager and enable it. The unit runs nginx in the foreground and
does not require privileged ports.

For a system deployment, copy `dist/` to `/var/www/magic-squares` and install
`nginx/production.conf` as a server block. Replace `server_name _` with the
actual host before enabling TLS.

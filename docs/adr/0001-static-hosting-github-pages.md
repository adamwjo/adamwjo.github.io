# ADR-0001 — Static hosting on GitHub Pages; git repo is the source of truth

**Status:** Accepted · 2026-08-24

## Context

The site was generated in Figma Make as a React + Vite + Tailwind app. It has no backend, no data
fetching, no forms, and no routes: `vite build` emits static files. The scaffold, however, carried
~350 lines of Figma-only Vite plugins, HTML comment slots filled at build time from `.figma/make/site.json`,
a `figma make deploy` script, and `robots.index: false`.

"Lightweight infrastructure" was clarified to mean **operational** weight: free, zero servers, no
accounts beyond GitHub, deploy on push. No custom domain yet.

## Decision

1. The git repo is the only source of truth. Figma Make scaffolding is removed; `vite.config.ts`
   is a plain React + Tailwind config; `index.html` carries real `<title>`, description, and OG tags.
2. Hosting is **GitHub Pages**, deployed by a GitHub Actions workflow on push to `main`
   (`actions/deploy-pages`, no `gh-pages` branch, no tokens to manage).
3. The Vite `base` is derived in CI from the repository name (`*.github.io` → `/`, otherwise
   `/<repo>/`) so the site works whether it is a user site or a project site.
4. Search indexing is allowed (the template's `noindex` is gone).

## Consequences

- Cost: $0. Nothing to patch or scale.
- Deploy is `git push`. Rollback is `git revert` + push.
- No preview deploys for branches (GitHub Pages limitation). If that becomes painful, Cloudflare Pages
  is a drop-in swap: same `dist/`, same `base` logic.
- Fonts still load from Google Fonts (external request, blocked in some corporate networks).
  Self-hosting them is a small follow-up if it matters.
- A custom domain later is a `CNAME` file in `public/` plus DNS — and it flips the base path to `/`,
  which the workflow already handles because `VITE_BASE` is only about repo name; when adding a domain,
  set `VITE_BASE=/` explicitly in the workflow.

## One-time setup

1. Create the repo (recommended name: `adamwjo.github.io`, so the site lives at the root).
2. Push this code to `main`.
3. Repo → Settings → Pages → Source: **GitHub Actions**.
4. The first push runs the workflow; the URL appears in the Actions run and under Settings → Pages.

## Alternatives considered

- **Cloudflare Pages** — equally free, adds branch previews and a faster CDN. Not chosen only because
  GitHub is the one account already in hand.
- **Vercel / Netlify** — fine, but more surface area than a static page needs.
- **Stay in Figma Make** — rejected: two toolchains, opaque deploy, no history.

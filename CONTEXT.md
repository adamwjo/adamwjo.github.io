# CONTEXT — adam-johnson-site

Personal landing site for Adam Johnson (product owner, New York). Single page, no backend, no CMS.
Source of truth is this git repo (the Figma Make origin has been retired — see ADR-0001).

## Glossary

Terms are used exactly as below, in code and in copy. When copy and code disagree, fix the copy.

| Term | Meaning | Where it lives |
|---|---|---|
| **Site** | The one static page at `/`. There are no routes. | `src/App.tsx` |
| **Section** | A full-width block with an `id` targeted by the nav: `work`, `principles`, `about`, `contact`. | `App.tsx` |
| **Experience** | The section (`#work`) listing roles held. Nav label, section heading, and hero CTA all say "Experience". It is *not* a portfolio; entries are jobs, not projects, and are not clickable. | `work[]` in `App.tsx` |
| **Entry** | One role in Experience: `idx`, `year`, `title`, `role` (employer · city), `desc`, `tags`, `status`. | `work[]` |
| **Status** | A small badge on an Entry. `kind` ∈ `success` \| `warning` \| `info`. Status colours are the *only* colour permitted on the Site; everything else is monochrome. | `StatusBadge`, `--error/--success/--warning/--info` in `index.css` |
| **Principle** | One of six "How I work" cards in `#principles` (nav label: "Approach"). | `principles[]` |
| **Metric** | One of four headline numbers in `#about`. "4 disciplines" = product delivery, QA engineering, web development, software education, as enumerated in the hero paragraph. Keep them in sync. | `metrics[]` |
| **Contact item** | A labelled value in the footer. Has an `href` only if it is actually navigable (LinkedIn is; Availability and Location are not). | `contact[]` |
| **Scene** | The fixed WebGL backdrop (three.js line-art clock + radio) that rotates with scroll and pointer. Lazy-loaded; the page is fully usable without it. | `src/three/` |
| **Reveal** | The scroll-in fade used on every block. Disabled when the OS asks for reduced motion (`MotionConfig reducedMotion="user"`); the Scene likewise stops parallaxing. | `Reveal` in `App.tsx`, `Scene.tsx` |
| **Base path** | The URL prefix the Site is served from. `/` for a user site (`<user>.github.io`), `/<repo>/` for a project site. Set by `VITE_BASE`; derived automatically in CI. Never hard-code it. | `vite.config.ts`, `.github/workflows/deploy.yml` |

## Invariants

- Colour appears only through Status. Adding colour anywhere else is a design change, not a tweak.
- Nothing on the page looks clickable unless it navigates somewhere.
- Content changes are edits to the typed arrays at the top of `App.tsx`. If that stops being enough, that is the trigger to consider a content file, not a CMS.
- `pnpm typecheck && pnpm build` must pass; CI runs both before deploying.

## Running it

```
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # -> dist/
VITE_BASE=/repo-name/ pnpm build   # simulate a project-site deploy
```

Deploy: push to `main`. See ADR-0001 for one-time GitHub setup.

## Decisions

- [ADR-0001 — Static hosting on GitHub Pages, repo as source of truth](docs/adr/0001-static-hosting-github-pages.md)
- [ADR-0002 — Keep the three.js Scene, lazy-loaded](docs/adr/0002-keep-threejs-scene.md)

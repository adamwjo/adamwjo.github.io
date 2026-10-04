# CONTEXT — adam-johnson-site

Personal landing site for Adam Johnson (product owner with an engineering background, New York). Single page, no backend, no CMS.
Source of truth is this git repo (the Figma Make origin has been retired — see ADR-0001).

## Glossary

Terms are used exactly as below, in code and in copy. When copy and code disagree, fix the copy.

| Term | Meaning | Where it lives |
|---|---|---|
| **Site** | The one static page at `/`. There are no routes. | `src/App.tsx` |
| **Section** | A full-width block with an `id` targeted by the nav: `work`, `principles`, `about`, `contact`. | `App.tsx` |
| **Experience** | The section (`#work`) listing roles held. Nav label, section heading, and hero link all say "Experience". It is *not* a portfolio; entries are jobs, not projects. | `roles[]` in `App.tsx` |
| **Entry** | One role in Experience: `title`, `org`, `years` (display), `start`/`end` (numeric; `end: null` = current), `band`, `lane`, `desc`, `tags`. | `roles[]`, `Experience.tsx` |
| **Dial** | The sticky radio-tuning scale at the top of Experience. Years run left to right; each Entry is a **band** in one of two **lanes** (lane 0: QA → Flatiron → Product; lane 1: We Build Black). The **needle** glides to the Entry being read. Bands link to their Entries. | `Experience.tsx` |
| **Principle** | One of six rows in `#principles`. The section heading, header nav, and Deck all say "How I work". | `principles[]` |
| **Spec** | The label/value plate in `#about`. Carries the old headline numbers honestly: "7+ years", the four disciplines (product delivery, QA engineering, web development, software education — keep in sync with the hero paragraph), Broadway.com dates, scope, code, location. | `spec[]` |
| **Contact** | The `#contact` section: the email address (mailto), an Email key, a Copy key, LinkedIn, location, and live local time. No availability statement. | `Contact` in `App.tsx` |
| **Clock** | The hero object: a Braun-style analog clock showing live New York time. Hands sweep to the time on load, then tick. | `Clock.tsx`, `useNewYorkTime.ts` |
| **Footer** | The © line only. There is no colophon. | `Footer` in `App.tsx` |
| **Deck** | The phone-only control strip fixed at the bottom of the screen: three section keys (Experience, How I work, About) and an Email key. It rises once the hero's Email key scrolls away and steps aside when the Contact keys arrive, so a view never holds two Email keys. On phones, in portrait or landscape (the `phone` variant), the header scrolls away and the Deck is the navigation. | `Deck` in `App.tsx` |
| **Key** | A pressable control (link or button) drawn like a hardware key. `solid` (black) = the primary action, `outline` = the second one. Square, flat. | `Key.tsx` |
| **Icon** | Iconoteka (`iconoteka-react`) at the medium weight, through the `Icon` wrapper in `icons.tsx`. The AJ `BrandMark` is the only hand-drawn SVG. | `icons.tsx` |
| **Rule** | A hairline that draws itself in on scroll. Content beside it is never hidden. | `Rule.tsx` |
| **Base path** | The URL prefix the Site is served from. `/` for a user site (`<user>.github.io`), `/<repo>/` for a project site. Set by `VITE_BASE`; derived automatically in CI. Never hard-code it. | `vite.config.ts`, `.github/workflows/deploy.yml` |

## Invariants

- Black on white, no accent colour. Square edges everywhere except the clock. Sentence case, nothing under 15px except dial legends. Changing any of these is a design change, not a tweak.
- Nothing on the page looks clickable unless it navigates somewhere or does something.
- Every animation has a still state. `MotionConfig reducedMotion="user"` plus `useReducedMotion` guards; nothing is hidden waiting for an animation that may not run.
- Mobile is the primary experience. Design and check phones first (390 and 360 wide), then desktop.
- Copy is plain, specific, and conversational: a seasoned developer's voice, cool, not arrogant, in full first-person sentences rather than clipped fragments. No invented outcomes, metrics, or testimonials (see PRODUCT.md, Evidence on Hand).
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
- [ADR-0002 — Keep the three.js Scene, lazy-loaded](docs/adr/0002-keep-threejs-scene.md) (superseded by ADR-0003)
- [ADR-0003 — Remove the three.js Scene; the objects become working parts](docs/adr/0003-remove-threejs-scene.md)

Design context: [PRODUCT.md](PRODUCT.md) (who it is for, voice, evidence) and [DESIGN.md](DESIGN.md) (the visual system).

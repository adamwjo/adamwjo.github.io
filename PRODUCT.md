# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People deciding whether to work with Adam Johnson: hiring managers, engineering and product leads, and recruiters who arrive from a link (email, LinkedIn, a résumé) and give the page a minute or two. **Mobile is the primary experience** (confirmed by the user 2026-10-04): most visitors open the link on a phone, between other things. Desktop is the secondary case. Their job is to answer three questions fast: what does he do, is he any good at it, and how do I reach him.

## Product Purpose

A single-page personal site. It presents Adam as a technical product person, a product owner whose background is QA engineering, web development, and teaching software. Success is a qualified visitor emailing him.

## Positioning

Product and engineering presented as equals. Adam owns product at Broadway.com and can read the code: he came up through QA and taught software at Flatiron School and We Build Black. A pure product manager can't truthfully claim that history, and a pure developer can't claim the product ownership.

## Operating Context

- Static site on GitHub Pages, deployed on push to `main`. No backend, no forms, no analytics.
- Content lives in typed arrays at the top of `src/App.tsx`.
- Stack: React 19, Vite 8, Tailwind v4, Motion (`motion/react`). Three.js was removed in the 2026-10 redesign.

## Capabilities and Constraints

- One page, sections: Experience (`#work`), Approach (`#principles`), About (`#about`), Contact (`#contact`).
- Contact is by email (adamwjo@gmail.com) and LinkedIn. There is no contact form.
- The page has to work fully without motion (`prefers-reduced-motion`).
- Mobile first: phone layouts are designed first and checked first (390px and 360px wide). Primary actions stay within thumb reach, and touch targets are at least 44px.
- `pnpm typecheck && pnpm build` must pass; CI runs both.

## Brand Commitments

- Voice: a seasoned developer's. Cool, not arrogant, no nonsense. Plain words, specifics over adjectives, no buzzwords ("leverage", "synergy", "passionate", "empathy, transparency, and precision"). Conversational and first person, in complete sentences. The user found the first clipped, fragmentary rewrite "a bit too terse" (2026-10-04), so the voice is relaxed and explains itself rather than barking.
- Icons: Iconoteka (`iconoteka-react`), pinned by the user 2026-10-04.
- Visual lineage: Dieter Rams / Braun industrial design. Confirmed by the user as binding; the redesign refines it, it does not replace it.
- Color: strictly black on white. No accent colour at all (2026-10-04: the user rejected the orange accent and a yellow alternative, and called coloured "live" dots AI-sloppy). No grey page background.
- Shape: square edges everywhere. The clock is the only rounded object (user, 2026-10-04).
- Typography: Switzer (Fontshare), chosen by the user from four candidates on 2026-10-04. Sentence case throughout, no tracked uppercase labels, and no text smaller than 15px except instrument legends on the dial.
- The "AJ" monogram (`BrandMark`, `public/favicon.svg`), now on a square tile.

## Evidence on Hand

Confirmed accurate by the user (2026-10-04):

- Product Owner, Broadway.com, New York, 2022 to present: customer-facing digital work including ticketing systems, full PDLC.
- Senior / Lead Instructor, Flatiron School (East Sync), 2020 to 2022.
- QA Engineer, Broadway.com, New York, 2019 to 2020.
- Instructor and Curriculum Designer, We Build Black, 2019 to 2022.
- 7+ years across product and tech; four disciplines: product delivery, QA engineering, web development, software education.
- JavaScript and Next.js fluency.
- LinkedIn: https://www.linkedin.com/in/adam-johnson-715175163

Do not state job availability (the "Open to Product roles" line was removed at the user's request). There are no testimonials, case studies, client logos, or outcome metrics. Do not invent any.

## Product Principles

1. Say what he did, plainly. A specific sentence beats three adjectives.
2. Show the range of product and engineering through the record itself, not through claims about it.
3. Reaching him should take one click from anywhere on the page.
4. Everything on the page earns its place. If it doesn't inform or help someone act, cut it.

## Accessibility & Inclusion

WCAG 2.2 AA contrast and keyboard access. Motion is optional, and every animated element has a still state.

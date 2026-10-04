# ADR-0002 — Keep the three.js Scene, but lazy-load it

**Status:** Superseded by [ADR-0003](0003-remove-threejs-scene.md) · 2026-10-04

## Context

The Scene (`src/three/`) draws a monochrome line-art clock and radio with `three`,
`@react-three/fiber`, and `@react-three/drei`. Measured build output:

| Chunk | Minified | Gzipped |
|---|---|---|
| App (React, motion, Tailwind, content) | 338 KB | 108 KB |
| Scene (three.js stack) | 906 KB | 241 KB |

The Scene is ~70% of the page's JavaScript and is decorative: the page is complete without it.
The same drawing could be done in inline SVG or Canvas 2D for roughly 0 KB of dependencies.

## Decision

Keep the Scene as designed. Load it with `React.lazy` + `Suspense` so the content chunk paints first
and the three.js chunk streams in behind it. Respect `prefers-reduced-motion` by not attaching the
scroll/pointer parallax listeners.

## Consequences

- First paint is gated on ~108 KB gzipped, not ~350 KB. The 3D backdrop appears a moment later
  (empty until then, which is acceptable on a white page).
- The dependency weight remains. Revisit if any of these become true: a mobile audience matters,
  Lighthouse performance scores matter for how the site is judged, or the drawing is redesigned anyway.
- Replacement path, if taken: port `RamsObject.tsx` geometry helpers (`circle`, `roundedRect`) to SVG
  paths, drive rotation with a CSS 3D transform on scroll. Estimated effort: an afternoon.

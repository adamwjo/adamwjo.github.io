# ADR-0003 — Remove the three.js Scene; the objects become working parts

**Status:** Accepted · 2026-10-04 · Supersedes [ADR-0002](0002-keep-threejs-scene.md)

## Context

ADR-0002 kept the decorative WebGL still-life (a line-art clock and a Braun T3-style radio) and named
the conditions for revisiting it: "a mobile audience matters, Lighthouse performance scores matter
for how the site is judged, or the drawing is redesigned anyway." The 2026-10 redesign met the third
condition. The owner asked for three.js to be removed and for Motion to stay.

## Decision

1. Delete `src/three/` and the `three`, `@react-three/fiber`, `@react-three/drei`, and `@types/three` dependencies.
2. Keep both objects, but make each one do a job:
   - The **clock** becomes the hero object, built in HTML/SVG. It shows live New York time, which
     is useful to anyone about to email.
   - The **radio** becomes the **Dial** at the top of Experience: a tuning scale where each role is a
     band and the needle follows the role being read.
3. All motion runs through `motion/react`.

## Consequences

- Total JS: ~355 KB minified / ~114 KB gzipped (was ~1.24 MB / ~350 KB across two chunks). One chunk;
  no lazy boundary needed.
- No WebGL context, so no GPU cost on low-end phones.
- The page no longer has a fixed full-viewport backdrop; the sections own their own surfaces.

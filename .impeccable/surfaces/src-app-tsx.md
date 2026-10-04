---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Surface brief: the Site (`/`)

Scope: the whole single page. Visitor mode: **Persuade**. A hiring manager or lead decides to email Adam. **Mobile is primary** (user, 2026-10-04): phone compositions are designed and checked first.
Audience and job: see PRODUCT.md. Action: email adamwjo@gmail.com (copy or mailto), LinkedIn second.
Proof: the real role history (QA, then teaching, then product) and the plain-spoken approach. No invented outcomes.
Constraints: keep the Rams/Braun lineage; remove three.js; keep Motion; add Contact with the email; drop availability.

## Direction contract

THESIS: The page is a Braun device built for one person: a housing, a dial, a few keys, and every object does a job. It refuses the portfolio template (eyebrow, giant hero, icon cards, metric tiles) and the old decorative WebGL still-life.

OWN-WORLD: Black on white, the way Braun printed its manuals. White ground, black panels (dial window, About, the phone Deck), 1px hairlines, and no accent colour anywhere. Switzer is the only family: medium for display and titles, regular for text, everything in sentence case, with nothing under 15px except the dial's legends. Every edge is square; the clock is the one rounded object. Keys are flat black blocks or 1px outlines. Icons are Iconoteka at the medium weight. No chips, no cards, no mono, no dots. Round 3 (user, 2026-10-04): the orange, Archivo with tracked caps, and the grey ground were rejected as AI-looking.

STORY: In one viewport the visitor learns he's a product owner who reads code, based in New York, and that email is one press away. Experience shows the hybrid through the record: QA, then teaching, then product, with the overlaps visible on the dial. Approach says how he works in plain sentences. About is the spec sheet. Contact gives the address, a copy key, LinkedIn, and his local time.

FIRST VIEWPORT: A header strip with the mark, name, nav, and a black Contact key. The H1 "Product owner with an engineer's habits." spans the full measure (11 of 12 columns) at about 96px, medium weight, and sets in two lines on desktop. Amended after the build because a 7-column H1 broke into four ragged lines. Below it, the left six columns hold a four-sentence, first-person introduction and the black Email key with a quiet "See my experience" link. The paragraph was lengthened in round 2 because the user found the copy too terse. The right four columns hold a square black clock with rounded corners (Braun AB lineage) with a white dial showing live New York time and a black second hand, captioned with the time and zone. The hands sweep to the current time on load; together with the H1 mask rise, that is the hero's single authored moment. On phones (the primary case) the header scrolls away with the page. The H1 sets in three lines, the paragraph and keys follow, and the clock sits under the keys, left-aligned with the text column. The clock now aligns left with the text column; its caption ("1:06 PM EDT in New York") sits under it. On 360×740 the clock is cut at the fold, which is accepted: the H1, the introduction and the Email key all fit. Once the hero keys leave the view, the Deck rises: a black control bar along the bottom edge with three section keys (text labels; a 2px white line marks the current section) and a white Email block under the thumb. The Deck steps aside when the Contact keys arrive. Landscape phones (short and touch) get the Deck too, with the header unpinned. The tuning dial pins to the very top on phones, with a short ground fade under it so text never shows sliced, and unpins in landscape.

FORM: The incumbent Rams/Braun world, refined. Pinned by the user on 2026-10-04: "Keep the dieter rams inspired design but improve upon it." No roll: established world. Signature interaction: Experience is a radio tuning dial. A sticky dark window with a 2019–2026 scale shows each role as a band, and a white needle glides to the role in view. The bands link to their entries.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

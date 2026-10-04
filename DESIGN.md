---
name: Adam Johnson
description: A single-page Braun device for one person, printed black on white. A housing, a dial, a few keys, and every object does a job.
colors:
  ground: "#ffffff"
  ground-hover: "#f2f2f2"
  ink: "#111111"
  ink-hover: "#2e2e2e"
  ink-soft: "#383838"
  ink-2: "#666666"
  rule: "#dcdcdc"
  panel: "#161616"
  panel-ink: "#f2f2f2"
  panel-mute: "#8a8a8a"
  panel-rule: "#333333"
typography:
  display:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.625rem, 1.5rem + 4.8vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 1.5rem + 2.6vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.08rem + 0.4vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  legend:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: "1.25rem"
rounded:
  none: "0px"
  clock-housing: "13%"
  clock-face: "9999px"
spacing:
  gutter-phone: "1.25rem"
  gutter-tablet: "2rem"
  gutter-desktop: "3rem"
  container: "1240px"
  header: "4rem"
  section-phone: "5rem"
  section-desktop: "9rem"
components:
  key-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  key-solid-hover:
    backgroundColor: "{colors.ink-hover}"
  key-outline:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  key-outline-hover:
    backgroundColor: "{colors.ground-hover}"
  key-small:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "40px"
  dial-window:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.panel-ink}"
    typography: "{typography.legend}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
  deck:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.panel-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "56px"
  deck-email:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
  clock-housing:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.clock-housing}"
    padding: "8%"
  clock-face:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.clock-face}"
  panel-section:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.panel-ink}"
    rounded: "{rounded.none}"
    padding: "80px 20px"
---

# Design System: Adam Johnson

## Overview

**Creative North Star: "The Printed Manual"**

The page is a Braun device built for one person and documented the way Braun printed its manuals: black ink on white paper, a few black control panels, hairlines between things, and nothing that does not do a job. Hierarchy comes from size, weight and space alone. There is no accent colour, no second typeface, no shadow, and no rounded corner outside the one object that is genuinely round in the Braun lineage, the travel clock.

The page is mobile-first and moderately dense: generous section spacing (80px on phones, 144px from tablet up), a single 12-column measure on larger screens, and text set large enough that nothing reads as fine print. The instruments carry the character. A live New York clock sits in the hero, Experience is read through a radio tuning dial, About is printed as a black spec plate, and on phones a black control bar rises along the bottom edge.

Rejected by the user on 2026-10-04 and gone from the build: the orange signal accent, Archivo with tracked uppercase labels, the grey ground, rounded borders on anything but the clock, small text everywhere, and decorative coloured dots.

**Key Characteristics:**
- White ground, black ink, greys for running text and meta, black panels; no accent colour.
- One family, Switzer, at 400 and 500, in sentence case throughout.
- Square edges everywhere; the clock is the single rounded object.
- Flat: no shadows anywhere. Depth is panel inversion and 1px hairlines.
- Iconoteka line icons at medium weight, four glyphs total.
- Motion is mechanical and sparse: a mask rise, a clock power-on, a needle spring, rules drawing in, a Deck on a spring.

## Colors

A strictly achromatic palette: white paper, near-black ink, two greys for reading levels, and an inverted black panel set for the instruments.

### Primary
- **Press Black** (ink): all headings, primary body emphasis, solid keys, the BrandMark tile, focus rings, selection background, clock hands and indices. It is the only "action" colour; a solid black key is the strongest call on the page.

### Neutral
- **Paper White** (ground): the page ground, the clock face, the Deck's Email block, outline-key fill. Also the browser theme colour.
- **Running Grey** (ink-soft): long-form running text, the hero introduction, principle bodies, Experience descriptions.
- **Meta Grey** (ink-2): meta text, years, org lines, section intros, inactive header nav, captions, the © line. 5.7:1 on white.
- **Hairline Grey** (rule): every 1px divider on the white ground, underlines on quiet text links at rest, the header's bottom rule.
- **Panel Black** (panel): the three black surfaces: the dial window, the About section, the phone Deck. Also the clock housing.
- **Panel White** (panel-ink): text and marks on panels: the needle, the today tick, active bands, active Deck items. Reduced to 55-85% opacity for inactive or secondary text on panels (dial legends 65%, inactive bands 55%, Deck items 60%, About body 75%, spec labels 60%).
- **Panel Grey** (panel-mute): non-text marks on panels only: quarter-year graduations, the scale baseline, inactive band bars.
- **Panel Hairline** (panel-rule): dividers between rows of the About spec plate.

State shades: solid keys darken to ink-hover on hover; outline keys fill with ground-hover; the Deck's Email block presses to #e6e6e6.

### Named Rules
**The No Accent Rule.** There is no accent colour. Nothing is orange, yellow, blue or any hue; emphasis is black, size and weight. If a new element "needs a colour", it needs a panel, a weight, or more space instead.

**The Three Panels Rule.** Black panels are instruments, not decoration: the dial window, the About plate and the phone Deck (plus the clock housing). A new section does not go black to create rhythm.

## Typography

**Display Font:** Switzer (with ui-sans-serif, system-ui, sans-serif), served from the Fontshare CDN
**Body Font:** Switzer, the same family

**Character:** A neutral, slightly warm grotesk used the way a manual uses it: medium for anything you scan, regular for anything you read, tight negative tracking only at display sizes.

### Hierarchy
- **Display** (500, clamp 42-88px, line-height 1, -0.028em): the H1 only. Spans the full measure; two lines on desktop, three on phones.
- **Headline** (500, clamp 34-56px, line-height 1.04, -0.022em): section headings (Experience, How I work, Contact).
- **Title** (500, clamp 24-32px, line-height 1.15, -0.015em): Experience entry titles.
- **Lead** (400, clamp 19-22px, line-height 1.5): the hero introduction and section intros, 32-46ch measure.
- **Body** (400, 17px, line-height 1.62): running text, 56-62ch measure.
- **Label** (400, 15px, line-height 1.45): the smallest general text: meta, years, org lines, captions, spec labels, Deck items, small keys. Always sentence case.
- **Legend** (400, 13px, 20px line): instrument legends only: the dial's year scale and, on phones, its band names.

Component-specific sizes set in the build: principle titles at 22px/500/-0.015em, the About statement at clamp 30-52px/500/-0.028em, and the Contact email address at clamp 34-88px/500/-0.035em. Keys use 16px/500.

### Named Rules
**The Fifteen Pixel Floor.** Nothing is set below 15px (label). The one exception is the 13px legend, and it lives only on the tuning dial.

**The Sentence Case Rule.** Every label, key, nav item and heading is sentence case. No uppercase labels, no letter-spaced caps, no eyebrows above headings.

**The Two Weights Rule.** Switzer 500 for display, titles, names and keys; 400 for everything read. No other weights.

## Layout

Mobile is the primary composition and is checked first.

- **Container:** the wrap utility, max 1240px, centred, with gutters of 20px (phones), 32px (from 40rem) and 48px (from 64rem). Gutters are max(gutter, safe-area inset) so nothing sits under a notch (viewport-fit=cover).
- **Grid:** single column on phones; 12 columns with 32px column gaps from 48rem. The H1 takes 11 columns (10 at xl), the hero text 6, the clock 4 at the right edge.
- **Rhythm:** sections pad 80px top and bottom on phones and 144px from 48rem. Entries and principle rows are separated by hairlines with 28-64px inner padding.
- **Device variants:** `phone` is max-width 47.99rem, or max-height 32.5rem with a coarse pointer (landscape phones). `not-phone` is its complement. `short` is max-height 32.5rem: sticky elements unpin.
- **Chrome:** `--chrome-top` is 0 on phones (the header scrolls away) and the 64px header height on larger screens (header fixed). Section anchors scroll-margin by it; the dial pins to it.
- **Phone navigation** moves from the header to the bottom Deck; the hero clock sits under the keys, left-aligned with the text column, cut at the fold on 360x740 by design.

## Elevation & Depth

The system is flat. There is no box-shadow, drop-shadow or text-shadow anywhere. Depth is expressed by inversion (black panels on white paper) and by 1px hairlines. Stacking is real but invisible: the fixed header and the bottom Deck simply cover content. The one gradient is functional: a short fade from ground to transparent under the pinned dial on phones, so text never appears sliced as it scrolls beneath.

### Named Rules
**The Printed Flat Rule.** Nothing floats. If an element needs to separate from what is behind it, give it a solid ground or a panel and a hairline, never a shadow.

## Shapes

Every edge is square: keys, the dial window, the Deck, the BrandMark tile, the About plate, focus outlines. The clock is the single rounded object, after the Braun AB 1: a black housing with corners at 13% of its width, a circular white face, a round centre pin and 1px-rounded hand ends. Rules are 1px; active indicators are 2px (Deck) or 1px (header nav); the dial's active band is 3px. The needle is a 2px line under a small downward triangle.

### Named Rules
**The One Round Object Rule.** Radius belongs to the clock and everything inside it. Nothing else gets rounded corners, pills or circles.

## Components

### Keys
Flat, square, and the only things on the page that look pressable.
- **Shape:** square (0px).
- **Solid:** ink block, ground text, 48px tall, 20px side padding, 16px Switzer 500, 12px icon gap. Hover darkens to ink-hover. The primary action.
- **Outline:** ground fill with a 1px inset ink ring; hover fills ground-hover. The secondary action (Copy address).
- **Small:** 40px tall, 16px padding, 15px text: the header's Contact key.
- **Press:** a 1px downward nudge on tap. Colour transitions 150ms.
- **Copy key:** outline, minimum 184px wide; the label swaps "Copy address" to "Copied" (Copy glyph to Checkmark) with a 6px vertical cross-fade over 180ms, and announces through a polite live region.

### Text links
Quiet links ("See my experience", LinkedIn) carry a hairline-grey underline that darkens to ink on hover; offset 0.22em, 1px thick. The Contact email address is the one display-size link, with a 2px underline.

### Navigation
- **Header:** a white strip, 64px tall, the BrandMark and name at left, nav items at right in Meta Grey that turn ink when active. A 1px ink underline marks the active section and slides between items on a spring. A small solid Contact key ends the row. A hairline closes the strip. Fixed from tablet up; scrolls away on phones.
- **Phone Deck:** a full-width black bar, 56px tall, at the bottom edge inside the safe area. Three text links in 15px (60% white inactive, full white active) with a 2px white line along the top of the current item, then a white Email block flush right in ink, 500 weight. It rises on a spring once the hero keys leave the view and steps aside when the Contact keys arrive.

### Clock (signature)
A monochrome Braun travel clock telling live New York time. Black rounded housing, flat white face, 60 bar indices (hour marks heavy), black hour, minute and thin second hands, a round black pin. Caption below in Meta Grey with the time in ink and tabular figures: "1:06 PM EDT in New York". 208px wide on phones (240px from 40rem), the full 4-column width up to 352px on desktop.

### Tuning Dial (signature)
Experience read as a radio scale. A square black window pinned under the chrome, holding a year scale (13px legends, abbreviated to '19 on phones), long year and short quarter graduations, and a 2px white tick at today. Roles are bands on two lanes: a label printed on a panel knockout over a 2px grey bar; the active band turns white with a 3px bar. Each band is a link with a 44px hit area. A white needle glides to the middle of the role in view on a soft spring.

### Experience entries
A hairline that draws in, then years (meta, tabular) in the left 3 columns, and in the right 9 the title, the org line (meta) and the description in Running Grey. No tags, no markers.

### Spec plate and contact facts
Definition lists ruled top and bottom with hairlines between rows, no box. About's plate sits on the panel with 60% white labels and white values. Contact's facts (LinkedIn, Based in, Local time) sit on white with meta labels; on phones the label stacks above the value, from 40rem they sit side by side in a 144px label column.

### BrandMark
"AJ" in Switzer Medium outlines, knocked out of a square ink tile so the ground shows through. 28px in the header; the favicon is the same tile in #111111 with white letters.

### Icons
Iconoteka (iconoteka-react) at the medium weight, 18px by default, aria-hidden. Only ArrowUpRight (email and external), ArrowDown (to Experience), Copy and Checkmark (copy key).

### Footer
The © line only, in meta.

### Motion
One ease, an expo-out (cubic-bezier(0.16, 1, 0.3, 1)). The H1 rises out of a clip mask over 1.1s. The clock's hands sweep from twelve to the current time over 1.8s after 0.55s, then tick on a stiff spring. The dial needle springs (stiffness 70, damping 17). Hairlines draw left to right over 1.1s on entering view. The Deck enters on a spring (420/40); nav indicators slide on a spring (380/34). The hero text and clock drift slightly with scroll. All of it honours reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep the palette black, white and grey: ground, ink, ink-soft, ink-2, rule, and the panel set. The system has no accent colour.
- **Do** make emphasis with Switzer 500, size and space.
- **Do** set every label in sentence case at 15px or larger; reserve 13px legend for the tuning dial.
- **Do** use square edges, 1px hairlines and flat black or 1px-outlined keys.
- **Do** design the phone composition first and check `phone`, `not-phone` and `short` states, including landscape phones.
- **Do** keep icons to Iconoteka medium at 18px, and only where a glyph says something a word cannot.
- **Do** keep keys 48px tall and give small touch targets 44px hit areas, as the dial bands do.

### Don't:
- **Don't** introduce an accent colour of any hue, including orange, yellow or "just for the CTA".
- **Don't** use a grey or tinted page ground; the ground is white.
- **Don't** round corners on anything but the clock: no pill buttons, rounded cards or circular avatars.
- **Don't** add shadows of any kind.
- **Don't** use uppercase or letter-spaced labels, eyebrows or kickers above headings.
- **Don't** set text below 15px outside the dial.
- **Don't** add decorative dots, status markers, chips, tags or cards.
- **Don't** add a second typeface, a mono face, or Switzer weights other than 400 and 500.

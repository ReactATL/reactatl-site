---
version: alpha
type: Design System
name: ReactATL — Editorial Dark
description: A dark-first developer-community landing page; near-black canvas, near-white editorial display type, one handwritten accent, and atmospheric gradient blobs that carry all the color from behind glass.
timestamp: 2026-07-24T00:00:00Z
colors:
  background: 'oklch(0.08 0 0)'
  foreground: 'oklch(0.98 0 0)'
  card: 'oklch(0.12 0 0)'
  secondary: 'oklch(0.18 0 0)'
  muted: 'oklch(0.25 0 0)'
  muted-foreground: 'oklch(0.65 0 0)'
  border: 'oklch(0.2 0 0)'
  destructive: 'oklch(0.396 0.141 25.723)'
  accent-cyan: '#06b6d4'
  accent-blue: '#3b82f6'
  accent-orange: '#fb923c'
  accent-amber: '#fcd34d'
  accent-emerald: '#10b981'
  accent-green: '#4ade80'
  accent-pink: '#ec4899'
  accent-rose: '#fb7185'
  link: '#22d3ee'
typography:
  display:
    fontFamily: Geist
    fontSize: 'clamp(2.5rem, 8vw, 6rem)'
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: -0.025em
  h1:
    fontFamily: Geist
    fontSize: 'clamp(2.5rem, 6vw, 4rem)'
    fontWeight: 900
    lineHeight: 1
    letterSpacing: -0.025em
  h2:
    fontFamily: Geist
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.3
  stat:
    fontFamily: Geist
    fontSize: 3rem
    fontWeight: 900
    lineHeight: 1
  eyebrow:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.3em
  meta:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.05em
  body:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  script:
    fontFamily: Caveat
    fontSize: 1.875rem
    fontWeight: 400
    lineHeight: 1.2
spacing:
  container: 80rem
  prose: 56rem
  article: 48rem
  gutter-x: 1rem
  gutter-x-md: 1.5rem
  section-y: 4rem
  card-pad: 1.25rem
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
components:
  pill:
    rounded: '{rounded.full}'
    padding: '0.5rem 1rem'
    typography: '{typography.meta}'
  pill-active:
    backgroundColor: '{colors.foreground}'
    textColor: '{colors.background}'
  card:
    backgroundColor: 'color-mix(in oklch, {colors.card} 50%, transparent)'
    rounded: '{rounded.lg}'
    padding: '{spacing.card-pad}'
  card-dark:
    backgroundColor: '{colors.foreground}'
    textColor: '{colors.background}'
  button-primary:
    backgroundColor: '{colors.foreground}'
    textColor: '{colors.background}'
    rounded: '{rounded.full}'
    padding: '0.75rem 1.5rem'
  button-outline:
    backgroundColor: transparent
    textColor: '{colors.foreground}'
    rounded: '{rounded.full}'
---

# ReactATL — Editorial Dark

> The design system for the ReactATL website. The prose is the source of truth;
> the tokens above are context (real values pulled from `src/styles/global.css`,
> the font links in `src/layouts/Layout.astro`, and the component classes), not
> rendering instructions. When a token and the code disagree, the code wins and
> this file is corrected.

## Overview

A **dark-first landing page for a developer community** — the aesthetic of a
modern engineering-brand microsite (think a conference or dev-tool homepage),
not a corporate marketing site or a document. The page is a near-black stage on
which near-white, condensed, uppercase display type does the talking, warmed by a
single handwritten script line and lit from behind by soft, out-of-focus color.

The audience is working developers deciding whether to show up to a meetup. The
page should feel **confident, energetic, and a little editorial** — like a poster
for a good show. Color is atmospheric, never decorative-per-element: it lives in
blurred gradient blobs *behind* the content, so the foreground stays crisp,
monochrome, and legible. The type carries the personality; the color carries the
mood.

It is dark-first by construction: `<html class="dark">` is always set
(`src/layouts/Layout.astro`), and a light token set exists in `:root` but is not
currently shipped as a user-facing mode.

## Colors

A **monochrome foreground + multi-hue atmospheric accent** system. Every neutral
is achromatic OKLCH (`oklch(L 0 0)`, zero chroma) — the "color" only ever comes
from Tailwind gradient utilities used as background light.

- **Background** {colors.background} is the canvas — a near-black warm-neutral, never pure `#000`.
- **Foreground** {colors.foreground} is a near-white that carries all typography, borders as inversions, and the "dark" inverted cards; never pure white.
- **Card** {colors.card} sits just above the canvas; surfaces render it at ~50% opacity over the background (`bg-card/50`) so the blobs behind glow through the glass.
- **Border** {colors.border} is the hairline that does most of the structural work in this flat system (section dividers, card outlines, pill outlines).
- **Muted foreground** {colors.muted-foreground} is for eyebrows, metadata, nav links, and secondary prose.
- **Accents** — {colors.accent-cyan}/{colors.accent-blue}, {colors.accent-orange}/{colors.accent-amber}, {colors.accent-emerald}/{colors.accent-green}, {colors.accent-pink}/{colors.accent-rose} are the four Tailwind gradient-blob pairs (from the Hero palette). They appear **only** inside blurred, low-opacity (`/10`–`/40`) `blur-3xl` blobs behind content and behind the "dark" Stats card. They never touch typography, borders, buttons, or metadata.
- **Link** {colors.link} (Tailwind `cyan-400`) is the one sanctioned use of hue on text: inline anchors inside long-form prose (`About`, event body). Reserve it for real inline links, not UI.

## Typography

Two families, loaded from Google Fonts: **Geist** (weights 400/500/700/900) for
everything structural, and **Caveat** (400/700) as a single handwritten accent.
There is no serif and no dedicated monospace — Geist is the whole voice.

- **Display / headings** ({typography.display}, {typography.h1}) — Geist **Black (900)**, `uppercase`, tight negative tracking, tight leading, and fluid `clamp()` sizing. This is the signature move: big, condensed, shouting-but-controlled. The hero title runs to `6rem`; page titles to `4rem`.
- **Eyebrows / section labels** ({typography.eyebrow}) — small, `uppercase`, weight 500, with **wide `0.3em` letter-spacing** and muted color ("REACTATL PRESENTS", "ABOUT US"). The wide tracking is the counter-move to the tight display tracking — the two together define the type system.
- **Metadata** ({typography.meta}) — `text-xs`, `uppercase`, `tracking-wider`, muted; dates, times, locations, tags on cards.
- **Body** ({typography.body}) — Geist Regular, generous `1.7` line-height for long-form readability (`.event-content`, `About`).
- **Stats** ({typography.stat}) — Geist Black at `3–3.75rem` for the big community numbers.
- **Script accent** ({typography.script}) — **Caveat**, used **sparingly** for a single warm human line (the hero subtitle). It is seasoning, never structure.

Modest size ratios do the work; hierarchy comes from weight (900 vs 400),
case (uppercase vs sentence), and tracking — not from a huge type scale.

## Layout

A centered, max-width column layout on a fixed page frame.

- The page frame is a `grid grid-rows-[auto_1fr_auto]` (sticky header, growing main, footer) on `min-h-screen` (`src/layouts/Layout.astro`).
- Content is centered in a **{spacing.container}** (`max-w-7xl`) container for the homepage/archive; long-form narrows to **{spacing.prose}** (`max-w-4xl`, About) and **{spacing.article}** (`max-w-3xl`, event detail) for reading measure.
- Horizontal gutters are `px-4` ({spacing.gutter-x}) on mobile, `px-6` ({spacing.gutter-x-md}) at `md`. Vertical section rhythm is responsive (`py-12`/`py-16`/`py-24`).
- Spacing follows Tailwind's default **4px-base** scale; don't introduce off-scale magic numbers.
- Events use a **bento grid** — mixed card sizes (`small`/`medium`/`large`), with the featured/large tiles anchoring the composition.
- Sections are separated by `border-t border-border`, not by heavy spacing or background changes alone.

## Elevation & Depth

**Flat by design — no drop shadows.** Depth is built from three devices, in order of importance:

1. **Hairline borders** ({colors.border}) — the primary separator for cards, sections, and pills.
2. **Glassmorphism** — `bg-card/50 backdrop-blur-sm` on light cards and `bg-background/90 backdrop-blur` on the sticky header: translucent surfaces that let the blobs bleed through.
3. **Atmospheric gradient blobs** — large `rounded-full` + `blur-3xl` color fields positioned absolutely behind content; they create a sense of space and light without any shadow.

For emphasis, **invert instead of elevate**: the "dark" card variant (`bg-foreground text-background` — a near-white card in a dark room) is how a tile is promoted, not a shadow or a glow. The shadcn `Button` component (`src/components/ui/button.tsx`) ships with `shadow` utilities but is **not** used in the page UI — the site's own button language is the flat pill below.

## Shapes

Two radii, used consistently:

- **`rounded-lg` = {rounded.lg}** for every surface: cards, images, stat tiles, containers. This is the default "box" radius.
- **`rounded-full` = {rounded.full}** for every interactive control and small round motif: category pills, CTA/RSVP buttons, the logo chip, the card hover arrow.

Gradient blobs are perfect circles (`rounded-full`) rendered soft by `blur-3xl`.
Don't mix in intermediate radii on the same surface, and don't ship 0-radius
(sharp) boxes — the language is "soft rectangle or full pill", nothing between.

## Components

- **Category pill** (`CategoryPill.tsx`) — `rounded-full` outline button. **Inactive**: `border-border`, transparent, `hover:bg-foreground/10`. **Active**: inverted — `bg-foreground text-background`. This inversion is the selection signal across the whole UI.
- **CTA / RSVP button** — the same pill language at a larger size. **Primary**: filled inverted (`bg-foreground text-background`, `hover:bg-foreground/90`). **Secondary/outline**: `border-foreground` transparent, `hover:` inverts to filled. The header "Join Community" and the event detail's primary RSVP both use this.
- **Bento event card** (`BentoEventCard.tsx`) — `rounded-lg border` tile with two blurred accent blobs behind the content (accent chosen by `accent % 4` so neighbors differ), uppercase meta row, Black title, and a `rounded-full` arrow chip that scales on hover. **light** variant = glass (`bg-card/50 backdrop-blur-sm`); **dark** variant = inverted (`bg-foreground text-background`). Tiles never carry a per-event photo — hero images live only on the detail page.
- **Stat card** (`Stats.astro`) — glass card, big Black numeral + muted uppercase label; one tile per row is promoted to the inverted dark variant.
- **Long-form prose** (`.event-content`) — `1.7` line-height, `700`-weight headings, underlined links; the one place body text and inline color links appear.

## Do's and Don'ts

- **Do** keep the page dark-first. `<html class="dark">` stays on; don't add a theme toggle without a design decision.
- **Do** let color come from blurred background blobs. Their softness and scarcity on the foreground is what makes the page feel lit rather than painted.
- **Do** carry personality with type: Geist **Black + uppercase + tight tracking** for display, weight-500 **uppercase + `0.3em` tracking** for eyebrows.
- **Do** invert (foreground↔background) to promote an element — active pills, primary buttons, featured cards.
- **Do** use `rounded-full` for controls and `rounded-lg` for surfaces, and stick to the 4px spacing scale.
- **Do** leave visible breathing room; sections separated by hairline borders, not clutter.
- **Don't** put accent hues on typography, borders, buttons, page chrome, or metadata. The sole exception is inline `cyan-400` links inside long-form prose.
- **Don't** add drop shadows, glows, or heavy elevation — depth is borders + glass + blobs. (The shadcn `Button` shadows are unused; don't reach for them in page UI.)
- **Don't** use Caveat for anything structural. One warm handwritten line per view, maximum.
- **Don't** introduce a third font family or a serif; Geist + Caveat is the whole system.
- **Don't** mix radii on one surface or ship sharp 0-radius boxes.
- **Don't** use bright saturated fills as solid backgrounds — accent color is always gradient + low-opacity + blurred.

# Citations

[1] `src/styles/global.css:5-76` — OKLCH neutral tokens (`:root` + `.dark`), `--radius` scale, `@theme` font families.
[2] `src/layouts/Layout.astro:94-101` — Geist (400/500/700/900) + Caveat (400/700) font loading; `:26` — `class="dark"`; `:104` — page-frame grid.
[3] `src/components/Hero.astro:8-50` — gradient-blob palette, `clamp()` display type, `0.3em` eyebrow, Caveat accent.
[4] `src/components/ui/BentoEventCard.tsx:7-12,42-115` — accent pairs, light/dark variants, glass, hover arrow.
[5] `src/components/ui/CategoryPill.tsx:14-19` — active-inversion pill; `src/components/Header.astro:42-49` — outline CTA pill.
[6] `src/components/Stats.astro:22-52` — glass stat cards + inverted dark card.
[7] `src/components/ui/button.tsx:5-33` — shadcn Button variants (available, unused in page UI).
[8] `src/components/About.astro:19-62` — eyebrow, long-form body, `cyan-400` inline links.

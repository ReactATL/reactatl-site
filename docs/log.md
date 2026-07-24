# Change Log

## 2026-07-24 — Added DESIGN.md design system

Authored `docs/DESIGN.md` (DESIGN.md format: token frontmatter + prose) capturing the
site's actual visual language, derived from ground truth (`src/styles/global.css`,
`src/layouts/Layout.astro` font loads, and component classes) — not invented:

- Palette is achromatic OKLCH neutrals (zero chroma); all hue lives in blurred,
  low-opacity Tailwind gradient blobs behind glass. Fonts: Geist (400/500/700/900) +
  Caveat (400/700). Flat depth (borders + glass + blobs, no shadows). `rounded-full`
  controls, `rounded-lg` (8px) surfaces. Dark-first (`<html class="dark">`).
- Enrolled under `# Knowledge` in `index.md` (custom OKF `type: Design System`);
  cross-linked from `SYSTEM_DESIGN.md` §3/§15; added a Conventions rule + a UI intent
  hint to `AGENTS.md` so UI work routes to DESIGN.md.
- Verified `pnpm build` still succeeds (27 pages).

Docs-freshness: head=00521a95b91a25948c99d7f03dde098acbc253aa date=2026-07-24 pass=maintain

## 2026-07-24 — Bundle established

Stood up the `docs/` OKF knowledge bundle for the ReactATL website (software-project
type, single-file spine — no decomposed concepts per anti-over-sharding).

- Created `docs/SYSTEM_DESIGN.md` (16-section spine), `docs/index.md`, `docs/log.md`.
- Leaned `AGENTS.md` from a ~156-line architecture dump into a router: relocated the
  `src/` structure tree, content-collections detail, frontmatter spec, category map,
  component/variant catalog, routes, and styling depth into `SYSTEM_DESIGN.md`; kept
  Quick Start, a short Architecture Summary, repo-wide Conventions, a Project Policies
  stub (flagged for maintainer customization), and the Docs pointer.
- Fixed stale-doc drift found during validation (code is ground truth):
  - Astro version: docs said "Astro 5"; installed is **7.1.3** → corrected in README + AGENTS.md.
  - Category tag map: README/AGENTS.md listed tags (`Wellness`, `Mobile`, `Open Source`,
    `Security`) and placements not in `src/types/events.ts` → corrected to code truth.
  - YouTube link: README used a stale `/channel/…` URL → corrected to `@ReactATL` (matches `socials.json`).
- Deleted the root `reference/` folder (Next.js/v0 design prototype, build-excluded) at
  maintainer request — no longer needed.
- Verified: 25 event `.md` files + 25 images, 4 socials entries, no tests/CI, no SSR adapter.

Docs-freshness: head=76eb755704af8b858c5fb77f3fea9a21b203c3e5 date=2026-07-24 pass=establish

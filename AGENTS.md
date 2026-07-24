# ReactATL Website

> Statically-generated community site for ReactATL (Atlanta's React meetup): event
> listings with category filtering, SEO-rich per-event detail pages, and in-repo
> Markdown event content imported from Meetup.

Last updated: 2026-07-24

## Project Overview

An Astro static site (React islands for interactivity). Event content is **owned
in-repo** as one Markdown file per event under `src/content/events/`, not fetched at
build time. No backend, no database, no server runtime.

## Quick Start

```bash
pnpm dev            # Dev server at localhost:4321
pnpm build          # Static build to ./dist/
pnpm preview        # Preview the production build
pnpm import:events  # SIDE EFFECT: fetches Meetup HTML over the network and
                    #   writes/overwrites src/content/events/*.md + images/*.jpeg.
                    #   Add one event: node scripts/import-meetup.mjs <meetupUrl> [--luma=<lumaUrl>]
```

There is no separate lint or test command — see Conventions.

## Architecture (Summary)

- **Astro 7** static generator + **React 19** islands (`@astrojs/react`), **Tailwind CSS 4**, **TypeScript**.
- Content lives in two Astro collections (`src/content.config.ts`): `events` (glob of `*.md`) and `socials` (`src/data/socials.json`).
- `src/lib/events.ts#getEventList()` is the one serializable `Event[]` source; it derives `upcoming` and ET date/time labels (`src/lib/dates.ts`) — those are never stored in frontmatter.
- `FilterableEvents` (island) filters via `matchesCategory` (`src/types/events.ts`) and renders `BentoEventCard`/`CategoryPill`.
- Routes: `/` (homepage, 8 past events), `/events` (full archive), `/events/<slug>` (detail page with JSON-LD + RSVP links).
- `scripts/import-meetup.mjs` is the build-excluded ingestion tool.

For details: `docs/SYSTEM_DESIGN.md`.

## Conventions

Rules that apply across the repo:

- **Path alias** — import from `src/` with `@/` (e.g. `@/lib/utils`, `@/types/events`).
- **Class merging** — use `cn()` from `@/lib/utils`; component variants follow shadcn/ui + CVA patterns (`clsx`, `tailwind-merge`).
- **Styling** — dark-first OKLCH design (`class="dark"` on `<html>`); use theme classes (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`) defined in `src/styles/global.css`, not raw colors.
- **Icons** — `<Icon name="lucide:…" />` / `simple-icons:…` from `astro-icon/components` in `.astro`; `lucide-react` in React islands.
- **Components** — `.astro` files are server-rendered (no client JS); React components are islands and need a `client:*` directive to hydrate.
- **Design** — any UI work (new components, pages, styling) must follow the design system in `docs/DESIGN.md`: dark-first, achromatic neutral tokens with color only in blurred gradient blobs, Geist Black uppercase display type, flat (borders + glass, no shadows), `rounded-full` controls / `rounded-lg` surfaces.
- **No linter, no test suite, no CI** are configured. Don't invent a required gate; the available checks are `pnpm exec astro check` (types) and `pnpm build` (full smoke build).

## Docs

Start here: `docs/SYSTEM_DESIGN.md`. Full map: `docs/index.md`.

| When working on... | Read first |
|---|---|
| UI, components, styling, visual/UX changes | `docs/DESIGN.md` |

## Project Policies

<!-- PLACEHOLDER — customize for your team. These are reasonable defaults, not verified working agreements. -->

- **Commits** — Conventional Commits (`feat:`, `fix:`, `chore:`).
- **Dependencies** — pin as `package.json` does; discuss before adding new runtime deps.
- **Secrets** — none belong in this repo; the site handles no secrets or user input at runtime.
- **AI assistants** — may create/modify code and content; run `astro check` + `pnpm build` before considering a change done; update the relevant `docs/` concept (not this file) for durable knowledge.

## Documentation Maintenance

When making significant changes:

1. Update the **relevant doc** in `docs/` (usually `SYSTEM_DESIGN.md`), not this file.
2. If a doc is created, moved, or deleted, update `docs/index.md` in the same change.
3. Update the intent hints / pointer above only when the routing itself changes.
4. Rewrite to current state — don't append dated sections (`docs/log.md` is the change history).
5. When docs and code disagree, the code is the source of truth — fix the doc and note the drift in `docs/log.md`.
6. Bump `Last updated` on docs that carry it (docs only, not code).

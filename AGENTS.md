# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Build Commands

```bash
pnpm dev            # Start dev server at localhost:4321
pnpm build          # Build for production to ./dist/
pnpm preview        # Preview production build locally
pnpm import:events  # Fetch Meetup content → src/content/events/*.md + images
```

## Architecture

This is a community website for ReactATL (Atlanta's React developer meetup) built with:

- **Astro 5** - Static site generator with islands architecture
- **React 19** - For interactive components (via @astrojs/react)
- **Tailwind CSS 4** - Styling via @tailwindcss/vite plugin
- **shadcn/ui patterns** - Component styling with CVA, clsx, tailwind-merge
- **astro-icon** - Icon components using Iconify (lucide and simple-icons sets)

### Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── BentoEventCard.tsx  # Event card (React) - light/dark variants, small/medium/large sizes, cycling gradient-blob accents
│   │   ├── CategoryPill.tsx    # Filter button (React) - active/inactive states
│   │   └── button.tsx          # shadcn/ui button (React) - multiple variants
│   ├── About.astro             # About section with community description
│   ├── FilterableEvents.tsx    # Main interactive component - event grid with category filtering, optional pastLimit cap
│   ├── Header.astro            # Sticky navigation with logo and CTA
│   ├── Hero.astro              # Hero section with gradient blobs and Caveat font
│   ├── Stats.astro             # Community statistics cards
│   └── Footer.astro            # Footer with social links
├── content/
│   └── events/                 # One Markdown file per event (rich body + frontmatter)
│       ├── <slug>.md           # Imported from Meetup by scripts/import-meetup.mjs
│       └── images/<slug>.jpeg  # Co-located hero images (build-optimized via Astro image())
├── data/
│   └── socials.json            # Social media links (Meetup, Discord, Bluesky, YouTube)
├── layouts/
│   └── Layout.astro            # Base HTML layout with Header/Footer, SEO meta tags
├── lib/
│   ├── utils.ts                # cn() class merging
│   ├── dates.ts                # formatEventDate() → ET date/time labels
│   └── events.ts               # getEventList() → collection mapped to serializable Event[] w/ optimized images
├── pages/
│   ├── index.astro             # Homepage - getEventList(), FilterableEvents capped at 8 past
│   └── events/
│       ├── index.astro         # Full archive - all events, no cap
│       └── [...slug].astro     # Event detail page - description, image, JSON-LD, dual RSVP buttons
├── styles/
│   └── global.css              # OKLCH color system + Tailwind theme + .event-content article styles
├── types/
│   └── events.ts               # Event interface, categories, CATEGORY_TAG_MAP, matchesCategory()
└── content.config.ts           # Astro content collections schema (Zod)

scripts/
└── import-meetup.mjs           # Meetup __NEXT_DATA__ importer → writes event .md files + hero images
```

### Content Collections

The `socials` collection is loaded from `src/data/socials.json` via `file()`. The `events` collection is loaded from `src/content/events/*.md` via `glob()` — each event is a Markdown file: typed frontmatter + a rich Markdown body (the full description). Schemas live in `src/content.config.ts`. Access via `getCollection("events")` / `getCollection("socials")`; prefer the `getEventList()` helper (`src/lib/events.ts`) for the serializable, image-optimized, sorted `Event[]` consumed by the UI.

**Events are owned in-repo, not fetched at build time.** `pnpm import:events` (`scripts/import-meetup.mjs`) fetches each Meetup event's embedded `__NEXT_DATA__` and writes/refreshes the `.md` files + co-located hero images. Re-runs preserve curation (tags/featured/subtitle/primaryPlatform) and stable slugs via the frontmatter `meetupId`. Add a new event with `node scripts/import-meetup.mjs <meetupUrl> [--luma=<lumaUrl>]`.

**Events frontmatter fields:**
- `title`, `description` (short excerpt for OG/meta), `date` (ISO), `endDate` (optional), `location` - Event details; full body is the Markdown after the frontmatter
- `meetupUrl` / `lumaUrl` - RSVP links; **at least one required** (Zod refine). `primaryPlatform` (`"meetup"|"luma"`, optional) picks the filled RSVP button; default is Luma when present, else Meetup
- `heroImage` (co-located `./images/<slug>.jpeg` via `image()`), `heroImageAlt` - optional hero
- `tags` (string array), `featured` (boolean) - filtering/highlighting
- `meetupId`, `host`, `subtitle` - source id / organizer / optional subtitle

`upcoming` and display date/time labels are **derived** in `getEventList()` (not stored): `upcoming = date >= now`, labels via `formatEventDate()` in ET.

**Event Categories:**
Categories are defined in `src/types/events.ts` with a tag mapping:
- All Events, React, Community, Leadership, AI, Career
- Tags like "Remix", "React Native" map to React category
- Tags like "Social", "Wellness" map to Community category

### Component Patterns

**Astro Components (Static):**
- Header, Hero, About, Stats, Footer - Server-rendered, no client JS
- Use Astro's component syntax with frontmatter for data

**React Components (Interactive):**
- FilterableEvents - Main island, uses `client:load` directive
- BentoEventCard, CategoryPill - Child components rendered within the island
- Use standard React hooks (useState) for interactivity

**Routes:**
- `/` (`index.astro`) - homepage, past events capped at 8 with a "View all" link
- `/events` (`events/index.astro`) - full archive, all events, category filter, no cap
- `/events/<slug>` (`events/[...slug].astro`) - detail page: hero image, rendered Markdown body (`.event-content`), meta, up to two RSVP buttons (Luma/Meetup), and schema.org `Event` JSON-LD. All event cards link here (internal), never straight to Meetup/Luma.

### Styling Patterns

**Color System (OKLCH):**
- Dark-first design with `class="dark"` on `<html>`
- CSS variables defined in `global.css`: `--background`, `--foreground`, `--card`, `--muted`, `--border`, etc.
- Use Tailwind classes: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`

**Component Styling:**
- Use `cn()` utility from `@/lib/utils` for conditional class merging
- shadcn/ui patterns with class-variance-authority (CVA) for component variants
- Glassmorphism effect: `bg-card/50 backdrop-blur-sm`
- Gradient blobs: Positioned absolute divs with `blur-3xl` and gradient backgrounds

**Typography:**
- Geist font for body text
- Caveat font for script/decorative text: `style="font-family: 'Caveat', cursive;"`
- Fluid sizing with clamp: `text-[clamp(2.5rem,8vw,6rem)]`
- Uppercase headings with tight tracking: `uppercase tracking-tight font-black`

**BentoEventCard variants:**
- `variant`: `"light"` (glassmorphism) | `"dark"` (inverted, white bg)
- `size`: `"small"` | `"medium"` | `"large"`
- `accent` (number): selects a two-blob gradient backdrop from the Hero palette (cyan/blue, orange/amber, emerald/green, pink/rose); cards cycle through variants (`accent % 4`) so adjacent tiles differ. Tiles carry no per-event photo — hero images are used only on the detail page.

**CategoryPill states:**
- `isActive`: true (cyan background) | false (transparent with border)

### Icons

Use `<Icon name="lucide:icon-name" />` or `<Icon name="simple-icons:brand-name" />` from astro-icon/components.

### Path Aliases

Use `@/` to import from `src/`:
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Event } from "@/types/events"
```

## Documentation Maintenance Standards

### Keep Documentation Current

When making significant changes, update relevant documentation:
- **AGENTS.md** - Project-wide conventions and architecture
- **README.md** - Setup instructions, current features, usage examples

### Living Documentation Philosophy

- **Rewrite, don't append** - Update existing content rather than adding dated sections
- **Remove completed/obsolete information** - Don't strike through or mark as "old"
- **Keep documentation fresh** - Focus on what users need to know now

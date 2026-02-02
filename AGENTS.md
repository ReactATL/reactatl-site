# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Build Commands

```bash
pnpm dev      # Start dev server at localhost:4321
pnpm build    # Build for production to ./dist/
pnpm preview  # Preview production build locally
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
│   │   ├── BentoEventCard.tsx  # Event card (React) - light/dark variants, small/medium/large sizes
│   │   ├── CategoryPill.tsx    # Filter button (React) - active/inactive states
│   │   └── button.tsx          # shadcn/ui button (React) - multiple variants
│   ├── About.astro             # About section with community description
│   ├── FilterableEvents.tsx    # Main interactive component - event grid with category filtering
│   ├── Header.astro            # Sticky navigation with logo and CTA
│   ├── Hero.astro              # Hero section with gradient blobs and Caveat font
│   ├── Stats.astro             # Community statistics cards
│   └── Footer.astro            # Footer with social links
├── data/
│   ├── events.json             # Event data (upcoming/past flag, tags, featured)
│   └── socials.json            # Social media links (Meetup, Discord, Bluesky, YouTube)
├── layouts/
│   └── Layout.astro            # Base HTML layout with Header/Footer, SEO meta tags
├── lib/
│   └── utils.ts                # Utility functions (cn for class merging)
├── pages/
│   └── index.astro             # Homepage - loads events and renders FilterableEvents
├── styles/
│   └── global.css              # OKLCH color system + Tailwind theme config
├── types/
│   └── events.ts               # Event interface, categories, CATEGORY_TAG_MAP, matchesCategory()
└── content.config.ts           # Astro content collections schema (Zod)
```

### Content Collections

Events and socials are managed via Astro's content collections with Zod schemas defined in `src/content.config.ts`. Access data using `getCollection("events")` or `getCollection("socials")`.

**Events schema fields:**
- `title`, `description`, `date`, `time`, `location`, `link` - Event details
- `upcoming` (boolean) - Determines if shown in Upcoming or Past sections
- `tags` (string array, optional) - Category tags for filtering and display
- `featured` (boolean, optional) - For highlighting events as large cards

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
- `variant`: `"light"` (glassmorphism) | `"dark"` (inverted with gradient accents)
- `size`: `"small"` | `"medium"` | `"large"`

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

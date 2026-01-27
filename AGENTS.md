# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Build Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

This is a community website for ReactATL (Atlanta's React developer meetup) built with:

- **Astro 5** - Static site generator with islands architecture
- **React 19** - For interactive components (via @astrojs/react)
- **Tailwind CSS 4** - Styling via @tailwindcss/vite plugin
- **Skeleton UI 3** - Component library (@skeletonlabs/skeleton + skeleton-react)
- **astro-icon** - Icon components using Iconify (lucide and simple-icons sets)

### Project Structure

```
src/
├── components/         # Astro components
│   ├── ui/            # Reusable UI components (Badge, EventCard)
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── Upcoming.astro
│   └── Previous.astro
├── data/              # JSON data files loaded via content collections
│   ├── events.json    # Event data with upcoming/past flag
│   └── socials.json   # Social media links
├── layouts/
│   └── Layout.astro   # Base HTML layout with Header/Footer
├── pages/
│   └── index.astro    # Homepage
├── styles/
│   └── global.css     # Tailwind imports + Skeleton theme
└── content.config.ts  # Astro content collections schema (Zod)
```

### Content Collections

Events and socials are managed via Astro's content collections with Zod schemas defined in `src/content.config.ts`. Access data using `getCollection("events")` or `getCollection("socials")`.

### Styling Patterns

- Uses Skeleton UI preset classes: `preset-filled-*`, `preset-tonal-*`, `preset-outlined-*`
- Theme: `wintry` (set via `data-theme` attribute on `<html>`)
- Custom gradient backgrounds defined in `global.css`: `.gradient-homepage-one`, `.gradient-homepage-two`
- Badge component has variants: `default`, `primary`, `primaryTonal`, `primaryOutline`, `secondary`, `secondaryTonal`, `secondaryOutline`

### Icons

Use `<Icon name="lucide:icon-name" />` or `<Icon name="simple-icons:brand-name" />` from astro-icon/components.

## Documentation Maintenance Standards

### Keep Documentation Current

When making significant changes, update relevant documentation:
- **AGENTS.md** - Project-wide conventions and architecture
- **README.md** - Setup instructions, current features, usage examples

### Living Documentation Philosophy

- **Rewrite, don't append** - Update existing content rather than adding dated sections
- **Remove completed/obsolete information** - Don't strike through or mark as "old"
- **Keep documentation fresh** - Focus on what users need to know now

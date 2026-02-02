# ReactATL Website

Community website for ReactATL - Atlanta's premier React developer meetup group.

**Live site:** [reactatl.dev](https://reactatl.dev)

## Tech Stack

- [Astro 5](https://astro.build) - Static site generator with islands architecture
- [React 19](https://react.dev) - Interactive components via @astrojs/react
- [Tailwind CSS 4](https://tailwindcss.com) - Utility-first styling via @tailwindcss/vite
- [shadcn/ui](https://ui.shadcn.com) - Component patterns (CVA, clsx, tailwind-merge)
- [astro-icon](https://github.com/natemoo-re/astro-icon) - Iconify integration (lucide, simple-icons)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The dev server runs at [localhost:4321](http://localhost:4321).

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── BentoEventCard.tsx   # Event card with light/dark variants
│   │   ├── CategoryPill.tsx     # Filter button component
│   │   └── button.tsx           # shadcn/ui button
│   ├── About.astro              # About section with community description
│   ├── FilterableEvents.tsx     # Interactive event grid with filtering
│   ├── Header.astro             # Sticky navigation
│   ├── Hero.astro               # Hero section with gradient blobs
│   ├── Stats.astro              # Community statistics
│   └── Footer.astro             # Footer with social links
├── data/
│   ├── events.json              # Event listings
│   └── socials.json             # Social media links
├── layouts/
│   └── Layout.astro             # Base HTML layout with SEO
├── lib/
│   └── utils.ts                 # Utility functions (cn)
├── pages/
│   └── index.astro              # Homepage
├── styles/
│   └── global.css               # OKLCH color system
├── types/
│   └── events.ts                # Event types and category filtering
└── content.config.ts            # Astro content collections schema
```

## Features

- **Dark-first design** with OKLCH color system for perceptually uniform colors
- **Interactive event filtering** by category (React, Community, Leadership, AI, Career)
- **Bento grid layout** with featured large cards and smaller cards
- **Glassmorphism effects** with backdrop blur on light variant cards
- **Gradient blob backgrounds** for visual interest
- **Responsive typography** with fluid sizing using clamp()
- **Content collections** with Zod validation for type-safe data
- **Full SEO** with Open Graph tags and JSON-LD structured data

## Content Management

Events and social links are managed via JSON files in `src/data/` and loaded through Astro's content collections.

### Adding Events

Edit `src/data/events.json`:

```json
{
  "id": 1,
  "title": "Event Title",
  "description": "Event description",
  "date": "February 15, 2026",
  "time": "6:30 PM EST",
  "location": "Atlanta Tech Village",
  "link": "https://www.meetup.com/react-atl/events/...",
  "upcoming": true,
  "tags": ["React", "Workshop"],
  "featured": true
}
```

**Fields:**
- `upcoming` (boolean) - Shows in Upcoming or Past Events section
- `tags` (array) - Category tags for filtering (React, Community, Leadership, AI, Career, Workshop, Panel, etc.)
- `featured` (boolean, optional) - Displays as large card in the grid

### Event Categories

Events are filtered by tags mapped to these categories:
- **React** - React, Remix, React Native, Mobile
- **Community** - Community, Social, Wellness, Open Source
- **Leadership** - Leadership, Security, Platform Engineering, Conference
- **AI** - AI
- **Career** - Career, Panel

## Links

- [Meetup](https://www.meetup.com/react-atl)
- [Discord](https://discord.gg/6whjwYTRjj)
- [Bluesky](https://bsky.app/profile/reactatl.dev)
- [YouTube](https://www.youtube.com/channel/UCld-j-KjTocp3qH6eOkH2xQ)

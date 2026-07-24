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
├── content/
│   └── events/                  # One Markdown file per event (frontmatter + body)
│       └── images/              # Co-located hero images
├── data/
│   └── socials.json             # Social media links
├── layouts/
│   └── Layout.astro             # Base HTML layout with SEO
├── lib/
│   ├── utils.ts                 # cn() class merging
│   ├── dates.ts                 # ET date/time label formatting
│   └── events.ts                # getEventList() collection helper
├── pages/
│   ├── index.astro              # Homepage
│   └── events/                  # Archive (index.astro) + detail ([...slug].astro)
├── styles/
│   └── global.css               # OKLCH color system + article styles
├── types/
│   └── events.ts                # Event types and category filtering
└── content.config.ts            # Astro content collections schema
```

```
scripts/
└── import-meetup.mjs            # Imports event content + images from Meetup
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

Social links live in `src/data/socials.json`. Event content lives in `src/content/events/*.md` — one Markdown file per event (typed frontmatter + a rich Markdown body) — loaded through Astro's content collections.

### Adding Events

Events are imported from Meetup rather than hand-written. Run:

```bash
pnpm import:events                                   # refresh all events from the seed list
node scripts/import-meetup.mjs <meetupUrl> [--luma=<lumaUrl>]   # add a single new event
```

The importer fetches the Meetup event's description, date, venue, host, and hero image and writes `src/content/events/<slug>.md` plus `images/<slug>.jpeg`. Curated frontmatter (tags, featured, subtitle, primaryPlatform) is preserved across re-runs.

Frontmatter shape:

```yaml
---
title: "Event Title"
description: "Short excerpt for OG/meta"
date: 2026-02-15T18:30:00-05:00
location: "Atlanta Tech Village"
meetupUrl: "https://www.meetup.com/react-atl/events/..."   # meetupUrl and/or lumaUrl (>=1 required)
lumaUrl: "https://luma.com/..."
primaryPlatform: luma        # optional; which RSVP button is filled (default: Luma if present)
heroImage: "./images/event-title.jpeg"
tags: ["React", "Workshop"]
featured: true
---

Full Markdown description goes here.
```

`upcoming` and display date/time are derived at build time (not stored). Each event renders at `/events/<slug>` with up to two RSVP buttons.

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

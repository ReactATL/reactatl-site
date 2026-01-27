# ReactATL Website

Community website for ReactATL - Atlanta's premier React developer meetup group.

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [React](https://react.dev) - Interactive components
- [Tailwind CSS](https://tailwindcss.com) - Utility-first styling
- [shadcn/ui](https://ui.shadcn.com) - Component patterns (CVA, clsx, tailwind-merge)

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
├── components/     # UI components (Header, Footer, Hero, BentoEventCard, etc.)
├── data/           # JSON data (events, socials)
├── layouts/        # Page layouts
├── lib/            # Utility functions
├── pages/          # Route pages
└── styles/         # Global CSS with OKLCH color system
```

## Features

- **Dark-first design** with OKLCH color system
- **Bento grid layout** for event cards
- **Glassmorphism effects** with backdrop blur
- **Gradient blob backgrounds** for visual interest
- **Responsive typography** with fluid sizing
- **Content collections** for type-safe data management

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
  "link": "https://www.meetup.com/react-atl",
  "upcoming": true,
  "tags": ["React", "Workshop"],
  "featured": true
}
```

## Links

- [Meetup](https://www.meetup.com/react-atl)
- [Discord](https://discord.gg/6whjwYTRjj)
- [Bluesky](https://bsky.app/profile/reactatl.dev)
- [YouTube](https://www.youtube.com/channel/UCld-j-KjTocp3qH6eOkH2xQ)

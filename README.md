# ReactATL Website

Community website for ReactATL - Atlanta's premier React developer meetup group.

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [React](https://react.dev) - Interactive components
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Skeleton UI](https://skeleton.dev) - Component library

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at [localhost:4321](http://localhost:4321).

## Project Structure

```
src/
├── components/     # UI components (Header, Footer, Hero, EventCard, etc.)
├── data/           # JSON data (events, socials)
├── layouts/        # Page layouts
├── pages/          # Route pages
└── styles/         # Global CSS
```

## Content Management

Events and social links are managed via JSON files in `src/data/` and loaded through Astro's content collections.

## Links

- [Meetup](https://www.meetup.com/react-atl)
- [Discord](https://discord.gg/6whjwYTRjj)
- [Bluesky](https://bsky.app/profile/reactatl.dev)
- [YouTube](https://www.youtube.com/channel/UCld-j-KjTocp3qH6eOkH2xQ)

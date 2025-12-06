# Trip Agenda App

A production-ready Next.js 14 application for managing and displaying trip itineraries. Built with TypeScript, CSS Modules, and Tailwind CSS.

## Features

- 📅 **Trip Itinerary Management** - Organize activities by day with detailed information
- 🗺️ **Multiple Trips** - Support for multiple trip itineraries (Granada & Valencia)
- 🎨 **Theme System** - Three beautiful themes (Earthy, Mystical, Classic) with light/dark modes
- 📱 **Responsive Design** - Mobile-first approach that works on all devices
- ♿ **Accessibility** - WCAG AA compliant with keyboard navigation and screen reader support
- 🚀 **Performance** - Optimized images, code splitting, and lazy loading
- 🔍 **SEO** - Meta tags, Open Graph, and structured data
- 🧪 **Testing** - Unit tests with Jest and React Testing Library

## Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
trip-agenda-app/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Home page (Granada trip)
│   │   ├── valencia/     # Valencia trip route
│   │   └── day/[id]/     # Individual day pages
│   ├── components/       # React components
│   │   ├── layout/       # Header, Footer, ThemeToggle
│   │   ├── trip/         # Trip-specific components
│   │   │   └── TripView/ # Reusable trip display component
│   │   └── ui/           # Reusable UI components
│   ├── context/          # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/              # Utilities and helpers
│   ├── data/            # JSON data files
│   │   ├── trip-data.json        # Granada trip data
│   │   └── valencia-trip-data.json # Valencia trip data
│   └── styles/          # Global styles and themes
├── tests/               # Test files
└── docs/                # Documentation
```

## Routes

- `/` - Granada trip (main trip, Dec 27 - Jan 2)
- `/valencia` - Valencia mini-trip (Dec 21-24)
- `/day/[id]` - Individual day view (supports both trips via query param)

## Configuration

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_APP_URL=https://your-app.netlify.app
NEXT_PUBLIC_APP_NAME="Trip Agenda"
```

### Trip Data

The application supports multiple trip itineraries:

- **Granada Trip** - `src/data/trip-data.json` (main trip, displayed at `/`)
- **Valencia Trip** - `src/data/valencia-trip-data.json` (mini-trip, displayed at `/valencia`)

Edit these JSON files to customize your trip itineraries. To add a new trip:

1. Create a new JSON file in `src/data/` following the same structure
2. Update `src/lib/data.ts` to include the new trip
3. Create a new route in `src/app/[trip-name]/page.tsx`
4. Add the trip to the Header trip selector

## Deployment

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

## Documentation

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System design and architecture
- [COMPONENTS.md](./docs/COMPONENTS.md) - Component documentation
- [ROUTING.md](./docs/ROUTING.md) - Routing structure and multi-trip support
- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Deployment guide
- [DEVELOPMENT.md](./docs/DEVELOPMENT.md) - Development guide

## License

MIT


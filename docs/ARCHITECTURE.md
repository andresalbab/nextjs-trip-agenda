# Architecture

## System Overview

The Trip Agenda App is built using Next.js 14 with the App Router, TypeScript, and a hybrid styling approach combining CSS Modules and Tailwind CSS.

## Design Decisions

### Framework: Next.js 14 App Router

- **Server Components by Default** - Better performance and SEO
- **Streaming** - Progressive page rendering
- **Built-in Image Optimization** - Automatic image optimization
- **File-based Routing** - Simple and intuitive routing

### Styling: CSS Modules + Tailwind CSS

- **CSS Modules** - Component-scoped styles with theme variables
- **Tailwind CSS** - Utility classes for rapid development
- **CSS Custom Properties** - Dynamic theming support

### State Management: React Context + Local Storage

- **Theme Context** - Global theme state
- **Local Storage** - Persistent user preferences
- **No External State Library** - Simpler architecture for this use case

## Data Flow

```
JSON Data → Server Component → TripView → Client Components → UI
```

1. Trip data is stored in JSON files (`src/data/trip-data.json`, `src/data/valencia-trip-data.json`)
2. Server components fetch data using `getTripData(slug?)` with optional slug parameter
3. Data is passed to the reusable `TripView` component
4. `TripView` renders `DayNavigation` and `DaySection` components
5. Client components handle interactivity (theme, navigation, etc.)

## Routing Structure

The application uses Next.js App Router with the following routes:

- **`/`** - Granada trip (default, main trip)
- **`/valencia`** - Valencia mini-trip
- **`/day/[id]`** - Individual day view (supports `?trip=valencia` query param)

### Route Implementation

Each route follows this pattern:

1. Server component page fetches trip data using `getTripData(slug)`
2. Data is passed to the reusable `TripView` component
3. `TripView` handles all trip display logic (navigation, sections, etc.)
4. Header dynamically updates based on current route via `HeaderWrapper`

## Component Hierarchy

```
RootLayout
├── ThemeProvider
│   ├── HeaderWrapper (client)
│   │   └── Header
│   │       ├── TripSelector (navigation)
│   │       └── ThemeToggle
│   └── Page (server)
│       └── TripView
│           ├── AutoScrollToToday
│           ├── DayNavigation
│           │   └── DayNavItem
│           └── DaySection[]
│               └── ActivityCard[]
│                   └── ActivityDetails
```

### Key Components

- **HeaderWrapper** - Client component that determines which trip data to display in header based on pathname
- **TripView** - Reusable server component that displays any trip itinerary
- **TripSelector** - Navigation component in header to switch between trips

## Theme System

Themes are implemented using CSS custom properties:

1. Theme CSS files define color variables for each theme/mode combination
2. `ThemeContext` manages theme state and applies attributes to `<html>`
3. Components use CSS variables for colors
4. Local storage persists user preferences

## Performance Optimizations

- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Automatic route-based code splitting
- **Server Components** - Reduced client-side JavaScript
- **CSS Modules** - Scoped styles prevent style conflicts
- **Reusable Components** - `TripView` component shared between routes reduces bundle size
- **Data Fetching** - Server-side data fetching with slug-based routing

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility


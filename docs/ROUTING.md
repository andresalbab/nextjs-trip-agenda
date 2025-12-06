# Routing Guide

## Overview

The Trip Agenda App uses Next.js 14 App Router with a multi-trip architecture. The application supports multiple trip itineraries, each accessible via its own route.

## Route Structure

### Main Routes

- **`/`** - Granada trip (default, main trip)
  - Displays: Granada & Sierra Nevada trip (Dec 27 - Jan 2)
  - Data source: `src/data/trip-data.json`
  - Page: `src/app/page.tsx`

- **`/valencia`** - Valencia mini-trip
  - Displays: Valencia, Madrid & Ávila trip (Dec 21-24)
  - Data source: `src/data/valencia-trip-data.json`
  - Page: `src/app/valencia/page.tsx`

- **`/day/[id]`** - Individual day view
  - Displays: Single day details
  - Supports query parameter: `?trip=valencia` to specify trip
  - Page: `src/app/day/[id]/page.tsx`

## Implementation Details

### Data Fetching

All routes use the `getTripData(slug?)` function from `src/lib/data.ts`:

```typescript
// Granada trip (default)
const tripData = await getTripData();

// Valencia trip
const tripData = await getTripData('valencia');
```

### Reusable Components

All trip routes use the same `TripView` component:

```typescript
import { TripView } from '@/components/trip/TripView';

export default async function Page() {
  const tripData = await getTripData('valencia');
  return <TripView data={tripData} />;
}
```

This ensures:
- Consistent UI/UX across all trips
- Code reusability
- Easier maintenance

### Dynamic Header

The header automatically updates based on the current route:

- `HeaderWrapper` (client component) uses `usePathname()` to detect route
- Loads appropriate trip data
- Displays correct title and subtitle
- Highlights active trip in navigation selector

### Navigation

The trip selector in the header allows users to switch between trips:

- **Granada** link → `/`
- **Valencia** link → `/valencia`

Active route is highlighted with primary color and shadow.

## Adding a New Route

See [DEVELOPMENT.md](./DEVELOPMENT.md#adding-a-new-trip) for detailed instructions on adding a new trip route.

## Route Metadata

Each route has its own metadata for SEO:

```typescript
export const metadata: Metadata = {
  title: 'Trip Name | Family Adventure',
  description: 'Trip description...',
  openGraph: {
    title: 'Trip Name',
    description: 'Trip description',
  },
};
```

## Best Practices

1. **Always use `TripView`** - Don't duplicate trip display logic
2. **Use `getTripData(slug)`** - Centralized data fetching
3. **Update HeaderWrapper** - When adding new trips
4. **Add to trip selector** - Include navigation link
5. **Set unique metadata** - For each route's SEO
6. **Test both routes** - Ensure consistent behavior

## URL Structure Examples

```
/                          → Granada trip home
/valencia                  → Valencia trip home
/day/day-1                 → Granada day 1
/day/day-1?trip=valencia   → Valencia day 1
```

## Future Enhancements

Potential routing improvements:

- Dynamic route generation from data files
- Trip slug validation
- Route-based analytics
- Shareable trip URLs with query params
- Trip comparison view


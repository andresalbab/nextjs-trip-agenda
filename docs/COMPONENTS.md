# Components

## Layout Components

### HeaderWrapper

Client component wrapper that determines which trip data to display in the header based on the current route.

**Location:** `src/components/layout/Header/HeaderWrapper.tsx`

**Features:**
- Uses `usePathname()` to detect current route
- Loads appropriate trip data (Granada or Valencia)
- Passes data to Header component

### Header

Displays the trip title, trip selector navigation, and theme controls.

**Props:**
- `title: string` - Trip title
- `subtitle: string` - Trip subtitle

**Features:**
- Trip selector navigation (Granada/Valencia)
- Active route highlighting
- Responsive design (trip selector centered on mobile)

### ThemeToggle

Theme and mode toggle buttons.

**Features:**
- Light/dark mode toggle
- Theme cycling (Earthy → Mystical → Classic)

## Trip Components

### TripView

Reusable component that displays a complete trip itinerary. Used by both Granada and Valencia routes.

**Location:** `src/components/trip/TripView/TripView.tsx`

**Props:**
- `data: TripData` - Complete trip data object

**Features:**
- Renders structured data (JSON-LD) for SEO
- Auto-scrolls to today's day on load
- Displays day navigation sidebar
- Renders all day sections with activities
- Fully reusable across different trips

**Usage:**
```typescript
import { TripView } from '@/components/trip/TripView';
import { getTripData } from '@/lib/data';

export default async function Page() {
  const tripData = await getTripData('valencia');
  return <TripView data={tripData} />;
}
```

### DayNavigation

Sidebar navigation for days, grouped by location.

**Props:**
- `days: Day[]` - Array of day objects
- `currentDayId?: string` - Currently active day ID
- `onDayClick?: (dayId: string) => void` - Click handler

**Features:**
- Groups days by location
- Highlights current day
- Smooth scroll to day section
- Responsive (hidden on mobile)

### DaySection

Container for a single day's activities.

**Props:**
- `day: Day` - Day object
- `status: "past" | "current" | "future"` - Day status
- `isCollapsed?: boolean` - Collapsed state
- `onToggle?: () => void` - Toggle handler

**Features:**
- Shows "Hoy" badge for current day
- Past days are faded
- Contains activity cards

### ActivityCard

Collapsible card displaying activity details.

**Props:**
- `activity: Activity` - Activity object
- `isExpanded?: boolean` - Expanded state
- `onToggle?: () => void` - Toggle handler

**Features:**
- Collapsible details
- Image with lazy loading
- Location with map link
- Calendar export button
- Website link button

## UI Components

### Button

Reusable button component.

**Props:**
- `variant?: "primary" | "secondary"` - Button variant
- `children: React.ReactNode` - Button content
- Standard button HTML attributes

### Badge

Badge component for labels.

**Props:**
- `variant?: "today" | "default"` - Badge variant
- `children: React.ReactNode` - Badge content

### Icon

Material Symbols icon wrapper.

**Props:**
- `name: string` - Icon name
- `size?: number` - Icon size
- `className?: string` - Additional classes
- ARIA attributes

## Shared Components

### AutoScrollToToday

Client component that automatically scrolls to today's day section when the page loads.

**Location:** `src/components/shared/AutoScrollToToday/AutoScrollToToday.tsx`

**Props:**
- `days: Day[]` - Array of day objects

**Features:**
- Finds today's day in the trip
- Smoothly scrolls to the day section
- Delayed execution (600ms) to ensure page is loaded


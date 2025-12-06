# AI Prompt: Convert HTML Trip Itinerary to Production-Ready Next.js Application

## Project Overview
Convert the provided HTML trip itinerary into a **production-ready Next.js 14+ application** using App Router, TypeScript, and modern best practices. The application should be fully deployable to Netlify with optimal performance, accessibility, and maintainability.

---

## Technical Requirements

### Core Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** CSS Modules + Tailwind CSS
- **State Management:** React Context API + Local Storage
- **Data Management:** JSON files in `/data` directory
- **Deployment:** Netlify (with ISR support)
- **Node Version:** 18.x or 20.x

### Key Features to Implement
1. **Theme System:** Light/Dark mode with persistence (localStorage)
2. **Trip Data Management:** Modular JSON structure for easy updates
3. **Dynamic Routing:** `/day/[id]` for individual day pages
4. **Responsive Design:** Mobile-first approach
5. **Performance:** Image optimization, code splitting, lazy loading
6. **SEO:** Meta tags, Open Graph, structured data
7. **Accessibility:** WCAG AA compliance
8. **PWA Support:** Offline capability (optional but recommended)

---

## Project Structure

```
trip-agenda-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with providers
│   │   ├── page.tsx                   # Home page (trip overview)
│   │   ├── globals.css                # Global styles + Tailwind
│   │   ├── day/
│   │   │   └── [id]/
│   │   │       └── page.tsx           # Individual day page
│   │   └── api/                       # API routes (if needed)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Header.module.css
│   │   │   ├── Footer/
│   │   │   └── ThemeToggle/
│   │   │
│   │   ├── trip/
│   │   │   ├── DayNavigation/
│   │   │   │   ├── DayNavigation.tsx
│   │   │   │   ├── DayNavItem.tsx
│   │   │   │   └── DayNavigation.module.css
│   │   │   ├── ActivityCard/
│   │   │   │   ├── ActivityCard.tsx
│   │   │   │   ├── ActivityDetails.tsx
│   │   │   │   └── ActivityCard.module.css
│   │   │   ├── DaySection/
│   │   │   └── Timeline/
│   │   │
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   ├── Badge/
│   │   │   ├── Icon/
│   │   │   └── Card/
│   │   │
│   │   └── shared/
│   │       ├── ImageWithFallback/
│   │       └── LoadingSpinner/
│   │
│   ├── lib/
│   │   ├── utils.ts                   # Helper functions
│   │   ├── constants.ts               # App constants
│   │   └── types.ts                   # TypeScript types
│   │
│   ├── context/
│   │   └── ThemeContext.tsx           # Theme state management
│   │
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── data/
│   │   ├── trip-data.json             # Main trip data
│   │   └── activities-metadata.json   # Activity metadata
│   │
│   ├── styles/
│   │   ├── themes/
│   │   │   ├── light.css
│   │   │   └── dark.css
│   │   └── variables.css              # CSS custom properties
│   │
│   └── public/
│       ├── images/
│       │   └── activities/
│       ├── icons/
│       └── favicon/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   ├── DEPLOYMENT.md
│   └── DEVELOPMENT.md
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── netlify.toml
├── package.json
└── README.md
```

---

## Data Structure

### Trip Data Schema (`/src/data/trip-data.json`)

```typescript
interface TripData {
  metadata: {
    title: string;
    subtitle: string;
    location: string;
    startDate: string; // ISO format
    endDate: string;
    theme: "winter-garden" | "luxe-jewel-box" | "cozy-earth";
  };
  days: Day[];
}

interface Day {
  id: string;
  dayNumber: number;
  date: string; // ISO format
  location: string;
  theme: string;
  description?: string;
  activities: Activity[];
}

interface Activity {
  id: string;
  time: string; // HH:MM format
  title: string;
  icon: string; // Material Symbol name
  description: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  image: {
    url: string;
    alt: string;
    credit?: string;
  };
  links?: Link[];
  tags?: string[];
}

interface Link {
  label: string;
  url: string;
  icon: string;
  type: "map" | "website" | "booking" | "external";
}
```

---

## Component Specifications

### 1. ThemeProvider Component
**Location:** `src/context/ThemeContext.tsx`

**Requirements:**
- Manage theme state (light/dark)
- Persist to localStorage
- Sync across tabs (storage event listener)
- Provide theme toggle function
- Apply theme CSS variables to document root
- SSR-safe (no flash of unstyled content)

```typescript
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}
```

### 2. Header Component
**Location:** `src/components/layout/Header/`

**Features:**
- Gradient background using theme colors
- Trip title and dates
- Theme toggle button (top-right)
- Responsive design
- Sticky on scroll (optional)

**Props:**
```typescript
interface HeaderProps {
  title: string;
  subtitle: string;
  dateRange: string;
}
```

### 3. DayNavigation Component
**Location:** `src/components/trip/DayNavigation/`

**Features:**
- Sidebar on desktop (sticky)
- Horizontal scroll on mobile
- Highlight current day
- Show past/current/future states
- Smooth scroll to day section
- Visual indicators (past = faded, current = accent)

**Props:**
```typescript
interface DayNavigationProps {
  days: Day[];
  currentDayId: string;
  onDayClick: (dayId: string) => void;
}
```

### 4. ActivityCard Component
**Location:** `src/components/trip/ActivityCard/`

**Features:**
- Collapsible details
- Icon with background
- Time badge
- Image lazy loading
- Location with map link
- Action buttons
- Smooth expand/collapse animation

**Props:**
```typescript
interface ActivityCardProps {
  activity: Activity;
  isExpanded?: boolean;
  onToggle?: () => void;
}
```

### 5. DaySection Component
**Location:** `src/components/trip/DaySection/`

**Features:**
- Collapsible day container
- Day header with expand icon
- Status badge (Today, Past, Upcoming)
- Activity timeline
- Smooth animations

**Props:**
```typescript
interface DaySectionProps {
  day: Day;
  status: "past" | "current" | "future";
  isCollapsed?: boolean;
  onToggle?: () => void;
}
```

---

## Styling Guidelines

### CSS Modules + Tailwind Approach

**Use CSS Modules for:**
- Component-specific styles
- Complex animations
- Theme-aware custom properties
- Layout-specific styles

**Use Tailwind for:**
- Utility classes (spacing, typography)
- Responsive breakpoints
- Quick prototyping
- Common patterns

### Theme System Implementation

**CSS Variables Structure:**
```css
/* src/styles/themes/light.css */
[data-theme="light"] {
  /* Primary - Transformative Teal */
  --color-primary: #2d7a6e;
  --color-on-primary: #ffffff;
  --color-primary-container: #c7f2e8;
  --color-on-primary-container: #003d33;
  
  /* Secondary - Fresh Purple */
  --color-secondary: #6b4e99;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #e8d9f7;
  --color-on-secondary-container: #2a1a3d;
  
  /* Surface */
  --color-surface: #f8fbfb;
  --color-on-surface: #0d1f1f;
  --color-surface-variant: #d5e5e4;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Tailwind Configuration:**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        secondary: 'var(--color-secondary)',
        surface: 'var(--color-surface)',
        // ... all theme colors
      },
      fontFamily: {
        sans: ['Google Sans Text', 'Roboto', 'sans-serif'],
        display: ['Google Sans', 'sans-serif'],
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## Performance Optimizations

### 1. Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src={activity.image.url}
  alt={activity.image.alt}
  width={800}
  height={400}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..." // Low-res placeholder
/>
```

### 2. Code Splitting
```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const ActivityMap = dynamic(() => import('./ActivityMap'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
```

### 3. Data Fetching
```typescript
// Use server components for data fetching
export default async function HomePage() {
  const tripData = await getTripData(); // Server-side
  return <TripView data={tripData} />;
}
```

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)
**Location:** `tests/unit/`

**Test Coverage:**
- All utility functions (100%)
- Component rendering
- User interactions
- Theme switching
- Local storage hooks

**Example:**
```typescript
// tests/unit/ActivityCard.test.tsx
describe('ActivityCard', () => {
  it('renders activity details correctly', () => {
    render(<ActivityCard activity={mockActivity} />);
    expect(screen.getByText(mockActivity.title)).toBeInTheDocument();
  });
  
  it('expands when clicked', () => {
    render(<ActivityCard activity={mockActivity} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(mockActivity.description)).toBeVisible();
  });
});
```

### Integration Tests
**Location:** `tests/integration/`

**Test Scenarios:**
- Day navigation flow
- Theme persistence
- Data loading and display
- Responsive behavior

### E2E Tests (Playwright)
**Location:** `tests/e2e/`

**Test Scenarios:**
- Complete user journey
- Mobile responsive tests
- Cross-browser compatibility
- Performance metrics

---

## Deployment Configuration

### Netlify Configuration
**File:** `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Environment Variables
**File:** `.env.local`

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=https://trip-agenda.netlify.app
NEXT_PUBLIC_APP_NAME="Family Trip 2025"

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Map API (if using interactive maps)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

### Next.js Configuration
**File:** `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
```

---

## Development Workflow

### Setup Commands
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Run tests
npm test
npm run test:watch
npm run test:e2e

# Build for production
npm run build

# Preview production build
npm run start
```

### Git Workflow
1. **Branch naming:** `feature/component-name`, `fix/bug-description`
2. **Commit messages:** Conventional Commits format
3. **Pre-commit hooks:** Lint, format, type-check
4. **CI/CD:** GitHub Actions for automated testing

---

## Documentation Requirements

### 1. README.md
Include:
- Project overview
- Quick start guide
- Available scripts
- Project structure overview
- Contributing guidelines
- License information

### 2. ARCHITECTURE.md
Document:
- System design decisions
- Data flow diagrams
- Component hierarchy
- State management approach
- Performance considerations

### 3. COMPONENTS.md
Document each component:
- Purpose and usage
- Props interface
- Examples
- Styling approach
- Accessibility notes

### 4. DEPLOYMENT.md
Step-by-step guide:
- Netlify setup
- Environment variables
- Domain configuration
- SSL/HTTPS setup
- Monitoring and analytics

### 5. DEVELOPMENT.md
Developer guide:
- Local setup
- Code style guide
- Testing guidelines
- Debugging tips
- Common issues

---

## Accessibility Requirements

### WCAG AA Compliance
- ✅ Color contrast ratios 4.5:1 minimum
- ✅ Keyboard navigation support
- ✅ ARIA labels on interactive elements
- ✅ Focus indicators visible
- ✅ Alt text on all images
- ✅ Semantic HTML structure
- ✅ Screen reader tested

### Implementation Details
```typescript
// Example: Accessible button
<button
  aria-label="Toggle activity details"
  aria-expanded={isExpanded}
  onClick={handleToggle}
  className={styles.toggleButton}
>
  <Icon name="expand_more" aria-hidden="true" />
</button>
```

---

## SEO Requirements

### Meta Tags
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Spain Trip 2025 | Family Adventure',
  description: 'Plan your perfect trip to Granada with daily itineraries...',
  keywords: ['Granada', 'trip', 'itinerary', 'Spain', 'Alhambra'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Spain Trip 2025',
    description: 'Family adventure in Granada and Sierra Nevada',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Granada Trip 2025',
    description: 'Plan your Granada adventure',
    images: ['/twitter-image.jpg'],
  },
};
```

### Structured Data
```typescript
// Add JSON-LD for trip events
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Trip",
  "name": "Family Trip 2025",
  "startDate": "2025-12-27",
  "endDate": "2026-01-02",
  "location": {
    "@type": "Place",
    "name": "Granada, Spain"
  }
};
```

---

## Code Quality Standards

### TypeScript
- ✅ Strict mode enabled
- ✅ No `any` types (use `unknown` instead)
- ✅ Interfaces over types for objects
- ✅ Proper return types on functions

### ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "error"
  }
}
```

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

---

## Final Deliverables Checklist

### Code
- [ ] All components implemented and tested
- [ ] TypeScript with no errors
- [ ] All linting rules passing
- [ ] 80%+ test coverage
- [ ] Responsive on all devices
- [ ] Theme switching works perfectly
- [ ] No console errors or warnings

### Documentation
- [ ] README.md complete
- [ ] ARCHITECTURE.md written
- [ ] COMPONENTS.md with all components
- [ ] DEPLOYMENT.md step-by-step guide
- [ ] DEVELOPMENT.md for contributors

### Deployment
- [ ] Builds successfully on Netlify
- [ ] Environment variables configured
- [ ] Custom domain (optional) configured
- [ ] HTTPS enabled
- [ ] Performance score 90+ on Lighthouse
- [ ] Accessibility score 100 on Lighthouse

### Quality
- [ ] All images optimized
- [ ] PWA manifest included
- [ ] Meta tags for SEO
- [ ] Analytics integrated
- [ ] Error tracking setup (Sentry recommended)

---

## Additional Recommendations

### Nice-to-Have Features
1. **Export to Calendar** - Add activities to Google Calendar/iCal
2. **Sharing** - Share individual days or activities
3. **Print-Friendly View** - CSS for printing itinerary
4. **Offline Support** - Service worker for PWA
5. **Multi-language** - i18n support (Spanish/English)
6. **Weather Integration** - Show forecast for each day
7. **Budget Tracker** - Estimate trip costs
8. **Photo Gallery** - Upload trip photos post-visit

### Performance Targets
- **Lighthouse Score:** 90+ all categories
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1

---

## Success Criteria

The application is production-ready when:
1. ✅ Deploys to Netlify without errors
2. ✅ Passes all automated tests
3. ✅ Meets performance benchmarks
4. ✅ WCAG AA compliant
5. ✅ Works on Chrome, Firefox, Safari, Edge
6. ✅ Responsive on mobile, tablet, desktop
7. ✅ Documentation complete and clear
8. ✅ Code is maintainable and scalable

---

## Questions to Consider During Implementation

1. Should we add authentication for personal trip planning?
2. Do we need a CMS for non-technical users to edit trips?
3. Should activities be shareable via unique URLs?
4. Do we want real-time collaboration features?
5. Should we support multiple trips per user?
6. Do we need a booking integration for activities?

---

## Reference HTML File

[Attach the `gemini-website-design.html` file]

The HTML contains:
- Complete trip data structure
- All styling (colors, typography, layout)
- Interactive JavaScript functionality
- Winter Garden color palette (light/dark themes)
- All activity details and images

**Your task:** Transform this into a modern, scalable Next.js application following all specifications above.

Good luck! 🚀

# Development Guide

## Local Setup

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd nextjs-trip-agenda
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   - Navigate to `http://localhost:3000` for Granada trip
   - Navigate to `http://localhost:3000/valencia` for Valencia trip

## Code Style

### TypeScript

- Use strict mode (enabled in `tsconfig.json`)
- No `any` types - use `unknown` instead
- Interfaces over types for objects
- Explicit return types on functions

### React

- Use functional components
- Prefer server components when possible
- Use `'use client'` directive only when needed
- Props interfaces should be exported

### Styling

- CSS Modules for component styles
- Tailwind for utility classes
- CSS custom properties for theming
- Mobile-first responsive design

## File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Styles: `ComponentName.module.css`
- Tests: `ComponentName.test.tsx`

## Git Workflow

1. Create feature branch: `git checkout -b feature/component-name`
2. Make changes
3. Run linter: `npm run lint`
4. Run tests: `npm test`
5. Commit: `git commit -m "feat: add component"`
6. Push: `git push origin feature/component-name`
7. Create pull request

## Testing

### Unit Tests

```bash
npm test
```

Tests are located in `tests/unit/`. Use Jest and React Testing Library.

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Component } from '@/components/Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## Debugging

### TypeScript Errors

```bash
npm run type-check
```

### Linting Errors

```bash
npm run lint
```

### Browser DevTools

- React DevTools for component inspection
- Network tab for API calls
- Performance tab for profiling

## Common Issues

### Module Not Found

- Check import paths (use `@/` alias)
- Verify file exists
- Check `tsconfig.json` paths configuration

### Styling Not Applied

- Verify CSS Module import
- Check theme variables are defined
- Inspect computed styles in browser

### Build Errors

- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node version: `node --version`

## Adding New Features

1. Create component in appropriate directory
2. Add TypeScript types
3. Write CSS Module styles
4. Add tests
5. Update documentation
6. Test in browser

## Adding a New Trip

To add a new trip itinerary:

1. **Create Trip Data File**
   ```bash
   # Create new JSON file in src/data/
   src/data/new-trip-data.json
   ```
   Follow the structure of existing trip data files.

2. **Update Data Utilities**
   ```typescript
   // src/lib/data.ts
   import newTripData from '@/data/new-trip-data.json';
   
   export async function getTripData(slug?: string): Promise<TripData> {
     if (slug === 'new-trip') {
       return newTripData as TripData;
     }
     // ... existing logic
   }
   ```

3. **Create Route**
   ```typescript
   // src/app/new-trip/page.tsx
   import { getTripData } from '@/lib/data';
   import { TripView } from '@/components/trip/TripView';
   
   export default async function NewTripPage() {
     const tripData = await getTripData('new-trip');
     return <TripView data={tripData} />;
   }
   ```

4. **Update Header Navigation**
   ```typescript
   // src/components/layout/Header/Header.tsx
   // Add link to trip selector
   <Link href="/new-trip">New Trip</Link>
   ```

5. **Update HeaderWrapper**
   ```typescript
   // src/components/layout/Header/HeaderWrapper.tsx
   // Add logic to load new trip data when route matches
   ```

6. **Test**
   - Verify route works: `http://localhost:3000/new-trip`
   - Check trip selector navigation
   - Verify all components render correctly

## Performance Tips

- Use `next/image` for images
- Lazy load heavy components
- Use server components when possible
- Minimize client-side JavaScript
- Optimize bundle size


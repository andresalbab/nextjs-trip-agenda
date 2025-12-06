# Deployment Guide

## Netlify Deployment

### Prerequisites

- Netlify account
- Git repository with your code

### Steps

1. **Connect Repository**
   - Go to Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20

3. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     - `NEXT_PUBLIC_APP_URL` - Your app URL
     - `NEXT_PUBLIC_APP_NAME` - App name

4. **Deploy**
   - Netlify will automatically deploy on push to main branch
   - Or trigger manual deploy from dashboard

### Netlify Configuration

The `netlify.toml` file is already configured with:
- Next.js plugin
- Security headers
- Image caching headers

### Custom Domain

1. Go to Site settings → Domain management
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## Build Optimization

### Image Optimization

- Images are automatically optimized by Next.js
- Use the `next/image` component for all images
- Configure `next.config.js` for external image domains

### Performance

- Enable compression in Netlify settings
- Use CDN for static assets (automatic with Netlify)
- Monitor performance with Lighthouse

## Monitoring

### Analytics

Add Google Analytics or similar:

```typescript
// src/app/layout.tsx
useEffect(() => {
  if (process.env.NEXT_PUBLIC_GA_ID) {
    // Initialize analytics
  }
}, []);
```

### Error Tracking

Consider adding Sentry or similar error tracking service.

## Troubleshooting

### Build Failures

- Check Node version (should be 20)
- Verify all dependencies are installed
- Check for TypeScript errors: `npm run type-check`
- Verify all trip data JSON files are valid JSON
- Ensure all routes have corresponding page files

### Runtime Errors

- Check browser console
- Verify environment variables
- Check Netlify function logs

### Performance Issues

- Run Lighthouse audit
- Check image sizes
- Verify code splitting is working
- Check bundle size


# Activity Images

This directory contains all activity images for the trip agenda application.

## Image Naming Convention

Images are named using the activity ID from the trip data JSON files:
- Format: `{activity_id}.webp`
- Example: `activity-1-1.webp` or `17b01b1e-a1a7-4fc4-948e-839cbef05d8b.webp`

## Image Requirements

- **Format**: WebP
- **Recommended Size**: 600x400 pixels (or maintain 3:2 aspect ratio)
- **Optimization**: Images should be optimized for web use to reduce file size

## Placeholder Image

If an activity doesn't have an image with its ID, the application will automatically fallback to:
- `placeholder.webp` - A default placeholder image shown when an activity image is missing or fails to load

## Usage

Images are referenced in the JSON data files (`trip-data.json` and `valencia-trip-data.json`) using the path:
```
/images/activities/{activity_id}.webp
```

The Next.js Image component automatically optimizes these images for different device sizes and formats (AVIF, WebP) for optimal performance. If an image fails to load or doesn't exist, the `placeholder.webp` image will be displayed automatically.


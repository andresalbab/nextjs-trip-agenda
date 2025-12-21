import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import { HeaderWrapper } from '@/components/layout/Header/HeaderWrapper';
import { SnowflakeBackground } from '@/components/shared/SnowflakeBackground/SnowflakeBackground';
import { ThemeName } from '@/lib/types';
import './globals.css';
import tripData from '@/data/trip-data.json';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'https://navidadqb2025.netlify.app'
  ),
  title: 'Agenda de Viaje 2025 | Navidad en España',
  description:
    'Planifica tu viaje perfecto por Ávila, Granada y Sierra Nevada con itinerarios diarios, actividades y más.',
  keywords: [
    'Granada',
    'Ávila',
    'Sierra Nevada',
    'trip',
    'itinerary',
    'Spain',
    'Alhambra',
    'Navidad',
  ],
  authors: [{ name: 'Trip Agenda' }],
  openGraph: {
    title: 'Agenda de Viaje 2025',
    description: 'Aventura familiar en Ávila, Granada y Sierra Nevada',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agenda de Viaje 2025',
    description: 'Planifica tu aventura en España',
    images: ['/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const defaultTheme = tripData.metadata.theme as ThemeName;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Get stored theme preference or use default (theme is fixed to first one)
                  var theme = localStorage.getItem('trip-agenda-theme') || '${defaultTheme}';
                  
                  // Always use system preference for mode
                  var mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  
                  // Apply immediately to prevent FOUC
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.setAttribute('data-mode', mode);
                } catch (e) {
                  // Fallback to defaults if there's an error
                  document.documentElement.setAttribute('data-theme', '${defaultTheme}');
                  document.documentElement.setAttribute('data-mode', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <SnowflakeBackground />
        <ThemeProvider defaultTheme={defaultTheme}>
          <HeaderWrapper />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


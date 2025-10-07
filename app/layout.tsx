import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pathfinders - Connect. Create. Grow.',
  description: 'Join our networking experiment to connect with like-minded professionals. Professional networking data collection funnel v1.0.0',
  keywords: ['networking', 'professional', 'connections', 'career', 'business'],
  authors: [{ name: 'Pathfinders' }],
  creator: 'denizen-star',
  publisher: 'Pathfinders',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pathfinders.kervinapps.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pathfinders - Connect. Create. Grow.',
    description: 'Join our networking experiment to connect with like-minded professionals',
    url: 'https://pathfinders.kervinapps.com',
    siteName: 'Pathfinders',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pathfinders - Connect. Create. Grow.',
    description: 'Join our networking experiment to connect with like-minded professionals',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=6" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=6" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png?v=6" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=6" />
        <link rel="shortcut icon" href="/favicon.png?v=6" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Ensure favicon adapts to browser background */
            link[rel="icon"] {
              background: transparent !important;
            }
            /* SVG favicon support with RGBA transparency */
            link[rel="icon"][type="image/svg+xml"] {
              background: transparent !important;
            }
            /* Dark mode support for favicon */
            @media (prefers-color-scheme: dark) {
              /* Favicon will inherit browser's dark background */
              link[rel="icon"] {
                filter: brightness(1.2);
              }
            }
            /* Light mode support for favicon */
            @media (prefers-color-scheme: light) {
              /* Favicon will inherit browser's light background */
              link[rel="icon"] {
                filter: brightness(1);
              }
            }
          `
        }} />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}

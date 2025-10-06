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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.jpeg" />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}

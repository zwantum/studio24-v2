import type { Metadata } from 'next';
import { Montserrat, Alex_Brush } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-alex-brush',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Studio24 by Shreya | Best Interior Designers in Gomti Nagar, Lucknow',
  description:
    'Studio24 by Shreya is the premier interior architecture atelier in Lucknow. Turnkey residential interiors, bespoke duplexes, modular kitchens, and corporate spaces in Gomti Nagar.',
  keywords: [
    'Interior Designers in Gomti Nagar',
    'Best Interior Designer in Lucknow',
    'Studio24 by Shreya',
    'Luxury Home Interiors Lucknow',
    'Turnkey Interior Contractor Lucknow',
  ],
  authors: [{ name: 'Studio24 by Shreya' }],
  metadataBase: new URL('https://studio24byshreya.com'),
  openGraph: {
    title: 'Studio24 by Shreya | Haute Interior Architecture Lucknow',
    description:
      'Transforming Spaces, Crafting Dreams. Turnkey residential and commercial interior architecture across Gomti Nagar, Lucknow.',
    url: 'https://studio24byshreya.com',
    siteName: 'Studio24 by Shreya',
    images: [
      {
        url: '/home-09-slider-01-dark.webp',
        width: 1200,
        height: 630,
        alt: 'Studio24 by Shreya Luxury Interior Architecture',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio24 by Shreya | Luxury Interior Architecture',
    description: 'Transforming Spaces, Crafting Dreams in Gomti Nagar, Lucknow.',
    images: ['/home-09-slider-01-dark.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${montserrat.variable} ${alexBrush.variable} font-sans bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen relative`}
      >
        {children}
      </body>
    </html>
  );
}

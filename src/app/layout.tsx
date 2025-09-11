import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HeaderWrapper from '@/components/header/HeaderWrapper';
import Footer from '@/components/Footer';
import HideOnProfile from '@/components/HideOnProfile';
import { ReactNode } from 'react';
import { getSessionUser } from '@/lib/supabase/get-session';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ClientThemeToggle } from '@/components/ClientThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Craftale - Website Design & Development Agency',
  description:
    'We build websites that actually work. Professional web design and development services that convert visitors into customers and grow your business.',
  keywords: [
    'web design',
    'web development',
    'website builder',
    'e-commerce',
    'responsive design',
    'SEO',
  ],
  authors: [{ name: 'Craftale Agency' }],
  creator: 'craftale',
  publisher: 'craftale',
  icons: {
    icon: [{ url: '/logo.png', sizes: 'any' }],
    apple: '/logo.png',
    shortcut: '/logo.png',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://craftale.it',
    title: 'Craftale - Website Design & Development Agency',
    description:
      'We build websites that actually work. Professional web design and development services that convert visitors into customers and grow your business.',
    siteName: 'Craftale',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Craftale - Website Design & Development Agency',
    description:
      'We build websites that actually work. Professional web design and development services that convert visitors into customers and grow your business.',
    creator: '@craftaleagency',
    images: [],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://craftale.it',
  },
};

export default async function RootLayout({ children }: { readonly children: ReactNode }) {
  // Get session on the server
  const sessionUser = await getSessionUser();

  return (
  <html lang='it' className='scroll-smooth' suppressHydrationWarning>
      <head>
        <meta name='theme-color' content='#6720FF' />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=5' />
        <meta name='google' content='notranslate' />
        <link rel='icon' href='/logo.png' />
        <link rel='apple-touch-icon' href='/logo.png' />
      </head>
  <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider initialUser={sessionUser}>
            <HideOnProfile>
              <HeaderWrapper sessionUser={sessionUser} />
            </HideOnProfile>
            <main className='min-h-screen'>{children}</main>
            <AuthModal />
          </AuthProvider>
          <HideOnProfile>
            <Footer />
          </HideOnProfile>
          {/* Mobile Theme Toggle - Always visible on mobile, fixed position */}
          <div className='lg:hidden fixed bottom-4 right-4 z-[200]'>
            <ClientThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

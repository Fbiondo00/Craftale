import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthModal } from "@/components/AuthModal";
import { ClientThemeToggle } from "@/components/ClientThemeToggle";
import Footer from "@/components/Footer";
import HideOnProfile from "@/components/HideOnProfile";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { getSessionUser } from "@/lib/supabase/get-session";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Craftale - Agenzia Web - Website Design & Development Agency",
  description:
    " Siamo un agenzia web che realizziamo siti web che funzionano davvero. Servizi professionali di progettazione e sviluppo web che convertono i visitatori in clienti e fanno crescere la tua attività.",
  keywords: ["web design", "web development", "website builder", "e-commerce", "responsive design", "SEO"],
  authors: [{ name: "Craftale Agency" }],
  creator: "craftale",
  publisher: "craftale",
  icons: {
    icon: [{ url: "/logo.png", sizes: "any" }],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://craftale.it",
    title: "Craftale - Agenzia Web - Website Design & Development Agency",
    description:
      "Siamo un agenzia web che realizziamo siti web che funzionano davvero. Servizi professionali di progettazione e sviluppo web che convertono i visitatori in clienti e fanno crescere la tua attività.",
    siteName: "Craftale",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "Craftale - Agenzia Web - Website Design & Development Agency",
    description:
      "Siamo un agenzia web che realizziamo siti web che funzionano davvero. Servizi professionali di progettazione e sviluppo web che convertono i visitatori in clienti e fanno crescere la tua attività.",
    creator: "@craftaleagency",
    images: [],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://craftale.it",
  },
};

export default async function RootLayout({ children }: { readonly children: ReactNode }) {
  // Get session on the server
  const sessionUser = await getSessionUser();

  return (
    <html lang="it" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#6720FF" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider initialUser={sessionUser}>
            <HideOnProfile>
              <HeaderWrapper sessionUser={sessionUser} />
            </HideOnProfile>
            <main className="min-h-screen">{children}</main>
            <AuthModal />
          </AuthProvider>
          <HideOnProfile>
            <Footer />
          </HideOnProfile>
          {/* Mobile Theme Toggle - Always visible on mobile, fixed position */}
          <div className="lg:hidden fixed bottom-4 right-4 z-[200]">
            <ClientThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

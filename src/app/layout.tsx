import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from '@/components/Header';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://urgenthai.com'),
  title: "Screen Test Tool - Free Display Testing Suite | UrgentHai",
  description: "Free professional display testing tools. Check for dead pixels, color accuracy, backlight bleeding, viewing angles, and response time. No download required.",
  keywords: [
    "screen test",
    "monitor test",
    "dead pixel test",
    "color accuracy test",
    "backlight bleed test",
    "viewing angle test",
    "response time test",
    "display testing",
    "LCD test",
    "monitor calibration",
    "screen quality",
    "display diagnostics"
  ],
  authors: [{ name: 'UrgentHai' }],
  creator: 'UrgentHai',
  publisher: 'UrgentHai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Screen Test Tool - Professional Display Testing Suite',
    description: 'Free professional tools to test your display quality. Check dead pixels, color accuracy, backlight bleed, viewing angles, and response time.',
    url: 'https://urgenthai.com',
    siteName: 'UrgentHai Screen Test',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Screen Test Tool - Professional Display Testing Suite',
    description: 'Free professional tools to test your display quality. Check dead pixels, color accuracy, backlight bleed, viewing angles, and response time.',
    creator: '@urgenthai',
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
  verification: {
    google: 'EBLawN1zwgZbeCRGnTslE4d9QP9rxDnK5eNlyzlm6M8',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="canonical" href="https://urgenthai.com" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

import "./global.css";
import type { Metadata } from "next";
import { Gloock, Epilogue, Funnel_Display, Oranienbaum } from "next/font/google";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-switch";
import { metaData } from "./config";
import { JumpToTopButton } from "./components/jump-to-top";

const headingFont = Funnel_Display({
  subsets: ["latin"],
  weight: "400", // Gloock only has a regular weight
  variable: "--font-playfair", // We can keep the variable name for simplicity
  display: "swap",
});


const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  // Link to the web manifest for PWA-like features
  manifest: "/site.webmanifest",
  openGraph: {
    images: metaData.ogImage,
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: metaData.name,
    card: "summary_large_image",
  },
  // Comprehensive icons setup
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${epilogue.variable}`}>
      <head>
        {/* These links are still good practice for RSS readers */}
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="RSS Feed"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          href="/atom.xml"
          title="Atom Feed"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href="/feed.json"
          title="JSON Feed"
        />
        <meta name="google-site-verification" content="t1PASftHKLAyYzTyc5iydqLh9Mqb_TjJRWTx_sTtFv8" />
        <meta name="apple-mobile-web-app-title" content="Dhruv's Portfolio" />
      </head>
      <body className="antialiased flex flex-col items-center min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-auto min-w-0 flex flex-col px-6 sm:px-4 md:px-0 max-w-[624px] w-full mb-20">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
          <JumpToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./global.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-switch";
import { metaData } from "./config";
import { JumpToTopButton } from "./components/jump-to-top";
import { CommandPalette } from "./components/command-palette";
import { SoundProvider } from "app/lib/use-sound";
import {
  DEFAULT_PRIMARY_COLOR_KEY,
  getPrimaryColorCssVariables,
} from "app/lib/primary-colors";
import { getSiteConfigCollection } from "app/lib/collections";

const matterFont = localFont({
  src: [
    {
      path: "../fonts/MatterRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/MatterMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/MatterSemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-matter",
  display: "swap",
});

const seasonMixFont = localFont({
  src: [
    {
      path: "../fonts/SeasonMix-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-seasonmix",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  manifest: "/site.webmanifest",

  // --- OPEN GRAPH (FACEBOOK) & TWITTER META TAGS ---
  openGraph: {
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    images: [
      {
        url: `${metaData.baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.title,
    description: metaData.description,
    images: [`${metaData.baseUrl}/opengraph-image.png`],
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  other: {
    'og:logo': `${metaData.baseUrl}/logo.png`
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultVars = getPrimaryColorCssVariables(DEFAULT_PRIMARY_COLOR_KEY);
  const defaultCssText = Object.entries(defaultVars)
    .map(([k, v]) => `${k}: ${v};`)
    .join(" ");

  return (
    <html lang="en" className={`${seasonMixFont.variable} ${matterFont.variable}`}>
      <head>
        <style>{`:root { ${defaultCssText} }`}</style>
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
        <meta name="apple-mobile-web-app-title" content="Ridham's Portfolio" />
      </head>
      <body className="antialiased font-sans flex flex-col items-center min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <SoundProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main id="main-content" className="flex-auto min-w-0 flex flex-col px-6 sm:px-4 md:px-0 max-w-[624px] w-full mb-20">
              <Navbar />
              {children}
              <Footer />
              <Analytics />
              <SpeedInsights />
            </main>
            <JumpToTopButton />
            <CommandPalette />
            <Suspense fallback={null}>
              <ConfigLoader />
            </Suspense>
          </ThemeProvider>
        </SoundProvider>
      </body>
    </html>
  );
}

async function ConfigLoader() {
  try {
    const configCol = await getSiteConfigCollection();
    const config = await configCol.findOne({ key: "main" });
    const color = config?.primaryColor || DEFAULT_PRIMARY_COLOR_KEY;
    const vars = getPrimaryColorCssVariables(color);
    const cssText = Object.entries(vars)
      .map(([k, v]) => `${k}: ${v};`)
      .join(" ");
    return <style>{`:root { ${cssText} }`}</style>;
  } catch {
    return null;
  }
}

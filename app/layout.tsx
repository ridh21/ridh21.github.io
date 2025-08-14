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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // +++ APPLY FONT VARIABLES TO HTML ELEMENT +++
    <html lang="en" className={`${headingFont.variable} ${epilogue.variable}`}>
      <head>
        {/* ... (head content remains the same) */}
      </head>
      {/* --- MODIFY BODY CLASSNAME --- */}
      <body className="antialiased flex flex-col items-center justify-center mx-auto mb-20 lg:mb-40 font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* --- MODIFY MAIN CLASSNAME --- */}
          <main className="flex-auto min-w-0 flex flex-col px-6 sm:px-4 md:px-0 max-w-[624px] w-full">
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
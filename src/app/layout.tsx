import type { Metadata } from 'next';
import './globals.css';
const description = 'ML researcher working on robot learning and AI safety: benchmarks for how LLM-driven robots behave around people.';
export const metadata: Metadata = {
  metadataBase: new URL('https://ridh21.github.io'),
  title: 'Ridham Patel — ML Researcher',
  description,
  icons: { icon: [{ url: '/icon-512.png', type: 'image/png', sizes: '512x512' }], apple: '/apple-touch-icon.png' },
  openGraph: { type: 'website', url: '/', siteName: 'Ridham Patel', title: 'Ridham Patel — ML Researcher', description, images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Ridham Patel, ML researcher in robot learning and AI safety' }] },
  twitter: { card: 'summary_large_image', site: '@ridhampatel2k4', creator: '@ridhampatel2k4', title: 'Ridham Patel — ML Researcher', description, images: ['/og.png'] },
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
 return <html lang="en" suppressHydrationWarning><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300;6..72,400&display=swap" /><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}`}} /></head><body>{children}</body></html>;
}

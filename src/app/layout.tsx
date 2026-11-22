import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Ridham Patel — ML Researcher',description:'ML researcher working across computer vision, machine unlearning, federated learning, and AI security.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
 return <html lang="en" suppressHydrationWarning><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300;6..72,400&display=swap" /><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}`}} /></head><body>{children}</body></html>;
}

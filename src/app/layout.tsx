import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Ridham Patel — ML Researcher',description:'ML researcher working across computer vision, machine unlearning, federated learning, and AI security.',icons:{icon:'/favicon_shedsgns.svg'}};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
 return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}`}} /></head><body>{children}</body></html>;
}

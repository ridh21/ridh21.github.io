import { notFound } from 'next/navigation';
import Cv from '@/components/pages/PageCv';
import Radius from '@/components/pages/PageRadius';
import Overconsumption from '@/components/pages/PageOverconsumption';
import SiteEnhancements from '@/components/site-enhancements';
export const dynamicParams = false;
const pages = { cv: Cv, radius: Radius, overconsumption: Overconsumption };
const titles: Record<string,string> = { cv: 'CV', radius: 'Diffusion Models 101', overconsumption: 'Machine Unlearning 101' };
export function generateStaticParams() { return Object.keys(pages).map(slug => ({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}) {const {slug} = await params; return {title: `${titles[slug] || 'Page'} — Ridham Patel`};}
export default async function Page({params}: {params: Promise<{slug:string}>}) {
 const {slug} = await params;
 const Component = pages[slug as keyof typeof pages];
 if (!Component) notFound();
 return <><Component /><SiteEnhancements route={slug} /></>;
}

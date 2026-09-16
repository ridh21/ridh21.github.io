import { notFound } from 'next/navigation';
import Alloca from '@/components/pages/PageAlloca';
import Makeugc from '@/components/pages/PageMakeugc';
import Cv from '@/components/pages/PageCv';
import Infinity from '@/components/pages/PageInfinity';
import TwentySeven from '@/components/pages/Page27';
import Radius from '@/components/pages/PageRadius';
import Taste from '@/components/pages/PageTaste';
import Overconsumption from '@/components/pages/PageOverconsumption';
import SiteEnhancements from '@/components/site-enhancements';
export const dynamicParams = false;
const pages = { alloca: Alloca, makeugc: Makeugc, cv: Cv, infinity: Infinity, '27': TwentySeven, radius: Radius, taste: Taste, overconsumption: Overconsumption };
const titles: Record<string,string> = { alloca: 'Alloca', makeugc: 'MakeUGC', cv: 'CV', infinity: 'Selected work', '27': '27 things I am at 27', radius: 'Diffusion Models 101', taste: 'On AI and the human filter', overconsumption: 'Machine Unlearning 101' };
export function generateStaticParams() { return Object.keys(pages).map(slug => ({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}) {const {slug} = await params; return {title: `${titles[slug] || 'Page'} — Ridham Patel`};}
export default async function Page({params}: {params: Promise<{slug:string}>}) {
 const {slug} = await params;
 const Component = pages[slug as keyof typeof pages];
 if (!Component) notFound();
 return <><Component /><SiteEnhancements route={slug} /></>;
}

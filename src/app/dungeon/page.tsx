import type { Metadata } from 'next';
export const metadata: Metadata = { title:'Yum Pop Dungeon', description:'A pixel bubble shooter. Aim, pop matching yums, clear the dungeon.' };
export default function Dungeon(){return <iframe title="Yum Pop Dungeon" src="/dungeon/index.html" className="fixed inset-0 h-dvh w-full border-0" allow="autoplay; fullscreen" />;}

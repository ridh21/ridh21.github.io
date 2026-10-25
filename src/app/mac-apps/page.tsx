import type { Metadata } from 'next';
import MacApps from '@/components/pages/PageMacApps';
import SiteEnhancements from '@/components/site-enhancements';
export const metadata: Metadata = { title: 'Mac apps — Ridham Patel', description: 'The apps I install on a new Mac, with the Homebrew command that installs each one.' };
export default function Page() { return <><MacApps /><SiteEnhancements route="mac-apps" /></>; }

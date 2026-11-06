import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDiffusion from "@/components/pages/ArticleDiffusion";
import ArticleUnlearning from "@/components/pages/ArticleUnlearning";
import { WRITINGS } from "@/components/academic/data";

export const dynamicParams = false;

const articles: Record<string, () => React.JSX.Element> = {
  "diffusion-models-101": ArticleDiffusion,
  "machine-unlearning-101": ArticleUnlearning,
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = WRITINGS.find((w) => w.slug === slug);
  return post ? { title: `${post.title} — Ridham Patel`, description: post.summary } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Article = articles[slug];
  if (!Article) notFound();
  return <Article />;
}

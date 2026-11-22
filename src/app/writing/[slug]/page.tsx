import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDiffusion from "@/components/pages/ArticleDiffusion";
import ArticleUnlearning from "@/components/pages/ArticleUnlearning";
import ArticleFederated from "@/components/pages/ArticleFederated";
import { WRITINGS } from "@/components/academic/data";

export const dynamicParams = false;

const articles: Record<string, () => React.JSX.Element> = {
  "federated-learning": ArticleFederated,
  "diffusion-models": ArticleDiffusion,
  "machine-unlearning": ArticleUnlearning,
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = WRITINGS.find((w) => w.slug === slug);
  if (!post) return {};
  const title = `${post.title} — Ridham Patel`;
  return {
    title,
    description: post.summary,
    openGraph: { type: "article", url: `/writing/${slug}`, siteName: "Ridham Patel", title, description: post.summary, images: [{ url: "/og.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description: post.summary, images: ["/og.png"] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Article = articles[slug];
  if (!Article) notFound();
  return <Article />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CustomMDX } from "app/components/mdx";
import { formatDate } from "app/lib/posts";
import { metaData } from "app/config";
import { getPostsCollection } from "app/lib/collections";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";

/**
 * Pre-validate MDX content. If compilation fails, returns false.
 */
async function isValidMDX(source: string): Promise<boolean> {
  try {
    await compileMDX({
      source,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      },
    });
    return true;
  } catch {
    return false;
  }
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const col = await getPostsCollection();
  const post = await col.findOne({ slug, published: true });
  if (!post) {
    return;
  }

  let ogImage = post.image
    ? post.image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(post.title)}`;

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${metaData.baseUrl}/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const { slug } = await params;
  const col = await getPostsCollection();
  const post = await col.findOne({ slug, published: true });

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            description: post.summary,
            image: post.image
              ? `${metaData.baseUrl}${post.image}`
              : `/og?title=${encodeURIComponent(post.title)}`,
            url: `${metaData.baseUrl}/blog/${slug}`,
            author: {
              "@type": "Person",
              name: metaData.name,
            },
          }),
        }}
      />
      <h1 className="title mb-3 font-medium text-3xl text-[var(--color-contrast-high)]">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-medium">
        <p className="text-sm text-[var(--color-contrast-low)]">
          {formatDate(post.publishedAt)}
        </p>
      </div>

      {/* Hero cover image */}
      {post.image && (
        <div className="relative w-full aspect-[2/1] mb-10 rounded-lg overflow-hidden border border-[var(--color-border)]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            unoptimized={!post.image.includes("res.cloudinary.com")}
          />
        </div>
      )}

      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        {(await isValidMDX(post.content)) ? (
          <CustomMDX source={post.content} />
        ) : (
          <div>
            <div className="px-4 py-3 mb-6 rounded text-sm bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800">
              ⚠ MDX compilation failed — showing raw content. Fix syntax
              errors in the admin panel.
            </div>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
              {post.content}
            </pre>
          </div>
        )}
      </article>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { formatDate } from "app/lib/posts";
import { getPostsCollection } from "app/lib/collections";

export const metadata = {
  title: "Blog",
  description: "A collection of articles and project breakdowns on tech and design.",
};

export const revalidate = 60;

export default function BlogPage() {
  return (
    <section>
      <h1 className="section-heading font-serif text-3xl mb-3">
        All Posts
      </h1>
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList />
      </Suspense>
    </section>
  );
}

function BlogListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="card p-4 flex items-start gap-4 animate-pulse">
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 bg-[var(--color-background-subtle)] rounded" />
            <div className="h-5 w-3/4 bg-[var(--color-background-subtle)] rounded" />
            <div className="h-4 w-full bg-[var(--color-background-subtle)] rounded" />
          </div>
          <div className="w-24 sm:w-32 aspect-square bg-[var(--color-background-subtle)] rounded-md" />
        </div>
      ))}
    </div>
  );
}

async function BlogList() {
  const col = await getPostsCollection();
  const allBlogs = await col
    .find({ published: true })
    .sort({ publishedAt: -1 })
    .toArray();

  if (allBlogs.length === 0) {
    return (
      <p className="text-sm text-[var(--color-contrast-low)]">
        No posts yet. Add some from the admin panel.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {allBlogs.map((post) => (
        <Link
          key={post._id.toString()}
          href={`/blog/${post.slug}`}
          className="group block"
        >
          <article className="card p-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-[var(--color-contrast-low)]">
                {formatDate(post.publishedAt, false)}
              </p>
              <h2 className="mt-1 font-bold font-serif text-[var(--color-contrast-high)] group-hover:text-[var(--color-accent)] transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-contrast-medium)] leading-relaxed line-clamp-2 sm:line-clamp-3">
                {post.summary}
              </p>
            </div>
            {post.image && (
              <div className="relative flex-shrink-0 w-24 sm:w-32 aspect-square overflow-hidden rounded-md border border-[var(--color-border)]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 96px, 128px"
                  loading="lazy"
                  quality={75}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
          </article>
        </Link>
      ))}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "app/lib/posts";
import { getPostsCollection } from "app/lib/collections";

export const metadata = {
  title: "Blog",
  description: "A collection of articles and project breakdowns on tech and design.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const col = await getPostsCollection();
  const allBlogs = await col
    .find({ published: true })
    .sort({ publishedAt: -1 })
    .toArray();

  return (
    <section>
      <h1 className="section-heading font-serif text-3xl mb-3">
        All Posts
      </h1>

      {allBlogs.length === 0 && (
        <p className="text-sm text-[var(--color-contrast-low)]">
          No posts yet. Add some from the admin panel.
        </p>
      )}
      
      {/* Container for the list of blog posts */}
      <div className="space-y-3">
        {allBlogs.map((post) => (
          <Link
            key={post._id.toString()}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="card p-4 flex items-start justify-between gap-4">
              {/* Text Column - takes up remaining space */}
              <div className="flex-1">
                <p className="text-sm text-[var(--color-contrast-low)]">
                  {formatDate(post.publishedAt, false)}
                </p>
                <h2 className="mt-1 font-bold font-serif text-[var(--color-contrast-high)] group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h2>
                {/* Summary text is truncated to 2 lines for a more compact mobile view */}
                <p className="mt-2 text-sm text-[var(--color-contrast-medium)] leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {post.summary}
                </p>
              </div>

              {/* Image Column - smaller fixed width and square aspect ratio */}
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
    </section>
  );
}

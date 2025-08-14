import Link from "next/link";
import Image from "next/image";
import { formatDate, getBlogPosts } from "app/lib/posts";

export const metadata = {
  title: "Blog",
  description: "A collection of articles and project breakdowns on tech and design.",
};

export default function BlogPage() {
  let allBlogs = getBlogPosts().sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">
        All Posts
      </h1>
      
      {/* Container for the list of blog posts with a separator line */}
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {allBlogs.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-5"
          >
            <article className="flex items-start justify-between gap-4">
              {/* Text Column - takes up remaining space */}
              <div className="flex-1">
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <h2 className="mt-1 font-bold font-serif text-neutral-900 dark:text-neutral-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                  {post.metadata.title}
                </h2>
                {/* Summary text is truncated to 2 lines for a more compact mobile view */}
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {post.metadata.summary}
                </p>
              </div>

              {/* Image Column - smaller fixed width and square aspect ratio */}
              {post.metadata.image && (
                <div className="relative flex-shrink-0 w-24 sm:w-32 aspect-square overflow-hidden rounded-md">
                  <Image
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    fill
                    className="object-cover border border-neutral-200 dark:border-neutral-800 transition-transform duration-300 group-hover:scale-105"
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

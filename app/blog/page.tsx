import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";

export const metadata = {
  title: "Blog",
  description: "A collection of articles and project breakdowns on tech and design.",
};

export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        My Blog
      </h1>

      {/* This div will contain our list of blog posts */}
      <div className="flex flex-col">
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            // Each Link is now a flex container with a bottom border for separation
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex justify-between items-baseline py-5 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0"
            >
              {/* Title of the blog post */}
              <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 transition-colors duration-200 group-hover:text-blue-500">
                {post.metadata.title}
              </h2>

              {/* 
                Date of the blog post. 
                'tabular-nums' ensures numbers have a fixed width, preventing layout shifts.
                'ml-4' adds a minimum gap on small screens.
              */}
              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm ml-4 shrink-0">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            </Link>
          ))}
      </div>
    </section>
  );
}
"use client";

import { useEffect } from "react";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog post render error:", error);
  }, [error]);

  return (
    <section>
      <div className="px-4 py-3 mb-6 rounded text-sm bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800">
        <h2 className="font-semibold mb-2">Failed to render this blog post</h2>
        <p className="mb-3">
          This is usually caused by invalid MDX syntax in the post content.
          Check the admin panel for syntax errors (unescaped {"<"}, {"{"}, or
          invalid JSX).
        </p>
        <button
          onClick={reset}
          className="px-3 py-1 text-xs rounded bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}

// page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects by Dhruv Patel.",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Projects</h1>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.url}
            className="block border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Top section: Title, Year, and Description */}
            <div>
              {/* Flex container for Title and Year on the same line */}
              <div className="flex w-full items-baseline justify-between">
                <div className="font-semibold text-lg text-black dark:text-white">
                  {project.title}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {project.year}
                </div>
              </div>
              {/* Description (Tagline) below the Title/Year */}
              <div className="mt-2 text-neutral-600 dark:text-neutral-400 italic text-sm md:text-sm">
                {project.description}
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="prose prose-neutral dark:prose-invert text-sm leading-relaxed">
                <ReactMarkdown>
                  {project.details}
                </ReactMarkdown>
              </div>
            </div>

            {/* Tags Section */}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
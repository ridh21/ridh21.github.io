// page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

export const metadata: Metadata = {
  title: "Projects",
  description: "Nextfolio Projects",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Projects</h1>
      {/* Use space-y to add vertical spacing between project blocks */}
      <div className="space-y-6">
        {projects.map((project, index) => (
          // Make the entire project block clickable
          <Link
            key={index}
            href={project.url}
            // Apply styling to the project block: border, padding, margin-bottom, rounded corners, hover effect
            className="block border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Grid layout for Title and Description */}
            {/* On medium screens and up, use a 1fr (Title) 2fr (Description) grid */}
            {/* On small screens, stack them (default grid-cols-1) */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
              {/* Title */}
              <div className="font-semibold text-lg text-black dark:text-white">
                {project.title}
              </div>
              {/* Description */}
              <div className="text-neutral-600 dark:text-neutral-400 italic text-sm md:text-base">
                {project.description}
              </div>
            </div>

            {/* Details Section */}
            {/* Add a top border and padding for separation */}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              {/* Render markdown details using ReactMarkdown */}
              {/* Use the 'prose' class for basic markdown styling (requires @tailwindcss/typography plugin) */}
              <div className="prose prose-neutral dark:prose-invert text-sm leading-relaxed">
              <ReactMarkdown>
                {project.details}
              </ReactMarkdown>
              </div>
              {/* If you don't use @tailwindcss/typography, you might need to add custom styles for lists, etc. */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
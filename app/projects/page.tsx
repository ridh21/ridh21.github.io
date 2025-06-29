// page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";
import ReactMarkdown from 'react-markdown';
import Image from "next/image";
export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects by Dhruv Patel.",
};

// Helper function to create a URL-friendly slug from a title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-");        // Replace spaces with hyphens
};

export default function Projects() {
  // --- Logic to split projects into two columns for desktop view ---
  const midpoint = Math.ceil(projects.length / 2);
  const leftColumnProjects = projects.slice(0, midpoint);
  const rightColumnProjects = projects.slice(midpoint);

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold">Projects</h1>

      {/* --- TABLE OF CONTENTS SECTION --- */}
      <div className="mb-12 p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-900/50">
        <h2 className="text-lg font-bold mb-4">Table of Contents</h2>

        {/* --- MOBILE TOC (Single Column) --- */}
        <div className="md:hidden">
          <ul className="space-y-2 text-sm">
            {projects.map((project) => (
              <li key={`toc-mobile-${project.title}`}>
                <a
                  href={`#${generateSlug(project.title)}`}
                  className="transition-colors text-neutral-700 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- DESKTOP TOC (Two Columns with Separator) --- */}
        <div className="hidden md:flex w-full justify-between">
          {/* Left Column */}
          <ul className="flex-1 space-y-2 text-sm">
            {leftColumnProjects.map((project) => (
              <li key={`toc-left-${project.title}`}>
                <a
                  href={`#${generateSlug(project.title)}`}
                  className="transition-colors text-neutral-700 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {project.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Vertical Separator Line */}
          <div className="mx-6 border-l border-neutral-200 dark:border-neutral-700"></div>

          {/* Right Column */}
          <ul className="flex-1 space-y-2 text-sm">
            {rightColumnProjects.map((project) => (
              <li key={`toc-right-${project.title}`}>
                <a
                  href={`#${generateSlug(project.title)}`}
                  className="transition-colors text-neutral-700 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* --- END OF TABLE OF CONTENTS --- */}

      {/* --- Projects List --- */}
      {/* Remove space-y here, we will control spacing with borders/hr */}
      <div>
        {projects.map((project, index) => (
          <div key={index} id={generateSlug(project.title)} className="scroll-mt-20">
            {/* --- PROJECT CARD CONTAINER --- */}
            {/* This div acts as our card, with padding and a border */}
            <div className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50">
              
              {/* --- PROJECT IMAGE --- */}
              <Link
                href={project.url}
                className="block group mb-4" // Image is now a clickable link
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={project.image}
                    alt={`Screenshot of the ${project.title} project`}
                    width={1280}
                    height={720}
                    className="w-full object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* --- TEXT CONTENT --- */}
              <div>
                <div className="flex w-full items-baseline justify-between">
                  <Link href={project.url} target="_blank" rel="noopener noreferrer" className="group">
                    <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 transition-colors group-hover:text-blue-500">
                      {project.title}
                    </h3>
                  </Link>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {project.year}
                  </div>
                </div>
                <p className="mt-2 text-neutral-700 dark:text-neutral-300 italic text-sm">
                  {project.description}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="prose prose-neutral dark:prose-invert text-sm leading-relaxed">
                  <ReactMarkdown>{project.details}</ReactMarkdown>
                </div>
              </div>
              {project.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* --- HORIZONTAL RULE SEPARATOR --- */}
            {/* This hr will appear after every project card except the last one */}
            {index < projects.length - 1 && (
              <hr className="my-12 border-neutral-200 dark:border-neutral-800" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
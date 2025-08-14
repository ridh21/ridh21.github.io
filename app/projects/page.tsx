import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";
import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects by Dhruv Patel.",
};

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
        Projects
      </h1>

      {/* A container with a vertical separator between project items */}
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {projects.map((project) => (
          <article key={project.title} className="py-8">
            {/* Project Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg mb-4 border border-neutral-200 dark:border-neutral-800">
              <Image
                src={project.image}
                alt={`Screenshot of the ${project.title} project`}
                fill
                className="object-cover"
              />
            </div>

            {/* Project Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold font-serif text-neutral-900 dark:text-neutral-100">
                  {project.title}
                </h2>
                <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                  {project.description}
                </p>
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-500 flex-shrink-0 mt-1">
                {project.year}
              </span>
            </div>

            {/* Project Details */}
            <div className="mt-4 prose prose-neutral dark:prose-invert text-sm max-w-none">
              <ReactMarkdown>{project.details}</ReactMarkdown>
            </div>

            {/* Tags and Live Link */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:underline"
              >
                View Project
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

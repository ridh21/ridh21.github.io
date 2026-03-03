import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";
import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import { IconArrowUpRight } from "../components/icons";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects by Ridham Patel.",
};

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="section-heading font-serif text-3xl mb-4">
        Projects
      </h1>

      {/* A container with a vertical separator between project items */}
      <div className="space-y-6">
        {projects.map((project) => (
          <article key={project.title} className="card p-0 overflow-hidden">
            {/* Project Image Container */}
            <div className="relative aspect-video overflow-hidden bg-[var(--color-background-subtle)]">
              <Image
                src={project.image}
                alt={`Screenshot of the ${project.title} project`}
                fill
                className="object-contain"
              />
            </div>

            {/* Project Content */}
            <div className="p-5">
              {/* Project Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold font-serif text-[var(--color-contrast-high)]">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-[var(--color-contrast-medium)]">
                    {project.description}
                  </p>
                </div>
                <span className="tag text-xs flex-shrink-0 mt-1">
                  {project.year}
                </span>
              </div>

              {/* Project Details */}
              <div className="mt-4 prose prose-neutral dark:prose-invert text-sm max-w-none">
                <ReactMarkdown>{project.details}</ReactMarkdown>
              </div>

              {/* Tags and Live Link */}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-sm gap-1.5 h-7"
                >
                  View Project
                  <IconArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

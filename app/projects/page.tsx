import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getProjectsCollection } from "app/lib/collections";
import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import { IconArrowUpRight } from "../components/icons";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects by Ridham Patel.",
};

export const revalidate = 60;

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="section-heading font-serif text-3xl mb-4">
        Projects
      </h1>
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectList />
      </Suspense>
    </section>
  );
}

function ProjectListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card p-0 overflow-hidden animate-pulse">
          <div className="aspect-video bg-[var(--color-background-subtle)]" />
          <div className="p-5 space-y-3">
            <div className="h-5 w-48 bg-[var(--color-background-subtle)] rounded" />
            <div className="h-4 w-full bg-[var(--color-background-subtle)] rounded" />
            <div className="h-4 w-3/4 bg-[var(--color-background-subtle)] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function ProjectList() {
  const col = await getProjectsCollection();
  const projects = await col.find({}).sort({ order: 1 }).toArray();

  if (projects.length === 0) {
    return (
      <p className="text-sm text-[var(--color-contrast-low)]">
        No projects yet. Add some from the admin panel.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <article key={project._id.toString()} className="card p-0 overflow-hidden">
          <div className="relative aspect-video overflow-hidden bg-[var(--color-background-subtle)]">
            <Image
              src={project.image}
              alt={`Screenshot of the ${project.title} project`}
              fill
              sizes="(max-width: 640px) 100vw, 624px"
              loading="lazy"
              quality={75}
              className="object-contain"
            />
          </div>
          <div className="p-5">
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
            <div className="mt-4 prose prose-neutral dark:prose-invert text-sm max-w-none">
              <ReactMarkdown>{project.details}</ReactMarkdown>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
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
  );
}

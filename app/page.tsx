import Link from "next/link";
import { Suspense } from "react";
import {
  IconArrowUpRight,
  IconGitHub,
  IconFileText,
  IconMail,
  IconLinkedIn,
  IconGoogleScholar,
} from "./components/icons";
import { socialLinks } from "./config";
import {
  getProjectsCollection,
  getExperienceCollection,
  getResearchCollection,
} from "app/lib/collections";

export const revalidate = 60;

// --- Reusable Entry Component for Projects & Publications ---
function ListEntry({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 rounded-lg transition-all duration-200 hover:bg-[var(--color-accent-subtle)]"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-[var(--color-contrast-high)]">
          {title}
        </h3>
        <IconArrowUpRight
          size={20}
          className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transform transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
      <p className="text-[var(--color-contrast-medium)] text-sm mt-1">
        {description}
      </p>
    </Link>
  );
}

function ProjectEntry({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 rounded-lg transition-all duration-200 hover:bg-[var(--color-accent-subtle)]"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-[var(--color-contrast-high)]">
          {title}
        </h3>
        <IconArrowUpRight
          size={20}
          className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transform transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
      <p className="text-[var(--color-contrast-medium)] text-sm mt-1">
        {description}
      </p>
    </Link>
  );
}

function SocialLink({ href, icon: Icon, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-ghost text-sm gap-2 px-2 h-8 text-[var(--color-contrast-low)] hover:text-[var(--color-accent)]"
    >
      <Icon size={16} />
      {children}
    </a>
  );
}

export default function Page() {
  return (
    <section>
      <IntroSection />

      <Suspense fallback={<SectionPlaceholder title="Experience" />}>
        <ExperienceSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder title="Projects" />}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder title="Research Publications" />}>
        <ResearchSection />
      </Suspense>

      <FooterSection />
    </section>
  );
}

function SectionPlaceholder({ title }: { title: string }) {
  return (
    <div className="mt-6">
      <h2 className="section-heading font-serif text-xl text-[var(--color-contrast-medium)]">
        {title}
      </h2>
    </div>
  );
}

function IntroSection() {
  return (
    <>
      <div className="flex justify-between items-start gap-8">
        <div>
          <h1 className="font-serif font-normal text-3xl md:text-4xl mb-2 text-[var(--color-accent)]">
            Ridham Patel
          </h1>
          <h2 className="text-[var(--color-contrast-medium)] mb-4">
            Software Developer · Researcher · AI/ML Engineer
          </h2>
          <a
            href={socialLinks.email}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-transparent bg-[var(--color-background-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--color-contrast-medium)] transition-all hover:border-[var(--color-border-strong)] active:scale-95"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            AVAILABLE FOR FULLTIME AI/ML ENGINEER ROLES
          </a>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>I design and deploy production-grade AI systems with experience building scalable backend architectures, MLOps pipelines, multimodal AI, and real-time ML inference. Currently actively contributing to open-source while seeking AI/ML and Backend Engineer roles.</p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <SocialLink href="/resume.pdf" icon={IconFileText}>
          Resume
        </SocialLink>
        <SocialLink href={socialLinks.scholar} icon={IconGoogleScholar}>
          Scholar
        </SocialLink>
        <SocialLink href={socialLinks.github} icon={IconGitHub}>
          GitHub
        </SocialLink>
        <SocialLink href={socialLinks.linkedin} icon={IconLinkedIn}>
          LinkedIn
        </SocialLink>
        <SocialLink href={socialLinks.email} icon={IconMail}>
          Email
        </SocialLink>
      </div>
    </>
  );
}

async function ExperienceSection() {
  const col = await getExperienceCollection();
  const experiences = await col.find({}).sort({ order: 1 }).toArray();

  if (experiences.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="section-heading font-serif text-xl">
        Experience
      </h2>
      <div className="mt-4 space-y-4">
        {experiences.map((exp) => (
          <div key={exp._id.toString()} className="card p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-[var(--color-contrast-high)]">
                  {exp.role}
                </h3>
                <p className="text-sm text-[var(--color-contrast-medium)]">
                  {exp.company} · {exp.location}
                </p>
              </div>
              <span className="tag text-xs">
                {exp.period}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-foreground)]">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

async function ProjectsSection() {
  const col = await getProjectsCollection();
  const projects = await col.find({}).sort({ order: 1 }).limit(4).toArray();

  if (projects.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="section-heading font-serif text-xl">
        Projects
      </h2>
      <div className="space-y-0">
        {projects.map((project) => (
          <ProjectEntry
            key={project._id.toString()}
            title={project.title}
            description={project.description}
            url={project.url}
          />
        ))}
      </div>
    </div>
  );
}

async function ResearchSection() {
  const col = await getResearchCollection();
  const research = await col.find({}).sort({ order: 1 }).toArray();

  if (research.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="section-heading font-serif text-xl">
        Research Publications
      </h2>
      <div className="space-y-1">
        {research.map((item) => (
          <ListEntry
            key={item._id.toString()}
            title={item.title}
            description={item.description}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
}

function FooterSection() {
  return (
    <div className="mt-3 surface-subtle p-3 text-sm text-center text-[var(--color-contrast-medium)]">
      <span>Feel free to explore my </span>
      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[var(--color-accent)] hover:underline"
      >
        GitHub
      </a>
      <span> for more projects. Most of them are open-source.</span>
    </div>
  );
}

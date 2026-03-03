import Image from "next/image";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconGitHub,
  IconFileText,
  IconMail,
  IconLinkedIn,
  IconGoogleScholar,
} from "./components/icons";
import { socialLinks } from "./config";
import { projects } from "../app/projects/project-data";


// --- Data for Research Publications ---
const publications = [
  {
    title: "A Novel Approach to Predict the Student Dropout Rate Using Regression",
    journal: "IEEE International Conference for Convergence in Technology (I2CT)",
    year: "2024",
    url: "https://ieeexplore.ieee.org/document/10543438",
  },
];

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
  const featuredProjects = projects.slice(0, 4);

  return (
    <section>
      {/* --- INTRO SECTION --- */}
      <div className="flex justify-between items-start gap-8">
        <div>
          <h1 className="font-serif font-normal text-3xl md:text-4xl mb-2 text-[var(--color-accent)]">
            Dhruvkumar Patel
          </h1>
          <h2 className="text-[var(--color-contrast-medium)] mb-4">
            Software Developer · Researcher · AI/ML Engineer
          </h2>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I build scalable ML systems. Currently a Data Scientist Intern at Myntra
          working on Ads Ranking, and a researcher at IIIT-Delhi's MIDAS Lab
          exploring multi-modal AI. My work has been recognized at national
          hackathons and published by the IEEE.
        </p>
      </div>

      {/* --- SOCIAL & RESUME LINKS --- */}
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

      {/* --- EXPERIENCE SECTION --- */}
      <div className="mt-6">
        <h2 className="section-heading font-serif text-xl">
          Experience
        </h2>
        <div className="mt-4 space-y-4">
          <div className="card p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-[var(--color-contrast-high)]">
                  Data Scientist Intern
                </h3>
                <p className="text-sm text-[var(--color-contrast-medium)]">
                  Myntra · Bengaluru, Karnataka
                </p>
              </div>
              <span className="tag text-xs">
                Jan 2026 — Present
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-foreground)]">
              Contributing to the Ads Rank team, building modular ML training pipelines and data preparation systems for ad CTR optimization. Improved production ranking model by 6% F1 score and reduced training time by 50%.
            </p>
          </div>
          <div className="card p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-[var(--color-contrast-high)]">
                  Graduate Student Researcher
                </h3>
                <p className="text-sm text-[var(--color-contrast-medium)]">
                  MIDAS Lab, IIIT Delhi · New Delhi
                </p>
              </div>
              <span className="tag text-xs">
                Jan 2025 — Present
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-foreground)]">
              Working on improving small LLM generation using Mixture of Refinement Agents. Developed end-to-end inference APIs with FastAPI and Celery for multimodal LLM-based annotation anomaly detection.
            </p>
          </div>
        </div>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <div className="mt-6">
        <h2 className="section-heading font-serif text-xl">
          Projects
        </h2>
        <div className="space-y-0">
          {featuredProjects.map((project) => (
            <ProjectEntry
              key={project.title}
              title={project.title}
              description={project.description}
              url={project.url}
            />
          ))}
        </div>
      </div>

      {/* --- RESEARCH PUBLICATIONS SECTION --- */}
      <div className="mt-6">
        <h2 className="section-heading font-serif text-xl">
          Research Publications
        </h2>
        <div className="space-y-1">
          {publications.map((pub) => (
            <ListEntry
              key={pub.title}
              title={pub.title}
              description={`${pub.journal}, ${pub.year}`}
              url={pub.url}
            />
          ))}
        </div>
      </div>

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
    </section>
  );
}

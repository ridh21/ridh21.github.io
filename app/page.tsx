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
const research = [
  {
    title: "FED-DETR: Privacy-Preserving Intelligent Traffic Enforcement",
    description: "Research Paper – Under Review",
    url: "#",
  },
  {
    title: "Automated Waste Segregation Smart Dustbin",
    description: "Patent – Under Review",
    url: "#",
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
            Ridham Patel
          </h1>
          <h2 className="text-[var(--color-contrast-medium)] mb-4">
            Software Developer · Researcher · AI/ML Engineer
          </h2>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I design and deploy production-grade AI systems. Currently working as
          an Associate Software Engineer building secure, high-availability LLM
          systems. My work spans MLOps, scalable backend architectures,
          multimodal AI, and real-time ML inference.
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
                  Associate Software Engineer
                </h3>
                <p className="text-sm text-[var(--color-contrast-medium)]">
                  OpenXcell Technolabs · Ahmedabad
                </p>
              </div>
              <span className="tag text-xs">
                Aug 2025 – Present
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-foreground)]">
                Developed scalable backend and AI-driven systems using FastAPI and microservices architecture, delivering robust APIs and intelligent data pipelines to power client-facing applications and production systems.
            </p>
          </div>
          <div className="card p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-[var(--color-contrast-high)]">
                  AI/ML Intern
                </h3>
                <p className="text-sm text-[var(--color-contrast-medium)]">
                  IEEE EMBS Pune Chapter · Remote
                </p>
              </div>
              <span className="tag text-xs">
                Jun 2025 – Jul 2025
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-foreground)]">
              Built an end-to-end deep learning pipeline for schizophrenia diagnosis using EEG data. Achieved 96% accuracy using ensemble stacking with ResNet50, EfficientNetB2, and DenseNet121.
            </p>
          </div>
          <div className="card p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-[var(--color-contrast-high)]">
                  Software Development Intern
                </h3>
                <p className="text-sm text-[var(--color-contrast-medium)]">
                  Institute for Plasma Research · Gandhinagar
                </p>
              </div>
              <span className="tag text-xs">
                Aug 2024 – Nov 2024
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-foreground)]">
              Developed a full-stack assessment and data collection platform for predictive student analytics. Engineered a resilient Node.js + TypeScript backend with real-time processing capabilities.
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

      {/* --- Research Publications SECTION --- */}
      <div className="mt-6">
        <h2 className="section-heading font-serif text-xl">
          Research Publications
        </h2>
        <div className="space-y-1">
          {research.map((item) => (
            <ListEntry
              key={item.title}
              title={item.title}
              description={item.description}
              url={item.url}
            />
          ))}
        </div>
      </div>

      {/* --- ACHIEVEMENTS --- */}
      {/* <div className="mt-6">
        <h2 className="section-heading font-serif text-xl">
          Achievements
        </h2>
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-3 p-3 rounded-lg">
            <span className="text-[var(--color-accent)] mt-0.5">✦</span>
            <p className="text-sm text-[var(--color-foreground)]">
              National Level Hackathon Finalist (4×) – SIH 2023, SIH 2024, Odoo Hackathon (March & Nov 2025)
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg">
            <span className="text-[var(--color-accent)] mt-0.5">✦</span>
            <p className="text-sm text-[var(--color-foreground)]">
              State Level Winner – SSIP 2023
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg">
            <span className="text-[var(--color-accent)] mt-0.5">✦</span>
            <p className="text-sm text-[var(--color-foreground)]">
              AWS Certified Cloud Practitioner (CLF-C02)
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg">
            <span className="text-[var(--color-accent)] mt-0.5">✦</span>
            <p className="text-sm text-[var(--color-foreground)]">
              Webmaster, IEEE Student Branch – LDRP-ITR
            </p>
          </div>
        </div>
      </div> */}

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

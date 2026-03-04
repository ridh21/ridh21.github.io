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
import {
  getProjectsCollection,
  getExperienceCollection,
  getResearchCollection,
  getSiteConfigCollection,
} from "app/lib/collections";

export const dynamic = "force-dynamic";

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

export default async function Page() {
  const [projectCol, expCol, researchCol, configCol] = await Promise.all([
    getProjectsCollection(),
    getExperienceCollection(),
    getResearchCollection(),
    getSiteConfigCollection(),
  ]);

  const [projects, experiences, research, siteConfig] = await Promise.all([
    projectCol.find({}).sort({ order: 1 }).limit(4).toArray(),
    expCol.find({}).sort({ order: 1 }).toArray(),
    researchCol.find({}).sort({ order: 1 }).toArray(),
    configCol.findOne({ key: "main" }),
  ]);

  const name = siteConfig?.name || "Ridham Patel";
  const subtitle = siteConfig?.subtitle || "Software Developer · Researcher · AI/ML Engineer";
  const bio = siteConfig?.bio || "I design and deploy production-grade AI systems. Currently working as an Associate Software Engineer building secure, high-availability LLM systems. My work spans MLOps, scalable backend architectures, multimodal AI, and real-time ML inference.";

  return (
    <section>
      {/* --- INTRO SECTION --- */}
      <div className="flex justify-between items-start gap-8">
        <div>
          <h1 className="font-serif font-normal text-3xl md:text-4xl mb-2 text-[var(--color-accent)]">
            {name}
          </h1>
          <h2 className="text-[var(--color-contrast-medium)] mb-4">
            {subtitle}
          </h2>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>{bio}</p>
      </div>

      {/* --- SOCIAL & RESUME LINKS --- */}
      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <SocialLink href="/resume.pdf" icon={IconFileText}>
          Resume
        </SocialLink>
        <SocialLink href={siteConfig?.socialLinks?.scholar || socialLinks.scholar} icon={IconGoogleScholar}>
          Scholar
        </SocialLink>
        <SocialLink href={siteConfig?.socialLinks?.github || socialLinks.github} icon={IconGitHub}>
          GitHub
        </SocialLink>
        <SocialLink href={siteConfig?.socialLinks?.linkedin || socialLinks.linkedin} icon={IconLinkedIn}>
          LinkedIn
        </SocialLink>
        <SocialLink href={siteConfig?.socialLinks?.email || socialLinks.email} icon={IconMail}>
          Email
        </SocialLink>
      </div>

      {/* --- EXPERIENCE SECTION --- */}
      {experiences.length > 0 && (
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
      )}

      {/* --- PROJECTS SECTION --- */}
      {projects.length > 0 && (
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
      )}

      {/* --- Research Publications SECTION --- */}
      {research.length > 0 && (
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
      )}

      <div className="mt-3 surface-subtle p-3 text-sm text-center text-[var(--color-contrast-medium)]">
        <span>Feel free to explore my </span>
        <a
          href={siteConfig?.socialLinks?.github || socialLinks.github}
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

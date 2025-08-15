import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, FileText, Mail } from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaGoogleScholar } from "react-icons/fa6";
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
      className="group block p-4 rounded-lg transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-900/50"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
          {title}
        </h3>
        <ArrowUpRight
          className="w-5 h-5 text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transform transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
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
      className="group block p-4 rounded-lg transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-900/50"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
          {title}
        </h3>
        <ArrowUpRight
          className="w-5 h-5 text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transform transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
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
      className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-teal-700 dark:hover:text-teal-400"
    >
      <Icon className="w-4 h-4" />
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
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-2 text-teal-700 dark:text-teal-400">
            Dhruvkumar Patel
          </h1>
          <h2 className="text-neutral-700 dark:text-neutral-300 mb-4">
            Software Developer · Researcher · AI/ML Engineer
          </h2>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I build scalable systems for AI. As a researcher at IIIT-Delhi's
          MIDAS Lab, I turn complex challenges in multi-modal AI and computer
          vision into production-ready solutions. My work has been recognized
          at national hackathons and published by the IEEE.
        </p>
      </div>

      {/* --- SOCIAL & RESUME LINKS --- */}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        <SocialLink href="/resume.pdf" icon={FileText}>
          Resume
        </SocialLink>
        <SocialLink href={socialLinks.scholar} icon={FaGoogleScholar}>
          Scholar
        </SocialLink>
        <SocialLink href={socialLinks.github} icon={Github}>
          GitHub
        </SocialLink>
        <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn}>
          LinkedIn
        </SocialLink>
        <SocialLink href={socialLinks.email} icon={Mail}>
          Email
        </SocialLink>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <div className="mt-6">
        <h2 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">
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
        <h2 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">
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

      <div className="mt-3 p-3 bg-neutral-200/35 dark:bg-neutral-900/50 rounded-lg text-sm text-center text-neutral-600 dark:text-neutral-400">
        <span>Feel free to explore my </span>
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-teal-700 dark:text-teal-400 hover:underline"
        >
          GitHub
        </a>
        <span> for more projects. Most of them are open-source.</span>
      </div>
    </section>
  );
}

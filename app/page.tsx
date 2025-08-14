import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react"; // Import the Github icon
import { socialLinks } from "./config";
import { projects } from "../app/projects/project-data";

// Updated component: No 'isFeatured' prop. Hover effects are now universal.
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
        {/* The arrow is now hidden by default and appears on group-hover */}
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
          I'm an M.Tech CSE student at IIIT-Delhi and a Researcher at MIDAS Lab,
          where I build scalable systems for AI. My work involves fine-tuning{" "}
          <strong className="font-semibold">multi-modal LLMs</strong> and
          engineering high-performance inference APIs with{" "}
          <strong className="font-semibold">Python, FastAPI, and Celery</strong>.
        </p>
        <p>
          My passion is turning complex research into tangible impact. I've
          improved production model accuracy by 4% with a custom{" "}
          <strong className="font-semibold">C++/OpenCV</strong> data generator,
          led teams to a national hackathon final (KAVACH-23), and won a
          state-level competition that resulted in a published{" "}
          <strong className="font-semibold">
            <a href="https://ieeexplore.ieee.org/document/10543438">
              IEEE conference paper
            </a>
          </strong>
          .
        </p>
        <p>
          I'm actively seeking roles where I can apply my expertise in{" "}
          <strong className="font-semibold">
            Computer Vision, AI/ML, and distributed systems
          </strong>{" "}
          to solve challenging problems.
        </p>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <div className="mt-6">
        <h2 className="font-serif text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
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
        
        {/* --- UPDATED GITHUB LINK SECTION --- */}
        <div className="mt-2 flex items-center justify-center gap-3 p-2 bg-teal-50/50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900 rounded-lg text-sm text-neutral-600 dark:text-neutral-400">
          <Github className="w-5 h-5 text-neutral-500 dark:text-neutral-500" />
          <span>
            Feel free to explore my{' '}
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-700 dark:text-teal-400 underline hover:no-underline"
            >
              GitHub
            </a>
            {' '}for more projects.
          </span>
        </div>
      </div>
    </section>
  );
}

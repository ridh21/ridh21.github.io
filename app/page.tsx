import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <div className="flex justify-between items-start gap-8">
        <div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-2 text-teal-700 dark:text-teal-400">
            Dhruvkumar Patel
          </h1>
          <h2 className="text-neutral-700 dark:text-neutral-300 mb-8">
            Software Developer · Researcher · AI/ML Engineer
          </h2>
        </div>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:block"
        >
          <Image
            src="/profile.png"
            alt="Profile photo"
            className="rounded-full bg-gray-100 grayscale hover:grayscale-0 transition-all"
            unoptimized
            width={120}
            height={120}
            priority
          />
        </a>
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
    </section>
  );
}
import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.linkedin} target="_blank">
        <Image
          src="/profile.png"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale-1 hover:grayscale-0"
          unoptimized
          width={175}
          height={175}
          priority
        />
      </a>
      <div className="prose prose-neutral dark:prose-invert">
          <p>
            I'm an M.Tech CSE student at IIIT-Delhi and a Researcher at MIDAS Lab,
            where I build scalable systems for AI. My work involves fine-tuning{" "}
            <strong className="font-semibold">multi-modal LLMs</strong> and
            engineering high-performance inference APIs with{" "}
            <strong className="font-semibold">Python, FastAPI, and Celery</strong>.
          </p>
          <p>
            My passion is turning complex research into tangible impact. I've improved
            production model accuracy by 4% with a custom{" "}
            <strong className="font-semibold">C++/OpenCV</strong> data generator,
            led teams to a national hackathon final (KAVACH-23), and won a
            state-level competition that resulted in a published{" "}
            <strong className="font-semibold"><a href="https://ieeexplore.ieee.org/document/10543438">IEEE conference paper</a></strong>.
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

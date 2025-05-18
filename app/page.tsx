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
      <h1 className="mb-8 text-2xl font-medium">
        Hi, I'm Dhruvkumar Patel!
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          A passionate M.Tech CSE student at IIIT-Delhi, engineer by training, innovator by mindset.
        </p>
        <p>
          I work at the intersection of machine learning, computer vision, and software engineering to build intelligent, scalable solutions. From leading national hackathon teams to publishing IEEE conference paper, I love translating ideas into impact.
        </p>
        <p>
          I believe in continuous learning, meaningful collaboration, and turning complexity into simplicity. Let’s connect — whether you're looking for a teammate, a developer, or just a good tech conversation.
        </p>
      </div>
    </section>
  );
}

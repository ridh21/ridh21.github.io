import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proemio",
  description: "The philosophy and technology behind this website.",
};

const personalStack = [
  { name: "VS Code", description: "My primary code editor, customized for efficiency." },
  { name: "Notion", description: "For project management, note-taking, and personal organization." },
  { name: "PenPot", description: "For UI/UX design, prototyping, and visual brainstorming." },
  { name: "iTerm2", description: "A versatile and powerful terminal for macOS." },
];

function StackListItem({ name, description }: { name: string; description: string }) {
  return (
    <li>
      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{name}</span>
      <span className="text-neutral-600 dark:text-neutral-400"> — {description}</span>
    </li>
  );
}

export default function ProemioPage() {
  return (
    <section>
      <h1 className="font-serif text-4xl font-bold text-teal-700 dark:text-teal-400">
        Proemio
      </h1>
      <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
        /proˈɛ.mi.o/ — an introduction or preface, especially to a speech or literary work.
      </p>

      <div className="mt-4 prose prose-neutral dark:prose-invert max-w-none">
        <p>
          This portfolio is more than just a collection of projects; it's a preface to my approach as a developer and researcher. It serves as an introduction to how I think, solve problems, and translate complex ideas into clean, functional, and scalable solutions.
        </p>
        <p>
          Every element, from the typography to the page transitions, was deliberately chosen to create an experience that is fast, accessible, and hopefully, a pleasure to explore. This site is a living document—a snapshot of my ongoing journey in the world of technology.
        </p>

        <p className="font-serif text-lg font-semibold">Personal Stack
        </p>
        <ul>
          {personalStack.map((item) => (
            <StackListItem key={item.name} name={item.name} description={item.description} />
          ))}
        </ul>
      </div>
    </section>
  );
}

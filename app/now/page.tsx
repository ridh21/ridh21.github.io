import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Now",
  description: "What Ridham Patel is focused on, building, and learning right now.",
};

// ── Edit me ──────────────────────────────────────────────────────────────────
// A /now page (see nownownow.com) is a snapshot of what I'm focused on at this
// point in life. Update the date below whenever you revise the lists.
const LAST_UPDATED = "June 2026";
const LOCATION = "Ahmedabad, India";

const building = [
  "Shipping production AI/ML systems — scalable backends, MLOps pipelines, and real-time inference.",
  "Polishing this portfolio: page transitions, a command palette, and a design gallery.",
  "Contributing to open-source projects while interviewing for full-time AI/ML & Backend roles.",
];

const learning = [
  "Going deeper on LLM systems — retrieval, evals, and agent patterns.",
  "Distributed systems and the architecture behind low-latency ML serving.",
  "Sharpening my eye for typography and color systems in interface design.",
];

const reading = [
  "Papers on retrieval-augmented generation and model evaluation.",
  "Engineering write-ups on feature pipelines and inference infrastructure.",
];
// ──────────────────────────────────────────────────────────────────────────────

function NowSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-8">
      <h2 className="section-heading font-serif text-xl text-[var(--color-contrast-high)]">
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[var(--color-foreground)]">
            <span
              aria-hidden="true"
              className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NowPage() {
  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-4xl font-normal text-[var(--color-accent)]">
          Now
        </h1>
        <span className="tag gap-1.5 px-3 py-1 text-xs font-medium">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          {LOCATION}
        </span>
      </div>

      <p className="mt-3 text-base text-[var(--color-contrast-medium)]">
        A snapshot of what I&apos;m focused on right now — a{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--color-accent)] hover:underline"
        >
          /now page
        </a>
        , inspired by Derek Sivers.
      </p>

      <NowSection title="Currently building" items={building} />
      <NowSection title="Currently learning" items={learning} />
      <NowSection title="Currently reading" items={reading} />

      <div className="mt-10 surface-subtle p-3 text-sm text-center text-[var(--color-contrast-medium)]">
        Last updated {LAST_UPDATED}. Curious where I&apos;ve been?{" "}
        <Link href="/proemio" className="font-semibold text-[var(--color-accent)] hover:underline">
          Read the Proemio
        </Link>
        .
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import {
  getExperienceCollection,
  getResearchCollection,
} from "app/lib/collections";

export const metadata: Metadata = {
  title: "CV",
  description: "The curriculum vitae of Ridham Patel.",
};

export const revalidate = 60;

export default function CVPage() {
  return (
    <div>
      <h1 className="section-heading font-serif text-3xl mb-8">
        Curriculum Vitae
      </h1>

      <StaticSections />

      <Suspense fallback={<SectionSkeleton title="Experience" />}>
        <ExperienceSection />
      </Suspense>

      <StaticSection title="Certifications">
        <div className="card p-4 mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold text-lg text-[var(--color-contrast-high)]">
              AWS Certified Cloud Practitioner (CLF-C02)
            </h3>
            <span className="tag text-xs">Active</span>
          </div>
          <p className="text-[var(--color-contrast-medium)]">
            Amazon Web Services – Foundational Cloud Certification
          </p>
        </div>
      </StaticSection>

      <Suspense fallback={<SectionSkeleton title="Research Publications" />}>
        <ResearchSection />
      </Suspense>

      <StaticSection title="Technical Skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <h4 className="font-semibold text-md text-[var(--color-contrast-high)]">Languages</h4>
            <p className="text-sm text-[var(--color-contrast-medium)] mt-1">Python, JavaScript, TypeScript, C/C++, SQL (Postgres), HTML/CSS</p>
          </div>
          <div className="card p-4">
            <h4 className="font-semibold text-md text-[var(--color-contrast-high)]">Frameworks</h4>
            <p className="text-sm text-[var(--color-contrast-medium)] mt-1">FastAPI, Django, Next.js, React, Node.js, LangChain, Flask</p>
          </div>
          <div className="card p-4">
            <h4 className="font-semibold text-md text-[var(--color-contrast-high)]">AI/ML</h4>
            <p className="text-sm text-[var(--color-contrast-medium)] mt-1">PyTorch, TensorFlow, scikit-learn, Hugging Face, OpenCV, Pinecone, RAG</p>
          </div>
          <div className="card p-4">
            <h4 className="font-semibold text-md text-[var(--color-contrast-high)]">DevOps & Tools</h4>
            <p className="text-sm text-[var(--color-contrast-medium)] mt-1">Git, Docker, AWS, Celery, RabbitMQ, Redis, PostgreSQL, Linux/Bash</p>
          </div>
        </div>
      </StaticSection>

      <StaticSection title="Achievements">
        <div className="space-y-3">
          {[
            "National Level Hackathon Finalist (4×) – SIH 2023, SIH 2024, Odoo Hackathon (March & Nov 2025)",
            "State Level Winner – SSIP 2023",
            "AWS Certified Cloud Practitioner (CLF-C02)",
            "Webmaster, IEEE Student Branch – LDRP-ITR",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3 p-3 card">
              <span className="text-[var(--color-accent)] mt-0.5">✦</span>
              <p className="text-sm text-[var(--color-foreground)]">{text}</p>
            </div>
          ))}
        </div>
      </StaticSection>
    </div>
  );
}

function StaticSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-normal font-serif mb-6 text-[var(--color-accent)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SectionSkeleton({ title }: { title: string }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-normal font-serif mb-6 text-[var(--color-contrast-medium)]">
        {title}
      </h2>
    </section>
  );
}

function StaticSections() {
  return (
    <>
      <StaticSection title="Education">
        <div className="card p-4 mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold text-lg text-[var(--color-contrast-high)]">
              LDRP Institute of Technology and Research
            </h3>
            <span className="tag text-xs">2022 - 2026</span>
          </div>
          <p className="text-[var(--color-contrast-medium)]">
            B.E. Information Technology, CGPA: 7.70
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-[var(--color-foreground)] text-sm">
            <li>Relevant Coursework: AI, Machine Learning, NLP, Data Structures & Algorithms, DBMS, Operating Systems.</li>
            <li>Multiple national hackathon finalist and state-level winner.</li>
            <li>Webmaster at IEEE Student Branch – LDRP-ITR.</li>
          </ul>
        </div>
      </StaticSection>
    </>
  );
}

async function ExperienceSection() {
  const col = await getExperienceCollection();
  const experiences = await col.find({}).sort({ order: 1 }).toArray();

  if (experiences.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-normal font-serif mb-6 text-[var(--color-accent)]">
        Experience
      </h2>
      {experiences.map((exp) => (
        <div key={exp._id.toString()} className="card p-4 mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold text-lg text-[var(--color-contrast-high)]">
              {exp.role}
            </h3>
            <span className="tag text-xs">{exp.period}</span>
          </div>
          <p className="text-[var(--color-contrast-medium)]">{exp.company}, {exp.location}</p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-[var(--color-foreground)] text-sm">
            {exp.description.split("\n").filter(Boolean).map((detail: string, i: number) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

async function ResearchSection() {
  const col = await getResearchCollection();
  const research = await col.find({}).sort({ order: 1 }).toArray();

  if (research.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-normal font-serif mb-6 text-[var(--color-accent)]">
        Research Publications
      </h2>
      {research.map((r) => (
        <div key={r._id.toString()} className="card p-4 mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold text-lg text-[var(--color-contrast-high)]">
              {r.title}
            </h3>
          </div>
          <p className="text-[var(--color-contrast-medium)]">{r.description}</p>
        </div>
      ))}
    </section>
  );
}

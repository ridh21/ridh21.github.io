import type { Metadata } from "next";
import {
  getExperienceCollection,
  getResearchCollection,
} from "app/lib/collections";

export const metadata: Metadata = {
  title: "CV",
  description: "The curriculum vitae of Ridham Patel.",
};

export const dynamic = "force-dynamic";

interface CVEntryProps {
  title: string;
  subtitle: string;
  date: string;
  details: string[];
}

function CVEntry({ title, subtitle, date, details }: CVEntryProps) {
  return (
    <div className="card p-4 mb-4">
      <div className="flex justify-between items-baseline">
        <h3 className="font-semibold text-lg text-[var(--color-contrast-high)]">
          {title}
        </h3>
        <span className="tag text-xs">
          {date}
        </span>
      </div>
      <p className="text-[var(--color-contrast-medium)]">{subtitle}</p>
      <ul className="mt-2 list-disc list-inside space-y-1 text-[var(--color-foreground)] text-sm">
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-normal font-serif mb-6 text-[var(--color-accent)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function CVPage() {
  const [expCol, researchCol] = await Promise.all([
    getExperienceCollection(),
    getResearchCollection(),
  ]);

  const [experiences, research] = await Promise.all([
    expCol.find({}).sort({ order: 1 }).toArray(),
    researchCol.find({}).sort({ order: 1 }).toArray(),
  ]);

  return (
    <div>
      <h1 className="section-heading font-serif text-3xl mb-8">
        Curriculum Vitae
      </h1>

      <Section title="Education">
        <CVEntry
          title="LDRP Institute of Technology and Research"
          subtitle="B.E. Information Technology, CGPA: 7.70"
          date="2022 - 2026"
          details={[
            "Relevant Coursework: AI, Machine Learning, NLP, Data Structures & Algorithms, DBMS, Operating Systems.",
            "Multiple national hackathon finalist and state-level winner.",
            "Webmaster at IEEE Student Branch – LDRP-ITR.",
          ]}
        />
      </Section>

      {experiences.length > 0 && (
        <Section title="Experience">
          {experiences.map((exp) => (
            <CVEntry
              key={exp._id.toString()}
              title={exp.role}
              subtitle={`${exp.company}, ${exp.location}`}
              date={exp.period}
              details={exp.description.split("\n").filter(Boolean)}
            />
          ))}
        </Section>
      )}

      <Section title="Certifications">
        <div className="card p-4 mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold text-lg text-[var(--color-contrast-high)]">
              AWS Certified Cloud Practitioner (CLF-C02)
            </h3>
            <span className="tag text-xs">
              Active
            </span>
          </div>
          <p className="text-[var(--color-contrast-medium)]">
            Amazon Web Services – Foundational Cloud Certification
          </p>
        </div>
      </Section>

      {research.length > 0 && (
        <Section title="Research Publications">
          {research.map((r) => (
            <CVEntry
              key={r._id.toString()}
              title={r.title}
              subtitle={r.description}
              date=""
              details={[]}
            />
          ))}
        </Section>
      )}

      <Section title="Technical Skills">
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
      </Section>

      <Section title="Achievements">
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 card">
            <span className="text-[var(--color-accent)] mt-0.5">✦</span>
            <p className="text-sm text-[var(--color-foreground)]">
              National Level Hackathon Finalist (4×) – SIH 2023, SIH 2024, Odoo Hackathon (March & Nov 2025)
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 card">
            <span className="text-[var(--color-accent)] mt-0.5">✦</span>
            <p className="text-sm text-[var(--color-foreground)]">
              State Level Winner – SSIP 2023
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 card">
            <span className="text-[var(--color-accent)] mt-0.5">✦</span>
            <p className="text-sm text-[var(--color-foreground)]">
              AWS Certified Cloud Practitioner (CLF-C02)
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 card">
            <span className="text-[var(--color-accent)] mt-0.5">✦</span>
            <p className="text-sm text-[var(--color-foreground)]">
              Webmaster, IEEE Student Branch – LDRP-ITR
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

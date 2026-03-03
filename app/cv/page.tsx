import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "The curriculum vitae of Ridham Patel.",
};

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

export default function CVPage() {
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

      <Section title="Experience">
        <CVEntry
          title="Associate Software Engineer"
          subtitle="OpenXcell Technolabs, Ahmedabad, Gujarat"
          date="Aug 2025 - Present"
          details={[
            "Engineered and deployed a high-availability LLM security platform using FastAPI for scalable, secure inference.",
            "Built end-to-end RAG pipelines using LangChain and Pinecone for prompt injection and data leakage detection.",
            "Designed asynchronous AI processing architecture using Celery, RabbitMQ, and Redis for long-running ML tasks.",
            "Integrated Nvidia Garak, ProtectAI Rebuff, and LLMGuard to create a robust AI security defense layer.",
          ]}
        />
        <CVEntry
          title="AI/ML Intern"
          subtitle="IEEE EMBS Pune Chapter, Remote"
          date="Jun 2025 – Jul 2025"
          details={[
            "Built an end-to-end deep learning pipeline for schizophrenia diagnosis using EEG data.",
            "Benchmarked ResNet50, EfficientNetB2, and DenseNet121 for performance vs computational efficiency.",
            "Achieved 96% accuracy using ensemble stacking for improved robustness.",
          ]}
        />
        <CVEntry
          title="Software Development Intern"
          subtitle="Institute for Plasma Research, Gandhinagar"
          date="Aug 2024 – Nov 2024"
          details={[
            "Developed a full-stack assessment and data collection platform for predictive student analytics.",
            "Engineered a resilient Node.js + TypeScript backend with real-time processing capabilities.",
          ]}
        />
      </Section>

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

      <Section title="Research Publications">
        <CVEntry
          title="FED-DETR: Privacy-Preserving Intelligent Traffic Enforcement"
          subtitle="Research Paper – Under Review"
          date="2025"
          details={[
            "Developed a real-time helmet detection system using Federated Learning + DETR.",
            "Focused on privacy-preserving distributed model training.",
          ]}
        />
        <CVEntry
          title="Automated Waste Segregation Smart Dustbin"
          subtitle="Paten - Under Review"
          date="2025"
          details={[
            "Designed IoT-enabled smart dustbin integrating lightweight computer vision models for edge inference.",
            "Filed patent covering novel embedded + ML system architecture.",
          ]}
        />
      </Section>

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

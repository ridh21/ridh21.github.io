import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "The curriculum vitae of Dhruvkumar Patel.",
};

interface CVEntryProps {
  title: string;
  subtitle: string;
  date: string;
  details: string[];
}

function CVEntry({ title, subtitle, date, details }: CVEntryProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-baseline">
        <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {date}
        </span>
      </div>
      <p className="text-neutral-700 dark:text-neutral-300">{subtitle}</p>
      <ul className="mt-2 list-disc list-inside space-y-1 text-neutral-800 dark:text-neutral-200">
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
      <h2 className="text-2xl font-bold font-serif mb-6 text-teal-700 dark:text-teal-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function CVPage() {
  return (
    <div>
      <h1 className="font-serif font-bold text-4xl mb-8 text-neutral-900 dark:text-neutral-100">
        Curriculum Vitae
      </h1>

      <Section title="Education">
        <CVEntry
          title="IIIT Delhi"
          subtitle="Masters of Technology in Computer Science, CGPA: 8.00"
          date="Aug 2024 — Present"
          details={[
            "Pursuing my masters from IIIT Delhi."
          ]}
        />
        <CVEntry
          title="LDRP-ITR"
          subtitle="Bachelors of Engineering in Information Technology, CGPA: 8.14"
          date="Aug 2020 — Jun 2024"
          details={[
            "Led team to a National Finalist (Runner-up) finish at the KAVACH-23 Cybersecurity Hackathon.",
            "Won First Place at the SSIP-22 State Hackathon, resulting in a research paper published by the IEEE.",
            "Completed a successful internship at Ishitva Robotic Systems, improving a production CV model's accuracy by 4%.",
          ]}
        />
      </Section>

      <Section title="Experience">
        <CVEntry
          title="Graduate Student Researcher"
          subtitle="MIDAS Lab, IIIT Delhi, New Delhi"
          date="Jan 2025 — Present"
          details={[
            "Developing a FastAPI + Celery-based API to detect annotation anomalies in the dataset using multi-modal LLMs.",
            "Enabled async batch processing and generated visual analytics for annotation correctness.",
            "Delivered a deployable local service as part of an independent Winter Semester project.",
          ]}
        />
        <CVEntry
          title="Jr. Software Developer Intern"
          subtitle="Ishitva Robotic Systems, Ahmedabad, Gujarat"
          date="Jan 2024 — Jun 2024"
          details={[
            "Developed a synthetic data generator using OpenCV to streamline the training process of object detection models.",
            "Improved model accuracy by 4%, reaching 93% detection accuracy through data augmentation and optimizations.",
            "Conducted image clustering experiments on large datasets of transparent masks to automate annotation.",
          ]}
        />
      </Section>

      <Section title="Certifications">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
            Microsoft Certified: Azure Data Scientist Associate
          </h3>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Expiry: June 2026
          </span>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300">
          Credential ID: E569DA1CD528CDA5
        </p>
      </Section>

      <Section title="Technical Skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h4 className="font-semibold text-md text-neutral-800 dark:text-neutral-200">Languages</h4>
            <p className="text-neutral-700 dark:text-neutral-300">Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS</p>
          </div>
          <div>
            <h4 className="font-semibold text-md text-neutral-800 dark:text-neutral-200">Frameworks</h4>
            <p className="text-neutral-700 dark:text-neutral-300">React, Node.js, Flask, FastAPI, Material-UI</p>
          </div>
          <div>
            <h4 className="font-semibold text-md text-neutral-800 dark:text-neutral-200">Developer Tools</h4>
            <p className="text-neutral-700 dark:text-neutral-300">Git, Docker, Google Cloud Platform, VS Code</p>
          </div>
          <div>
            <h4 className="font-semibold text-md text-neutral-800 dark:text-neutral-200">Libraries</h4>
            <p className="text-neutral-700 dark:text-neutral-300">pandas, NumPy, Matplotlib, PyTorch, Hugging Face</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

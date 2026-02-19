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
      <h1 className="font-serif font-bold text-3xl mb-8 text-neutral-900 dark:text-neutral-100">
        Curriculum Vitae
      </h1>

      <Section title="Education">
        <CVEntry
          title="IIIT Delhi"
          subtitle="Masters of Technology in Computer Science, CGPA: 8.42"
          date="Aug 2024 — Present"
          details={[
            "Capstone project on improving small LLM generation using Mixture of Refinement Agents.",
            "Graduate Student Researcher at MIDAS Lab working on multimodal AI and annotation anomaly detection.",
          ]}
        />
        <CVEntry
          title="LDRP-ITR, Gandhinagar"
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
          title="Data Scientist Intern"
          subtitle="Myntra, Bengaluru, Karnataka"
          date="Jan 2026 — Present"
          details={[
            "Contributing to the Ads Rank team responsible for ranking advertisement services on the Myntra Platform.",
            "Creating modular, robust model training pipelines to support continuous training and evaluation.",
            "Building data preparation pipelines for ingesting advertisement and user clickstream data for CTR optimization.",
            "Creating ML experimentation pipelines with MLFlow logging and visualizations.",
            "Improved existing production ranking model by 6% F1 score improvement in ad CTR optimization.",
            "Reduced training iterations time by 50% and reduced manual intervention through automation scripts.",
          ]}
        />
        <CVEntry
          title="Graduate Student Researcher"
          subtitle="MIDAS Lab, IIIT Delhi, New Delhi"
          date="Jan 2025 — Present"
          details={[
            "Working on improving small LLM generation using Mixture of Refinement Agents with multi-LORA adaptors.",
            "Fine-tuned QWEN-2.5-VL-72B-Instruct on 5x H100-SXM GPUs for annotation anomaly detection.",
            "Developed end-to-end FastAPI + Celery inference API for multimodal LLM-based dataset anomaly detection.",
            "Enabled async batch processing and generated visual analytics for annotation correctness.",
          ]}
        />
        <CVEntry
          title="Undergraduate Student Researcher"
          subtitle="Face Recognition Research Project"
          date="Jan 2024 — Aug 2025"
          details={[
            "Improved face recognition accuracy for classroom attendance with challenges in lighting, angles, and limited data.",
            "Implemented CBAM and Shuffle Attention modules in PyTorch, improving accuracy by up to 5%.",
            "Deployed model over cloud network using FastAPI and Celery for offloading processing from edge devices.",
          ]}
        />
        <CVEntry
          title="Jr. Software Developer Intern"
          subtitle="Ishitva Robotic Systems, Ahmedabad, Gujarat"
          date="Jan 2024 — Jun 2024"
          details={[
            "Developed synthetic data generator using OpenCV for training deep learning detection models efficiently.",
            "Improved waste-detection model accuracy by 4%, reaching 93% overall detection accuracy.",
            "Implemented image clustering using PyTorch metric-learning with GCN for streamlined synthetic data generation.",
            "Built automated labelled data generation pipeline with augmentation for darknet YOLOv4 object detection.",
          ]}
        />
        <CVEntry
          title="Placement Coordinator"
          subtitle="Placement Office, IIIT Delhi"
          date="May 2025 — Present"
          details={[
            "Serving as official representative of M.Tech CSE 2024–26 cohort in the Institute Placement Committee.",
            "Liaising between student body and Placement Cell for seamless coordination during 2025–26 placement season.",
            "Managing recruiter interactions, scheduling processes, and logistical coordination for on-campus drives.",
          ]}
        />
      </Section>

      <Section title="Certifications">
        <div className="mb-6">
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              AWS Certified Machine Learning Engineer – Associate
            </h3>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Issued: July 2025
            </span>
          </div>
          <p className="text-neutral-700 dark:text-neutral-300">
            Credential ID: 5e46b311411640059b6fd0c09d906369
          </p>
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Microsoft Certified: Azure Data Scientist Associate
            </h3>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Expiry: June 2025
            </span>
          </div>
          <p className="text-neutral-700 dark:text-neutral-300">
            Credential ID: E569DA1CD528CDA5
          </p>
        </div>
      </Section>

      <Section title="Technical Skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h4 className="font-semibold text-md text-neutral-800 dark:text-neutral-200">Languages</h4>
            <p className="text-neutral-700 dark:text-neutral-300">Python, C/C++, SQL (Postgres), JavaScript, TypeScript, HTML/CSS</p>
          </div>
          <div>
            <h4 className="font-semibold text-md text-neutral-800 dark:text-neutral-200">Frameworks</h4>
            <p className="text-neutral-700 dark:text-neutral-300">React, Next.js, Node.js, Flask, FastAPI, Tailwind CSS, Material-UI</p>
          </div>
          <div>
            <h4 className="font-semibold text-md text-neutral-800 dark:text-neutral-200">Developer Tools</h4>
            <p className="text-neutral-700 dark:text-neutral-300">Git, Docker, Kubernetes, Google Cloud Platform, MLFlow, VS Code, Linux/Bash</p>
          </div>
          <div>
            <h4 className="font-semibold text-md text-neutral-800 dark:text-neutral-200">Libraries</h4>
            <p className="text-neutral-700 dark:text-neutral-300">pandas, NumPy, Matplotlib, PyTorch, TensorFlow, OpenCV, scikit-learn, Hugging Face Transformers</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

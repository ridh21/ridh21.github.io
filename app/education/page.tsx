// education/page.tsx

import type { Metadata } from "next";
import { educationData } from "./education-data";

export const metadata: Metadata = {
  title: "Education",
  description: "My academic journey and key achievements.",
};

export default function Education() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Education
      </h1>

      {/* Use a flex column with a gap for consistent spacing */}
      <div className="flex flex-col gap-10">
        {educationData.map((entry, index) => (
          <div key={index}>
            {/* Row 1: Institute and Duration */}
            <div className="flex w-full items-start justify-between">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {entry.institute}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums ml-4 shrink-0">
                {entry.duration}
              </p>
            </div>

            {/* Row 2: Degree and CGPA */}
            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
              {entry.degree}
            </p>

            {/* Row 3: Details (Achievements and Key Points) */}
            {entry.details && (
              <ul className="mt-3 list-disc list-inside text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed">
                {entry.details.map((detail, i) => (
                  <li key={i} className="mb-1">{detail}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
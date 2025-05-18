// education/page.tsx

import type { Metadata } from "next";
import { educationData } from "./education-data"; // Assuming this file exports your education data array

export const metadata: Metadata = {
  title: "Education",
  description: "Portfolio Education Details",
};

export default function Education() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Education</h1>

      {/* Container for multiple education entries */}
      {/* space-y-6 will add margin-top to all but the first child, creating space between entries */}
      <div className="space-y-6">
        {educationData.map((entry, index) => (
          <div
            key={index}
            className={`
              ${index < educationData.length - 1 ? 'pb-6 border-b border-neutral-200 dark:border-neutral-700' : ''}
            `}
          >
            {/* Top Row: Institute and Location */}
            {/* Using mb-1 for a subtle space between this row and the degree row below */}
            <div className="grid grid-cols-2">
              {/* Institute Title - Left Half */}
              <div className="p-3 font-semibold text-black dark:text-white">
                {entry.institute}
              </div>
              {/* Location - Right Half, right-aligned */}
              <div className="p-3 text-neutral-700 dark:text-neutral-300 text-right">
                {entry.location}
              </div>
            </div>

            {/* Bottom Row: Degree/CGPA and Duration */}
            <div className="grid grid-cols-2">
              {/* Degree/CGPA - Left Half, no margin-top */}
              <div className="p-3 pt-0 text-neutral-800 dark:text-neutral-200">
                {entry.degree} ({entry.cgpa})
              </div>
              {/* Duration - Right Half */}
              <div className="p-3 pt-0 text-neutral-600 dark:text-neutral-400 text-right">
                {entry.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
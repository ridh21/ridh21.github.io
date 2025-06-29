// education/education-data.tsx

export interface EducationEntry {
  institute: string;
  location: string;
  degree: string;
  duration: string;
  details?: string[]; // The new array for bullet points
}

export const educationData: EducationEntry[] = [
  {
    institute: "Indraprastha Institute of Information Technology, Delhi",
    location: "New Delhi, Delhi",
    // Degree and CGPA are now combined for a cleaner display
    degree: "Master of Technology - M.Tech, Computer Science (CGPA: 8.00)", 
    duration: "2024 — Present",
    details: [
      "Advancing in AI/ML through research at MIDAS Lab, focusing on fine-tuning multi-modal LLMs and developing end-to-end inference APIs.",
      "Selected as the M.Tech Placement Coordinator, managing corporate recruiter relationships and on-campus hiring logistics.",
      "Key Coursework: Natural Language Processing, AI (Artificial Intelligence), GS (Graduate Systems).",
    ],
  },
  {
    institute: "LDRP Institute of Technology & Research",
    location: "Gandhinagar, Gujarat",
    degree: "Bachelor of Engineering - BE, Information Technology (CGPA: 8.14)",
    duration: "2020 — 2024",
    details: [
      "Led team to a National Finalist (Runner-up) finish at the KAVACH-23 Cybersecurity Hackathon.",
      "Won First Place at the SSIP-22 State Hackathon, resulting in a research paper published by the IEEE.",
      "Completed a successful internship at Ishitva Robotic Systems, improving a production CV model's accuracy by 4%.",
    ],
  },
  // High school entries are omitted for a more professional and focused portfolio.
];
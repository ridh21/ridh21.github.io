// project-data.tsx
export interface Project {
  title: string;
  year: number;
  description: string;
  details: string; // <--- Added this field for markdown details
  url: string;
  tags?: string[]; // Optional new field for future enhancements
}

export const projects: Project[] = [
  {
    title: "Student Dropout Analysis",
    year: 2023,
    description: "State-level analytics platform built to track, visualize, and reduce student dropouts using ML.",
    details: `
*   Developed a comprehensive data collection and preprocessing pipeline.
*   Implemented various machine learning models (logistic regression, random forest, etc.) to predict student dropout probability.
*   Designed an interactive dashboard using data visualization libraries to display insights for administrators.
*   Contributed to a research paper published in an IEEE conference (linked).
    `, // <--- Markdown details
    url: "https://ieeexplore.ieee.org/document/10507844", // IEEE publication link
  },
  {
    title: "Advanced ANPR & Face Recognition",
    year: 2023,
    description: "Finalist project at KAVACH-23 using YOLO, OCR, and React Native for secure surveillance.",
    details: `
*   Integrated YOLOv5 for real-time object detection of vehicles and faces.
*   Developed an OCR module to extract text from number plates.
*   Built a cross-platform mobile application with React Native for monitoring, alerts, and data management.
*   Designed the system for enhanced security and scalability in surveillance scenarios.
    `, // <--- Markdown details
    url: "https://github.com/dhruvpatel97/anpr-face-kavach", // placeholder GitHub repo
  },
  {
    title: "Drive Material LDRP",
    year: 2022,
    description: "Centralized academic material portal helping thousands of students access organized resources.",
    details: `
*   Designed and implemented a full-stack web application using modern frameworks (e.g., React, Node.js/Express, MongoDB).
*   Created features for user authentication, file uploads, category-based organization, and searching.
*   Ensured a user-friendly interface for students and content contributors.
*   Handled deployment and scaling for thousands of users.
    `, // <--- Markdown details
    url: "https://drivematerial.in/",
  }
];
// project-data.tsx
export interface Project {
  title: string;
  year: number;
  description: string;
  details: string;
  url: string;
  image: string;
  tags?: string[];
}

export const projects: Project[] = [
  {
    title: "Face-Swap-Based Deepfake Detection Platform",
    year: 2024,
    description: "Smart India Hackathon 2024 Finalist – End-to-end deepfake detection system integrating Python ML models with scalable web infrastructure.",
    details: `
*   Built an end-to-end deepfake detection system integrating Python ML models with scalable web infrastructure.
*   Implemented EfficientNet, InceptionNetV3, attention models, and transformer architectures for detection.
*   Designed preprocessing pipelines for face extraction, alignment, and temporal frame analysis.
*   Achieved finalist position at Smart India Hackathon 2024 among thousands of competing teams.
    `,
    url: "https://github.com/ridh21/deepfake-detection",
    image: "/projects/deepfake-detection/og.png",
    tags: ["Python", "PyTorch", "EfficientNet", "Transformers", "Computer Vision", "Deep Learning"],
  },
  {
    title: "Student Dropout Analysis Platform",
    year: 2023,
    description: "Smart India Hackathon 2023 Finalist – Predictive analytics system using ML to identify at-risk students with interactive dashboards.",
    details: `
*   Developed a predictive analytics system using Logistic Regression to identify at-risk students.
*   Delivered insights via an interactive dashboard for educational stakeholders.
*   Architected scalable Node.js backend for real-time prediction serving.
*   Achieved finalist position at Smart India Hackathon 2023.
    `,
    url: "https://github.com/ridh21/student-dropout-analysis",
    image: "/projects/student-dropout-analysis/og.png",
    tags: ["Python", "Machine Learning", "Node.js", "Data Visualization", "Scikit-learn"],
  },
  {
    title: "OneFlow – Plan to Bill in One Place",
    year: 2025,
    description: "Odoo × IIT Gandhinagar Hackathon Finalist – Modular full-stack Project Management System with role-based dashboards and KPI analytics.",
    details: `
*   Built a modular full-stack Project Management System using Next.js and Django.
*   Designed role-based dashboards (Admin, PM, Team Member, Finance).
*   Implemented KPI analytics (revenue, cost, utilization, profit) using PostgreSQL-backed services.
*   Achieved finalist position at Odoo × IIT Gandhinagar Hackathon (Nov 2025).
    `,
    url: "https://github.com/ridh21/oneflow",
    image: "/projects/oneflow/og.png",
    tags: ["Next.js", "Django", "PostgreSQL", "TypeScript", "Python", "Full-Stack"],
  },
  {
    title: "Customer Grievance Portal – One Nation One Challan",
    year: 2023,
    description: "SSIP 2023 State Winner – Full-stack grievance submission portal under Gujarat's Student Startup and Innovation Policy.",
    details: `
*   Delivered a full-stack grievance submission portal under Gujarat's Student Startup and Innovation Policy.
*   Won first place at the SSIP 2023 State Level competition.
*   Built end-to-end system for citizens to submit and track traffic challan grievances.
    `,
    url: "https://github.com/ridh21/grievance-portal",
    image: "/projects/grievance-portal/og.png",
    tags: ["Node.js", "React", "MongoDB", "Full-Stack", "Government Tech"],
  },
  {
    title: "M. M. Patel Students Research Project Cell – KSV Website",
    year: 2023,
    description: "University research portal with strong unit & integration testing using Jest and Mocha.",
    details: `
*   Engineered university research portal with comprehensive testing infrastructure.
*   Implemented strong unit & integration testing using Jest and Mocha.
*   Built responsive, accessible web interface for research project management.
    `,
    url: "https://github.com/ridh21/ksv-research",
    image: "/projects/ksv-research/og.png",
    tags: ["JavaScript", "Jest", "Mocha", "Node.js", "Web Development"],
  },
];
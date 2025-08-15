// project-data.tsx
export interface Project {
  title: string;
  year: number;
  description: string;
  details: string; // <--- Added this field for markdown details
  url: string;
  image: string;
  tags?: string[]; // Optional new field for future enhancements
}

export const projects: Project[] = [
  {
    title: "Mental Health Meme Classification",
    year: 2025,
    description: "A multimodal NLP course project to classify anxiety and depression symptoms from internet memes using Vision-Language Models.",
    details: `
*   Addressed single-label (anxiety) and multi-label (depression) classification from memes as part of NLP coursework.
*   Augmented dataset by extracting OCR text and semantic triplets (e.g., Cause-Effect, Mental State) using the QWEN-2.5-VL-7B model.
*   Enhanced a reference architecture (M3H) with visual feature maps and fine-tuned a MentalBART model for classification.
*   Achieved competitive performance with a 65% Macro F1 score for anxiety and 63% for depression.
*   Developed an end-to-end inference pipeline with a Streamlit UI for interactive visualization of results.
    `,
    url: "https://github.com/stack-dhruv/mental-health-meme-classification", // Placeholder URL
    image: "/projects/mental-health-meme-classification/og.png",
    tags: ["Python", "PyTorch", "Hugging Face", "Streamlit", "NLP", "Multimodal AI"],
  },
  {
    title: "Microservices Benchmarking with Death Star",
    year: 2025,
    description: "Benchmarked and monitored a complex microservices application on Docker Swarm and GKE to evaluate performance and observability.",
    details: `
*   Deployed the Death Star Social Network across local Docker Swarm and cloud-based Google Kubernetes Engine (GKE) environments.
*   Benchmarked three distinct configurations: single-node/single-replica, multi-node/single-replica, and single-node/multi-replica.
*   Integrated a two-tier observability stack using Pixie for real-time visualization and Prometheus for fine-grained metrics collection.
*   Analyzed performance trade-offs in latency, resource utilization, and scalability across different deployment strategies.
    `,
    url: "https://github.com/stack-dhruv/DeathStarBench", // Placeholder URL
    image: "/projects/deathstar-benchmark/og.png",
    tags: ["Docker", "Kubernetes", "GKE", "Prometheus", "Pixie", "Microservices", "Observability"],
  },
  {
    title: "Advanced ANPR & Face Recognition",
    year: 2023,
    description: "Runner-up project at the KAVACH-23 National Cybersecurity Hackathon, building an end-to-end ANPR and Face Recognition system.",
    details: `
*   Led a team of six and collaborated with Ahmedabad West traffic police for high-definition video data collection.
*   Engineered a decoupled API using YOLOv8 for detection, achieving 92% precision and 91% recall on number plates.
*   Developed a cross-platform React Native application for real-time monitoring on edge devices.
*   Explored multiple face recognition approaches, including deep learning (Siamese networks) and classical methods (dlib).
*   Finished as a national finalist (runner-up) in the KAVACH-2023 hackathon among the top 100 teams.
    `,
    url: "https://github.com/coding-brigade/advanced-anpr-fr",
    image: "/projects/anpr-fr-architecture/og.png",
    tags: ["Python", "PyTorch", "React Native", "YOLOv8", "Computer Vision", "ANPR"],
  },
  {
    title: "Student Dropout Analysis",
    year: 2023,
    description: "State-level hackathon winner and published research on predicting student dropouts using machine learning and data visualization.",
    details: `
*   Won the SSIP-22 State Level Hackathon by developing a dashboard and predictive analytics platform.
*   Created a data pipeline using official government data from UDISE+ to analyze dropout trends.
*   Implemented regression models (Linear, Polynomial) achieving a high R² value of 0.9976 on the custom EduDropX dataset.
*   Extended the project into a research paper published in the IEEE I2CT 2024 conference.
    `,
    url: "https://github.com/ssip-hack/student-dropout-analysis",
    image: "/projects/student-dropout-analysis/og.png",
    tags: ["Python", "Pandas", "Machine Learning", "Data Visualization", "Scikit-learn"],
  }, 
  {
    title: "Drive Material LDRP",
    year: 2022,
    description: "A centralized portal for academic resources that attracted over 3,000 visits in its first week and now ranks top on Google.",
    details: `
*   Identified the need for a unified platform and developed a centralized website to host scattered academic materials.
*   Organized resources into an intuitive structure by subject and semester, simplifying access for students.
*   Achieved significant user engagement with 1,000+ unique visitors within the first week of launch.
*   The platform has since become a go-to resource, enhancing the student learning experience.
    `,
    url: "https://drive-material-ldrp.weebly.com/",
    image: "/projects/drive-material-ldrp/drive material ldrp.png",
    tags: ["Web Development", "SEO", "Content Management", "Weebly"],
  }
];
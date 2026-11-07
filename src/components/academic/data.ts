// Content for the academic homepage. Edit this file to update the site.

export const ME = "Ridham Patel";

export const LINKS = [
  { label: "Email", href: "mailto:ridhampatel2k4@gmail.com" },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=jjLiEoYAAAAJ" },
  { label: "GitHub", href: "https://github.com/ridh21" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ridhampatel2k4/" },
  { label: "X", href: "https://x.com/ridhampatel2k4" },
  { label: "CV", href: "/Ridham_Patel_CV.pdf" },
];

export const INTERESTS: { topic: string; detail: string }[] = [
  { topic: "Federated learning and unlearning", detail: "training models across clients without sharing data, and removing the influence of malicious clients after training." },
  { topic: "Robust face recognition", detail: "detection and recognition under occlusion, pose and lighting changes, with few samples per identity." },
  { topic: "AI security, safety and alignment", detail: "making ML systems robust to attacks such as jailbreaks and prompt injection, and keeping model behaviour safe and aligned with human intent." },
];

export type PubType = "conference" | "journal" | "dataset" | "patent";

export const PUB_TYPES: { type: PubType; letter: string; label: string; plural: string }[] = [
  { type: "conference", letter: "C", label: "Conference paper", plural: "Conference" },
  { type: "journal", letter: "J", label: "Journal paper", plural: "Journal" },
  { type: "dataset", letter: "D", label: "Dataset", plural: "Dataset" },
  { type: "patent", letter: "P", label: "Patent", plural: "Patent" },
];

export type Pub = {
  type: PubType;
  title: string;
  authors: string[];      // use "Ridham Patel" exactly to bold; append "†" for equal contribution
  venue: string;
  note?: string;          // shown in red, e.g. an award or status
  tldr?: string;
  links?: { label: string; href: string }[];
  bibtex?: string;
};

export const PUBS: { year: string; items: Pub[] }[] = [
  {
    year: "2026",
    items: [
      {
        type: "conference",
        title: "Towards Robust Classroom Attendance: A Comprehensive Evaluation of Face Detection and Recognition Models",
        authors: ["Himani Trivedi", "Hiren Patel", "Ridham Patel", "Krutika Patel", "Nancy Patel"],
        venue: "IEEE CICON 2026, Karnavati University",
        note: "Accepted",
        tldr: "Benchmarks 10 face detection and recognition models on a classroom dataset of about 100 students, under real-world occlusion, pose and lighting, and compares accuracy, latency and edge-deployment trade-offs.",
        links: [{ label: "Paper", href: "https://arxiv.org/abs/2609.22750" }],
        bibtex: `@misc{trivedi2026robust,
  title         = {Towards Robust Classroom Attendance: A Comprehensive Evaluation of Face Detection and Recognition Models},
  author        = {Trivedi, Himani and Patel, Hiren and Patel, Ridham and Patel, Krutika and Patel, Nancy},
  year          = {2026},
  eprint        = {2609.22750},
  archivePrefix = {arXiv}
}`,
      },
      {
        type: "journal",
        title: "FedRevoke: Client-Level Unlearning of Malicious Districts in Lightweight Federated Automatic Number Plate Recognition",
        authors: ["Ridham Patel", "Himani Trivedi", "Chrish Dabhi", "Shivangi Surati", "Bela Shrimali"],
        venue: "Under review at IEEE Open Journal of Intelligent Transportation Systems",
      },
      {
        type: "journal",
        title: "FedDETR for Privacy Preserving K Means Based Helmet Detection of Two Wheeler Riders",
        authors: ["Kandarp Gajjar", "Nancy Patel", "Ridham Patel", "Krutika Patel", "Chrisha Dabhi", "Himani Trivedi", "Mahesh Goyani", "Chintan Bhatt"],
        venue: "Under review at Springer Nature",
        tldr: "A federated learning pipeline for helmet detection with a Detection Transformer (DETR), trained across clients with differential privacy so raw images never leave each site.",
      },
      {
        type: "journal",
        title: "Limited-Sample Face Recognition through Projection-Efficient Inter-Patch Interaction and Dynamic Patch Reweighting under Real-World Occlusions for Classroom Attendance",
        authors: ["Himani Trivedi", "Hiren Patel", "Dhruvkumar Patel", "Kovil Savaj", "Prince Malani", "Jay Patel", "Ridham Patel", "Krutika Patel", "Nancy Patel"],
        venue: "Under review at Elsevier, Expert Systems with Applications",
      },
      {
        type: "journal",
        title: "Aggregate-Constrained Parcel-Level Yield Estimation from Sparse Single-Polarization X-Band SAR Time Series with Statistical Yield Anchors",
        authors: ["Jenish Sorathiya†", "Yash Sorathiya†", "Mahi Parmar†", "Krutika Patel†", "Nancy Patel†", "Ridham Patel†", "Himani Trivedi"],
        venue: "Under review at Springer Nature",
      },
      {
        type: "dataset",
        title: "EdgeVision Dataset",
        authors: ["Kandarp Gajjar", "Nancy Patel", "Ridham Patel", "Krutika Patel", "Chrisha Dabhi", "Himani Trivedi", "Mahesh Goyani", "Chintan Bhatt"],
        venue: "Mendeley Data",
        note: "20k+ downloads",
        tldr: "2,392 images of motorcycle traffic with 8,275 bounding boxes across three classes (BikeWithRider, Helmet, NoHelmet), in Pascal VOC, YOLO and COCO formats.",
        links: [{ label: "Dataset", href: "https://data.mendeley.com/datasets/j82bnw7gsr/1" }],
        bibtex: `@misc{gajjar2026edgevision,
  title     = {EdgeVision Dataset},
  author    = {Gajjar, Kandarp and Patel, Nancy and Patel, Ridham and Patel, Krutika and Dabhi, Chrisha and Trivedi, Himani and Goyani, Mahesh and Bhatt, Chintan},
  publisher = {Mendeley Data},
  version   = {1},
  year      = {2026},
  doi       = {10.17632/j82bnw7gsr.1}
}`,
      },
    ],
  },
  {
    year: "2025",
    items: [
      {
        type: "patent",
        title: "Ecosmart Dustbin for Educational Institution, An IoT-Based Waste Segregation System and Method Thereof",
        authors: ["Nancy Patel", "Kandarp Gajjar", "Ridham Patel", "Krutika Patel", "Himani Trivedi"],
        venue: "Indian Patent Application No. 202521111515",
        note: "Under examination",
        tldr: "A lightweight Ghost Attention vision model (ghost convolutions with attention) running on an IoT edge device to classify and segregate waste in real time, with a novel dustbin design compact enough for educational institutions and classrooms.",
        links: [{ label: "Status", href: "https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus" }],
      },
    ],
  },
];

export const EXPERIENCE: { role: string; org: string; dates: string; points: string[] }[] = [
  {
    role: "Associate Software Engineer",
    org: "OpenXcell Technolabs",
    dates: "Aug 2025 – May 2026",
    points: [
      "Red-teamed client LLM applications with NVIDIA Garak, probing for jailbreaks, prompt injection and PII leakage.",
      "Built Guardrails AI defences targeting the failure modes found, and checked that they blocked them before deployment.",
      "Built retrieval-augmented generation pipelines that ground model outputs in client document collections.",
    ],
  },
  {
    role: "Research Intern",
    org: "IEEE EMBS Pune Chapter",
    dates: "Jun 2025 – Jul 2025",
    points: [
      "Compared 10 deep learning architectures (including ResNet50, EfficientNetB2 and DenseNet121) for EEG-based schizophrenia detection, measuring accuracy and latency.",
      "Reached 96% accuracy with ensemble stacking; used Grad-CAM to check which signal regions drove predictions against known diagnostic markers.",
    ],
  },
  {
    role: "Software Development Intern",
    org: "Institute for Plasma Research, Gandhinagar",
    dates: "Aug 2024 – Nov 2024",
    points: [
      "Migrated legacy systems to a web platform (Node.js, TypeScript, SQL) and built data pipelines (Pandas, NumPy) for monitoring experimental data.",
    ],
  },
];

export const PROJECTS: { name: string; href: string; context: string; detail: string }[] = [
  {
    name: "Incident Response Commander",
    href: "https://github.com/ridh21/incident-response-commander",
    context: "Finalist, Meta × PyTorch × OpenEnv Hackathon 2026",
    detail: "An RL environment where an LLM agent handles incidents across a 10-service system; a Llama 3.1 8B agent scores 0.70 / 0.62 / 0.56 on easy / medium / hard tasks.",
  },
  {
    name: "Face-Swap Deepfake Detection",
    href: "https://github.com/slantie/Drishtiksha",
    context: "Finalist, Smart India Hackathon 2024, for NTRO",
    detail: "Benchmarked six detection models on subsets of FaceForensics++, Celeb-DF, DFDC, Google DFD and WLDR, and built an ensemble for an end-to-end detection and reporting platform.",
  },
];

export type Writing = { slug: string; topic: string; title: string; date: string; readTime: string; summary: string };

export const WRITINGS: Writing[] = [
  {
    slug: "federated-learning",
    topic: "Federated learning",
    title: "Training on Data You Can’t See",
    date: "6 November 2026",
    readTime: "8 min read",
    summary: "How hospitals, banks and phones can train one shared model without ever pooling their data, explained with pictures.",
  },
  {
    slug: "machine-unlearning",
    topic: "Machine unlearning",
    title: "Teaching a Model to Forget",
    date: "16 September 2026",
    readTime: "9 min read",
    summary: "Deleting your data from a database does not remove it from a trained model. What it takes to make a model truly forget, and how to check.",
  },
  {
    slug: "diffusion-models",
    topic: "Diffusion models",
    title: "From Noise to Pictures",
    date: "16 September 2026",
    readTime: "9 min read",
    summary: "How image generators like Stable Diffusion turn random static into a picture, one small clean-up step at a time.",
  },
];

export const LAST_UPDATED = "November 2026";

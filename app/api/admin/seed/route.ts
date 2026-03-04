import { NextResponse } from "next/server";
import {
  getProjectsCollection,
  getPostsCollection,
  getExperienceCollection,
  getResearchCollection,
  getPhotoSectionsCollection,
  getSiteConfigCollection,
  getAdminUsersCollection,
} from "app/lib/collections";
import { projects } from "app/projects/project-data";
import { getBlogPosts } from "app/lib/posts";
import { hashPassword } from "app/lib/admin-auth";

export async function POST() {
  try {
    const results: Record<string, string> = {};

    // --- Seed Admin User ---
    const adminCol = await getAdminUsersCollection();
    const adminCount = await adminCol.countDocuments();
    if (adminCount === 0) {
      await adminCol.insertOne({
        email: "ridhampatel.dev@gmail.com",
        passwordHash: hashPassword("whocares@2004"),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      results.admin = "Admin user created";
    } else {
      results.admin = `Skipped (${adminCount} admin user(s) already exist)`;
    }

    // --- Seed Projects ---
    const projCol = await getProjectsCollection();
    const projCount = await projCol.countDocuments();
    if (projCount === 0) {
      const docs = projects.map((p, i) => ({
        title: p.title,
        year: p.year,
        description: p.description,
        details: p.details,
        url: p.url,
        image: p.image,
        tags: p.tags || [],
        order: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await projCol.insertMany(docs);
      results.projects = `Seeded ${docs.length} projects`;
    } else {
      results.projects = `Skipped (${projCount} already exist)`;
    }

    // --- Seed Blog Posts ---
    const postCol = await getPostsCollection();
    const postCount = await postCol.countDocuments();
    if (postCount === 0) {
      const blogPosts = getBlogPosts();
      const docs = blogPosts.map((p) => ({
        slug: p.slug,
        title: p.metadata.title,
        publishedAt: p.metadata.publishedAt,
        summary: p.metadata.summary,
        tags: (Array.isArray(p.metadata.tags) ? p.metadata.tags : p.metadata.tags ? [p.metadata.tags] : []) as string[],
        image: p.metadata.image || undefined,
        content: p.content,
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      if (docs.length > 0) {
        await postCol.insertMany(docs);
      }
      results.posts = `Seeded ${docs.length} posts`;
    } else {
      results.posts = `Skipped (${postCount} already exist)`;
    }

    // --- Seed Experience ---
    const expCol = await getExperienceCollection();
    const expCount = await expCol.countDocuments();
    if (expCount === 0) {
      const experiences = [
        {
          role: "Associate Software Engineer",
          company: "OpenXcell Technolabs",
          location: "Ahmedabad",
          period: "Aug 2025 – Present",
          description:
            "Developed scalable backend and AI-driven systems using FastAPI and microservices architecture, delivering robust APIs and intelligent data pipelines to power client-facing applications and production systems.",
          order: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: "AI/ML Intern",
          company: "IEEE EMBS Pune Chapter",
          location: "Remote",
          period: "Jun 2025 – Jul 2025",
          description:
            "Built an end-to-end deep learning pipeline for schizophrenia diagnosis using EEG data. Achieved 96% accuracy using ensemble stacking with ResNet50, EfficientNetB2, and DenseNet121.",
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: "Software Development Intern",
          company: "Institute for Plasma Research",
          location: "Gandhinagar",
          period: "Aug 2024 – Nov 2024",
          description:
            "Developed a full-stack assessment and data collection platform for predictive student analytics. Engineered a resilient Node.js + TypeScript backend with real-time processing capabilities.",
          order: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      await expCol.insertMany(experiences);
      results.experience = `Seeded ${experiences.length} entries`;
    } else {
      results.experience = `Skipped (${expCount} already exist)`;
    }

    // --- Seed Research ---
    const resCol = await getResearchCollection();
    const resCount = await resCol.countDocuments();
    if (resCount === 0) {
      const research = [
        {
          title: "FED-DETR: Privacy-Preserving Intelligent Traffic Enforcement",
          description: "Research Paper – Under Review",
          url: "#",
          order: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Automated Waste Segregation Smart Dustbin",
          description: "Patent – Under Review",
          url: "#",
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      await resCol.insertMany(research);
      results.research = `Seeded ${research.length} entries`;
    } else {
      results.research = `Skipped (${resCount} already exist)`;
    }

    // --- Seed Photo Sections ---
    const photoCol = await getPhotoSectionsCollection();
    const photoCount = await photoCol.countDocuments();
    if (photoCount === 0) {
      const sections = [
        {
          title: "UK & France Tour",
          subtitle: "Wandering through London streets and Parisian boulevards.",
          order: 0,
          images: [
            { src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80", alt: "London skyline with Tower Bridge", aspect: "landscape" as const },
            { src: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80", alt: "Big Ben and Parliament", aspect: "portrait" as const },
            { src: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80", alt: "Red telephone booth in London", aspect: "square" as const },
            { src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", alt: "Eiffel Tower at sunset", aspect: "portrait" as const },
            { src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80", alt: "Streets of Paris", aspect: "landscape" as const },
            { src: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800&q=80", alt: "Louvre Museum pyramid", aspect: "landscape" as const },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Code & Fun",
          subtitle: "Hackathons, late-night coding sessions, and good vibes.",
          order: 1,
          images: [
            { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", alt: "Hackathon workspace", aspect: "landscape" as const },
            { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", alt: "Laptop with code on screen", aspect: "square" as const },
            { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", alt: "Team collaboration", aspect: "portrait" as const },
            { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", alt: "Group working on laptops", aspect: "landscape" as const },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      await photoCol.insertMany(sections);
      results.photos = `Seeded ${sections.length} sections`;
    } else {
      results.photos = `Skipped (${photoCount} already exist)`;
    }

    // --- Seed Site Config ---
    const cfgCol = await getSiteConfigCollection();
    const cfgDoc = await cfgCol.findOne({ key: "main" });
    if (!cfgDoc) {
      await cfgCol.insertOne({
        key: "main",
        name: "Ridham Patel",
        title: "Ridham Patel",
        description:
          "The personal portfolio of Ridham Patel – Associate Software Engineer at OpenXcell Technolabs, with expertise in AI/ML, LLM systems, scalable backend architectures, and full-stack development. AWS Certified Cloud Practitioner.",
        bio: "I design and deploy production-grade AI systems. Currently working as an Associate Software Engineer building secure, high-availability LLM systems. My work spans MLOps, scalable backend architectures, multimodal AI, and real-time ML inference.",
        subtitle: "Software Developer · Researcher · AI/ML Engineer",
        socialLinks: {
          twitter: "https://x.com/ridhampatel2k4",
          github: "https://github.com/ridh21/",
          instagram: "https://www.instagram.com/curiousridham",
          linkedin: "https://www.linkedin.com/in/ridhampatel2k4",
          email: "mailto:ridhampatel21@gmail.com",
          orcid: "https://orcid.org/0009-0005-6466-7650",
          scholar: "https://scholar.google.com/citations?user=jjLiEoYAAAAJ&hl",
        },
        updatedAt: new Date(),
      });
      results.config = "Seeded site config";
    } else {
      results.config = "Skipped (already exists)";
    }

    return NextResponse.json({ success: true, results });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

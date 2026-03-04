import { ObjectId, type Db, type Collection } from "mongodb";
import { getDatabase } from "./mongodb";

// ============================================================
// TypeScript Interfaces for all content collections
// ============================================================

export interface ProjectDoc {
  _id?: ObjectId;
  title: string;
  year: number;
  description: string;
  details: string; // markdown
  url: string;
  image: string;
  tags: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostDoc {
  _id?: ObjectId;
  slug: string;
  title: string;
  publishedAt: string; // ISO date string
  summary: string;
  tags: string[];
  image?: string;
  content: string; // raw MDX
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExperienceDoc {
  _id?: ObjectId;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResearchDoc {
  _id?: ObjectId;
  title: string;
  description: string;
  url: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhotoImage {
  src: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
}

export interface PhotoSectionDoc {
  _id?: ObjectId;
  title: string;
  subtitle: string;
  images: PhotoImage[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteConfigDoc {
  _id?: ObjectId;
  key: string; // "main"
  name: string;
  title: string;
  description: string;
  bio: string; // intro paragraph HTML/text
  subtitle: string; // e.g. "Software Developer · Researcher · AI/ML Engineer"
  socialLinks: {
    twitter: string;
    github: string;
    instagram: string;
    linkedin: string;
    email: string;
    orcid: string;
    scholar: string;
  };
  updatedAt: Date;
}

export interface AdminUserDoc {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// Collection getters (cached via getDatabase)
// ============================================================

export async function getAdminUsersCollection(): Promise<Collection<AdminUserDoc>> {
  const db = await getDatabase();
  return db.collection<AdminUserDoc>("admin_users");
}

export async function getProjectsCollection(): Promise<Collection<ProjectDoc>> {
  const db = await getDatabase();
  return db.collection<ProjectDoc>("projects");
}

export async function getPostsCollection(): Promise<Collection<PostDoc>> {
  const db = await getDatabase();
  return db.collection<PostDoc>("posts");
}

export async function getExperienceCollection(): Promise<Collection<ExperienceDoc>> {
  const db = await getDatabase();
  return db.collection<ExperienceDoc>("experience");
}

export async function getResearchCollection(): Promise<Collection<ResearchDoc>> {
  const db = await getDatabase();
  return db.collection<ResearchDoc>("research");
}

export async function getPhotoSectionsCollection(): Promise<Collection<PhotoSectionDoc>> {
  const db = await getDatabase();
  return db.collection<PhotoSectionDoc>("photo_sections");
}

export async function getSiteConfigCollection(): Promise<Collection<SiteConfigDoc>> {
  const db = await getDatabase();
  return db.collection<SiteConfigDoc>("site_config");
}

// ============================================================
// Helper: convert ObjectId to string for JSON serialization
// ============================================================
export function serializeDoc<T extends { _id?: ObjectId }>(
  doc: T
): Omit<T, "_id"> & { _id: string } {
  const { _id, ...rest } = doc;
  return { _id: _id?.toString() ?? "", ...rest } as any;
}

export function serializeDocs<T extends { _id?: ObjectId }>(
  docs: T[]
): (Omit<T, "_id"> & { _id: string })[] {
  return docs.map(serializeDoc);
}

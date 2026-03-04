"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin-sidebar";
import {
  FolderKanban,
  FileText,
  ImageIcon,
  Briefcase,
  BookOpen,
  Database,
  Loader2,
} from "lucide-react";

interface Stats {
  projects: number;
  posts: number;
  experience: number;
  research: number;
  photos: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const [proj, posts, exp, res, photos] = await Promise.all([
        fetch("/api/admin/projects").then((r) => r.json()),
        fetch("/api/admin/posts").then((r) => r.json()),
        fetch("/api/admin/experience").then((r) => r.json()),
        fetch("/api/admin/research").then((r) => r.json()),
        fetch("/api/admin/photos").then((r) => r.json()),
      ]);

      setStats({
        projects: Array.isArray(proj) ? proj.length : 0,
        posts: Array.isArray(posts) ? posts.length : 0,
        experience: Array.isArray(exp) ? exp.length : 0,
        research: Array.isArray(res) ? res.length : 0,
        photos: Array.isArray(photos) ? photos.length : 0,
      });
    } catch {
      setStats({ projects: 0, posts: 0, experience: 0, research: 0, photos: 0 });
    }
  }

  async function handleSeed() {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeedResult(
          Object.entries(data.results)
            .map(([k, v]) => `${k}: ${v}`)
            .join(" | ")
        );
        loadStats();
      } else {
        setSeedResult(`Error: ${data.error}`);
      }
    } catch {
      setSeedResult("Connection error");
    } finally {
      setSeeding(false);
    }
  }

  const statCards = stats
    ? [
        { label: "Projects", count: stats.projects, icon: FolderKanban, href: "/admin/projects" },
        { label: "Blog Posts", count: stats.posts, icon: FileText, href: "/admin/posts" },
        { label: "Experience", count: stats.experience, icon: Briefcase, href: "/admin/experience" },
        { label: "Research", count: stats.research, icon: BookOpen, href: "/admin/research" },
        { label: "Photo Sections", count: stats.photos, icon: ImageIcon, href: "/admin/photos" },
      ]
    : [];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-header">
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">
            Overview of your portfolio content
          </p>
        </div>

        <div className="admin-content">
          {/* Stat Cards */}
          {stats ? (
            <div className="admin-stat-grid">
              {statCards.map((s) => (
                <a key={s.label} href={s.href} className="admin-stat-card">
                  <div className="admin-stat-icon">
                    <s.icon size={20} />
                  </div>
                  <div>
                    <p className="admin-stat-count">{s.count}</p>
                    <p className="admin-stat-label">{s.label}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="admin-loading">
              <Loader2 size={20} className="animate-spin" />
              <span>Loading stats...</span>
            </div>
          )}

          {/* Seed Database */}
          <div className="admin-section">
            <h2 className="admin-section-title">Database</h2>
            <p className="admin-section-desc">
              Seed the database with your existing static content. This only
              inserts data if the collections are empty.
            </p>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="admin-btn-subtle"
            >
              {seeding ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <Database size={14} />
                  Seed Database
                </>
              )}
            </button>
            {seedResult && (
              <p className="admin-seed-result">{seedResult}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

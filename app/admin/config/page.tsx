"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin-sidebar";
import { Save, Loader2 } from "lucide-react";
import {
  applyPrimaryColorVariables,
  DEFAULT_PRIMARY_COLOR_KEY,
  PRIMARY_COLORS,
} from "app/lib/primary-colors";

interface SiteConfig {
  _id: string;
  name: string;
  title: string;
  description: string;
  bio: string;
  subtitle: string;
  primaryColor: string;
  socialLinks: {
    twitter: string;
    github: string;
    instagram: string;
    linkedin: string;
    email: string;
    orcid: string;
    scholar: string;
  };
}

export default function AdminConfigPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/config");
    const data = await res.json();
    setConfig({
      ...data,
      primaryColor: data.primaryColor || DEFAULT_PRIMARY_COLOR_KEY,
    });
    setLoading(false);
  }

  useEffect(() => {
    if (!config?.primaryColor) return;
    applyPrimaryColorVariables(document.documentElement, config.primaryColor);
  }, [config?.primaryColor]);

  async function handleSave() {
    if (!config) return;
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function updateSocial(key: string, value: string) {
    if (!config) return;
    setConfig({
      ...config,
      socialLinks: { ...config.socialLinks, [key]: value },
    });
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-page-title">Site Config</h1>
            <p className="admin-page-subtitle">
              Update your site metadata and social links
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="admin-btn-primary"
          >
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        <div className="admin-content">
          {loading || !config ? (
            <div className="admin-loading">
              <Loader2 size={20} className="animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <div className="admin-editor-card">
                <div className="admin-editor-header">
                  <h3>General</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-field">
                    <label>Name</label>
                    <input
                      className="admin-input"
                      value={config.name}
                      onChange={(e) =>
                        setConfig({ ...config, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Page Title</label>
                    <input
                      className="admin-input"
                      value={config.title}
                      onChange={(e) =>
                        setConfig({ ...config, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="admin-field full">
                    <label>Subtitle</label>
                    <input
                      className="admin-input"
                      value={config.subtitle}
                      onChange={(e) =>
                        setConfig({ ...config, subtitle: e.target.value })
                      }
                    />
                  </div>
                  <div className="admin-field full">
                    <label>SEO Description</label>
                    <textarea
                      className="admin-textarea"
                      rows={3}
                      value={config.description}
                      onChange={(e) =>
                        setConfig({ ...config, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="admin-field full">
                    <label>Bio Paragraph</label>
                    <textarea
                      className="admin-textarea"
                      rows={4}
                      value={config.bio}
                      onChange={(e) =>
                        setConfig({ ...config, bio: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="admin-editor-card">
                <div className="admin-editor-header">
                  <h3>Social Links</h3>
                </div>
                <div className="admin-form-grid">
                  <div className="admin-field">
                    <label>GitHub</label>
                    <input
                      className="admin-input"
                      value={config.socialLinks.github}
                      onChange={(e) => updateSocial("github", e.target.value)}
                    />
                  </div>
                  <div className="admin-field">
                    <label>LinkedIn</label>
                    <input
                      className="admin-input"
                      value={config.socialLinks.linkedin}
                      onChange={(e) => updateSocial("linkedin", e.target.value)}
                    />
                  </div>
                  <div className="admin-field">
                    <label>Twitter / X</label>
                    <input
                      className="admin-input"
                      value={config.socialLinks.twitter}
                      onChange={(e) => updateSocial("twitter", e.target.value)}
                    />
                  </div>
                  <div className="admin-field">
                    <label>Instagram</label>
                    <input
                      className="admin-input"
                      value={config.socialLinks.instagram}
                      onChange={(e) => updateSocial("instagram", e.target.value)}
                    />
                  </div>
                  <div className="admin-field">
                    <label>Email</label>
                    <input
                      className="admin-input"
                      value={config.socialLinks.email}
                      onChange={(e) => updateSocial("email", e.target.value)}
                    />
                  </div>
                  <div className="admin-field">
                    <label>Google Scholar</label>
                    <input
                      className="admin-input"
                      value={config.socialLinks.scholar}
                      onChange={(e) => updateSocial("scholar", e.target.value)}
                    />
                  </div>
                  <div className="admin-field full">
                    <label>ORCID</label>
                    <input
                      className="admin-input"
                      value={config.socialLinks.orcid}
                      onChange={(e) => updateSocial("orcid", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-editor-card">
                <div className="admin-editor-header">
                  <h3>Color Theme</h3>
                </div>
                <p className="text-xs text-[var(--color-contrast-low)] mb-3 p-4">
                  Choose your primary accent color. This updates buttons, links, highlights, and admin UI accents.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRIMARY_COLORS.map((theme) => {
                    const isActive = config.primaryColor === theme.key;
                    return (
                      <button
                        key={theme.key}
                        type="button"
                        className={`admin-color-option ${isActive ? "active" : ""}`}
                        onClick={() =>
                          setConfig({ ...config, primaryColor: theme.key })
                        }
                      >
                        <span
                          className="admin-color-swatch"
                          style={{ backgroundColor: theme.accent }}
                          aria-hidden="true"
                        />
                        <span className="admin-color-label">{theme.label}</span>
                        {isActive && <span className="admin-color-check" aria-hidden="true">•</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

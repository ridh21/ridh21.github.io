"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin-sidebar";
import { useConfirm } from "../components/confirm-dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Loader2,
  GripVertical,
} from "lucide-react";
import ImageUpload from "../components/image-upload";

interface Project {
  _id: string;
  title: string;
  year: number;
  description: string;
  details: string;
  url: string;
  image: string;
  tags: string[];
  order: number;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function startNew() {
    setEditing({
      _id: "",
      title: "",
      year: new Date().getFullYear(),
      description: "",
      details: "",
      url: "",
      image: "",
      tags: [],
      order: projects.length,
    });
    setTagsInput("");
    setIsNew(true);
  }

  function startEdit(p: Project) {
    setEditing({ ...p });
    setTagsInput(p.tags.join(", "));
    setIsNew(false);
  }

  function cancelEdit() {
    setEditing(null);
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);

    const payload = {
      ...editing,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isNew) {
        await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`/api/admin/projects/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setEditing(null);
      setIsNew(false);
      await loadProjects();
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const [confirmDelete, ConfirmDialog] = useConfirm();

  async function handleDelete(id: string) {
    if (!(await confirmDelete("This will permanently remove the project."))) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    await loadProjects();
  }

  return (
    <div className="admin-layout">
      <ConfirmDialog />
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-page-title">Projects</h1>
            <p className="admin-page-subtitle">
              Manage your portfolio projects
            </p>
          </div>
          <button onClick={startNew} className="admin-btn-primary">
            <Plus size={14} />
            Add Project
          </button>
        </div>

        <div className="admin-content">
          {/* Editor Modal */}
          {editing && (
            <div className="admin-editor-card">
              <div className="admin-editor-header">
                <h3>{isNew ? "New Project" : "Edit Project"}</h3>
                <button onClick={cancelEdit} className="admin-icon-btn">
                  <X size={16} />
                </button>
              </div>
              <div className="admin-form-grid">
                <div className="admin-field">
                  <label>Title</label>
                  <input
                    className="admin-input"
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({ ...editing, title: e.target.value })
                    }
                  />
                </div>
                <div className="admin-field">
                  <label>Year</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={editing.year}
                    onChange={(e) =>
                      setEditing({ ...editing, year: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="admin-field full">
                  <label>Description</label>
                  <textarea
                    className="admin-textarea"
                    rows={2}
                    value={editing.description}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                  />
                </div>
                <div className="admin-field full">
                  <label>Details (Markdown)</label>
                  <textarea
                    className="admin-textarea admin-textarea-tall"
                    rows={6}
                    value={editing.details}
                    onChange={(e) =>
                      setEditing({ ...editing, details: e.target.value })
                    }
                  />
                </div>
                <div className="admin-field">
                  <label>URL</label>
                  <input
                    className="admin-input"
                    value={editing.url}
                    onChange={(e) =>
                      setEditing({ ...editing, url: e.target.value })
                    }
                  />
                </div>
                <ImageUpload
                  value={editing.image}
                  onChange={(url) => setEditing({ ...editing, image: url })}
                  folder="portfolio/projects"
                  label="Project Image"
                />
                <div className="admin-field full">
                  <label>Tags (comma separated)</label>
                  <input
                    className="admin-input"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>
                <div className="admin-field">
                  <label>Order</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={editing.order}
                    onChange={(e) =>
                      setEditing({ ...editing, order: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
              <div className="admin-editor-actions">
                <button onClick={cancelEdit} className="admin-btn-subtle">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="admin-btn-primary"
                >
                  {saving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          )}

          {/* Projects List */}
          {loading ? (
            <div className="admin-loading">
              <Loader2 size={20} className="animate-spin" />
              <span>Loading...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="admin-empty">
              No projects yet. Click &ldquo;Add Project&rdquo; to create one, or seed the
              database from the Dashboard.
            </div>
          ) : (
            <div className="admin-list">
              {projects.map((p) => (
                <div key={p._id} className="admin-list-item">
                  <div className="admin-list-grip">
                    <GripVertical size={14} />
                  </div>
                  <div className="admin-list-content">
                    <h3 className="admin-list-title">{p.title}</h3>
                    <p className="admin-list-meta">
                      {p.year} · {p.tags.join(", ")}
                    </p>
                  </div>
                  <div className="admin-list-actions">
                    <button
                      onClick={() => startEdit(p)}
                      className="admin-icon-btn"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="admin-icon-btn admin-icon-btn-danger"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
  Eye,
  EyeOff,
} from "lucide-react";
import ImageUpload from "../components/image-upload";
import AdminDatePicker from "../components/admin-date-picker";

interface Post {
  _id: string;
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  image?: string;
  content: string;
  published: boolean;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    const res = await fetch("/api/admin/posts");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function startNew() {
    setEditing({
      _id: "",
      slug: "",
      title: "",
      publishedAt: new Date().toISOString().slice(0, 10),
      summary: "",
      tags: [],
      image: "",
      content: "",
      published: true,
    });
    setTagsInput("");
    setIsNew(true);
  }

  function startEdit(p: Post) {
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
        const res = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.status === 409) {
          alert("A post with this slug already exists");
          setSaving(false);
          return;
        }
      } else {
        await fetch(`/api/admin/posts/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setEditing(null);
      setIsNew(false);
      await loadPosts();
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const [confirmDelete, ConfirmDialog] = useConfirm();

  async function handleDelete(id: string) {
    if (!(await confirmDelete("This will permanently remove the blog post."))) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    await loadPosts();
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  return (
    <div className="admin-layout">
      <ConfirmDialog />
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-page-title">Blog Posts</h1>
            <p className="admin-page-subtitle">
              Manage your blog posts and articles
            </p>
          </div>
          <button onClick={startNew} className="admin-btn-primary">
            <Plus size={14} />
            New Post
          </button>
        </div>

        <div className="admin-content">
          {editing && (
            <div className="admin-editor-card">
              <div className="admin-editor-header">
                <h3>{isNew ? "New Post" : "Edit Post"}</h3>
                <button onClick={cancelEdit} className="admin-icon-btn">
                  <X size={16} />
                </button>
              </div>
              <div className="admin-form-grid">
                <div className="admin-field full">
                  <label>Title</label>
                  <input
                    className="admin-input"
                    value={editing.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setEditing({
                        ...editing,
                        title,
                        slug: isNew ? generateSlug(title) : editing.slug,
                      });
                    }}
                  />
                </div>
                <div className="admin-field">
                  <label>Slug</label>
                  <input
                    className="admin-input"
                    value={editing.slug}
                    onChange={(e) =>
                      setEditing({ ...editing, slug: e.target.value })
                    }
                  />
                </div>
                <div className="admin-field">
                  <label>Published Date</label>
                  <AdminDatePicker
                    value={editing.publishedAt}
                    onChange={(val) =>
                      setEditing({ ...editing, publishedAt: val })
                    }
                  />
                </div>
                <div className="admin-field full">
                  <label>Summary</label>
                  <textarea
                    className="admin-textarea"
                    rows={2}
                    value={editing.summary}
                    onChange={(e) =>
                      setEditing({ ...editing, summary: e.target.value })
                    }
                  />
                </div>
                <div className="admin-field full">
                  <label>Content (MDX)</label>
                  <textarea
                    className="admin-textarea admin-textarea-code"
                    rows={16}
                    value={editing.content}
                    onChange={(e) =>
                      setEditing({ ...editing, content: e.target.value })
                    }
                    spellCheck={false}
                  />
                </div>
                <ImageUpload
                  value={editing.image || ""}
                  onChange={(url) => setEditing({ ...editing, image: url })}
                  folder="portfolio/blog"
                  label="Cover Image (optional)"
                />
                <div className="admin-field">
                  <label>Tags (comma separated)</label>
                  <input
                    className="admin-input"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="AI, ML, Python"
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={editing.published}
                      onChange={(e) =>
                        setEditing({ ...editing, published: e.target.checked })
                      }
                    />
                    Published
                  </label>
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

          {loading ? (
            <div className="admin-loading">
              <Loader2 size={20} className="animate-spin" />
              <span>Loading...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="admin-empty">
              No posts yet. Click &ldquo;New Post&rdquo; to create one, or seed the database.
            </div>
          ) : (
            <div className="admin-list">
              {posts.map((p) => (
                <div key={p._id} className="admin-list-item">
                  <div className="admin-list-status">
                    {p.published ? (
                      <Eye size={14} className="text-green-500" />
                    ) : (
                      <EyeOff size={14} className="text-[var(--color-contrast-low)]" />
                    )}
                  </div>
                  <div className="admin-list-content">
                    <h3 className="admin-list-title">{p.title}</h3>
                    <p className="admin-list-meta">
                      {p.publishedAt} · /{p.slug}
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

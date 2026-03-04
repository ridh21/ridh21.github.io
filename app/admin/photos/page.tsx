"use client";

import { useEffect, useState, useRef } from "react";
import AdminSidebar from "../components/admin-sidebar";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Loader2,
  GripVertical,
  ImagePlus,
  Minus,
  Upload,
  Images,
} from "lucide-react";

interface PhotoImage {
  src: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
}

interface PhotoSection {
  _id: string;
  title: string;
  subtitle: string;
  images: PhotoImage[];
  order: number;
}

export default function AdminPhotosPage() {
  const [sections, setSections] = useState<PhotoSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PhotoSection | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ done: 0, total: 0 });
  const [bulkDragOver, setBulkDragOver] = useState(false);
  const bulkFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/photos");
    const data = await res.json();
    setSections(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function startNew() {
    setEditing({
      _id: "",
      title: "",
      subtitle: "",
      images: [],
      order: sections.length,
    });
    setIsNew(true);
  }

  function startEdit(s: PhotoSection) {
    setEditing({ ...s, images: [...s.images] });
    setIsNew(false);
  }

  function cancelEdit() {
    setEditing(null);
    setIsNew(false);
  }

  function addImage() {
    if (!editing) return;
    setEditing({
      ...editing,
      images: [
        ...editing.images,
        { src: "", alt: "", aspect: "landscape" },
      ],
    });
  }

  function removeImage(index: number) {
    if (!editing) return;
    const imgs = [...editing.images];
    imgs.splice(index, 1);
    setEditing({ ...editing, images: imgs });
  }

  function updateImage(index: number, field: string, value: string) {
    if (!editing) return;
    const imgs = [...editing.images];
    imgs[index] = { ...imgs[index], [field]: value };
    setEditing({ ...editing, images: imgs });
  }

  async function handleImageUpload(index: number, file: File) {
    if (!editing || !file.type.startsWith("image/")) return;
    setUploadingIndex(index);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "portfolio/photos");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      updateImage(index, "src", data.url);
    } catch (e: any) {
      alert(`Upload failed: ${e.message}`);
    } finally {
      setUploadingIndex(null);
    }
  }

  function handleDrop(index: number, e: React.DragEvent) {
    e.preventDefault();
    setDragOverIndex(null);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(index, file);
  }

  function handleDragOver(index: number, e: React.DragEvent) {
    e.preventDefault();
    setDragOverIndex(index);
  }

  function handleDragLeave() {
    setDragOverIndex(null);
  }

  async function handleBulkUpload(files: FileList | File[]) {
    if (!editing) return;
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (imageFiles.length === 0) return;

    setBulkUploading(true);
    setBulkProgress({ done: 0, total: imageFiles.length });

    const newImages: PhotoImage[] = [];
    for (let i = 0; i < imageFiles.length; i++) {
      try {
        const formData = new FormData();
        formData.append("file", imageFiles[i]);
        formData.append("folder", "portfolio/photos");
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        // Auto-detect aspect from image dimensions if available
        let aspect: "landscape" | "portrait" | "square" = "landscape";
        try {
          const img = new window.Image();
          await new Promise<void>((resolve) => {
            img.onload = () => {
              if (img.naturalWidth === img.naturalHeight) aspect = "square";
              else if (img.naturalHeight > img.naturalWidth) aspect = "portrait";
              resolve();
            };
            img.onerror = () => resolve();
            img.src = data.url;
          });
        } catch {}
        const fileName = imageFiles[i].name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
        newImages.push({ src: data.url, alt: fileName, aspect });
      } catch (e: any) {
        console.error(`Failed to upload ${imageFiles[i].name}:`, e);
      }
      setBulkProgress({ done: i + 1, total: imageFiles.length });
    }

    if (newImages.length > 0) {
      setEditing((prev) =>
        prev ? { ...prev, images: [...prev.images, ...newImages] } : prev
      );
    }

    setBulkUploading(false);
    setBulkProgress({ done: 0, total: 0 });
    if (newImages.length < imageFiles.length) {
      alert(
        `${newImages.length} of ${imageFiles.length} images uploaded. Some failed.`
      );
    }
  }

  function handleBulkDrop(e: React.DragEvent) {
    e.preventDefault();
    setBulkDragOver(false);
    if (e.dataTransfer.files?.length) handleBulkUpload(e.dataTransfer.files);
  }

  function handleBulkDragOver(e: React.DragEvent) {
    e.preventDefault();
    setBulkDragOver(true);
  }

  function handleBulkDragLeave() {
    setBulkDragOver(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) {
        await fetch("/api/admin/photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
      } else {
        await fetch(`/api/admin/photos/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
      }
      setEditing(null);
      setIsNew(false);
      await load();
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this photo section?")) return;
    await fetch(`/api/admin/photos/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-page-title">Photos</h1>
            <p className="admin-page-subtitle">
              Manage photo gallery sections
            </p>
          </div>
          <button onClick={startNew} className="admin-btn-primary">
            <Plus size={14} />
            Add Section
          </button>
        </div>

        <div className="admin-content">
          {editing && (
            <div className="admin-editor-card">
              <div className="admin-editor-header">
                <h3>{isNew ? "New Section" : "Edit Section"}</h3>
                <button onClick={cancelEdit} className="admin-icon-btn">
                  <X size={16} />
                </button>
              </div>
              <div className="admin-form-grid">
                <div className="admin-field">
                  <label>Section Title</label>
                  <input
                    className="admin-input"
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({ ...editing, title: e.target.value })
                    }
                  />
                </div>
                <div className="admin-field">
                  <label>Order</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={editing.order}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="admin-field full">
                  <label>Subtitle</label>
                  <input
                    className="admin-input"
                    value={editing.subtitle}
                    onChange={(e) =>
                      setEditing({ ...editing, subtitle: e.target.value })
                    }
                  />
                </div>

                {/* Images */}
                <div className="admin-field full">
                  <div className="admin-images-header">
                    <label>Images ({editing.images.length})</label>
                    <button onClick={addImage} className="admin-btn-subtle admin-btn-sm">
                      <ImagePlus size={12} />
                      Add Image
                    </button>
                  </div>

                  {/* Bulk Upload Zone */}
                  <div
                    className={`admin-upload-zone admin-bulk-drop-zone ${
                      bulkDragOver ? "drag-over" : ""
                    }`}
                    onDrop={handleBulkDrop}
                    onDragOver={handleBulkDragOver}
                    onDragLeave={handleBulkDragLeave}
                    onClick={() => !bulkUploading && bulkFileRef.current?.click()}
                  >
                    <input
                      ref={bulkFileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.length) handleBulkUpload(e.target.files);
                        e.target.value = "";
                      }}
                    />
                    {bulkUploading ? (
                      <div className="admin-upload-status">
                        <Loader2 size={16} className="animate-spin" />
                        <span>
                          Uploading {bulkProgress.done}/{bulkProgress.total} images...
                        </span>
                      </div>
                    ) : (
                      <div className="admin-upload-status">
                        <Images size={16} />
                        <span>Drop multiple images here or click to bulk upload</span>
                      </div>
                    )}
                  </div>

                  <div className="admin-images-list">
                    {editing.images.map((img, i) => (
                      <div key={i} className="admin-photo-image-block">
                        {/* Drop zone */}
                        <div
                          className={`admin-upload-zone admin-photo-drop-zone ${
                            dragOverIndex === i ? "drag-over" : ""
                          }`}
                          onDrop={(e) => handleDrop(i, e)}
                          onDragOver={(e) => handleDragOver(i, e)}
                          onDragLeave={handleDragLeave}
                        >
                          {uploadingIndex === i ? (
                            <div className="admin-upload-status">
                              <Loader2 size={14} className="animate-spin" />
                              <span>Uploading...</span>
                            </div>
                          ) : (
                            <div className="admin-upload-status">
                              <Upload size={14} />
                              <span>Drop image here</span>
                            </div>
                          )}
                        </div>
                        <div className="admin-image-row">
                          <input
                            className="admin-input"
                            placeholder="Image URL"
                            value={img.src}
                            onChange={(e) => updateImage(i, "src", e.target.value)}
                          />
                          <input
                            className="admin-input"
                            placeholder="Alt text"
                            value={img.alt}
                            onChange={(e) => updateImage(i, "alt", e.target.value)}
                          />
                          <select
                            className="admin-input admin-select"
                            value={img.aspect}
                            onChange={(e) =>
                              updateImage(i, "aspect", e.target.value)
                            }
                          >
                            <option value="landscape">Landscape</option>
                            <option value="portrait">Portrait</option>
                            <option value="square">Square</option>
                          </select>
                          <label className="admin-upload-file-btn" title="Upload image">
                            {uploadingIndex === i ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <Upload size={14} />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleImageUpload(i, f);
                                e.target.value = "";
                              }}
                            />
                          </label>
                          <button
                            onClick={() => removeImage(i)}
                            className="admin-icon-btn admin-icon-btn-danger"
                          >
                            <Minus size={14} />
                          </button>
                        </div>
                        {img.src && (
                          <div className="admin-photo-thumb">
                            <img src={img.src} alt={img.alt || "Preview"} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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
          ) : sections.length === 0 ? (
            <div className="admin-empty">No photo sections yet.</div>
          ) : (
            <div className="admin-list">
              {sections.map((s) => (
                <div key={s._id} className="admin-list-item">
                  <div className="admin-list-grip">
                    <GripVertical size={14} />
                  </div>
                  <div className="admin-list-content">
                    <h3 className="admin-list-title">{s.title}</h3>
                    <p className="admin-list-meta">
                      {s.images.length} images · {s.subtitle}
                    </p>
                  </div>
                  <div className="admin-list-actions">
                    <button
                      onClick={() => startEdit(s)}
                      className="admin-icon-btn"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
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

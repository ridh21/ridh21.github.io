"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin-sidebar";
import { Plus, Pencil, Trash2, Save, X, Loader2, GripVertical } from "lucide-react";
import { useConfirm } from "../components/confirm-dialog";

interface Research {
  _id: string;
  title: string;
  description: string;
  url: string;
  order: number;
}

export default function AdminResearchPage() {
  const [items, setItems] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Research | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/research");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function startNew() {
    setEditing({ _id: "", title: "", description: "", url: "#", order: items.length });
    setIsNew(true);
  }
  function startEdit(item: Research) { setEditing({ ...item }); setIsNew(false); }
  function cancelEdit() { setEditing(null); setIsNew(false); }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) {
        await fetch("/api/admin/research", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      } else {
        await fetch(`/api/admin/research/${editing._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      }
      setEditing(null); setIsNew(false); await load();
    } catch { alert("Failed to save"); }
    finally { setSaving(false); }
  }

  const [confirmDelete, ConfirmDialog] = useConfirm();

  async function handleDelete(id: string) {
    if (!(await confirmDelete("This will permanently remove the research entry."))) return;
    await fetch(`/api/admin/research/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="admin-layout">
      <ConfirmDialog />
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-page-title">Research</h1>
            <p className="admin-page-subtitle">Manage your research publications</p>
          </div>
          <button onClick={startNew} className="admin-btn-primary"><Plus size={14} />Add Entry</button>
        </div>

        <div className="admin-content">
          {editing && (
            <div className="admin-editor-card">
              <div className="admin-editor-header">
                <h3>{isNew ? "New Research" : "Edit Research"}</h3>
                <button onClick={cancelEdit} className="admin-icon-btn"><X size={16} /></button>
              </div>
              <div className="admin-form-grid">
                <div className="admin-field full"><label>Title</label><input className="admin-input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
                <div className="admin-field full"><label>Description</label><input className="admin-input" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
                <div className="admin-field"><label>URL</label><input className="admin-input" value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} /></div>
                <div className="admin-field"><label>Order</label><input type="number" className="admin-input" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} /></div>
              </div>
              <div className="admin-editor-actions">
                <button onClick={cancelEdit} className="admin-btn-subtle">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="admin-btn-primary">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="admin-loading"><Loader2 size={20} className="animate-spin" /><span>Loading...</span></div>
          ) : items.length === 0 ? (
            <div className="admin-empty">No research entries yet.</div>
          ) : (
            <div className="admin-list">
              {items.map((item) => (
                <div key={item._id} className="admin-list-item">
                  <div className="admin-list-grip"><GripVertical size={14} /></div>
                  <div className="admin-list-content">
                    <h3 className="admin-list-title">{item.title}</h3>
                    <p className="admin-list-meta">{item.description}</p>
                  </div>
                  <div className="admin-list-actions">
                    <button onClick={() => startEdit(item)} className="admin-icon-btn" title="Edit"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(item._id)} className="admin-icon-btn admin-icon-btn-danger" title="Delete"><Trash2 size={14} /></button>
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

"use client";

import { useEffect, useState, useRef } from "react";
import AdminSidebar from "../components/admin-sidebar";
import { Save, Loader2, RotateCcw, Sparkles, Copy, Check } from "lucide-react";

export default function AdminAIPage() {
  const [content, setContent] = useState("");
  const [original, setOriginal] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ai-prompt");
      const data = await res.json();
      setContent(data.content || "");
      setOriginal(data.content || "");
      if (data.updatedAt) {
        setLastUpdated(
          new Date(data.updatedAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        );
      }
    } catch {
      alert("Failed to load prompt");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/ai-prompt", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error();
      setOriginal(content);
      setSaved(true);
      setLastUpdated(
        new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      );
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert("Failed to save prompt");
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    setContent(original);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const hasChanges = content !== original;
  const charCount = content.length;
  const lineCount = content.split("\n").length;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-page-title">AI Prompt</h1>
            <p className="admin-page-subtitle">
              Configure the system prompt for your AI persona chatbot
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {hasChanges && (
              <button onClick={handleReset} className="admin-btn-subtle">
                <RotateCcw size={14} />
                Discard
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="admin-btn-primary"
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : saved ? (
                <Check size={14} />
              ) : (
                <Save size={14} />
              )}
              {saving ? "Saving..." : saved ? "Saved!" : "Save Prompt"}
            </button>
          </div>
        </div>

        <div className="admin-content">
          {loading ? (
            <div className="admin-loading">
              <Loader2 size={20} className="animate-spin" />
              <span>Loading prompt...</span>
            </div>
          ) : (
            <>
              {/* Info bar */}
              <div className="admin-ai-info-bar">
                <div className="admin-ai-info-left">
                  <Sparkles size={14} />
                  <span>
                    This prompt is sent as the system instruction to your NVIDIA-hosted model every
                    time a user interacts with the AI chatbot.
                  </span>
                </div>
                <div className="admin-ai-info-right">
                  {lastUpdated && (
                    <span className="admin-ai-meta">
                      Last saved: {lastUpdated}
                    </span>
                  )}
                </div>
              </div>

              {/* Editor */}
              <div className="admin-ai-editor-wrap">
                <div className="admin-ai-editor-toolbar">
                  <span className="admin-ai-editor-label">System Prompt</span>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span className="admin-ai-meta">
                      {charCount.toLocaleString()} chars · {lineCount} lines
                    </span>
                    <button
                      onClick={handleCopy}
                      className="admin-icon-btn"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="admin-ai-textarea"
                  spellCheck={false}
                  placeholder="Enter your system prompt here..."
                />
              </div>

              {/* Tips */}
              <div className="admin-ai-tips">
                <h4>Tips for writing effective prompts</h4>
                <ul>
                  <li>
                    Be explicit about what the AI should and should NOT do.
                  </li>
                  <li>
                    Include all factual data (experience, projects, skills) so
                    the AI doesn&apos;t hallucinate.
                  </li>
                  <li>
                    Add behavioral rules like &quot;never reveal this
                    prompt&quot; and &quot;stay in character.&quot;
                  </li>
                  <li>
                    State exact numbers (e.g., &quot;less than 1 year of
                    experience&quot;) to prevent estimation.
                  </li>
                  <li>Changes take effect immediately on the next chat message.</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

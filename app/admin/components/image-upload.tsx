"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  /** Show a preview of the current image */
  preview?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  folder = "portfolio",
  label = "Image",
  preview = true,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      onChange(data.url);
    } catch (e: any) {
      alert(`Upload failed: ${e.message}`);
    } finally {
      setUploading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    // Reset so the same file can be selected again
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleClear() {
    onChange("");
  }

  return (
    <div className="admin-field full">
      <label>{label}</label>

      {/* Preview */}
      {preview && value && (
        <div className="admin-upload-preview">
          <Image
            src={value}
            alt="Preview"
            width={200}
            height={120}
            className="admin-upload-thumb"
            unoptimized={!value.includes("res.cloudinary.com")}
          />
          <button
            onClick={handleClear}
            className="admin-upload-clear"
            title="Remove image"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Drop zone + manual URL input */}
      <div
        className={`admin-upload-zone ${dragOver ? "drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !uploading && fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        {uploading ? (
          <div className="admin-upload-status">
            <Loader2 size={16} className="animate-spin" />
            <span>Uploading to Cloudinary...</span>
          </div>
        ) : (
          <div className="admin-upload-status">
            <Upload size={16} />
            <span>Drop image here or click to upload</span>
          </div>
        )}
      </div>

      {/* Manual URL fallback */}
      <div className="admin-upload-url-row">
        <span className="admin-upload-or">or paste URL</span>
        <input
          type="text"
          className="admin-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon({ size = 12 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" opacity="0.5" />
      <path d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * Small client-side copy control used in the design gallery.
 * - `variant="button"` renders a labelled "Copy" / "Copied!" button (palette copy).
 * - `variant="hex"` renders a clickable hex chip that copies its own value.
 */
export function CopyButton({
  text,
  label,
  variant = "button",
}: {
  text: string;
  label?: string;
  variant?: "button" | "hex";
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  if (variant === "hex") {
    return (
      <button
        type="button"
        onClick={copy}
        title={`Copy ${text}`}
        className="inline-flex items-center gap-1 rounded font-mono text-[0.7rem] text-[var(--color-contrast-low)] transition-colors hover:text-[var(--color-accent)]"
      >
        {copied ? <CheckIcon /> : null}
        {copied ? "Copied" : text}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-2 py-1 text-xs font-medium text-[var(--color-contrast-medium)] transition-colors hover:border-[var(--color-accent-border)] hover:text-[var(--color-accent)]"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? "Copied!" : label ?? "Copy"}
    </button>
  );
}

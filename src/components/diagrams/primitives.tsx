// Shared building blocks for the hand-drawn article diagrams.
// Colours come from CSS tones in article.css: blue = model, amber = data,
// green = learning/updates, violet = noise/privacy, rose = deleted/error.

import type { ReactNode } from "react";

export type Tone = "muted" | "blue" | "green" | "amber" | "violet" | "rose";
const TONES: Tone[] = ["muted", "blue", "green", "amber", "violet", "rose"];

export function Figure({ caption, children }: { caption: ReactNode; children: ReactNode }) {
  return (
    <figure className="fig">
      <div className="fig-art">{children}</div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** One arrowhead marker per tone. Reference as url(#{prefix}-{tone}). */
export function Arrowheads({ prefix }: { prefix: string }) {
  return (
    <defs>
      {TONES.map((t) => (
        <marker key={t} id={`${prefix}-${t}`} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className={t === "muted" ? "fig-head" : `t-${t}-fill`} />
        </marker>
      ))}
    </defs>
  );
}

export const lineClass = (tone: Tone, dashed = false) =>
  `fig-line${tone === "muted" ? "" : ` t-${tone}-line`}${dashed ? " fig-line-dash" : ""}`;

/** Stack of records: data. */
export function Data({ x, y, tone = "amber" }: { x: number; y: number; tone?: Tone }) {
  return (
    <g aria-hidden="true">
      <path className={`t-${tone}-soft`} d={`M${x - 11} ${y - 9} V${y + 9} A11 4 0 0 0 ${x + 11} ${y + 9} V${y - 9}`} />
      <path className={`t-${tone}-line`} fill="none" d={`M${x - 11} ${y} A11 4 0 0 0 ${x + 11} ${y}`} />
      <ellipse className={`t-${tone}-soft`} cx={x} cy={y - 9} rx="11" ry="4" />
    </g>
  );
}

/** A tiny neural network: the model. `solid` marks the shared/global model. */
export function Model({ x, y, solid = false }: { x: number; y: number; solid?: boolean }) {
  const a = [x - 7, y - 6], b = [x - 7, y + 6], c = [x + 8, y];
  return (
    <g aria-hidden="true">
      <rect className={solid ? "t-blue-fill" : "t-blue-soft"} x={x - 15} y={y - 13} width="30" height="26" rx="6" />
      <g className={solid ? "fig-wire-inv" : "t-blue-line"} strokeWidth="1.2">
        <line x1={a[0]} y1={a[1]} x2={c[0]} y2={c[1]} />
        <line x1={b[0]} y1={b[1]} x2={c[0]} y2={c[1]} />
        <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
      </g>
      {[a, b, c].map(([cx, cy], i) => <circle key={i} className={solid ? "fig-dot-inv" : "t-blue-fill"} cx={cx} cy={cy} r="2.6" />)}
    </g>
  );
}

export function Card({ x, y, w, h, label, tone }: { x: number; y: number; w: number; h: number; label?: string; tone?: Tone }) {
  return (
    <g>
      <rect className={tone && tone !== "muted" ? `t-${tone}-soft` : "fig-box"} x={x} y={y} width={w} height={h} rx="8" />
      {label && <text className="fig-label" x={x + w / 2} y={y + h - 10} textAnchor="middle">{label}</text>}
    </g>
  );
}

export function Badge({ x, y, n, tone = "muted" }: { x: number; y: number; n: number | string; tone?: Tone }) {
  return (
    <g>
      <circle className={tone === "muted" ? "fig-ink" : `t-${tone}-fill`} cx={x} cy={y} r="9.5" />
      <text className="fig-badge" x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central">{n}</text>
    </g>
  );
}

/** Small colour key, laid out in a row. */
export function Legend({ x, y, items }: { x: number; y: number; items: { tone: Tone; label: string; dashed?: boolean }[] }) {
  // Approximate text width so items sit side by side without measuring the DOM.
  const offsets = items.reduce<number[]>((acc, it, i) => [...acc, i === 0 ? x : acc[i - 1] + 32 + items[i - 1].label.length * 6.4], []);
  return (
    <g className="fig-legend">
      {items.map((it, i) => (
        <g key={it.label}>
          <line className={lineClass(it.tone, it.dashed)} x1={offsets[i]} y1={y} x2={offsets[i] + 18} y2={y} strokeWidth="2" />
          <text x={offsets[i] + 24} y={y + 4}>{it.label}</text>
        </g>
      ))}
    </g>
  );
}

/** Deterministic pseudo-random numbers, so noise looks identical on every render. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

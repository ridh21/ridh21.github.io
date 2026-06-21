import type { Metadata } from "next";
import { DM_Sans, Poppins, Inter, Manrope } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { IconArrowUpRight } from "../components/icons";
import { CopyButton } from "./copy-button";

// Load reference fonts so each sample (and its name) renders in its actual typeface.
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });
const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Design Gallery",
  description:
    "A curated collection of design inspiration — websites with great typography and color, my go-to fonts, color combinations, and design systems.",
};

// ── Edit me ──────────────────────────────────────────────────────────────────
// Websites I keep coming back to for their typography & color craft.
const inspirations: {
  name: string;
  url: string;
  note: string;
  tags: string[];
}[] = [
  {
    name: "Sarvam AI",
    url: "https://www.sarvam.ai",
    note: "My all-time favourite. The Indian cultural touch is magnificent, and it's where this portfolio's typefaces come from — thank you, Sarvam!",
    tags: ["typography", "indian culture", "favourite"],
  },
  {
    name: "tanvir.io",
    url: "https://tanvir.io",
    note: "Attention to detail and micro-interactions are too good. Buttery page transitions and confident, minimal typography — the inspiration for this site's motion.",
    tags: ["motion", "micro-interactions", "detail"],
  },
  {
    name: "Modal",
    url: "https://modal.com",
    note: "Great fonts and a proper dark theme with a green accent done right.",
    tags: ["dark theme", "green accent", "typography"],
  },
  {
    name: "RunPod",
    url: "https://www.runpod.io",
    note: "Proper use of fonts and a modern purple that makes even 'AI-slop purple' look great — proof that purple is a strong color when used wisely.",
    tags: ["purple", "typography", "modern"],
  },
  {
    name: "Autosend",
    url: "https://autosend.com",
    note: "Gorgeous cream-and-purple light theme — and the 3D icons in the dashboard are something else.",
    tags: ["cream", "purple", "3d icons"],
  },
  {
    name: "Nucleo",
    url: "https://nucleoapp.com",
    note: "The design system this very portfolio is built on — restrained color, crisp contrast scale, soft shadows.",
    tags: ["design system", "color", "shadows"],
  },
  {
    name: "Linear",
    url: "https://linear.app",
    note: "The benchmark for gradient accents, glassy surfaces, and tight, purposeful spacing.",
    tags: ["gradient", "product", "dark mode"],
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    note: "Geist type system and a black-and-white palette that proves restraint is a feature.",
    tags: ["geist", "monochrome", "grid"],
  },
];

// My go-to fonts — reach for these first.
const fonts: {
  name: string;
  classification: string;
  use: string;
  url: string;
  sample: string;
  fontFamily?: string;
}[] = [
  {
    name: "SeasonMix",
    classification: "Serif display",
    use: "Headings on this site — gives the page a literary, editorial voice.",
    url: "https://lostype.com",
    sample: "Aa Bb Cc 123",
    fontFamily: "var(--font-seasonmix)",
  },
  {
    name: "Matter",
    classification: "Geometric sans",
    use: "Body & UI on this site — warm, legible, friendly at small sizes.",
    url: "https://displaay.net/typeface/matter/",
    sample: "The quick brown fox",
    fontFamily: "var(--font-matter)",
  },
  {
    name: "DM Sans",
    classification: "Low-contrast geometric sans",
    use: "Friendly product UI with a touch of personality.",
    url: "https://fonts.google.com/specimen/DM+Sans",
    sample: "The quick brown fox",
    fontFamily: dmSans.style.fontFamily,
  },
  {
    name: "Poppins",
    classification: "Geometric sans",
    use: "Bold, rounded headings for landing pages.",
    url: "https://fonts.google.com/specimen/Poppins",
    sample: "The quick brown fox",
    fontFamily: poppins.style.fontFamily,
  },
  {
    name: "Inter",
    classification: "Neutral sans",
    use: "The safe default — dense data tables and forms.",
    url: "https://rsms.me/inter/",
    sample: "The quick brown fox",
    fontFamily: inter.style.fontFamily,
  },
  {
    name: "Manrope",
    classification: "Modern geometric sans",
    use: "Clean, slightly technical UI with tight rhythm.",
    url: "https://fonts.google.com/specimen/Manrope",
    sample: "The quick brown fox",
    fontFamily: manrope.style.fontFamily,
  },
  {
    name: "Geist Mono",
    classification: "Monospace",
    use: "Code, numbers, and anything that needs fixed-width precision.",
    url: "https://vercel.com/font",
    sample: "const x = 42;",
    fontFamily: GeistMono.style.fontFamily,
  },
];

// Color combinations I like, with hex values.
const palettes: { name: string; note: string; colors: string[] }[] = [
  {
    name: "Nucleo Purple (this site)",
    note: "A single confident accent over a near-neutral greyscale.",
    colors: ["#896CFE", "#7553FD", "#FAFAFA", "#1C1F21", "#8C9497"],
  },
  {
    name: "Editorial Warm",
    note: "Cream paper, ink black, and a muted terracotta accent.",
    colors: ["#FBF7F0", "#1A1A1A", "#C45D3C", "#8A8577", "#E7E0D4"],
  },
  {
    name: "Deep Ocean",
    note: "Dark-mode friendly — slate base with a cyan highlight.",
    colors: ["#0B1620", "#13293D", "#0E9AC2", "#E6F4F8", "#5B7488"],
  },
  {
    name: "Forest Mono",
    note: "Calm greens for documentation and reading-heavy layouts.",
    colors: ["#0F1A14", "#16A34A", "#D8E8DC", "#F4F7F4", "#4B5D52"],
  },
];

// Design systems & token references worth studying.
const designSystems: { name: string; url: string; note: string }[] = [
  { name: "Radix Colors", url: "https://www.radix-ui.com/colors", note: "Accessible color scales with built-in light/dark pairing." },
  { name: "shadcn/ui", url: "https://ui.shadcn.com", note: "Composable Radix + Tailwind component patterns." },
  { name: "IBM Carbon", url: "https://carbondesignsystem.com", note: "Rigorous, enterprise-grade tokens and grid." },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/docs/customizing-colors", note: "The default palette that quietly shaped a generation of UIs." },
];
// ──────────────────────────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mt-12 first:mt-8">
      <h2 className="section-heading font-serif text-xl text-[var(--color-contrast-high)]">
        {title}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-contrast-medium)]">{subtitle}</p>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <section>
      <h1 className="font-serif text-4xl font-normal text-[var(--color-accent)]">
        Design Gallery
      </h1>
      <p className="mt-3 text-base text-[var(--color-contrast-medium)]">
        My personal design wardrobe — websites I admire for their typography and
        color, the fonts I reach for, color combinations I keep around, and the
        design systems worth studying.
      </p>

      {/* Featured: this portfolio's own design system */}
      <SectionHeading
        title="Featured — This Portfolio"
        subtitle="Built on the Nucleo design system. Here's the recipe behind what you're looking at."
      />
      <div className="mt-4 card p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-contrast-low)]">
              Typefaces
            </p>
            <p className="mt-2 font-serif text-2xl" style={{ fontFamily: "var(--font-seasonmix)" }}>
              SeasonMix
            </p>
            <p className="text-sm text-[var(--color-contrast-medium)]">Serif — headings</p>
            <p className="mt-3 text-2xl" style={{ fontFamily: "var(--font-matter)" }}>
              Matter
            </p>
            <p className="text-sm text-[var(--color-contrast-medium)]">Geometric sans — body &amp; UI</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-contrast-low)]">
              Accent
            </p>
            <p className="mt-2 text-sm text-[var(--color-contrast-medium)]">
              A single confident accent over a neutral greyscale.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span
                className="size-10 shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-border)]"
                style={{ background: "#896CFE" }}
              />
              <div className="leading-tight">
                <p className="text-sm font-medium text-[var(--color-contrast-high)]">
                  Nucleo Purple
                </p>
                <code className="text-xs text-[var(--color-contrast-low)]">#896CFE</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inspiration websites */}
      <SectionHeading
        title="Inspiration"
        subtitle="Sites with great fonts and color schemes — cited so I can revisit them."
      />
      <div className="mt-4 space-y-2">
        {inspirations.map((site) => (
          <a
            key={site.name}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg p-4 transition-all duration-200 hover:bg-[var(--color-accent-subtle)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[var(--color-contrast-high)]">{site.name}</h3>
              <IconArrowUpRight
                size={18}
                className="text-[var(--color-accent)] opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                aria-hidden="true"
              />
            </div>
            <p className="mt-1 text-sm text-[var(--color-contrast-medium)]">{site.note}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {site.tags.map((t) => (
                <span key={t} className="tag text-[0.7rem]">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Fonts */}
      <SectionHeading
        title="Go-to Fonts"
        subtitle="The typefaces I reach for first, and what each one is good at."
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {fonts.map((font) => (
          <a
            key={font.name}
            href={font.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card group p-4"
          >
            <p
              className="text-2xl text-[var(--color-contrast-high)]"
              style={font.fontFamily ? { fontFamily: font.fontFamily } : undefined}
            >
              {font.sample}
            </p>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <h3
                className="text-lg font-semibold text-[var(--color-contrast-high)]"
                style={font.fontFamily ? { fontFamily: font.fontFamily } : undefined}
              >
                {font.name}
              </h3>
              <span className="shrink-0 text-[0.7rem] text-[var(--color-contrast-low)]">
                {font.classification}
              </span>
            </div>
            <p className="mt-1 text-sm text-[var(--color-contrast-medium)]">{font.use}</p>
          </a>
        ))}
      </div>

      {/* Color combinations */}
      <SectionHeading
        title="Color Combinations"
        subtitle="Palettes I keep around for different moods — click any hex to copy it, or copy the whole set."
      />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {palettes.map((palette) => (
          <div key={palette.name} className="card p-4">
            <div className="swatch-row">
              {palette.colors.map((hex) => (
                <span key={hex} style={{ background: hex }} title={hex} />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-[var(--color-contrast-high)]">{palette.name}</h3>
              <CopyButton text={palette.colors.join(", ")} label="Copy" />
            </div>
            <p className="mt-1 text-sm text-[var(--color-contrast-medium)]">{palette.note}</p>
            <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1">
              {palette.colors.map((hex) => (
                <CopyButton key={hex} text={hex} variant="hex" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Design systems */}
      <SectionHeading
        title="Design Systems & Tokens"
        subtitle="References worth studying when building a system of your own."
      />
      <div className="mt-4 space-y-2">
        {designSystems.map((ds) => (
          <a
            key={ds.name}
            href={ds.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-[var(--color-accent-subtle)]"
          >
            <div>
              <h3 className="font-semibold text-[var(--color-contrast-high)]">{ds.name}</h3>
              <p className="mt-0.5 text-sm text-[var(--color-contrast-medium)]">{ds.note}</p>
            </div>
            <IconArrowUpRight
              size={18}
              className="shrink-0 text-[var(--color-accent)] opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

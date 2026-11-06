"use client";

import { Fragment, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import {
  ME, LINKS, INTERESTS, PUBS, PUB_TYPES, PROJECTS, WRITINGS, LAST_UPDATED, type Pub, type PubType,
} from "./data";
import "./academic.css";

function Authors({ names }: { names: string[] }) {
  return (
    <p className="acad-authors">
      {names.map((n, i) => {
        const dagger = n.endsWith("†");
        const name = dagger ? n.slice(0, -1) : n;
        const label = <>{name}{dagger && <sup>†</sup>}</>;
        return (
          <Fragment key={n}>
            {name === ME ? <strong>{label}</strong> : label}
            {i < names.length - 1 ? ", " : ""}
          </Fragment>
        );
      })}
    </p>
  );
}

function Publication({ pub, tag }: { pub: Pub; tag: string }) {
  const [open, setOpen] = useState<"tldr" | "bibtex" | null>(null);
  const [copied, setCopied] = useState(false);
  const toggle = (k: "tldr" | "bibtex") => setOpen(open === k ? null : k);
  const items: React.ReactNode[] = [];
  if (pub.tldr) items.push(<button key="tldr" type="button" className="acad-linkbtn" aria-expanded={open === "tldr"} onClick={() => toggle("tldr")}>TLDR</button>);
  for (const l of pub.links ?? []) items.push(<a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>);
  if (pub.bibtex) items.push(<button key="bib" type="button" className="acad-linkbtn" aria-expanded={open === "bibtex"} onClick={() => toggle("bibtex")}>BibTeX</button>);

  return (
    <article className="acad-pub acad-pub-tagged">
      <span className="acad-tag" title={PUB_TYPES.find((t) => t.type === pub.type)?.label}>
        <span className="sr-only">{PUB_TYPES.find((t) => t.type === pub.type)?.label} </span>[{tag}]
      </span>
      <div className="acad-pub-body">
      <h3 className="acad-pub-title">{pub.title}</h3>
      <Authors names={pub.authors} />
      <p className="acad-venue">{pub.venue}</p>
      {pub.note && <p className="acad-note">{pub.note}</p>}
      {items.length > 0 && (
        <p className="acad-actions">
          {items.map((it, i) => <Fragment key={i}>{i > 0 && <span className="acad-sep" aria-hidden="true">|</span>}{it}</Fragment>)}
        </p>
      )}
      {open === "tldr" && <p className="acad-tldr">{pub.tldr}</p>}
      {open === "bibtex" && (
        <div className="acad-bib">
          <button type="button" className="acad-linkbtn acad-copy" onClick={() => {
            navigator.clipboard?.writeText(pub.bibtex!).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
          }}>{copied ? "Copied" : "Copy"}</button>
          <pre>{pub.bibtex}</pre>
        </div>
      )}
      </div>
    </article>
  );
}

/** Number entries per type in list order, matching the CV (C1, J1, J2, ..., D1, P1). */
function useTags() {
  return useMemo(() => {
    const counts: Partial<Record<PubType, number>> = {};
    const tags = new Map<Pub, string>();
    for (const g of PUBS) for (const p of g.items) {
      counts[p.type] = (counts[p.type] ?? 0) + 1;
      tags.set(p, `${PUB_TYPES.find((t) => t.type === p.type)!.letter}${counts[p.type]}`);
    }
    return { tags };
  }, []);
}

function Publications() {
  const { tags } = useTags();
  const hasDagger = PUBS.some((g) => g.items.some((p) => p.authors.some((a) => a.endsWith("†"))));

  return (
    <section className="acad-section">
      <div className="acad-section-head">
        <h2>Publications</h2>
        <p className="acad-legend">
          {PUB_TYPES.map((t, i) => <Fragment key={t.type}>{i > 0 && " · "}{t.letter} = {t.plural}</Fragment>)}
        </p>
      </div>
      {PUBS.map((g) => (
        <div key={g.year} className="acad-year">
          <p className="acad-year-label">{g.year}</p>
          {g.items.map((p) => <Publication key={p.title} pub={p} tag={tags.get(p)!} />)}
        </div>
      ))}
      {hasDagger && <p className="acad-footnote"><sup>†</sup> Equal contribution.</p>}
      <p className="acad-more"><a href={LINKS[1].href} target="_blank" rel="noopener noreferrer">Full list on Google Scholar</a></p>
    </section>
  );
}

/** Academic homepage. Content lives in ./data.ts. */
export default function Academic() {
  return (
    <div className="acad">
      <main className="acad-main">
        <header className="acad-header">
          <img className="acad-photo" src="/photos/ridham-profile.jpg" alt="Ridham Patel" width={112} height={112} />
          <div className="acad-id">
            <h1 className="acad-name">Ridham Patel</h1>
            <p className="acad-tagline">ML Researcher</p>
            <nav className="acad-links" aria-label="Profiles">
              {LINKS.map((l) => (
                <a key={l.label} href={l.href} {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>{l.label}</a>
              ))}
            </nav>
          </div>
          <ThemeToggle />
        </header>

        <section className="acad-bio">
          <p>I am an M.E. Information Technology student at L.D. College of Engineering, Ahmedabad, India. My research is in machine learning, with work on federated learning and unlearning, robust computer vision, and the security of ML systems.</p>
          <p>Previously, I was an Associate Software Engineer at OpenXcell Technolabs, where I red-teamed and built guardrails for LLM applications and built retrieval-augmented generation pipelines.</p>
        </section>

        <section className="acad-section">
          <h2>Research Interests</h2>
          <ul className="acad-interests">
            {INTERESTS.map((r) => <li key={r.topic}><strong>{r.topic}</strong>: {r.detail}</li>)}
          </ul>
        </section>

        <Publications />

        <section className="acad-section">
          <h2>Projects</h2>
          {PROJECTS.map((p) => (
            <article key={p.name} className="acad-pub">
              <h3 className="acad-pub-title"><a href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a></h3>
              <p className="acad-note">{p.context}</p>
              <p className="acad-authors">{p.detail}</p>
            </article>
          ))}
          <p className="acad-other">
            See more of my projects on{" "}
            <a href="https://github.com/ridh21?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>
        </section>

        <section className="acad-section">
          <h2>Writing</h2>
          <div className="acad-writing">
            {WRITINGS.map((w) => (
              <article key={w.slug} className="acad-post">
                <h3 className="acad-post-title"><a href={`/writing/${w.slug}`}>{w.title}</a></h3>
                <p className="acad-post-meta">{w.topic} · {w.date} · {w.readTime}</p>
                <p className="acad-post-summary">{w.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="acad-footer">Last updated: {LAST_UPDATED}</footer>
      </main>
    </div>
  );
}

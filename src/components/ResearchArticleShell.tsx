import type { ReactNode } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/academic/ThemeToggle";
import { WRITINGS } from "@/components/academic/data";
import "@/components/academic/academic.css";
import "./article.css";

export type ArticleSection = {
  id: string;
  label: string;
  title: string;
  content: ReactNode;
};

export type ArticleReference = {
  text: string;
  href: string;
};

export function ArticleProse({ children }: { children: ReactNode }) {
  return <div className="article-prose">{children}</div>;
}

export function ArticleTips({ children }: { children: ReactNode }) {
  return <ol className="article-tips">{children}</ol>;
}

/** Article page in the academic style. Title, date and reading time come from WRITINGS in academic/data.ts. */
export default function ResearchArticleShell({
  slug,
  introduction,
  sections,
  references,
}: {
  slug: string;
  introduction: ReactNode;
  sections: ArticleSection[];
  references: ArticleReference[];
}) {
  const post = WRITINGS.find((w) => w.slug === slug);
  if (!post) throw new Error(`No WRITINGS entry for slug "${slug}"`);

  const contents = (
    <ol className="art-toc-list">
      {sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>)}
      {references.length > 0 && <li><a href="#references">References</a></li>}
    </ol>
  );

  return (
    <div className="acad">
      <div className="art-layout">
        <aside className="art-toc art-toc-side" aria-label="Contents">
          <p className="art-toc-title">Contents</p>
          {contents}
        </aside>

        <main className="acad-main art-main">
          <div className="art-topbar">
            <Link href="/" className="art-back">← Ridham Patel</Link>
            <ThemeToggle />
          </div>

          <header className="art-header">
            <p className="art-kicker">Writing</p>
            <h1 className="art-title">{post.title}</h1>
            <p className="art-meta">{post.date} · {post.readTime}</p>
          </header>

          <nav className="art-toc art-toc-inline" aria-label="Contents">
            <p className="art-toc-title">Contents</p>
            {contents}
          </nav>

          <article className="art-body">
            <ArticleProse>{introduction}</ArticleProse>
            {sections.map((section) => (
              <section id={section.id} className="art-section" aria-labelledby={`${section.id}-title`} key={section.id}>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.content}
              </section>
            ))}
          </article>

          {references.length > 0 && (
            <section id="references" className="art-section art-refs" aria-labelledby="references-title">
              <h2 id="references-title">References</h2>
              <ol>
                {references.map((r) => (
                  <li key={r.href}>
                    {r.text}{" "}
                    <a href={r.href} target="_blank" rel="noopener noreferrer">Paper</a>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <footer className="acad-footer art-footer">
            <Link href="/">← Back to home</Link>
            <span>Ridham Patel</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

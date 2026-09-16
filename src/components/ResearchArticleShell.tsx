import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

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

function LinkLabel({ children }: { children: ReactNode }) {
  return <span className="scramble-text link-label"><span className="scramble-original">{children}</span></span>;
}

export default function ResearchArticleShell({
  number,
  title,
  meta,
  introduction,
  sections,
  references,
}: {
  number: string;
  title: string;
  meta: string;
  introduction: ReactNode;
  sections: ArticleSection[];
  references: ArticleReference[];
}) {
  return <main className="site">
    <section className="intro-section article-page" aria-label="Article">
      <div className="content">
        <nav className="article-index appear" aria-label="Contents" style={{ "--appear-delay": "0ms" } as CSSProperties}>
          <h2 className="article-index-title">
            <Link className="article-index-back" aria-label="Back to home" href="/">
              <svg viewBox="-1 -1 12.5 12.224" width="10" height="10" fill="none" aria-hidden="true" overflow="visible">
                <path d="M 3.592 0 L 6.77 0 C 8.83 0 10.5 1.67 10.5 3.73 C 10.5 5.79 8.83 7.461 6.77 7.461 L 0 7.461" stroke="currentColor" strokeWidth="0.88" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 2.763 10.224 L 0 7.461 L 2.763 4.697" stroke="currentColor" strokeWidth="0.88" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {number}
          </h2>
          <ol className="article-index-list">
            {sections.map(section => <li key={section.id}><a href={`#${section.id}`}><LinkLabel>{section.label}</LinkLabel></a></li>)}
          </ol>
        </nav>

        <header className="article-header appear" style={{ "--appear-delay": "0ms" } as CSSProperties}>
          <h1 className="article-title">{title}</h1>
          <p className="article-meta">{meta}</p>
        </header>

        <div className="link-divider" aria-hidden="true" />
        <article className="article-body appear" style={{ "--appear-delay": "80ms" } as CSSProperties}>
          <ArticleProse>{introduction}</ArticleProse>
          {sections.map(section => (
            <section id={section.id} className="article-section" aria-labelledby={`${section.id}-title`} key={section.id}>
              <h2 id={`${section.id}-title`} className="article-subhead">{section.title}</h2>
              {section.content}
            </section>
          ))}
        </article>

        <section className="article-footnotes appear" aria-label="References" style={{ "--appear-delay": "160ms" } as CSSProperties}>
          <ol>{references.map((reference, index) => (
            <li key={reference.href}>
              <span className="article-fn-num">{index + 1}</span>
              <span className="article-fn-text">{reference.text}{" "}<a href={reference.href} target="_blank" rel="noopener noreferrer"><LinkLabel>Read the paper</LinkLabel></a></span>
            </li>
          ))}</ol>
        </section>
      </div>
    </section>
    <footer className="footer"><div className="footer-row"><span className="footer-meta"><span className="footer-locale">GMT+5:30</span><span className="footer-time"> </span></span></div></footer>
  </main>;
}

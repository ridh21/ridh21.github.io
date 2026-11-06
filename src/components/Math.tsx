import katex from "katex";
import "katex/dist/katex.min.css";

// LaTeX rendered at build time (server component), so pages ship finished HTML with no math JS.

function render(tex: string, displayMode: boolean) {
  return katex.renderToString(tex, { displayMode, throwOnError: true, output: "htmlAndMathml" });
}

/** Inline math: <M tex="x_t" /> */
export function M({ tex }: { tex: string }) {
  return <span className="math-inline" dangerouslySetInnerHTML={{ __html: render(tex, false) }} />;
}

/** Display math, centred on its own line, with an optional label for screen readers. */
export function MathBlock({ tex, label }: { tex: string; label?: string }) {
  return <div className="math-block" role="math" aria-label={label} dangerouslySetInnerHTML={{ __html: render(tex, true) }} />;
}

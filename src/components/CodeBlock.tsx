/* A small bash highlighter: enough of a lexer for install commands, no dependencies.
   Output is plain spans, so the existing `.code-copy` handler still copies the raw command. */
import { Fragment, type ReactNode } from "react";

type TokenKind =
  | "plain"
  | "command"
  | "subcommand"
  | "flag"
  | "string"
  | "url"
  | "substitution"
  | "variable"
  | "operator"
  | "comment";

type Token = { text: string; kind: TokenKind };

const URL = /^[a-z][a-z0-9+.-]*:\/\/[^\s"'`)]+/i;
const VARIABLE = /^\$[A-Za-z_][A-Za-z0-9_]*/;
const WORD_STOP = /[\s"'`()&|;<>]/;

function findClosingParen(source: string, openIndex: number) {
  let depth = 0;
  for (let i = openIndex; i < source.length; i++) {
    if (source[i] === "(") depth++;
    else if (source[i] === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return source.length;
}

function findClosingQuote(source: string, openIndex: number) {
  const quote = source[openIndex];
  for (let i = openIndex + 1; i < source.length; i++) {
    if (source[i] === "\\") i++;
    else if (source[i] === quote) return i;
  }
  return source.length;
}

/* Inside double quotes only `$(…)`, `$VAR` and URLs are live; everything else is literal. */
function tokenizeDoubleQuoted(inner: string): Token[] {
  const tokens: Token[] = [];
  const push = (text: string, kind: TokenKind) => { if (text) tokens.push({ text, kind }); };
  let i = 0;
  while (i < inner.length) {
    if (inner.startsWith("$(", i)) {
      const end = findClosingParen(inner, i + 1);
      push("$(", "substitution");
      tokens.push(...tokenizeShell(inner.slice(i + 2, end)));
      push(")", "substitution");
      i = end + 1;
      continue;
    }
    const rest = inner.slice(i);
    const url = rest.match(URL);
    if (url) { push(url[0], "url"); i += url[0].length; continue; }
    const variable = rest.match(VARIABLE);
    if (variable) { push(variable[0], "variable"); i += variable[0].length; continue; }
    let j = i + 1;
    while (j < inner.length && inner[j] !== "$" && !inner.startsWith("$(", j) && !inner.slice(j).match(URL)) j++;
    push(inner.slice(i, j), "string");
    i = j;
  }
  return tokens;
}

export function tokenizeShell(source: string): Token[] {
  const tokens: Token[] = [];
  const push = (text: string, kind: TokenKind) => { if (text) tokens.push({ text, kind }); };
  let expectCommand = true;
  let expectSubcommand = false;
  let i = 0;

  while (i < source.length) {
    const char = source[i];

    if (char === "\n") { push(char, "plain"); expectCommand = true; expectSubcommand = false; i++; continue; }

    if (char === " " || char === "\t") {
      let j = i;
      while (j < source.length && (source[j] === " " || source[j] === "\t")) j++;
      push(source.slice(i, j), "plain");
      i = j;
      continue;
    }

    if (char === "#") { push(source.slice(i), "comment"); break; }

    if (char === '"' || char === "'") {
      const close = findClosingQuote(source, i);
      push(source.slice(i, i + 1), "string");
      const inner = source.slice(i + 1, close);
      if (char === '"') tokens.push(...tokenizeDoubleQuoted(inner));
      else push(inner, "string");
      push(source.slice(close, close + 1), "string");
      i = close + 1;
      expectCommand = false;
      expectSubcommand = false;
      continue;
    }

    if (source.startsWith("$(", i)) {
      const end = findClosingParen(source, i + 1);
      push("$(", "substitution");
      tokens.push(...tokenizeShell(source.slice(i + 2, end)));
      push(")", "substitution");
      i = end + 1;
      expectCommand = false;
      expectSubcommand = false;
      continue;
    }

    const url = source.slice(i).match(URL);
    if (url) { push(url[0], "url"); i += url[0].length; expectCommand = false; continue; }

    const variable = source.slice(i).match(VARIABLE);
    if (variable) { push(variable[0], "variable"); i += variable[0].length; expectCommand = false; continue; }

    if ("&|;<>".includes(char)) {
      let j = i;
      while (j < source.length && "&|;<>".includes(source[j])) j++;
      push(source.slice(i, j), "operator");
      i = j;
      expectCommand = true;
      expectSubcommand = false;
      continue;
    }

    let j = i;
    while (j < source.length && !WORD_STOP.test(source[j])) j++;
    if (j === i) { push(char, "plain"); i++; continue; }

    const word = source.slice(i, j);
    if (word.startsWith("-")) push(word, "flag");
    else if (expectCommand) {
      push(word, "command");
      expectSubcommand = word === "brew" || word === "sudo";
      expectCommand = false;
    } else if (expectSubcommand) {
      push(word, "subcommand");
      expectSubcommand = false;
    } else push(word, "plain");
    i = j;
  }

  return tokens;
}

function renderTokens(tokens: Token[]): ReactNode {
  return tokens.map((token, index) => {
    if (token.kind === "plain") return token.text;
    /* Long URLs get break opportunities after each slash, so a wrapped command never splits a filename. */
    if (token.kind === "url") {
      const parts = token.text.split("/");
      return <span key={index} className={"tok-url"}>{parts.map((part, partIndex) => <Fragment key={partIndex}>{part}{partIndex < parts.length - 1 && <Fragment>{"/"}<wbr /></Fragment>}</Fragment>)}</span>;
    }
    return <span key={index} className={`tok-${token.kind}`}>{token.text}</span>;
  });
}

export default function CodeBlock({
  code,
  label,
  lang = "bash",
  copyLabel,
}: {
  code: string;
  label?: string;
  lang?: string;
  copyLabel?: string;
}) {
  return <div className={"code-block app-cmd"} data-lang={lang} data-copy={code}>
    <div className={"code-head"}>{label && <span className={"code-lang"}>{label}</span>}
      <button type={"button"} className={"code-copy"} aria-label={copyLabel ? `Copy ${copyLabel}` : "Copy command"} title={"Copy command"}><svg viewBox={"0 0 24 24"} width={"13"} height={"13"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}><rect x={"9"} y={"9"} width={"12"} height={"12"} rx={"2"}></rect>
        <path d={"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"}></path>
      </svg>
      </button>
    </div>
    <pre><code>{code.split("\n").map((line, index) => <span key={index} className={"code-line"}><span className={"code-line-text"}>{lang === "bash" ? renderTokens(tokenizeShell(line)) : line}</span>
    </span>)}</code></pre>
  </div>;
}

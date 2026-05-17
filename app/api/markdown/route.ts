import { NextRequest, NextResponse } from "next/server";
import TurndownService from "turndown";

export const runtime = "nodejs";

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

turndownService.addRule("scriptStyle", {
  filter: ["script", "style", "link", "meta", "noscript"],
  replacement: () => "",
});

turndownService.addRule("navSkip", {
  filter: (node) =>
    node.classList?.contains("skip-to-content") ||
    node.id === "main-content",
  replacement: (content) => content,
});

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "Missing path parameter" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ridhfolio.vercel.app";
  const url = `${baseUrl}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MarkdownConverter/1.0",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch page: ${response.status}` },
        { status: response.status }
      );
    }

    const html = await response.text();

    const { parse } = await import("node-html-parser");
    const root = parse(html);
    const mainContent = root.querySelector("#main-content") || root.querySelector("main") || root.querySelector("body");
    const contentHtml = mainContent ? mainContent.toString() : html;

    const markdown = turndownService.turndown(contentHtml);

    const headers = new Headers();
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("x-markdown-tokens", markdown.length.toString());
    headers.set("Cache-Control", "public, s-maxage=60");

    return new NextResponse(markdown, { headers });
  } catch (error) {
    console.error("Markdown conversion error:", error);
    return NextResponse.json(
      { error: "Failed to convert to markdown" },
      { status: 500 }
    );
  }
}

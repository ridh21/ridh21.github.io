"use client";

import { useEffect } from "react";

export function WebMCPProvider() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !(navigator as any).modelContext) {
      return;
    }

    const mcp = (navigator as any).modelContext;

    mcp.provideContext({
      name: "portfolio-search",
      description: "Search and browse Ridham Patel's portfolio projects, experience, and research",
      inputSchema: {
        type: "object",
        properties: {
          action: {
            type: "string",
            enum: ["search_projects", "get_experience", "get_research", "get_blog"],
            description: "The action to perform",
          },
          query: {
            type: "string",
            description: "Search query or filter",
          },
        },
        required: ["action"],
      },
      async execute(params: { action: string; query?: string }) {
        const baseUrl = window.location.origin;
        const res = await fetch(`${baseUrl}/api/completion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: `Perform action: ${params.action}${params.query ? ` with query: ${params.query}` : ""}` }],
          }),
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response body");
        let result = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += new TextDecoder().decode(value);
        }
        return { content: result };
      },
    });

    mcp.provideContext({
      name: "navigate-portfolio",
      description: "Navigate to specific sections of the portfolio",
      inputSchema: {
        type: "object",
        properties: {
          section: {
            type: "string",
            enum: ["projects", "blog", "research", "experience", "photos", "cv"],
            description: "The portfolio section to navigate to",
          },
        },
        required: ["section"],
      },
      async execute(params: { section: string }) {
        window.location.href = `/${params.section}`;
        return { content: `Navigated to /${params.section}` };
      },
    });
  }, []);

  return null;
}

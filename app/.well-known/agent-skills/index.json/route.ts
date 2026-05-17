import { NextResponse } from "next/server";
import { createHash } from "crypto";

export const revalidate = 3600;

function sha256(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

export async function GET() {
  const baseUrl = "https://ridhfolio.vercel.app";

  const skills = [
    {
      name: "portfolio-browsing",
      type: "tool",
      description: "Browse and search the portfolio projects, experience, and research",
      url: `${baseUrl}/.well-known/mcp/server-card.json`,
      sha256: sha256("portfolio-browsing-v1"),
    },
    {
      name: "ai-chat",
      type: "resource",
      description: "Interact with Ridham's AI assistant for questions about the portfolio",
      url: `${baseUrl}/ai`,
      sha256: sha256("ai-chat-v1"),
    },
    {
      name: "api-catalog",
      type: "resource",
      description: "Discover available APIs and endpoints",
      url: `${baseUrl}/.well-known/api-catalog`,
      sha256: sha256("api-catalog-v1"),
    },
  ];

  const index = {
    $schema: "https://agentskills.io/schema/agent-skills-index.json",
    skills,
  };

  return NextResponse.json(index, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

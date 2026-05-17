import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = "https://ridhfolio.vercel.app";

  const serverCard = {
    $schema: "https://modelcontextprotocol.io/schema/server-card.json",
    serverInfo: {
      name: "Ridham Patel Portfolio",
      version: "1.0.0",
    },
    transport: {
      type: "http",
      endpoint: `${baseUrl}/api/completion`,
    },
    capabilities: {
      tools: [
        {
          name: "search_projects",
          description: "Search through Ridham's projects and portfolio items",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query for projects",
              },
              category: {
                type: "string",
                description: "Filter by project category",
              },
            },
            required: ["query"],
          },
        },
        {
          name: "get_experience",
          description: "Retrieve work experience details",
          inputSchema: {
            type: "object",
            properties: {
              role: {
                type: "string",
                description: "Specific role to look up",
              },
            },
          },
        },
        {
          name: "get_research",
          description: "Retrieve research publications",
          inputSchema: {
            type: "object",
            properties: {
              topic: {
                type: "string",
                description: "Research topic or keyword",
              },
            },
          },
        },
      ],
      resources: [
        {
          uri: `${baseUrl}/projects`,
          name: "Projects",
          description: "List of all projects",
          mimeType: "text/html",
        },
        {
          uri: `${baseUrl}/blog`,
          name: "Blog",
          description: "Technical blog posts",
          mimeType: "text/html",
        },
      ],
    },
  };

  return NextResponse.json(serverCard, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

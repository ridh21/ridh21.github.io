import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = "https://ridhfolio.vercel.app";

  const linkset = {
    linkset: [
      {
        anchor: baseUrl,
        links: {
          "service-doc": [
            {
              href: `${baseUrl}/blog`,
              title: "Blog Documentation",
              type: "text/html",
            },
          ],
          "api-catalog": [
            {
              href: `${baseUrl}/.well-known/api-catalog`,
              title: "API Catalog",
              type: "application/linkset+json",
            },
          ],
          "mcp": [
            {
              href: `${baseUrl}/.well-known/mcp/server-card.json`,
              title: "MCP Server Card",
              type: "application/json",
            },
          ],
          "sitemap": [
            {
              href: `${baseUrl}/sitemap.xml`,
              title: "Sitemap",
              type: "application/xml",
            },
          ],
          "ai-chat": [
            {
              href: `${baseUrl}/api/completion`,
              title: "AI Chat Endpoint",
              type: "application/json",
            },
          ],
        },
      },
    ],
  };

  return NextResponse.json(linkset, {
    headers: {
      "Content-Type": "application/linkset+json",
    },
  });
}

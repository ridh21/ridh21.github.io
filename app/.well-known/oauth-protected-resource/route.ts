import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = "https://ridhfolio.vercel.app";

  const config = {
    resource: baseUrl,
    authorization_servers: [baseUrl],
    scopes_supported: ["read", "write", "admin"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${baseUrl}/blog`,
  };

  return NextResponse.json(config, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

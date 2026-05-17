import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import TurndownService from "turndown";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "admin-secret-change-in-production-2024"
);

const COOKIE_NAME = "admin_token";

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

function htmlToMarkdown(html: string): string {
  return turndownService.turndown(html);
}

function buildLinkHeaders(baseUrl: string): string {
  return [
    `<${baseUrl}/.well-known/api-catalog>; rel="api-catalog"`,
    `<${baseUrl}/.well-known/mcp/server-card.json>; rel="mcp"`,
    `<${baseUrl}/.well-known/agent-skills/index.json>; rel="service-doc"`,
    `<${baseUrl}/sitemap.xml>; rel="sitemap"`,
  ].join(", ");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const acceptHeader = request.headers.get("accept") || "";
  const wantsMarkdown = acceptHeader.includes("text/markdown");

  const response = NextResponse.next();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ridhfolio.vercel.app";

  if (wantsMarkdown && !pathname.startsWith("/api/") && !pathname.startsWith("/_next/") && !pathname.startsWith("/.")) {
    const modifiedResponse = await fetch(request.url, {
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        accept: "text/html",
      },
    });

    const html = await modifiedResponse.text();
    const markdown = htmlToMarkdown(html);

    const headers = new Headers(modifiedResponse.headers);
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("x-markdown-tokens", markdown.length.toString());
    headers.delete("Content-Length");

    return new NextResponse(markdown, {
      status: modifiedResponse.status,
      statusText: modifiedResponse.statusText,
      headers,
    });
  }

  if (!pathname.startsWith("/api/") && !pathname.startsWith("/_next/") && !pathname.startsWith("/.")) {
    response.headers.set("Link", buildLinkHeaders(baseUrl));
  }

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin";
  const isAdminApi =
    pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth");

  if (!isAdminPage && !isAdminApi) {
    return response;
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return response;
  } catch {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

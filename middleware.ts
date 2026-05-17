import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "admin-secret-change-in-production-2024"
);

const COOKIE_NAME = "admin_token";

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ridhfolio.vercel.app";

  if (wantsMarkdown && !pathname.startsWith("/api/") && !pathname.startsWith("/_next/") && !pathname.startsWith("/.")) {
    const markdownUrl = new URL("/api/markdown", request.url);
    markdownUrl.searchParams.set("path", pathname);
    return NextResponse.redirect(markdownUrl);
  }

  const response = NextResponse.next();

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

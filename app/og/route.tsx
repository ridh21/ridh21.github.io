import { ImageResponse } from "next/og";
import { metaData } from "app/config";

// ── Design-system tokens (mirrored from global.css; Satori needs literals) ──
const COLOR = {
  bg: "#FAFAFA",
  surface: "#EFF0F0",
  high: "#1C1F21",
  medium: "#505355",
  low: "#8C9497",
  accent: "#896CFE",
  accentHover: "#7553FD",
  border: "rgba(28,31,33,0.10)",
  white: "#FFFFFF",
};

/**
 * Load a Google font as a TTF buffer (Satori can't parse woff2, so the brand
 * woff2 files can't be used directly). The MSIE user-agent makes the css2 API
 * return truetype instead of woff2. Returns null on any failure so the OG
 * route never errors — ImageResponse just falls back to its default font.
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  text?: string
): Promise<ArrayBuffer | null> {
  try {
    const params = new URLSearchParams({ family: `${family}:wght@${weight}` });
    if (text) params.set("text", text);
    const cssUrl = `https://fonts.googleapis.com/css2?${params.toString()}`;
    const css = await fetch(cssUrl, {
      headers: { "User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)" },
    }).then((res) => res.text());
    const match = css.match(/src: url\(([^)]+)\) format\('(?:truetype|opentype)'\)/);
    if (!match) return null;
    return await fetch(match[1]).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawTitle = url.searchParams.get("title");
  const hasTitle = Boolean(rawTitle);

  const heading = rawTitle || "Ridham Patel";
  const eyebrow = hasTitle ? "RIDHAM PATEL" : "PORTFOLIO";
  const subtitle = hasTitle
    ? "ridhfolio.vercel.app"
    : "Software Developer · Researcher · AI/ML Engineer";

  // Trim the glyph set we fetch for the heading to keep the request light.
  const [serif, sans, sansSemibold] = await Promise.all([
    loadGoogleFont("Fraunces", 600, heading),
    loadGoogleFont("Inter", 400),
    loadGoogleFont("Inter", 600),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" }[] = [];
  if (sans) fonts.push({ name: "Inter", data: sans, weight: 400, style: "normal" });
  if (sansSemibold) fonts.push({ name: "Inter", data: sansSemibold, weight: 600, style: "normal" });
  if (serif) fonts.push({ name: "Fraunces", data: serif, weight: 600, style: "normal" });

  const serifFamily = serif ? "Fraunces" : "Inter";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "630px",
          position: "relative",
          backgroundColor: COLOR.bg,
          fontFamily: "Inter",
          overflow: "hidden",
        }}
      >
        {/* Soft accent glow, top-left */}
        <div
          style={{
            position: "absolute",
            top: "-220px",
            left: "-160px",
            width: "560px",
            height: "560px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(137,108,254,0.18) 0%, rgba(137,108,254,0) 70%)",
            display: "flex",
          }}
        />

        {/* Right accent panel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "420px",
            height: "630px",
            background: `linear-gradient(155deg, ${COLOR.accent} 0%, ${COLOR.accentHover} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Concentric rings for depth */}
          {[460, 340, 220].map((size, i) => (
            <div
              key={size}
              style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "9999px",
                border: "2px solid rgba(255,255,255,0.18)",
                display: "flex",
                opacity: 1 - i * 0.18,
              }}
            />
          ))}
          {/* Monogram */}
          <div
            style={{
              display: "flex",
              fontFamily: serifFamily,
              fontSize: "260px",
              fontWeight: 600,
              color: COLOR.white,
              lineHeight: 1,
              marginTop: "-20px",
            }}
          >
            R
          </div>
        </div>

        {/* Left content column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "780px",
            height: "630px",
            padding: "72px",
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: COLOR.accent,
                marginRight: "14px",
                display: "flex",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                fontWeight: 600,
                letterSpacing: "4px",
                color: COLOR.medium,
              }}
            >
              {eyebrow}
            </div>
          </div>

          {/* Heading + subtitle */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: serifFamily,
                fontSize: hasTitle ? "64px" : "84px",
                fontWeight: 600,
                color: COLOR.high,
                lineHeight: 1.04,
                maxWidth: "640px",
              }}
            >
              {heading}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                fontWeight: 400,
                color: COLOR.medium,
                marginTop: "24px",
                maxWidth: "600px",
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Footer: availability chip + handle */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: COLOR.surface,
                border: `1px solid ${COLOR.border}`,
                borderRadius: "9999px",
                padding: "10px 18px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  backgroundColor: "#22C55E",
                  marginRight: "10px",
                  display: "flex",
                }}
              />
              <div style={{ display: "flex", fontSize: "18px", fontWeight: 600, color: COLOR.medium, letterSpacing: "1px" }}>
                AVAILABLE FOR AI/ML ENGINEER ROLES
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fonts.length > 0 ? (fonts as any) : undefined,
      headers: {
        "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    }
  );
}

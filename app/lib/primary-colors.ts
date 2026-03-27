export const PRIMARY_COLORS = [
  { key: "purple", label: "Purple (Default)", accent: "#896CFE", hover: "#7553FD" },
  { key: "oceanBlue", label: "Ocean Blue", accent: "#0E9AC2", hover: "#0A84A8" },
  { key: "tealGreen", label: "Teal Green", accent: "#14B8A6", hover: "#0F9F91" },
  { key: "sapphire", label: "Sapphire", accent: "#2563EB", hover: "#1D4ED8" },
  { key: "emerald", label: "Emerald", accent: "#10B981", hover: "#059669" },
  { key: "amberGold", label: "Amber Gold", accent: "#F59E0B", hover: "#D97706" },
  { key: "rosePink", label: "Rose Pink", accent: "#E11D48", hover: "#BE123C" },
  { key: "indigoNight", label: "Indigo Night", accent: "#4F46E5", hover: "#4338CA" },
  { key: "coralSunset", label: "Coral Sunset", accent: "#F97316", hover: "#EA580C" },
  { key: "slateGray", label: "Slate Gray", accent: "#64748B", hover: "#475569" },
  { key: "crimsonRed", label: "Crimson Red", accent: "#DC2626", hover: "#B91C1C" },
  { key: "forestGreen", label: "Forest Green", accent: "#16A34A", hover: "#15803D" },
  { key: "royalViolet", label: "Royal Violet", accent: "#7C3AED", hover: "#6D28D9" },
] as const;

export type PrimaryColorOption = (typeof PRIMARY_COLORS)[number];
export type PrimaryColorKey = PrimaryColorOption["key"];

export const DEFAULT_PRIMARY_COLOR_KEY: PrimaryColorKey = "purple";

const colorMap = new Map<string, PrimaryColorOption>(
  PRIMARY_COLORS.map((item) => [item.key, item])
);

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const safe =
    normalized.length === 3
      ? normalized
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : normalized;

  const parsed = Number.parseInt(safe, 16);
  if (!Number.isFinite(parsed)) return [137, 108, 254];

  return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255];
}

function rgbaFromHex(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function isPrimaryColorKey(value: unknown): value is PrimaryColorKey {
  return typeof value === "string" && colorMap.has(value);
}

export function getPrimaryColorTheme(value?: string | null): PrimaryColorOption {
  if (value && colorMap.has(value)) {
    return colorMap.get(value)!;
  }
  return colorMap.get(DEFAULT_PRIMARY_COLOR_KEY)!;
}

export function getPrimaryColorCssVariables(value?: string | null): Record<string, string> {
  const theme = getPrimaryColorTheme(value);

  return {
    "--color-accent": theme.accent,
    "--color-accent-hover": theme.hover,
    "--color-accent-light": rgbaFromHex(theme.accent, 0.1),
    "--color-accent-subtle": rgbaFromHex(theme.accent, 0.05),
    "--color-accent-shadow": rgbaFromHex(theme.accent, 0.35),
    "--color-accent-border": rgbaFromHex(theme.accent, 0.2),
    "--color-accent-link-underline": rgbaFromHex(theme.accent, 0.3),
    "--sh-jsxliterals": theme.accent,
  };
}

export function applyPrimaryColorVariables(element: HTMLElement, value?: string | null) {
  const vars = getPrimaryColorCssVariables(value);
  for (const [key, colorValue] of Object.entries(vars)) {
    element.style.setProperty(key, colorValue);
  }
}

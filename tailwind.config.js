/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.svg",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/global.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-matter)", "system-ui", "sans-serif"],
        serif: ["var(--font-seasonmix)", "serif"],
      },
      colors: {
        black: "var(--color-black)",
        white: "var(--color-white)",
        background: {
          DEFAULT: "var(--color-background)",
          light: "var(--color-background-light)",
          subtle: "var(--color-background-subtle)",
          elevated: "var(--color-background-elevated)",
        },
        "background-light": "var(--color-background-light)",
        "background-subtle": "var(--color-background-subtle)",
        "background-elevated": "var(--color-background-elevated)",
        foreground: "var(--color-foreground)",
        "contrast-high": "var(--color-contrast-high)",
        "contrast-medium": "var(--color-contrast-medium)",
        "contrast-low": "var(--color-contrast-low)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          light: "var(--color-accent-light)",
          subtle: "var(--color-accent-subtle)",
          fg: "var(--color-accent-fg)",
        },
        primary: {
          DEFAULT: "var(--color-accent)",
          dark: "var(--color-accent-hover)",
        },
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
      },
      borderRadius: {
        "2xs": "var(--radius-2xs)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

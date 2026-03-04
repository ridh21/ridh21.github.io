"use client";

import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { Logo } from "./logo";

const navItems = {
  "/proemio": {name: "Proemio"},
  "/blog": { name: "Blog" },
  "/projects": { name: "Projects" },
  "/ai": { name: "ध्रुव://ai" },
};

export function Navbar() {
  const openCommandPalette = () => {
    document.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <nav className="lg:mb-8 mb-6">
      <div className="flex flex-row items-center justify-between py-5 border-b border-[var(--color-border)]">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex flex-row gap-2 sm:gap-4 items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all text-[var(--color-contrast-low)] hover:text-[var(--color-contrast-high)] flex align-middle relative text-sm sm:text-base"
            >
              {name}
            </Link>
          ))}
          <button
            onClick={openCommandPalette}
            className="cmd-trigger"
            aria-label="Open command menu (⌘K)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="cmd-trigger-keys">
              <kbd>⌘</kbd><kbd>K</kbd>
            </span>
          </button>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
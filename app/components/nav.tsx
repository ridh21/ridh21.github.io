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
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { Logo } from "./logo";

const navItems = {
  "/proemio": {name: "Proemio"},
  "/blog": { name: "Blog" },
  "/projects": { name: "Projects" },
  "/ai": {name: "ध्रुव://ai"}
};

export function Navbar() {
  return (
    <nav className="lg:mb-8 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex flex-row gap-4 mt-6 md:mt-0 md:ml-auto items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
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
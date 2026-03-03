import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Home">
      <div className="relative w-8 h-8 rounded-lg flex items-center justify-center 
                   bg-[var(--color-accent)] shadow-sm
                   transition-all duration-300 ease-in-out 
                   md:hover:scale-110 md:hover:-rotate-12
                   dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
        <span className="text-[var(--color-accent-fg)] font-serif font-bold text-lg">
          R
        </span>
      </div>
    </Link>
  );
}

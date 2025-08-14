import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Home">
      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-green-600 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:-rotate-12" />
    </Link>
  );
}
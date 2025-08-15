import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Home">
      {/* This div is the container for our logo.
        - flex, items-center, justify-center: These center the initial "D".
        - bg-gradient-to-br...: Defines the gradient colors.
        - bg-[length:200%_200%]: Makes the gradient background larger than the div, so it can move.
        - animate-gradient-move: Applies our custom animation.
        - hover effects: The scale and rotate effects are preserved.
      */}
      <div className="relative w-8 h-8 rounded-full flex items-center justify-center 
                   bg-gradient-to-br from-teal-500 via-green-600 to-emerald-700
                   bg-[length:200%_200%] animate-gradient-move
                   transition-transform duration-300 ease-in-out 
                   md:hover:scale-110 md:hover:-rotate-12">
        <span className="text-white font-serif font-bold text-lg">
          D
        </span>
      </div>
    </Link>
  );
}

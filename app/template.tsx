"use client";

import { usePathname } from "next/navigation";

/**
 * Page transition wrapper.
 *
 * `template.tsx` re-mounts on every route change (unlike `layout.tsx`), so the
 * CSS enter animation defined in `.page-transition` runs fresh on each navigation.
 * Keyed by pathname so even same-segment param changes replay the animation.
 *
 * Motion: Framer-style "Appear Effect" matching tanvir.io — opacity + a small
 * rise + a blur lift, on a gentle spring, staggered down the page's content
 * blocks (see `.page-transition` in global.css).
 * Honors `prefers-reduced-motion` (see global.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}

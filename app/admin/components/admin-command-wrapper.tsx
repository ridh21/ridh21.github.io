"use client";

import { usePathname } from "next/navigation";
import { AdminCommandPalette } from "./admin-command-palette";

export function AdminCommandPaletteWrapper() {
  const pathname = usePathname();
  // Don't show on the login page
  if (pathname === "/admin") return null;
  return <AdminCommandPalette />;
}

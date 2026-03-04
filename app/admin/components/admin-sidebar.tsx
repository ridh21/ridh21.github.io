"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  ImageIcon,
  Briefcase,
  BookOpen,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/posts", label: "Blog Posts", icon: FileText },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/research", label: "Research", icon: BookOpen },
  { href: "/admin/photos", label: "Photos", icon: ImageIcon },
  { href: "/admin/config", label: "Site Config", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link href="/" className="admin-back-link">
          <ChevronLeft size={14} />
          <span>Back to site</span>
        </Link>
        <h2 className="admin-sidebar-title">Admin Portal</h2>
      </div>

      <nav className="admin-sidebar-nav">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-sidebar-link ${isActive ? "active" : ""}`}
            >
              <link.icon size={16} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <button onClick={handleLogout} className="admin-sidebar-link admin-logout-btn">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

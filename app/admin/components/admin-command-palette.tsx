"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  FileText,
  ImageIcon,
  Briefcase,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  Moon,
  Sun,
  Copy,
  Command,
} from "lucide-react";

interface AdminCommand {
  id: string;
  label: string;
  description?: string;
  section: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export function AdminCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const navigate = useCallback(
    (path: string) => {
      close();
      router.push(path);
    },
    [close, router]
  );

  const toggleTheme = useCallback(() => {
    close();
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme-preference", next);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
    document.documentElement.classList.remove("bg-light", "bg-dark");
    document.documentElement.classList.add(`bg-${next}`);
  }, [close]);

  const copyUrl = useCallback(() => {
    close();
    navigator.clipboard.writeText(window.location.href);
  }, [close]);

  const handleLogout = useCallback(async () => {
    close();
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  }, [close, router]);

  const commands: AdminCommand[] = useMemo(
    () => [
      // Navigation
      {
        id: "dashboard",
        label: "Dashboard",
        description: "Overview & stats",
        section: "Navigation",
        icon: <LayoutDashboard size={16} />,
        action: () => navigate("/admin/dashboard"),
        keywords: ["home", "stats", "overview"],
      },
      {
        id: "projects",
        label: "Projects",
        description: "Manage projects",
        section: "Navigation",
        icon: <FolderKanban size={16} />,
        action: () => navigate("/admin/projects"),
        keywords: ["portfolio", "work"],
      },
      {
        id: "posts",
        label: "Blog Posts",
        description: "Manage blog posts",
        section: "Navigation",
        icon: <FileText size={16} />,
        action: () => navigate("/admin/posts"),
        keywords: ["blog", "articles", "writing"],
      },
      {
        id: "experience",
        label: "Experience",
        description: "Manage work experience",
        section: "Navigation",
        icon: <Briefcase size={16} />,
        action: () => navigate("/admin/experience"),
        keywords: ["jobs", "work", "career"],
      },
      {
        id: "research",
        label: "Research",
        description: "Manage publications",
        section: "Navigation",
        icon: <BookOpen size={16} />,
        action: () => navigate("/admin/research"),
        keywords: ["papers", "publications", "academic"],
      },
      {
        id: "photos",
        label: "Photos",
        description: "Manage photo gallery",
        section: "Navigation",
        icon: <ImageIcon size={16} />,
        action: () => navigate("/admin/photos"),
        keywords: ["gallery", "images"],
      },
      {
        id: "config",
        label: "Site Config",
        description: "Update site settings",
        section: "Navigation",
        icon: <Settings size={16} />,
        action: () => navigate("/admin/config"),
        keywords: ["settings", "configuration"],
      },
      // Actions
      {
        id: "toggle-theme",
        label: "Toggle Theme",
        description: "Switch light / dark mode",
        section: "Actions",
        icon: <Moon size={16} />,
        action: toggleTheme,
        keywords: ["dark", "light", "mode", "appearance"],
      },
      {
        id: "copy-url",
        label: "Copy Current URL",
        section: "Actions",
        icon: <Copy size={16} />,
        action: copyUrl,
        keywords: ["link", "share", "clipboard"],
      },
      {
        id: "view-site",
        label: "View Public Site",
        description: "Open the live site",
        section: "Actions",
        icon: <ExternalLink size={16} />,
        action: () => {
          close();
          window.open("/", "_blank");
        },
        keywords: ["public", "live", "frontend"],
      },
      {
        id: "logout",
        label: "Logout",
        description: "Sign out of admin",
        section: "Actions",
        icon: <LogOut size={16} />,
        action: handleLogout,
        keywords: ["sign out", "exit"],
      },
    ],
    [navigate, toggleTheme, copyUrl, handleLogout, close]
  );

  // Filtered results
  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.description?.toLowerCase().includes(q) ||
        cmd.section.toLowerCase().includes(q) ||
        cmd.keywords?.some((k) => k.includes(q))
    );
  }, [query, commands]);

  // Grouped for rendering
  const grouped = useMemo(() => {
    const map = new Map<string, AdminCommand[]>();
    for (const item of filtered) {
      const arr = map.get(item.section) || [];
      arr.push(item);
      map.set(item.section, arr);
    }
    return map;
  }, [filtered]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        e.stopPropagation();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", handler, true);
    return () => document.removeEventListener("keydown", handler, true);
  }, [close]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Reset active index
  useEffect(() => {
    setActiveIndex(0);
  }, [filtered]);

  // Scroll active into view
  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[activeIndex]?.action();
      }
    },
    [filtered, activeIndex]
  );

  if (!open) return null;

  let flatIndex = -1;

  return (
    <>
      {/* Backdrop */}
      <div className="cmd-backdrop" onClick={close} aria-hidden="true" />

      {/* Palette */}
      <div className="cmd-palette" role="dialog" aria-modal="true" aria-label="Admin command menu">
        {/* Search input */}
        <div className="cmd-input-wrapper">
          <Search size={16} className="text-[var(--color-contrast-low)]" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Search admin commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <kbd className="cmd-kbd">ESC</kbd>
        </div>

        {/* Divider */}
        <div className="cmd-divider" />

        {/* Results */}
        <div className="cmd-list" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="cmd-empty">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            Array.from(grouped.entries()).map(([section, items]) => (
              <div key={section} className="cmd-group">
                <div className="cmd-group-label">{section}</div>
                {items.map((item) => {
                  flatIndex++;
                  const isActive = flatIndex === activeIndex;
                  const idx = flatIndex;
                  return (
                    <button
                      key={item.id}
                      data-active={isActive}
                      className={`cmd-item ${isActive ? "cmd-item-active" : ""}`}
                      onClick={item.action}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      <span className="cmd-item-icon">{item.icon}</span>
                      <span className="cmd-item-content">
                        <span className="cmd-item-label">{item.label}</span>
                        {item.description && (
                          <span className="cmd-item-desc">{item.description}</span>
                        )}
                      </span>
                      {isActive && (
                        <span className="cmd-item-enter">
                          <kbd>↵</kbd>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="cmd-footer">
          <span className="cmd-footer-hint">
            <kbd>↑↓</kbd> navigate
          </span>
          <span className="cmd-footer-hint">
            <kbd>↵</kbd> select
          </span>
          <span className="cmd-footer-hint">
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </>
  );
}

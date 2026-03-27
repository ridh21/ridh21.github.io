"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { socialLinks } from "app/config";

// ─── Types ───
interface CommandItem {
  id: string;
  label: string;
  description?: string;
  section: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

// ─── Icons (inline, matching portfolio icon style) ───
function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PageIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.4" />
      <path d="M14 2V8H20L14 2Z" fill="currentColor" />
    </svg>
  );
}

function LinkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThemeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.4" />
      <path d="M12 3V21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z" fill="currentColor" />
    </svg>
  );
}

function MailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" fill="currentColor" fillOpacity="0.4" />
      <path d="M22 6L12.53 12.84C12.21 13.05 11.79 13.05 11.47 12.84L2 6" fill="currentColor" />
    </svg>
  );
}

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SparkleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.714 8.286L20 10L13.714 11.714L12 18L10.286 11.714L4 10L10.286 8.286L12 2Z" fill="currentColor" fillOpacity="0.4" />
      <path d="M18 15L18.857 17.143L21 18L18.857 18.857L18 21L17.143 18.857L15 18L17.143 17.143L18 15Z" fill="currentColor" />
    </svg>
  );
}

// ─── Component ───
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

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

  const openExternal = useCallback(
    (url: string) => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [close]
  );

  const toggleTheme = useCallback(() => {
    close();
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme-preference", next);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
    document.documentElement.classList.remove("bg-light", "bg-dark");
    document.documentElement.classList.add(`bg-${next}`);
    // Dispatch storage event so next-themes picks it up
    window.dispatchEvent(new StorageEvent("storage", { key: "theme" }));
    // Force next-themes update
    document.documentElement.setAttribute("class",
      document.documentElement.className.replace(
        current === "dark" ? "dark" : "light",
        next
      )
    );
  }, [close]);

  const copyUrl = useCallback(() => {
    close();
    navigator.clipboard.writeText(window.location.href);
  }, [close]);

  // ─── Command list ───
  const commands: CommandItem[] = useMemo(
    () => [
      // Pages
      {
        id: "home",
        label: "Home",
        section: "Pages",
        icon: <PageIcon />,
        action: () => navigate("/"),
        keywords: ["index", "main", "landing"],
      },
      {
        id: "proemio",
        label: "Proemio",
        description: "About me",
        section: "Pages",
        icon: <PageIcon />,
        action: () => navigate("/proemio"),
        keywords: ["about", "introduction", "bio"],
      },
      {
        id: "blog",
        label: "Blog",
        description: "Articles & project breakdowns",
        section: "Pages",
        icon: <PageIcon />,
        action: () => navigate("/blog"),
        keywords: ["articles", "posts", "writing"],
      },
      {
        id: "projects",
        label: "Projects",
        description: "Featured work",
        section: "Pages",
        icon: <PageIcon />,
        action: () => navigate("/projects"),
        keywords: ["work", "portfolio", "case studies"],
      },
      {
        id: "ai",
        label: "ध्ऋतम://ai",
        description: "AI chat assistant",
        section: "Pages",
        icon: <SparkleIcon />,
        action: () => navigate("/ai"),
        keywords: ["chatbot", "assistant", "dhruv"],
      },
      {
        id: "photos",
        label: "Photos",
        description: "Photo gallery",
        section: "Pages",
        icon: <PageIcon />,
        action: () => navigate("/photos"),
        keywords: ["gallery", "images", "pictures"],
      },
      {
        id: "cv",
        label: "CV",
        description: "Resume / Curriculum Vitae",
        section: "Pages",
        icon: <PageIcon />,
        action: () => navigate("/cv"),
        keywords: ["resume", "curriculum"],
      },
      // Actions
      {
        id: "toggle-theme",
        label: "Toggle Theme",
        description: "Switch between light and dark mode",
        section: "Actions",
        icon: <ThemeIcon />,
        action: toggleTheme,
        keywords: ["dark", "light", "mode", "appearance"],
      },
      {
        id: "copy-url",
        label: "Copy Current URL",
        description: "Copy page URL to clipboard",
        section: "Actions",
        icon: <CopyIcon />,
        action: copyUrl,
        keywords: ["link", "share", "clipboard"],
      },
      // Social
      {
        id: "github",
        label: "GitHub",
        description: "ridh21",
        section: "Social",
        icon: <LinkIcon />,
        action: () => openExternal(socialLinks.github),
        keywords: ["code", "repository", "git"],
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        description: "ridhampatel2k4",
        section: "Social",
        icon: <LinkIcon />,
        action: () => openExternal(socialLinks.linkedin),
        keywords: ["professional", "network"],
      },
      {
        id: "twitter",
        label: "Twitter / X",
        description: "@ridhampatel2k4",
        section: "Social",
        icon: <LinkIcon />,
        action: () => openExternal(socialLinks.twitter),
        keywords: ["x", "tweet", "social"],
      },
      {
        id: "instagram",
        label: "Instagram",
        description: "@curiousridham",
        section: "Social",
        icon: <LinkIcon />,
        action: () => openExternal(socialLinks.instagram),
        keywords: ["social", "photos"],
      },
      {
        id: "email",
        label: "Send Email",
        description: "ridhampatel21@gmail.com",
        section: "Social",
        icon: <MailIcon />,
        action: () => openExternal(socialLinks.email),
        keywords: ["mail", "contact", "message"],
      },
      {
        id: "scholar",
        label: "Google Scholar",
        description: "Research publications",
        section: "Social",
        icon: <LinkIcon />,
        action: () => openExternal(socialLinks.scholar),
        keywords: ["research", "papers", "academic"],
      },
      {
        id: "orcid",
        label: "ORCID",
        description: "Research ID",
        section: "Social",
        icon: <LinkIcon />,
        action: () => openExternal(socialLinks.orcid),
        keywords: ["research", "id"],
      },
    ],
    [navigate, openExternal, toggleTheme, copyUrl]
  );

  // ─── Filtered results ───
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

  // ─── Grouped for rendering ───
  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filtered) {
      const arr = map.get(item.section) || [];
      arr.push(item);
      map.set(item.section, arr);
    }
    return map;
  }, [filtered]);

  // ─── Keyboard shortcut to open ───
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (!e.metaKey && !e.ctrlKey && !e.altKey && !isTyping && e.key.toLowerCase() === "d") {
        e.preventDefault();
        toggleTheme();
      }

      if (e.key === "Escape") {
        close();
      }
    };
    const customHandler = () => setOpen((prev) => !prev);
    document.addEventListener("keydown", handler);
    document.addEventListener("open-command-palette", customHandler);
    return () => {
      document.removeEventListener("keydown", handler);
      document.removeEventListener("open-command-palette", customHandler);
    };
  }, [close, toggleTheme]);

  // ─── Focus input when opened ───
  useEffect(() => {
    if (open) {
      // Small delay to ensure the DOM is painted
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  // ─── Reset active index when results change ───
  useEffect(() => {
    setActiveIndex(0);
  }, [filtered]);

  // ─── Scroll active item into view ───
  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // ─── Keyboard navigation ───
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

  // Don't render on admin pages — admin has its own command palette
  if (isAdmin || !open) return null;

  let flatIndex = -1;

  return (
    <>
      {/* Backdrop */}
      <div
        className="cmd-backdrop"
        onClick={close}
        aria-hidden="true"
      />

      {/* Palette */}
      <div className="cmd-palette" role="dialog" aria-modal="true" aria-label="Command menu">
        {/* Search input */}
        <div className="cmd-input-wrapper">
          <SearchIcon size={16} />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search..."
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
              No results found for &ldquo;{query}&rdquo;
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

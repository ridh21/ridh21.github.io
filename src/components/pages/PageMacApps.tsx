/* The Mac setup: every app I install on a fresh machine, with the command that installs it. */
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import ThemeToggle from "@/components/academic/ThemeToggle";
import "@/components/academic/academic.css";
import "@/components/article.css";
import "./mac-apps.css";

type Command = { label: string; text: string };

type MacApp = {
  name: string;
  tagline: string;
  icon: string;
  /* Menu-bar apps ship a glyph instead of a full icon, so give those a tile. */
  glyph?: boolean;
  commands: Command[];
  note?: string;
};

const apps: MacApp[] = [
  {
    name: "Homebrew",
    tagline: "Package manager",
    icon: "/apps/homebrew.png",
    commands: [
      { label: "Script", text: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' },
    ],
    note: "Homebrew is not on Homebrew, so this is the official installer script. Everything below assumes it is already installed.",
  },
  {
    name: "Tailscale",
    tagline: "Mesh VPN",
    icon: "/apps/tailscale.png",
    commands: [{ label: "Install", text: "brew install --cask tailscale-app" }],
    note: "Approve the network extension in System Settings → Privacy & Security on first launch.",
  },
  {
    name: "cmux",
    tagline: "Terminal for agents",
    icon: "/apps/cmux.png",
    commands: [{ label: "Install", text: "brew install --cask cmux" }],
  },
  {
    name: "Maccy",
    tagline: "Clipboard history",
    icon: "/apps/maccy.png",
    commands: [{ label: "Install", text: "brew install --cask maccy" }],
  },
  {
    name: "Tinycast",
    tagline: "Launcher",
    icon: "/apps/tinycast.svg",
    glyph: true,
    commands: [
      { label: "Tap", text: "brew trust --tap abue-ammar/tinycast\nbrew tap abue-ammar/tinycast" },
      { label: "Install", text: "brew install --cask tinycast" },
    ],
    note: "Third-party tap, so Homebrew needs the trust step before it will install from it.",
  },
  {
    name: "Shottr",
    tagline: "Screenshots",
    icon: "/apps/shottr.png",
    commands: [{ label: "Install", text: "brew install --cask shottr" }],
  },
  {
    name: "Mac Mouse Fix",
    tagline: "Mouse gestures",
    icon: "/apps/mac-mouse-fix.png",
    commands: [{ label: "Install", text: "brew install --cask mac-mouse-fix" }],
  },
  {
    name: "Vorssaint",
    tagline: "Menu bar toolkit",
    icon: "/apps/vorssaint.png",
    commands: [{ label: "Install", text: "brew install --cask vorssaint" }],
  },
  {
    name: "T3 Code",
    tagline: "Coding agents",
    icon: "/apps/t3-code.png",
    commands: [{ label: "Install", text: "brew install --cask t3-code@nightly" }],
    note: "I run the nightly channel — the cask installs T3 Code (Nightly).app alongside the stable build.",
  },
  {
    name: "Finder Menu",
    tagline: "Right-click menu",
    icon: "/apps/finder-menu.png",
    commands: [
      { label: "Install", text: "brew install nikgrbn/tap/finder-menu" },
      { label: "Enable", text: "finder-menu enable" },
    ],
    note: "A formula rather than a cask, and enable is the step that adds the Finder extension: New File, Open Terminal Here, Open Folder With.",
  },
  {
    name: "OpenCode",
    tagline: "Coding agent",
    icon: "/apps/opencode.png",
    commands: [
      { label: "App", text: "brew install --cask opencode-desktop" },
      { label: "CLI", text: "brew install opencode" },
    ],
  },
  {
    name: "Helium",
    tagline: "Browser",
    icon: "/apps/helium.png",
    commands: [{ label: "Install", text: "brew install --cask helium-browser" }],
    note: "Not the Helium on Homebrew's first match — that one is an Android backup tool. The browser is helium-browser.",
  },
];

export default function PageMacApps() {
  return (
    <div className="acad">
      <main className="acad-main mac-main">
        <div className="art-topbar">
          <Link href="/" className="art-back">← Ridham Patel</Link>
          <ThemeToggle />
        </div>

        <header className="art-header">
          <p className="art-kicker">Setup</p>
          <h1 className="art-title">Mac apps</h1>
          <p className="mac-lede">The {apps.length} things I install on a new Mac, in the order I install them. Each command is the Homebrew cask where one exists; Homebrew and Finder Menu take an extra step instead.</p>
        </header>

        <ol className="mac-list">
          {apps.map((app, index) => (
            <li key={app.name} className="mac-item">
              <img alt="" width={32} height={32} loading="lazy" decoding="async" className={app.glyph ? "mac-icon mac-icon-glyph" : "mac-icon"} src={app.icon} />
              <div className="mac-body">
                <div className="mac-head">
                  <span className="mac-name">{app.name}</span>
                  <span className="mac-tag">{app.tagline}</span>
                  <span className="mac-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="mac-cmds">
                  {app.commands.map((command) => (
                    <CodeBlock key={command.label} label={command.label} code={command.text} copyLabel={`the ${app.name} ${command.label.toLowerCase()} command`} />
                  ))}
                </div>
                {app.note && <p className="mac-note">{app.note}</p>}
              </div>
            </li>
          ))}
        </ol>

        <footer className="acad-footer art-footer">
          <Link href="/">← Back to home</Link>
          <span>Ridham Patel</span>
        </footer>
      </main>
    </div>
  );
}

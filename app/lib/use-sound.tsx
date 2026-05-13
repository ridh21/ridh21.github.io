"use client";

import { useEffect } from "react";
import { sounds } from "./sounds";

let initialized = false;

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.addEventListener("click", () => {
    sounds.click();
  }, { passive: true });
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => { init(); }, []);
  return <>{children}</>;
}

export function playClick() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  sounds.click();
}

export function playKeypress(key = "") {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  sounds.keypress(key);
}



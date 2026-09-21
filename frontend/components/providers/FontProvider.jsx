/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { FONT_OPTIONS } from "./fontList";

const FontContext = createContext({
  selectedFont: FONT_OPTIONS[0],
  setFont: () => {},
  lockedFont: null,
  lockFont: () => {},
  fonts: FONT_OPTIONS,
  mounted: false,
});

const STORAGE_KEY = "college_os_active_font";
const LOCKED_KEY = "college_os_locked_font";

export function FontProvider({ children }) {
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);
  const [lockedFont, setLockedFont] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Apply font family globally to document
  const applyFontToDOM = (font) => {
    if (typeof document === "undefined") return;

    let styleEl = document.getElementById("college-os-live-font-override");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "college-os-live-font-override";
      document.head.appendChild(styleEl);
    }

    styleEl.innerHTML = `
      body, html, input, button, select, textarea, h1, h2, h3, h4, h5, h6, p, span, div, a, kbd, label, table, tr, th, td {
        font-family: ${font.family} !important;
      }
    `;
  };

  // 1. Initial client-side load from localStorage after hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const found = FONT_OPTIONS.find(
          (f) => f.name.toLowerCase() === saved.toLowerCase() || f.id === saved
        );
        if (found) {
          setSelectedFont(found);
        }
      }
      const savedLocked = localStorage.getItem(LOCKED_KEY);
      if (savedLocked) {
        setLockedFont(savedLocked);
      }
    } catch {
      // ignore localStorage access errors
    }
    setMounted(true);
  }, []);

  // 2. Ensure Google Fonts stylesheet link is present & apply font changes
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (!document.getElementById("college-os-google-fonts")) {
      const link = document.createElement("link");
      link.id = "college-os-google-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Geist:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Source+Sans+3:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }

    applyFontToDOM(selectedFont);
  }, [selectedFont]);

  const setFont = (fontOrName) => {
    const font =
      typeof fontOrName === "string"
        ? FONT_OPTIONS.find(
            (f) =>
              f.name.toLowerCase() === fontOrName.toLowerCase() ||
              f.id === fontOrName
          ) || FONT_OPTIONS[0]
        : fontOrName;

    setSelectedFont(font);
    applyFontToDOM(font);
    try {
      localStorage.setItem(STORAGE_KEY, font.name);
    } catch {
      // ignore storage access errors
    }
  };

  const lockFont = (fontName) => {
    setLockedFont(fontName);
    try {
      localStorage.setItem(LOCKED_KEY, fontName);
    } catch {
      // ignore storage access errors
    }
  };

  return (
    <FontContext.Provider
      value={{
        selectedFont,
        setFont,
        lockedFont,
        lockFont,
        fonts: FONT_OPTIONS,
        mounted,
      }}
    >
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}

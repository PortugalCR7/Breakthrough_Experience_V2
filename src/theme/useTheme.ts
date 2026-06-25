import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "bt-theme";

/** The live theme = the html[data-theme] attribute (single source of truth). */
function current(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

/** Write the theme to the DOM + persist it. The no-flash guard in index.html
 *  applies the persisted value on the next load before first paint. */
export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage may be unavailable (private mode) — DOM attribute still applies */
  }
}

/**
 * Track + control the active theme. The attribute is observed so every consumer
 * (toggle button, word-reveal re-init) stays in sync no matter who flipped it.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(current);

  useEffect(() => {
    const sync = () => setThemeState(current());
    sync(); // reconcile with the no-flash guard's pre-paint value
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  const setTheme = useCallback((t: Theme) => applyTheme(t), []);
  const toggle = useCallback(
    () => applyTheme(current() === "dark" ? "light" : "dark"),
    []
  );

  return { theme, setTheme, toggle };
}

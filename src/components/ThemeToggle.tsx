import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "bt-theme";

function getInitialTheme(): Theme {
  // The no-flash script in index.html has already set documentElement's
  // data-theme before React mounts; mirror it so the button starts in sync.
  const current = document.documentElement.getAttribute("data-theme");
  if (current === "light" || current === "dark") return current;
  return "dark";
}

/**
 * Fixed-corner dark/light toggle. Writes `data-theme` onto <html> and persists
 * the choice. The whole site re-themes via CSS token inversion (see index.css);
 * this component only flips the attribute. Default is dark (light is opt-in).
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      data-cursor-label={next === "light" ? "Light" : "Dark"}
    >
      {theme === "dark" ? (
        // Sun — click to go light
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // Moon — click to go dark
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

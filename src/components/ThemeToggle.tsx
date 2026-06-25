import { useTheme } from "../theme/useTheme";

/**
 * Fixed bottom-right theme toggle. Dark is the default; the choice persists to
 * localStorage ('bt-theme') and is applied before first paint by the no-flash
 * guard in index.html. The icon shows the action: sun = switch to light,
 * moon = switch to dark. Styled via `.theme-toggle` tokens so it themes itself.
 */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      data-cursor-label={isDark ? "Light" : "Dark"}
    >
      {isDark ? (
        /* Sun — switch to light */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M12 2.4v2.6" />
            <path d="M12 19v2.6" />
            <path d="M2.4 12h2.6" />
            <path d="M19 12h2.6" />
            <path d="M4.9 4.9l1.85 1.85" />
            <path d="M17.25 17.25l1.85 1.85" />
            <path d="M19.1 4.9l-1.85 1.85" />
            <path d="M6.75 17.25L4.9 19.1" />
          </g>
        </svg>
      ) : (
        /* Moon — switch to dark */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 13.4A8 8 0 0 1 10.6 4a0.7 0.7 0 0 0-.94-.86A9 9 0 1 0 20.86 14.3a0.7 0.7 0 0 0-.86-.9z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.12"
          />
        </svg>
      )}
    </button>
  );
}

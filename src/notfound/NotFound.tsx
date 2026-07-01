import ScrambleText from "../components/ScrambleText";
import ThemeToggle from "../components/ThemeToggle";

/**
 * Branded 404 — a quiet, editorial extension of the BREAKTHROUGH experience
 * rather than a stock "error page". Reuses the brand tokens, type scale, button,
 * and ThemeToggle so it reads as part of the same system as the main site and the
 * legal pages. The oversized "404" decodes through digits via the house
 * text-scramble idiom (ScrambleText with a numeric glyph pool). Served as a
 * standalone MPA entry (404.html) so unmatched routes render it with a real HTTP
 * 404 on Vercel.
 */
export default function NotFound() {
  return (
    <>
      <header className="legal-bar">
        <a className="legal-home" href="/" aria-label="BREAKTHROUGH — home">
          BREAKTHROUGH
        </a>
        <a className="legal-back" href="/">
          ← Back to site
        </a>
      </header>

      <main id="main" className="nf">
        <div className="nf-inner">
          <ScrambleText
            text="404"
            glyphs="0123456789"
            duration={1100}
            className="nf-code"
          />
          <h1 className="nf-title">
            This Path
            <br />
            Doesn't Exist.
          </h1>
          <p className="nf-sub">
            The page you're looking for may have moved, or the link may be
            incorrect.
          </p>
          <a className="btn nf-cta" href="/">
            Return to BREAKTHROUGH
          </a>
        </div>
      </main>

      <ThemeToggle />
    </>
  );
}

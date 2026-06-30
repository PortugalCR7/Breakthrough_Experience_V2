import { useEffect, type ReactNode } from "react";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";
import type { LegalDoc } from "./content";

/**
 * Inline emphasis: renders the `**bold**` subset of markdown. Everything else is
 * passed through as plain text. Kept deliberately tiny — the legal copy only ever
 * uses bold emphasis (e.g. "Coaching is **not**").
 */
function renderInline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith("**") && part.endsWith("**")) {
      out.push(<strong key={`${keyBase}-b${i}`}>{part.slice(2, -2)}</strong>);
    } else {
      out.push(part);
    }
  });
  return out;
}

/**
 * Renders the lightweight markdown body (see content.ts for the supported
 * subset) into branded editorial elements. Consecutive `- ` lines collapse into
 * a single <ul>; `## ` headings render as <h2> (the page title is the only h1);
 * `---` becomes a divider rule; every other non-empty line is a paragraph.
 */
function renderLegalBody(body: string): ReactNode[] {
  const lines = body.split("\n");
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let key = 0;

  const flushList = () => {
    if (!list.length) return;
    const items = list;
    blocks.push(
      <ul key={`ul-${key++}`}>
        {items.map((item, i) => (
          <li key={i}>{renderInline(item, `li-${key}-${i}`)}</li>
        ))}
      </ul>
    );
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      continue;
    }
    flushList();
    if (line === "---") {
      blocks.push(<hr key={`hr-${key++}`} className="legal-rule" />);
    } else if (line.startsWith("## ")) {
      blocks.push(<h2 key={`h-${key++}`}>{renderInline(line.slice(3), `h-${key}`)}</h2>);
    } else if (line.startsWith("# ")) {
      blocks.push(<h2 key={`h-${key++}`}>{renderInline(line.slice(2), `h-${key}`)}</h2>);
    } else {
      blocks.push(<p key={`p-${key++}`}>{renderInline(line, `p-${key}`)}</p>);
    }
  }
  flushList();
  return blocks;
}

/**
 * Standalone legal page shell — Privacy / Terms / Disclaimer. Reuses the brand
 * tokens, type scale, Footer, and ThemeToggle so it reads as part of the same
 * editorial system as the main experience. The crawlable <title>/<meta>/canonical
 * are baked into each page's static HTML; this only keeps the title in sync for
 * client navigation.
 */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  useEffect(() => {
    document.title = doc.metaTitle;
  }, [doc.metaTitle]);

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

      <main id="main" className="legal-main">
        <div className="w">
          <article className="legal-article">
            <span className="eyebrow">Legal</span>
            <h1 className="legal-title">{doc.title}</h1>
            <p className="legal-updated">Last Updated: {doc.lastUpdated}</p>
            <div className="legal-rule legal-rule--lead" aria-hidden="true" />
            {renderLegalBody(doc.body)}
          </article>
        </div>
      </main>

      <Footer />
      <ThemeToggle />
    </>
  );
}

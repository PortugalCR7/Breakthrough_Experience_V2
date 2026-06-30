import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { LenisProvider } from "../motion";
import LegalPage from "./LegalPage";
import { LEGAL_DOCS, type LegalSlug } from "./content";

/**
 * Entry point shared by all three legal pages. Each static HTML shell
 * (/privacy, /terms, /disclaimer) declares `data-legal` on <body>; we read that
 * to mount the matching document. Deriving the slug from the markup (not the
 * URL) keeps it deterministic in dev and prod alike.
 */
const slug = (document.body.dataset.legal as LegalSlug) ?? "privacy";
const doc = LEGAL_DOCS[slug] ?? LEGAL_DOCS.privacy;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LenisProvider>
      <LegalPage doc={doc} />
    </LenisProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import NotFound from "./NotFound";

/**
 * Entry point for the standalone 404 page (404.html). A single-viewport page —
 * no Lenis smooth-scroll wrapper needed, unlike the main experience.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotFound />
  </StrictMode>
);

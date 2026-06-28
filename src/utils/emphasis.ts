export interface ParsedWord {
  word: string;
  idx: number;
  classes: string;
}

/**
 * Parses a line containing markdown-style emphasis tags, e.g.:
 * "This is [STRUCTURE](italic,accent) and [ACCOUNTABILITY](italic,glow)"
 * 
 * Returns an array of ParsedWord objects with mapped CSS classes.
 */
export function parseEmphasisLine(line: string, startIdx: number): { words: ParsedWord[]; nextIdx: number } {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const words: ParsedWord[] = [];
  let currentIdx = startIdx;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    const textBefore = line.substring(lastIndex, match.index);
    const highlightedText = match[1];
    const stylesString = match[2];

    // 1. Process plain text before the match
    if (textBefore.length > 0) {
      const parts = textBefore.split(/\s+/);
      parts.forEach((part) => {
        if (part) {
          words.push({
            word: part,
            idx: currentIdx++,
            classes: "",
          });
        }
      });
    }

    // 2. Compile classes from the styles string
    const styleClasses = stylesString
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
      .map((s) => {
        if (s === "bodoni italic") {
          return "edt-emphasis--bodoni edt-emphasis--italic";
        }
        return `edt-emphasis--${s}`;
      })
      .join(" ");

    // 3. Process highlighted words (split to preserve word-reveal stagger animations)
    const highlightedParts = highlightedText.split(/\s+/).filter(Boolean);
    highlightedParts.forEach((part) => {
      words.push({
        word: part,
        idx: currentIdx++,
        classes: `edt-emphasis ${styleClasses}`,
      });
    });

    lastIndex = regex.lastIndex;
  }

  // 4. Process plain text after the match
  const textAfter = line.substring(lastIndex);
  if (textAfter.length > 0) {
    const parts = textAfter.split(/\s+/);
    parts.forEach((part) => {
      if (part) {
        words.push({
          word: part,
          idx: currentIdx++,
          classes: "",
        });
      }
    });
  }

  return { words, nextIdx: currentIdx };
}

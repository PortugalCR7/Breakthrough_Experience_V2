import DOMPurify from 'dompurify';

/**
 * Sanitizes an HTML string for safe use with dangerouslySetInnerHTML.
 *
 * Usage:
 *   <span dangerouslySetInnerHTML={sanitizeHtml(content.body)} />
 */
export function sanitizeHtml(html: string): { __html: string } {
  return { __html: DOMPurify.sanitize(html) };
}

/**
 * Sanitizes an HTML string and returns just the clean string.
 */
export function sanitizeString(html: string): string {
  return DOMPurify.sanitize(html);
}

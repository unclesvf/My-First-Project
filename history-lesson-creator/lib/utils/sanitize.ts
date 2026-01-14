/**
 * XSS Protection utilities using DOMPurify
 * Use these functions to sanitize any user-generated content before rendering
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * Allows safe HTML tags but removes dangerous ones like <script>
 * @param dirty - The untrusted HTML string
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(dirty: string): string {
  // DOMPurify requires a DOM environment
  if (typeof window === 'undefined') {
    // Server-side: strip all HTML tags as a fallback
    return dirty.replace(/<[^>]*>/g, '');
  }
  return DOMPurify.sanitize(dirty);
}

/**
 * Sanitize text by escaping HTML special characters
 * Use this for plain text that should never contain HTML
 * @param text - The untrusted text string
 * @returns Escaped string safe for rendering
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Sanitize a URL to prevent javascript: and data: attacks
 * @param url - The untrusted URL string
 * @returns Sanitized URL or empty string if dangerous
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  const trimmed = url.trim().toLowerCase();

  // Block dangerous protocols
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('vbscript:')
  ) {
    return '';
  }

  // Allow safe protocols and relative URLs
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('mailto:')
  ) {
    return url;
  }

  // Default: treat as relative URL
  return url;
}

/**
 * Sanitize user input for display name
 * Removes HTML and limits length
 * @param name - The untrusted name string
 * @param maxLength - Maximum allowed length (default 100)
 * @returns Sanitized name
 */
export function sanitizeDisplayName(name: string, maxLength = 100): string {
  return sanitizeText(name)
    .trim()
    .slice(0, maxLength);
}

/**
 *
 * @returns if scroll is activated on current viewport
 */
export function isScrollable() {
  return document.body.scrollHeight > window.innerHeight;
}

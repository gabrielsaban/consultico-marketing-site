/**
 * Is this path inside the private client-report area?
 *
 * Report pages own their whole frame. The marketing chrome — side nav, mobile
 * top bar, preloader, smooth scroll, custom cursor, interactive dot canvas,
 * footer — belongs to the public site and has no business on a passcode-gated
 * client deliverable. Until the report area existed this was free, because
 * /r/<slug> was a route handler and never touched the React tree; a page does,
 * so each piece of chrome checks this and bows out.
 *
 * It also fixes the unlock page, which has been rendering a passcode form over
 * an animated dot canvas with a custom cursor since the day it shipped.
 *
 * Deliberately not exported from a 'server-only' module — the chrome
 * components that call it are client components.
 */
export function isReportPath(pathname: string | null | undefined): boolean {
  return pathname === '/r' || (pathname?.startsWith('/r/') ?? false);
}

/**
 * Pass-through wrapper for layout structure.
 * The SitePreloader overlay handles the first-visit reveal visually;
 * page content stays in the DOM for crawlers and SSR.
 */
export default function PreloaderGate({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

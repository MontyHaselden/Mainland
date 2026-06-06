type SeoOnlyProps = {
  children: React.ReactNode;
};

/**
 * Visually hidden but present in the DOM for search engines and crawlers.
 * Not displayed to sighted users browsing the site.
 */
export function SeoOnly({ children }: SeoOnlyProps) {
  return (
    <div className="seo-only" aria-hidden="true">
      {children}
    </div>
  );
}

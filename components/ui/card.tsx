export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface/95 p-5 shadow-xl shadow-navy/5 backdrop-blur-md sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

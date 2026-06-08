type LogoMarkProps = {
  className?: string;
  title?: string;
};

const LOGO_SRC = "/logo/mainland-logo-mark.png";

/** AI-rendered M monogram with Canterbury mountain — Mainland Building Inspections */
export function LogoMark({
  className = "h-9 w-9",
  title = "Mainland Building Inspections",
}: LogoMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt={title}
      className={`block shrink-0 object-cover ${className}`}
      draggable={false}
      width={80}
      height={80}
    />
  );
}

type LogoMarkProps = {
  className?: string;
  title?: string;
};

/** M monogram with clean mountain backdrop — Mainland Building Inspections */
export function LogoMark({
  className = "h-9 w-9",
  title = "Mainland Building Inspections",
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient
          id="logoMarkMountain"
          x1="20"
          y1="6"
          x2="20"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#52b788" />
          <stop offset="55%" stopColor="#3a8f5c" />
          <stop offset="100%" stopColor="#2d6a4f" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" className="fill-navy" />
      <path d="M5 40L20 7L35 40H5Z" fill="url(#logoMarkMountain)" />
      <path d="M17.2 9L20 6.8L22.8 9L21.4 10.2H18.6L17.2 9Z" fill="#f4fafc" />
      <path
        d="M10.5 34V15.8H14.6L20 26.2L25.4 15.8H29.5V34H26.1V20.8L20 29.8L13.9 20.8V34H10.5Z"
        fill="#ffffff"
      />
    </svg>
  );
}

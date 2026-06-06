type LogoMarkProps = {
  className?: string;
  title?: string;
};

/** Bold M monogram with Canterbury mountain — Mainland Building Inspections */
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
        <linearGradient id="logoMarkMountain" x1="20" y1="5" x2="20" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5ec995" />
          <stop offset="45%" stopColor="#40916c" />
          <stop offset="100%" stopColor="#2d6a4f" />
        </linearGradient>
        <linearGradient id="logoMarkSnow" x1="20" y1="5.5" x2="20" y2="9.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8f4fa" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" className="fill-navy" />
      <path
        d="M6.5 17.5L13.5 10.5L17.5 7.5L20 5.5L22.8 8L27 11.5L33.5 17.5H6.5Z"
        fill="url(#logoMarkMountain)"
      />
      <path
        d="M17.2 8.2L20 5.5L22.8 8.2L21.6 9.4H18.4L17.2 8.2Z"
        fill="url(#logoMarkSnow)"
      />
      <path
        d="M9 32V13.5H14.2L20 25.8L25.8 13.5H31V32H26.2V18.8L20 29.5L13.8 18.8V32H9Z"
        className="fill-white"
      />
    </svg>
  );
}

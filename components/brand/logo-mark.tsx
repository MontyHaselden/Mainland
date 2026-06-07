type LogoMarkProps = {
  className?: string;
  title?: string;
};

/** Premium M monogram with layered Canterbury mountain — Mainland Building Inspections */
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
          id="lmFaceLight"
          x1="12"
          y1="6"
          x2="18"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#72dba0" />
          <stop offset="55%" stopColor="#4aa876" />
          <stop offset="100%" stopColor="#358a5c" />
        </linearGradient>
        <linearGradient
          id="lmFaceShadow"
          x1="28"
          y1="6"
          x2="22"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3f8f5f" />
          <stop offset="55%" stopColor="#2d6a4f" />
          <stop offset="100%" stopColor="#1e4a36" />
        </linearGradient>
        <linearGradient
          id="lmFoothill"
          x1="20"
          y1="32"
          x2="20"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2d6a4f" />
          <stop offset="100%" stopColor="#1a3d2c" />
        </linearGradient>
        <linearGradient
          id="lmSnow"
          x1="20"
          y1="5"
          x2="20"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d8ecf5" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" className="fill-navy" />
      <path
        d="M0 40C4 36.5 7 35 10 36.5C12.5 37.8 14 38.5 16 38C18 37.5 20 37.2 22 38C24 38.8 26.5 37.8 30 36.5C33 35 36 36.5 40 40V40H0Z"
        fill="url(#lmFoothill)"
        opacity="0.9"
      />
      <path
        d="M3 40L11.5 27.5L15.5 18.5L18.5 11L20 5.5L20 40H3Z"
        fill="url(#lmFaceLight)"
      />
      <path
        d="M20 5.5L21.5 11L24.5 18.5L28.5 27.5L37 40H20V5.5Z"
        fill="url(#lmFaceShadow)"
      />
      <path
        d="M20 5.5L21 11.5L24 20L28 29L32 36L37 40"
        stroke="#1a3d2c"
        strokeWidth="0.6"
        opacity="0.25"
        fill="none"
      />
      <path
        d="M15.8 12.5L18.2 8.8L20 5.5L21.8 8.8L24.2 12.5L22.4 14H17.6L15.8 12.5Z"
        fill="url(#lmSnow)"
      />
      <path
        d="M17.8 10.2L20 7.8L22.2 10.2L20.8 11.2H19.2L17.8 10.2Z"
        fill="#ffffff"
        opacity="0.85"
      />
      <path
        d="M10.2 34.2V15.2H14.1L20 25.2L25.9 15.2H29.8V34.2H26.5V20.8L20 29.2L13.5 20.8V34.2H10.2Z"
        fill="#ffffff"
      />
      <path
        d="M10.2 34.2V15.2H14.1L20 25.2L25.9 15.2H29.8V34.2H26.5V20.8L20 29.2L13.5 20.8V34.2H10.2Z"
        stroke="#ffffff"
        strokeWidth="0.35"
        strokeLinejoin="round"
        opacity="0.35"
        fill="none"
      />
    </svg>
  );
}

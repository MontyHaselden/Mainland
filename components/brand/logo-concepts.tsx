import type { CSSProperties, ReactElement } from "react";

type LogoProps = {
  className?: string;
  style?: CSSProperties;
};

/** AI-rendered mark — artistic mountain with bold M (live site logo) */
export function LogoMainlandMark({ className = "h-16 w-16", style }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo/mainland-logo-mark.png"
      alt=""
      className={`object-contain ${className ?? ""}`}
      style={style}
      draggable={false}
    />
  );
}

/** Premium render — twin peak M (PNG, not SVG) */
export function LogoTwinPeaks({ className = "h-16 w-16", style }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo/twin-peaks-render.png"
      alt=""
      className={`object-contain ${className ?? ""}`}
      style={style}
      draggable={false}
    />
  );
}

/** Layered mountain backdrop with premium M — scaled preview of LogoMark */
export function LogoSummit({ className = "h-16 w-16", style }: LogoProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} style={style} aria-hidden>
      <defs>
        <clipPath id="summitClip">
          <rect width="80" height="80" rx="20" />
        </clipPath>
        <linearGradient id="summitSky" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#243044" />
          <stop offset="100%" stopColor="#1a2332" />
        </linearGradient>
        <linearGradient id="summitRidgeFar" x1="16" y1="36" x2="40" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2a5c42" />
          <stop offset="100%" stopColor="#1a3d2c" />
        </linearGradient>
        <linearGradient id="summitFaceLight" x1="28" y1="16" x2="36" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7ee0a8" />
          <stop offset="45%" stopColor="#52b87d" />
          <stop offset="100%" stopColor="#3a9462" />
        </linearGradient>
        <linearGradient id="summitFaceShadow" x1="56" y1="16" x2="44" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3d9160" />
          <stop offset="50%" stopColor="#2d6a4f" />
          <stop offset="100%" stopColor="#1e4a36" />
        </linearGradient>
        <linearGradient id="summitSnow" x1="40" y1="12" x2="40" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c5e4f0" />
        </linearGradient>
        <linearGradient id="summitMShadow" x1="40" y1="24" x2="40" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f2419" stopOpacity="0" />
          <stop offset="100%" stopColor="#0f2419" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="20" fill="url(#summitSky)" />
      <g clipPath="url(#summitClip)">
        <path
          d="M0 80V68C12 60 20 56 28 60C34 63 38 64 40 63C42 62 46 61 52 60C60 58 68 62 80 68V80H0Z"
          fill="#1a3d2c"
          opacity="0.55"
        />
        <path d="M0 80L20 60L32 44L12 80H0Z" fill="url(#summitRidgeFar)" opacity="0.7" />
        <path d="M80 80L60 56L48 40L68 80H80Z" fill="url(#summitRidgeFar)" opacity="0.55" />
        <path d="M4 80L22 57L33 34L38 21L40 16L40 80H4Z" fill="url(#summitFaceLight)" />
        <path d="M40 16L42 21L47 34L58 57L76 80H40V16Z" fill="url(#summitFaceShadow)" />
        <path d="M40 16L46 34L58 57L76 80" stroke="#1a3d2c" strokeWidth="1" opacity="0.3" fill="none" />
        <path d="M31 29L33 20L38 21" stroke="#ffffff" strokeWidth="0.8" opacity="0.12" fill="none" />
        <path d="M8 80H72" stroke="#2d6a4f" strokeWidth="1.2" opacity="0.35" />
        <path d="M31 29L36.4 20L40 15L43.6 20L49 29L45 32H35L31 29Z" fill="url(#summitSnow)" />
        <path d="M35.6 23.6L40 18.4L44.4 23.6L41.2 25.6H38.8L35.6 23.6Z" fill="#ffffff" />
        <path
          d="M15.6 71.6V25.6H25.6L40 49.6L54.4 25.6H64.4V71.6H56.4V42.4L40 62.4L23.6 42.4V71.6H15.6Z"
          fill="url(#summitMShadow)"
          transform="translate(1.2 1.6)"
        />
        <path
          d="M14.4 70.4V24.4H24.4L40 48.4L55.6 24.4H65.6V70.4H57.6V41.2L40 61.2L22.4 41.2V70.4H14.4Z"
          fill="#fff"
        />
        <path
          d="M14.4 70.4V24.4H24.4L40 48.4L55.6 24.4H65.6V70.4H57.6V41.2L40 61.2L22.4 41.2V70.4H14.4Z"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.25"
          fill="none"
        />
      </g>
    </svg>
  );
}

/** 2 — Shield with house + inspection tick */
export function LogoLandmark({ className = "h-16 w-16", style }: LogoProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} style={style} aria-hidden>
      <path
        d="M40 6L68 18V38c0 16.5-12 28.5-28 36-16-7.5-28-19.5-28-36V18L40 6Z"
        fill="#1a2332"
      />
      <path d="M40 22L54 32V48H26V32L40 22Z" fill="#2d6a4f" />
      <path
        d="M34 44l4 4 9-10"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 3 — Foundation: grounded M with solid base */
export function LogoFoundation({ className = "h-16 w-16", style }: LogoProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} style={style} aria-hidden>
      <rect width="80" height="80" rx="12" fill="#f8f7f4" stroke="#e2e0da" strokeWidth="2" />
      <rect x="14" y="58" width="52" height="6" rx="2" fill="#2d6a4f" />
      <path
        d="M20 54V26h7l13 20 13-20h7v28h-7V36l-13 18-13-18v18h-7Z"
        fill="#1a2332"
      />
    </svg>
  );
}

/** 4 — Survey: magnifier over floor plan */
export function LogoSurvey({ className = "h-16 w-16", style }: LogoProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} style={style} aria-hidden>
      <rect width="80" height="80" rx="18" fill="#1a2332" />
      <rect x="16" y="38" width="22" height="18" rx="2" stroke="#40916c" strokeWidth="2" />
      <path d="M16 47h22M27 38v18" stroke="#40916c" strokeWidth="1.5" opacity="0.6" />
      <circle cx="50" cy="34" r="14" stroke="#fff" strokeWidth="3" />
      <circle cx="50" cy="34" r="9" fill="#2d6a4f" fillOpacity="0.35" />
      <path d="M60 44l10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** 5 — Canterbury: alpine peak + inspection mark */
export function LogoCanterbury({ className = "h-16 w-16", style }: LogoProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} style={style} aria-hidden>
      <rect width="80" height="80" rx="40" fill="#1a2332" />
      <path
        d="M14 54L32 24L40 36L48 20L66 54H14Z"
        fill="#2d6a4f"
      />
      <path
        d="M14 54H66"
        stroke="#40916c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="40" cy="44" r="8" fill="#fff" />
      <path
        d="M36 44l3 3 6-7"
        stroke="#2d6a4f"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 6 — Seal: circular trust emblem */
export function LogoSeal({ className = "h-16 w-16", style }: LogoProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} style={style} aria-hidden>
      <circle cx="40" cy="40" r="36" fill="#1a2332" />
      <circle cx="40" cy="40" r="30" stroke="#40916c" strokeWidth="2" />
      <path
        d="M40 18v28M28 46h24"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M40 18L52 30H28L40 18Z" fill="#2d6a4f" />
      <text
        x="40"
        y="58"
        textAnchor="middle"
        fill="#fff"
        fontSize="7"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="1.2"
      >
        MAINLAND
      </text>
    </svg>
  );
}

/** 7 — Wordmark: typography lockup with rule */
export function LogoWordmark({ className = "h-16", style }: LogoProps) {
  return (
    <svg viewBox="0 0 280 64" fill="none" className={className} style={style} aria-hidden>
      <text
        x="0"
        y="36"
        fill="#1a2332"
        fontSize="32"
        fontFamily="Georgia, 'DM Serif Display', serif"
      >
        Mainland
      </text>
      <rect x="0" y="44" width="120" height="3" rx="1.5" fill="#2d6a4f" />
      <text
        x="0"
        y="60"
        fill="#5c6b7a"
        fontSize="11"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="2.8"
      >
        BUILDING INSPECTIONS
      </text>
    </svg>
  );
}

/** 8 — Precision: blueprint corner + M */
export function LogoPrecision({ className = "h-16 w-16", style }: LogoProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} style={style} aria-hidden>
      <rect width="80" height="80" rx="14" fill="#0f1620" />
      <path
        d="M12 12h20M12 12v20"
        stroke="#40916c"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M68 68h-20M68 68V48"
        stroke="#40916c"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M24 58V30h6l10 16 10-16h6v28h-5.5V42l-10.5 16-10.5-16V58H24Z"
        fill="#fff"
      />
      <circle cx="58" cy="22" r="3" fill="#2d6a4f" />
    </svg>
  );
}

export const LOGO_FEATURED = {
  id: "mainland-mark",
  name: "Mainland Mark",
  tagline: "Artistic alpine M — live site logo",
  description:
    "AI-crafted rounded-square mark: layered Canterbury mountain fully inside the frame, snow cap, foothill pines, and a bold proud white M at centre.",
  Mark: LogoMainlandMark,
  renderSrc: "/logo/mainland-logo-mark.png",
  wordmark: true,
  wide: false,
} as const;

export const LOGO_CONCEPTS = [
  {
    id: "mainland-mark",
    name: "Mainland Mark",
    tagline: "Artistic alpine M — live site logo",
    description:
      "AI-crafted rounded-square mark: layered Canterbury mountain fully inside the frame, snow cap, foothill pines, and a bold proud white M at centre.",
    Mark: LogoMainlandMark,
    wordmark: true,
    wide: false,
    featured: true,
  },
  {
    id: "twin-peaks",
    name: "Twin Peaks",
    tagline: "Double summit M with valley river",
    description:
      "The M is the mountain — snowy peaks at both apexes, lush green slopes, and a river running through the central valley. Premium, regional, unmistakably Mainland.",
    Mark: LogoTwinPeaks,
    wordmark: true,
    wide: false,
  },
  {
    id: "summit",
    name: "Summit",
    tagline: "Layered mountain backdrop + premium M",
    description:
      "Sun and shadow faces, foothills, snow cap, and refined white M — full height to the frame edge.",
    Mark: LogoSummit,
    wordmark: true,
    wide: false,
  },
  {
    id: "landmark",
    name: "Landmark",
    tagline: "Shield with house + verified tick",
    description:
      "Trust and protection. Reads instantly as inspection and certification.",
    Mark: LogoLandmark,
    wordmark: true,
    wide: false,
  },
  {
    id: "foundation",
    name: "Foundation",
    tagline: "Grounded M with solid base",
    description:
      "Light background variant. Structural, stable, professional on documents.",
    Mark: LogoFoundation,
    wordmark: true,
    wide: false,
  },
  {
    id: "survey",
    name: "Survey",
    tagline: "Magnifier over floor plan",
    description:
      "Literal inspection story. Technical without feeling clinical.",
    Mark: LogoSurvey,
    wordmark: true,
    wide: false,
  },
  {
    id: "canterbury",
    name: "Canterbury",
    tagline: "Southern Alps + verified mark",
    description:
      "Regional identity for South Island coverage. Distinctive and ownable.",
    Mark: LogoCanterbury,
    wordmark: true,
    wide: false,
  },
  {
    id: "seal",
    name: "Seal",
    tagline: "Circular trust emblem",
    description:
      "Badge format for reports, uniforms, and social. Authority and legacy.",
    Mark: LogoSeal,
    wordmark: false,
    wide: false,
  },
  {
    id: "wordmark",
    name: "Wordmark",
    tagline: "Serif typography lockup",
    description:
      "No icon — pure type. Premium, editorial, lets the name carry the brand.",
    Mark: LogoWordmark,
    wordmark: false,
    wide: true,
  },
  {
    id: "precision",
    name: "Precision",
    tagline: "Blueprint corners + M",
    description:
      "Technical and modern. Pairs with the hero blueprint direction.",
    Mark: LogoPrecision,
    wordmark: true,
    wide: false,
  },
] as const;

export function LogoLockup({
  Mark,
  wide = false,
  variant = "light",
}: {
  Mark: (props: LogoProps) => ReactElement;
  wide?: boolean;
  variant?: "light" | "dark";
}) {
  const text = variant === "light" ? "text-navy" : "text-white";
  const sub = variant === "light" ? "text-muted" : "text-white/70";

  if (wide) {
    return <Mark className="h-14 w-auto max-w-full" />;
  }

  return (
    <div className="flex items-center gap-3">
      <Mark className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
      <div className="min-w-0">
        <p className={`font-display text-lg leading-tight sm:text-xl ${text}`}>
          Mainland
        </p>
        <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${sub}`}>
          Building Inspections
        </p>
      </div>
    </div>
  );
}

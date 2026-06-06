"use client";

import { getDronePosition, toFramePercent } from "@/lib/hero/scene-coords";

type HeroDroneProps = {
  riseRaw: number;
};

export function HeroDrone({ riseRaw }: HeroDroneProps) {
  const pos = toFramePercent(getDronePosition(riseRaw));
  const airborne = riseRaw > 0.12;
  const rot = riseRaw * 18;

  return (
    <div
      className="hero-drone pointer-events-none absolute z-[4] will-change-transform"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: `translate(-50%, -50%) rotate(${rot}deg)`,
        opacity: riseRaw > 0.02 ? 1 : 0,
      }}
      aria-hidden
    >
      <div
        className="hero-drone__body relative"
        style={{
          filter: airborne
            ? "drop-shadow(0 6px 12px rgba(0,0,0,0.45))"
            : "drop-shadow(0 2px 4px rgba(0,0,0,0.35))",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 36 36"
          fill="none"
          className={airborne ? "hero-drone__spin" : undefined}
        >
          <circle cx="18" cy="18" r="4" fill="#1a2332" />
          <circle cx="18" cy="18" r="2" fill="#60c4ff" opacity="0.8" />
          <line x1="6" y1="6" x2="14" y2="14" stroke="#2a3544" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="6" x2="22" y2="14" stroke="#2a3544" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="6" y1="30" x2="14" y2="22" stroke="#2a3544" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="30" x2="22" y2="22" stroke="#2a3544" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="6" cy="6" r="3" fill="#3d4a5c" className="hero-drone__arm" />
          <circle cx="30" cy="6" r="3" fill="#3d4a5c" className="hero-drone__arm hero-drone__arm--b" />
          <circle cx="6" cy="30" r="3" fill="#3d4a5c" className="hero-drone__arm hero-drone__arm--c" />
          <circle cx="30" cy="30" r="3" fill="#3d4a5c" className="hero-drone__arm hero-drone__arm--d" />
        </svg>
        {airborne && (
          <span className="hero-drone__ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </div>
  );
}

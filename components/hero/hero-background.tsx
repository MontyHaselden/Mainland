"use client";

type HeroBackgroundProps = {
  opacity?: number;
};

export function HeroBackground({ opacity = 1 }: HeroBackgroundProps) {
  return (
    <div
      className="fixed inset-0 z-0 transition-none"
      style={{
        opacity,
        pointerEvents: opacity < 0.05 ? "none" : "auto",
      }}
      aria-hidden
    >
      <div
        className="hero-bg-layer absolute inset-0"
        style={{
          backgroundImage: `var(--hero-image-url, linear-gradient(160deg, #3d5a80 0%, #1a2332 35%, #2d6a4f 55%, #588157 75%, #a3b18a 100%))`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/92 from-0% via-navy-deep/70 via-[38%] to-transparent to-[52%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 via-transparent to-navy-deep/30 md:hidden" />
    </div>
  );
}

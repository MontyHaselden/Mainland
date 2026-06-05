"use client";

type HeroBackgroundProps = {
  visible: boolean;
};

export function HeroBackground({ visible }: HeroBackgroundProps) {
  return (
    <div
      className={`fixed inset-0 z-0 transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden
    >
      {/* Placeholder aerial — replace with final art via --hero-image-url in globals.css */}
      <div
        className="hero-bg-layer absolute inset-0"
        style={{
          backgroundImage: `var(--hero-image-url, linear-gradient(160deg, #3d5a80 0%, #1a2332 35%, #2d6a4f 55%, #588157 75%, #a3b18a 100%))`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/75 via-navy-deep/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent md:hidden" />
    </div>
  );
}

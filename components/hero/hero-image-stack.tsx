"use client";

type HeroImageStackProps = {
  startSrc: string;
  endSrc: string;
  endOpacity: number;
  children?: React.ReactNode;
};

/**
 * Image pair + overlays share one frame with matching object-cover crop.
 */
export function HeroImageStack({
  startSrc,
  endSrc,
  endOpacity,
  children,
}: HeroImageStackProps) {
  const sharedClass =
    "hero-scene-img pointer-events-none absolute inset-0 h-full w-full object-cover";

  return (
    <div className="hero-scene-frame absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={startSrc}
        alt=""
        className={`${sharedClass} hero-scene-img--start`}
        draggable={false}
        width={1536}
        height={1024}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={endSrc}
        alt=""
        className={`${sharedClass} hero-scene-img--end`}
        draggable={false}
        width={1536}
        height={1024}
        style={{ opacity: endOpacity }}
      />
      {children}
    </div>
  );
}

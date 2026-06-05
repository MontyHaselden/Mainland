"use client";

import { InspectorPlaceholders } from "./inspector-placeholders";

type HeroAnimationPanelProps = {
  progress: number;
  opacity?: number;
};

export function HeroAnimationPanel({
  progress,
  opacity = 1,
}: HeroAnimationPanelProps) {
  return (
    <div
      className="pointer-events-none fixed inset-y-0 right-0 z-[5] w-[48%] sm:w-[52%] md:w-[55%] lg:w-[58%]"
      style={{
        opacity,
        pointerEvents: opacity < 0.05 ? "none" : "auto",
      }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-l from-accent/25 via-transparent to-transparent" />
      <InspectorPlaceholders progress={progress} />
    </div>
  );
}

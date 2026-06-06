"use client";

import { HeroScene } from "./hero-scene";

type HeroBackgroundProps = {
  scrollProgress?: number;
  riseRaw?: number;
  opacity?: number;
};

export function HeroBackground({
  scrollProgress = 0,
  riseRaw = 0,
  opacity = 1,
}: HeroBackgroundProps) {
  return (
    <HeroScene
      scrollProgress={scrollProgress}
      riseRaw={riseRaw}
      opacity={opacity}
    />
  );
}

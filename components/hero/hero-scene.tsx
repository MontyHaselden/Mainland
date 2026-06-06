"use client";

import { getHeroFrameBlend } from "@/lib/hero/frame-blend";
import { HeroDrone } from "./hero-drone";
import { HeroImageStack } from "./hero-image-stack";

type HeroSceneProps = {
  scrollProgress: number;
  riseRaw: number;
  opacity?: number;
};

/**
 * Locked frame stack + shared blueprint/drone layers — one coordinate system,
 * no independent drift between before/after.
 */
export function HeroScene({
  scrollProgress: _scrollProgress,
  riseRaw,
  opacity = 1,
}: HeroSceneProps) {
  const endFrameOpacity = getHeroFrameBlend(riseRaw);

  return (
    <div
      className="absolute inset-0 z-[1]"
      style={{
        opacity,
        pointerEvents: opacity < 0.05 ? "none" : "auto",
      }}
      aria-hidden
    >
      <div className="hero-scene-grade absolute inset-0">
        <HeroImageStack
          startSrc="/hero-base.jpg"
          endSrc="/hero-base-end.jpg"
          endOpacity={endFrameOpacity}
        >
          <HeroDrone riseRaw={riseRaw} />
        </HeroImageStack>
        <div className="hero-scene-blueprint-tint absolute inset-0" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/45 from-0% via-navy-deep/12 via-[32%] to-transparent to-[42%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/25 via-transparent to-transparent md:hidden" />
    </div>
  );
}

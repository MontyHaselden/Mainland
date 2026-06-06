import { HERO_FRAME_CUT } from "@/lib/hero/scene-coords";

/** 0 = start frame, 1 = end frame — instant swap, no fade */
export function getHeroFrameBlend(riseRaw: number): number {
  return riseRaw >= HERO_FRAME_CUT ? 1 : 0;
}

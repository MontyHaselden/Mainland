/** Scene anchors in 1536×1024 image space — matches hero render aspect ratio */

export const HERO_IMAGE_WIDTH = 1536;
export const HERO_IMAGE_HEIGHT = 1024;

export const HERO_OBJECT_POSITION = {
  mobile: "78% 40%",
  desktop: "58% 42%",
} as const;

export const HERO_FRAME_CUT = 0.38;

export type ScenePoint = { x: number; y: number };

export const DRONE_PATH = {
  ground: { x: 798, y: 738 },
  hover: { x: 768, y: 318 },
  liftStart: 0.08,
  liftEnd: 0.36,
} as const;

export type BlueprintCallout = {
  id: string;
  label: string;
  x: number;
  y: number;
  leaderX: number;
  leaderY: number;
};

export type BlueprintDimension = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  labelX: number;
  labelY: number;
};

export type BlueprintAngle = {
  id: string;
  cx: number;
  cy: number;
  label: string;
  labelX: number;
  labelY: number;
};

export const BLUEPRINT_CALLOUTS: BlueprintCallout[] = [
  {
    id: "roof",
    label: "Colorsteel corrugated iron roof",
    x: 930,
    y: 168,
    leaderX: 820,
    leaderY: 268,
  },
  {
    id: "cladding",
    label: "Weatherboard cladding",
    x: 1040,
    y: 468,
    leaderX: 940,
    leaderY: 498,
  },
  {
    id: "garage",
    label: "Attached garage",
    x: 1080,
    y: 568,
    leaderX: 1000,
    leaderY: 548,
  },
];

export const BLUEPRINT_DIMENSIONS: BlueprintDimension[] = [
  {
    id: "front",
    x1: 560,
    y1: 618,
    x2: 920,
    y2: 618,
    label: "11.2 m",
    labelX: 740,
    labelY: 598,
  },
  {
    id: "depth",
    x1: 920,
    y1: 618,
    x2: 980,
    y2: 498,
    label: "8.4 m",
    labelX: 968,
    labelY: 562,
  },
  {
    id: "garage",
    x1: 920,
    y1: 558,
    x2: 1060,
    y2: 558,
    label: "6.0 m",
    labelX: 990,
    labelY: 542,
  },
];

export const BLUEPRINT_ANGLES: BlueprintAngle[] = [
  {
    id: "pitch-main",
    cx: 760,
    cy: 318,
    label: "22°",
    labelX: 792,
    labelY: 302,
  },
];

export function lerpPoint(a: ScenePoint, b: ScenePoint, t: number): ScenePoint {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
}

export function getDronePosition(riseRaw: number): ScenePoint {
  const { ground, hover, liftStart, liftEnd } = DRONE_PATH;
  if (riseRaw <= liftStart) return ground;
  if (riseRaw >= liftEnd) return hover;
  const t = (riseRaw - liftStart) / (liftEnd - liftStart);
  const eased = t * t * (3 - 2 * t);
  return lerpPoint(ground, hover, eased);
}

/** Map image-space coords to % within the object-cover frame */
export function toFramePercent(point: ScenePoint): ScenePoint {
  return {
    x: (point.x / HERO_IMAGE_WIDTH) * 100,
    y: (point.y / HERO_IMAGE_HEIGHT) * 100,
  };
}

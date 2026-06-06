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

/** label = pill position; leader = point on building feature */
export type BlueprintCallout = {
  id: string;
  label: string;
  x: number;
  y: number;
  leaderX: number;
  leaderY: number;
};

export const BLUEPRINT_CALLOUTS: BlueprintCallout[] = [
  {
    id: "colorsteel",
    label: "Colorsteel roofing",
    x: 1055,
    y: 165,
    leaderX: 962,
    leaderY: 282,
  },
  {
    id: "trusses",
    label: "Timber trusses",
    x: 1008,
    y: 248,
    leaderX: 736,
    leaderY: 302,
  },
  {
    id: "weatherboard",
    label: "Weatherboard cladding",
    x: 1038,
    y: 462,
    leaderX: 1002,
    leaderY: 542,
  },
  {
    id: "double-glazing",
    label: "Double glazing",
    x: 728,
    y: 672,
    leaderX: 636,
    leaderY: 430,
  },
  {
    id: "joinery",
    label: "Aluminium joinery",
    x: 512,
    y: 608,
    leaderX: 660,
    leaderY: 466,
  },
  {
    id: "driveway",
    label: "Exposed aggregate",
    x: 408,
    y: 862,
    leaderX: 578,
    leaderY: 798,
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

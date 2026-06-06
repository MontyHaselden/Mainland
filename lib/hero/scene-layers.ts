/** Inspector layer slots — separate PNG assets can replace baked-in base later */

export type InspectorLayerId =
  | "ladder"
  | "ipad"
  | "garage-moisture"
  | "roof-torch"
  | "drone-operator"
  | "drone";

export type InspectorLayerConfig = {
  id: InspectorLayerId;
  /** Percent position within the hero scene (matches future split art) */
  anchorX: number;
  anchorY: number;
  /** Scroll progress (0–1) when this layer starts animating */
  animateFrom: number;
};

export const INSPECTOR_LAYERS: InspectorLayerConfig[] = [
  { id: "ipad", anchorX: 22, anchorY: 78, animateFrom: 0.35 },
  { id: "drone-operator", anchorX: 46, anchorY: 58, animateFrom: 0.36 },
  { id: "drone", anchorX: 46, anchorY: 62, animateFrom: 0.36 },
  { id: "ladder", anchorX: 14, anchorY: 42, animateFrom: 0.4 },
  { id: "roof-torch", anchorX: 48, anchorY: 28, animateFrom: 0.45 },
  { id: "garage-moisture", anchorX: 82, anchorY: 52, animateFrom: 0.42 },
];

"use client";

import {
  BLUEPRINT_CALLOUTS,
  HERO_IMAGE_HEIGHT,
  HERO_IMAGE_WIDTH,
} from "@/lib/hero/scene-coords";

const STROKE = "rgba(140, 215, 255, 0.82)";
const LEADER = "rgba(140, 215, 255, 0.38)";
const DOT = "rgba(140, 215, 255, 0.7)";
const LABEL_BG = "rgba(8, 14, 24, 0.8)";
const LABEL_BORDER = "rgba(140, 215, 255, 0.28)";

function labelWidth(text: string): number {
  return text.length * 6.4 + 18;
}

export function HeroBlueprintOverlay() {
  return (
    <svg
      className="hero-blueprint-svg pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${HERO_IMAGE_WIDTH} ${HERO_IMAGE_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {BLUEPRINT_CALLOUTS.map((callout) => {
        const w = labelWidth(callout.label);
        const h = 22;
        const labelLeft = callout.x;
        const labelTop = callout.y - h / 2;
        const labelOnRight = callout.x > callout.leaderX;
        const lineEndX = labelOnRight ? labelLeft : labelLeft + w;
        const lineEndY = callout.y;

        return (
          <g key={callout.id}>
            <line
              x1={callout.leaderX}
              y1={callout.leaderY}
              x2={lineEndX}
              y2={lineEndY}
              stroke={LEADER}
              strokeWidth="1"
            />
            <circle cx={callout.leaderX} cy={callout.leaderY} r="2.5" fill={DOT} />
            <rect
              x={labelLeft}
              y={labelTop}
              width={w}
              height={h}
              rx="3"
              fill={LABEL_BG}
              stroke={LABEL_BORDER}
              strokeWidth="0.75"
            />
            <text
              x={labelLeft + w / 2}
              y={callout.y + 4}
              fill={STROKE}
              fontSize="11"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              textAnchor="middle"
            >
              {callout.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

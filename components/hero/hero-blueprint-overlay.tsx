"use client";

import {
  BLUEPRINT_ANGLES,
  BLUEPRINT_CALLOUTS,
  BLUEPRINT_DIMENSIONS,
  HERO_IMAGE_HEIGHT,
  HERO_IMAGE_WIDTH,
} from "@/lib/hero/scene-coords";

const STROKE = "rgba(110, 210, 255, 0.9)";
const STROKE_DIM = "rgba(110, 210, 255, 0.5)";
const LABEL_BG = "rgba(10, 18, 28, 0.88)";

function DimensionLine({
  x1,
  y1,
  x2,
  y2,
  label,
  labelX,
  labelY,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  labelX: number;
  labelY: number;
}) {
  const ext = 18;
  const isHorizontal = Math.abs(y2 - y1) < Math.abs(x2 - x1);

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE_DIM} strokeWidth="1.5" />
      {isHorizontal ? (
        <>
          <line x1={x1} y1={y1} x2={x1} y2={y1 - ext} stroke={STROKE_DIM} strokeWidth="1.5" />
          <line x1={x2} y1={y2} x2={x2} y2={y2 - ext} stroke={STROKE_DIM} strokeWidth="1.5" />
        </>
      ) : (
        <>
          <line x1={x1} y1={y1} x2={x1 + ext} y2={y1} stroke={STROKE_DIM} strokeWidth="1.5" />
          <line x1={x2} y1={y2} x2={x2 + ext} y2={y2} stroke={STROKE_DIM} strokeWidth="1.5" />
        </>
      )}
      <rect
        x={labelX - 34}
        y={labelY - 12}
        width="68"
        height="22"
        rx="4"
        fill={LABEL_BG}
      />
      <text
        x={labelX}
        y={labelY + 4}
        fill={STROKE}
        fontSize="13"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

export function HeroBlueprintOverlay() {
  return (
    <svg
      className="hero-blueprint-svg pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${HERO_IMAGE_WIDTH} ${HERO_IMAGE_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern
          id="hero-bp-grid"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="rgba(110, 210, 255, 0.07)"
            strokeWidth="0.75"
          />
        </pattern>
      </defs>
      <rect width={HERO_IMAGE_WIDTH} height={HERO_IMAGE_HEIGHT} fill="url(#hero-bp-grid)" />

      {BLUEPRINT_DIMENSIONS.map((dim) => (
        <DimensionLine
          key={dim.id}
          x1={dim.x1}
          y1={dim.y1}
          x2={dim.x2}
          y2={dim.y2}
          label={dim.label}
          labelX={dim.labelX}
          labelY={dim.labelY}
        />
      ))}

      {BLUEPRINT_ANGLES.map((angle) => (
        <g key={angle.id}>
          <path
            d={`M ${angle.cx - 22} ${angle.cy + 10} A 24 24 0 0 1 ${angle.cx + 14} ${angle.cy - 16}`}
            fill="none"
            stroke={STROKE_DIM}
            strokeWidth="1.5"
          />
          <text
            x={angle.labelX}
            y={angle.labelY}
            fill={STROKE}
            fontSize="13"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {angle.label}
          </text>
        </g>
      ))}

      {BLUEPRINT_CALLOUTS.map((callout) => {
        const labelW = callout.label.length * 7.2 + 20;
        return (
          <g key={callout.id}>
            <line
              x1={callout.leaderX}
              y1={callout.leaderY}
              x2={callout.x}
              y2={callout.y}
              stroke={STROKE}
              strokeWidth="1.5"
            />
            <circle cx={callout.leaderX} cy={callout.leaderY} r="4" fill={STROKE} />
            <rect
              x={callout.x}
              y={callout.y - 14}
              width={labelW}
              height="26"
              rx="4"
              fill={LABEL_BG}
              stroke={STROKE}
              strokeWidth="1"
            />
            <text
              x={callout.x + 10}
              y={callout.y + 4}
              fill={STROKE}
              fontSize="12"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {callout.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

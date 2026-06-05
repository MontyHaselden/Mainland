"use client";

type InspectorPlaceholdersProps = {
  progress: number;
};

/** Positions within the right-hand animation panel (percent of panel) */
const INSPECTORS = [
  { id: 1, label: "Roof", startX: 42, startY: 22, endX: 38, endY: 26 },
  { id: 2, label: "Moisture", startX: 68, startY: 58, endX: 64, endY: 54 },
  { id: 3, label: "Exterior", startX: 28, startY: 65, endX: 32, endY: 60 },
  { id: 4, label: "Ladder", startX: 52, startY: 42, endX: 56, endY: 40 },
  { id: 5, label: "Notes", startX: 18, startY: 48, endX: 22, endY: 44 },
  { id: 6, label: "Thermal", startX: 78, startY: 36, endX: 74, endY: 32 },
];

export function InspectorPlaceholders({ progress }: InspectorPlaceholdersProps) {
  const opacity = Math.min(1, progress * 2);
  const scale = 0.85 + progress * 0.15;

  return (
    <div
      className="absolute inset-0 transition-opacity duration-150"
      style={{ opacity }}
    >
      {INSPECTORS.map((inspector) => {
        const x =
          inspector.startX + (inspector.endX - inspector.startX) * progress;
        const y =
          inspector.startY + (inspector.endY - inspector.startY) * progress;
        return (
          <div
            key={inspector.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          >
            <div className="h-8 w-8 rounded-full border-2 border-white/80 bg-accent/90 shadow-lg md:h-10 md:w-10" />
            <span className="mt-1 hidden rounded bg-navy/70 px-1.5 py-0.5 text-[10px] font-medium text-white md:block">
              {inspector.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

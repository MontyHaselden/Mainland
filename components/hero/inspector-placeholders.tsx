"use client";

type InspectorPlaceholdersProps = {
  progress: number;
};

const INSPECTORS = [
  { id: 1, label: "Roof", startX: 72, startY: 18, endX: 68, endY: 22 },
  { id: 2, label: "Moisture", startX: 78, startY: 55, endX: 74, endY: 52 },
  { id: 3, label: "Exterior", startX: 58, startY: 62, endX: 62, endY: 58 },
  { id: 4, label: "Ladder", startX: 65, startY: 40, endX: 70, endY: 38 },
  { id: 5, label: "Notes", startX: 52, startY: 48, endX: 55, endY: 45 },
  { id: 6, label: "Thermal", startX: 82, startY: 35, endX: 79, endY: 32 },
];

export function InspectorPlaceholders({ progress }: InspectorPlaceholdersProps) {
  const opacity = Math.min(1, progress * 2);
  const scale = 0.85 + progress * 0.15;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-150"
      style={{ opacity }}
      aria-hidden
    >
      {INSPECTORS.map((inspector) => {
        const x = inspector.startX + (inspector.endX - inspector.startX) * progress;
        const y = inspector.startY + (inspector.endY - inspector.startY) * progress;
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

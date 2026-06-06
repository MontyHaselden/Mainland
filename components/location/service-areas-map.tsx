import { SERVICE_AREA_MAP_EMBED } from "@/lib/seo/business";

type ServiceAreasMapProps = {
  title?: string;
  className?: string;
};

export function ServiceAreasMap({
  title = "Mainland Building Inspections service area across Christchurch and Canterbury",
  className = "",
}: ServiceAreasMapProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${className}`}
    >
      <iframe
        title={title}
        src={SERVICE_AREA_MAP_EMBED}
        className="aspect-[16/9] w-full min-h-[280px] border-0 md:min-h-[420px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

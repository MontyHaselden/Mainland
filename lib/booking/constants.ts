export const NZ_TIMEZONE = "Pacific/Auckland";

export const BOOKING_SLOTS = ["morning", "afternoon"] as const;
export type BookingSlot = (typeof BOOKING_SLOTS)[number];

export const SLOT_LABELS: Record<BookingSlot, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
};

export const SLOT_SUBLABELS: Record<BookingSlot, string> = {
  morning: "Typically before 12pm",
  afternoon: "Typically after 12pm",
};

export type AvailabilityStatus = "green" | "orange" | "red";

export const AVAILABILITY_COLORS: Record<
  AvailabilityStatus,
  { bg: string; ring: string; label: string }
> = {
  green: {
    bg: "bg-[var(--availability-green)]",
    ring: "ring-[var(--availability-green)]",
    label: "2 slots available",
  },
  orange: {
    bg: "bg-[var(--availability-orange)]",
    ring: "ring-[var(--availability-orange)]",
    label: "1 slot remaining",
  },
  red: {
    bg: "bg-[var(--availability-red)]",
    ring: "ring-[var(--availability-red)]",
    label: "Fully booked",
  },
};

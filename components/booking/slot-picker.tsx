"use client";

import {
  BOOKING_SLOTS,
  SLOT_LABELS,
  SLOT_SUBLABELS,
  type BookingSlot,
} from "@/lib/booking/constants";
import { isSlotAvailable } from "@/lib/booking/availability";
import type { DayAvailability } from "@/lib/booking/types";
import { format, parseISO } from "date-fns";

type SlotPickerProps = {
  day: DayAvailability;
  selectedSlot: BookingSlot | null;
  onSelect: (slot: BookingSlot) => void;
};

export function SlotPicker({ day, onSelect }: SlotPickerProps) {
  const dateLabel = format(parseISO(day.date), "EEEE, d MMMM yyyy");

  return (
    <div className="flex h-full flex-col">
      <p className="mb-3 shrink-0 text-sm text-muted">{dateLabel}</p>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
        {BOOKING_SLOTS.map((slot) => {
          const available = isSlotAvailable(day, slot);
          return (
            <button
              key={slot}
              type="button"
              disabled={!available}
              onClick={() => available && onSelect(slot)}
              className={`flex h-full min-h-[8rem] flex-col justify-center rounded-xl border px-4 py-4 text-left transition-colors ${
                available
                  ? "border-border bg-background hover:border-accent hover:ring-2 hover:ring-accent/20"
                  : "cursor-not-allowed border-border/50 bg-background/50 opacity-50"
              }`}
            >
              <span className="block font-semibold text-navy">
                {SLOT_LABELS[slot]}
              </span>
              <span className="mt-1 block text-xs text-muted">
                {available ? SLOT_SUBLABELS[slot] : "Booked"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

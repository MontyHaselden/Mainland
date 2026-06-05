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
    <div>
      <p className="mb-4 text-sm text-muted">{dateLabel}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {BOOKING_SLOTS.map((slot) => {
          const available = isSlotAvailable(day, slot);
          return (
            <button
              key={slot}
              type="button"
              disabled={!available}
              onClick={() => available && onSelect(slot)}
              className={`rounded-xl border p-4 text-left transition-colors ${
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

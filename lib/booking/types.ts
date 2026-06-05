import type { AvailabilityStatus } from "./constants";
import type { BookingSlot } from "./constants";

export type DayAvailability = {
  date: string;
  morningAvailable: boolean;
  afternoonAvailable: boolean;
  status: AvailabilityStatus;
  bookedSlots: BookingSlot[];
};

export type MonthAvailabilityResponse = {
  month: string;
  days: DayAvailability[];
};

export type CreateBookingPayload = {
  inspectionDate: string;
  slot: BookingSlot;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  propertyAddress: string;
  notes?: string;
  agentName?: string;
};

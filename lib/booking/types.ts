import type { AvailabilityStatus } from "./constants";
import type { BookingSlot } from "./constants";
import type {
  DecadeBuilt,
  PropertyType,
  StoreyOption,
} from "./property-options";

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

export type StaffCalendarBooking = {
  id: string;
  slot: BookingSlot;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  propertyAddress: string;
  notes: string | null;
  agentName: string | null;
  acknowledgedAt: string | null;
};

export type StaffCalendarDaySummary = {
  date: string;
  morningBooked: boolean;
  afternoonBooked: boolean;
  morningBlocked: boolean;
  afternoonBlocked: boolean;
  morningAvailable: boolean;
  afternoonAvailable: boolean;
  status: AvailabilityStatus;
  bookingCount: number;
};

export type StaffCalendarDayDetail = StaffCalendarDaySummary & {
  bookings: StaffCalendarBooking[];
};

export type StaffCalendarMonthResponse = {
  month: string;
  days: StaffCalendarDaySummary[];
};

export type PropertyDetailsInput = {
  streetAddress: string;
  suburb: string;
  city: string;
  floorAreaSqm: number | null;
  decadeBuilt: DecadeBuilt;
  propertyType: PropertyType;
  storeys: StoreyOption;
};

export type CreateBookingPayload = {
  inspectionDate: string;
  slot: BookingSlot;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  propertyAddress: string;
  propertySuburb: string;
  propertyCity: string;
  floorAreaSqm: number | null;
  decadeBuilt: DecadeBuilt;
  propertyType: PropertyType;
  storeys: StoreyOption;
  estimatedPrice?: number | null;
  reviewFlags?: string[];
  notes?: string;
};

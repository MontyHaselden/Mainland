export const BOOKING_STATUSES = [
  "pending_review",
  "price_confirmed",
  "booking_confirmed",
  "completed",
  "cancelled",
  /** @deprecated Legacy confirmed bookings */
  "confirmed",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending_review: "Pending Review",
  price_confirmed: "Price Confirmed",
  booking_confirmed: "Booking Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  confirmed: "Booking Confirmed",
};

/** Statuses that reserve a calendar slot */
export const SLOT_HOLDING_STATUSES: BookingStatus[] = [
  "pending_review",
  "price_confirmed",
  "booking_confirmed",
  "completed",
  "confirmed",
];

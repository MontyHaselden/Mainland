"use client";

import { useCallback, useState } from "react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  NZ_TIMEZONE,
  type BookingSlot,
} from "@/lib/booking/constants";
import type {
  CreateBookingPayload,
  DayAvailability,
  MonthAvailabilityResponse,
} from "@/lib/booking/types";
import { DateCalendar } from "./date-calendar";
import { SlotPicker } from "./slot-picker";
import { CustomerForm } from "./customer-form";
import { ConfirmStep } from "./confirm-step";

type Step = "date" | "slot" | "details" | "confirm" | "success";

/** Fixed body height — all steps match the calendar step */
export const BOOKING_STEP_BODY_CLASS = "h-[24.5rem]";

function getNzMonth(): string {
  return format(toZonedTime(new Date(), NZ_TIMEZONE), "yyyy-MM");
}

type BookingWizardProps = {
  embedded?: boolean;
  initialMonth?: string;
  initialDays?: DayAvailability[];
};

function WizardHeader({
  showBack,
  onBack,
}: {
  showBack: boolean;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="font-display text-xl text-navy sm:text-2xl">
        Book an inspection
      </h2>
      {showBack ? (
        <Button
          type="button"
          variant="ghost"
          className="min-h-10 shrink-0 px-3 text-sm"
          onClick={onBack}
        >
          ← Back
        </Button>
      ) : (
        <span className="w-[4.5rem] shrink-0" aria-hidden />
      )}
    </div>
  );
}

export function BookingWizard({
  embedded = false,
  initialMonth,
  initialDays,
}: BookingWizardProps) {
  const [step, setStep] = useState<Step>("date");
  const [month, setMonth] = useState(initialMonth ?? getNzMonth());
  const [availability, setAvailability] = useState<DayAvailability[]>(
    initialDays ?? []
  );
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    propertyAddress: "",
    notes: "",
    agentName: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const loadMonth = useCallback(async (m: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/availability?month=${m}`);
      if (!res.ok) throw new Error("Could not load availability");
      const data: MonthAvailabilityResponse = await res.json();
      setAvailability(data.days);
    } catch {
      setError("Unable to load calendar. Please try again.");
    } finally {
      setLoadingMonth(false);
    }
  }, []);

  function handleMonthChange(m: string) {
    setMonth(m);
    setLoadingMonth(true);
    void loadMonth(m);
  }

  function handleBack() {
    if (step === "slot") setStep("date");
    else if (step === "details") setStep("slot");
    else if (step === "confirm") setStep("details");
  }

  const selectedDay = availability.find((d) => d.date === selectedDate);

  async function handleSubmit() {
    if (!selectedDate || !selectedSlot) return;
    setSubmitting(true);
    setError(null);
    const payload: CreateBookingPayload = {
      inspectionDate: selectedDate,
      slot: selectedSlot,
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      customerPhone: form.customerPhone,
      propertyAddress: form.propertyAddress,
      notes: form.notes || undefined,
      agentName: form.agentName || undefined,
    };
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Booking failed");
        return;
      }
      setBookingId(data.booking.id);
      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const cardClass = embedded
    ? "w-full border-white/20 bg-surface shadow-2xl shadow-navy/15 backdrop-blur-none"
    : "mx-auto w-full max-w-2xl";

  if (step === "success") {
    return (
      <Card className={cardClass}>
        <h2 className="font-display text-2xl text-navy">You&apos;re booked</h2>
        <p className="mt-2 text-muted">
          Your inspection is confirmed. A confirmation email has been sent to{" "}
          {form.customerEmail}.
        </p>
        {bookingId && (
          <p className="mt-4 text-xs text-muted">Reference: {bookingId}</p>
        )}
      </Card>
    );
  }

  return (
    <Card className={cardClass}>
      <WizardHeader showBack={step !== "date"} onBack={handleBack} />

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className={`mt-4 w-full ${BOOKING_STEP_BODY_CLASS}`}>
        {step === "date" && availability.length === 0 && !loadingMonth && (
          <div className="flex h-full items-center justify-center">
            <Button
              type="button"
              variant="secondary"
              className="w-full max-w-xs"
              onClick={() => {
                setLoadingMonth(true);
                void loadMonth(month);
              }}
            >
              Load availability
            </Button>
          </div>
        )}

        {step === "date" && (availability.length > 0 || loadingMonth) && (
          <DateCalendar
            month={month}
            days={availability}
            loading={loadingMonth}
            selectedDate={selectedDate}
            onMonthChange={handleMonthChange}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setSelectedSlot(null);
              setStep("slot");
            }}
          />
        )}

        {step === "slot" && selectedDay && (
          <SlotPicker
            day={selectedDay}
            selectedSlot={selectedSlot}
            onSelect={(s) => {
              setSelectedSlot(s);
              setStep("details");
            }}
          />
        )}

        {step === "details" && (
          <CustomerForm
            values={form}
            onChange={setForm}
            onContinue={() => setStep("confirm")}
          />
        )}

        {step === "confirm" && selectedDate && selectedSlot && (
          <ConfirmStep
            date={selectedDate}
            slot={selectedSlot}
            form={form}
            onConfirm={handleSubmit}
            submitting={submitting}
          />
        )}
      </div>
    </Card>
  );
}

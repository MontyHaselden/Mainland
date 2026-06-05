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

function getNzMonth(): string {
  return format(toZonedTime(new Date(), NZ_TIMEZONE), "yyyy-MM");
}

type BookingWizardProps = {
  embedded?: boolean;
  initialMonth?: string;
  initialDays?: DayAvailability[];
};

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

  if (step === "success") {
    return (
      <Card className={embedded ? "" : "mx-auto max-w-lg"}>
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
    <Card className={embedded ? "" : "mx-auto max-w-lg"}>
      <div className="mb-6 flex items-center justify-between gap-2">
        <h2 className="font-display text-xl text-navy sm:text-2xl">
          Book an inspection
        </h2>
        <StepIndicator step={step} />
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      {step === "date" && availability.length === 0 && !loadingMonth && (
        <div className="mb-4">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => {
              setLoadingMonth(true);
              void loadMonth(month);
            }}
          >
            Load availability
          </Button>
        </div>
      )}

      {step === "date" && (
        <>
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
        </>
      )}

      {step === "slot" && selectedDay && (
        <>
          <button
            type="button"
            className="mb-4 text-sm text-accent hover:underline"
            onClick={() => setStep("date")}
          >
            ← Change date
          </button>
          <SlotPicker
            day={selectedDay}
            selectedSlot={selectedSlot}
            onSelect={(s) => {
              setSelectedSlot(s);
              setStep("details");
            }}
          />
        </>
      )}

      {step === "details" && (
        <>
          <button
            type="button"
            className="mb-4 text-sm text-accent hover:underline"
            onClick={() => setStep("slot")}
          >
            ← Change slot
          </button>
          <CustomerForm
            values={form}
            onChange={setForm}
            onContinue={() => setStep("confirm")}
          />
        </>
      )}

      {step === "confirm" && selectedDate && selectedSlot && (
        <ConfirmStep
          date={selectedDate}
          slot={selectedSlot}
          form={form}
          onBack={() => setStep("details")}
          onConfirm={handleSubmit}
          submitting={submitting}
        />
      )}
    </Card>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: Step[] = ["date", "slot", "details", "confirm"];
  const idx = steps.indexOf(step);
  if (idx < 0) return null;
  return (
    <span className="text-xs font-medium text-muted">
      {idx + 1} / {steps.length}
    </span>
  );
}

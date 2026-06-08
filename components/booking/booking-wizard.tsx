"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { addMonths, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  createAvailabilityLoader,
  type AvailabilitySource,
} from "@/lib/booking/availability-source";
import {
  NZ_TIMEZONE,
  type BookingSlot,
} from "@/lib/booking/constants";
import { INSPECTION_FROM_PRICE } from "@/lib/seo/business";
import type { StandardPricingTier } from "@/lib/pricing/standard-inspections";
import type {
  CreateBookingPayload,
  DayAvailability,
} from "@/lib/booking/types";
import { BookingSuccess } from "./booking-success";
import { ConfirmStep } from "./confirm-step";
import { CustomerForm } from "./customer-form";
import { DateCalendar } from "./date-calendar";
import { PackagePicker } from "./package-picker";
import { SlotPicker } from "./slot-picker";

type Step = "date" | "slot" | "package" | "details" | "confirm" | "success";

export type BookingWizardVariant = "homepage" | "page" | "embedded";
export type BookingSubmitMode = "preview" | "live";

/** Fixed body height — calendar and most steps; package scrolls on small screens */
export const BOOKING_STEP_BODY_CLASS = "min-h-[24.5rem]";

const STEPS: { id: Step; label: string }[] = [
  { id: "date", label: "Date" },
  { id: "slot", label: "Time" },
  { id: "package", label: "Package" },
  { id: "details", label: "Details" },
  { id: "confirm", label: "Confirm" },
];

function getNzMonth(): string {
  return format(toZonedTime(new Date(), NZ_TIMEZONE), "yyyy-MM");
}

function getNzNextMonth(month: string): string {
  return format(
    addMonths(toZonedTime(parseMonth(month), NZ_TIMEZONE), 1),
    "yyyy-MM",
  );
}

function parseMonth(month: string): Date {
  return new Date(`${month}-01T12:00:00`);
}

type BookingWizardProps = {
  variant?: BookingWizardVariant;
  submitMode?: BookingSubmitMode;
  availabilitySource?: AvailabilitySource;
  /** @deprecated Use availabilitySource instead */
  embedded?: boolean;
  initialMonth?: string;
  initialDays?: DayAvailability[];
};

function WizardHeader({
  showBack,
  onBack,
  variant,
}: {
  showBack: boolean;
  onBack: () => void;
  variant: BookingWizardVariant;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <h2 className="font-display text-xl text-navy sm:text-2xl">
          Book an inspection
        </h2>
        {variant === "embedded" ? (
          <p className="mt-0.5 text-sm text-muted">
            Pre-purchase inspection · From ${INSPECTION_FROM_PRICE}
          </p>
        ) : variant === "homepage" ? (
          <p className="mt-0.5 text-sm text-muted">
            Select a date, time and package to request your inspection
          </p>
        ) : null}
      </div>
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

function StepIndicator({ step }: { step: Step }) {
  const activeIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <ol className="mt-4 flex gap-1 overflow-x-auto pb-1">
      {STEPS.map((s, index) => {
        const isActive = s.id === step;
        const isComplete = index < activeIndex;
        return (
          <li
            key={s.id}
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isActive
                ? "bg-accent text-white"
                : isComplete
                  ? "bg-accent/10 text-accent"
                  : "bg-border/40 text-muted"
            }`}
          >
            {s.label}
          </li>
        );
      })}
    </ol>
  );
}

export function BookingWizard({
  variant: variantProp,
  submitMode = "live",
  availabilitySource = "api",
  embedded = false,
  initialMonth,
  initialDays,
}: BookingWizardProps) {
  const variant: BookingWizardVariant =
    variantProp ?? (embedded ? "embedded" : "page");

  const currentMonth = initialMonth ?? getNzMonth();
  const nextMonth = getNzNextMonth(currentMonth);

  const [step, setStep] = useState<Step>("date");
  const [currentDays, setCurrentDays] = useState<DayAvailability[]>(
    initialDays ?? [],
  );
  const [nextDays, setNextDays] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [selectedTier, setSelectedTier] = useState<StandardPricingTier | null>(
    null,
  );
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

  const loadAvailability = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const loader = createAvailabilityLoader(availabilitySource);
      const [current, next] = await Promise.all([
        loader(currentMonth),
        loader(nextMonth),
      ]);
      setCurrentDays(current);
      setNextDays(next);
    } catch {
      setError("Unable to load calendar. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [availabilitySource, currentMonth, nextMonth]);

  useEffect(() => {
    void loadAvailability();
  }, [loadAvailability]);

  const allDays = useMemo(
    () => [...currentDays, ...nextDays],
    [currentDays, nextDays],
  );

  const selectedDay = allDays.find((d) => d.date === selectedDate);

  function handleBack() {
    if (step === "slot") setStep("date");
    else if (step === "package") setStep("slot");
    else if (step === "details") setStep("package");
    else if (step === "confirm") setStep("details");
  }

  async function handleSubmit() {
    if (!selectedDate || !selectedSlot || !selectedTier) return;
    setSubmitting(true);
    setError(null);

    if (submitMode === "preview") {
      await new Promise((r) => setTimeout(r, 400));
      setStep("success");
      setSubmitting(false);
      return;
    }

    const payload: CreateBookingPayload = {
      inspectionDate: selectedDate,
      slot: selectedSlot,
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      customerPhone: form.customerPhone,
      propertyAddress: form.propertyAddress,
      notes: form.notes || undefined,
      agentName: form.agentName || undefined,
      pricingTierLabel: selectedTier.sizeLabel,
      price: selectedTier.price ?? undefined,
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

  const cardClass =
    variant === "embedded"
      ? "w-full border-white/20 bg-surface shadow-2xl shadow-navy/15 backdrop-blur-none"
      : variant === "homepage"
        ? "w-full border-border bg-surface shadow-lg shadow-navy/5"
        : "mx-auto w-full max-w-2xl";

  if (step === "success") {
    return (
      <BookingSuccess
        mode={submitMode}
        customerEmail={form.customerEmail}
        bookingId={bookingId}
        className={cardClass}
      />
    );
  }

  const stepBodyClass =
    step === "package"
      ? `${BOOKING_STEP_BODY_CLASS} h-auto sm:h-[24.5rem]`
      : `h-[24.5rem] ${BOOKING_STEP_BODY_CLASS}`;

  return (
    <Card className={cardClass}>
      <WizardHeader
        showBack={step !== "date"}
        onBack={handleBack}
        variant={variant}
      />
      <StepIndicator step={step} />

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className={`mt-4 w-full ${stepBodyClass}`}>
        {step === "date" && (
          <DateCalendar
            currentMonth={currentMonth}
            nextMonth={nextMonth}
            currentDays={currentDays}
            nextDays={nextDays}
            loading={loading}
            selectedDate={selectedDate}
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
              setStep("package");
            }}
          />
        )}

        {step === "package" && (
          <div className="flex h-full min-h-0 flex-col">
            <PackagePicker
              selectedTier={selectedTier}
              onSelect={(tier) => {
                setSelectedTier(tier);
                setStep("details");
              }}
            />
          </div>
        )}

        {step === "details" && (
          <CustomerForm
            values={form}
            onChange={setForm}
            onContinue={() => setStep("confirm")}
          />
        )}

        {step === "confirm" && selectedDate && selectedSlot && selectedTier && (
          <ConfirmStep
            date={selectedDate}
            slot={selectedSlot}
            tier={selectedTier}
            form={form}
            onConfirm={handleSubmit}
            submitting={submitting}
          />
        )}
      </div>
    </Card>
  );
}

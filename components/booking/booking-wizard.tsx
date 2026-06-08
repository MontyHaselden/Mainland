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
import { DEFAULT_PRICING_RULES } from "@/lib/booking/default-pricing-rules";
import { evaluatePricing } from "@/lib/booking/pricing-engine";
import type { PricingRulesConfig } from "@/lib/booking/pricing-rules-types";
import { formatFullPropertyAddress } from "@/lib/booking/property-options";
import { INSPECTION_FROM_PRICE } from "@/lib/seo/business";
import type {
  CreateBookingPayload,
  DayAvailability,
  PropertyDetailsInput,
} from "@/lib/booking/types";
import { BookingSuccess } from "./booking-success";
import { ConfirmStep } from "./confirm-step";
import {
  CustomerForm,
  type CustomerFormValues,
} from "./customer-form";
import { DateCalendar } from "./date-calendar";
import { PricingDisplayStep } from "./pricing-display-step";
import {
  PropertyAddressStep,
  type PropertyAddressValues,
} from "./property-address-step";
import {
  PropertyDetailsStep,
  type PropertyDetailsValues,
} from "./property-details-step";
import { SlotPicker } from "./slot-picker";

type Step =
  | "date"
  | "slot"
  | "address"
  | "property"
  | "pricing"
  | "customer"
  | "confirm"
  | "success";

export type BookingWizardVariant = "homepage" | "page" | "embedded";
export type BookingSubmitMode = "preview" | "live";

export const BOOKING_STEP_BODY_CLASS = "min-h-[24.5rem]";

const STEPS: { id: Step; label: string }[] = [
  { id: "date", label: "Schedule" },
  { id: "address", label: "Address" },
  { id: "property", label: "Property" },
  { id: "pricing", label: "Pricing" },
  { id: "customer", label: "Details" },
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
        ) : (
          <p className="mt-0.5 text-sm text-muted">
            Choose a date, tell us about the property, and request your
            inspection
          </p>
        )}
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
  const stepOrder: Step[] = [
    "date",
    "slot",
    "address",
    "property",
    "pricing",
    "customer",
    "confirm",
  ];
  const activeIndex = stepOrder.indexOf(step);

  return (
    <ol className="mt-4 flex gap-1 overflow-x-auto pb-1">
      {STEPS.map((s, index) => {
        const stepIds: Step[] =
          s.id === "date"
            ? ["date", "slot"]
            : s.id === "address"
              ? ["address"]
              : s.id === "property"
                ? ["property"]
                : s.id === "pricing"
                  ? ["pricing"]
                  : s.id === "customer"
                    ? ["customer"]
                    : ["confirm"];
        const isActive = stepIds.includes(step);
        const isComplete = stepOrder.indexOf(stepIds[stepIds.length - 1]) < activeIndex;
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
  const [pricingRules, setPricingRules] =
    useState<PricingRulesConfig>(DEFAULT_PRICING_RULES);
  const [currentDays, setCurrentDays] = useState<DayAvailability[]>(
    initialDays ?? [],
  );
  const [nextDays, setNextDays] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [address, setAddress] = useState<PropertyAddressValues>({
    streetAddress: "",
    suburb: "",
    city: "",
  });
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetailsValues>(
    {
      floorAreaSqm: undefined,
      decadeBuilt: "",
      propertyType: "",
      storeys: "",
    },
  );
  const [customer, setCustomer] = useState<CustomerFormValues>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/pricing-rules")
      .then((res) => res.json())
      .then((data: { rules?: PricingRulesConfig }) => {
        if (data.rules) setPricingRules(data.rules);
      })
      .catch(() => {
        /* defaults already loaded */
      });
  }, []);

  const propertyInput = useMemo((): PropertyDetailsInput | null => {
    if (
      propertyDetails.floorAreaSqm === undefined ||
      !propertyDetails.decadeBuilt ||
      !propertyDetails.propertyType ||
      !propertyDetails.storeys
    ) {
      return null;
    }
    return {
      streetAddress: address.streetAddress,
      suburb: address.suburb,
      city: address.city,
      floorAreaSqm: propertyDetails.floorAreaSqm,
      decadeBuilt: propertyDetails.decadeBuilt,
      propertyType: propertyDetails.propertyType,
      storeys: propertyDetails.storeys,
    };
  }, [address, propertyDetails]);

  const pricingEvaluation = useMemo(() => {
    if (!propertyInput) return null;
    return evaluatePricing(
      {
        floorAreaSqm: propertyInput.floorAreaSqm,
        decadeBuilt: propertyInput.decadeBuilt,
        propertyType: propertyInput.propertyType,
        storeys: propertyInput.storeys,
      },
      pricingRules,
    );
  }, [propertyInput, pricingRules]);

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
    else if (step === "address") setStep("slot");
    else if (step === "property") setStep("address");
    else if (step === "pricing") setStep("property");
    else if (step === "customer") setStep("pricing");
    else if (step === "confirm") setStep("customer");
  }

  async function handleSubmit() {
    if (!selectedDate || !selectedSlot || !propertyInput || !pricingEvaluation)
      return;
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
      customerName: customer.customerName,
      customerEmail: customer.customerEmail,
      customerPhone: customer.customerPhone,
      propertyAddress: formatFullPropertyAddress(address),
      propertySuburb: address.suburb,
      propertyCity: address.city,
      floorAreaSqm: propertyInput.floorAreaSqm,
      decadeBuilt: propertyInput.decadeBuilt,
      propertyType: propertyInput.propertyType,
      storeys: propertyInput.storeys,
      estimatedPrice: pricingEvaluation.estimatedPrice,
      reviewFlags: pricingEvaluation.reviewFlags,
      notes: customer.notes || undefined,
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
        customerEmail={customer.customerEmail}
        bookingId={bookingId}
        className={cardClass}
      />
    );
  }

  const scrollableStep =
    step === "property" || step === "confirm" || step === "customer";
  const stepBodyClass = scrollableStep
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
              setStep("address");
            }}
          />
        )}

        {step === "address" && (
          <PropertyAddressStep
            values={address}
            onChange={setAddress}
            onContinue={() => setStep("property")}
          />
        )}

        {step === "property" && (
          <PropertyDetailsStep
            values={propertyDetails}
            onChange={setPropertyDetails}
            onContinue={() => setStep("pricing")}
          />
        )}

        {step === "pricing" && pricingEvaluation && (
          <PricingDisplayStep
            display={pricingEvaluation.customerDisplay}
            onContinue={() => setStep("customer")}
          />
        )}

        {step === "customer" && (
          <CustomerForm
            values={customer}
            onChange={setCustomer}
            onContinue={() => setStep("confirm")}
          />
        )}

        {step === "confirm" &&
          selectedDate &&
          selectedSlot &&
          propertyInput &&
          pricingEvaluation && (
            <ConfirmStep
              date={selectedDate}
              slot={selectedSlot}
              property={propertyInput}
              pricingDisplay={pricingEvaluation.customerDisplay}
              customer={customer}
              onConfirm={handleSubmit}
              submitting={submitting}
            />
          )}
      </div>
    </Card>
  );
}

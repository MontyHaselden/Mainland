"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import {
  DECADES_BUILT,
  FLOOR_AREA_QUICK_SELECTS,
  HOMES_CO_NZ_URL,
  PROPERTY_TYPES,
  STOREY_OPTIONS,
  type DecadeBuilt,
  type PropertyType,
  type StoreyOption,
} from "@/lib/booking/property-options";

export type PropertyDetailsValues = {
  floorAreaSqm: number | null | undefined;
  decadeBuilt: DecadeBuilt | "";
  propertyType: PropertyType | "";
  storeys: StoreyOption | "";
};

type PropertyDetailsStepProps = {
  values: PropertyDetailsValues;
  onChange: (values: PropertyDetailsValues) => void;
  onContinue: () => void;
};

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onSelect,
  helperText,
}: {
  label: string;
  options: readonly T[];
  value: T | "";
  onSelect: (v: T) => void;
  helperText?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-navy">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`min-h-10 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              value === option
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:border-accent/40"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {helperText ? (
        <p className="mt-2 text-xs text-muted">{helperText}</p>
      ) : null}
    </fieldset>
  );
}

export function PropertyDetailsStep({
  values,
  onChange,
  onContinue,
}: PropertyDetailsStepProps) {
  const floorAreaChosen = values.floorAreaSqm !== undefined;
  const complete =
    floorAreaChosen &&
    values.decadeBuilt &&
    values.propertyType &&
    values.storeys;

  const inputValue =
    values.floorAreaSqm === undefined || values.floorAreaSqm === null
      ? ""
      : String(values.floorAreaSqm);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!complete) return;
    onContinue();
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col">
      <p className="mb-4 shrink-0 text-sm text-muted">
        Help us prepare your inspection quote. Approximate details are fine.
      </p>
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-0.5">
        <div>
          <Label htmlFor="floor-area">Approximate floor area</Label>
          <div className="relative mt-1.5">
            <Input
              id="floor-area"
              type="number"
              inputMode="numeric"
              min={1}
              max={2000}
              placeholder="e.g. 185"
              value={inputValue}
              onChange={(e) => {
                const raw = e.target.value.trim();
                if (!raw) {
                  onChange({ ...values, floorAreaSqm: undefined });
                  return;
                }
                const parsed = Number.parseInt(raw, 10);
                if (!Number.isNaN(parsed) && parsed > 0) {
                  onChange({ ...values, floorAreaSqm: parsed });
                }
              }}
              className="pr-12"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted">
              m²
            </span>
          </div>
          <p className="mt-2 text-xs text-muted">
            Unsure? You can usually find the floor area on Homes.co.nz, the real
            estate listing, council records, or a property report.
          </p>
          <a
            href={HOMES_CO_NZ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-9 items-center text-sm font-semibold text-accent hover:text-accent-light"
          >
            Check Homes.co.nz →
          </a>
          <div className="mt-3 flex flex-wrap gap-2">
            {FLOOR_AREA_QUICK_SELECTS.map((option) => {
              const selected =
                option.value === null
                  ? values.floorAreaSqm === null
                  : values.floorAreaSqm === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...values,
                      floorAreaSqm: option.value,
                    })
                  }
                  className={`min-h-9 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    selected
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted hover:border-accent/40"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <OptionGroup
          label="Approximate decade built"
          options={DECADES_BUILT}
          value={values.decadeBuilt}
          onSelect={(decadeBuilt) => onChange({ ...values, decadeBuilt })}
          helperText="Choose the closest option. Mainland Building Inspections will review the details before confirming your booking."
        />

        <OptionGroup
          label="Property type"
          options={PROPERTY_TYPES}
          value={values.propertyType}
          onSelect={(propertyType) => onChange({ ...values, propertyType })}
        />

        <OptionGroup
          label="Number of storeys"
          options={STOREY_OPTIONS}
          value={values.storeys}
          onSelect={(storeys) => onChange({ ...values, storeys })}
        />
      </div>
      <Button type="submit" className="mt-4 w-full shrink-0" disabled={!complete}>
        Continue
      </Button>
    </form>
  );
}

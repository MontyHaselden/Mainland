"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export type PropertyAddressValues = {
  streetAddress: string;
  suburb: string;
  city: string;
};

type PropertyAddressStepProps = {
  values: PropertyAddressValues;
  onChange: (values: PropertyAddressValues) => void;
  onContinue: () => void;
};

export function PropertyAddressStep({
  values,
  onChange,
  onContinue,
}: PropertyAddressStepProps) {
  function update(field: keyof PropertyAddressValues, value: string) {
    onChange({ ...values, [field]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.streetAddress || !values.suburb || !values.city) return;
    onContinue();
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col">
      <p className="mb-4 shrink-0 text-sm text-muted">
        Enter the property address for your inspection.
      </p>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-0.5">
        <div>
          <Label htmlFor="street-address">Property address</Label>
          <Input
            id="street-address"
            required
            value={values.streetAddress}
            onChange={(e) => update("streetAddress", e.target.value)}
            placeholder="123 Example Street"
          />
        </div>
        <div>
          <Label htmlFor="suburb">Suburb</Label>
          <Input
            id="suburb"
            required
            value={values.suburb}
            onChange={(e) => update("suburb", e.target.value)}
            placeholder="Riccarton"
          />
        </div>
        <div>
          <Label htmlFor="city">City / town</Label>
          <Input
            id="city"
            required
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="Christchurch"
          />
        </div>
      </div>
      <Button type="submit" className="mt-4 w-full shrink-0">
        Continue
      </Button>
    </form>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export type CustomerFormValues = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
};

type CustomerFormProps = {
  values: CustomerFormValues;
  onChange: (values: CustomerFormValues) => void;
  onContinue: () => void;
};

const fieldClass = "min-h-9 text-sm";

export function CustomerForm({
  values,
  onChange,
  onContinue,
}: CustomerFormProps) {
  function update(field: keyof CustomerFormValues, value: string) {
    onChange({ ...values, [field]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.customerName || !values.customerEmail || !values.customerPhone) {
      return;
    }
    onContinue();
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col">
      <p className="mb-4 shrink-0 text-sm text-muted">
        Your contact details so we can confirm your inspection.
      </p>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-0.5">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            required
            className={fieldClass}
            value={values.customerName}
            onChange={(e) => update("customerName", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            className={fieldClass}
            value={values.customerEmail}
            onChange={(e) => update("customerEmail", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            required
            className={fieldClass}
            value={values.customerPhone}
            onChange={(e) => update("customerPhone", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="notes">
            Notes / access details{" "}
            <span className="font-normal text-muted">(optional)</span>
          </Label>
          <Textarea
            id="notes"
            rows={3}
            className="min-h-20 resize-none text-sm"
            value={values.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Gate codes, agent contact, preferred access times…"
          />
        </div>
      </div>
      <Button type="submit" className="mt-4 w-full shrink-0">
        Continue to confirm
      </Button>
    </form>
  );
}

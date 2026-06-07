"use client";

import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

type FormValues = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  propertyAddress: string;
  notes: string;
  agentName: string;
};

type CustomerFormProps = {
  values: FormValues;
  onChange: (values: FormValues) => void;
  onContinue: () => void;
};

const fieldClass = "min-h-9 text-sm";

export function CustomerForm({
  values,
  onChange,
  onContinue,
}: CustomerFormProps) {
  function update(field: keyof FormValues, value: string) {
    onChange({ ...values, [field]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !values.customerName ||
      !values.customerEmail ||
      !values.customerPhone ||
      !values.propertyAddress
    ) {
      return;
    }
    onContinue();
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto pr-0.5">
        <div className="grid h-full gap-3 md:grid-cols-2">
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-0.5 text-xs font-bold uppercase tracking-wide text-muted">
              Your details
            </legend>
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
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-0.5 text-xs font-bold uppercase tracking-wide text-muted">
              Property
            </legend>
            <div>
              <Label htmlFor="address">Property address</Label>
              <Input
                id="address"
                required
                className={fieldClass}
                value={values.propertyAddress}
                onChange={(e) => update("propertyAddress", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="agent">Agent name (optional)</Label>
              <Input
                id="agent"
                className={fieldClass}
                value={values.agentName}
                onChange={(e) => update("agentName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                rows={2}
                className="min-h-14 resize-none text-sm"
                value={values.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>
          </fieldset>
        </div>
      </div>

      <Button type="submit" className="mt-3 w-full shrink-0">
        Continue to confirm
      </Button>
    </form>
  );
}

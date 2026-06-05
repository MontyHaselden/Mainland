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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          required
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
          value={values.customerPhone}
          onChange={(e) => update("customerPhone", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="address">Property address</Label>
        <Input
          id="address"
          required
          value={values.propertyAddress}
          onChange={(e) => update("propertyAddress", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="agent">Agent name (optional)</Label>
        <Input
          id="agent"
          value={values.agentName}
          onChange={(e) => update("agentName", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          value={values.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Continue to confirm
      </Button>
    </form>
  );
}

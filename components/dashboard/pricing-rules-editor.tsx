"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { PricingRulesConfig } from "@/lib/booking/pricing-rules-types";

type PricingRulesEditorProps = {
  initialRules: PricingRulesConfig;
};

function NumberField({
  id,
  label,
  value,
  step = 1,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function PricingRulesEditor({ initialRules }: PricingRulesEditorProps) {
  const router = useRouter();
  const [rules, setRules] = useState(initialRules);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/staff/pricing-rules", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rules }),
      });
      if (!res.ok) {
        setMessage("Failed to save pricing rules.");
        return;
      }
      setMessage("Pricing rules saved.");
      router.refresh();
    } catch {
      setMessage("Failed to save pricing rules.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-navy">Floor area pricing</h2>
        <p className="mt-1 text-sm text-muted">
          Base price up to the included area, then a per-m² rate above that.
          Final price is rounded to the nearest value below.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NumberField
            id="base-price"
            label="Base price ($)"
            value={rules.floorArea.basePrice}
            onChange={(basePrice) =>
              setRules({
                ...rules,
                floorArea: { ...rules.floorArea, basePrice },
              })
            }
          />
          <NumberField
            id="base-included"
            label="Included floor area (m²)"
            value={rules.floorArea.baseIncludedFloorAreaM2}
            onChange={(baseIncludedFloorAreaM2) =>
              setRules({
                ...rules,
                floorArea: { ...rules.floorArea, baseIncludedFloorAreaM2 },
              })
            }
          />
          <NumberField
            id="price-per-extra"
            label="Price per extra m² ($)"
            value={rules.floorArea.pricePerExtraM2}
            step={0.1}
            onChange={(pricePerExtraM2) =>
              setRules({
                ...rules,
                floorArea: { ...rules.floorArea, pricePerExtraM2 },
              })
            }
          />
          <NumberField
            id="round-to"
            label="Round to nearest ($)"
            value={rules.floorArea.roundToNearest}
            onChange={(roundToNearest) =>
              setRules({
                ...rules,
                floorArea: { ...rules.floorArea, roundToNearest },
              })
            }
          />
          <NumberField
            id="minimum-price"
            label="Minimum price ($)"
            value={rules.floorArea.minimumPrice}
            onChange={(minimumPrice) =>
              setRules({
                ...rules,
                floorArea: { ...rules.floorArea, minimumPrice },
              })
            }
          />
          <NumberField
            id="custom-threshold"
            label="Custom quote threshold (m²)"
            value={rules.floorArea.customQuoteThresholdM2}
            onChange={(customQuoteThresholdM2) =>
              setRules({
                ...rules,
                floorArea: { ...rules.floorArea, customQuoteThresholdM2 },
              })
            }
          />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-navy">Age / decade adjustments</h2>
        <div className="mt-4 space-y-3">
          {rules.decadeRules.map((rule, index) => (
            <div
              key={rule.decade}
              className="grid gap-3 rounded-lg border border-border bg-background p-4 sm:grid-cols-[120px_100px_1fr_auto]"
            >
              <span className="self-center text-sm font-medium text-navy">
                {rule.decade}
              </span>
              <div>
                <Label htmlFor={`decade-adj-${index}`}>+$</Label>
                <Input
                  id={`decade-adj-${index}`}
                  type="number"
                  value={rule.adjustment}
                  onChange={(e) => {
                    const next = [...rules.decadeRules];
                    next[index] = {
                      ...rule,
                      adjustment: Number(e.target.value),
                    };
                    setRules({ ...rules, decadeRules: next });
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`decade-flag-${index}`}>Review flag</Label>
                <Input
                  id={`decade-flag-${index}`}
                  value={rule.flag ?? ""}
                  placeholder="No flag"
                  onChange={(e) => {
                    const next = [...rules.decadeRules];
                    next[index] = {
                      ...rule,
                      flag: e.target.value || null,
                    };
                    setRules({ ...rules, decadeRules: next });
                  }}
                />
              </div>
              <label className="flex items-center gap-2 self-end text-xs text-muted">
                <input
                  type="checkbox"
                  checked={Boolean(rule.pendingReview)}
                  onChange={(e) => {
                    const next = [...rules.decadeRules];
                    next[index] = {
                      ...rule,
                      pendingReview: e.target.checked,
                    };
                    setRules({ ...rules, decadeRules: next });
                  }}
                />
                Pending review
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-navy">Storey adjustments</h2>
        <div className="mt-4 space-y-3">
          {rules.storeyRules.map((rule, index) => (
            <div
              key={rule.storey}
              className="grid gap-3 rounded-lg border border-border bg-background p-4 sm:grid-cols-[140px_100px_1fr_auto_auto]"
            >
              <span className="self-center text-sm font-medium text-navy">
                {rule.storey}
              </span>
              <div>
                <Label htmlFor={`storey-adj-${index}`}>+$</Label>
                <Input
                  id={`storey-adj-${index}`}
                  type="number"
                  value={rule.adjustment}
                  disabled={rule.customQuote}
                  onChange={(e) => {
                    const next = [...rules.storeyRules];
                    next[index] = {
                      ...rule,
                      adjustment: Number(e.target.value),
                    };
                    setRules({ ...rules, storeyRules: next });
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`storey-flag-${index}`}>Review flag</Label>
                <Input
                  id={`storey-flag-${index}`}
                  value={rule.flag ?? ""}
                  placeholder="No flag"
                  onChange={(e) => {
                    const next = [...rules.storeyRules];
                    next[index] = {
                      ...rule,
                      flag: e.target.value || null,
                    };
                    setRules({ ...rules, storeyRules: next });
                  }}
                />
              </div>
              <label className="flex items-center gap-2 self-end text-xs text-muted">
                <input
                  type="checkbox"
                  checked={Boolean(rule.customQuote)}
                  onChange={(e) => {
                    const next = [...rules.storeyRules];
                    next[index] = {
                      ...rule,
                      customQuote: e.target.checked,
                    };
                    setRules({ ...rules, storeyRules: next });
                  }}
                />
                Custom quote
              </label>
              <label className="flex items-center gap-2 self-end text-xs text-muted">
                <input
                  type="checkbox"
                  checked={Boolean(rule.pendingReview)}
                  onChange={(e) => {
                    const next = [...rules.storeyRules];
                    next[index] = {
                      ...rule,
                      pendingReview: e.target.checked,
                    };
                    setRules({ ...rules, storeyRules: next });
                  }}
                />
                Pending review
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-navy">Property type adjustments</h2>
        <div className="mt-4 space-y-3">
          {rules.propertyTypeRules.map((rule, index) => (
            <div
              key={rule.propertyType}
              className="grid gap-3 rounded-lg border border-border bg-background p-4 sm:grid-cols-[160px_100px_1fr_auto_auto]"
            >
              <span className="self-center text-sm font-medium text-navy">
                {rule.propertyType}
              </span>
              <div>
                <Label htmlFor={`type-adj-${index}`}>+$</Label>
                <Input
                  id={`type-adj-${index}`}
                  type="number"
                  value={rule.adjustment}
                  disabled={rule.customQuote}
                  onChange={(e) => {
                    const next = [...rules.propertyTypeRules];
                    next[index] = {
                      ...rule,
                      adjustment: Number(e.target.value),
                    };
                    setRules({ ...rules, propertyTypeRules: next });
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`type-flag-${index}`}>Review flag</Label>
                <Input
                  id={`type-flag-${index}`}
                  value={rule.flag ?? ""}
                  placeholder="No flag"
                  onChange={(e) => {
                    const next = [...rules.propertyTypeRules];
                    next[index] = {
                      ...rule,
                      flag: e.target.value || null,
                    };
                    setRules({ ...rules, propertyTypeRules: next });
                  }}
                />
              </div>
              <label className="flex items-center gap-2 self-end text-xs text-muted">
                <input
                  type="checkbox"
                  checked={Boolean(rule.customQuote)}
                  onChange={(e) => {
                    const next = [...rules.propertyTypeRules];
                    next[index] = {
                      ...rule,
                      customQuote: e.target.checked,
                    };
                    setRules({ ...rules, propertyTypeRules: next });
                  }}
                />
                Custom quote
              </label>
              <label className="flex items-center gap-2 self-end text-xs text-muted">
                <input
                  type="checkbox"
                  checked={Boolean(rule.pendingReview)}
                  onChange={(e) => {
                    const next = [...rules.propertyTypeRules];
                    next[index] = {
                      ...rule,
                      pendingReview: e.target.checked,
                    };
                    setRules({ ...rules, propertyTypeRules: next });
                  }}
                />
                Pending review
              </label>
            </div>
          ))}
        </div>
      </section>

      {message && <p className="text-sm text-muted">{message}</p>}

      <Button type="button" onClick={save} disabled={saving}>
        {saving ? "Saving…" : "Save pricing rules"}
      </Button>
    </div>
  );
}

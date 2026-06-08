import { redirect } from "next/navigation";
import { PricingRulesEditor } from "@/components/dashboard/pricing-rules-editor";
import { getStaffSession } from "@/lib/auth/session";
import { getPricingRulesConfig } from "@/lib/booking/pricing-rules-queries";

export default async function StaffPricingPage() {
  const session = await getStaffSession();
  if (!session) redirect("/staff/login");

  let rules = await getPricingRulesConfig();

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 lg:px-8 lg:py-12">
      <h1 className="font-display text-3xl text-navy">Pricing rules</h1>
      <p className="mt-2 text-muted">
        Edit floor area prices and admin review flags. Changes apply to new
        booking evaluations immediately.
      </p>
      <div className="mt-8">
        <PricingRulesEditor initialRules={rules} />
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AcknowledgeButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function acknowledge() {
    setLoading(true);
    try {
      await fetch("/api/staff/acknowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      className="min-h-10 px-4 text-xs"
      onClick={acknowledge}
      disabled={loading}
    >
      {loading ? "…" : "Acknowledge"}
    </Button>
  );
}

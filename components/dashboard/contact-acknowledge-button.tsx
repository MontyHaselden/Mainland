"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactAcknowledgeButton({ messageId }: { messageId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function acknowledge() {
    setLoading(true);
    try {
      await fetch("/api/staff/contact/acknowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId }),
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
      {loading ? "…" : "Mark handled"}
    </Button>
  );
}

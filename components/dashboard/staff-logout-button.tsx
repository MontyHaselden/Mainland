"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function StaffLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/staff/logout", { method: "POST" });
    router.push("/staff/login");
    router.refresh();
  }

  return (
    <Button type="button" variant="ghost" onClick={logout}>
      Sign out
    </Button>
  );
}

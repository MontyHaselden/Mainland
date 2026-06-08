import { getMockMonthAvailability } from "./mock-availability";
import type { DayAvailability, MonthAvailabilityResponse } from "./types";

export type AvailabilitySource = "mock" | "api";

export type AvailabilityLoader = (month: string) => Promise<DayAvailability[]>;

export function createAvailabilityLoader(
  source: AvailabilitySource,
): AvailabilityLoader {
  if (source === "mock") {
    return async (month: string) => getMockMonthAvailability(month).days;
  }

  return async (month: string) => {
    const res = await fetch(`/api/availability?month=${month}`);
    if (!res.ok) throw new Error("Could not load availability");
    const data: MonthAvailabilityResponse = await res.json();
    return data.days;
  };
}

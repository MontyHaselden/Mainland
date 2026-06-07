import { and, eq, gte, lte } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { availabilityBlocks } from "@/lib/db/schema";
import type { BookingSlot } from "./constants";

export type BlockedSlotsByDate = Map<string, BookingSlot[]>;

export async function getBlockedSlotsForRange(
  startDate: string,
  endDate: string
): Promise<BlockedSlotsByDate> {
  const db = getDb();
  const rows = await db
    .select({
      blockDate: availabilityBlocks.blockDate,
      slot: availabilityBlocks.slot,
    })
    .from(availabilityBlocks)
    .where(
      and(
        gte(availabilityBlocks.blockDate, startDate),
        lte(availabilityBlocks.blockDate, endDate)
      )
    );

  const byDate: BlockedSlotsByDate = new Map();
  for (const row of rows) {
    const slot = row.slot as BookingSlot;
    const slots = byDate.get(row.blockDate) ?? [];
    slots.push(slot);
    byDate.set(row.blockDate, slots);
  }
  return byDate;
}

export function isSlotBlocked(
  blockedSlots: BookingSlot[],
  slot: BookingSlot
): boolean {
  return blockedSlots.includes(slot);
}

export async function blockSlot(
  date: string,
  slot: BookingSlot,
  note?: string
) {
  const db = getDb();
  const [row] = await db
    .insert(availabilityBlocks)
    .values({ blockDate: date, slot, note })
    .onConflictDoNothing()
    .returning();
  return row ?? null;
}

export async function blockFullDay(date: string, note?: string) {
  await blockSlot(date, "morning", note);
  await blockSlot(date, "afternoon", note);
}

export async function unblockSlot(date: string, slot: BookingSlot) {
  const db = getDb();
  await db
    .delete(availabilityBlocks)
    .where(
      and(
        eq(availabilityBlocks.blockDate, date),
        eq(availabilityBlocks.slot, slot)
      )
    );
}

export async function unblockFullDay(date: string) {
  await unblockSlot(date, "morning");
  await unblockSlot(date, "afternoon");
}

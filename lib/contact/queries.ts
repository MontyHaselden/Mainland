import { desc, isNull } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

export async function getUnacknowledgedContactMessages() {
  const db = getDb();
  return db
    .select()
    .from(contactMessages)
    .where(isNull(contactMessages.acknowledgedAt))
    .orderBy(desc(contactMessages.createdAt));
}

export async function getAllContactMessages() {
  const db = getDb();
  return db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));
}

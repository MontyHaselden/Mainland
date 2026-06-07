import {
  date,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    inspectionDate: date("inspection_date").notNull(),
    slot: varchar("slot", { length: 20 }).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("confirmed"),
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    customerEmail: varchar("customer_email", { length: 255 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 50 }).notNull(),
    propertyAddress: text("property_address").notNull(),
    notes: text("notes"),
    agentName: varchar("agent_name", { length: 255 }),
    acknowledgedAt: timestamp("acknowledged_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique("bookings_date_slot_unique").on(table.inspectionDate, table.slot)]
);

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

export const staffUsers = pgTable("staff_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type StaffUser = typeof staffUsers.$inferSelect;
export type NewStaffUser = typeof staffUsers.$inferInsert;

export const availabilityBlocks = pgTable(
  "availability_blocks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    blockDate: date("block_date").notNull(),
    slot: varchar("slot", { length: 20 }).notNull(),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("availability_blocks_date_slot_unique").on(
      table.blockDate,
      table.slot
    ),
  ]
);

export type AvailabilityBlock = typeof availabilityBlocks.$inferSelect;
export type NewAvailabilityBlock = typeof availabilityBlocks.$inferInsert;

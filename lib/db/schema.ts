import {
  date,
  integer,
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
    status: varchar("status", { length: 30 })
      .notNull()
      .default("pending_review"),
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    customerEmail: varchar("customer_email", { length: 255 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 50 }).notNull(),
    propertyAddress: text("property_address").notNull(),
    propertySuburb: varchar("property_suburb", { length: 255 }),
    propertyCity: varchar("property_city", { length: 255 }),
    floorAreaSqm: integer("floor_area_sqm"),
    /** @deprecated Legacy band selection — use floorAreaSqm */
    floorAreaBand: varchar("floor_area_band", { length: 50 }),
    decadeBuilt: varchar("decade_built", { length: 30 }),
    propertyType: varchar("property_type", { length: 50 }),
    storeys: varchar("storeys", { length: 30 }),
    estimatedPrice: integer("estimated_price"),
    finalPrice: integer("final_price"),
    adminFloorAreaSqm: integer("admin_floor_area_sqm"),
    /** @deprecated Use adminFloorAreaSqm */
    exactFloorAreaSqm: integer("exact_floor_area_sqm"),
    reviewFlags: text("review_flags"),
    adminNotes: text("admin_notes"),
    adminFloorAreaBand: varchar("admin_floor_area_band", { length: 50 }),
    adminDecadeBuilt: varchar("admin_decade_built", { length: 30 }),
    adminPropertyType: varchar("admin_property_type", { length: 50 }),
    adminStoreys: varchar("admin_storeys", { length: 30 }),
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

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  acknowledgedAt: timestamp("acknowledged_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;

export const pricingRules = pgTable("pricing_rules", {
  id: varchar("id", { length: 50 }).primaryKey(),
  rules: text("rules").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type PricingRulesRow = typeof pricingRules.$inferSelect;

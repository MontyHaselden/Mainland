-- Mainland Inspections — full Neon setup
-- Run in Neon: Dashboard → SQL Editor → paste → Run
-- Safe to re-run (uses IF NOT EXISTS / ON CONFLICT)

-- 1. Bookings (online booking + staff dashboard)
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inspection_date" date NOT NULL,
	"slot" varchar(20) NOT NULL,
	"status" varchar(20) DEFAULT 'confirmed' NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"customer_email" varchar(255) NOT NULL,
	"customer_phone" varchar(50) NOT NULL,
	"property_address" text NOT NULL,
	"notes" text,
	"agent_name" varchar(255),
	"acknowledged_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookings_date_slot_unique" UNIQUE("inspection_date","slot")
);

-- 2. Staff logins (supports multiple accounts)
CREATE TABLE IF NOT EXISTS "staff_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"name" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "staff_users_email_unique" UNIQUE("email")
);

-- 3. Staff blocks (optional morning/afternoon closures)
CREATE TABLE IF NOT EXISTS "availability_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"block_date" date NOT NULL,
	"slot" varchar(20) NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "availability_blocks_date_slot_unique" UNIQUE("block_date","slot")
);

-- 4. First staff account
-- Generate a bcrypt hash locally (do NOT paste plain passwords here):
--   npm run staff:hash -- your-password-here
-- Then replace YOUR_BCRYPT_HASH below and run this block.

-- INSERT INTO staff_users (email, password_hash, name)
-- VALUES (
--   'office@mainlandinspections.co.nz',
--   'YOUR_BCRYPT_HASH',
--   'Office'
-- )
-- ON CONFLICT (email) DO UPDATE SET
--   password_hash = EXCLUDED.password_hash,
--   name = EXCLUDED.name;

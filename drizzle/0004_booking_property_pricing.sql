ALTER TABLE "bookings" ALTER COLUMN "status" SET DEFAULT 'pending_review';
ALTER TABLE "bookings" ALTER COLUMN "status" TYPE varchar(30);

ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "property_suburb" varchar(255);
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "property_city" varchar(255);
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "floor_area_band" varchar(50);
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "decade_built" varchar(30);
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "property_type" varchar(50);
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "storeys" varchar(30);
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "estimated_price" integer;
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "final_price" integer;
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "exact_floor_area_sqm" integer;
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "review_flags" text;
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "admin_notes" text;
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "admin_floor_area_band" varchar(50);
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "admin_decade_built" varchar(30);
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "admin_property_type" varchar(50);
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "admin_storeys" varchar(30);

CREATE TABLE IF NOT EXISTS "pricing_rules" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"rules" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

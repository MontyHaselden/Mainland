ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "floor_area_sqm" integer;
ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "admin_floor_area_sqm" integer;

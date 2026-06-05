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

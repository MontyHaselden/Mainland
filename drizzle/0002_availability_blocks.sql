CREATE TABLE IF NOT EXISTS "availability_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"block_date" date NOT NULL,
	"slot" varchar(20) NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "availability_blocks_date_slot_unique" UNIQUE("block_date","slot")
);

CREATE TABLE "place" (
	"id" serial PRIMARY KEY,
	"latitude" real,
	"longitude" real,
	"created_at" timestamp(6),
	"updated_at" timestamp(6),
	"deleted_at" timestamp(6)
);
--> statement-breakpoint
CREATE INDEX "ix_place_active" ON "place" ("deleted_at");

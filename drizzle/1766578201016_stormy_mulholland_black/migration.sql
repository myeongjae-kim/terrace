CREATE TABLE "article" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(32),
	"seq" integer,
	"title" varchar(255),
	"slug" varchar(255),
	"content" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	"published_at" timestamp,
	"user_id" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "article_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"article_id" bigint,
	"tag_id" bigint,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "musings" (
	"id" serial PRIMARY KEY NOT NULL,
	"quote" text,
	"from" varchar(255),
	"language" varchar(255),
	"created_at" timestamp,
	"updated_at" timestamp,
	"published_at" timestamp,
	"created_by_id" integer,
	"updated_by_id" integer,
	"seq" integer
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(32),
	"created_at" timestamp,
	"updated_at" timestamp,
	"published_at" timestamp
);
--> statement-breakpoint
CREATE INDEX "ix_article_category_seq" ON "article" USING btree ("category","seq");--> statement-breakpoint
CREATE INDEX "ix_article_category_slug" ON "article" USING btree ("category","slug");--> statement-breakpoint
CREATE INDEX "ux_article_slug" ON "article" USING btree ("slug");
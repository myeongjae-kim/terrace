import {
  bigint,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const articleTable = pgTable(
  "article",
  {
    id: serial().primaryKey(),
    category: varchar({ length: 32 }),
    seq: integer(),
    title: varchar({ length: 255 }),
    slug: varchar({ length: 255 }),
    content: text(),
    createdAt: timestamp("created_at", { precision: 6 }),
    updatedAt: timestamp("updated_at", { precision: 6 }),
    publishedAt: timestamp("published_at", { precision: 6 }),
    userId: varchar("user_id", { length: 255 }),
  },
  (table) => [
    index("ix_article_category_seq").on(table.category, table.seq),
    index("ix_article_category_slug").on(table.category, table.slug),
    index("ux_article_slug").on(table.slug),
  ],
);

export const articleTagTable = pgTable("article_tag", {
  id: serial().primaryKey(),
  articleId: bigint("article_id", { mode: "number" }),
  tagId: bigint("tag_id", { mode: "number" }),
  createdAt: timestamp("created_at", { precision: 6 }),
  updatedAt: timestamp("updated_at", { precision: 6 }),
});

// The physical table keeps its legacy plural name for migration compatibility.
export const musingTable = pgTable("musings", {
  id: serial().primaryKey(),
  quote: text(),
  from: varchar({ length: 255 }),
  language: varchar({ length: 255 }),
  createdAt: timestamp("created_at", { precision: 6 }),
  updatedAt: timestamp("updated_at", { precision: 6 }),
  publishedAt: timestamp("published_at", { precision: 6 }),
  createdById: integer("created_by_id"),
  updatedById: integer("updated_by_id"),
  seq: integer(),
});

export const tagTable = pgTable("tag", {
  id: serial().primaryKey(),
  name: varchar({ length: 32 }),
  createdAt: timestamp("created_at", { precision: 6 }),
  updatedAt: timestamp("updated_at", { precision: 6 }),
  publishedAt: timestamp("published_at", { precision: 6 }),
});

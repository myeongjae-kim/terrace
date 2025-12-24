import {
  bigint,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const article = pgTable(
  'article',
  {
    id: serial('id').primaryKey(),
    category: varchar('category', { length: 32 }),
    seq: integer('seq'),
    title: varchar('title', { length: 255 }),
    slug: varchar('slug', { length: 255 }),
    content: text('content'),
    created_at: timestamp('created_at', { mode: 'date' }),
    updated_at: timestamp('updated_at', { mode: 'date' }),
    published_at: timestamp('published_at', { mode: 'date' }),
    user_id: varchar('user_id', { length: 255 }),
  },
  (table) => [
    index('ix_article_category_seq').on(table.category, table.seq),
    index('ix_article_category_slug').on(table.category, table.slug),
    index('ux_article_slug').on(table.slug),
  ],
);

export const article_tag = pgTable('article_tag', {
  id: serial('id').primaryKey(),
  article_id: bigint('article_id', { mode: 'number' }),
  tag_id: bigint('tag_id', { mode: 'number' }),
  created_at: timestamp('created_at', { mode: 'date' }),
  updated_at: timestamp('updated_at', { mode: 'date' }),
});

export const musings = pgTable('musings', {
  id: serial('id').primaryKey(),
  quote: text('quote'),
  from: varchar('from', { length: 255 }),
  language: varchar('language', { length: 255 }),
  created_at: timestamp('created_at', { mode: 'date' }),
  updated_at: timestamp('updated_at', { mode: 'date' }),
  published_at: timestamp('published_at', { mode: 'date' }),
  created_by_id: integer('created_by_id'),
  updated_by_id: integer('updated_by_id'),
  seq: integer('seq'),
});

export const tag = pgTable('tag', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 32 }),
  created_at: timestamp('created_at', { mode: 'date' }),
  updated_at: timestamp('updated_at', { mode: 'date' }),
  published_at: timestamp('published_at', { mode: 'date' }),
});

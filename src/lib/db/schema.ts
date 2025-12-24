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
    createdAt: timestamp('created_at', { mode: 'date' }),
    updatedAt: timestamp('updated_at', { mode: 'date' }),
    publishedAt: timestamp('published_at', { mode: 'date' }),
    userId: varchar('user_id', { length: 255 }),
  },
  (table) => [
    index('ix_article_category_seq').on(table.category, table.seq),
    index('ix_article_category_slug').on(table.category, table.slug),
    index('ux_article_slug').on(table.slug),
  ],
);

export const articleTag = pgTable('article_tag', {
  id: serial('id').primaryKey(),
  articleId: bigint('article_id', { mode: 'number' }),
  tagId: bigint('tag_id', { mode: 'number' }),
  createdAt: timestamp('created_at', { mode: 'date' }),
  updatedAt: timestamp('updated_at', { mode: 'date' }),
});

export const musings = pgTable('musings', {
  id: serial('id').primaryKey(),
  quote: text('quote'),
  from: varchar('from', { length: 255 }),
  language: varchar('language', { length: 255 }),
  createdAt: timestamp('created_at', { mode: 'date' }),
  updatedAt: timestamp('updated_at', { mode: 'date' }),
  publishedAt: timestamp('published_at', { mode: 'date' }),
  createdById: integer('created_by_id'),
  updatedById: integer('updated_by_id'),
  seq: integer('seq'),
});

export const tag = pgTable('tag', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 32 }),
  createdAt: timestamp('created_at', { mode: 'date' }),
  updatedAt: timestamp('updated_at', { mode: 'date' }),
  publishedAt: timestamp('published_at', { mode: 'date' }),
});

import { isServer } from "src/util";

export const DOMAIN = process.env.DOMAIN;
export const DOMAIN_BLOG = process.env.DOMAIN_BLOG;

export const Endpoints = {
  "about": "/about",

  "blog": "/blog",
  "blog.detail": "/blog/detail",

  "daily": "/daily",
  "daily.detail": "/daily/detail",

  "musings": "/musings",
  "places": "/places",

  "mother": "/mother",
  "mother.notice": "/mother/notice",
  "content": "/content",
  "content.mjArticle": "/content/mj-article"
}

export const TITLE_POSTFIX = " :: Myeongjae Kim";
export const API_HOST = isServer() ? `http://localhost:${process.env.PORT}` : "";
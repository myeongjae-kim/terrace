import { isServer } from "src/util";

export const DOMAIN = process.env.DOMAIN;
export const DOMAIN_BLOG = process.env.DOMAIN_BLOG;

export const Endpoints = {
  "auth": "/auth",

  "about": "/about",

  "blog": "/blog",
  "blog.detail": "/blog/detail",
  "blog.create": "/blog/create",
  "blog.update": "/blog/update",

  "daily": "/daily",
  "daily.detail": "/daily/detail",

  "musings": "/musings",
  "places": "/places",
};

export const TITLE_POSTFIX = " :: Myeongjae Kim";
export const API_HOST = isServer() ? `http://localhost:${process.env.PORT}` : "";

export const JWT_COOKIE_KEY = process.env.JWT_COOKIE_KEY || "";
export const JWT_MAX_AGE = process.env.JWT_MAX_AGE || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const JWT_COOKIE_DOMAIN = process.env.JWT_COOKIE_DOMAIN || "";
export const JWT_COOKIE_SECURE = process.env.JWT_COOKIE_SECURE !== "false";
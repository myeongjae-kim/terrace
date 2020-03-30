import { User } from "src/auth/domain/model";
import { BlogArticle } from "src/blog/domain/model";
import { Daily } from "src/daily/domain/model";
import { Musing } from "src/musings/domain/model";
import { createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export async function getDbConnection() {
  const {
    DATABASE_HOST,
    DATABASE_USER,
    DATABASE_PORT,
    DATABASE_PASSWORD,
    DATABASE_DB,
    PROFILE,
  } = process.env;

  const entities = [
    BlogArticle, Musing, Daily, User
  ];

  return await createConnection({
    type: "mariadb",
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    entities,
    synchronize: PROFILE === "local",
    supportBigNumbers: true,
    bigNumberStrings: true,
    logging: "all",
    namingStrategy: new SnakeNamingStrategy(),
    charset: "utf8mb4"
  });
}
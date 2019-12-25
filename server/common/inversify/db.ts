import { Musing } from 'src/musings/domain/model'
import { createConnection } from "typeorm";

/*
Please set the env var:
export DATABASE_USER=postgres \
export DATABASE_PASSWORD=secret \
export DATABASE_HOST=localhost \
export DATABASE_PORT=3306 \
export DATABASE_DB=demo
*/

export async function getDbConnection() {

  const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
  const DATABASE_USER = process.env.DATABASE_USER || "";
  const DATABASE_PORT = 3306;
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
  const DATABASE_DB = "demo";

  const entities = [
    Musing
  ];

  return await createConnection({
    type: "postgres",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    entities,
    synchronize: true
  });
}
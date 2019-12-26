import { Daily } from "src/daily/domain/model";
import { getConnection } from "typeorm";

export const createDailyRepositoryImpl = () => {
  const conn = getConnection();
  return conn.getRepository(Daily);
}
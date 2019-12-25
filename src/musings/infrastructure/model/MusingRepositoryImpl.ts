import { Musing } from "src/musings/domain/model";
import { getConnection } from "typeorm";

export const createMusingRepositoryImpl = () => {
  const conn = getConnection();
  return conn.getRepository(Musing);
}
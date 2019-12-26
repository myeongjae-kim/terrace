import { MusingRepository } from "src/musings/domain/model";
import { getConnection } from "typeorm";
import { MusingImpl } from "./MusingImpl";

export const createMusingRepositoryImpl = (): MusingRepository => {
  const conn = getConnection();
  return conn.getRepository(MusingImpl);
}
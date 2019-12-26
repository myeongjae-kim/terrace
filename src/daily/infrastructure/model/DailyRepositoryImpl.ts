import { Daily, DailyRepository } from "src/daily/domain/model";
import { EntityRepository, getConnection, Repository } from "typeorm";

export const createDailyRepositoryImpl = () => {
  const conn = getConnection();
  return conn.getCustomRepository(DailyRepositoryImpl);
}

@EntityRepository(Daily)
class DailyRepositoryImpl extends Repository<Daily> implements DailyRepository {
  public findAllByOrderBySeqDesc = () => {
    return this.createQueryBuilder("daily")
      .orderBy("daily.seq", "DESC")
      .getMany();
  }
}
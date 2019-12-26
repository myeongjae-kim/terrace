import { inject, injectable } from "inversify";
import { TYPES } from "server/common/inversify/types";
import { Daily } from "../model";
import { DailyRepository } from "../model/DailyRepository";
import { DailyService } from "./DailyService";

@injectable()
export class DailyServiceImpl implements DailyService {

  public constructor(
    @inject(TYPES.DailyRepository) private dailyRepository: DailyRepository
  ) { }

  public findAll = (): Promise<Daily[]> => {
    return this.dailyRepository.find();
  }
}
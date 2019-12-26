import { inject, injectable } from "inversify";
import { TYPES } from "server/common/inversify/types";
import { createDailyListResponseDtoFrom, DailyListResponseDto } from "src/daily/api";
import { DailyRepository } from "../model/DailyRepository";
import { DailyService } from "./DailyService";

@injectable()
export class DailyServiceImpl implements DailyService {

  public constructor(
    @inject(TYPES.DailyRepository) private dailyRepository: DailyRepository
  ) { }

  public findAll = (): Promise<DailyListResponseDto[]> => this.dailyRepository.find()
    .then(d => d.map(createDailyListResponseDtoFrom));
}
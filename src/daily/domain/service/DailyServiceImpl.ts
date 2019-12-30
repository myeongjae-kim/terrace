import { inject, injectable } from "inversify";
import { TYPES } from "server/common/inversify/types";
import { createDailyDetailResponseDtoFrom, createDailyListResponseDtoFrom, DailyDetailRequestDto, DailyDetailResponseDto, DailyListResponseDto } from "src/daily/api";
import { DailyDetailNotFoundException } from "src/daily/exceptions";
import { Daily } from "../model";
import { DailyRepository } from "../model/DailyRepository";
import { DailyService } from "./DailyService";

@injectable()
export class DailyServiceImpl implements DailyService {

  public constructor(
    @inject(TYPES.DailyRepository) private dailyRepository: DailyRepository
  ) { }

  public findAll = (): Promise<DailyListResponseDto[]> => this.dailyRepository.findAllByOrderBySeqDesc()
    .then(d => d.map(createDailyListResponseDtoFrom));

  public find = async (req: DailyDetailRequestDto): Promise<DailyDetailResponseDto> => {
    const { year, month, day, slug } = req;
    const daily = (await this.dailyRepository.findBySlug(slug))
      .filter(d => d.isDateMatched(year, month, day))
      .orElseThrow(() => new DailyDetailNotFoundException(req)) as unknown as Daily;

    return createDailyDetailResponseDtoFrom(daily);
  }
}
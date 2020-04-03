import { inject, injectable } from "inversify";
import { TYPES } from "server/common/inversify/types";
import { createDailyDetailResponseDtoFrom, createDailyListResponseDtoFrom, DailyPathDto, DailyDetailResponseDto, DailyListResponseDto } from "src/daily/api";
import { DailyDetailNotFoundException } from "src/daily/exceptions";
import { Daily } from "../model";
import { DailyRepository } from "../model/DailyRepository";
import { DailyService } from "./DailyService";
import { DailyRequestDto } from "src/daily/api/dto/DailyRequestDto";
import { getSeoulDateFrom } from "src/util";

@injectable()
export class DailyServiceImpl implements DailyService {

  public constructor(
    @inject(TYPES.DailyRepository) private dailyRepository: DailyRepository
  ) { }

  public findAll = (): Promise<DailyListResponseDto[]> => this.dailyRepository.findAllByOrderBySeqDesc()
    .then(d => d.map(createDailyListResponseDtoFrom));

  public find = (req: DailyPathDto): Promise<DailyDetailResponseDto> => 
    this.findByPath(req).then(createDailyDetailResponseDtoFrom);

  public update = async (req: DailyPathDto, body: DailyRequestDto): Promise<void> => {
    const toUpdate = Daily.from(body);
    const current = await this.findByPath(req);

    current.update(toUpdate);

    await this.dailyRepository.save(current);
  };

  public create = (body: DailyRequestDto): Promise<string> => 
    this.dailyRepository.save(Daily.from(body))
      .then(a => "/daily/" + getSeoulDateFrom(a.createdAt).format("YYYY/MM/DD/") + a.slug);
  
  public delete = async (req: DailyPathDto): Promise<void> => {
    const id = (await this.findByPath(req)).id;
    await this.dailyRepository.delete(id);
  };

  private findByPath = async (path: DailyPathDto): Promise<Daily> => {
    const { year, month, day, slug } = path;

    return (await this.dailyRepository.findBySlug(slug))
      .filter(d => d.isDateMatched(year, month, day))
      .orElseThrow(() => new DailyDetailNotFoundException(path)) as unknown as Daily;
  };
}
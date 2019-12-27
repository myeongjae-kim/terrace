import 'reflect-metadata';
import { createDailyListResponseDtoFrom } from "src/daily/api";
import { Daily } from 'src/daily/domain/model';
import { DailyRepository } from "src/daily/domain/model/DailyRepository";
import { DailyService, DailyServiceImpl } from "src/daily/domain/service";
import { doesObjectHasNoUndefinedProperties } from 'src/util/test';
import { createDailyDetatilRequestDto } from '../../api/dto/DailyDetailRequestDto.unit.test';
import { createDailyFixture } from "../model/Daily.unit.test";

describe('DailyServiceImpl', () => {
  let dailyRepository: Pick<DailyRepository, "findAllByOrderBySeqDesc">;
  let dailyService: DailyService;

  beforeEach(() => {
    dailyRepository = {
      findAllByOrderBySeqDesc: jest.fn()
    }

    dailyService = new DailyServiceImpl(dailyRepository as DailyRepository);
  })

  it('should return found daily list.', async () => {
    // given
    const daily = createDailyFixture();
    (dailyRepository.findAllByOrderBySeqDesc as jest.Mock<Promise<Daily[]>>).mockResolvedValue([daily]);

    // when
    const result = await dailyService.findAll();

    // then
    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual(createDailyListResponseDtoFrom(daily));
  })

  it('should return found single daily.', async () => {
    // given
    const req = createDailyDetatilRequestDto();

    // when
    const result = await dailyService.find(req);

    // then
    expect(doesObjectHasNoUndefinedProperties(result)).toBeTruthy();
  })
})
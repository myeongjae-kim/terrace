import 'reflect-metadata';
import { Daily } from "src/daily/domain/model";
import { DailyRepository } from "src/daily/domain/model/DailyRepository";
import { DailyService, DailyServiceImpl } from "src/daily/domain/service";
import { createDailyFixture } from "../model/Daily.unit.test";

describe('DailyServiceImpl', () => {
  let dailyRepository: Pick<DailyRepository, "find">;
  let dailyService: DailyService;

  beforeEach(() => {
    dailyRepository = {
      find: jest.fn()
    }

    dailyService = new DailyServiceImpl(dailyRepository as DailyRepository);
  })

  it('should return found dailys.', async () => {
    // given
    const daily = createDailyFixture();
    (dailyRepository.find as jest.Mock<Promise<Daily[]>>).mockResolvedValue([daily]);

    // when
    const result = await dailyService.findAll();

    // then
    expect(result).toStrictEqual([daily]);
  })
})
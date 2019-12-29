import Optional from 'optional-js';
import 'reflect-metadata';
import { createDailyListResponseDtoFrom } from "src/daily/api";
import { Daily } from 'src/daily/domain/model';
import { DailyRepository } from "src/daily/domain/model/DailyRepository";
import { DailyService, DailyServiceImpl } from "src/daily/domain/service";
import { formatDateTime } from 'src/util';
import { doesObjectHasNoUndefinedProperties } from 'src/util/test';
import { createDailyDetatilRequestDtoFixture } from '../../api/dto/DailyDetailRequestDto.unit.test';
import { createDailyFixture } from "../model/Daily.unit.test";

describe('DailyServiceImpl', () => {
  let dailyRepository: Pick<DailyRepository, "findAllByOrderBySeqDesc" | "findBySlug">;
  let dailyService: DailyService;

  beforeEach(() => {
    dailyRepository = {
      findAllByOrderBySeqDesc: jest.fn(),
      findBySlug: jest.fn()
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
    const req = createDailyDetatilRequestDtoFixture();
    const daily = createDailyFixture();

    req.year = formatDateTime(daily.createdAt, "YYYY");
    req.month = formatDateTime(daily.createdAt, "MM");
    req.day = formatDateTime(daily.createdAt, "DD");

    (dailyRepository.findBySlug as jest.Mock<Promise<Optional<Daily>>>).mockResolvedValue(Optional.ofNullable(daily));

    // when
    const result = await dailyService.find(req);

    // then
    expect(doesObjectHasNoUndefinedProperties(result)).toBeTruthy();
  })

  it('should throw an exception when a daily has not been found.', async () => {
    // given
    const req = createDailyDetatilRequestDtoFixture();

    (dailyRepository.findBySlug as jest.Mock<Promise<Optional<Daily>>>).mockResolvedValue(Optional.empty());

    // expect
    await expect(dailyService.find(req)).rejects
      .toThrow(`A daily has not been found by request: ${JSON.stringify(req)}`);
  })

  it('should throw an exception when a daily has invalid date.', async () => {
    // given
    const req = createDailyDetatilRequestDtoFixture();
    const daily = createDailyFixture();

    req.year = "9876";


    (dailyRepository.findBySlug as jest.Mock<Promise<Optional<Daily>>>).mockResolvedValue(Optional.ofNullable(daily));

    // expect
    await expect(dailyService.find(req)).rejects
      .toThrow(`A daily has not been found by request: ${JSON.stringify(req)}`);
  })
})
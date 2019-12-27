import 'reflect-metadata';
import { MusingResponseDto } from "src/musings/api/dto";
import { MusingRepository } from "src/musings/domain/model";
import { MusingService, MusingServiceImpl } from "src/musings/domain/service";
import { createMusingFixture } from '../model/Musing.unit.test';

describe('MusingServiceImpl', () => {

  let musingService: MusingService;
  let musingRepository: Pick<MusingRepository, 'find'>;

  beforeEach(() => {
    musingRepository = {
      find: jest.fn()
    }
    musingService = new MusingServiceImpl(musingRepository as MusingRepository);
  })

  it('should returns found musings.', async () => {
    // given
    const musing = createMusingFixture();
    (musingRepository.find as jest.Mock<Promise<MusingResponseDto[]>>).mockResolvedValue([musing])

    // when
    const result = await musingService.findAll();

    // then
    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual(musing);
  })
})

import { inject, injectable } from "inversify";
import { TYPES } from "server/common/inversify/types";
import { MusingResponseDto } from "src/musings/api/dto";
import { MusingRepository } from "src/musings/domain/model";
import { MusingService } from "src/musings/domain/service";

@injectable()
export class MusingServiceImpl implements MusingService {
  public constructor(
    @inject(TYPES.MusingRepository) private musingRepository: MusingRepository
  ) { }

  public findAll = (): Promise<MusingResponseDto[]> => this.musingRepository.find();
}
import Axios from "axios";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { MusingResponseDto } from "./dto";

export const musingsFetcher = {
  findAll: (): Promise<MusingResponseDto> => new Promise((resolve, rejected) => {
    Axios.get<MusingResponseDto>("/musings/api")
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)))
  })
}
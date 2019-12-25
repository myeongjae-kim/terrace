import Axios from "axios";
import { API_HOST } from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { MusingResponseDto } from "./dto";

export const musingsFetcher = {
  findAll: (): Promise<MusingResponseDto> => new Promise((resolve, rejected) => {
    Axios.get<MusingResponseDto>(`${API_HOST}/musings/api`)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)))
  })
}
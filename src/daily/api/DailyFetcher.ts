import Axios from "axios";
import { API_HOST } from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { DailyListResponseDto } from "./dto";

export const dailyFetcher = {
  findAll: (): Promise<DailyListResponseDto> => new Promise((resolve, rejected) => {
    Axios.get<DailyListResponseDto>(`${API_HOST}/daily/api`)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)))
  })
}
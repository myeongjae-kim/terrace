import Axios from "axios";
import { API_HOST } from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { DailyDetailRequestDto, DailyDetailResponseDto, DailyListResponseDto } from "./dto";

export const dailyFetcher = {
  findAll: (): Promise<DailyListResponseDto[]> => new Promise((resolve, rejected) => {
    Axios.get<DailyListResponseDto[]>(`${API_HOST}/daily/api`)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  find: ({ year, month, day, slug }: DailyDetailRequestDto): Promise<DailyDetailResponseDto> =>
    new Promise((resolve, rejected) => {
      Axios.get<DailyDetailResponseDto>(`${API_HOST}/daily/api/${year}/${month}/${day}/${slug}`)
        .then(res => resolve(res.data))
        .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
    }),
};

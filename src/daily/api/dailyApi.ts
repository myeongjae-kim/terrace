import Axios from "axios";
import { API_HOST, Endpoints } from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { DailyPathDto, DailyDetailResponseDto, DailyListResponseDto, DailyRequestDto } from "./dto";
import { CreationResponse } from "src/common/api/dto/CreationResponse";

export const dailyApi = {
  findAll: (): Promise<DailyListResponseDto[]> => new Promise((resolve, rejected) => {
    Axios.get<DailyListResponseDto[]>(`${API_HOST}/daily/api`)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  find: ({ year, month, day, slug }: DailyPathDto): Promise<DailyDetailResponseDto> =>
    new Promise((resolve, rejected) => {
      Axios.get<DailyDetailResponseDto>(`${API_HOST}/daily/api/${year}/${month}/${day}/${slug}`)
        .then(res => resolve(res.data))
        .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
    }),

  create: (request: DailyRequestDto): Promise<CreationResponse> => new Promise((resolve, rejected) => {
    Axios.post<CreationResponse>(`${API_HOST}${Endpoints.daily}/api`, request)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  update: (request: DailyRequestDto, path: string): Promise<void> => new Promise((resolve, rejected) => {
    Axios.put<void>(`${API_HOST}${Endpoints.daily}/api${path}`, request)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  delete: ({ year, month, day, slug }: DailyPathDto): Promise<void> => new Promise((resolve, rejected) => {
    Axios.delete<void>(`${API_HOST}${Endpoints.daily}/api/${year}/${month}/${day}/${slug}`)
      .then(() => resolve())
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),
};

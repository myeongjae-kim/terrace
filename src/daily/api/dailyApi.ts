import Axios from "axios";
import { API_HOST } from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { DailyDetailRequestDto, DailyDetailResponseDto, DailyListResponseDto } from "./dto";
import {request} from "universal-rxjs-ajax";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ApiError } from "server/common/error/ApiError";
import { AjaxError } from "rxjs/ajax";

export const dailyApi = {

  findAll: (): Promise<DailyListResponseDto[]> => new Promise((resolve, rejected) => {
    Axios.get<DailyListResponseDto[]>(`${API_HOST}/daily/api`)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),


  find: ({ year, month, day, slug }: DailyDetailRequestDto): Observable<DailyDetailResponseDto> => 
    request({url: `${API_HOST}/daily/api/${year}/${month}/${day}/${slug}`}).pipe(
      map(({response}) => response as DailyDetailResponseDto),
      catchError((e: AjaxError) => { throw ApiError.from(e); }))
};

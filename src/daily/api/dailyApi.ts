import { API_HOST } from "src/common/constants/Constants";
import { DailyDetailRequestDto, DailyDetailResponseDto, DailyListResponseDto } from "./dto";
import {request} from "universal-rxjs-ajax";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ApiError } from "server/common/error/ApiError";
import { AjaxError } from "rxjs/ajax";

export const dailyApi = {
  findAll: (): Observable<DailyListResponseDto[]> =>
    request({url: `${API_HOST}/daily/api`}).pipe(
      map(({response}) => response as DailyListResponseDto[]),
      catchError((e: AjaxError) => { throw ApiError.from(e); })),

  find: ({ year, month, day, slug }: DailyDetailRequestDto): Observable<DailyDetailResponseDto> => 
    request({url: `${API_HOST}/daily/api/${year}/${month}/${day}/${slug}`}).pipe(
      map(({response}) => response as DailyDetailResponseDto),
      catchError((e: AjaxError) => { throw ApiError.from(e); }))
};

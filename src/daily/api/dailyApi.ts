import Axios from "axios";
import {API_HOST, Endpoints} from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import {DailyDetailResponseDto, DailyListResponseDto, DailyPathDto, DailyRequestDto} from "./dto";
import {CreationResponse} from "src/common/api/dto/CreationResponse";
import {formatDateTime} from "../../util";
import RepositoryError from "../../common/domain/model/RepositoryError";

interface DailyAttributes {
  seq: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  title: string;
  content: string;
}

interface DailyArticleListStrapi {
  id: number;
  attributes: Omit<DailyAttributes, "content">
}

interface DailyArticleStrapi {
  id: number;
  attributes: DailyAttributes
}

export const dailyApi = {
  findAll: (): Promise<DailyListResponseDto[]> => new Promise((resolve, rejected) => {
    Axios.get<{data: DailyArticleListStrapi[]}>(`${API_HOST}${Endpoints.daily}`, {params: {
      fields: ["seq", "title", "slug"],
      sort: ["seq:desc"],
      "pagination[pageSize]": 10000 // TODO: 페이지네이션 구현, 최대 100개밖에 안 온다.
    }})
      .then(res => resolve(res.data.data.map(it => ({
        id: "" + it.id,
        seq: it.attributes.seq,
        createdAt: it.attributes.createdAt,
        uri: "/daily" + formatDateTime(it.attributes.createdAt, "/YYYY/MM/DD/") + it.attributes.slug,
        title: it.attributes.title,
      }))))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  find: ({ slug }: DailyPathDto): Promise<DailyDetailResponseDto> =>
    new Promise((resolve, rejected) => {
      Axios.get<{data: DailyArticleStrapi[]}>(`${API_HOST}${Endpoints.daily}`, {params: {
        "filters[slug][$eq]": slug
      }})
        .then(res => res.data.data.map(it => ({
          id: "" + it.id,
          seq: it.attributes.seq,
          createdAt: it.attributes.createdAt,
          updatedAt: it.attributes.updatedAt,
          title: it.attributes.title,
          slug: it.attributes.slug,
          content: it.attributes.content,
        })))
        .then(it => {
          const response: DailyDetailResponseDto | undefined = it[0];
          if (typeof response === "undefined") {
            rejected(RepositoryError.of()); // TODO: 상세한 에러정보 추가
          } else {
            resolve(response);
          }
        })
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

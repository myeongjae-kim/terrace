import Axios from "axios";
import {API_HOST, Endpoints} from "src/common/constants/Constants";
import {DailyDetailResponseDto, DailyListResponseDto, DailyPathDto} from "./dto";
import {formatDateTime} from "src/util";
import RepositoryError from "src/common/exception/RepositoryError";
import {StrapiResponse} from "src/common/domain/StrapiResponse";

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

const listFields = ["seq", "title", "slug", "created_at"];

export const dailyApi = {
  findAll: (page = 1): Promise<StrapiResponse<DailyListResponseDto>> => new Promise((resolve, rejected) => {
    Axios.get<StrapiResponse<DailyArticleListStrapi>>(`${API_HOST}${Endpoints.daily}`, {params: {
      fields: listFields,
      sort: ["seq:desc"],
      "pagination[page]": page,
      "pagination[pageSize]": 20,
    }})
      .then(res => ({
        data: res.data.data.map(it => ({
          id: "" + it.id,
          seq: it.attributes.seq,
          createdAt: it.attributes.createdAt,
          uri: "/daily" + formatDateTime(it.attributes.createdAt, "/YYYY/MM/DD/") + it.attributes.slug,
          title: it.attributes.title,
        })),
        meta: res.data.meta
      }))
      .then(res => resolve(res))
      .catch(e => rejected(RepositoryError.of(e)));
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
        .catch(e => rejected(RepositoryError.of(e)));
    }),
};

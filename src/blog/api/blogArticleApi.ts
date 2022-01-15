import Axios from "axios";
import {CreationResponse} from "src/common/api/dto/CreationResponse";
import {API_HOST, Endpoints} from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import {
  BlogArticleDetailResponseDto,
  BlogArticleListResponseDto,
  BlogArticlePathDto,
  BlogArticleRequestDto
} from "./dto";
import {formatDateTime} from "../../util";
import RepositoryError from "../../common/domain/model/RepositoryError";

interface BlogAttributes {
  seq: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  title: string;
  content: string;
}

interface BlogArticleListStrapi {
  id: number;
  attributes: Omit<BlogAttributes, "content">
}

interface BlogArticleStrapi {
  id: number;
  attributes: BlogAttributes
}

export const blogArticleApi = {
  findAll: (): Promise<BlogArticleListResponseDto[]> => new Promise((resolve, rejected) => {
    Axios.get<{data: BlogArticleListStrapi[]}>(`${API_HOST}${Endpoints.blog}`, {params: {
      fields: ["seq", "title", "slug"],
      sort: ["seq:desc"],
      "pagination[pageSize]": 10000 // TODO: 페이지네이션 구현, 최대 100개밖에 안 온다.
    }})
      .then(res => resolve(res.data.data.map(it => ({
        id: "" + it.id,
        seq: it.attributes.seq,
        createdAt: it.attributes.createdAt,
        uri: "/blog" + formatDateTime(it.attributes.createdAt, "/YYYY/MM/DD/") + it.attributes.slug,
        title: it.attributes.title,
      }))))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  find: ({ slug }: BlogArticlePathDto): Promise<BlogArticleDetailResponseDto> =>
    new Promise((resolve, rejected) => {
      Axios.get<{data: BlogArticleStrapi[]}>(`${API_HOST}${Endpoints.blog}`, {params: {
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
          // TODO: prev, next 가져오기.. 어떻게 가져오지?
          prev: {
            id: "-1",
            createdAt: "",
            title: "",
            uri: "",
          },
          next: {
            id: "-1",
            createdAt: "",
            title: "",
            uri: "",
          }
        })))
        .then(it => {
          const response: BlogArticleDetailResponseDto | undefined = it[0];
          if (typeof response === "undefined") {
            rejected(RepositoryError.of()); // TODO: 상세한 에러정보 추가
          } else {
            resolve(response);
          }
        })
        .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
    }),

  create: (request: BlogArticleRequestDto): Promise<CreationResponse> => new Promise((resolve, rejected) => {
    Axios.post<CreationResponse>(`${API_HOST}${Endpoints.blog}/api`, request)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  update: (request: BlogArticleRequestDto, path: string): Promise<void> => new Promise((resolve, rejected) => {
    Axios.put<void>(`${API_HOST}${Endpoints.blog}/api${path}`, request)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  delete: ({ year, month, day, slug }: BlogArticlePathDto): Promise<void> => new Promise((resolve, rejected) => {
    Axios.delete<void>(`${API_HOST}${Endpoints.blog}/api/${year}/${month}/${day}/${slug}`)
      .then(() => resolve())
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),
};

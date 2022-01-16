import Axios from "axios";
import {CreationResponse} from "src/common/api/dto/CreationResponse";
import {API_HOST, Endpoints} from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import {
  BlogArticleDetailResponseDto,
  BlogArticleListResponseDto,
  BlogArticlePathDto, BlogArticlePrevOrNext,
  BlogArticleRequestDto
} from "./dto";
import RepositoryError from "../../common/domain/model/RepositoryError";
import Optional from "optional-js";
import {BlogArticle} from "../domain/model";

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

const listFields = ["seq", "title", "slug"];

interface BlogArticleStrapi {
  id: number;
  attributes: BlogAttributes
}

const defaultPrevOrNext: BlogArticlePrevOrNext = {
  id: "",
  createdAt: "",
  title: "",
  uri: "",
};

const convertListToPrevOrNext = (list: BlogArticleListStrapi | undefined): BlogArticlePrevOrNext =>
  Optional.ofNullable(list).map(it => ({
    id: "" + it.id,
    createdAt: it.attributes.createdAt,
    title: it.attributes.title,
    uri: BlogArticle.createUri({createdAt: it.attributes.createdAt, slug: it.attributes.slug}),
  })).orElse(defaultPrevOrNext);

export const blogArticleApi = {
  findAll: (): Promise<BlogArticleListResponseDto[]> => new Promise((resolve, rejected) => {
    Axios.get<{data: BlogArticleListStrapi[]}>(`${API_HOST}${Endpoints.blog}`, {params: {
      fields: listFields,
      sort: ["seq:desc"],
      "pagination[pageSize]": 10000 // TODO: 페이지네이션 구현, 최대 100개밖에 안 온다.
    }})
      .then(res => resolve(res.data.data.map(it => ({
        id: "" + it.id,
        seq: it.attributes.seq,
        createdAt: it.attributes.createdAt,
        uri: BlogArticle.createUri({createdAt: it.attributes.createdAt, slug: it.attributes.slug}),
        title: it.attributes.title,
      }))))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  find: async ({ slug }: BlogArticlePathDto): Promise<BlogArticleDetailResponseDto> => {
    const article: BlogArticleStrapi | undefined =
      await Axios.get<{ data: BlogArticleStrapi[] }>(`${API_HOST}${Endpoints.blog}`, {
        params: {
          "filters[slug][$eq]": slug
        }
      }).then(it => it.data.data[0]);
    if (typeof article === "undefined") {
      throw RepositoryError.of();
    }

    const promiseToGetPrev: Promise<BlogArticleStrapi | undefined> =
      Axios.get<{ data: BlogArticleStrapi[] }>(`${API_HOST}${Endpoints.blog}`, {
        params: {
          "filters[seq][$lt]": article.attributes.seq,
          "sort": ["seq:desc"],
          "pagination[pageSize]": 1
        }
      }).then(it => it.data.data[0]);

    const promiseToGetNext:Promise<BlogArticleStrapi | undefined> =
      Axios.get<{ data: BlogArticleStrapi[] }>(`${API_HOST}${Endpoints.blog}`, {
        params: {
          "filters[seq][$gt]": article.attributes.seq,
          "sort": ["seq:asc"],
          "pagination[pageSize]": 1
        }
      }).then(it => it.data.data[0]);

    const [prev, next] = await Promise.all([promiseToGetPrev, promiseToGetNext]);

    return {
      id: "" + article.id,
      seq: article.attributes.seq,
      createdAt: article.attributes.createdAt,
      updatedAt: article.attributes.updatedAt,
      title: article.attributes.title,
      slug: article.attributes.slug,
      content: article.attributes.content,
      prev: convertListToPrevOrNext(prev),
      next: convertListToPrevOrNext(next)
    };
  },

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

  getPrevOf: async (seq: string): Promise<BlogArticlePrevOrNext> => {
    const prev: BlogArticleListStrapi | undefined =
      await Axios.get<{ data: BlogArticleListStrapi[] }>(`${API_HOST}${Endpoints.blog}`, {
        params: {
          "filters[seq][$lt]": seq,
          "sort": ["seq:desc"],
          "pagination[pageSize]": 1,
          "fields": listFields
        }
      }).then(it => it.data.data[0]);

    return convertListToPrevOrNext(prev);
  },

  getNextOf: async (seq: string): Promise<BlogArticlePrevOrNext> => {
    const prev: BlogArticleListStrapi | undefined =
      await Axios.get<{ data: BlogArticleListStrapi[] }>(`${API_HOST}${Endpoints.blog}`, {
        params: {
          "filters[seq][$gt]": seq,
          "sort": ["seq:asc"],
          "pagination[pageSize]": 1,
          "fields": listFields
        }
      }).then(it => it.data.data[0]);

    return convertListToPrevOrNext(prev);
  }
};

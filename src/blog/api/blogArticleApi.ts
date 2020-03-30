import Axios from "axios";
import { CreationResponse } from "src/common/api/dto/CreationResponse";
import { API_HOST, Endpoints } from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { BlogArticleDetailResponseDto, BlogArticleListResponseDto, BlogArticlePathDto, BlogArticleRequestDto } from "./dto";

export const blogArticleApi = {
  findAll: (): Promise<BlogArticleListResponseDto[]> => new Promise((resolve, rejected) => {
    Axios.get<BlogArticleListResponseDto[]>(`${API_HOST}${Endpoints.blog}/api`)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  find: ({ year, month, day, slug }: BlogArticlePathDto): Promise<BlogArticleDetailResponseDto> =>
    new Promise((resolve, rejected) => {
      Axios.get<BlogArticleDetailResponseDto>(`${API_HOST}${Endpoints.blog}/api/${year}/${month}/${day}/${slug}`)
        .then(res => resolve(res.data))
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

import Axios from "axios";
import { API_HOST } from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { BlogArticleDetailRequestDto, BlogArticleDetailResponseDto, BlogArticleListResponseDto } from "./dto";

export const blogArticleFetcher = {
  findAll: (): Promise<BlogArticleListResponseDto[]> => new Promise((resolve, rejected) => {
    Axios.get<BlogArticleListResponseDto[]>(`${API_HOST}/blog/api`)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)))
  }),

  find: ({ year, month, day, slug }: BlogArticleDetailRequestDto): Promise<BlogArticleDetailResponseDto> =>
    new Promise((resolve, rejected) => {
      Axios.get<BlogArticleDetailResponseDto>(`${API_HOST}/blog/api/${year}/${month}/${day}/${slug}`)
        .then(res => resolve(res.data))
        .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)))
    }),
}

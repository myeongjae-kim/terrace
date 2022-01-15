import Axios from "axios";
import {API_HOST, Endpoints} from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { MusingResponseDto } from "./dto";

interface MusingAttributes {
  seq: number;
  createdAt: string;
  updatedAt: string;
  quote: string;
  from: string;
  language: string;
}

interface MusingStrapi {
  id: number;
  attributes: MusingAttributes
}

export const musingsFetcher = {
  findAll: (): Promise<MusingResponseDto[]> => new Promise((resolve, rejected) => {
    Axios.get<{data: MusingStrapi[]}>(`${API_HOST}${Endpoints.musings}`, {params: {
      "pagination[pageSize]": 10000 // TODO: 페이지네이션 구현, 최대 100개밖에 안 온다.
    }})
      .then(res => resolve(res.data.data.map(it => ({
        id: "" + it.id,
        quote: it.attributes.quote,
        from: it.attributes.from,
        language: it.attributes.language,
      }))))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  })
};

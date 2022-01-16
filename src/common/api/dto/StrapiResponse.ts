import {StrapiPagination} from "../../domain/model/StrapiPagination";

export interface StrapiResponse<T> {
  data: T[],
  meta: {
    pagination: StrapiPagination
  }
}

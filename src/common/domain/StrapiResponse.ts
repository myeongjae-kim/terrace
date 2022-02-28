import {StrapiPagination} from "./StrapiPagination";

export interface StrapiResponse<T> {
  data: T[],
  meta: {
    pagination: StrapiPagination
  }
}

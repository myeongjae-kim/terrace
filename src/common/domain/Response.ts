import {Page} from "./Page";

export interface Response<T> {
  data: T[],
  meta: {
    pagination: Page
  }
}

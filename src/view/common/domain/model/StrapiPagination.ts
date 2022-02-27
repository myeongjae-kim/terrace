export interface StrapiPagination {
  "page": number, // 현재 페이지
  "pageSize": number, // 한 페이지당 크기
  "pageCount": number, // 총 페이지 개수
  "total": number // 총 element 개수
}

export const strapiPaginationDefault: StrapiPagination = {
  page: 1,
  pageSize: 25,
  pageCount: 1,
  total: 0
};

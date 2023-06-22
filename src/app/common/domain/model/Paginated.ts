export type Paginated<T> = {
  content: T[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

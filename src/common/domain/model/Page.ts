export default interface Page<T> {
  content: T[]
  pageable: {
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    pageSize: number
    pageNumber: number
    offset: number
    unpaged: boolean
    paged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  numberOfElements: number
  size: number
  number: number
  empty: boolean
}
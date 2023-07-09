import { myRequire } from '@/app/common/utils/myRequire';

export const getPageNumber = (page?: string | string[]) => {
  const pageNumber = Math.floor(Number(typeof page === 'undefined' ? '1' : page));
  myRequire(pageNumber > 0, 'pageNumber > 0');

  return pageNumber;
};

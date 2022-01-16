import {useRouter} from "next/router";
import * as React from "react";

export const usePaginationHrefGenerator = (): (page:number) => string => {
  const router = useRouter();
  return React.useCallback((page: number) => `${router.pathname}?page=${page}`, [router.pathname]);
};

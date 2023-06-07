import {Page} from "../../../../domain/Page";
import React from "react";
import {Link} from "src/common/view/presentation/components/molecules";
import {useRouter} from "next/router";
import {usePaginationHrefGenerator} from "src/util/usePaginationHrefGenerator";
import {Pagination, PaginationItem} from "@mui/material";
import {returnCreateLinkClickHandler} from "../../../../../util";

interface Props {
  pagination: Page
}

export const MyPagination = (props: Props) => {
  const {pagination} = props;
  const router = useRouter();
  const hrefGenerator = usePaginationHrefGenerator();

  const createLinkClickHandler = React.useMemo(() => returnCreateLinkClickHandler(router), [router]);
  const onChange = React.useCallback((e: React.ChangeEvent<unknown>, page: number) => {
    createLinkClickHandler(hrefGenerator(page))(e as unknown as React.MouseEvent<any, MouseEvent>);
  }, [createLinkClickHandler, hrefGenerator]);

  return <Pagination
    page={pagination.page}
    count={pagination.pageCount}
    shape="rounded"
    onChange={onChange}
    renderItem={(item) => (
      <PaginationItem
        {...(item as any)}
        href={hrefGenerator(item.page)}
        component={Link}
      />
    )}
  />;
};

export default MyPagination;

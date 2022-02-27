import {StrapiPagination} from "../../../domain/model/StrapiPagination";
import React from "react";
import {Link} from "src/view/common/presentation/components/molecules";
import {Pagination, PaginationItem} from "@material-ui/lab";
import {useRouter} from "next/router";
import {usePaginationHrefGenerator} from "src/util/usePaginationHrefGenerator";

interface Props {
  pagination: StrapiPagination
}

export const MyPagination = (props: Props) => {
  const {pagination} = props;
  const router = useRouter();
  const hrefGenerator = usePaginationHrefGenerator();
  const onChange = React.useCallback((_: React.ChangeEvent<unknown>, page: number) => {
    router.push(hrefGenerator(page)).then();
  }, [hrefGenerator, router]);

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

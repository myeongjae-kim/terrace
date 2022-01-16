import {StrapiPagination} from "../../../domain/model/StrapiPagination";
import {DisplayProps} from "../molecules";
import React from "react";
import {Link} from "src/common/presentation/components/molecules";

interface Props {
  pagination: StrapiPagination
  hrefGenerator: (pageNumber: number) => string
}

export const MyPagination = (props: Props) => {
  const {pagination, hrefGenerator} = props;

  return <div>
    <DisplayProps {...props} />
    <Link href={hrefGenerator(pagination.page + 1)}>nextPage</Link>
  </div>;
};

export default MyPagination;

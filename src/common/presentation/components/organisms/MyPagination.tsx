import {StrapiPagination} from "../../../domain/model/StrapiPagination";
import {DisplayProps} from "../molecules";
import React from "react";

interface Props {
  pagination: StrapiPagination
  goToPage: (pageNumber: number) => void
}

export const MyPagination = (props: Props) => {
  return <div><DisplayProps {...props} /></div>;
};

export default MyPagination;

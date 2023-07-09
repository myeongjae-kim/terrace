import { Href, MyLinkComponent } from '@/app/common/domain/model/MyLinkComponent';
import React from 'react';

const PageNotCurrent = (props: {
  Link: MyLinkComponent;
  href: Href;
  pageNumber: number | string;
}) => {
  return (
    <props.Link
      href={props.href}
      className="mx-0.5 flex h-8 items-center justify-center rounded bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      {props.pageNumber}
    </props.Link>
  );
};

export default PageNotCurrent;

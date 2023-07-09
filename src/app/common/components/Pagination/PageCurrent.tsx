import { Href, MyLinkComponent } from '@/app/common/domain/model/MyLinkComponent';
import React from 'react';

const PageCurrent = (props: { Link: MyLinkComponent; href: Href; pageNumber: number | string }) => {
  return (
    <props.Link
      href={props.href}
      aria-current="page"
      className="z-10 mx-0.5 flex h-8 items-center justify-center rounded bg-blue-50 px-3 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white"
    >
      {props.pageNumber}
    </props.Link>
  );
};

export default PageCurrent;

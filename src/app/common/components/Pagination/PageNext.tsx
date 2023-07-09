import { Href, MyLinkComponent } from '@/app/common/domain/model/MyLinkComponent';
import React from 'react';
import PageNavigationLink from '@/app/common/components/Pagination/PageNavigationLink';

const Next = (props: { Link: MyLinkComponent; href: Href; disabled?: boolean }) => {
  return (
    <PageNavigationLink Link={props.Link} disabled={props.disabled} href={props.href}>
      <span className="sr-only">Next</span>
      <svg
        className="h-2.5 w-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 9 4-4-4-4"
        />
      </svg>
    </PageNavigationLink>
  );
};

export default Next;

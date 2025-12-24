import React, { type JSX } from 'react';
import { MyLinkComponent } from '@/app/common/domain/model/MyLinkComponent';
import { createRange } from '@/app/common/utils/createRange';
import PagePrev from '@/app/common/components/Pagination/PagePrev';
import PageCurrent from '@/app/common/components/Pagination/PageCurrent';
import PageNotCurrent from '@/app/common/components/Pagination/PageNotCurrent';
import PageNext from '@/app/common/components/Pagination/PageNext';

type Props = React.ComponentProps<'nav'> & {
  Link: MyLinkComponent;
  currentPage: number;
  totalPages: number;
  createHref: (pageNumber: number) => string;
};

const Pagination = ({
  Link,
  currentPage,
  totalPages,
  createHref,
  ...props
}: Props): JSX.Element => {
  return (
    <nav aria-label="Page navigation" className={'select-none py-1'} {...props}>
      <ul className="flex h-8 list-none items-center -space-x-px ps-0 text-sm">
        <li>
          <PagePrev Link={Link} href={createHref(currentPage - 1)} disabled={currentPage === 1} />
        </li>

        {createRange(1, totalPages).map((pageNumber) => {
          const isCurrent = pageNumber === currentPage;
          const Component = isCurrent ? PageCurrent : PageNotCurrent;
          return (
            <li key={pageNumber}>
              <Component
                Link={Link}
                href={isCurrent ? '#' : createHref(pageNumber)}
                pageNumber={pageNumber}
              />
            </li>
          );
        })}

        <li>
          <PageNext
            Link={Link}
            href={createHref(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

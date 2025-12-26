import React from 'react';
import { createRange } from '../../domain/model/createRange';
import PageCurrent from '../molecules/pagination/PageCurrent';
import PageNext from '../molecules/pagination/PageNext';
import PageNotCurrent from '../molecules/pagination/PageNotCurrent';
import PagePrev from '../molecules/pagination/PagePrev';
import type { JSX } from 'react';

type Props = React.ComponentProps<'nav'> & {
  currentPage: number;
  totalPages: number;
  createHref: (pageNumber: number) => string;
};

const Pagination = ({ currentPage, totalPages, createHref, ...props }: Props): JSX.Element => {
  return (
    <nav aria-label="Page navigation" className={'py-1 select-none'} {...props}>
      <ul className="flex h-8 list-none items-center -space-x-px ps-0 text-sm">
        <li>
          <PagePrev to={createHref(currentPage - 1)} disabled={currentPage === 1} />
        </li>

        {createRange(1, totalPages).map((pageNumber) => {
          const isCurrent = pageNumber === currentPage;
          const Component = isCurrent ? PageCurrent : PageNotCurrent;
          return (
            <li key={pageNumber}>
              <Component to={createHref(pageNumber)} pageNumber={pageNumber} />
            </li>
          );
        })}

        <li>
          <PageNext to={createHref(currentPage + 1)} disabled={currentPage === totalPages} />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

'use client';

import React from 'react';
import { TOC_ID } from '@/app/common/domain/model/constants';

type Props = {
  contentsRef: React.RefObject<HTMLDivElement>;
};

type Heading = {
  depth: number;
  id: string;
  innerHTML: string;
};

const render = (headings: Heading[], curr = 0): string => {
  if (headings.length === 0) {
    return '';
  }

  if (headings.length - 1 === curr) {
    return `<li><a href="#${headings[curr].id}">${headings[curr].innerHTML}</a></li>`;
  }

  const nextDepth = headings[curr + 1].depth;

  if (nextDepth > headings[curr].depth) {
    return `<li><a href="#${headings[curr].id}">${headings[curr].innerHTML}</a></li><ul>${render(
      headings,
      curr + 1,
    )}`;
  }

  if (nextDepth < headings[curr].depth) {
    return `<li><a href="#${headings[curr].id}">${headings[curr].innerHTML}</a></li></ul>${render(
      headings,
      curr + 1,
    )}`;
  }

  return `<li><a href="#${headings[curr].id}">${headings[curr].innerHTML}</a></li>${render(
    headings,
    curr + 1,
  )}`;
};

const TableOfContents = ({ contentsRef }: Props): JSX.Element => {
  const [headings, setHeadings] = React.useState<Heading[]>([]);

  React.useEffect(() => {
    if (!contentsRef.current) {
      return;
    }

    setHeadings(
      [...contentsRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((block) => ({
        depth: parseInt(block.tagName[1]),
        id: block.id,
        innerHTML: block.innerHTML,
      })),
    );
  }, [contentsRef]);

  return headings.length > 0 ? (
    <>
      <div className={'mb-4 flex'}>
        <div className={'rounded-lg bg-stone-50 p-2 text-sm leading-6'}>
          <strong id={TOC_ID} className={'select-none'}>
            목차
          </strong>
          <div dangerouslySetInnerHTML={{ __html: `<ul>${render(headings)}</ul>` }}></div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default TableOfContents;

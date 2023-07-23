import React from 'react';
import { constants } from '@/app/common/domain/model/constants';
import { HTMLElement } from 'node-html-parser';

type Props = {
  htmlElement: HTMLElement;
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
    return `<li><a href="#${headings[curr].id}">${
      headings[curr].innerHTML
    }</a></li><li class="list-none"><ul>${render(headings, curr + 1)}`;
  }

  if (nextDepth < headings[curr].depth) {
    return `<li><a href="#${headings[curr].id}">${
      headings[curr].innerHTML
    }</a></li></ul></li>${render(headings, curr + 1)}`;
  }

  return `<li><a href="#${headings[curr].id}">${headings[curr].innerHTML}</a></li>${render(
    headings,
    curr + 1,
  )}`;
};

const TableOfContents = ({ htmlElement }: Props): JSX.Element => {
  const headings: Heading[] = htmlElement
    .querySelectorAll('h1, h2, h3, h4, h5, h6')
    .map((block) => ({
      depth: parseInt(block.tagName[1]),
      id: block.id,
      innerHTML: block.innerHTML,
    }));

  return headings.length > 0 ? (
    <>
      <nav
        id={constants.TOC_WRAPPER_NAV}
        className={'mb-4 flex max-w-md 2xl:fixed 2xl:left-2 2xl:top-2 2xl:max-w-xs'}
      >
        <div className={'rounded-lg bg-stone-50 p-2 text-sm leading-6 2xl:bg-transparent'}>
          <span id={constants.TOC_ID} className={'select-none font-bold'}>
            목차
          </span>
          <div dangerouslySetInnerHTML={{ __html: `<ul>${render(headings)}</ul>` }}></div>
        </div>
      </nav>
    </>
  ) : (
    <></>
  );
};

export default TableOfContents;

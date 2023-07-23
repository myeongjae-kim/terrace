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
      <div className={'mb-4 flex'}>
        <div className={'rounded-lg bg-stone-50 p-2 text-sm leading-6'}>
          <span id={constants.TOC_ID} className={'select-none font-bold'}>
            목차
          </span>
          <div dangerouslySetInnerHTML={{ __html: `<ul>${render(headings)}</ul>` }}></div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default TableOfContents;

'use client';

import React from 'react';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import clsx from 'clsx';
import { inconsolata } from '@/app/common/fonts/inconsolata';
import dynamic from 'next/dynamic';
import TableOfContents from '@/app/blog/components/TableOfContents';

const AceNoSsr = dynamic(() => import('./AceWrapper'), { ssr: false });

type Props = {
  content: string;
  contentToRender: string;
  setContentToRender: (content: string) => void;
};

const BlogArticleEditor = ({
  content,
  contentToRender,
  setContentToRender,
}: Props): JSX.Element => {
  const editingContent = React.useRef(content);

  React.useEffect(() => {
    setInterval(() => {
      setContentToRender(editingContent.current);
    }, 1500);
  }, [setContentToRender]);

  const height = 'sm:h-[calc(100vh-80px)]';
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div className={'flex w-full flex-col flex-col-reverse sm:flex-row'}>
      <div
        className={clsx(
          'm-4 w-[calc(100vw-40px)] overflow-scroll rounded p-4 ring-2 ring-stone-300 sm:w-[45%] 2xl:w-[40%]',
          height,
        )}
      >
        <TableOfContents contentsRef={ref} />
        <MarkdownRenderer ref={ref} className={'leading-[1.8]'} markdown={contentToRender} />
      </div>
      <AceNoSsr
        className={clsx(
          'my-4 h-[calc(100vh-80px)]  w-full sm:w-[55%] 2xl:w-[60%]',
          height,
          inconsolata.className,
        )}
        defaultValue={content}
        onChange={(e) => {
          editingContent.current = e;
        }}
        style={{ width: undefined, height: undefined, lineHeight: 1.6 }}
        fontSize={14}
      />
    </div>
  );
};

export default BlogArticleEditor;

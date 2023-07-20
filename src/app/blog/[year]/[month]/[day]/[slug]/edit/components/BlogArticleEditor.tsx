'use client';

import React from 'react';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import clsx from 'clsx';
import { inconsolata } from '@/app/common/fonts/inconsolata';
import dynamic from 'next/dynamic';

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

  return (
    <div className={'flex w-full'}>
      <div
        className={
          'm-4 h-[calc(100vh-210px)] w-[45%] overflow-scroll rounded p-4 ring-2 ring-stone-300 2xl:w-[40%]'
        }
      >
        <MarkdownRenderer className={'leading-[1.8]'} markdown={contentToRender} />
      </div>
      <AceNoSsr
        className={clsx('my-4 w-[55%] 2xl:w-[60%]', inconsolata.className)}
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

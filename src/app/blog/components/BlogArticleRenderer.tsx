'use client';

import React from 'react';
import TableOfContents from '@/app/blog/components/TableOfContents';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import { Article } from '@/app/common/domain/model/Article';

type Props = {
  article: Article;
};

const BlogArticleRenderer = ({ article }: Props): JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <TableOfContents contentsRef={ref} />
      <MarkdownRenderer ref={ref} className={'mb-4 leading-[1.8]'} markdown={article.content} />
    </>
  );
};

export default BlogArticleRenderer;

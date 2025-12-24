import React, { type JSX } from 'react';
import { toSlug } from '@/app/common/domain/model/toSlug';
import { formatDate } from '@/app/common/domain/model/formatDate';
import { UrlObject } from 'url';
import { ArticleListResponse } from '@/app/common/domain/model/ArticleInList';
import { twMerge } from 'tailwind-merge';

type Props = {
  Link: React.ComponentType<React.PropsWithChildren<{ href: string | UrlObject }>>;
  article: ArticleListResponse;
  className?: string;
};

const BlogListElement = ({ Link, article, className }: Props): JSX.Element => {
  return (
    <Link href={`/blog/${toSlug(article)}`}>
      <div
        className={twMerge(
          'my-2 max-w-2xl p-3 text-center hover:cursor-pointer hover:bg-stone-50',
          className,
        )}
      >
        <div>{article.title}</div>
        <div style={{ color: 'initial' }}>{formatDate(article.created_at)}</div>
      </div>
    </Link>
  );
};

export default BlogListElement;

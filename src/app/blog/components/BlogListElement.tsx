import { ArticleInList } from '@/app/articles/domain/ArticleInList';
import { formatDate } from '@/app/common/domain/model/formatDate';
import { toSlug } from '@/app/common/domain/model/toSlug';
import React, { type JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import { UrlObject } from 'url';

type Props = {
  Link: React.ComponentType<React.PropsWithChildren<{ href: string | UrlObject }>>;
  article: ArticleInList;
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

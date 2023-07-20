import React from 'react';
import { toSlug } from '@/app/common/domain/model/toSlug';
import { formatDate } from '@/app/common/domain/model/formatDate';
import { UrlObject } from 'url';
import { ArticleListResponse } from '@/app/common/domain/model/ArticleInList';

type Props = {
  Link: React.ComponentType<React.PropsWithChildren<{ href: string | UrlObject }>>;
  article: ArticleListResponse;
};

const BlogListElement = ({ Link, article }: Props): JSX.Element => {
  return (
    <Link href={`/blog/${toSlug(article)}`}>
      <div className={'my-2 max-w-2xl p-3 text-center hover:cursor-pointer hover:bg-stone-50'}>
        <div>{article.title}</div>
        <div style={{ color: 'initial' }}>{formatDate(article.created_at)}</div>
      </div>
    </Link>
  );
};

export default BlogListElement;

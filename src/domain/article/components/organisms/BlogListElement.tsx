import { Link } from '@tanstack/react-router';
import type { JSX } from 'react';
import { formatDate } from '@/domain/common/model/formatDate';
import { toSlug } from '@/domain/common/model/toSlug';
import { cn } from '@/lib/utils';

type Props = {
  article: { title: string; created_at: Date | null; slug: string };
  className?: string;
};

const BlogListElement = ({ article, className }: Props): JSX.Element => {
  return (
    <Link to={'/blog/' + toSlug(article)}>
      <div
        className={cn(
          'my-2 max-w-2xl p-3 text-center hover:cursor-pointer hover:bg-stone-50',
          className,
        )}
      >
        <div>{article.title}</div>
        <div style={{ color: 'initial' }}>
          {article.created_at && formatDate(article.created_at)}
        </div>
      </div>
    </Link>
  );
};

export default BlogListElement;

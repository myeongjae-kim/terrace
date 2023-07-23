import React from 'react';
import { PageProps } from '@/app/common/nextjs/PageProps';
import BlogArticleFormContainer from '@/app/blog/containers/BlogArticleFormContainer';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { cookies } from 'next/headers';

export const fetchCache = 'force-no-store';

type Props = PageProps<{ slug: string }>;

const BlogArticleEditPage = async ({ params }: Props) => {
  const supabase = createArticlePersistenceAdapter(
    createServerComponentClient<Database>({ cookies }),
  );

  const article = await supabase.getBySlug({
    category: 'BLOG_ARTICLE',
    slug: params.slug,
  });

  return (
    <BlogArticleFormContainer
      createOrEdit={'edit'}
      seq={article.seq + ''}
      slug={article.slug}
      title={article.title}
      content={article.content}
    />
  );
};

export default BlogArticleEditPage;

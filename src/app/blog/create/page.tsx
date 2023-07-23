import React from 'react';
import BlogArticleFormContainer from '@/app/blog/containers/BlogArticleFormContainer';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { cookies } from 'next/headers';

export const fetchCache = 'force-no-store';

const BlogArticleCreatePage = async () => {
  const supabase = createArticlePersistenceAdapter(
    createServerComponentClient<Database>({ cookies }),
  );

  const nextSeq = await supabase.getNextSeq({ category: 'BLOG_ARTICLE' });

  return (
    <BlogArticleFormContainer
      createOrEdit={'create'}
      seq={nextSeq + ''}
      slug={''}
      title={''}
      content={''}
      published_at={null}
    />
  );
};

export default BlogArticleCreatePage;

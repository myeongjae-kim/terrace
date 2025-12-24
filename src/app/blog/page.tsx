import PageHeader from '@/app/common/components/PageHeader';
import Link from 'next/link';

import BlogListElement from '@/app/blog/components/BlogListElement';
import Pagination from '@/app/common/components/Pagination';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { getPageNumber } from '@/app/common/nextjs/getPageNumber';
import { Metadata } from 'next';
import { constants } from '@/app/common/domain/model/constants';
import { createMetadata } from '@/app/common/domain/model/createMetadata';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import clsx from 'clsx';
import { addSeqToTitle, addWipEmojiToTitle } from '@/app/common/domain/model/Article';
import { match } from 'ts-pattern';
import Button from '@/app/common/components/Button';

export const metadata: Metadata = createMetadata({
  title: constants.createTitle('Blog'),
  description: '글 목록',
});

const BlogPage = async (props: PageProps) => {
  const pageNumber = getPageNumber(props.searchParams?.page);
  const adapter = createArticlePersistenceAdapter();
  const articles = await adapter.findAll({
    category: 'BLOG_ARTICLE',
    page: pageNumber,
    pageSize: 10,
  });

  const isOwner = await adapter.isOwner();

  return (
    <main className="flex grow flex-col items-center justify-between">
      <PageHeader>Articles</PageHeader>
      {isOwner && (
        <div className={'absolute left-2 top-2'}>
          <Link href={'/blog/create'}>
            <Button>작성</Button>
          </Link>
        </div>
      )}
      <div className={'-mt-3 grow'}>
        {articles.content.map((article) => (
          <BlogListElement
            key={article.id}
            Link={Link}
            article={match(isOwner)
              .with(true, () => addWipEmojiToTitle(addSeqToTitle(article)))
              .with(false, () => article)
              .exhaustive()}
            className={clsx(article.published_at || 'opacity-50')}
          />
        ))}
      </div>
      <Pagination
        Link={Link}
        currentPage={articles.page}
        totalPages={articles.pageCount}
        createHref={(pageNumber) => `/blog?page=${pageNumber}`}
      />
    </main>
  );
};

export default BlogPage;

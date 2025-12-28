import PageHeader from '@/app/common/components/PageHeader';
import Link from 'next/link';

import { addSeqToTitle, addWipEmojiToTitle } from '@/app/articles/domain/Article';
import BlogListElement from '@/app/blog/components/BlogListElement';
import Button from '@/app/common/components/Button';
import Pagination from '@/app/common/components/Pagination';
import { constants } from '@/app/common/domain/model/constants';
import { createMetadata } from '@/app/common/domain/model/createMetadata';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { getPageNumber } from '@/app/common/nextjs/getPageNumber';
import clsx from 'clsx';
import { Metadata } from 'next';
import { match } from 'ts-pattern';
import { isOwner } from '../auth/domain/application/isOwner';
import { applicationContext } from '../config/ApplicationContext';

export const metadata: Metadata = createMetadata({
  title: constants.createTitle('Blog'),
  description: '글 목록',
});

const BlogPage = async (props: PageProps) => {
  const pageNumber = getPageNumber((await props.searchParams)?.page);
  const owner = await isOwner();

  const articles = await applicationContext().getBean('FindAllArticlesUseCase').findAll({
    category: 'BLOG_ARTICLE',
    page: pageNumber,
    pageSize: 10,
    isOwner: owner,
  });

  return (
    <main className="flex grow flex-col items-center justify-between">
      <PageHeader>Articles</PageHeader>
      {owner && (
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
            article={match(owner)
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

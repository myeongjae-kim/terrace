import PageHeader from '@/app/common/components/PageHeader';
import Link from 'next/link';
import BlogListElement from '@/app/blog/components/BlogListElement';
import Pagination from '@/app/common/components/Pagination';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { getPageNumber } from '@/app/common/nextjs/getPageNumber';
import { Metadata } from 'next';
import { constants } from '@/app/common/domain/model/constants';
import { createMetadata } from '@/app/common/domain/model/createMetadata';
import { articlePersistenceAdapter } from '@/app/common/adapter/articlePersistenceAdapter';

export const metadata: Metadata = createMetadata({
  title: constants.createTitle('Blog'),
});

const BlogPage = async (props: PageProps) => {
  const pageNumber = getPageNumber(props.searchParams?.page);
  const articles = await articlePersistenceAdapter.findAll({
    category: 'BLOG_ARTICLE',
    page: pageNumber,
    pageSize: 10,
  });

  return (
    <main className="flex grow flex-col items-center justify-between">
      <PageHeader>Articles</PageHeader>
      <div className={'-mt-3 grow'}>
        {articles.content.map((article) => (
          <BlogListElement key={article.id} Link={Link} article={article} />
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

import { blogPersistenceAdapter } from '@/app/blog/adapter/blogPersistenceAdapter';
import PageHeader from '@/app/common/components/PageHeader';
import Link from 'next/link';
import BlogListElement from '@/app/blog/components/BlogListElement';
import Pagination from '@/app/common/components/Pagination';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { getPageNumber } from '@/app/common/nextjs/getPageNumber';

const BlogPage = async (props: PageProps) => {
  const pageNumber = getPageNumber(props.searchParams?.page);
  const articles = await blogPersistenceAdapter.findAll(pageNumber);

  return (
    <main className="flex flex-col items-center justify-between">
      <PageHeader>Articles</PageHeader>
      <div className={'-my-3'}>
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

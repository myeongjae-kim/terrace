import { blogPersistenceAdapter } from '@/app/blog/adapter/blogPersistenceAdapter';
import PageHeader from '@/app/common/components/PageHeader';
import Link from 'next/link';
import BlogListElement from '@/app/blog/components/BlogListElement';

const BlogPage = async () => {
  const articles = await blogPersistenceAdapter.findAll(1);

  return (
    <main className="flex flex-col items-center justify-between">
      <PageHeader>Articles</PageHeader>
      <div className={'-my-3'}>
        {articles.content.map((article) => (
          <BlogListElement key={article.id} Link={Link} article={article} />
        ))}
      </div>
      <div>
        page: {articles.page}
        <br />
        pageSize: {articles.pageSize}
        <br />
        pageCount: {articles.pageCount}
        <br />
        total: {articles.total}
      </div>
    </main>
  );
};

export default BlogPage;

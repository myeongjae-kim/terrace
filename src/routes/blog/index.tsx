import { createFileRoute } from '@tanstack/react-router';
import { createArticlePersistenceAdapter } from '@/domain/article/adapter/createArticlePersistenceAdapter';
import BlogListElement from '@/domain/article/components/organisms/BlogListElement';
import PageHeader from '@/domain/common/components/oragnisms/PageHeader';
import Pagination from '@/domain/common/components/oragnisms/Pagination';

export const Route = createFileRoute('/blog/')({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      page: Number(search.page) || 1,
    };
  },
  loaderDeps: ({ search }) => {
    return {
      page: Number(search.page) || 1,
    };
  },
  loader: async ({ deps }) => {
    const page = deps.page;
    const adapter = createArticlePersistenceAdapter();

    const articles = await adapter.findAll({
      category: 'BLOG_ARTICLE',
      page,
      pageSize: 10,
    });

    return { articles };
  },
});

function RouteComponent() {
  const { articles } = Route.useLoaderData();

  return (
    <main className="flex grow flex-col items-center justify-between">
      <PageHeader>Articles</PageHeader>
      <div className={'-mt-3 grow'}>
        {articles.content.map((article) => {
          const displayArticle = article;
          return <BlogListElement key={displayArticle.id} article={displayArticle} />;
        })}
      </div>
      <Pagination
        currentPage={articles.page}
        totalPages={articles.pageCount}
        createHref={(pageNumber) => `/blog?page=${pageNumber}`}
      />
    </main>
  );
}

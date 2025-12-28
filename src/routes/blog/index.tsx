import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { createArticlePersistenceAdapter } from '@/domain/article/adapter/createArticlePersistenceAdapter';
import BlogListElement from '@/domain/article/components/organisms/BlogListElement';
import PageHeader from '@/domain/common/components/oragnisms/PageHeader';
import Pagination from '@/domain/common/components/oragnisms/Pagination';

const findAll = createServerFn()
  .inputValidator(
    z.object({
      page: z.number().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const adapter = createArticlePersistenceAdapter();

    const article = await adapter.findAll({
      category: 'BLOG_ARTICLE',
      page: data.page,
      pageSize: 10,
    });

    return article;
  });

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

    const articles = await findAll({
      data: {
        page,
      },
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

import { Link, createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { createArticlePersistenceAdapter } from '@/domain/article/adapter/createArticlePersistenceAdapter';
import PageHeader from '@/domain/common/components/oragnisms/PageHeader';
import Pagination from '@/domain/common/components/oragnisms/Pagination';
import { inconsolata, suit } from '@/domain/common/domain/fonts';
import { formatDate } from '@/domain/common/model/formatDate';
import { toSlug } from '@/domain/common/model/toSlug';
import { cn } from '@/lib/utils';

const findAll = createServerFn()
  .inputValidator(
    z.object({
      page: z.number().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const adapter = createArticlePersistenceAdapter();

    return adapter.findAll({
      category: 'DAILY_ARTICLE',
      page: data.page,
      pageSize: 20,
    });
  });

export const Route = createFileRoute('/daily/')({
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

    const dailies = await findAll({
      data: {
        page,
      },
    });

    return { dailies };
  },
});

function RouteComponent() {
  const { dailies } = Route.useLoaderData();

  return (
    <main className="flex grow flex-col items-center justify-between">
      <PageHeader>Daily</PageHeader>
      <div className={'flex grow flex-col items-center'}>
        <div
          className={[
            suit.className,
            inconsolata.className,
            cn('my-2 flex grow flex-col gap-0.5 text-[15px]'),
          ].join(' ')}
        >
          {dailies.content.map((daily) => {
            const displayDaily = daily;
            return (
              <Link key={displayDaily.id} to={'/daily/' + toSlug(displayDaily)}>
                <div className={cn('flex', !displayDaily.published_at && 'opacity-50')}>
                  <div className={'w-8 text-right'}>{displayDaily.seq}.</div>
                  <div>[{displayDaily.created_at && formatDate(displayDaily.created_at, '.')}]</div>
                  <div className={'w-56 pl-1 text-[0.9rem]'}>{displayDaily.title}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <Pagination
          currentPage={dailies.page}
          totalPages={dailies.pageCount}
          createHref={(pageNumber) => `/daily?page=${pageNumber}`}
        />
      </div>
    </main>
  );
}

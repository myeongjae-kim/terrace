import { dailyPersistenceAdapter } from '@/app/daily/adapter/dailyPersistenceAdapter';
import PageHeader from '@/app/common/components/PageHeader';
import Link from 'next/link';
import Pagination from '@/app/common/components/Pagination';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { getPageNumber } from '@/app/common/nextjs/getPageNumber';
import { formatDate } from '@/app/common/domain/model/formatDate';
import { inconsolata } from '@/app/common/fonts/inconsolata';
import { suit } from '@/app/common/fonts/suit';
import { toSlug } from '@/app/common/domain/model/toSlug';

const DailyPage = async (props: PageProps) => {
  const pageNumber = getPageNumber(props.searchParams?.page);
  const dailies = await dailyPersistenceAdapter.findAll(pageNumber);

  return (
    <main className="flex flex-col items-center justify-between">
      <PageHeader>Daily</PageHeader>
      <div
        className={'mt-3 text-[15px]'}
        style={{
          ...inconsolata.style,
          fontFamily: inconsolata.style.fontFamily + ', ' + suit.style.fontFamily,
        }}
      >
        {dailies.content.map((daily) => (
          <Link key={daily.id} href={'/daily/' + toSlug(daily)}>
            <div className={'flex'}>
              <div className={'w-8 text-right'}>{daily.seq}.</div>
              <div>[{formatDate(daily.created_at, '.')}]</div>
              <div className={'w-56 pl-1 text-[0.9rem]'}>{daily.title}</div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        Link={Link}
        currentPage={dailies.page}
        totalPages={dailies.pageCount}
        createHref={(pageNumber) => `/daily?page=${pageNumber}`}
      />
    </main>
  );
};

export default DailyPage;

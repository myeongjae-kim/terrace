import { addWipEmojiToTitle } from '@/app/articles/domain/Article';
import { isOwner } from '@/app/auth/domain/application/isOwner';
import Button from '@/app/common/components/Button';
import PageHeader from '@/app/common/components/PageHeader';
import Pagination from '@/app/common/components/Pagination';
import { constants } from '@/app/common/domain/model/constants';
import { createMetadata } from '@/app/common/domain/model/createMetadata';
import { formatDate } from '@/app/common/domain/model/formatDate';
import { toSlug } from '@/app/common/domain/model/toSlug';
import { inconsolata } from '@/app/common/fonts/inconsolata';
import { suit } from '@/app/common/fonts/suit';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { getPageNumber } from '@/app/common/nextjs/getPageNumber';
import { applicationContext } from '@/app/config/ApplicationContext';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = createMetadata({
  title: constants.createTitle('Daily'),
  description: '글 목록',
});

const DailyPage = async (props: PageProps) => {
  const pageNumber = getPageNumber((await props.searchParams)?.page);

  const owner = await isOwner();
  const dailies = await applicationContext.getBean('FindAllArticlesUseCase').findAll({
    category: 'DAILY_ARTICLE',
    page: pageNumber,
    pageSize: 20,
    isOwner: owner,
  });

  return (
    <main className="flex grow flex-col items-center justify-between">
      <PageHeader>
        Daily
        {owner && (
          <div className={'absolute left-2 top-2'}>
            <Link href="/daily/create">
              <Button>작성</Button>
            </Link>
          </div>
        )}
      </PageHeader>
      <div className={'flex grow flex-col items-center'}>
        <div
          className={'my-2 flex grow flex-col gap-0.5 text-[15px]'}
          style={{
            ...inconsolata.style,
            fontFamily: inconsolata.style.fontFamily + ', ' + suit.style.fontFamily,
          }}
        >
          {dailies.content.map((daily) => {
            const displayDaily = owner ? addWipEmojiToTitle(daily) : daily;
            return (
              <Link key={displayDaily.id} href={'/daily/' + toSlug(displayDaily)}>
                <div className={clsx('flex', !displayDaily.published_at && 'opacity-50')}>
                  <div className={'w-8 text-right'}>{displayDaily.seq}.</div>
                  <div>[{formatDate(displayDaily.created_at, '.')}]</div>
                  <div className={'w-56 pl-1 text-[0.9rem]'}>{displayDaily.title}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <Pagination
          Link={Link}
          currentPage={dailies.page}
          totalPages={dailies.pageCount}
          createHref={(pageNumber) => `/daily?page=${pageNumber}`}
        />
      </div>
    </main>
  );
};

export default DailyPage;

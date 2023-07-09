import React from 'react';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { formatDate } from '@/app/common/domain/model/formatDate';
import Link from 'next/link';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import { dailyPersistenceAdapter } from '@/app/daily/adapter/dailyPersistenceAdapter';

const DailyArticlePage = async (props: PageProps<{ slug: string }>): Promise<JSX.Element> => {
  const article = await dailyPersistenceAdapter.getBySlug(props.params.slug);

  return (
    <main className={'w-full max-w-[32rem]'}>
      <div className={'text-center'}>
        <Link href={''} className={'text-black'}>
          <div className={'m-4'}>
            {article.seq}. [{formatDate(article.created_at, '.')}] {article.title}
          </div>
        </Link>
      </div>
      <div className={'px-4 py-1'}>
        <div className={'daily-content'} style={{ padding: 0 }}>
          <MarkdownRenderer className={'m-4 text-sm leading-[1.8]'} markdown={article.content} />
        </div>
      </div>
    </main>
  );
};

export default DailyArticlePage;

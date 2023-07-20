import React from 'react';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { formatDate } from '@/app/common/domain/model/formatDate';
import Link from 'next/link';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import Comment from '@/app/common/components/Comment';
import { Metadata } from 'next';
import { createTitle } from '@/app/common/domain/model/constants';
import { createMetadata } from '@/app/common/domain/model/createMetadata';
import { articlePersistenceAdapter } from '@/app/common/adapter/articlePersistenceAdapter';

type Props = PageProps<{ slug: string }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await articlePersistenceAdapter.getBySlug({
    category: 'DAILY_ARTICLE',
    slug: params.slug,
  });

  return createMetadata({
    title: createTitle(article.title),
    description: article.content.substring(0, 512),
  });
}

const DailyArticlePage = async (props: Props): Promise<JSX.Element> => {
  const article = await articlePersistenceAdapter.getBySlug({
    category: 'DAILY_ARTICLE',
    slug: props.params.slug,
  });
  const commentIdentifier = `daily/${formatDate(article.created_at, '/')}/${article.slug}`;

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
        <Comment identifier={commentIdentifier} />
      </div>
    </main>
  );
};

export default DailyArticlePage;

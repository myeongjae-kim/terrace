import React, { type JSX } from 'react';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { formatDate } from '@/app/common/domain/model/formatDate';
import Link from 'next/link';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import Comment from '@/app/common/components/Comment';
import { Metadata } from 'next';
import { constants } from '@/app/common/domain/model/constants';
import { createMetadata } from '@/app/common/domain/model/createMetadata';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import Button from '@/app/common/components/Button';

type Props = PageProps<{ slug: string }>;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const adapter = createArticlePersistenceAdapter();
  const article = await adapter.getBySlug({
    category: 'DAILY_ARTICLE',
    slug: params.slug,
  });

  return createMetadata({
    title: constants.createTitle(article.title),
    description: article.content.substring(0, 512),
  });
}

const DailyArticlePage = async (props: Props): Promise<JSX.Element> => {
  const adapter = createArticlePersistenceAdapter();
  const article = await adapter.getBySlug({
    category: 'DAILY_ARTICLE',
    slug: (await props.params).slug,
  });
  const isOwner = await adapter.isOwner();
  const commentIdentifier = `daily/${formatDate(article.created_at, '/')}/${article.slug}`;

  return (
    <main className={'w-full max-w-[32rem]'}>
      <div className={'text-center'}>
        <Link href={''} className={'text-black'}>
          <div className={'m-4'}>
            {article.seq}. [{formatDate(article.created_at, '.')}] {article.title}
          </div>
        </Link>
        {isOwner && (
          <div className="mb-4">
            <Link href={`/daily/${formatDate(article.created_at, '/')}/${article.slug}/edit`}>
              <Button>수정</Button>
            </Link>
          </div>
        )}
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

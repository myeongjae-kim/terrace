import { isOwner } from '@/app/auth/domain/application/isOwner';
import Button from '@/app/common/components/Button';
import Comment from '@/app/common/components/Comment';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import { constants } from '@/app/common/domain/model/constants';
import { createMetadata } from '@/app/common/domain/model/createMetadata';
import { formatDate } from '@/app/common/domain/model/formatDate';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { applicationContext } from '@/app/config/ApplicationContext';
import { Metadata } from 'next';
import Link from 'next/link';
import { type JSX } from 'react';

type Props = PageProps<{ slug: string }>;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const article = await applicationContext()
    .getBean('GetArticleBySlugUseCase')
    .getBySlug({
      category: 'DAILY_ARTICLE',
      slug: params.slug,
      isOwner: await isOwner(),
    });

  return createMetadata({
    title: constants.createTitle(article.title),
    description: article.content.substring(0, 512),
  });
}

const DailyArticlePage = async (props: Props): Promise<JSX.Element> => {
  const owner = await isOwner();
  const article = await applicationContext()
    .getBean('GetArticleBySlugUseCase')
    .getBySlug({
      category: 'DAILY_ARTICLE',
      slug: (await props.params).slug,
      isOwner: owner,
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
        {owner && (
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

import { addSeqToTitle, addWipEmojiToTitle } from '@/app/articles/domain/Article';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import Button from '@/app/common/components/Button';
import Comment from '@/app/common/components/Comment';
import MarkdownRendererContainer from '@/app/common/containers/MarkdownRendererContainer';
import { constants } from '@/app/common/domain/model/constants';
import { createMetadata } from '@/app/common/domain/model/createMetadata';
import { formatDate } from '@/app/common/domain/model/formatDate';
import { toSlug } from '@/app/common/domain/model/toSlug';
import { PageProps } from '@/app/common/nextjs/PageProps';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { type JSX } from 'react';
import { match } from 'ts-pattern';

type Props = PageProps<{ slug: string }>;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const adapter = createArticlePersistenceAdapter();

  const article = await adapter.getBySlug({
    category: 'BLOG_ARTICLE',
    slug: params.slug,
  });

  return createMetadata({
    title: constants.createTitle(article.title),
    description: article.content.substring(0, 512),
  });
}

const BlogArticlePage = async (props: Props): Promise<JSX.Element> => {
  const adapter = createArticlePersistenceAdapter();
  const article = await adapter.getBySlug({
    category: 'BLOG_ARTICLE',
    slug: (await props.params).slug,
  });
  const [prev, next] = await Promise.all(
    [adapter.getPrevOf, adapter.getNextOf].map((f) =>
      f({ category: 'BLOG_ARTICLE', seq: article.seq }),
    ),
  );
  const commentIdentifier = `blog/${formatDate(article.created_at, '/')}/${article.slug}`;

  const isOwner = await adapter.isOwner();

  return (
    <main className={'w-full max-w-[50rem]'}>
      <div className={'text-center'}>
        <Link href={'#'} className={'text-black'}>
          <h1 className={clsx('m-4', article.published_at || 'opacity-50')}>
            {match(isOwner)
              .with(true, () => addWipEmojiToTitle(addSeqToTitle(article)).title)
              .with(false, () => article.title)
              .exhaustive()}
          </h1>
        </Link>
        <p className={'cursor-default select-none'}>{formatDate(article.created_at)}</p>
        {isOwner && (
          <Link href={`./${article.slug}/edit`}>
            <Button>수정</Button>
          </Link>
        )}
      </div>
      <div className={'m-4'}>
        <MarkdownRendererContainer
          className={'mb-4 leading-[1.8]'}
          markdown={article.content}
          enableToc
        />
        <div className={'text-sm'}>
          <hr />
          <div className={'my-4 flex flex-col gap-1.5 text-center'}>
            {!!next.id && (
              <>
                <div className={'select-none'}>Next Article</div>
                <Link href={`/blog/${toSlug(next)}`}>{next.title}</Link>
              </>
            )}
            {!!prev.id && (
              <>
                <div className={'select-none'}>Previous Article</div>
                <Link href={`/blog/${toSlug(prev)}`}>{prev.title}</Link>
              </>
            )}
          </div>
          <hr />
          <div className={'my-4 flex justify-center'}>
            <Link href={'/blog'}>
              <button
                type="button"
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Article List
              </button>
            </Link>
          </div>
        </div>

        <Comment identifier={commentIdentifier} />
      </div>
    </main>
  );
};

export default BlogArticlePage;

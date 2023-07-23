'use client';

import React from 'react';
import BlogArticleEditor from '@/app/blog/[year]/[month]/[day]/[slug]/edit/components/BlogArticleEditor';
import { useForm } from 'react-hook-form';
import { ArticleFormModel, ArticleFormSchema } from '@/app/common/domain/model/ArticleFormModel';
import Input from '@/app/common/components/Input';
import Button from '@/app/common/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

type CreateOrEdit = 'create' | 'edit';
type Props = ArticleFormModel & {
  createOrEdit: CreateOrEdit;
};

const getLocalStorageKey = (createOrEdit: CreateOrEdit, slug: string) =>
  `@terrace/blog-article/${createOrEdit === 'create' ? 'writing' : slug}`;
const serializeForm = (form: ArticleFormModel) => JSON.stringify(form);
const deserializeForm = (serialized: string) => JSON.parse(serialized) as ArticleFormModel;
const getEditPathname = (slug: string) => `/blog/${dayjs().format('YYYY/MM/DD')}/${slug}/edit`;

const fetchResponseHandler = (
  response: Promise<Response>,
  onSuccess?: () => void,
  onFailure?: () => void,
) =>
  new Promise<void>((resolve, reject) => {
    response
      .then((it) => {
        if (it.status < 300) {
          alert('저장했습니다.');
          onSuccess?.();
          resolve();
          return;
        }

        onFailure?.();
        it.json().then((json) => alert(JSON.stringify(json, null, 2)));
        reject();
      })
      .catch(() => {
        alert('실패');
        onFailure?.();

        reject();
      });
  });

const updateHandler =
  (createOrEdit: 'create' | 'edit', pathname: string, router: AppRouterInstance) =>
  (data: ArticleFormModel) => {
    return fetchResponseHandler(
      fetch(pathname + '/api', {
        method: createOrEdit === 'create' ? 'POST' : 'PUT',
        body: JSON.stringify({ ...data, seq: parseInt(data.seq) }),
      }),
      () => {
        if (createOrEdit === 'create') {
          localStorage.removeItem(getLocalStorageKey(createOrEdit, data.slug));
          router.push(getEditPathname(data.slug));
        }
      },
    );
  };

const publish = (arg: Pick<ArticleFormModel, 'slug'>, onSuccess?: () => void) =>
  fetchResponseHandler(
    fetch('/blog/publish/api', {
      method: 'PATCH',
      body: JSON.stringify(arg),
    }),
    onSuccess,
  );

const unpublish = (arg: Pick<ArticleFormModel, 'slug'>, onSuccess?: () => void) =>
  fetchResponseHandler(
    fetch('/blog/unpublish/api', {
      method: 'PATCH',
      body: JSON.stringify(arg),
    }),
    onSuccess,
  );

const BlogArticleFormContainer = ({
  seq,
  slug,
  title,
  content,
  published_at,
  createOrEdit,
}: Props): JSX.Element => {
  const form = useForm<ArticleFormModel>({
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: { seq, slug, title, content },
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const [contentToRender, setContentToRender] = React.useState<string>(content);
  const [persistedContent, setPersistedContent] = React.useState<string | null>(null);

  React.useEffect(() => {
    const persisted = localStorage.getItem(getLocalStorageKey(createOrEdit, slug));
    if (
      persisted &&
      (confirm('편집중이던 글을 불러올까요?\n취소를 누르면 저장된 글이 사라집니다.') ||
        confirm('진짜 사라집니다??\n취소를 누르면 저장된 글이 사라집니다.'))
    ) {
      const article = deserializeForm(persisted);
      setContentToRender(article.content);
      setPersistedContent(article.content);
      setValue('seq', article.seq);
      setValue('slug', article.slug);
      setValue('title', article.title);
    } else {
      setContentToRender(content);
      setPersistedContent(content);
      localStorage.removeItem(getLocalStorageKey(createOrEdit, slug));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setContentToRenderWithPersistence = React.useCallback(
    (arg: string) => {
      if (content !== arg) {
        localStorage.setItem(
          getLocalStorageKey(createOrEdit, slug),
          serializeForm({ ...form.getValues(), content: arg }),
        );
      }
      setContentToRender(arg);
      setValue('content', arg);
    },
    [content, form, setValue, slug],
  );

  const pathname = usePathname();
  const router = useRouter();

  return (
    <form
      className={'w-full'}
      onSubmit={handleSubmit(updateHandler(createOrEdit, pathname, router))}
    >
      <div
        className={
          'mx-4 flex flex-col items-start items-end justify-center gap-2 sm:flex-row sm:gap-4'
        }
      >
        {createOrEdit === 'edit' && (
          <div>
            <Button
              type={'button'}
              onClick={() => {
                (published_at ? unpublish({ slug: slug }) : publish({ slug: slug })).then(() => {
                  router.refresh();
                });
              }}
            >
              {published_at ? '발행취소' : '발행'}
            </Button>
          </div>
        )}
        <Input
          label={'seq'}
          wrapperAdditionalClassName={'flex-[1_1_0%]'}
          {...register('seq')}
          error={errors.seq?.message}
        />
        <Input
          label={'slug'}
          wrapperAdditionalClassName={'flex-[4_4_0%]'}
          {...register('slug')}
          error={errors.slug?.message}
        />
        <Input
          label={'title'}
          wrapperAdditionalClassName={'flex-[7_7_0%]'}
          error={errors.title?.message}
          {...register('title')}
        />
        <div className={'my-4 sm:mb-0 sm:mt-7'}>
          <Button type={'submit'}>{createOrEdit === 'create' ? '작성' : '편집'}</Button>
        </div>
      </div>
      {persistedContent !== null && (
        <BlogArticleEditor
          content={persistedContent}
          contentToRender={contentToRender}
          setContentToRender={setContentToRenderWithPersistence}
        />
      )}
    </form>
  );
};

export default BlogArticleFormContainer;

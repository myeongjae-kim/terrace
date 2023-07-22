'use client';

import React from 'react';
import BlogArticleEditor from '@/app/blog/[year]/[month]/[day]/[slug]/edit/components/BlogArticleEditor';
import { useForm } from 'react-hook-form';
import { ArticleFormModel, ArticleFormSchema } from '@/app/common/domain/model/ArticleFormModel';
import Input from '@/app/common/components/Input';
import Button from '@/app/common/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';

type Props = ArticleFormModel;

const getLocalStorageKey = (slug?: string) => `@terrace/blog-article/${slug ?? 'writing'}`;
const serializeForm = (form: ArticleFormModel) => JSON.stringify(form);
const deserializeForm = (serialized: string) => JSON.parse(serialized) as ArticleFormModel;

const BlogArticleFormContainer = ({ seq, slug, title, content }: Props): JSX.Element => {
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
    const persisted = localStorage.getItem(getLocalStorageKey(slug));
    if (
      persisted &&
      confirm('편집중이던 글을 불러올까요?\n취소를 누르면 저장된 글이 사라집니다.')
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
      localStorage.removeItem(getLocalStorageKey(slug));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setContentToRenderWithPersistence = React.useCallback(
    (arg: string) => {
      if (content !== arg) {
        localStorage.setItem(
          getLocalStorageKey(slug),
          serializeForm({ ...form.getValues(), content: arg }),
        );
      }
      setContentToRender(arg);
      setValue('content', arg);
    },
    [content, form, setValue, slug],
  );

  const pathname = usePathname();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        fetch(pathname + '/api', {
          method: 'PUT',
          body: JSON.stringify({ ...data, seq: parseInt(data.seq) }),
        })
          .then((it) => {
            if (it.status < 300) {
              alert('저장했습니다.');
            } else {
              it.json().then((json) => alert(JSON.stringify(json, null, 2)));
            }
          })
          .catch(() => {
            alert('실패');
          });
      })}
    >
      <div
        className={
          'mx-4 flex flex-col items-start items-end justify-center gap-2 sm:flex-row sm:gap-4'
        }
      >
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
          <Button type={'submit'}>완료</Button>
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

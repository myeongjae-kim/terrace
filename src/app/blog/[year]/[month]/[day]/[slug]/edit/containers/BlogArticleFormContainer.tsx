'use client';

import React from 'react';
import BlogArticleEditor from '@/app/blog/[year]/[month]/[day]/[slug]/edit/components/BlogArticleEditor';
import { useForm } from 'react-hook-form';
import { ArticleFormModel } from '@/app/common/domain/model/ArticleFormModel';
import Input from '@/app/common/components/Input';

type Props = ArticleFormModel;

const getLocalStorageKey = (slug?: string) => `@terrace/blog-article/${slug ?? 'writing'}`;
const serializeForm = (form: ArticleFormModel) => JSON.stringify(form);
const deserializeForm = (serialized: string) => JSON.parse(serialized) as ArticleFormModel;

const BlogArticleFormContainer = ({ seq, slug, title, content }: Props): JSX.Element => {
  const form = useForm<ArticleFormModel>({ defaultValues: { seq, slug, title, content } });
  const { register, setValue } = form;

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

  return (
    <form>
      <div className={'mx-4 flex flex-wrap justify-center gap-4'}>
        <Input label={'seq'} wrapperAdditionalClassName={'flex-[1_1_0%]'} {...register('seq')} />
        <Input label={'slug'} wrapperAdditionalClassName={'flex-[4_4_0%]'} {...register('slug')} />
        <Input
          label={'title'}
          wrapperAdditionalClassName={'flex-[7_7_0%]'}
          {...register('title')}
        />
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

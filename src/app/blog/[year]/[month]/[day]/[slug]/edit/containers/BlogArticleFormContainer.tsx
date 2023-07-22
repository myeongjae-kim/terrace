'use client';

import React from 'react';
import BlogArticleEditor from '@/app/blog/[year]/[month]/[day]/[slug]/edit/components/BlogArticleEditor';
import { useForm } from 'react-hook-form';
import { ArticleFormModel } from '@/app/common/domain/model/ArticleFormModel';
import Input from '@/app/common/components/Input';

type Props = ArticleFormModel;

const getLocalStorageKey = (slug?: string) => `@terrace/blog-article/${slug ?? 'writing'}`;

const BlogArticleFormContainer = ({ seq, slug, title, content }: Props): JSX.Element => {
  const [contentToRender, setContentToRender] = React.useState<string>(content);
  const [persistedContent, setPersistedContent] = React.useState<string | null>(null);

  React.useEffect(() => {
    const persisted = localStorage.getItem(getLocalStorageKey(slug));
    if (
      persisted &&
      confirm('편집중이던 글을 불러올까요?\n취소를 누르면 저장된 글이 사라집니다.')
    ) {
      setContentToRender(persisted);
      setPersistedContent(persisted);
    } else {
      setContentToRender(content);
      setPersistedContent(content);
      localStorage.removeItem(getLocalStorageKey(slug));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<ArticleFormModel>({ defaultValues: { seq, slug, title, content } });
  const { register, setValue } = form;

  const setContentToRenderWithPersistence = React.useCallback(
    (arg: string) => {
      if (content !== arg) {
        localStorage.setItem(getLocalStorageKey(slug), arg);
      }
      setContentToRender(arg);
      setValue('content', arg);
    },
    [content, setValue, slug],
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

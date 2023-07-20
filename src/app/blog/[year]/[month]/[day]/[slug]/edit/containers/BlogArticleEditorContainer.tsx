'use client';

import React from 'react';
import BlogArticleEditor from '@/app/blog/[year]/[month]/[day]/[slug]/edit/components/BlogArticleEditor';

type Props = {
  slug?: string;
  content: string;
};

const getLocalStorageKey = (slug?: string) => `@terrace/blog-article/${slug ?? 'writing'}`;

const BlogArticleEditorContainer = ({ slug, content }: Props): JSX.Element => {
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

  const setContentToRenderWithPersistence = React.useCallback(
    (arg: string) => {
      if (content !== arg) {
        localStorage.setItem(getLocalStorageKey(slug), arg);
      }
      setContentToRender(arg);
    },
    [content, slug],
  );

  return (
    <>
      {persistedContent !== null && (
        <BlogArticleEditor
          content={persistedContent}
          contentToRender={contentToRender}
          setContentToRender={setContentToRenderWithPersistence}
        />
      )}
    </>
  );
};

export default BlogArticleEditorContainer;

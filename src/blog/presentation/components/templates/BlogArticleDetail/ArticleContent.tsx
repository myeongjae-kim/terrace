import * as React from 'react';
import { MarkdownPreview } from 'src/common/presentation/components/molecules';

interface Props {
  content: string
}

const ArticleContent: React.FC<Props> = ({ content }) => {
  return <MarkdownPreview markdown={content} />;
}

export default ArticleContent;
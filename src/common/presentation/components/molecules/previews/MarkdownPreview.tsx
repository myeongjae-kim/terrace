import marked from 'marked';
import * as React from 'react';
import HtmlPreview from './HtmlPreview';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  markdown: string
}

const MarkdownPreview: React.FC<Props> = (props) =>
  <HtmlPreview {...props} __html={marked(props.markdown)} />

export default MarkdownPreview;
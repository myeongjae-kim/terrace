import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import Prism from 'prismjs';
import * as React from 'react';
import { mangle } from 'marked-mangle';
import { gfmHeadingId } from 'marked-gfm-heading-id';

// 사전식
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-c.min.js';
import 'prismjs/components/prism-java.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-kotlin.min.js';
import 'prismjs/components/prism-tsx.min.js'; // prism-jsx를 import해야 에러가 안 난다.
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-vim.min.js';
import 'prismjs/components/prism-yaml.min.js';
import { forwardRef } from 'react';

type Props = React.ComponentProps<'div'> & {
  markdown: string;
};

marked.use(
  mangle(),
  gfmHeadingId(),
  markedHighlight({
    highlight(code: string, lang: string): string {
      if (Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], lang);
      } else {
        return code;
      }
    },
  }),
);

const MarkdownRenderer = (
  { markdown, style, ...props }: Props,
  ref: React.ForwardedRef<HTMLDivElement>,
): JSX.Element => (
  <div
    ref={ref}
    style={{ overflowWrap: 'anywhere', ...style }}
    {...props}
    dangerouslySetInnerHTML={{ __html: marked(markdown) }}
  ></div>
);

export default forwardRef(MarkdownRenderer);

import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import Prism from 'prismjs';
import * as React from 'react';
import { forwardRef } from 'react';
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
import TableOfContents from '@/app/blog/components/TableOfContents';
import parser from 'node-html-parser';
import { constants } from '@/app/common/domain/model/constants';

type Props = React.ComponentProps<'div'> & {
  markdown: string;
  enableToc?: boolean;
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
  { markdown, style, enableToc, ...props }: Props,
  ref: React.ForwardedRef<HTMLDivElement>,
): JSX.Element => {
  const html = marked(markdown);

  const parsedForContents = parser(html);
  parsedForContents.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((block) => {
    'flex gap-1 items-center'.split(' ').forEach((className) => {
      block.classList.add(className);
    });
    block.innerHTML = `<div>${block.innerHTML} <a class="${constants.HEADING_URL_COPY_LINK_CLASS}" href="#${block.id}" onClick="navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#${block.id}')">
  <span class="material-icons cursor-pointer select-none" style="font-size: 1.2em">
    link
  </span>
  </div>
</a>
  <span class="flex-1"></span>
  <a class="${constants.TOC_LINK_CLASS} 2xl:hidden" href="#${constants.TOC_ID}" ${constants.TOC_DATA_HEADING_ID_PROPERTY_NAME}="${block.id}">
    <span class="material-icons cursor-pointer select-none opacity-50" style="font-size: 1.2em">
      toc
    </span>
  </a>
`;
  });

  return (
    <>
      {enableToc && <TableOfContents htmlElement={parser(html)} />}
      <div
        ref={ref}
        style={{ overflowWrap: 'anywhere', ...style }}
        {...props}
        dangerouslySetInnerHTML={{ __html: parsedForContents.innerHTML }}
      />
    </>
  );
};

export default forwardRef(MarkdownRenderer);

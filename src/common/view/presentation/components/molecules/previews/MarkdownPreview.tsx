import {marked} from "marked";
import Prism from "prismjs";
import * as React from "react";
import HtmlPreview from "./HtmlPreview";

// 사전식
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-c.min.js";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-kotlin.min.js";
import "prismjs/components/prism-tsx.min.js"; // prism-jsx를 import해야 에러가 안 난다.
import "prismjs/components/prism-typescript.min.js";
import "prismjs/components/prism-vim.min.js";
import "prismjs/components/prism-yaml.min.js";

marked.setOptions({
  highlight(code: string, lang: string): string | void {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    } else {
      return code;
    }
  }
});

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  markdown: string;
}

const MarkdownPreview = (props: Props) => {
  return <HtmlPreview {...props} dangerouslySetInnerHTML={{ __html: marked(props.markdown) }} />;
};

export default MarkdownPreview;

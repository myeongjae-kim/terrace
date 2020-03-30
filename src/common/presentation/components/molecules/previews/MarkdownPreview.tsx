import marked from "marked";
import Prism from "prismjs";
import * as React from "react";
import HtmlPreview from "./HtmlPreview";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  markdown: string;
}

const MarkdownPreview: React.FC<Props> = (props) => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, [props.markdown]);

  return <HtmlPreview {...props} dangerouslySetInnerHTML={{ __html: marked(props.markdown) }} />;
};

export default MarkdownPreview;
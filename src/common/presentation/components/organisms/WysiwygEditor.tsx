import * as React from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "@toast-ui/react-editor";
import { TuiEditorWithForwardedProps } from "./EditorWarpper";

interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(() => import("./EditorWarpper"), { ssr: false });
const EditorWithForwardedRef = React.forwardRef<any, EditorPropsWithHandlers>((props, ref) => (
  <Editor {...props} forwardedRef={ref as any} />
));

interface Props extends EditorProps {
  onChange(value: string): void;

  valueType?: "markdown" | "html";
}

const WysiwygEditor: React.FC<Props> = (props) => {
  const { initialValue, previewStyle, height, initialEditType, useCommandShortcut } = props;

  const editorRef = React.useRef<typeof Editor>();
  const handleChange = React.useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const instance = (editorRef.current as any).getInstance();
    const valueType = props.valueType || "markdown";

    props.onChange(valueType === "markdown" ? instance.getMarkdown() : instance.getHtml());
  }, [props, editorRef]);

  return <div>
    <EditorWithForwardedRef
      {...props}
      initialValue={initialValue || "hello react editor world!"}
      previewStyle={previewStyle || "vertical"}
      height={height || "600px"}
      initialEditType={initialEditType || "markdown"}
      useCommandShortcut={useCommandShortcut || true}
      ref={editorRef}
      onChange={handleChange}
    />
  </div>;
};
 
export default WysiwygEditor;
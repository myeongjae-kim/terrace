import * as React from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "@toast-ui/react-editor";

const Editor = dynamic<EditorProps>(() => import("./EditorWarpper"), { ssr: false });
const ForwardedRefComponent = React.forwardRef<any, EditorProps>((props, ref) => (
  // @ts-ignore
  <Editor {...props} forwardedRef={ref} />
));

const WysiwygEditor: React.FC<EditorProps> = (props) => {
  const { initialValue, previewStyle, height, initialEditType, useCommandShortcut } = props;

  const editorRef = React.useRef<typeof Editor>();

  return <div>
    <ForwardedRefComponent
      {...props}
      initialValue={initialValue || "hello react editor world!"}
      previewStyle={previewStyle || "vertical"}
      height={height || "600px"}
      initialEditType={initialEditType || "markdown"}
      useCommandShortcut={useCommandShortcut || true}
      // @ts-ignore
      ref={editorRef}
    />
    {/* eslint-disable-next-line no-console */}
    <div onClick={() => {
      // @ts-ignore
      console.log(editorRef.current);
    }}>aaa</div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>;
};
 
export default WysiwygEditor;
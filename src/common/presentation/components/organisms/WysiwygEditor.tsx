import * as React from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "@toast-ui/react-editor";

const Editor = dynamic<EditorProps>(() => import("@toast-ui/react-editor").then(m => m.Editor), { ssr: false });

const WysiwygEditor: React.FC<EditorProps> = (props) => {
  const { initialValue, previewStyle, height, initialEditType, useCommandShortcut } = props;

  const editorRef = React.useRef<object>();

  return <div>
    <Editor
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
      console.log(editorRef.current && editorRef.current.getInstance());
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
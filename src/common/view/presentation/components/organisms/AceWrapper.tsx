import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/ext-language_tools";

const AceWrapper = (props: React.ComponentProps<typeof AceEditor>): JSX.Element => {
  return <AceEditor
    {...props}
    mode="markdown"
    theme="cobalt"
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
  />;
};

export default AceWrapper;
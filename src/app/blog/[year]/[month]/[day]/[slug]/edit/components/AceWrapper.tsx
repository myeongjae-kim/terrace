'use client';

import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-min-noconflict/mode-markdown';
import 'ace-builds/src-min-noconflict/theme-github';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/keybinding-vim';

const AceWrapper = (props: React.ComponentProps<typeof AceEditor>): JSX.Element => {
  return (
    <AceEditor
      wrapEnabled
      mode="markdown"
      theme="github"
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      keyboardHandler={'vim'}
      {...props}
    />
  );
};

export default AceWrapper;

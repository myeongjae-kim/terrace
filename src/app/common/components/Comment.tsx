'use client';

import * as React from 'react';

const initComment = (paletteType: 'light' | 'dark') => {
  const utterancesContainer = document.querySelector('#comment-container');
  if (!utterancesContainer) {
    return;
  }
  utterancesContainer.childNodes.forEach((v) => {
    v.remove();
  });

  const utterances = document.createElement('script');
  utterances.setAttribute('src', 'https://utteranc.es/client.js');
  utterances.setAttribute('repo', 'myeongjae-kim/terrace-utterances');
  utterances.setAttribute('issue-term', 'pathname');
  utterances.setAttribute('theme', paletteType === 'dark' ? 'dark-blue' : 'github-light');
  utterances.setAttribute('crossorigin', 'anonymous');
  utterances.async = true;
  utterancesContainer.appendChild(utterances);
};

interface Props {
  identifier: string;
}

const Utterances = ({ identifier }: Props) => {
  React.useEffect(() => {
    initComment('light');
  }, [identifier]);

  return (
    <div
      id="comment-container"
      style={{
        margin: 'auto',
      }}
    />
  );
};

const Comment = (props: Props) => {
  return <Utterances {...props} />;
};

export default Comment;

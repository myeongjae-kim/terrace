import { NoSsr } from '@material-ui/core';
import * as React from 'react';

interface Props {
  title: string
  identifier: string
  url: string
}

const DisqusContent: React.FC<Props> = ({ title, identifier, url }) => {
  React.useEffect(() => {
    initDisqus('myeongjae-new', identifier, title, url)
  }, [identifier])

  return <div hidden={!identifier}>
    <div id="utterances-container" style={{
      margin: 'auto',
      marginBottom: 20
    }} />
  </div>;
}

const Disqus: React.SFC<Props> = (props) => {
  return <NoSsr>
    <DisqusContent {...props} />
  </NoSsr>;
}

export default Disqus;

function initDisqus(_: string, __: string, ___: string, ____: string) {
  const utterancesContainer = document.querySelector("#utterances-container");
  utterancesContainer?.childNodes.forEach(v => { v.remove() })

  const utterances = document.createElement('script');
  utterances.setAttribute("src", 'https://utteranc.es/client.js');
  utterances.setAttribute("repo", 'myeongjae-kim/terrace-utterances');
  utterances.setAttribute("issue-term", 'pathname');
  utterances.setAttribute("theme", 'github-light');
  utterances.setAttribute("crossorigin", 'anonymous');
  utterances.async = true;
  utterancesContainer?.appendChild(utterances);
}
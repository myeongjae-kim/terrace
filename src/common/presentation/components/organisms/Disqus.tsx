import { NoSsr } from '@material-ui/core';
import * as React from 'react';

interface Props {
  title: string
  identifier: string
  url: string
}

const DisqusContent: React.FC<Props> = ({ title, identifier, url }) => {
  React.useEffect(() => {
    initDisqus('myeongjae', identifier, title, url)
  }, [identifier])

  return <div hidden={!title}>
    <div id="disqus_thread" />
    <style jsx global>{`
#disqus_thread {
  margin: auto;
  margin-bottom: 20px;
}
`}</style>
  </div>;
}

const Disqus: React.SFC<Props> = (props) => {
  return <NoSsr>
    <DisqusContent {...props} />
  </NoSsr>;
}

export default Disqus;

function initDisqus(shortname: string, identifier: string, title: string, url: string) {
  // @ts-ignore
  if (typeof (DISQUS) === 'undefined') {
    (async () => {
      const varsText = "var disqus_shortname  = \"" + shortname + "\";\n" +
        "var disqus_title      = \"" + title + "\";\n" +
        "var disqus_identifier = \"" + identifier + "\";\n" +
        "var disqus_url        = \"" + url + "\";\n";

      const varsObj = document.createElement("script");
      varsObj.type = "text/javascript";
      varsObj.async = true;
      varsObj.text = varsText;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(varsObj);

      const dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = '//' + shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  } else {
    // @ts-ignore
    DISQUS.reset({
      reload: true,
      config() {
        this.page.identifier = identifier;
        this.page.url = url;
        this.page.title = title;
      }
    });
  }
}
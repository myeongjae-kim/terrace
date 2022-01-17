import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../src/createEmotionCache";

import React from "react";

class MyDocument extends Document {
  public render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,700|Inconsolata|Bad+Script|Noto+Sans+KR:100,300,400,700|Noto+Serif+KR:300,400,700&display=swap" rel="stylesheet" />
          {/* PWA primary color */}
          <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#303030" media="(prefers-color-scheme: dark)" />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style>{`
body {
    font-family: Source Sans Pro, Noto Sans KR;
    letter-spacing: -0.01em;
    word-spacing: 0.05em;
    overflow-wrap: break-word;
    font-size: 0.875rem;
}
div {
    white-space: initial;
}
img {
    max-width: 100%;
}
code, pre {
    font-family: Inconsolata;
}
h1 {
    font-size: 2.5rem;
    font-weight: 100;
    font-family: Noto Sans KR;
    margin-top: 1.2em;
    margin-bottom: 8px;
    line-height: 1.4;
    cursor: default;
}
h2 {
    font-size: 2rem;
    font-weight: 100;
    font-family: Noto Sans KR;
    margin-top: 1.2em;
    margin-bottom: 8px;
    line-height: 1.4;
    cursor: default;
}
h3 {
    font-size: 1.25rem;
    font-weight: bold;
    font-family: Noto Sans KR;
    margin-top: 1.2em;
    margin-bottom: 8px;
    line-height: 1.4;
    cursor: default;
}
h4 {
    font-size: 1.125rem;
    font-weight: bold;
    font-family: Noto Sans KR;
    margin-top: 1.2em;
    margin-bottom: 8px;
    line-height: 1.4;
    cursor: default;
}
h5 {
    font-size: 1rem;
    font-weight: bold;
    font-family: Noto Sans KR;
    margin-top: 1.2em;
    margin-bottom: 8px;
    line-height: 1.4;
    cursor: default;
}
h6 {
    font-size: 0.875rem;
    font-weight: bold;
    font-family: Noto Sans KR;
    margin-top: 1.2em;
    margin-bottom: 8px;
    line-height: 1.4;
    cursor: default;
}
        `}</style>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

export default MyDocument;

import Document, { DocumentProps, Head, Html, Main, NextScript } from "next/document";
import React from "react";
import {darkThemeV5} from "../src/common/view/presentation/components/themes";
import createEmotionCache from "../src/util/createEmotionCache";
import createEmotionServer from "@emotion/server/create-instance";
import {ServerStyleSheets} from "@mui/styles";

export default class MyDocument extends Document {
  constructor(props: DocumentProps, context: any) {
    super(props, context);
  }
  public render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link href="https://fonts.googleapis.com/css?family=Inconsolata|Bad+Script|Noto+Serif+KR:300,400,700&display=swap" rel="stylesheet" />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
          {/* PWA primary color */}
          <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#0d1928" media="(prefers-color-scheme: dark)" />
          <style>{`
          body {
            font-family: Pretendard Variable, --apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
            letter-spacing: -0.01em;
            word-spacing: 0.05em;
            overflow-wrap: break-word;
            word-break: keep-all;
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
            font-family: Pretendard Variable, --apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
            cursor: default;
          }
          h2 {
            font-size: 2rem;
            font-weight: 100;
            font-family: Pretendard Variable, --apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
            cursor: default;
          }
          h3 {
            font-size: 1.75rem;
            font-weight: bold;
            font-family: Pretendard Variable, --apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
            cursor: default;
          }
          h4 {
            font-size: 1.25rem;
            font-weight: bold;
            font-family: Pretendard Variable, --apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
            cursor: default;
          }
          h5 {
            font-size: 0.9rem;
            font-weight: bold;
            font-family: Pretendard Variable, --apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
            cursor: default;
          }
          h6 {
            font-size: 0.7rem;
            font-weight: bold;
            font-family: Pretendard Variable, --apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
            cursor: default;
          }
          table {
            border: 1px solid ${darkThemeV5.palette.divider};
            border-radius: 5px;
            margin-left:auto;
            margin-right:auto;
          }
          th {
            padding: ${darkThemeV5.spacing(1)}px ${darkThemeV5.spacing(2)}px;
          }
          td {
            padding: 0 ${darkThemeV5.spacing(2)}px;
          }
          tr:last-child td {
            padding-bottom: ${darkThemeV5.spacing(1)}px;
          }
        `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
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
  const sheets = new ServerStyleSheets();

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return sheets.collect(<App emotionCache={cache} {...props} />);
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
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
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

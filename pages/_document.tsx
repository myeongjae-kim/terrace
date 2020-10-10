import { ServerStyleSheets } from "@material-ui/styles";
import Document, { Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  public render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,700|Inconsolata|Bad+Script|Noto+Sans+KR:100,300,400,700|Noto+Serif+KR:300,400,700&display=swap" rel="stylesheet" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta name="theme-color" content="#3073b3" />
          <style>{`
          body {
            font-family: Source Sans Pro, Noto Sans KR;
            letter-spacing: -0.01em;
            word-spacing: 0.05em;
            overflow-wrap: break-word;
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
          }
          h2 {
            font-size: 2rem;
            font-weight: 100;
            font-family: Noto Sans KR;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
          }
          h3 {
            font-size: 1.25rem;
            font-weight: bold;
            font-family: Noto Sans KR;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
          }
          h4 {
            font-size: 1.125rem;
            font-weight: bold;
            font-family: Noto Sans KR;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
          }
          h5 {
            font-size: 1rem;
            font-weight: bold;
            font-family: Noto Sans KR;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
          }
          h6 {
            font-size: 0.875rem;
            font-weight: bold;
            font-family: Noto Sans KR;
            margin-top: 1.2em;
            margin-bottom: 8px;
            line-height: 1.4;
          }
        `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
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

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default MyDocument;

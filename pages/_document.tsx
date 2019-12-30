import { ServerStyleSheets } from '@material-ui/styles';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import theme from '../src/common/presentation/components/theme';

class MyDocument extends Document {
  public render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link href='/static/fonts_woff2.css' rel='stylesheet' type='text/css' />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,700|Inconsolata|Bad+Script|Noto+Sans+KR:100,300,400,700|Noto+Serif+KR:300,400,700&display=swap" rel="stylesheet" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <style>{`
          body {
            font-family: Source Sans Pro, Noto Sans KR;
          }
          code, pre {
            font-family: Inconsolata; 
          }
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.375rem;
          }
          h3 {
            font-size: 2rem;
          }
          h4 {
            font-size: 1.5rem;
          }
          h5 {
            font-size: 1.25rem;
          }
          h6 {
            font-size: 1.125rem;
          }

/* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript */
/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

 code[class*="language-"],
 pre[class*="language-"] {
   color: black;
   background: none;
   text-shadow: 0 1px white;
   font-family: Inconsolata, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
   font-size: 1em;
   text-align: left;
   white-space: pre;
   word-spacing: normal;
   word-break: normal;
   word-wrap: normal;
   line-height: 1.5;
 
   -moz-tab-size: 4;
   -o-tab-size: 4;
   tab-size: 4;
 
   -webkit-hyphens: none;
   -moz-hyphens: none;
   -ms-hyphens: none;
   hyphens: none;
 }
 
 pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
 code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
   text-shadow: none;
   background: #b3d4fc;
 }
 
 pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
 code[class*="language-"]::selection, code[class*="language-"] ::selection {
   text-shadow: none;
   background: #b3d4fc;
 }
 
 @media print {
   code[class*="language-"],
   pre[class*="language-"] {
     text-shadow: none;
   }
 }
 
 /* Code blocks */
 pre[class*="language-"] {
   padding: 1em;
   margin: .5em 0;
   overflow: auto;
 }
 
 :not(pre) > code[class*="language-"],
 pre[class*="language-"] {
   background: #f5f2f0;
 }
 
 /* Inline code */
 :not(pre) > code[class*="language-"] {
   padding: .1em;
   border-radius: .3em;
   white-space: normal;
 }
 
 .token.comment,
 .token.prolog,
 .token.doctype,
 .token.cdata {
   color: slategray;
 }
 
 .token.punctuation {
   color: #999;
 }
 
 .namespace {
   opacity: .7;
 }
 
 .token.property,
 .token.tag,
 .token.boolean,
 .token.number,
 .token.constant,
 .token.symbol,
 .token.deleted {
   color: #905;
 }
 
 .token.selector,
 .token.attr-name,
 .token.string,
 .token.char,
 .token.builtin,
 .token.inserted {
   color: #690;
 }
 
 .token.operator,
 .token.entity,
 .token.url,
 .language-css .token.string,
 .style .token.string {
   color: #9a6e3a;
   background: hsla(0, 0%, 100%, .5);
 }
 
 .token.atrule,
 .token.attr-value,
 .token.keyword {
   color: #07a;
 }
 
 .token.function,
 .token.class-name {
   color: #DD4A68;
 }
 
 .token.regex,
 .token.important,
 .token.variable {
   color: #e90;
 }
 
 .token.important,
 .token.bold {
   font-weight: bold;
 }
 .token.italic {
   font-style: italic;
 }
 
 .token.entity {
   cursor: help;
 }
 /* Prism End */
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

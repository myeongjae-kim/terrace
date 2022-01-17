import * as React from "react";
import { useTheme } from "@material-ui/core";

const PrismjsThemeSupport: React.FC = () => {
  const isDark = useTheme().palette.type === "dark";
  return <>
    <style global>
      {isDark ? dark : bright}
    </style>
  </>;
};

const bright = `/* PrismJS 1.17.1
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
`;

// https://github.com/PrismJS/prism-themes/blob/master/themes/prism-material-dark.css
const dark = `
code[class*="language-"],
pre[class*="language-"] {
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	color: #eee;
	background: #001830;
	font-family: Inconsolata, Roboto Mono, monospace;
	font-size: 1em;
	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

code[class*="language-"]::-moz-selection,
pre[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection,
pre[class*="language-"] ::-moz-selection {
	background: #363636;
}

code[class*="language-"]::selection,
pre[class*="language-"]::selection,
code[class*="language-"] ::selection,
pre[class*="language-"] ::selection {
	background: #363636;
}

:not(pre) > code[class*="language-"] {
	white-space: normal;
	border-radius: 0.2em;
	padding: 0.1em;
}

pre[class*="language-"] {
	overflow: auto;
	position: relative;
	margin: 0.5em 0;
	padding: 1em;
}

.language-css > code,
.language-sass > code,
.language-scss > code {
	color: #fd9170;
}

[class*="language-"] .namespace {
	opacity: 0.7;
}

.token.atrule {
	color: #c792ea;
}

.token.attr-name {
	color: #ffcb6b;
}

.token.attr-value {
	color: #a5e844;
}

.token.attribute {
	color: #a5e844;
}

.token.boolean {
	color: #c792ea;
}

.token.builtin {
	color: #ffcb6b;
}

.token.cdata {
	color: #80cbc4;
}

.token.char {
	color: #80cbc4;
}

.token.class {
	color: #ffcb6b;
}

.token.class-name {
	color: #f2ff00;
}

.token.comment {
	color: #616161;
}

.token.constant {
	color: #c792ea;
}

.token.deleted {
	color: #ff6666;
}

.token.doctype {
	color: #616161;
}

.token.entity {
	color: #ff6666;
}

.token.function {
	color: #c792ea;
}

.token.hexcode {
	color: #f2ff00;
}

.token.id {
	color: #c792ea;
	font-weight: bold;
}

.token.important {
	color: #c792ea;
	font-weight: bold;
}

.token.inserted {
	color: #80cbc4;
}

.token.keyword {
	color: #c792ea;
}

.token.number {
	color: #fd9170;
}

.token.operator {
	color: #89ddff;
}

.token.prolog {
	color: #616161;
}

.token.property {
	color: #80cbc4;
}

.token.pseudo-class {
	color: #a5e844;
}

.token.pseudo-element {
	color: #a5e844;
}

.token.punctuation {
	color: #89ddff;
}

.token.regex {
	color: #f2ff00;
}

.token.selector {
	color: #ff6666;
}

.token.string {
	color: #a5e844;
}

.token.symbol {
	color: #c792ea;
}

.token.tag {
	color: #ff6666;
}

.token.unit {
	color: #fd9170;
}

.token.url {
	color: #ff6666;
}

.token.variable {
	color: #ff6666;
}
`;
 
export default PrismjsThemeSupport;

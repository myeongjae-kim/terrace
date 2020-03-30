import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { NextPageContext } from "next";
import Head from "next/head";
import React from "react";
import NextPage from "src/common/domain/model/NextPage";
import Optional from "optional-js";

const statusTexts: { [code: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
};

const useStyles = makeStyles(createStyles({
  container: {
    color: "#aaa",
    height: "calc(100vh - 88px - 130px)",
    marginBottom: 130,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  statusCode: {
    fontSize: "3.3em",
    fontWeight: 700
  },
  statusText: {
    fontWeight: 300
  },
  poem: {
    fontFamily: "'Noto Serif KR','Source Sans Pro', 'Spoqa Han Sans', Helvetica, Arial, sans-serif",
    margin: 0,
    fontSize: "1.1em",
    fontStyle: "italic",
    lineHeight: 0.3,
  },
  statusCodeContainer: {
    fontWeight: 200,
    fontSize: "2.2em",
    textTransform: "uppercase",
    lineHeight: 1,
    textRendering: "optimizeLegibility",
    textAlign: "center",
    width: "100%",
    "& > p": {
      margin: "-12px 0 0 0"
    }
  }
}));

export interface ErrorProps {
  statusCode: number;
  title?: string;
  namespacesRequired?: string[];
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode, title: titleOrigin }) => {
  React.useEffect(() => {
    [].forEach.call(document.querySelectorAll(".text"), (el: HTMLElement) => {
      const origin = el.innerHTML;
      let newHtml = "";
      for (const c of origin) {
        newHtml += `<span>${c}</span>`;
      }
      el.innerHTML = newHtml;
    });
  }, []);

  const classes = useStyles();
  const title =
    titleOrigin ||
    statusTexts[statusCode] ||
    "An unexpected error has occurred";

  return (
    <div className={classes.container}>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>

      <div style={{ userSelect: "none" }}>
        <div className={classes.statusCodeContainer}>
          <p className={clsx("text", "color-text-flow", classes.statusCode)}>{statusCode}</p>
          <p className={clsx("text", "color-text-flow", classes.statusText)}>{statusTexts[statusCode]}</p>
        </div>
        <div id="poem-flower" className={classes.poem}>
          <p className="text color-text-flow">모든 경계에는 꽃이 핀다.</p>
          <p className="text color-text-flow">- 함민복, [꽃]</p>
        </div>
      </div>

      <style jsx global>{`
/* The rainbow coloring codes are from https://codepen.io/joashp/pen/dYXNwj */

.color-text-flow,
.color-text-flow-hover:hover {
  /*
   * Elements settings
   */
}
.color-text-flow span,
.color-text-flow-hover:hover span {
  -webkit-animation-name: color-text-flow-keys;
  animation-name: color-text-flow-keys;
  -webkit-animation-duration: 50s;
  animation-duration: 50s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
@-webkit-keyframes color-text-flow-keys {
  0% { color: #d65c97; }
  5% { color: #5cd666; }
  10% { color: #a55cd6; }
  15.0% { color: #5c7cd6; }
  20% { color: #d65c7a; }
  25% { color: #81d65c; }
  30.0% { color: #835cd6; }
  35% { color: #685cd6; }
  40% { color: #5c9dd6; }
  45% { color: #5cd670; }
  50% { color: #d6625c; }
  55.0% { color: #d6835c; }
  60.0% { color: #d6605c; }
  65% { color: #be5cd6; }
  70% { color: #5c8dd6; }
  75% { color: #95d65c; }
  80% { color: #d69d5c; }
  85.0% { color: #d65c81; }
  90% { color: #5cd666; }
  95% { color: #d67e5c; }
  100% { color: #64d65c; }
}
@keyframes color-text-flow-keys {
  0% { color: #d65c97; }
  5% { color: #5cd666; }
  10% { color: #a55cd6; }
  15.0% { color: #5c7cd6; }
  20% { color: #d65c7a; }
  25% { color: #81d65c; }
  30.0% { color: #835cd6; }
  35% { color: #685cd6; }
  40% { color: #5c9dd6; }
  45% { color: #5cd670; }
  50% { color: #d6625c; }
  55.0% { color: #d6835c; }
  60.0% { color: #d6605c; }
  65% { color: #be5cd6; }
  70% { color: #5c8dd6; }
  75% { color: #95d65c; }
  80% { color: #d69d5c; }
  85.0% { color: #d65c81; }
  90% { color: #5cd666; }
  95% { color: #d67e5c; }
  100% { color: #64d65c; }
}
.color-text-flow span:nth-of-type(1),
.color-text-flow-hover:hover span:nth-of-type(1) {
  -webkit-animation-delay: -19.8s;
  animation-delay: -19.8s;
}
.color-text-flow span:nth-of-type(2),
.color-text-flow-hover:hover span:nth-of-type(2) {
  -webkit-animation-delay: -19.6s;
  animation-delay: -19.6s;
}
.color-text-flow span:nth-of-type(3),
.color-text-flow-hover:hover span:nth-of-type(3) {
  -webkit-animation-delay: -19.4s;
  animation-delay: -19.4s;
}
.color-text-flow span:nth-of-type(4),
.color-text-flow-hover:hover span:nth-of-type(4) {
  -webkit-animation-delay: -19.2s;
  animation-delay: -19.2s;
}
.color-text-flow span:nth-of-type(5),
.color-text-flow-hover:hover span:nth-of-type(5) {
  -webkit-animation-delay: -19s;
  animation-delay: -19s;
}
.color-text-flow span:nth-of-type(6),
.color-text-flow-hover:hover span:nth-of-type(6) {
  -webkit-animation-delay: -18.8s;
  animation-delay: -18.8s;
}
.color-text-flow span:nth-of-type(7),
.color-text-flow-hover:hover span:nth-of-type(7) {
  -webkit-animation-delay: -18.6s;
  animation-delay: -18.6s;
}
.color-text-flow span:nth-of-type(8),
.color-text-flow-hover:hover span:nth-of-type(8) {
  -webkit-animation-delay: -18.4s;
  animation-delay: -18.4s;
}
.color-text-flow span:nth-of-type(9),
.color-text-flow-hover:hover span:nth-of-type(9) {
  -webkit-animation-delay: -18.2s;
  animation-delay: -18.2s;
}
.color-text-flow span:nth-of-type(10),
.color-text-flow-hover:hover span:nth-of-type(10) {
  -webkit-animation-delay: -18s;
  animation-delay: -18s;
}
.color-text-flow span:nth-of-type(11),
.color-text-flow-hover:hover span:nth-of-type(11) {
  -webkit-animation-delay: -17.8s;
  animation-delay: -17.8s;
}
.color-text-flow span:nth-of-type(12),
.color-text-flow-hover:hover span:nth-of-type(12) {
  -webkit-animation-delay: -17.6s;
  animation-delay: -17.6s;
}
.color-text-flow span:nth-of-type(13),
.color-text-flow-hover:hover span:nth-of-type(13) {
  -webkit-animation-delay: -17.4s;
  animation-delay: -17.4s;
}
.color-text-flow span:nth-of-type(14),
.color-text-flow-hover:hover span:nth-of-type(14) {
  -webkit-animation-delay: -17.2s;
  animation-delay: -17.2s;
}
.color-text-flow span:nth-of-type(15),
.color-text-flow-hover:hover span:nth-of-type(15) {
  -webkit-animation-delay: -17s;
  animation-delay: -17s;
}
.color-text-flow span:nth-of-type(16),
.color-text-flow-hover:hover span:nth-of-type(16) {
  -webkit-animation-delay: -16.8s;
  animation-delay: -16.8s;
}
.color-text-flow span:nth-of-type(17),
.color-text-flow-hover:hover span:nth-of-type(17) {
  -webkit-animation-delay: -16.6s;
  animation-delay: -16.6s;
}
.color-text-flow span:nth-of-type(18),
.color-text-flow-hover:hover span:nth-of-type(18) {
  -webkit-animation-delay: -16.4s;
  animation-delay: -16.4s;
}
.color-text-flow span:nth-of-type(19),
.color-text-flow-hover:hover span:nth-of-type(19) {
  -webkit-animation-delay: -16.2s;
  animation-delay: -16.2s;
}
.color-text-flow span:nth-of-type(20),
.color-text-flow-hover:hover span:nth-of-type(20) {
  -webkit-animation-delay: -16s;
  animation-delay: -16s;
}
.color-text-flow span:nth-of-type(21),
.color-text-flow-hover:hover span:nth-of-type(21) {
  -webkit-animation-delay: -15.8s;
  animation-delay: -15.8s;
}
.color-text-flow span:nth-of-type(22),
.color-text-flow-hover:hover span:nth-of-type(22) {
  -webkit-animation-delay: -15.6s;
  animation-delay: -15.6s;
}
.color-text-flow span:nth-of-type(23),
.color-text-flow-hover:hover span:nth-of-type(23) {
  -webkit-animation-delay: -15.4s;
  animation-delay: -15.4s;
}
.color-text-flow span:nth-of-type(24),
.color-text-flow-hover:hover span:nth-of-type(24) {
  -webkit-animation-delay: -15.2s;
  animation-delay: -15.2s;
}
.color-text-flow span:nth-of-type(25),
.color-text-flow-hover:hover span:nth-of-type(25) {
  -webkit-animation-delay: -15s;
  animation-delay: -15s;
}
.color-text-flow span:nth-of-type(26),
.color-text-flow-hover:hover span:nth-of-type(26) {
  -webkit-animation-delay: -14.8s;
  animation-delay: -14.8s;
}
.color-text-flow span:nth-of-type(27),
.color-text-flow-hover:hover span:nth-of-type(27) {
  -webkit-animation-delay: -14.6s;
  animation-delay: -14.6s;
}
.color-text-flow span:nth-of-type(28),
.color-text-flow-hover:hover span:nth-of-type(28) {
  -webkit-animation-delay: -14.4s;
  animation-delay: -14.4s;
}
.color-text-flow span:nth-of-type(29),
.color-text-flow-hover:hover span:nth-of-type(29) {
  -webkit-animation-delay: -14.2s;
  animation-delay: -14.2s;
}
.color-text-flow span:nth-of-type(30),
.color-text-flow-hover:hover span:nth-of-type(30) {
  -webkit-animation-delay: -14s;
  animation-delay: -14s;
}
.color-text-flow span:nth-of-type(31),
.color-text-flow-hover:hover span:nth-of-type(31) {
  -webkit-animation-delay: -13.8s;
  animation-delay: -13.8s;
}
.color-text-flow span:nth-of-type(32),
.color-text-flow-hover:hover span:nth-of-type(32) {
  -webkit-animation-delay: -13.6s;
  animation-delay: -13.6s;
}
.color-text-flow span:nth-of-type(33),
.color-text-flow-hover:hover span:nth-of-type(33) {
  -webkit-animation-delay: -13.4s;
  animation-delay: -13.4s;
}
.color-text-flow span:nth-of-type(34),
.color-text-flow-hover:hover span:nth-of-type(34) {
  -webkit-animation-delay: -13.2s;
  animation-delay: -13.2s;
}
.color-text-flow span:nth-of-type(35),
.color-text-flow-hover:hover span:nth-of-type(35) {
  -webkit-animation-delay: -13s;
  animation-delay: -13s;
}
.color-text-flow span:nth-of-type(36),
.color-text-flow-hover:hover span:nth-of-type(36) {
  -webkit-animation-delay: -12.8s;
  animation-delay: -12.8s;
}
.color-text-flow span:nth-of-type(37),
.color-text-flow-hover:hover span:nth-of-type(37) {
  -webkit-animation-delay: -12.6s;
  animation-delay: -12.6s;
}
.color-text-flow span:nth-of-type(38),
.color-text-flow-hover:hover span:nth-of-type(38) {
  -webkit-animation-delay: -12.4s;
  animation-delay: -12.4s;
}
.color-text-flow span:nth-of-type(39),
.color-text-flow-hover:hover span:nth-of-type(39) {
  -webkit-animation-delay: -12.2s;
  animation-delay: -12.2s;
}
.color-text-flow span:nth-of-type(40),
.color-text-flow-hover:hover span:nth-of-type(40) {
  -webkit-animation-delay: -12s;
  animation-delay: -12s;
}
.color-text-flow span:nth-of-type(41),
.color-text-flow-hover:hover span:nth-of-type(41) {
  -webkit-animation-delay: -11.8s;
  animation-delay: -11.8s;
}
.color-text-flow span:nth-of-type(42),
.color-text-flow-hover:hover span:nth-of-type(42) {
  -webkit-animation-delay: -11.6s;
  animation-delay: -11.6s;
}
.color-text-flow span:nth-of-type(43),
.color-text-flow-hover:hover span:nth-of-type(43) {
  -webkit-animation-delay: -11.4s;
  animation-delay: -11.4s;
}
.color-text-flow span:nth-of-type(44),
.color-text-flow-hover:hover span:nth-of-type(44) {
  -webkit-animation-delay: -11.2s;
  animation-delay: -11.2s;
}
.color-text-flow span:nth-of-type(45),
.color-text-flow-hover:hover span:nth-of-type(45) {
  -webkit-animation-delay: -11s;
  animation-delay: -11s;
}
.color-text-flow span:nth-of-type(46),
.color-text-flow-hover:hover span:nth-of-type(46) {
  -webkit-animation-delay: -10.8s;
  animation-delay: -10.8s;
}
.color-text-flow span:nth-of-type(47),
.color-text-flow-hover:hover span:nth-of-type(47) {
  -webkit-animation-delay: -10.6s;
  animation-delay: -10.6s;
}
.color-text-flow span:nth-of-type(48),
.color-text-flow-hover:hover span:nth-of-type(48) {
  -webkit-animation-delay: -10.4s;
  animation-delay: -10.4s;
}
.color-text-flow span:nth-of-type(49),
.color-text-flow-hover:hover span:nth-of-type(49) {
  -webkit-animation-delay: -10.2s;
  animation-delay: -10.2s;
}
.color-text-flow span:nth-of-type(50),
.color-text-flow-hover:hover span:nth-of-type(50) {
  -webkit-animation-delay: -10s;
  animation-delay: -10s;
}
.color-text-flow span:nth-of-type(51),
.color-text-flow-hover:hover span:nth-of-type(51) {
  -webkit-animation-delay: -9.8s;
  animation-delay: -9.8s;
}
.color-text-flow span:nth-of-type(52),
.color-text-flow-hover:hover span:nth-of-type(52) {
  -webkit-animation-delay: -9.6s;
  animation-delay: -9.6s;
}
.color-text-flow span:nth-of-type(53),
.color-text-flow-hover:hover span:nth-of-type(53) {
  -webkit-animation-delay: -9.4s;
  animation-delay: -9.4s;
}
.color-text-flow span:nth-of-type(54),
.color-text-flow-hover:hover span:nth-of-type(54) {
  -webkit-animation-delay: -9.2s;
  animation-delay: -9.2s;
}
.color-text-flow span:nth-of-type(55),
.color-text-flow-hover:hover span:nth-of-type(55) {
  -webkit-animation-delay: -9s;
  animation-delay: -9s;
}
.color-text-flow span:nth-of-type(56),
.color-text-flow-hover:hover span:nth-of-type(56) {
  -webkit-animation-delay: -8.8s;
  animation-delay: -8.8s;
}
.color-text-flow span:nth-of-type(57),
.color-text-flow-hover:hover span:nth-of-type(57) {
  -webkit-animation-delay: -8.6s;
  animation-delay: -8.6s;
}
.color-text-flow span:nth-of-type(58),
.color-text-flow-hover:hover span:nth-of-type(58) {
  -webkit-animation-delay: -8.4s;
  animation-delay: -8.4s;
}
.color-text-flow span:nth-of-type(59),
.color-text-flow-hover:hover span:nth-of-type(59) {
  -webkit-animation-delay: -8.2s;
  animation-delay: -8.2s;
}
.color-text-flow span:nth-of-type(60),
.color-text-flow-hover:hover span:nth-of-type(60) {
  -webkit-animation-delay: -8s;
  animation-delay: -8s;
}
.color-text-flow span:nth-of-type(61),
.color-text-flow-hover:hover span:nth-of-type(61) {
  -webkit-animation-delay: -7.8s;
  animation-delay: -7.8s;
}
.color-text-flow span:nth-of-type(62),
.color-text-flow-hover:hover span:nth-of-type(62) {
  -webkit-animation-delay: -7.6s;
  animation-delay: -7.6s;
}
.color-text-flow span:nth-of-type(63),
.color-text-flow-hover:hover span:nth-of-type(63) {
  -webkit-animation-delay: -7.4s;
  animation-delay: -7.4s;
}
.color-text-flow span:nth-of-type(64),
.color-text-flow-hover:hover span:nth-of-type(64) {
  -webkit-animation-delay: -7.2s;
  animation-delay: -7.2s;
}
.color-text-flow span:nth-of-type(65),
.color-text-flow-hover:hover span:nth-of-type(65) {
  -webkit-animation-delay: -7s;
  animation-delay: -7s;
}
.color-text-flow span:nth-of-type(66),
.color-text-flow-hover:hover span:nth-of-type(66) {
  -webkit-animation-delay: -6.8s;
  animation-delay: -6.8s;
}
.color-text-flow span:nth-of-type(67),
.color-text-flow-hover:hover span:nth-of-type(67) {
  -webkit-animation-delay: -6.6s;
  animation-delay: -6.6s;
}
.color-text-flow span:nth-of-type(68),
.color-text-flow-hover:hover span:nth-of-type(68) {
  -webkit-animation-delay: -6.4s;
  animation-delay: -6.4s;
}
.color-text-flow span:nth-of-type(69),
.color-text-flow-hover:hover span:nth-of-type(69) {
  -webkit-animation-delay: -6.2s;
  animation-delay: -6.2s;
}
.color-text-flow span:nth-of-type(70),
.color-text-flow-hover:hover span:nth-of-type(70) {
  -webkit-animation-delay: -6s;
  animation-delay: -6s;
}
.color-text-flow span:nth-of-type(71),
.color-text-flow-hover:hover span:nth-of-type(71) {
  -webkit-animation-delay: -5.8s;
  animation-delay: -5.8s;
}
.color-text-flow span:nth-of-type(72),
.color-text-flow-hover:hover span:nth-of-type(72) {
  -webkit-animation-delay: -5.6s;
  animation-delay: -5.6s;
}
.color-text-flow span:nth-of-type(73),
.color-text-flow-hover:hover span:nth-of-type(73) {
  -webkit-animation-delay: -5.4s;
  animation-delay: -5.4s;
}
.color-text-flow span:nth-of-type(74),
.color-text-flow-hover:hover span:nth-of-type(74) {
  -webkit-animation-delay: -5.2s;
  animation-delay: -5.2s;
}
.color-text-flow span:nth-of-type(75),
.color-text-flow-hover:hover span:nth-of-type(75) {
  -webkit-animation-delay: -5s;
  animation-delay: -5s;
}
.color-text-flow span:nth-of-type(76),
.color-text-flow-hover:hover span:nth-of-type(76) {
  -webkit-animation-delay: -4.8s;
  animation-delay: -4.8s;
}
.color-text-flow span:nth-of-type(77),
.color-text-flow-hover:hover span:nth-of-type(77) {
  -webkit-animation-delay: -4.6s;
  animation-delay: -4.6s;
}
.color-text-flow span:nth-of-type(78),
.color-text-flow-hover:hover span:nth-of-type(78) {
  -webkit-animation-delay: -4.4s;
  animation-delay: -4.4s;
}
.color-text-flow span:nth-of-type(79),
.color-text-flow-hover:hover span:nth-of-type(79) {
  -webkit-animation-delay: -4.2s;
  animation-delay: -4.2s;
}
.color-text-flow span:nth-of-type(80),
.color-text-flow-hover:hover span:nth-of-type(80) {
  -webkit-animation-delay: -4s;
  animation-delay: -4s;
}
.color-text-flow span:nth-of-type(81),
.color-text-flow-hover:hover span:nth-of-type(81) {
  -webkit-animation-delay: -3.8s;
  animation-delay: -3.8s;
}
.color-text-flow span:nth-of-type(82),
.color-text-flow-hover:hover span:nth-of-type(82) {
  -webkit-animation-delay: -3.6s;
  animation-delay: -3.6s;
}
.color-text-flow span:nth-of-type(83),
.color-text-flow-hover:hover span:nth-of-type(83) {
  -webkit-animation-delay: -3.4s;
  animation-delay: -3.4s;
}
.color-text-flow span:nth-of-type(84),
.color-text-flow-hover:hover span:nth-of-type(84) {
  -webkit-animation-delay: -3.2s;
  animation-delay: -3.2s;
}
.color-text-flow span:nth-of-type(85),
.color-text-flow-hover:hover span:nth-of-type(85) {
  -webkit-animation-delay: -3s;
  animation-delay: -3s;
}
.color-text-flow span:nth-of-type(86),
.color-text-flow-hover:hover span:nth-of-type(86) {
  -webkit-animation-delay: -2.8s;
  animation-delay: -2.8s;
}
.color-text-flow span:nth-of-type(87),
.color-text-flow-hover:hover span:nth-of-type(87) {
  -webkit-animation-delay: -2.6s;
  animation-delay: -2.6s;
}
.color-text-flow span:nth-of-type(88),
.color-text-flow-hover:hover span:nth-of-type(88) {
  -webkit-animation-delay: -2.4s;
  animation-delay: -2.4s;
}
.color-text-flow span:nth-of-type(89),
.color-text-flow-hover:hover span:nth-of-type(89) {
  -webkit-animation-delay: -2.2s;
  animation-delay: -2.2s;
}
.color-text-flow span:nth-of-type(90),
.color-text-flow-hover:hover span:nth-of-type(90) {
  -webkit-animation-delay: -2s;
  animation-delay: -2s;
}
.color-text-flow span:nth-of-type(91),
.color-text-flow-hover:hover span:nth-of-type(91) {
  -webkit-animation-delay: -1.8s;
  animation-delay: -1.8s;
}
.color-text-flow span:nth-of-type(92),
.color-text-flow-hover:hover span:nth-of-type(92) {
  -webkit-animation-delay: -1.6s;
  animation-delay: -1.6s;
}
.color-text-flow span:nth-of-type(93),
.color-text-flow-hover:hover span:nth-of-type(93) {
  -webkit-animation-delay: -1.4s;
  animation-delay: -1.4s;
}
.color-text-flow span:nth-of-type(94),
.color-text-flow-hover:hover span:nth-of-type(94) {
  -webkit-animation-delay: -1.2s;
  animation-delay: -1.2s;
}
.color-text-flow span:nth-of-type(95),
.color-text-flow-hover:hover span:nth-of-type(95) {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.color-text-flow span:nth-of-type(96),
.color-text-flow-hover:hover span:nth-of-type(96) {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.color-text-flow span:nth-of-type(97),
.color-text-flow-hover:hover span:nth-of-type(97) {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.color-text-flow span:nth-of-type(98),
.color-text-flow-hover:hover span:nth-of-type(98) {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.color-text-flow span:nth-of-type(99),
.color-text-flow-hover:hover span:nth-of-type(99) {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.color-text-flow span:nth-of-type(100),
.color-text-flow-hover:hover span:nth-of-type(100) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
    `}</style>
    </div >
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): Promise<ErrorProps> | ErrorProps => {
  const errorStatusCode = Optional.ofNullable(err)
    .map(e => e.statusCode)
    .orElse(404);

  const statusCode = Optional.ofNullable(res)
    .map(r => r.statusCode)
    .orElse(errorStatusCode);

  return {
    statusCode,
    namespacesRequired: ["common"],
  };
};

export default ErrorPage;
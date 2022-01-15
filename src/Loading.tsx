import RainbowText from "./RainbowText";
import * as React from "react";
import {CSSProperties} from "react";

const Loading: React.FC<{style?: CSSProperties}> = ({style}) => {
  return <RainbowText
    line1=""
    line2={"..Loading.."}
    line3="그대의 회답을 기다리지요."
    line4="- 원태연, [기다림]"
    style={style || {paddingTop: "calc(-100px + 30vh)"}}
  />;
};

export default Loading;

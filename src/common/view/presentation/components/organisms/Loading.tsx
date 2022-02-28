import RainbowText from "./RainbowText";
import * as React from "react";
import {CSSProperties} from "react";
import {useTheme} from "@mui/material";

interface Poets {
  title: string
  phrase: string
  poet: string
}

const poets: Poets[] = [{
  title: "기다림",
  phrase: "그대의 회답을 기다리지요.",
  poet: "원태연"
},{
  title: "너를 기다리는 동안",
  phrase: "마침내 나는 너에게 간다",
  poet: "황지우"
}, {
  title: "너를 기다리는 동안",
  phrase: "나는 너에게 가고 있다.",
  poet: "황지우"
}, {
  title: "지루함",
  phrase: "기다림이 없는 인생은 지루할 거다",
  poet: "조병화"
}, {
  title: "기다려야지",
  phrase: "궁금해도 기다려야지",
  poet: "유경환"
}];

const Loading: React.FC<{style?: CSSProperties}> = ({style}) => {
  const theme = useTheme();
  const {title, phrase, poet} = poets[Math.floor(Math.random() * poets.length)];

  return <RainbowText
    line1=""
    line2={"..Loading.."}
    line3={phrase}
    line4={`- ${poet}, [${title}]`}
    style={{...style, paddingBottom : style?.paddingBottom || theme.spacing(8)}}
  />;
};

export default Loading;

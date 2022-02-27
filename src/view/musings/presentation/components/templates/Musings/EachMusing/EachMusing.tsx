import { createStyles, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import * as React from "react";
import { MusingResponseDto } from "src/view/musings/api/dto";
import From from "./From";
import Quote from "./Quote";

interface Props {
  item: MusingResponseDto;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  musing: {
    fontWeight: 400,
    textAlign: "center",
    whiteSpace: "pre-wrap",
    marginBottom: theme.spacing(5)
  },
  en: {
    fontFamily: "Bad Script, cursive",
    letterSpacing: "initial"
  },
  ko: {
    fontFamily: "Noto Serif KR, serif",
    fontStyle: "italic",
  }
}));

const EachMusing: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  return <div className={clsx(classes.musing, {
    [classes.en]: item.language === "EN",
    [classes.ko]: item.language === "KO",
  })}>
    <Quote quote={item.quote} />
    <From from={item.from} />
  </div>;
};

export default EachMusing;

import { createStyles, makeStyles } from "@mui/styles";
import clsx from "clsx";
import * as React from "react";
import { MusingResponseDto } from "src/musing/domain";
import From from "./From";
import Quote from "./Quote";
import {Theme} from "@mui/material";

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

const EachMusing = ({ item }: Props) => {
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

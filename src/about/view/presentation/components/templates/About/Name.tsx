import { createStyles, makeStyles } from "@mui/styles";
import * as React from "react";
import {Theme} from "@mui/material";

interface Props {
  en: string;
  kr: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    margin: `${theme.spacing(4)} 0`,
    cursor: "default",
  },
  en: {
    fontFamily: "Bad Script, cursive",
    fontSize: "2rem",
  },
  kr: {
    position: "absolute",
    opacity: 0.5,
    paddingTop: theme.spacing(2)
  }
}));

const Name = ({ en, kr }: Props) => {
  const classes = useStyles();

  return <div className={classes.container}>
    <span className={classes.en}>{en}</span><span className={classes.kr}>({kr})</span>
  </div>;
};

export default Name;

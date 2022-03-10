import { createStyles, makeStyles } from "@mui/styles";
import * as React from "react";
import {Theme} from "@mui/material";

interface Props {
  title: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    cursor: "default",
    userSelect: "none"
  },
  title: {
    fontSize: "2em",
    fontWeight: 100,
    textTransform: "capitalize",
    margin: `${theme.spacing(3)} 0 ${theme.spacing(5)} 0`,
    "@media screen and (max-width: 600)": {
      margin: `${theme.spacing(1.5)} 0 ${theme.spacing(2.5)} 0`
    }
  }
}));

const PageTitle = ({ title }: Props) => {
  const classes = useStyles();
  return <div className={classes.container}>
    <h1 className={classes.title}>
      {title}
    </h1>
  </div>;
};


export default PageTitle;

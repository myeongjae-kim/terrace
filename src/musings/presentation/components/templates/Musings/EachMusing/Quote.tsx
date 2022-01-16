import * as React from "react";
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles(createStyles({
  quote: {
    fontSize: "1.2em",
    lineHeight: "2.4em",
    wordBreak: "keep-all",
  }
}));

interface Props {
  quote: string;
}

const Quote: React.FC<Props> = ({ quote }) => {
  const classes = useStyles();
  return <p className={classes.quote}>“{quote}”</p>;
};

export default Quote;

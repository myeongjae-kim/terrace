import {Button, createStyles, makeStyles, Theme} from "@material-ui/core";
import * as React from "react";
import { Link } from "../../../molecules";

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    textTransform: "uppercase",
    fontFamily: "inconsolata",
    letterSpacing: 3,
    padding: ".3em 1.5em",
    transition: "opacity 20ms",
    "&:hover": {
      opacity: 0.6
    }
  },
  buttonInherit: {
    color: theme.palette.text.primary
  }
}));

const HomeButton: React.FC = () => {
  const classes = useStyles();
  return <Link href="/">
    <Button color="inherit" classes={{
      root: classes.button,
      colorInherit: classes.buttonInherit
    }}>myeongjae kim</Button>
  </Link>;
};

export default HomeButton;

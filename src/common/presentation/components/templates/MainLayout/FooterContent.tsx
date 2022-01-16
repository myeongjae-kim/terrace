import {Link, Theme, Typography} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import Router from "next/router";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
  footer: {
    display: "flex",
    justifyContent: "space-between",
    userSelect: "none",
  },
  sign: {
    width: 50,
    height: 50,
    marginTop: -20,
    pointerEvents: "none",
    opacity: theme.palette.mode === "dark" ? 0 : "initial"
  }
}));

const FooterContent: React.FC = () => {
  const classes = useStyles();

  const signIn = React.useCallback(() => {
    Router.push("/editors"); // TODO: editors 페이지 추가, 편집화면 그대로.
  }, []);

  return <div className={classes.footer}>
    <img onClick={signIn} src="https://cdn.myeongjae.kim/res/about_logos/0.png" className={classes.sign} style={{ opacity: 0, pointerEvents: "all" }} />

    <Typography variant="caption">
      If you like my website, you can copy it from <Link href="https://github.com/myeongjae-kim/terrace">here</Link>.
    </Typography>

    <img src="https://cdn.myeongjae.kim/res/about_logos/0.png" className={classes.sign} />
  </div>;
};

export default FooterContent;

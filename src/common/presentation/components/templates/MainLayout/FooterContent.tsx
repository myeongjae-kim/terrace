import { createStyles, Link, makeStyles, Typography } from "@material-ui/core";
import Router from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/common/presentation/state-module/root";

const useStyles = makeStyles(theme => createStyles({
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
    opacity: theme.palette.type === "dark" ? 0 : "initial"
  }
}));

const FooterContent: React.FC = () => {
  const classes = useStyles();

  const isSignedIn = useSelector((state: RootState) => state.auth.me.isSignedIn);
  const signIn = React.useCallback(() => {
    if (isSignedIn) {
      return;
    }

    Router.push("/auth/sign-in");
  }, [isSignedIn]);

  return <div className={classes.footer}>
    <img onClick={signIn} src="https://cdn.myeongjae.kim/res/about_logos/0.png" className={classes.sign} style={{ opacity: 0, pointerEvents: "all" }} />

    <Typography variant="caption">
      If you like my website, you can copy it from <Link href="https://github.com/myeongjae-kim/terrace">here</Link>.
    </Typography>

    <img src="https://cdn.myeongjae.kim/res/about_logos/0.png" className={classes.sign} />
  </div>;
};

export default FooterContent;
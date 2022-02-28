import {createStyles, makeStyles} from "@material-ui/core";
import {useRouter} from "next/router";
import * as React from "react";
import {Typography} from "@mui/material";
import {Link} from "../../molecules";

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
  const router = useRouter();

  const createOrEdit = React.useCallback(() => {
    const splitPath = router.asPath.split("/").slice(1);
    if (splitPath.length === 1) {
      router.push(router.pathname + "/create").then(); // url에서 쿼리를 제외하고 사용하기 위해 pathname 사용
    } else if (splitPath.length > 1) {
      router.push("/" + splitPath[0] + "/update/" + splitPath.slice(1).join("/")).then();
    }
  }, [router]);

  return <div className={classes.footer}>
    <img alt="ignorable" onClick={createOrEdit} src="https://cdn.myeongjae.kim/res/about_logos/0.png" className={classes.sign} style={{ opacity: 0, pointerEvents: "all" }} />

    <Typography variant="caption">
      If you like my website, you can copy it from <Link href="https://github.com/myeongjae-kim/terrace">here</Link>.
    </Typography>

    <img alt="ignorable" src="https://cdn.myeongjae.kim/res/about_logos/0.png" className={classes.sign} />
  </div>;
};

export default FooterContent;

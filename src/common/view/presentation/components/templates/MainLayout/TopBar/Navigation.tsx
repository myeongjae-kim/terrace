import {createStyles, makeStyles} from "@mui/styles";
import * as React from "react";
import {Link} from "../../../molecules";
import {useRouter} from "next/router";
import {Button, Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => createStyles({
  nav: {
    fontWeight: 100,
    marginTop: theme.spacing(2.5),
    "@media screen and (max-width: 600px)": {
      marginTop: theme.spacing(1)
    },
  },
  buttonRoot: {
    fontFamily: "Inconsolata",
    minWidth: 0,
    textTransform: "inherit",
    letterSpacing: "-0.02em",
    opacity: "75%",
    transition: "opacity 20ms",
    "&:hover": {
      opacity: 0.6
    }
  },
  buttonInherit: {
    color: theme.palette.text.primary
  }
}));

interface Props {
  items: Array<{
    href: string[];
    label: string;
  }>;
}

const usePaths = (): string[] => {
  const {pathname} = useRouter();
  const paths = pathname.split("?")[0].split("/").slice(1);
  paths[0] = "/" + paths[0];
  return paths;
};

const Navigation: React.FC<Props> = ({ items }) => {
  const paths = usePaths();
  const classes = useStyles();
  const firstPath = paths[0] || "";

  return <nav className={classes.nav}>
    {items.map(({ href, label }) => <Link key={href[0]} href={href[0]}>
      <Button color={href.includes(firstPath) ? "primary" : "inherit"} classes={{
        root: classes.buttonRoot,
        colorInherit: classes.buttonInherit
      }}>
        {label}
      </Button>
    </Link>)}
  </nav>;
};

export default Navigation;

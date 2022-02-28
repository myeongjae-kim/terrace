import * as React from "react";
import {useMemo} from "react";
import HomeButton from "./HomeButton";
import Navigation from "./Navigation";
import {AppBar, Theme, useTheme} from "@mui/material";

const styleObjects = (theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "transparent",
    marginTop: theme.spacing(5),
    "@media screen and (max-width: 600px)": {
      marginTop: theme.spacing(3)
    }
  },
  center: {
    display: "flex",
    justifyContent: "center"
  },
});

const items = [{
  href: ["/about", "/"],
  label: "About"
}, {
  href: ["/blog"],
  label: "Blog"
}, {
  href: ["/daily"],
  label: "Daily"
}, {
  href: ["/musings"],
  label: "Musings"
}, {
  href: ["/places"],
  label: "Places"
},];

const TopBar: React.FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => styleObjects(theme), [theme]);

  return <AppBar
    elevation={0}
    color="inherit"
    position="relative"
    sx={styles.appBar}
  >
    <div style={styles.center}>
      <HomeButton />
    </div>
    <div style={styles.center}>
      <Navigation items={items} />
    </div>
  </AppBar >;
};

export default TopBar;

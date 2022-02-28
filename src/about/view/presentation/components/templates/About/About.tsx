import clsx from "clsx";
import * as React from "react";
import Descriptions from "./Descriptions";
import Name from "./Name";
import Profile from "./Profile";
import {About} from "src/about/domain/About";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

interface Props {
  about: About
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  center: {
    display: "flex",
    justifyContent: "center"
  },
  imageContainer: {
    marginTop: theme.spacing(4.5),
    "@media screen and (max-width: 600px)": {
      marginTop: theme.spacing(3)
    }
  }
}));

const About = ({about}: Props) => {
  const { profile, name, descriptions } = about;
  const classes = useStyles();

  return <>
    <div className={clsx(classes.center, classes.imageContainer)}>
      <Profile url={profile} />
    </div>
    <div className={classes.center}>
      <Name en={name.en} kr={name.kr} />
    </div>
    <div className={classes.center}>
      <Descriptions items={descriptions} />
    </div>
  </>;
};

export default About;

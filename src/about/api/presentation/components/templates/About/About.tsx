import { createStyles, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Code, Create, DeveloperBoard, Email, EmojiPeople, Room } from '@material-ui/icons';
import * as React from 'react';
import Descriptions from './Descriptions';
import Name from './Name';
import Profile from './Profile';

const iconStyle: CSSProperties = {
  fontSize: 17,
  marginBottom: -3
}

const data = {
  profile: "https://cdn.myeongjae.kim/res/profile.jpeg",
  name: {
    en: "Myeongjae Kim",
    kr: "김명재"
  },
  descriptions: [{
    icon: <EmojiPeople style={iconStyle} />,
    label: "Software Engineer",
    href: ""
  }, {
    icon: <Room style={iconStyle} />,
    label: "Seoul, Korea",
    href: "/places"
  }, {
    icon: <DeveloperBoard style={iconStyle} />,
    label: "Résumé",
    href: ""
  }, {
    icon: <Code style={iconStyle} />,
    label: "g.com/myeongjae-kim",
    href: "https://github.com/myeongjae-kim"
  }, {
    icon: <Email style={iconStyle} />,
    label: "Software Engineer",
    href: "mailto:dev@myeongjae.kim"
  }, {
    icon: <Create style={iconStyle} />,
    label: "blog.myeongjae.kim",
    href: "https://blog.myeongjae.kim"
  },]
}

const useStyles = makeStyles(createStyles({
  center: {
    display: 'flex',
    justifyContent: "center"
  }
}))

const About: React.FC = () => {
  const { profile, name, descriptions } = data;
  const classes = useStyles();

  return <>
    <div className={classes.center}>
      <Profile url={profile} />
    </div>
    <div className={classes.center}>
      <Name en={name.en} kr={name.kr} />
    </div>
    <div className={classes.center}>
      <Descriptions items={descriptions} />
    </div>
  </>;
}

export default About;
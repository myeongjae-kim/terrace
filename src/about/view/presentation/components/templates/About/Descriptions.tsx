import {createStyles, makeStyles} from "@mui/styles";
import * as React from "react";
import {Link, Maybe} from "src/common/view/presentation/components/molecules";
import {Description, DescriptionIcon} from "src/about/domain/Description";
import {Code, Create, DeveloperBoard, Email, EmojiPeople, Room, SvgIconComponent} from "@mui/icons-material";

const useStyles = makeStyles(createStyles({
  list: {
    padding: 0,
    margin: 0,
    listStyleType: "none",
    lineHeight: 1.4
  },
  label: {
    fontFamily: "inconsolata",
    marginLeft: 7
  },
  icon: {
    fontSize: 17,
    marginBottom: -3
  }
}));

const getIcon = (icon: DescriptionIcon): SvgIconComponent => {
  switch (icon) {
  case "Code":
    return Code;
  case "Create":
    return Create;
  case "DeveloperBoard":
    return DeveloperBoard;
  case "Email":
    return Email;
  case "EmojiPeople":
    return EmojiPeople;
  case "Room":
    return Room;
  }
};

const EachDescription = ({ icon, label, href }: Description) => {
  const classes = useStyles();
  const Icon = getIcon(icon);
  return <li>
    <Icon className={classes.icon} />
    <Maybe test={!!href}>
      <Link href={href}>
        <span className={classes.label}>{label}</span>
      </Link>
    </Maybe>
    <Maybe test={!href}>
      <span className={classes.label}>{label}</span>
    </Maybe>
  </li>;
};

interface Props {
  items: Description[];
}

const Descriptions = ({ items }: Props) => {
  const classes = useStyles();
  return <ul className={classes.list}>
    {items.map(i => <EachDescription key={i.label} icon={i.icon} label={i.label} href={i.href} />)}
  </ul>;
};

export default Descriptions;

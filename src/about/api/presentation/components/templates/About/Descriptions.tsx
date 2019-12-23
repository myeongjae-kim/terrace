import { createStyles, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Link, Maybe } from 'src/common/presentation/components/molecules';

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
  }
}))

interface Description {
  icon: JSX.Element
  label: string
  href: string
}

const EachDescription: React.FC<Description> = ({ icon, label, href }) => {
  const classes = useStyles();
  return <li>
    {icon}
    <Maybe test={!!href}>
      <Link href={href}>
        <span className={classes.label}>{label}</span>
      </Link>
    </Maybe>
    <Maybe test={!href}>
      <span className={classes.label}>{label}</span>
    </Maybe>
  </li>;
}


interface Props {
  items: Description[]
}

const Descriptions: React.FC<Props> = ({ items }) => {
  const classes = useStyles();
  return <ul className={classes.list}>
    {items.map(i => <EachDescription key={i.label} icon={i.icon} label={i.label} href={i.href} />)}
  </ul>;
}

export default Descriptions;
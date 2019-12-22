import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import * as React from 'react';

const useStyles = makeStyles(createStyles({
  wrapper: {
    fontSize: 14,
    letterSpacing: -0.35,
    wordWrap: 'break-word',
    '& img': {
      maxWidth: "100%",
    },
    '& p': {
      padding: '16px 20px',
      margin: 0
    },
    '& div': {
      margin: '0 20px'
    }
  }
}));

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  __html: string
}

export default (props: Props) => {
  const { __html } = props;
  const classes = useStyles();
  return <div {...props} dangerouslySetInnerHTML={{ __html }} className={classes.wrapper} />
}
import { Button, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import * as React from "react";
import { BlogArticlePrevOrNext } from "src/blog/api";
import { Link } from "src/common/presentation/components/molecules";

const useEachStyles = makeStyles((theme: Theme) => createStyles({
  eachContainer: {
    margin: `${theme.spacing(1)}px 0`,
  },
  label: {
    marginBottom: theme.spacing(0.5),
    userSelect: "none",
  }
}));


const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    margin: `${theme.spacing(4)}px 0`,
    textAlign: "center"
  },
  hrUpper: {
    marginBottom: theme.spacing(2)
  },
  hrLower: {
    margin: `${theme.spacing(2)}px 0`
  }
}));

interface Props {
  prev: BlogArticlePrevOrNext;
  next: BlogArticlePrevOrNext;
  reset: () => void;
}

const Each: React.FC<{ label: string; article: BlogArticlePrevOrNext; onClick: () => void }> = ({ label, article , onClick}) => {
  const classes = useEachStyles();

  return <div className={classes.eachContainer} hidden={!article.id}>
    <Typography variant="subtitle2" className={classes.label}>{label}</Typography>
    <Link href={article.uri} onClick={onClick}>{article.title}</Link>
  </div>;

};

const ArticlePrevAndNext: React.FC<Props> = ({ prev, next , reset}) => {
  const classes = useStyles();
  return <div className={classes.container}>
    <hr className={classes.hrUpper} />
    <Each label='Next Article' article={next} onClick={reset}/>
    <Each label='Previous Article' article={prev} onClick={reset} />
    <hr className={classes.hrLower} />

    <Link href="/blog">
      <Button variant="outlined" style={{ textTransform: "capitalize" }}>Article List</Button>
    </Link>
  </div>;
};

export default ArticlePrevAndNext;

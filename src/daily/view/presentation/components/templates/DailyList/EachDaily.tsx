import * as React from "react";
import {Link} from "src/common/view/presentation/components/molecules";
import {formatDateTime} from "src/util";
import {DailyListResponse} from "../../../../../domain/DailyListResponse";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: "flex",
    fontSize: "1rem",
    fontFamily: "Noto Serif KR",
    fontWeight: 400
  },
  seq: {
    textAlign: "right",
    width: theme.spacing(4)
  },
  date: {
    textAlign: "center",
    width: theme.spacing(12)
  },
  title: {
    width: theme.spacing(28)
  }
}));

interface Props {
  daily: DailyListResponse;
}

const EachDailyContent: React.FC<{
  daily: DailyListResponse;
  userSelectNone?: boolean;
}> = ({ daily, userSelectNone }) => {
  const classes = useStyles();
  return <div className={classes.container} style={{ userSelect: userSelectNone ? "none" : "inherit" }}>
    <div className={classes.seq}>{daily.seq}.</div>
    <div className={classes.date}>[{formatDateTime(daily.createdAt, "YYYY.MM.DD")}]</div>
    <div className={classes.title}>{daily.title}</div>
  </div>;
};

const EachDaily: React.FC<Props> = ({ daily }) => {
  return <Link href={daily.uri}>
    <EachDailyContent daily={daily} />
  </Link>;
};

export default EachDaily;

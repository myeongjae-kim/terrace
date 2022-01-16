import {Theme} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import * as React from "react";
import {Link} from "src/common/presentation/components/molecules";
import {DailyListResponseDto} from "src/daily/api";
import {formatDateTime} from "src/util";

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
  daily: DailyListResponseDto;
}

const EachDailyContent: React.FC<{
  daily: DailyListResponseDto;
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

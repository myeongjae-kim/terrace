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
    fontWeight: 400
  },
  seq: {
    textAlign: "right",
    fontFamily: "Inconsolata",
    width: theme.spacing(4)
  },
  date: {
    textAlign: "center",
    fontFamily: "Inconsolata",
    width: theme.spacing(13),
    paddingRight: theme.spacing(0.5)
  },
  title: {
    width: theme.spacing(28),
    fontSize: "0.9rem",
  }
}));

interface EachDailyContentProps {
  daily: DailyListResponse;
  userSelectNone?: boolean;
}

const EachDailyContent = ({ daily, userSelectNone }: EachDailyContentProps) => {
  const classes = useStyles();
  return <div className={classes.container} style={{ userSelect: userSelectNone ? "none" : "inherit" }}>
    <div className={classes.seq}>{daily.seq}.</div>
    <div className={classes.date}>[{formatDateTime(daily.createdAt, "YYYY.MM.DD")}]</div>
    <div style={{display: "flex", alignItems: "center"}}> {/* seq, date와 title의 글씨체가 달라서 수평을 맞추기 위함 */}
      <div className={classes.title}>{daily.title}</div>
    </div>
  </div>;
};

interface Props {
  daily: DailyListResponse;
}

const EachDaily = ({ daily }: Props) => {
  return <Link href={daily.uri}>
    <EachDailyContent daily={daily} />
  </Link>;
};

export default EachDaily;

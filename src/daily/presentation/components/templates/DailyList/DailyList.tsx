import {createStyles, makeStyles, Theme} from "@material-ui/core";
import * as React from "react";
import {DailyListResponseDto} from "src/daily/api";
import EachDaily from "./EachDaily";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  }
}));

export interface DailyListProps {
  dailys: DailyListResponseDto[];
}

const DailyList: React.FC<DailyListProps> = ({ dailys }) => {
  const classes = useStyles();
  return <div className={classes.container}>
    <div>
      {dailys.map(daily => <EachDaily
        key={daily.id}
        daily={daily}
      />)}
    </div>
  </div>;
};

export default DailyList;

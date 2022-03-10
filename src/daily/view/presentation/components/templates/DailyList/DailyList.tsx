import {createStyles, makeStyles} from "@mui/styles";
import * as React from "react";
import EachDaily from "./EachDaily";
import {DailyListResponse} from "../../../../../domain/DailyListResponse";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  }
}));

export interface DailyListProps {
  dailys: DailyListResponse[];
}

const DailyList = ({ dailys }: DailyListProps) => {
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

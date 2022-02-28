import {createStyles, makeStyles} from "@mui/styles";
import * as React from "react";
import EachDaily from "./EachDaily";
import {DailyListResponse} from "../../../../../domain/DailyListResponse";
import {Theme} from "@mui/system";

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

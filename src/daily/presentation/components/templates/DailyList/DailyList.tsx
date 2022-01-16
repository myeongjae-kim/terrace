import {createStyles, makeStyles, Theme} from "@material-ui/core";
import * as React from "react";
import {DailyListResponseDto} from "src/daily/api";
import EachDaily from "./EachDaily";
import {Maybe} from "src/common/presentation/components/molecules";
import Loading from "../../../../../Loading";

const useStyles = makeStyles((theme: Theme) => createStyles({
  dailyList: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  }
}));

export interface DailyListProps {
  dailys: DailyListResponseDto[];
  pending: boolean;
  rejected: boolean;
}

const DailyList: React.FC<DailyListProps> = ({ dailys , pending}) => {
  const classes = useStyles();
  return <div className={classes.dailyList}>
    <div>
      <Maybe test={pending}>
        <Loading />
      </Maybe>
      <Maybe test={!pending}>
        {dailys.map(daily => <EachDaily
          key={daily.id}
          daily={daily}
        />)}
      </Maybe>
    </div>
  </div>;
};

export default DailyList;

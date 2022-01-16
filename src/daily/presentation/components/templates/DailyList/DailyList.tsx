import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Optional from "optional-js";
import * as React from "react";
import {DailyDetailResponseDto, DailyListResponseDto} from "src/daily/api";
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

  currentDaily?: DailyDetailResponseDto;
}

const DailyList: React.FC<DailyListProps> = ({ dailys, currentDaily }) => {
  const classes = useStyles();
  return <div className={classes.dailyList}>
    <div>
      <Maybe test={dailys.length === 0}>
        <Loading />
      </Maybe>
      <Maybe test={dailys.length !== 0}>
        {dailys.map(daily => <EachDaily
          key={daily.id}
          daily={daily}
          isLinkDisabled={daily.id === Optional.ofNullable(currentDaily).map(d => d.id).orElse("")}
        />)}
      </Maybe>
    </div>
  </div>;
};

export default DailyList;

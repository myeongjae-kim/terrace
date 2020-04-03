import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Optional from "optional-js";
import * as React from "react";
import { DailyDetailResponseDto, DailyListResponseDto } from "src/daily/api";
import EachDaily from "./EachDaily";
import { Maybe, MySpeedDial } from "src/common/presentation/components/molecules";
import { Add } from "@material-ui/icons";
import { Endpoints } from "src/common/constants/Constants";
import { createLinkClickHandler } from "src/util";

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
  isSignedIn: boolean;

  currentDaily?: DailyDetailResponseDto;
}

const DailyList: React.FC<DailyListProps> = ({ dailys, isSignedIn, currentDaily }) => {
  const classes = useStyles();
  return <div className={classes.dailyList}>
    <div>
      {dailys.map(daily => <EachDaily
        key={daily.id}
        daily={daily}
        isLinkDisabled={daily.id === Optional.ofNullable(currentDaily).map(d => d.id).orElse("")}
      />)}
    </div>
    <Maybe test={isSignedIn}>
      <MySpeedDial actions={[{
        icon: <Add />,
        name: "등록",
        handleClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          createLinkClickHandler(Endpoints["daily.create"])(e);
        }
      }]} />
    </Maybe>
  </div>;
};

export default DailyList;
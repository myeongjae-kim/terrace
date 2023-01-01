import {createStyles, makeStyles} from "@mui/styles";
import clsx from "clsx";
import * as React from "react";
import {HeadTitle, Link} from "src/common/view/presentation/components/molecules";
import {formatDateTime} from "src/util";
import {DailyContent} from "../../organisms";
import {DailyDetailResponse} from "../../../../../domain/DailyDetailResponse";
import {Typography, Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(62.5),
    margin: `auto auto ${theme.spacing(3)} auto`
  },
  title: {
    margin: `${theme.spacing(3)} 0 ${theme.spacing(4)} 0`,
  },
  serif: {
    fontWeight: 400,
  },
  center: {
    textAlign: "center"
  },
}));

export interface DailyDetailProps {
  daily: DailyDetailResponse;
}

const DailyDetail = ({ daily }: DailyDetailProps) => {
  const classes = useStyles();
  const {
    seq,
    createdAt,
    title,
    slug,
    content
  } = daily;

  return <>
    <HeadTitle title={title} />
    <div className={classes.container}>
      <div className={classes.center}>
        <Link href={"/daily" + formatDateTime(createdAt, "/YYYY/MM/DD/") + slug} shallow={true}>
          <Typography className={clsx(classes.serif, classes.title)}>
            {seq}. [{formatDateTime(createdAt, "YYYY.MM.DD")}] {title}
          </Typography>
        </Link>
      </div>
      <div>
        <DailyContent content={content} />
      </div>
    </div>
  </>;
};

export default DailyDetail;

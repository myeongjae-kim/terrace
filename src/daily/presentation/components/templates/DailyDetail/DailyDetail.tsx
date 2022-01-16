import {Theme, Typography} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import clsx from "clsx";
import ErrorPage from "pages/_error";
import * as React from "react";
import {HeadTitle, Link, Maybe} from "src/common/presentation/components/molecules";
import {DailyDetailResponseDto} from "src/daily/api";
import {formatDateTime} from "src/util";
import {DailyContent} from "../../organisms";
import Loading from "src/Loading";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(62.5),
    margin: `auto auto ${theme.spacing(3)} auto`
  },
  title: {
    margin: `${theme.spacing(3)} 0 ${theme.spacing(4)} 0`,
  },
  serif: {
    fontFamily: "Noto Serif KR",
    fontWeight: 400,
  },
  center: {
    textAlign: "center"
  },
}));

export interface DailyDetailProps {
  daily: DailyDetailResponseDto;
  pending: boolean;
  rejected: boolean;
  statusCode: number;

  update(e: React.MouseEvent): void;
  del(): void;
}

const DailyDetail: React.FC<DailyDetailProps> = ({ daily, pending, rejected, statusCode}) => {
  const classes = useStyles();
  const {
    seq,
    createdAt,
    title,
    slug,
    content
  } = daily;

  return <>
    <Maybe test={!rejected && !pending}>
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
    </Maybe>

    <Maybe test={pending}>
      <Loading style={{paddingTop: "calc(30vh)", paddingBottom: "calc(50vh)"}} />
    </Maybe>

    <Maybe test={rejected}>
      <ErrorPage statusCode={statusCode} />
    </Maybe>
  </>;
};

export default DailyDetail;

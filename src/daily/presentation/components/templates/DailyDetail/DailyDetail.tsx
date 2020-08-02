import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import clsx from "clsx";
import ErrorPage from "pages/_error";
import * as React from "react";
import { HeadTitle, Link, Maybe, MySpeedDial } from "src/common/presentation/components/molecules";
import { DailyDetailResponseDto } from "src/daily/api";
import { formatDateTime } from "src/util";
import { Edit, Delete } from "@material-ui/icons";
import { DailyContent } from "../../organisms";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(62.5),
    margin: `auto auto ${theme.spacing(3)}px auto`
  },
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(4)}px 0`,
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
  isSignedIn: boolean;
  pending: boolean;
  rejected: boolean;
  statusCode: number;

  update(e: React.MouseEvent): void;
  del(): void;
}

const DailyDetail: React.FC<DailyDetailProps> = ({ daily, isSignedIn, rejected, statusCode, update, del }) => {
  const classes = useStyles();
  const {
    seq,
    createdAt,
    title,
    slug,
    content
  } = daily;

  return <>
    <Maybe test={!rejected}>
      <HeadTitle title={title} />
      <div className={classes.container}>
        <div className={classes.center}>
          <Link href="/daily/detail" as={"./" + slug}>
            <Typography className={clsx(classes.serif, classes.title)}>
              {seq}. [{formatDateTime(createdAt, "YYYY.MM.DD")}] {title}
            </Typography>
          </Link>
        </div>
        <div>
          <DailyContent content={content} />
        </div>
      </div>
      <Maybe test={isSignedIn}>
        <MySpeedDial actions={[{
          name: "수정",
          icon: <Edit />,
          handleClick: update
        }, {
          name: "삭제",
          icon: <Delete />,
          handleClick: del
        }]} />
      </Maybe>
    </Maybe>
    <Maybe test={rejected}>
      <ErrorPage statusCode={statusCode} />
    </Maybe>
  </>;
};

export default DailyDetail;
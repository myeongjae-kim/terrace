import {useTheme} from "@mui/material";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, Store} from "redux";
import {createSelector} from "reselect";
import NextPage from "src/common/domain/model/NextPage";
import {HeadTitle} from "src/common/presentation/components/molecules";
import {Comment} from "src/common/presentation/components/organisms";
import {RootState} from "src/common/presentation/state-module/root";
import {DailyDetailResponseDto, DailyPathDto} from "src/daily/api/dto";
import DailyDetail from "src/daily/presentation/components/templates/DailyDetail";
import * as detailModule from "src/daily/presentation/state-modules/detail";
import {createLinkClickHandler, formatDateTime, redirectFromGetInitialPropsTo} from "src/util";
import {Endpoints} from "src/common/constants/Constants";
import * as commonModule from "src/common/presentation/state-module/common";

interface DailyDetailPageStates {
  dailyDetail: DailyDetailResponseDto;

  pending: boolean;
  rejected: boolean;
  statusCode: number;
}

const selector = createSelector<RootState, detailModule.State, DailyDetailPageStates>(
  root => root.daily.detail,
  (detail) => ({
    dailyDetail: detail.daily,

    pending: detail.pending,
    rejected: detail.rejected,
    statusCode: detail.statusCode,
  }));


interface Props {
  dailyPathDto: DailyPathDto;
}

const DailyDetailPage: NextPage<Props> = ({dailyPathDto}) => {
  const theme = useTheme();
  const dailyPageProps = useSelector<RootState, DailyDetailPageStates>(selector);
  const { dailyDetail, pending, rejected, statusCode } = dailyPageProps;

  const dispatch = useDispatch<Dispatch<detailModule.Action | commonModule.Action>>();
  React.useEffect(() => () => {
    dispatch(detailModule.reset());
  }, [dispatch]);

  const { createdAt, slug } = dailyDetail;
  const subPath = `${formatDateTime(createdAt, "/YYYY/MM/DD")}/${slug}`;
  const updateUri = `${Endpoints["daily.update"]}${subPath}`;

  const update = React.useCallback((e: React.MouseEvent) => {
    createLinkClickHandler(
      Endpoints["daily.update"],
      updateUri
    )(e);
  }, [updateUri]);

  const del = React.useCallback(() => {
    dispatch(commonModule.openConfirmDialog({
      "content": "정말로 삭제하시겠습니까?",
      onClick: () => dispatch(detailModule.deleteDaily({ dailyPathDto }))
    }));
  }, [dailyPathDto, dispatch]);

  return <div>
    <HeadTitle title="Daily" />
    <DailyDetail
      daily={dailyDetail}
      pending={pending}
      rejected={rejected}
      statusCode={statusCode}
      update={update}
      del={del} />
    <Comment identifier={`daily${subPath}`} />
    <style jsx global>{`
#comment-container {
  max-width: ${theme.spacing(62.5)}px;
}
    `}</style>
  </div>;
};

DailyDetailPage.getInitialProps = async ({ store, asPath, res }) => {
  if (!asPath) {
    redirectFromGetInitialPropsTo("/404", res);
    return {};
  }

  const dailyPathDto = parsePathToDailyDetailRequest(asPath);
  fetchDailyDetail(store, dailyPathDto);

  return { namespacesRequired: ["common", "noti"], dailyPathDto };
};

const fetchDailyDetail = (store: Store<RootState>, req: DailyPathDto): void => {
  store.dispatch(detailModule.fetchDaily({ daily: req }));
};

const parsePathToDailyDetailRequest = (asPath: string): DailyPathDto => {
  const splitted = asPath.split("/");
  return {
    year: splitted[2],
    month: splitted[3],
    day: splitted[4],
    slug: decodeURIComponent(splitted[5]),
  };
};

export default DailyDetailPage;

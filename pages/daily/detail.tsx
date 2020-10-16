import { useTheme } from "@material-ui/core";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, Store } from "redux";
import { createSelector } from "reselect";
import NextPage from "src/common/domain/model/NextPage";
import { HeadTitle } from "src/common/presentation/components/molecules";
import { Comment } from "src/common/presentation/components/organisms";
import { RootState } from "src/common/presentation/state-module/root";
import { DailyPathDto, DailyListResponseDto, DailyDetailResponseDto } from "src/daily/api/dto";
import DailyDetail from "src/daily/presentation/components/templates/DailyDetail";
import DailyList from "src/daily/presentation/components/templates/DailyList";
import * as detailModule from "src/daily/presentation/state-modules/detail";
import * as listModule from "src/daily/presentation/state-modules/list";
import { formatDateTime, redirectFromGetInitialPropsTo, createLinkClickHandler } from "src/util";
import { Endpoints } from "src/common/constants/Constants";
import * as commonModule from "src/common/presentation/state-module/common";
import * as meModule from "src/auth/presentation/state-modules/me";

interface DailyDetailPageStates {
  dailyList: DailyListResponseDto[];
  dailyDetail: DailyDetailResponseDto;
  isSignedIn: boolean;

  pending: boolean;
  rejected: boolean;
  statusCode: number;
}

const selector = createSelector<RootState, listModule.State, detailModule.State, meModule.State, DailyDetailPageStates>(
  root => root.daily.list,
  root => root.daily.detail,
  root => root.auth.me,
  (list, detail, me) => ({
    dailyList: list.dailys,
    dailyDetail: detail.daily,
    isSignedIn: me.isSignedIn,

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
  const { dailyList, dailyDetail, isSignedIn, pending, rejected, statusCode } = dailyPageProps;

  const dispatch = useDispatch<Dispatch<detailModule.Action | commonModule.Action>>();
  React.useEffect(() => () => {
    dispatch(detailModule.reset());
  }, [dispatch]);

  const { createdAt, slug } = dailyDetail;
  const subPath = `${formatDateTime(createdAt, "/YYYY/MM/DD")}/${slug}`;
  const uri = `${Endpoints["daily"]}${subPath}`;
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
      isSignedIn={isSignedIn}
      pending={pending}
      rejected={rejected}
      statusCode={statusCode}
      update={update}
      del={del} />
    <Comment identifier={uri} />
    <DailyList
      dailys={dailyList}
      pending={false}
      rejected={false}
      isSignedIn={isSignedIn}
      currentDaily={dailyDetail}
    />
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

  fetchDailyList(store);

  const dailyPathDto = parsePathToDailyDetailRequest(asPath);
  fetchDailyDetail(store, dailyPathDto);

  return { namespacesRequired: ["common", "noti"], dailyPathDto };
};

const fetchDailyList = (store: Store<RootState>): void => {
  if (store.getState().daily.list.dailys.length === 0) {
    store.dispatch(listModule.fetchDailys());
  }
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
    slug: splitted[5],
  };
};

export default DailyDetailPage;

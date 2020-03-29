import { useTheme } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, Store } from 'redux';
import { createSelector } from 'reselect';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import { Comment } from 'src/common/presentation/components/organisms';
import { RootState } from 'src/common/presentation/state-module/root';
import { DailyDetailRequestDto } from 'src/daily/api/dto';
import DailyDetail from 'src/daily/presentation/components/templates/DailyDetail';
import { DailyDetailProps } from 'src/daily/presentation/components/templates/DailyDetail/DailyDetail';
import DailyList from 'src/daily/presentation/components/templates/DailyList';
import { DailyListProps } from 'src/daily/presentation/components/templates/DailyList/DailyList';
import * as detailModule from "src/daily/presentation/state-modules/detail";
import * as listModule from "src/daily/presentation/state-modules/list";
import { formatDateTime, redirectFromGetInitialPropsTo } from 'src/util';

interface DailyDetailPageStates {
  dailyListProps: DailyListProps,
  dailyDetailProps: DailyDetailProps
}

const selector = createSelector<RootState, listModule.State, detailModule.State, DailyDetailPageStates>(
  root => root.daily.list,
  root => root.daily.detail,
  (list, detail) => ({
    dailyListProps: list,
    dailyDetailProps: detail,
  }));

const DailyDetailPage: NextPage = () => {
  const theme = useTheme();
  const dailyProps = useSelector<RootState, DailyDetailPageStates>(selector);
  const { dailyListProps, dailyDetailProps } = dailyProps;
  const { daily } = dailyDetailProps;

  const dispatch = useDispatch<Dispatch<detailModule.Action>>();
  React.useEffect(() => () => {
    dispatch(detailModule.reset());
  }, [])

  const { createdAt, slug } = daily;
  const uri = `/daily/${formatDateTime(createdAt, "YYYY/MM/DD")}/${slug}/`;

  return <div>
    <HeadTitle title="Daily" />
    <DailyDetail {...dailyDetailProps} />
    <DailyList {...dailyListProps} currentDaily={daily} />
    <Comment identifier={uri} />
    <style jsx global>{`
#comment-container {
  max-width: ${theme.spacing(62.5)}px;
}
    `}</style>
  </div>
}

DailyDetailPage.getInitialProps = async ({ store, asPath, res }) => {
  if (!asPath) {
    redirectFromGetInitialPropsTo("/404", res);
    return {}
  }

  fetchDailyList(store);
  fetchDailyDetail(store, parsePathToDailyDetailRequest(asPath));

  return { namespacesRequired: ['common', 'noti'] }
}

const fetchDailyList = (store: Store<RootState>): void => {
  if (store.getState().daily.list.dailys.length === 0) {
    store.dispatch(listModule.fetchDailys())
  }
}

const fetchDailyDetail = (store: Store<RootState>, req: DailyDetailRequestDto): void => {
  store.dispatch(detailModule.fetchDaily({ daily: req }))
}

const parsePathToDailyDetailRequest = (asPath: string): DailyDetailRequestDto => {
  const splitted = asPath.split("/");
  return {
    year: splitted[2],
    month: splitted[3],
    day: splitted[4],
    slug: splitted[5],
  }
}

export default DailyDetailPage;
import { NextPageContext } from 'next';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import { RootState } from 'src/common/presentation/state-module/root';
import { DailyListResponseDto } from 'src/daily/api';
import Daily from 'src/daily/presentation/components/templates/Daily';
import * as listModule from "src/daily/presentation/state-modules/list"
import { redirectFromGetInitialPropsTo } from 'src/util';

interface Props {
  dailys: DailyListResponseDto[]
  pending: boolean
  rejected: boolean
}

const DailyDetailPage: NextPage<Props> = ({ dailys, pending, rejected }) => <>
  <HeadTitle title="Daily" />
  <Daily dailys={dailys} pending={pending} rejected={rejected} />
</>

DailyDetailPage.getInitialProps = async ({ store, asPath, res }: { store: Store<RootState> } & NextPageContext) => {
  if (!asPath) {
    redirectFromGetInitialPropsTo("/404", res);
    return {}
  }

  fetchDailyList(store);
  // fetchDailyDetail(store, parsePathToDailyDetailRequest(asPath));

  console.log("\n\n\n daily detail page asPath:", parsePathToDailyDetailRequest(asPath));

  // store.dispatch(detailModule.fetchDaily(parsePathToDate(asPath)))

  return { namespacesRequired: ['common'] }
}

const fetchDailyList = (store: Store<RootState>): void => {
  if (store.getState().daily.list.dailys.length === 0) {
    store.dispatch(listModule.fetchDailys())
  }
}

const parsePathToDailyDetailRequest = (asPath: string) => {
  const splitted = asPath.split("/");
  return {
    year: splitted[2],
    month: splitted[3],
    day: splitted[4],
    slug: splitted[5],
  }
}

const mapStateToProps = ({ daily }: RootState) => ({
  dailys: daily.list.dailys,
  pending: daily.list.pending,
  rejected: daily.list.rejected
})

export default connect(mapStateToProps)(DailyDetailPage);
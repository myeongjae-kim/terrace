import { NextPageContext } from 'next';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import { PageTitle } from 'src/common/presentation/components/molecules';
import { RootState } from 'src/common/presentation/state-module/root';
import { DailyListResponseDto } from 'src/daily/api';
import DailyList from 'src/daily/presentation/components/templates/DailyList';
import * as listModule from "src/daily/presentation/state-modules/list"

interface Props {
  dailys: DailyListResponseDto[]
  pending: boolean
  rejected: boolean
}

const DailyPage: NextPage<Props> = ({ dailys, pending, rejected }) => <>
  <HeadTitle title="Daily" />
  <PageTitle title="daily" />
  <DailyList dailys={dailys} pending={pending} rejected={rejected} />
</>

DailyPage.getInitialProps = async ({ store }: { store: Store<RootState> } & NextPageContext) => {
  if (store.getState().daily.list.dailys.length === 0) {
    store.dispatch(listModule.fetchDailys())
  }

  return { namespacesRequired: ['common', 'noti'] }
}

const mapStateToProps = ({ daily }: RootState) => ({
  dailys: daily.list.dailys,
  pending: daily.list.pending,
  rejected: daily.list.rejected
})

export default connect(mapStateToProps)(DailyPage);
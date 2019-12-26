import { NextPageContext } from 'next';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Store } from 'redux';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import { RootState } from 'src/common/presentation/state-module/root';
import { DailyListResponseDto } from 'src/daily/api';
import Daily from 'src/daily/presentation/components/templates/Daily';
import * as listModule from "src/daily/presentation/state-modules/list"

interface Props {
  dailys: DailyListResponseDto[]
  pending: boolean
  rejected: boolean

  dispatchers: typeof listModule
}

const DailyPage: NextPage<Props> = ({ dailys, pending, rejected, dispatchers }) => {
  React.useEffect(() => () => {
    dispatchers.reset();
  }, [])

  return <>
    <HeadTitle title="Daily" />
    <Daily dailys={dailys} pending={pending} rejected={rejected} />
  </>
}

DailyPage.getInitialProps = async ({ store }: { store: Store<RootState> } & NextPageContext) => {
  store.dispatch(listModule.fetchDailys())

  return { namespacesRequired: ['common'] }
}

const mapStateToProps = ({ daily }: RootState) => ({
  dailys: daily.list.dailys,
  pending: daily.list.pending,
  rejected: daily.list.rejected
})

const mapDispatchToProps = (dispatch: Dispatch<listModule.Action>) => ({
  dispatchers: bindActionCreators(listModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DailyPage);
import { NextPageContext } from 'next';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle, PageTitle } from 'src/common/presentation/components/molecules';
import { RootState } from 'src/common/presentation/state-module/root';
import DailyList from 'src/daily/presentation/components/templates/DailyList';
import { DailyListProps } from 'src/daily/presentation/components/templates/DailyList/DailyList';
import * as listModule from "src/daily/presentation/state-modules/list";

const DailyPage: NextPage = () => {
  const props = useSelector<RootState, DailyListProps>(({ daily }) => daily.list);

  return <>
    <HeadTitle title="Daily" />
    <PageTitle title="daily" />
    <DailyList {...props} />
  </>
}

DailyPage.getInitialProps = async ({ store }: { store: Store<RootState> } & NextPageContext) => {
  if (store.getState().daily.list.dailys.length === 0) {
    store.dispatch(listModule.fetchDailys())
  }

  return { namespacesRequired: ['common', 'noti'] }
}

export default DailyPage;
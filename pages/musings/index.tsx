import { NextPageContext } from 'next';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import { createSelector } from 'reselect';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import { RootState } from 'src/common/presentation/state-module/root';
import Musings from 'src/musings/presentation/components/templates/Musings';
import { MusingsProps } from 'src/musings/presentation/components/templates/Musings/Musings';
import * as listModule from "src/musings/presentation/state-modules/list";

const selector = createSelector<RootState, listModule.State, MusingsProps>(
  root => root.musings.list,
  list => list
);

const MusingsPage: NextPage = () => {
  const props = useSelector<RootState, MusingsProps>(selector)

  return <>
    <HeadTitle title="Musings" />
    <Musings {...props} />
  </>
}


MusingsPage.getInitialProps = async ({ store }: { store: Store<RootState> } & NextPageContext) => {
  if (store.getState().musings.list.musings.length === 0) {
    store.dispatch(listModule.fetchMusings())
  }

  return {
    namespacesRequired: ['common', 'noti'],
  }
}

export default MusingsPage;
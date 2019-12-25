import { NextPageContext } from 'next';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import { RootState } from 'src/common/presentation/state-module/root';
import MusingsContainer from 'src/musings/presentation/containers/MusingsContainer';
import { fetchMusings } from 'src/musings/presentation/state-modules/list';

const MusingsPage: NextPage = () => <>
  <HeadTitle title="Musings" />
  <MusingsContainer />
</>;

MusingsPage.getInitialProps = async ({ store }: { store: Store<RootState> } & NextPageContext) => {
  if (store.getState().musings.list.musings.length < 1) {
    store.dispatch(fetchMusings())
  }

  return {
    namespacesRequired: ['common', 'noti'],
  }
}


export default connect(state => state)(MusingsPage);
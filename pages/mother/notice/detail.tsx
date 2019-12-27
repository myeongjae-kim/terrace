import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'pages/_error'
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import NextPage from 'src/common/domain/model/NextPage';
import { RootState } from 'src/common/presentation/state-module/root';
import NoticeDetailContainer from "src/mother/notice/presentation/containers/NoticeDetailContainer";
import { fetchNotice } from 'src/mother/notice/presentation/state-modules/detail';

const NoticeDetailPage: NextPage = () => {
  const router = useRouter();
  const id = parseInt(String(router.query.id), 10);

  if (isNaN(id)) {
    return <ErrorPage statusCode={400} />
  }

  return <NoticeDetailContainer id={id} />;
}

NoticeDetailPage.getInitialProps = async ({ store, query }: { store: Store<RootState> } & NextPageContext) => {
  const { id } = store.getState().mother.notice.detail.notice;
  if (id < 1) {
    store.dispatch(fetchNotice({ id: parseInt(String(query.id), 10) }));
  }

  return {
    namespacesRequired: ['common', 'mother', 'noti']
  }
}

export default connect(state => state)(NoticeDetailPage);
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import NextPage from 'src/common/domain/model/NextPage';
import { RootState } from 'src/common/presentation/state-module/root';
import NoticeFormContainer from "src/mother/notice/presentation/containers/NoticeFormContainer";
import { fetchInitialNotice, setPendingFalse } from 'src/mother/notice/presentation/state-modules/form';

const NoticeFormPage: NextPage = () => {
  const router = useRouter();
  const id = parseInt(String(router.query.id), 10);

  if (isNaN(id)) {
    return <NoticeFormContainer isEditing={false} />;
  }

  return <NoticeFormContainer id={id} isEditing={true} />;
}

NoticeFormPage.getInitialProps = async ({ store, query }: { store: Store<RootState> } & NextPageContext) => {
  if (query.id && store.getState().mother.notice.form.initialNoticeFormDto.title === "") {
    store.dispatch(fetchInitialNotice({ id: parseInt(String(query.id), 10) }));
  } else {
    store.dispatch(setPendingFalse());
  }

  return {
    namespacesRequired: ['common', 'mother', 'noti']
  }
}

export default connect(state => state)(NoticeFormPage);

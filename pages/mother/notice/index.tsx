import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import NoticeListContainer from 'src/mother/notice/presentation/containers/NoticeListContainer';

const NoticePage: NextPage = () => <NoticeListContainer />;

NoticePage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'mother', 'noti'],
})

export default NoticePage;
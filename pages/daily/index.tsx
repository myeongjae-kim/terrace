import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';

const DailyPage: NextPage = () => <>데일리</>;

DailyPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default DailyPage
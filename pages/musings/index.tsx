import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';

const MusingsPage: NextPage = () => <>뮤징스</>;

MusingsPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default MusingsPage
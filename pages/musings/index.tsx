import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';

const MusingsPage: NextPage = () => <>
  <HeadTitle title="Musings" />
  뮤징스
</>;

MusingsPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default MusingsPage
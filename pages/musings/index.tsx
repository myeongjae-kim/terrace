import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import MusingsContainer from 'src/musings/presentation/containers/MusingsContainer';

const MusingsPage: NextPage = () => <>
  <HeadTitle title="Musings" />
  <MusingsContainer />
</>;

MusingsPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default MusingsPage
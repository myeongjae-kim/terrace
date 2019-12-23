import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import Musings from 'src/musings/api/presentation/components/templates/Musings';

const MusingsPage: NextPage = () => <>
  <HeadTitle title="Musings" />
  <Musings />
</>;

MusingsPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default MusingsPage
import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';

const PlacesPage: NextPage = () => <>
  <HeadTitle title="Places" />
  장소
</>;

PlacesPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default PlacesPage
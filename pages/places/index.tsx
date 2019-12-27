import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import Places from 'src/places/presentation/components/templates/Places';

const PlacesPage: NextPage = () => <>
  <HeadTitle title="Places" />
  <Places />
</>;

PlacesPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'noti'],
})

export default PlacesPage
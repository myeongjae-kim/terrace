import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import Places from 'src/places/presentation/components/templates/Places';

const PlacesPage: NextPage = () => <div style={{ width: "100%" }}>
  <HeadTitle title="Places" />
  <Places />
</div>;

PlacesPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'noti'],
})

export default PlacesPage
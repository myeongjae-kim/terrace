import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';

const PlacesPage: NextPage = () => <>장소</>;

PlacesPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default PlacesPage
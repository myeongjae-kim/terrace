import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';

const AboutPage: NextPage = () => <>어바웃</>;

AboutPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default AboutPage
import * as React from 'react';
import About from 'src/about/presentation/components/templates/About';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';

const AboutPage: NextPage = () => <>
  <HeadTitle title="About" />
  <About />
</>;

AboutPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'noti'],
})

export default AboutPage
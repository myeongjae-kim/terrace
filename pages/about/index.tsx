import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';

const AboutPage: NextPage = () => <>
  <HeadTitle title="About" />
  어바웃
</>;

AboutPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default AboutPage
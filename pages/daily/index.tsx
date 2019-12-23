import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';

const DailyPage: NextPage = () => <>
  <HeadTitle title="Daily" />
  데일리
</>;

DailyPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default DailyPage
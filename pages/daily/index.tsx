import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import Daily from 'src/daily/presentation/components/templates/Daily';

const DailyPage: NextPage = () => <>
  <HeadTitle title="Daily" />
  <Daily />
</>;

DailyPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default DailyPage
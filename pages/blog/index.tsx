import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';

const BlogPage: NextPage = () => <>
  <HeadTitle title="Blog" />
  블로그
</>;

BlogPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default BlogPage
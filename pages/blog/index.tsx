import * as React from 'react';
import Blog from 'src/blog/presentation/components/templates/Blog';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';

const BlogPage: NextPage = () => <>
  <HeadTitle title="Blog" />
  <Blog />
</>;

BlogPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'noti'],
})

export default BlogPage
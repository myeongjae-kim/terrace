import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';

const BlogPage: NextPage = () => <>블로그</>;

BlogPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default BlogPage
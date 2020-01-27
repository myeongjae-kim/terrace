import * as React from 'react';
import { BlogArticleForm } from 'src/blog/presentation/components/templates';
import NextPage from 'src/common/domain/model/NextPage';

const BlogArticleCreatePage: NextPage = () => {
  return <div>
    <BlogArticleForm />
  </div>
}

BlogArticleCreatePage.getInitialProps = async () => {
  return { namespacesRequired: ['common', 'noti'] }
}

export default BlogArticleCreatePage;
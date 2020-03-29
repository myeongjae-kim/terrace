import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { BlogArticleDetailResponseDto, BlogArticlePathDto, BlogArticleRequestDto } from 'src/blog/api';
import { BlogArticleForm } from 'src/blog/presentation/components/templates';
import * as formModule from 'src/blog/presentation/state-modules/form';
import NextPage from 'src/common/domain/model/NextPage';
import { RootState } from 'src/common/presentation/state-module/root';
import { redirectFromGetInitialPropsTo } from 'src/util';

const selector = createSelector<RootState, formModule.State, {
  initialValues: BlogArticleDetailResponseDto
  pending: boolean
  rejected: boolean
}>(
  root => root.blog.form,
  ({ initialValues, pending, rejected }) => ({ initialValues, pending, rejected })
)

const parsePathToPathDto = (asPath: string): BlogArticlePathDto => {
  const splitted = asPath.split("/");
  return {
    year: splitted[3],
    month: splitted[4],
    day: splitted[5],
    slug: splitted[6],
  }
}

const BlogArticleUpdatePage: NextPage<{ asPath: string }> = ({ asPath }) => {
  const dispatch = useDispatch<Dispatch<formModule.Action>>();
  const props = useSelector(selector);

  React.useEffect(() => {
    dispatch(formModule.fetchBlogArticle({ blogArticlePathDto: parsePathToPathDto(asPath) }))
  }, [])

  const onSubmit = React.useCallback((request: BlogArticleRequestDto) => {
    dispatch(formModule.updateBlogArticle({ request }))
    return Promise.resolve();
  }, [])

  return <div>
    <BlogArticleForm onSubmit={onSubmit} isUpdating {...props} />
  </div>
}

BlogArticleUpdatePage.getInitialProps = async ({ asPath, res }) => {
  if (!asPath) {
    redirectFromGetInitialPropsTo("/404", res);
    return {}
  }

  return { namespacesRequired: ['common', 'noti'], asPath }
}

export default BlogArticleUpdatePage;
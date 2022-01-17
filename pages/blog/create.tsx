import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { BlogArticleRequestDto } from "src/blog/api";
import { BlogArticleForm } from "src/blog/presentation/components/templates";
import * as formModule from "src/blog/presentation/state-modules/form";
import NextPage from "src/common/domain/model/NextPage";
import { RootState } from "src/common/presentation/state-module/root";

interface SelectorReturn {
  pending: boolean;
  rejected: boolean
}

const selector = createSelector(
  (root: RootState) => root.blog.form,
  ({ pending, rejected }: formModule.State): SelectorReturn => ({ pending, rejected })
);

const BlogArticleCreatePage: NextPage = () => {
  const dispatch = useDispatch<Dispatch<formModule.Action>>();
  const props = useSelector(selector);

  const onSubmit = React.useCallback((request: BlogArticleRequestDto) => {
    dispatch(formModule.createBlogArticle({ request }));
    return Promise.resolve();
  }, [dispatch]);

  return <div>
    <BlogArticleForm onSubmit={onSubmit} {...props} />
  </div>;
};

BlogArticleCreatePage.getInitialProps = async () => {
  return { namespacesRequired: ["common", "noti"] };
};

export default BlogArticleCreatePage;

import * as React from "react";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import BlogArticleList from "src/blog/presentation/components/templates/BlogArticleList";
import {BlogArticleListProps} from "src/blog/presentation/components/templates/BlogArticleList/BlogArticleList";
import * as listModule from "src/blog/presentation/state-modules/list";
import NextPage from "src/common/domain/model/NextPage";
import {HeadTitle, PageTitle} from "src/common/presentation/components/molecules";
import {RootState} from "src/common/presentation/state-module/root";
import MyPagination from "src/common/presentation/components/organisms/MyPagination";
import {pageContainerStyle} from "../../src/common/styles/pageContainerStyle";

const selector = createSelector(
  (root: RootState) => root.blog.list,
  (list: listModule.State): BlogArticleListProps => ({ ...list })
);

const BlogArticlePage: NextPage<{pageNumber: number}> = () => {
  const props = useSelector<RootState, BlogArticleListProps>(selector);

  return <div style={pageContainerStyle}>
    <div style={pageContainerStyle}>
      <HeadTitle title="Blog" />
      <PageTitle title="articles" />
      <BlogArticleList {...props} />
      <div /> {/* Loading 컴포넌트를 가운데로 맞추기 위한 empty div */}
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
      <div>
        <MyPagination pagination={props.pagination} />
      </div>
    </div>
  </div>;
};

BlogArticlePage.getInitialProps = async (initialProps) => {
  const {store, query} = initialProps;
  const page = parseInt("" + query["page"]) || 1;

  if (store.getState().blog.list.blogArticles.length === 0 || store.getState().blog.list.pagination.page !== page) {
    store.dispatch(listModule.fetchBlogArticles({page}));
  }

  return { namespacesRequired: ["common", "noti"] };
};

export default BlogArticlePage;

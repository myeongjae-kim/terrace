import * as React from "react";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import BlogArticleList from "src/blog/presentation/components/templates/BlogArticleList";
import {BlogArticleListProps} from "src/blog/presentation/components/templates/BlogArticleList/BlogArticleList";
import * as listModule from "src/blog/presentation/state-modules/list";
import NextPage from "src/common/domain/model/NextPage";
import {HeadTitle, Link, PageTitle} from "src/common/presentation/components/molecules";
import {RootState} from "src/common/presentation/state-module/root";
import {useRouter} from "next/router";

const selector = createSelector<RootState, listModule.State, BlogArticleListProps>(
  root => root.blog.list,
  (list) => ({ ...list })
);

const BlogArticlePage: NextPage<{pageNumber: number}> = (pageProps) => {
  const props = useSelector<RootState, BlogArticleListProps>(selector);
  const {pageNumber} = pageProps;
  const router = useRouter();

  return <div>
    <HeadTitle title="Blog" />
    <PageTitle title="articles" />
    <div>{pageNumber}</div>
    <div><Link href={`${router.pathname}?page=${pageNumber + 1}`}>nextPage</Link></div>
    <BlogArticleList {...props} />
  </div>;
};

BlogArticlePage.getInitialProps = async (initialProps) => {
  const {store, query} = initialProps;
  store.dispatch(listModule.fetchBlogArticles());

  const pageNumber = parseInt("" + query["page"]) || 1;

  return { namespacesRequired: ["common", "noti"], pageNumber };
};

export default BlogArticlePage;

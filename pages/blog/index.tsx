import * as React from "react";
import BlogArticleList from "src/blog/view/presentation/components/templates/BlogArticleList";
import {BlogArticleListProps} from "src/blog/view/presentation/components/templates/BlogArticleList/BlogArticleList";
import {HeadTitle, PageTitle} from "src/common/view/presentation/components/molecules";
import MyPagination from "src/common/view/presentation/components/organisms/MyPagination";
import {pageContainerStyle} from "src/common/view/presentation/styles/pageContainerStyle";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {strapiPaginationDefault} from "src/common/domain/StrapiPagination";
import useSWR, {SWRConfig} from "swr";
import {StrapiResponse} from "src/common/domain/StrapiResponse";
import {useRouter} from "next/router";
import {BlogArticleListResponse} from "src/blog/domain/BlogArticleListResponse";
import {container} from "src/config/inversify";
import {BlogFindAllUseCase} from "src/blog/application/port/incoming/BlogFindAllUseCase";
import {BlogFindAllUseCaseId} from "src/blog/adapter/inversify";

const {findAll} = container.get<BlogFindAllUseCase>(BlogFindAllUseCaseId);

interface Props {
  fallback: {[x: string]: StrapiResponse<BlogArticleListResponse>}
}

const getApiKey = (page: number) => `@blogArticleList/PAGE_${page}`;

const BlogArticleListPage = () => {
  const router = useRouter();
  const pageNumber = parseInt("" + router.query["page"]) || 1;

  const res = useSWR<StrapiResponse<BlogArticleListResponse>>(getApiKey(pageNumber), () => findAll(pageNumber));

  const listProps: BlogArticleListProps = {
    blogArticles: res.data?.data || [],
    pagination: res.data?.meta.pagination || strapiPaginationDefault,
  };

  return <div style={pageContainerStyle}>
    <div style={pageContainerStyle}>
      <HeadTitle title="Blog" />
      <PageTitle title="articles" />
      <BlogArticleList {...listProps} />
      <div /> {/* Loading 컴포넌트를 가운데로 맞추기 위한 empty div */}
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
      <div>
        <MyPagination pagination={listProps.pagination} />
      </div>
    </div>
  </div>;
};

const BlogArticleListPageWrapper = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SWRConfig value={{fallback: props.fallback}}>
    <BlogArticleListPage />
  </SWRConfig>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const {query} = context;
  const page = parseInt("" + query["page"]) || 1;

  const props = await findAll(page);
  const key = getApiKey(page);

  return {
    props: {
      fallback: {
        [key]: props
      }
    }
  };
};

export default BlogArticleListPageWrapper;

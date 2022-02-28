import {useTheme} from "@material-ui/core";
import {NextSeo} from "next-seo";
import * as React from "react";
import {DOMAIN, Endpoints} from "src/view/common/constants/Constants";
import {Comment} from "src/view/common/presentation/components/organisms";
import {formatDateTime} from "src/util";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import useSWR, {SWRConfig} from "swr";
import {useRouter} from "next/router";
import {
  BlogArticleDetailResponse,
  BlogArticlePrevOrNext,
  defaultBlogArticleDetailResponseDto
} from "src/blog/domain/BlogArticleDetailResponse";
import {BlogArticleDetail} from "src/blog/view/presentation/components/templates";
import {applicationContext} from "src/config/ApplicationContext";

const {getBySlug} = applicationContext.getBlogUseCase;
const {getPrevOf, getNextOf} = applicationContext.getBlogPrevOrNextUseCase;

const getApiKey = (slug: string) => `@blog/${slug}`;
const getPrevApiKey = (seq: number) => `@blogPrev/${seq}`;
const getNextApiKey = (seq: number) => `@blogNext/${seq}`;

const useFetchToGetPrevAndNextWhenArticleIsLoadedBySSR = (article: BlogArticleDetailResponse): {
  prev: BlogArticlePrevOrNext
  next: BlogArticlePrevOrNext
} => {
  const {seq} = article;
  const defaultData = {
    id: "",
    createdAt: "",
    title: "",
    uri: ""
  };

  const prevResponse = useSWR<BlogArticlePrevOrNext>(getPrevApiKey(seq), () => getPrevOf(seq));
  const nextResponse = useSWR<BlogArticlePrevOrNext>(getNextApiKey(seq), () => getNextOf(seq));

  return {
    prev: prevResponse.data || defaultData,
    next: nextResponse.data || defaultData
  };
};

interface Props {
  fallback: {[x: string]: BlogArticleDetailResponse}
}

const BlogDetailPage = () => {
  const router = useRouter();
  const slugFromPath = getSlug(router.asPath);

  const res = useSWR<BlogArticleDetailResponse>(getApiKey(slugFromPath), () => getBySlug(slugFromPath));
  const blogDetail = res.data || defaultBlogArticleDetailResponseDto;

  const {prev, next} = useFetchToGetPrevAndNextWhenArticleIsLoadedBySSR(blogDetail);

  const { title, content, createdAt, slug } = blogDetail;
  const subPath = `${formatDateTime(createdAt, "/YYYY/MM/DD")}/${slug}`;

  const theme = useTheme();

  return <div>
    <NextSeo
      title={title}
      description={content.substring(0, 512)}
      canonical={`${DOMAIN}${Endpoints.blog}${subPath}`}
    />

    <BlogArticleDetail
      blogArticle={{...blogDetail, prev, next}}
    />
    <Comment identifier={`blog${subPath}`} />
    <style jsx global>{`
#comment-container {
  max-width: ${theme.spacing(100)}px;
}
    `}</style>
  </div>;
};

const BlogDetailPageWrapper = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SWRConfig value={{fallback: props.fallback}}>
    <BlogDetailPage />
  </SWRConfig>;
};

const getSlug = (asPath: string): string => {
  const split = asPath.split("/");
  return decodeURIComponent(split[5]);
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // https://nodejs.org/api/http.html#messageurl
  const {pathname} = new URL(context.resolvedUrl || "", `https://${context.req.headers.host}`);
  const slug = getSlug(pathname);

  const props: BlogArticleDetailResponse = await getBySlug(slug);
  const key = getApiKey(slug);

  return {
    props: {
      fallback: {
        [key]: props
      }
    }
  };
};

export default BlogDetailPageWrapper;

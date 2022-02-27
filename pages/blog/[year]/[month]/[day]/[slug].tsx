import {useTheme} from "@material-ui/core";
import {NextSeo} from "next-seo";
import * as React from "react";
import {BlogArticleDetailResponseDto, BlogArticlePathDto, BlogArticlePrevOrNext} from "src/blog/api/dto";
import BlogArticleDetail from "src/blog/presentation/components/templates/BlogArticleDetail";
import {DOMAIN, Endpoints} from "src/common/constants/Constants";
import {Comment} from "src/common/presentation/components/organisms";
import {formatDateTime} from "src/util";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {blogArticleApi} from "src/blog/api";
import useSWR, {SWRConfig} from "swr";
import {useRouter} from "next/router";

const getApiKey = (slug: string) => `@blog/${slug}`;
const getPrevApiKey = (seq: number) => `@blogPrev/${seq}`;
const getNextApiKey = (seq: number) => `@blogNext/${seq}`;

const useFetchToGetPrevAndNextWhenArticleIsLoadedBySSR = (article: BlogArticleDetailResponseDto): {
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

  const prevResponse = useSWR<BlogArticlePrevOrNext>(getPrevApiKey(seq), () => blogArticleApi.getPrevOf(seq));
  const nextResponse = useSWR<BlogArticlePrevOrNext>(getNextApiKey(seq), () => blogArticleApi.getNextOf(seq));

  return {
    prev: prevResponse.data || defaultData,
    next: nextResponse.data || defaultData
  };
};

interface Props {
  fallback: {[x: string]: BlogArticleDetailResponseDto}
}

const BlogDetailPage = () => {
  const router = useRouter();
  const blogRequest = parsePathToBlogArticleDetailRequest(router.asPath);

  const res = useSWR<BlogArticleDetailResponseDto>(getApiKey(blogRequest.slug), () => blogArticleApi.find(blogRequest));
  const blogDetail = res.data || {
    id: "",
    seq: -1,
    createdAt: "",
    updatedAt: "",
    title: "",
    slug: "",
    content: "",
    prev: {
      id: "",
      createdAt: "",
      title: "",
      uri: ""
    },
    next: {
      id: "",
      createdAt: "",
      title: "",
      uri: ""
    },
  };
  const pending = !res.data;
  const rejected = !!res.error;

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
      pending={pending}
      rejected={rejected}
      statusCode={-1}
      update={() => {}}
      del={() => {}} />
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

const parsePathToBlogArticleDetailRequest = (asPath: string): BlogArticlePathDto => {
  const split = asPath.split("/");
  return {
    year: split[2],
    month: split[3],
    day: split[4],
    slug: decodeURIComponent(split[5]),
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // https://nodejs.org/api/http.html#messageurl
  const {pathname} = new URL(context.resolvedUrl || "", `https://${context.req.headers.host}`);
  const dailyRequest = parsePathToBlogArticleDetailRequest(pathname);

  const props: BlogArticleDetailResponseDto = await blogArticleApi.find(dailyRequest);
  const key = getApiKey(dailyRequest.slug);

  return {
    props: {
      fallback: {
        [key]: props
      }
    }
  };
};

export default BlogDetailPageWrapper;

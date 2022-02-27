import * as React from "react";
import {blogArticleApi, BlogArticleDetailResponseDto, BlogArticlePathDto} from "src/blog/api";
import {BlogArticleForm} from "src/blog/presentation/components/templates";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import useSWR, {SWRConfig} from "swr";
import {useRouter} from "next/router";

const getApiKey = (slug: string) => `@blog/${slug}`;

interface Props {
  fallback: {[x: string]: BlogArticleDetailResponseDto}
}

const parsePathToPathDto = (asPath: string): BlogArticlePathDto => {
  const splitted = asPath.split("/");
  return {
    year: splitted[3],
    month: splitted[4],
    day: splitted[5],
    slug: splitted[6],
  };
};

const BlogUpdatePage = () => {
  const router = useRouter();
  const blogRequest = parsePathToPathDto(router.asPath);

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

  return <div>
    <BlogArticleForm
      onSubmit={() => Promise.resolve()}
      isUpdating={true}
      initialValues={blogDetail}
      pending={pending}
      rejected={rejected}
    />
  </div>;
};

const BlogUpdatePageWrapper = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SWRConfig value={{fallback: props.fallback}}>
    <BlogUpdatePage />
  </SWRConfig>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // https://nodejs.org/api/http.html#messageurl
  const {pathname} = new URL(context.resolvedUrl || "", `https://${context.req.headers.host}`);
  const dailyRequest = parsePathToPathDto(pathname);

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

export default BlogUpdatePageWrapper;

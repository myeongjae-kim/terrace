import * as React from "react";
import {dailyApi, DailyDetailResponseDto, DailyPathDto} from "src/daily/api";
import {DailyForm} from "src/daily/presentation/components/templates";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import useSWR, {SWRConfig} from "swr";
import {useRouter} from "next/router";

const getApiKey = (slug: string) => `@daily/${slug}`;

interface Props {
  fallback: {[x: string]: DailyDetailResponseDto}
}

const parsePathToPathDto = (asPath: string): DailyPathDto => {
  const splitted = asPath.split("/");
  return {
    year: splitted[3],
    month: splitted[4],
    day: splitted[5],
    slug: splitted[6],
  };
};

const DailyUpdatePage = () => {
  const router = useRouter();
  const dailyRequest = parsePathToPathDto(router.asPath);

  const res = useSWR<DailyDetailResponseDto>(getApiKey(dailyRequest.slug), () => dailyApi.find(dailyRequest));
  const dailyDetail = res.data || {
    id: "",
    seq: -1,
    createdAt: "",
    updatedAt: "",
    title: "",
    slug: "",
    content: ""
  };
  const pending = !res.data;
  const rejected = !!res.error;

  return <div>
    <DailyForm
      onSubmit={() => Promise.resolve()}
      isUpdating={true}
      initialValues={dailyDetail}
      pending={pending}
      rejected={rejected}
    />
  </div>;
};

const DailyUpdatePageWrapper = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SWRConfig value={{fallback: props.fallback}}>
    <DailyUpdatePage />
  </SWRConfig>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // https://nodejs.org/api/http.html#messageurl
  const {pathname} = new URL(context.resolvedUrl || "", `https://${context.req.headers.host}`);
  const dailyRequest = parsePathToPathDto(pathname);

  const props: DailyDetailResponseDto = await dailyApi.find(dailyRequest);
  const key = getApiKey(dailyRequest.slug);

  return {
    props: {
      fallback: {
        [key]: props
      }
    }
  };
};

export default DailyUpdatePageWrapper;

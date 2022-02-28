import * as React from "react";
import {DailyForm} from "src/daily/view/presentation/components/templates";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import useSWR, {SWRConfig} from "swr";
import {useRouter} from "next/router";
import {DailyDetailResponse, defaultDailyDetailResponseDto} from "src/daily/domain/DailyDetailResponse";
import {applicationContext} from "src/config/ApplicationContext";

const {getBySlug} = applicationContext.getDailyUseCase;

const getApiKey = (slug: string) => `@daily/${slug}`;

interface Props {
  fallback: {[x: string]: DailyDetailResponse}
}

const getSlug = (asPath: string): string => {
  const splitted = asPath.split("/");
  return splitted[6];
};

const DailyUpdatePage = () => {
  const router = useRouter();
  const slugFromPath = getSlug(router.asPath);

  const res = useSWR<DailyDetailResponse>(getApiKey(slugFromPath), () => getBySlug(slugFromPath));
  const dailyDetail = res.data || defaultDailyDetailResponseDto;

  return <div>
    <DailyForm
      onSubmit={() => Promise.resolve()}
      isUpdating={true}
      initialValues={dailyDetail}
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
  const slugFromPath = getSlug(pathname);

  const props: DailyDetailResponse = await getBySlug(slugFromPath);
  const key = getApiKey(slugFromPath);

  return {
    props: {
      fallback: {
        [key]: props
      }
    }
  };
};

export default DailyUpdatePageWrapper;

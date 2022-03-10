import {useTheme} from "@mui/material";
import * as React from "react";
import {HeadTitle} from "src/common/view/presentation/components/molecules";
import {Comment} from "src/common/view/presentation/components/organisms";
import DailyDetail from "src/daily/view/presentation/components/templates/DailyDetail";
import {formatDateTime} from "src/util";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import useSWR, {SWRConfig} from "swr";
import {useRouter} from "next/router";
import {DailyDetailResponse, defaultDailyDetailResponseDto} from "src/daily/domain/DailyDetailResponse";
import {container, USE_CASES} from "src/config/inversify";
import {DailyGetUseCase} from "src/daily/application/port/incoming/DailyGetUseCase";

const {getBySlug} = container.get<DailyGetUseCase>(USE_CASES.DailyGetUseCase);

const getApiKey = (slug: string) => `@daily/${slug}`;

interface Props {
  fallback: {[x: string]: DailyDetailResponse}
}

const DailyDetailPage = () => {
  const router = useRouter();
  const slugFromPath = getSlug(router.asPath);

  const res = useSWR<DailyDetailResponse>(getApiKey(slugFromPath), () => getBySlug(slugFromPath));
  const dailyDetail = res.data || defaultDailyDetailResponseDto;

  const { createdAt, slug } = dailyDetail;
  const subPath = `${formatDateTime(createdAt, "/YYYY/MM/DD")}/${slug}`;

  const theme = useTheme();
  return <div>
    <HeadTitle title="Daily" />
    <DailyDetail daily={dailyDetail} />
    <Comment identifier={`daily${subPath}`} />
    <style jsx global>{`
#comment-container {
  max-width: ${theme.spacing(62.5)};
}
    `}</style>
  </div>;
};

const DailyDetailPageWrapper = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SWRConfig value={{fallback: props.fallback}}>
    <DailyDetailPage />
  </SWRConfig>;
};

const getSlug = (asPath: string): string => {
  const splitted = asPath.split("/");
  return decodeURIComponent(splitted[5]);
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

export default DailyDetailPageWrapper;

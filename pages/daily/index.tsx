import * as React from "react";
import {HeadTitle, PageTitle} from "src/common/view/presentation/components/molecules";
import DailyList from "src/daily/view/presentation/components/templates/DailyList";
import {pageContainerStyle} from "src/common/view/presentation/styles/pageContainerStyle";
import MyPagination from "src/common/view/presentation/components/organisms/MyPagination";
import {pageDefault} from "src/common/domain/Page";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Response} from "src/common/domain/Response";
import useSWR, {SWRConfig} from "swr";
import {useRouter} from "next/router";
import {DailyListProps} from "src/daily/view/presentation/components/templates/DailyList/DailyList";
import {DailyListResponse} from "src/daily/domain/DailyListResponse";
import {container} from "src/config/inversify";
import {DailyFindAllUseCase} from "src/daily/application/port/incoming/DailyFindAllUseCase";
import {DailyFindAllUseCaseId} from "src/daily/adapter/inversify";

const {findAll} = container.get<DailyFindAllUseCase>(DailyFindAllUseCaseId);

interface Props {
  fallback: {[x: string]: Response<DailyListResponse>}
}

const getApiKey = (page: number) => `@dailyList/PAGE_${page}`;

const DailyListPage = () => {
  const router = useRouter();
  const pageNumber = parseInt("" + router.query["page"]) || 1;

  const res = useSWR<Response<DailyListResponse>>(getApiKey(pageNumber), () => findAll(pageNumber));

  const listProps: DailyListProps = {
    dailys: res.data?.data || [],
  };
  const pagination = res.data?.meta.pagination || pageDefault;

  return <div style={pageContainerStyle}>
    <div style={pageContainerStyle}>
      <HeadTitle title="Daily" />
      <PageTitle title="daily" />
      <DailyList {...listProps} />
      <div /> {/* Loading 컴포넌트를 가운데로 맞추기 위한 empty div */}
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
      <div>
        <MyPagination pagination={pagination} />
      </div>
    </div>
  </div>;
};

const DailyListPageWrapper = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SWRConfig value={{fallback: props.fallback}}>
    <DailyListPage />
  </SWRConfig>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const {query} = context;
  const page = parseInt("" + query["page"]) || 1;

  const props: Response<DailyListResponse> = await findAll(page);
  const key = getApiKey(page);

  return {
    props: {
      fallback: {
        [key]: props
      }
    }
  };
};

export default DailyListPageWrapper;

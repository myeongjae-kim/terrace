import * as React from "react";
import {HeadTitle, PageTitle} from "src/common/presentation/components/molecules";
import Musings from "src/musings/presentation/components/templates/Musings";
import {MusingsProps} from "src/musings/presentation/components/templates/Musings/Musings";
import {pageContainerStyle} from "../../src/common/styles/pageContainerStyle";
import {useTheme} from "@material-ui/core";
import {MusingResponseDto, musingsFetcher} from "../../src/musings/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import useSWR, {SWRConfig} from "swr";

interface Props {
  fallback: {[x: string]: MusingResponseDto[]}
}

const getApiKey = () => "@musings";

const MusingsPage = () => {
  const theme = useTheme();

  const res = useSWR<MusingResponseDto[]>(getApiKey(), () => musingsFetcher.findAll());

  const musingsProps: MusingsProps = {
    musings: res.data || [],
    pending: !res.data,
    rejected: !!res.error
  };

  return <div style={pageContainerStyle}>
    <HeadTitle title="Musings" />
    <PageTitle title="quotes" />
    <Musings {...musingsProps} />
    <div style={{padding: `${theme.spacing(1.5)}px 0`}}/> {/* Loading 컴포넌트를 가운데로 맞추기 위한 empty div */}
  </div>;
};

const MusingsPageWrapper = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SWRConfig value={{fallback: props.fallback}}>
    <MusingsPage />
  </SWRConfig>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const props: MusingResponseDto[] = await musingsFetcher.findAll();

  const key = getApiKey();

  return {
    props: {
      fallback: {
        [key]: props
      }
    }
  };
};

export default MusingsPageWrapper;

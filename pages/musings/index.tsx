import * as React from "react";
import {HeadTitle, PageTitle} from "src/common/view/presentation/components/molecules";
import Musings from "src/musing/view/presentation/components/templates/Musings";
import {MusingsProps} from "src/musing/view/presentation/components/templates/Musings/Musings";
import {pageContainerStyle} from "src/common/view/presentation/styles/pageContainerStyle";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import useSWR, {SWRConfig} from "swr";
import {MusingResponseDto} from "src/musing/domain";
import {useTheme} from "@mui/material";
import {container, USE_CASES} from "src/config/inversify";
import {MusingFindAllUseCase} from "src/musing/application/port/incoming/MusingFindAllUseCase";

const findAll = () => container.get<MusingFindAllUseCase>(USE_CASES.MusingFindAllUseCase).findAll().then(it => it.data);

interface Props {
  fallback: {[x: string]: MusingResponseDto[]}
}

const getApiKey = () => "@musings";

const MusingsPage = () => {
  const theme = useTheme();

  const res = useSWR<MusingResponseDto[]>(getApiKey(), () => findAll());

  const musingsProps: MusingsProps = {
    musings: res.data || [],
  };

  return <div style={pageContainerStyle}>
    <HeadTitle title="Musings" />
    <PageTitle title="quotes" />
    <Musings {...musingsProps} />
    <div style={{padding: `${theme.spacing(1.5)} 0`}}/> {/* Loading 컴포넌트를 가운데로 맞추기 위한 empty div */}
  </div>;
};

const MusingsPageWrapper = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SWRConfig value={{fallback: props.fallback}}>
    <MusingsPage />
  </SWRConfig>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const props: MusingResponseDto[] = await findAll();

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

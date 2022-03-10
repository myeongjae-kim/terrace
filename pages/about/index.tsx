import * as React from "react";
import AboutComponent from "src/about/view/presentation/components/templates/About";
import {HeadTitle} from "src/common/view/presentation/components/molecules";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {About} from "src/about/domain/About";
import {container} from "src/config/inversify";
import {AboutGetUseCase} from "src/about/application/port/incoming/AboutGetUseCase";
import {AboutGetUseCaseId} from "src/about/adapter/inversify";

interface Props {
  about: About
}

const AboutPage = ({about}: InferGetStaticPropsType<typeof getStaticProps>) => <div>
  <HeadTitle title="About" />
  <AboutComponent about={about} />
</div>;


export const getStaticProps: GetStaticProps<Props> = async () => {
  const about = await container.get<AboutGetUseCase>(AboutGetUseCaseId).get();

  return {
    props: {
      about
    }
  };
};

export default AboutPage;

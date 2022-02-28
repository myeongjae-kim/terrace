import * as React from "react";
import AboutComponent from "src/about/view/presentation/components/templates/About";
import {HeadTitle} from "src/view/common/presentation/components/molecules";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {About} from "src/about/domain/About";
import {applicationContext} from "src/config/ApplicationContext";

interface Props {
  about: About
}

const AboutPage = ({about}: InferGetStaticPropsType<typeof getStaticProps>) => <div>
  <HeadTitle title="About" />
  <AboutComponent about={about} />
</div>;


export const getStaticProps: GetStaticProps<Props> = async () => {
  const about = await applicationContext.getAboutUseCase.get();

  return {
    props: {
      about
    }
  };
};

export default AboutPage;

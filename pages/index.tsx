import React from "react";
import AboutPage from "./about";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {diContainer} from "../src/config/DiContainer";
import {About} from "../src/about/domain/About";

interface Props {
  about: About
}

const MainPage = ({about}: InferGetStaticPropsType<typeof getStaticProps>) => <AboutPage about={about} />;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const about = await diContainer.getAboutUseCase.get();

  return {
    props: {
      about
    }
  };
};

export default MainPage;

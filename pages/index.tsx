import React from "react";
import AboutPage from "./about";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {applicationContext} from "../src/config/ApplicationContext";
import {About} from "../src/about/domain/About";

interface Props {
  about: About
}

const MainPage = ({about}: InferGetStaticPropsType<typeof getStaticProps>) => <AboutPage about={about} />;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const about = await applicationContext.aboutGetUseCase.get();

  return {
    props: {
      about
    }
  };
};

export default MainPage;

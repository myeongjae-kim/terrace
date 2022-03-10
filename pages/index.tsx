import React from "react";
import AboutPage from "./about";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {About} from "../src/about/domain/About";
import {container} from "src/config/inversify";
import {AboutGetUseCase} from "src/about/application/port/incoming/AboutGetUseCase";
import {AboutGetUseCaseId} from "src/about/adapter/inversify";

interface Props {
  about: About
}

const MainPage = ({about}: InferGetStaticPropsType<typeof getStaticProps>) => <AboutPage about={about} />;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const about = await container.get<AboutGetUseCase>(AboutGetUseCaseId).get();

  return {
    props: {
      about
    }
  };
};

export default MainPage;

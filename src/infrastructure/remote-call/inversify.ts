import {Container} from "inversify";
import {axiosRequestConfig} from "./axiosRequestConfig";
import Axios from "axios";

const TYPES = {
  AxiosId: Symbol.for("Axios")
};

export const bind = (container: Container) => {
  container.bind(AxiosId).toConstantValue(Axios.create(axiosRequestConfig));
};

export const { AxiosId } = TYPES;

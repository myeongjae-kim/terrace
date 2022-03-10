import {Container} from "inversify";
import {myAxiosRequestConfig} from "./myAxiosRequestConfig";
import Axios from "axios";

const TYPES = {
  AxiosId: Symbol.for("Axios")
};

export const bind = (container: Container) => {
  container.bind(AxiosId).toConstantValue(Axios.create(myAxiosRequestConfig));
};

export const { AxiosId } = TYPES;

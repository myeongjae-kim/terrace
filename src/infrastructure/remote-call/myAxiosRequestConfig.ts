import {AxiosRequestConfig} from "axios";
import {API_HOST} from "../../common/constants/Constants";

export const myAxiosRequestConfig: AxiosRequestConfig = {
  baseURL: API_HOST,
  headers: {
    "Authorization": "Bearer " +
      `5f5da4885cc60c4007a770e20bcb499584306df76f7024786943770d87d10ec647588ed508a328726c03144cecb04e65377865e992cf557c9
398f280355f1b5d66816bd18b466c4c973d90a93c5a04b3635a518688b2e49c468eca9c92bf0098dc6851481cd51bc9d60b33c4b7c65e81885b6dd53
990b7e0397451b59cd000e6`.replace(/\n/g, "")
  }
};

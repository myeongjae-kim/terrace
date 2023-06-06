import {Container} from "inversify";
import {axiosRequestConfig} from "./axiosRequestConfig";
import Axios from "axios";
import { createClient } from "@supabase/supabase-js";


const TYPES = {
  AxiosId: Symbol.for("Axios"),
  SupabaseId: Symbol.for("Supabase")
};

const supabase = createClient("https://api.myeongjae.kim", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg1OTc3MjAwLAogICAgImV4cCI6IDE4NDM4MzAwMDAKfQ.PZ7wIeLCIOnTS9hDoeXuxT-EzXn4aO4f_6h5s91eg_g");

export const bind = (container: Container) => {
  container.bind(AxiosId).toConstantValue(Axios.create(axiosRequestConfig));
  container.bind(SupabaseId).toConstantValue(supabase);
};

export const { AxiosId, SupabaseId } = TYPES;

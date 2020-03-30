import Axios from "axios";
import { API_HOST, Endpoints } from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { MeResponse } from "./dto/MeResponse";

export const authApi = {
  signIn: (request: { email: string; password: string }): Promise<void> => new Promise((resolve, reject) => {
    Axios.post<void>(`${API_HOST}${Endpoints.auth}/api/sign-in`, request)
      .then(() => resolve())
      .catch(e => reject(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),
  signOut: (): Promise<void> => new Promise((resolve, reject) => {
    Axios.post<void>(`${API_HOST}${Endpoints.auth}/api/sign-out`)
      .then(() => resolve())
      .catch(e => reject(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),
  me: (): Promise<MeResponse> => new Promise((resolve, reject) => {
    Axios.post<MeResponse>(`${API_HOST}${Endpoints.auth}/api/token`)
      .then(({ data }) => resolve(data))
      .catch(e => reject(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  })
};
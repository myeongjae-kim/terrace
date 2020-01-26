import Axios from "axios";
import { API_HOST, Endpoints } from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";

export const authApi = {
  signIn: (request: { email: string, password: string }): Promise<void> => new Promise((resolve, reject) => {
    Axios.post<void>(`${API_HOST}${Endpoints.auth}/api/sign-in`, request)
      .then(() => resolve())
      .catch(e => reject(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  })
}
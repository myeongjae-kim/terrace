import RepositoryError, { RepositoryErrorData } from "src/view/common/domain/model/RepositoryError";
import CommonErrorService from "src/view/common/domain/service/CommonErrorService";

class CommonErrorServiceImpl implements CommonErrorService {
  public createRepositoryErrorFrom(e?: RepositoryErrorData): RepositoryError {
    return RepositoryError.of(e);
  }
}

export default new CommonErrorServiceImpl();

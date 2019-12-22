import RepositoryError, { RepositoryErrorData } from "../model/RepositoryError";

export default interface CommonErrorService {
  createRepositoryErrorFrom(e?: RepositoryErrorData): RepositoryError
}
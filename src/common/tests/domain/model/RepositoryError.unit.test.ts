import RepositoryError from "src/common/domain/model/RepositoryError";
import createAxiosErrorWithData from "src/util/test/createAxiosErrorWithData";

export const getRepositoryErrorFixture = () => {
  return RepositoryError.of(createAxiosErrorWithData({
    timestamp: new Date().toISOString(),
    error: "Server Internal Error",
    status: 500,
    message: "An internal error has been occurred",
  }))
}

describe("RepositoryError test", () => {
  test("RepositoryError_NoInput_DefaultObject", () => {
    const repositoryError = RepositoryError.of();

    expect(repositoryError.timestamp).toBeTruthy();
    expect(repositoryError.status).toBe(-1);
    expect(repositoryError.error).toBe("Unknown error.");
    expect(repositoryError.message).toBe("Unknown message.");
  })

  test("RepositoryError_ValidInput_ValidOutput", () => {
    const timestamp = new Date().toISOString();
    const error = "Server Internal Error";
    const status = 500;
    const message = "An internal error has been occurred";

    const repositoryError = RepositoryError.of(createAxiosErrorWithData({
      timestamp,
      error,
      status,
      message
    }))

    expect(repositoryError.timestamp).toBe(timestamp);
    expect(repositoryError.error).toBe(error);
    expect(repositoryError.status).toBe(status);
    expect(repositoryError.message).toBe(message);
  })
})
type Method = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";

export class RequestMatcher {
  private path: RegExp;
  private method: Method;

  public constructor(method: Method, path: string) {
    this.method = method;
    this.path = new RegExp(path);
  }

  public match = (req: { method: string, path: string }): boolean =>
    this.method === req.method && this.path.test(req.path)
}
export class UnauthorizedException extends Error {
  public constructor() {
    super("Unauthorized");
  }
}
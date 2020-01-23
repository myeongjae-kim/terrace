import { interfaces } from "inversify-express-utils";

export class Principal implements interfaces.Principal {
  public static withDetails = (details: string): Principal => new Principal(details);
  public static empty = (): Principal => new Principal("");

  public details: string;
  private constructor(details: string) {
    this.details = details;
  }
  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.details);
  }
  public isResourceOwner(_: any): Promise<boolean> {
    return Promise.resolve(!!this.details);
  }
  public isInRole(_: string): Promise<boolean> {
    return Promise.resolve(!!this.details);
  }
}
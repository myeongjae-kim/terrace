import express from "express";
import { injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import Optional from "optional-js";
import { Endpoints } from "src/common/constants/Constants";
import { UnauthorizedException } from "../exceptions";
import { AccessFilter } from "./AccessFilter";
import { RequestMatcher } from "./RequestMatcher";

@injectable()
export class AccessFilterImpl implements AccessFilter {

  private readonly protectedRequests: RequestMatcher[] = [
    new RequestMatcher("POST", `^${Endpoints.blog}/api$`),
    new RequestMatcher("PUT", `^${Endpoints.blog}/api/\\d+/\\d+/\\d+/.+$`),
    new RequestMatcher("DELETE", `^${Endpoints.blog}/api/\\d+/\\d+/\\d+/.+$`),
    new RequestMatcher("PATCH", `^${Endpoints.blog}/api/\\d+/\\d+/\\d+/publish$`),
    new RequestMatcher("PATCH", `^${Endpoints.blog}/api/\\d+/\\d+/\\d+/unpublish$`),
  ];

  public filter = async (req: express.Request, principal?: interfaces.Principal): Promise<void> => {
    // TODO: Block all paths and allow some according to roles.

    const authenticated = Optional.ofNullable(principal)
      .map(p => p.isAuthenticated())
      .orElse(Promise.resolve(false));

    if (await authenticated) {
      return;
    }

    this.protectedRequests.forEach(p => {
      if (p.match(req)) {
        throw new UnauthorizedException();
      }
    });
  };
}
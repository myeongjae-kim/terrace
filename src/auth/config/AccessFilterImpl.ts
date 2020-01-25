import express from 'express';
import { injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils'
import Optional from 'optional-js';
import { Endpoints } from "src/common/constants/Constants";
import { UnauthorizedException } from "../exceptions";
import { AccessFilter } from "./AccessFilter";

interface RequestSummary {
  method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH"
  path: string
}

@injectable()
export class AccessFilterImpl implements AccessFilter {

  private readonly protectedRequests: RequestSummary[] = [{
    method: "GET",
    path: `${Endpoints.blog}/api`
  }]

  public filter = async (req: express.Request, principal?: interfaces.Principal): Promise<void> => {
    const authenticated = Optional.ofNullable(principal)
      .map(p => p.isAuthenticated())
      .orElse(Promise.resolve(false));

    if (await authenticated) {
      return;
    }

    this.protectedRequests.forEach(p => {
      if (req.method === p.method && req.path === p.path) {
        throw new UnauthorizedException();
      }
    })
  }
}
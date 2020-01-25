import express from 'express';
import { inject, injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import Optional from 'optional-js';
import { TYPES } from "server/common/inversify/types";
import { JWT_COOKIE_KEY } from 'src/common/constants/Constants';
import { Principal } from "../domain/model";
import { AuthService } from "../domain/service";
import { AccessFilter } from './AccessFilter';

@injectable()
export class AuthProviderImpl implements interfaces.AuthProvider {
  @inject(TYPES.AuthService) private readonly authService!: AuthService;
  @inject(TYPES.AccessFilter) private readonly accessFilter!: AccessFilter;

  public getUser = async (
    req: express.Request,
    _: express.Response,
    next: express.NextFunction
  ): Promise<interfaces.Principal> => {
    const token = Optional.of(req)
      .map(r => r.headers)
      .map(h => h.cookie)
      .map(cookies => cookies.split(";"))
      .map(cookies => cookies
        .map(c => c.trim())
        .filter(c => c.startsWith(JWT_COOKIE_KEY)))
      .map(cookies => cookies[0])
      .map(c => c.replace(JWT_COOKIE_KEY + "=", ""))
      .orElse("");

    let principal: interfaces.Principal = Principal.empty();

    if (token) {
      principal = (await this.authService.getEmailFrom(token)
        .then(email => Principal.withDetails(email))
        .catch(next)) as unknown as interfaces.Principal;
    }

    await this.accessFilter.filter(req, principal)
      .catch(next);

    return principal;
  }
}
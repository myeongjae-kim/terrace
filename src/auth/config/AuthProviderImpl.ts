import express from 'express';
import { inject, injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { TYPES } from "server/common/inversify/types";
import { JWT_COOKIE_KEY } from 'src/common/constants/Constants';
import { parseCookie } from 'src/util/parseCookie';
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
    const token = parseCookie(req.headers.cookie).get(JWT_COOKIE_KEY) || "";

    let principal: interfaces.Principal = Principal.empty();

    if (token) {
      principal = (await this.authService.checkToken(token)
        .then(origin => Principal.withDetails(origin.email))
        .catch(next)) as unknown as interfaces.Principal;
    }

    await this.accessFilter.filter(req, principal)
      .catch(next);

    return principal;
  }
}
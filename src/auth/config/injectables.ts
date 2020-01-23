// tslint:disable-next-line

import bcrypt from "bcryptjs";
import * as express from 'express';
import { inject, injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { TYPES } from "server/common/inversify/types";
import { Endpoints } from "src/common/constants/Constants";
import { Principal } from "../domain/model";
import { AuthService } from "../domain/service";
import { UnauthorizedException } from "../exceptions";

export interface PasswordEncoder {
  encode(input: string): Promise<string>
  match(actual: string, encoded: string): Promise<boolean>
}

@injectable()
export class BCryptPasswordEncoder implements PasswordEncoder {

  public encode = (input: string): Promise<string> => {
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(input, salt));
  }

  public match = (actual: string, encoded: string): Promise<boolean> => {
    return bcrypt.compare(actual, encoded);
  }
}

// tslint:disable-next-line: max-classes-per-file
@injectable()
export class AuthProviderImpl implements interfaces.AuthProvider {
  @inject(TYPES.AuthService) private readonly authService!: AuthService;

  public getUser = async (
    req: express.Request,
    _: express.Response,
    next: express.NextFunction
  ): Promise<interfaces.Principal> => {
    const token = req.headers.authorization?.toString();

    let principal: Principal = Principal.empty();

    if (token) {
      principal = (await this.authService.getEmailFrom(token)
        .then(email => Principal.withDetails(email))
        .catch(next)) as unknown as interfaces.Principal;
    }

    await this.protectPaths(req, principal)
      .catch(next);

    return principal;
  }

  // TODO: make filter class.
  private protectPaths = async (req: express.Request, principal: Principal): Promise<void> => {
    const authenticated = await principal.isAuthenticated();
    if (authenticated) {
      return;
    }

    const protectedPaths: Array<{
      method: string,
      path: string
    }> = [{
      method: "GET",
      path: `${Endpoints.blog}/api`
    }]

    protectedPaths.forEach(p => {
      if (req.method === p.method && req.path === p.path) {
        throw new UnauthorizedException();
      }
    })
  }
}
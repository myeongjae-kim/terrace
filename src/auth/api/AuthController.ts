import assert from 'assert-plus';
import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, requestBody, requestHeaders, response } from "inversify-express-utils";
import { TYPES } from 'server/common/inversify/types';
import { Endpoints, JWT_COOKIE_DOMAIN, JWT_COOKIE_KEY, JWT_COOKIE_SECURE, JWT_MAX_AGE } from "src/common/constants/Constants";
import { parseCookie } from 'src/util/parseCookie';
import { AuthService } from '../domain/service';
import { SignInRequestDto } from "./dto/SignInRequestDto";

const PATH = Endpoints.auth;

@controller(PATH)
export class AuthController implements interfaces.Controller {

  public constructor(
    @inject(TYPES.AuthService) private authService: AuthService,
  ) { }

  @httpPost("/sign-in")
  public signIn(@requestBody() signInRequestDto: SignInRequestDto, @response() res: Response) {
    assert.bool(!!signInRequestDto, "signInRequestDto must not be undefined.");
    assert.bool(!!signInRequestDto.email, "signInRequestDto.email must not be empty.");
    assert.bool(!!signInRequestDto.password, "signInRequestDto.password must not be empty.");

    return this.authService.signIn(signInRequestDto)
      .then(token => {
        res.cookie(JWT_COOKIE_KEY, token, {
          maxAge: Number(JWT_MAX_AGE) || 0,
          httpOnly: true,
          domain: JWT_COOKIE_DOMAIN,
          secure: JWT_COOKIE_SECURE,
          sameSite: 'lax'
        })
      });
  }

  @httpPost("/token")
  public checkToken(@requestHeaders("cookie") cookie: string) {
    const token = parseCookie(cookie).get(JWT_COOKIE_KEY) || "";

    return this.authService.checkToken(token);
  }
}
import assert from 'assert-plus';
import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, requestBody, response } from "inversify-express-utils";
import { TYPES } from 'server/common/inversify/types';
import { Endpoints, JWT_MAX_AGE } from "src/common/constants/Constants";
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

    return this.authService.login(signInRequestDto)
      .then(token => {
        res.cookie('myeongjae-kim-auth', token, {
          maxAge: Number(JWT_MAX_AGE) || 0,
          httpOnly: true,
          domain: ".myeongjae.kim",
          secure: true,
          sameSite: 'lax'
        })
      });
  }
}
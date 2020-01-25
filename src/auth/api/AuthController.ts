import assert from 'assert-plus';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, requestBody } from "inversify-express-utils";
import { TYPES } from 'server/common/inversify/types';
import { Endpoints } from "src/common/constants/Constants";
import { AuthService } from '../domain/service';
import { SignInRequestDto } from "./dto/SignInRequestDto";

const PATH = Endpoints.auth;

@controller(PATH)
export class AuthController implements interfaces.Controller {

  public constructor(
    @inject(TYPES.AuthService) private authService: AuthService,
  ) { }

  @httpPost("/sign-in")
  public signIn(@requestBody() signInRequestDto: SignInRequestDto) {
    assert.bool(!!signInRequestDto, "signInRequestDto must not be undefined.");
    assert.bool(!!signInRequestDto.email, "signInRequestDto.email must not be empty.");
    assert.bool(!!signInRequestDto.password, "signInRequestDto.password must not be empty.");

    return this.authService.login(signInRequestDto);
  }
}
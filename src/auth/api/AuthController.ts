import assert from 'assert-plus';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, requestBody } from "inversify-express-utils";
import { TYPES } from 'server/common/inversify/types';
import { Endpoints } from "src/common/constants/Constants";
import { AuthService } from '../domain/service';
import { LoginRequestDto } from "./dto/LoginRequestDto";

const PATH = Endpoints.login;

@controller(PATH)
export class AuthController implements interfaces.Controller {

  public constructor(
    @inject(TYPES.AuthService) private authService: AuthService,
  ) { }

  @httpPost("/")
  public login(@requestBody() loginRequestDto: LoginRequestDto) {
    assert.bool(!!loginRequestDto, "loginRequestDto must not be undefined.");
    assert.bool(!!loginRequestDto.email, "loginRequestDto.email must not be empty.");
    assert.bool(!!loginRequestDto.password, "loginRequestDto.password must not be empty.");

    return this.authService.login(loginRequestDto);
  }
}
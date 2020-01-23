import { inject, injectable } from "inversify";
import { TYPES } from "server/common/inversify/types";
import { PasswordEncoder } from "src/auth/config/injectables";
import { UnauthorizedException } from "src/auth/exceptions";
import { LoginRequestDto } from "../../api/dto/LoginRequestDto";
import { LoginResponseDto } from "../../api/dto/LoginResponseDto";
import { UserRepository } from "../model";
import { AuthService } from "./AuthService";

@injectable()
export class AuthServiceImpl implements AuthService {

  public constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.PasswordEncoder) private passwordEncoder: PasswordEncoder,
  ) { }

  public login = async (loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> => {
    const user = (await this.userRepository
      .findByEmail(loginRequestDto.email))
      .orElseThrow(() => new UnauthorizedException());

    const matched = await this.passwordEncoder.match(loginRequestDto.password, user.password);

    if (!matched) {
      throw new UnauthorizedException();
    }

    return { token: JSON.stringify(user) };
  }
}
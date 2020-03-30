import { inject, injectable } from "inversify";
import { TYPES } from "server/common/inversify/types";
import { PasswordEncoder } from "src/auth/config/PasswordEncoder";
import { UnauthorizedException } from "src/auth/exceptions";
import { SignInRequestDto } from "../../api/dto/SignInRequestDto";
import { User, UserRepository } from "../model";
import { AuthService } from "./AuthService";
import { TokenService } from "./TokenService";

@injectable()
export class AuthServiceImpl implements AuthService {

  public constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.PasswordEncoder) private passwordEncoder: PasswordEncoder,
    @inject(TYPES.TokenService) private tokenService: TokenService<Pick<User, "email">>,
  ) { }

  public signIn = async (loginRequestDto: SignInRequestDto): Promise<string> => {
    const user = (await this.userRepository
      .findByEmail(loginRequestDto.email))
      .orElseThrow(() => new UnauthorizedException());

    const matched = await this.passwordEncoder.match(loginRequestDto.password, user.password);

    if (!matched) {
      throw new UnauthorizedException();
    }

    return this.tokenService.generate({
      email: user.email
    });
  };

  public checkToken = (token: string): Promise<Pick<User, "email">> => this.tokenService.verify(token);
}
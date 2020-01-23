import { inject, injectable } from "inversify";
import { TYPES } from "server/common/inversify/types";
import { LoginRequestDto } from "../../api/dto/LoginRequestDto";
import { LoginResponseDto } from "../../api/dto/LoginResponseDto";
import { UserRepository } from "../model";
import { AuthService } from "./AuthService";

@injectable()
export class AuthServiceImpl implements AuthService {

  public constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
  ) { }

  public login = (loginRequestDto: LoginRequestDto): LoginResponseDto => {
    const user = this.userRepository.findByEmail(loginRequestDto.email);

    return { token: JSON.stringify(user) };
  }
}
import { SignInRequestDto } from "../../api/dto/SignInRequestDto";
import { User } from "../model";

export interface AuthService {
  signIn(loginRequestDto: SignInRequestDto): Promise<string>
  checkToken(token: string): Promise<Pick<User, "email">>
}
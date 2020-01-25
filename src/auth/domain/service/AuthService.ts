import { SignInRequestDto } from "../../api/dto/SignInRequestDto";

export interface AuthService {
  login(loginRequestDto: SignInRequestDto): Promise<string>
  getEmailFrom(token: string): Promise<string>
}
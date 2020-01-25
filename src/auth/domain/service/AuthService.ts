import { SignInRequestDto } from "../../api/dto/SignInRequestDto";
import { SignInResponseDto } from "../../api/dto/SignInResponseDto";

export interface AuthService {
  login(loginRequestDto: SignInRequestDto): Promise<SignInResponseDto>
  getEmailFrom(token: string): Promise<string>
}
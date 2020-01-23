import { LoginRequestDto } from "../../api/dto/LoginRequestDto";
import { LoginResponseDto } from "../../api/dto/LoginResponseDto";

export interface AuthService {
  login(loginRequestDto: LoginRequestDto): LoginResponseDto
}
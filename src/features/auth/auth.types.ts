import { ApiResponse } from "../shared/shared.types";

export interface Token {
  sub: string;
  exp: number;
  iss: string;
  iat: number;
}

export type LoginResponse = ApiResponse<{
  token: string;
}>;

export type SignupResponse = ApiResponse<{
  email: string;
}>;

export type LogoutResponse = ApiResponse<{
  message: string;
}>;

export type ProfileResponse = ApiResponse<{
  nickname: string;
  loggedIn: boolean;
}>;

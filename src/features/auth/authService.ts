import { getRequest, postRequest } from "../shared/httpRequestService";
import {
  LoginResponse,
  LogoutResponse,
  ProfileResponse,
  SignupResponse,
} from "./auth.types";
import authEndpoints from "./authEndpoints";
import { LoginFormData } from "./components/LoginForm";
import { SignUpFormData } from "./components/SignUpForm";

export async function postLogin({ email, password }: LoginFormData) {
  return postRequest<LoginFormData, LoginResponse>(authEndpoints.login, {
    email,
    password,
  });
}

export async function postSignUp({
  email,
  password,
  nickname,
}: SignUpFormData) {
  return postRequest<SignUpFormData, SignupResponse>(authEndpoints.signup, {
    email,
    password,
    nickname,
  });
}

export async function getOAuth2Login(params: URLSearchParams) {
  return getRequest<LoginResponse>(authEndpoints.google, params);
}

export async function postLogout() {
  return postRequest<void, LogoutResponse>(authEndpoints.logout);
}

export async function getProfile() {
  return getRequest<ProfileResponse>(authEndpoints.profile);
}

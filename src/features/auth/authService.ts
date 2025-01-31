import { getRequest, postRequest } from "../shared/httpRequestService";
import { LoginResponse, LogoutResponse, ProfileResponse } from "./auth.types";
import authEndpoints from "./authEndpoints";
import { LoginFormData } from "./components/LoginForm";

export async function postLogin({ email, password }: LoginFormData) {
  return postRequest<LoginFormData, LoginResponse>(authEndpoints.login, {
    email,
    password,
  });
}

export async function postLogout() {
  return postRequest<void, LogoutResponse>(authEndpoints.logout);
}

export async function getProfile() {
  return getRequest<ProfileResponse>(authEndpoints.profile);
}

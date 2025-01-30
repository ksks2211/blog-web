import type { Endpoints } from "../shared/shared.type";

const authEndpoints: Endpoints = {
  signup: "/api/accounts/signup",
  login: "/api/login/jwt",
  refresh: "/api/login/refresh",
  profile: "/api/accounts/me",
  logout: "/api/logout",
} as const;

export default authEndpoints;

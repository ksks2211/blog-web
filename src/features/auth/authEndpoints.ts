const authEndpoints = {
  signup: "/api/accounts/signup",
  login: "/api/login/jwt",
  refresh: "/api/login/refresh",
  profile: "/api/accounts/me",
  logout: "/api/logout",
  google: "/api/login/oauth2/code/google",
};

export default authEndpoints;

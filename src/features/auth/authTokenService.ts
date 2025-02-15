import { jwtDecode } from "jwt-decode";
import type { Token } from "./auth.types";

const TOKEN_KEY = "jwt_token" as const;

export const setTokenToBrowser = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenFromBrowser = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeTokenFromBrowser = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isValidToken = () => {
  const token = getTokenFromBrowser();
  if (token) {
    try {
      // If you want to check expiration
      const decoded = jwtDecode<Token>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        // Token is expired
        removeTokenFromBrowser();
        return false;
      }

      // Valid Token
      return true;
    } catch (error) {
      console.error(error);
      removeTokenFromBrowser();
      return false;
    }
  }
  return false;
};

export const getUserId = (token: string | null) => {
  if (token === null) return undefined;

  try {
    // If you want to check expiration
    const decoded = jwtDecode<Token>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      // Token is expired
      removeTokenFromBrowser();
      return undefined;
    }
    // Valid Token
    return decoded.sub;
  } catch (error) {
    console.error(error);
    removeTokenFromBrowser();
    return undefined;
  }
};

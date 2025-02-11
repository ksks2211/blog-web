import axios, { isAxiosError } from "axios";
import { getTokenFromBrowser, isValidToken } from "../auth/authTokenService";
import HttpError from "./HttpError";

const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);

    if (isAxiosError(error)) {
      const status = error.status || 400;
      let message = error.message;

      if (error.response?.data.message) {
        message = error.response.data.message;
      }

      throw new HttpError(message, status);
    } else {
      throw new HttpError(
        "Failed to get response from server. Check server or network state",
        400
      );
    }
  }
);

apiClient.interceptors.request.use((request) => {
  if (isValidToken()) {
    const token = getTokenFromBrowser();
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

export default apiClient;

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setIsLoggedIn } from "./authStateSlice";
import {
  isValidToken,
  removeTokenFromBrowser,
  setTokenToBrowser,
} from "./authTokenService";

export const useIsLoggedIn = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authState.isLoggedIn
  );
  return { isLoggedIn };
};

export const useCheckLoginState = () => {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(setIsLoggedIn(isValidToken()));
};

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Save token & change login state
  const login = (token: string) => {
    setTokenToBrowser(token);
    dispatch(setIsLoggedIn(true));
  };

  return { login };
};

export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(setIsLoggedIn(false));
    removeTokenFromBrowser();
  };

  return { logout };
};

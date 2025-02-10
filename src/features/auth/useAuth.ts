import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { LoginResponse, LogoutResponse, ProfileResponse } from "./auth.types";
import { getProfile, postLogin, postLogout } from "./authService";
import { setIsLoggedIn, setNickname } from "./authStateSlice";
import {
  isValidToken,
  removeTokenFromBrowser,
  setTokenToBrowser,
} from "./authTokenService";
import { LoginFormData } from "./components/LoginForm";

export const useIsLoggedIn = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authState.isLoggedIn
  );
  return { isLoggedIn };
};

export const useUserInfo = () => {
  const nickname = useSelector((state: RootState) => state.authState.nickname);
  return { nickname };
};

// Check login state regularly
export const useMonitorLoginState = (min = 5) => {
  const { logout } = useLogout();
  useEffect(() => {
    const timer = setInterval(() => {
      const valid = isValidToken();
      if (!valid) {
        logout();
      }
    }, min * 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, [logout, min]);
};

// Update login-state(client state = login)
export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Save token & change login state
  const login = (token: string) => {
    setTokenToBrowser(token);
    dispatch(setIsLoggedIn(true));
  };

  return { login };
};

// Update login-state(client state = logout)
export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const logout = () => {
    dispatch(setIsLoggedIn(false));
    removeTokenFromBrowser();
  };

  return { logout };
};

export const useChangeNickname = () => {
  const dispatch = useDispatch<AppDispatch>();
  const changeNickname = (nickname: string) => {
    dispatch(setNickname(nickname));
  };
  return { changeNickname };
};

// React-Query Mutation
export const useLoginMutation = ({
  setLoginErrorMessage,
}: {
  setLoginErrorMessage: (msg: string) => void;
}) => {
  const { login } = useLogin();
  const { logout } = useLogout();

  const mutation = useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: postLogin,
    onSuccess: (res) => {
      const { token } = res.data;
      login(token);
    },
    onError: (error) => {
      setLoginErrorMessage(error.message);
      logout();
    },
  });

  return { mutation };
};

export const useLogoutMutation = () => {
  const { logout } = useLogout();

  const mutation = useMutation<LogoutResponse, Error>({
    mutationFn: postLogout,
    onSuccess: logout,
    onError: logout,
  });

  return { mutation };
};

// React-Query Query
export const useProfile = (enabled: boolean) => {
  return useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
    enabled,
  });
};

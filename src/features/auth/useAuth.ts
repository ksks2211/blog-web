import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  LoginResponse,
  LogoutResponse,
  ProfileResponse,
  SignupResponse,
} from "./auth.types";
import {
  getOAuth2Login,
  getProfile,
  postLogin,
  postLogout,
  postSignUp,
} from "./authService";
import { setIsLoggedIn, setNickname, setUserId } from "./authStateSlice";
import {
  getUserId,
  isValidToken,
  removeTokenFromBrowser,
  setTokenToBrowser,
} from "./authTokenService";
import { LoginFormData } from "./components/LoginForm";
import { SignUpFormData } from "./components/SignUpForm";

export const useIsLoggedIn = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authState.isLoggedIn
  );
  return { isLoggedIn };
};

export const useUserId = () => {
  const userId = useSelector((state: RootState) => state.authState.userId);
  return { userId };
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
        alert("Login Session Expired");
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
    const userId = getUserId(token);

    dispatch(setIsLoggedIn(true));
    dispatch(setUserId(userId));
  };

  return { login };
};

// Update login-state(client state = logout)
export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const logout = () => {
    removeTokenFromBrowser();
    dispatch(setIsLoggedIn(false));
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

export const useSignUpMutation = ({
  setLoginErrorMessage,
}: {
  setLoginErrorMessage: (msg: string) => void;
}) => {
  const mutation = useMutation<SignupResponse, Error, SignUpFormData>({
    mutationFn: postSignUp,
    onError: (error) => {
      setLoginErrorMessage(error.message);
    },
    onSuccess: (data) => {
      console.log(data.data);
      return data;
    },
  });

  return { mutation };
};

export const useOAuth2LoginMutation = () => {
  const { login } = useLogin();
  const { logout } = useLogout();

  return useMutation<LoginResponse, Error, URLSearchParams, unknown>({
    retry: false,
    mutationFn: getOAuth2Login,
    onSuccess: (res) => {
      const { token } = res.data;
      login(token);
    },
    onError: logout,
  });
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
    retry: false,
    enabled,
  });
};

import { lazy, memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import GoogleOAuth2 from "../features/auth/components/GoogleOAuth2.tsx";
import {
  useChangeNickname,
  useIsLoggedIn,
  useLogout,
  useProfile,
} from "../features/auth/useAuth.ts";
import {
  useListenScrollY,
  useScrollTopResetByPathname,
} from "../features/scroll/useScroll.ts";
import SuspenseLoader from "../features/shared/components/SuspenseLoader.tsx";
import LoadingPage from "../features/shared/pages/LoadingPage.tsx";

const TestPage = lazy(() => import("./TestPage.tsx"));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage.tsx"));
const PrivateRoutes = lazy(() => import("./PrivateRoutes.tsx"));

const AppRoutesGuard = () => {
  const { isLoggedIn } = useIsLoggedIn();
  const { changeNickname } = useChangeNickname();
  const { logout } = useLogout();
  const {
    data: resBody,
    isLoading,
    isError,
    isSuccess,
  } = useProfile(isLoggedIn);

  if (isSuccess) {
    // Server State & Client State not matching
    if (!resBody.data.loggedIn && isLoggedIn) {
      logout();
    } else {
      const nickname = resBody.data.nickname;
      changeNickname(nickname);
    }
  }

  // Network error or invalid token or server error etc
  if (isError) {
    logout();
  }

  if (isLoading) return <LoadingPage />;

  return <AppRoutes isLoggedIn={isLoggedIn} />;
};

const AppRoutes = memo(({ isLoggedIn }: { isLoggedIn: boolean }) => {
  useListenScrollY();
  useScrollTopResetByPathname();

  return (
    <Routes>
      <Route
        path="/login/oauth2/*"
        element={!isLoggedIn ? <GoogleOAuth2 /> : <Navigate to="/" />}
      />

      <Route
        path="/login"
        element={
          !isLoggedIn ? (
            <SuspenseLoader children={<LoginPage />} />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>

      <Route
        path="/signup"
        element={
          !isLoggedIn ? (
            <SuspenseLoader children={<LoginPage />} />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>

      <Route
        path="/test"
        element={<SuspenseLoader children={<TestPage />} />}
      />

      <Route
        path="*"
        element={
          isLoggedIn ? (
            <SuspenseLoader children={<PrivateRoutes />} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
});

export default AppRoutesGuard;

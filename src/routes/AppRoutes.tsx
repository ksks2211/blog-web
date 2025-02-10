import { memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage.tsx";
import {
  useChangeNickname,
  useIsLoggedIn,
  useLogout,
  useProfile,
} from "../features/auth/useAuth.ts";
import {
  useListenScrollY,
  useScrollTopReset,
} from "../features/scroll/useScroll.ts";
import LoadingPage from "../features/shared/pages/LoadingPage.tsx";
import QueryErrorPage from "../features/shared/pages/QueryErrorPage.tsx";
import PrivateRoutes from "./PrivateRoutes.tsx";
import TestPage from "./TestPage.tsx";

const AppRoutesGuard = () => {
  const { isLoggedIn } = useIsLoggedIn();
  const { changeNickname } = useChangeNickname();
  const { logout } = useLogout();
  const { data: resBody, isLoading, isError } = useProfile(isLoggedIn);

  if (!isLoggedIn) return <AppRoutes isLoggedIn={isLoggedIn} />;
  if (isLoading) return <LoadingPage />;
  if (isError) return <QueryErrorPage />;
  if (resBody === undefined) return <QueryErrorPage />;

  // Client-State(login) Server-State(logout) => Update Client State(both logout)
  if (isLoggedIn && !resBody.data.loggedIn) {
    logout();
  } else {
    const nickname = resBody.data.nickname;
    changeNickname(nickname);
  }

  return <AppRoutes isLoggedIn={isLoggedIn} />;
};

const AppRoutes = memo(({ isLoggedIn }: { isLoggedIn: boolean }) => {
  useListenScrollY();
  useScrollTopReset();

  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
      ></Route>

      <Route
        path="/signup"
        element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
      ></Route>

      <Route path="/test" element={<TestPage />} />

      <Route
        path="*"
        element={isLoggedIn ? <PrivateRoutes /> : <Navigate to="/login" />}
      />
    </Routes>
  );
});

export default AppRoutesGuard;

import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage.tsx";
import SignupPage from "../features/auth/SignupPage.tsx";
import { useIsLoggedIn } from "../features/auth/useAuth.ts";
import {
  useListenScrollY,
  useScrollTopReset,
} from "../features/scroll/useScroll.ts";
import PrivateRoutes from "./PrivateRoutes.tsx";

const AppRoutes = () => {
  useListenScrollY();
  useScrollTopReset();

  const { isLoggedIn } = useIsLoggedIn();

  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
      />

      <Route
        path="/signup"
        element={!isLoggedIn ? <SignupPage /> : <Navigate to="/" />}
      />

      <Route
        path="*"
        element={isLoggedIn ? <PrivateRoutes /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;

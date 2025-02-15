import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useMonitorLoginState } from "../features/auth/useAuth";
import CategoryListPage from "../features/categories/pages/CategoryListPage";
import Layout from "../features/layout/components/Layout";
import PostSearchPage from "../features/posts/pages/PostSearchPage";
import SuspenseLoader from "../features/shared/components/SuspenseLoader";
import TestComponent from "../features/shared/components/TestComponent";
import HomePage from "../features/shared/pages/HomePage";
import NotFoundPage from "../features/shared/pages/NotFoundPage";

const PostRoutes = lazy(() => import("./PostRoutes.tsx"));

const PrivateRoutes = () => {
  useMonitorLoginState();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/test" element={<TestComponent />} />

        <Route
          path="/posts/*"
          element={<SuspenseLoader children={<PostRoutes />} />}
        />

        <Route path="/tags" element={<PostSearchPage />} />

        <Route path="/categories" element={<CategoryListPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PrivateRoutes;

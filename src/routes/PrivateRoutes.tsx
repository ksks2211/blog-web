import { Route, Routes } from "react-router-dom";
import { useMonitorLoginState } from "../features/auth/useAuth";
import CategoryPage from "../features/categories/CategoryPage";
import Layout from "../features/layout/components/Layout";
import PostCreatePage from "../features/posts/PostCreatePage";
import PostListPage from "../features/posts/PostListPage";
import PostMinePage from "../features/posts/PostMinePage";
import PostSearchPage from "../features/posts/PostSearchPage";
import SuspenseLoader from "../features/shared/components/SuspenseLoader";
import TestComponent from "../features/shared/components/TestComponent";
import TestErrorComponent from "../features/shared/components/TestErrorComponent";
import HomePage from "../features/shared/pages/HomePage";
import NotFoundPage from "../features/shared/pages/NotFoundPage";

const PrivateRoutes = () => {
  useMonitorLoginState();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/error" element={<TestErrorComponent />} />
        <Route path="/test" element={<TestComponent />} />

        {/* Posts */}
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/create" element={<PostCreatePage />} />
        <Route path="/posts/mine" element={<PostMinePage />} />
        <Route path="/posts/search" element={<PostSearchPage />} />

        <Route path="/categories" element={<CategoryPage />} />
      </Route>

      <Route
        path="*"
        element={<SuspenseLoader children={<NotFoundPage />} />}
      />
    </Routes>
  );
};

export default PrivateRoutes;

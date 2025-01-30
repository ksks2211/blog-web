import { Route, Routes } from "react-router-dom";
import Layout from "../features/layout/components/Layout";
import SuspenseLoader from "../features/shared/components/SuspenseLoader";
import TestComponent from "../features/shared/components/TestComponent";
import TestErrorComponent from "../features/shared/components/TestErrorComponent";
import HomePage from "../features/shared/pages/HomePage";
import NotFoundPage from "../features/shared/pages/NotFoundPage";

const PrivateRoutes = () => {
  // token 검증하기 =>

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/error" element={<TestErrorComponent />} />
        <Route path="/test" element={<TestComponent />} />
      </Route>

      <Route
        path="*"
        element={<SuspenseLoader children={<NotFoundPage />} />}
      />
    </Routes>
  );
};

export default PrivateRoutes;

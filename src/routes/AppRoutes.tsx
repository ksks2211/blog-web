import { Route, Routes } from "react-router-dom";
import TestComponent from "../components/TestComponent";
import TestErrorComponent from "../components/TestErrorComponent";
import { useListenScrollY } from "../hooks/store/useScrollState";

const AppRoutes = () => {
  useListenScrollY();

  return (
    <Routes>
      <Route path="*" element={<TestComponent />} />
      <Route path="/error" element={<TestErrorComponent />} />
      <Route path="/test" element={<TestComponent />} />
    </Routes>
  );
};

export default AppRoutes;

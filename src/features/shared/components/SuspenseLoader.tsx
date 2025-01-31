import { Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

interface Props {
  children: React.ReactNode;
}

const SuspenseLoader: React.FC<Props> = ({ children }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};

export default SuspenseLoader;

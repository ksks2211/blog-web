import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const SuspenseLoader: React.FC<Props> = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default SuspenseLoader;

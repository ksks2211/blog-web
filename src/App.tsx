import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import FallbackComponent from "./components/FallbackComponent";
import SuspenseLoader from "./components/SuspenseLoader";
import { ModalProvider } from "./contexts/ModalContext";

const AppRoutes = lazy(() => import("./routes/AppRoutes"));

function App() {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <BrowserRouter>
        <ModalProvider>
          <SuspenseLoader children={<AppRoutes />} />
        </ModalProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

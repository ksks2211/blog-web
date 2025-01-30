import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import FallbackComponent from "./features/shared/components/FallbackComponent";
import { ModalProvider } from "./features/shared/contexts/ModalContext";
import AppRoutes from "./routes/AppRoutes";
import store from "./store/store";

function App() {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <BrowserRouter>
        <Provider store={store}>
          <ModalProvider>
            <AppRoutes />
          </ModalProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

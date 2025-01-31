import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import FallbackComponent from "./features/shared/components/FallbackComponent";
import { ModalProvider } from "./features/shared/contexts/ModalContext";

import store from "./app/store";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <BrowserRouter>
          <Provider store={store}>
            <ModalProvider>
              <AppRoutes />
            </ModalProvider>
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

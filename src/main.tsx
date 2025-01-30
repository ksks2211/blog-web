import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SuspenseLoader from "./features/shared/components/SuspenseLoader.tsx";
import "./index.css";

const App = lazy(() => import("./App.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SuspenseLoader children={<App />} />
  </StrictMode>
);

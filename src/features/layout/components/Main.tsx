import { memo } from "react";
import { Outlet } from "react-router-dom";

const Main = memo(() => {
  return (
    <main className="flex-grow flex items-center content-center">
      <Outlet />
    </main>
  );
});

export default Main;

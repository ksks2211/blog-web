import { memo } from "react";
import { Outlet } from "react-router-dom";

const Main = memo(() => {
  return (
    <main className="flex-grow w-full">
      <Outlet />
    </main>
  );
});

export default Main;

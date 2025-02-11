import { memo } from "react";
import { Outlet } from "react-router-dom";

const Main = memo(() => {
  return (
    <main className="flex-grow w-full bg-orange-200">
      <Outlet />
    </main>
  );
});

export default Main;

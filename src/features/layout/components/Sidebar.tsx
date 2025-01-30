import { memo } from "react";

const Sidebar = memo(() => {
  return (
    <aside className="w-64 min-h-full flex-shrink-0 flex-grow-0 flex  bg-sky-500">
      Sidebar
    </aside>
  );
});

export default Sidebar;

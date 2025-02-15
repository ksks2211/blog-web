import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { HTMLAttributes, memo } from "react";

import { useDeviceType } from "../../shared/hooks/useBreakpoints.ts";

import { useEnhancedLockBodyScroll } from "../../scroll/useScroll.ts";
import { useDrawerState, useManageDrawer } from "../useLayout.ts";
import FoldableMenu from "./FoldableMenu.tsx";

type SubMenu = {
  title: string;
  link: string;
};

export type MenuItem = {
  title: string;
  subMenu: SubMenu[];
  link: string;
};

const menuItems: MenuItem[] = [
  { title: "Home", subMenu: [], link: "/" },
  {
    title: "Post",
    subMenu: [
      { title: "Create", link: "/posts/create" },
      { title: "My Post", link: "/posts/mine" },
    ],
    link: "/posts",
  },
  { title: "Tags", subMenu: [], link: "/tags" },
  { title: "Category", subMenu: [], link: "/categories" },
];

const Drawer: React.FC<HTMLAttributes<HTMLDivElement>> = memo(({ ...rest }) => {
  const { isDrawerOpen } = useDrawerState();
  const { isLargeScreen } = useDeviceType();

  const { closeDrawer } = useManageDrawer();
  useEnhancedLockBodyScroll(!isLargeScreen && isDrawerOpen);

  return (
    <aside
      className={clsx(
        "w-64 max-w-full h-screen flex fixed top-0 transition-transform z-20 flex-grow-0 flex-shrink-0 bg-gray-50 shadow-md",
        !isLargeScreen && isDrawerOpen ? "translate-x-full" : "translate-x-0",
        isLargeScreen ? "-ml-0 duration-0" : "-ml-64 duration-300 "
      )}
      {...rest}
    >
      <div className="w-full h-full overflow-auto flex flex-col relative">
        <div
          aria-label="upper area"
          className="flex-shrink-0 basis-14 sticky flex justify-end"
        >
          {!isLargeScreen && (
            <button
              onClick={closeDrawer}
              className="group h-full relative aspect-square flex items-center justify-center"
            >
              <XMarkIcon className="size-9 rounded-full p-1 hover:bg-sky-700/10  transition " />
            </button>
          )}
        </div>

        <nav
          aria-label="main nav area"
          className="flex-grow w-full select-none "
        >
          {menuItems.map((item) => (
            <FoldableMenu key={item.title} menu={item} />
          ))}
        </nav>
      </div>
    </aside>
  );
});

export default Drawer;

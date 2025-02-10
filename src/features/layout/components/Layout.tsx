import { clsx } from "clsx";
import React, { lazy, useEffect } from "react";

import Overlay from "../../shared/components/Overlay.tsx";
import {
  useBreakpoints,
  useDeviceType,
} from "../../shared/hooks/useBreakpoints.ts";
import { useDrawerState, useManageDrawer } from "../useLayout.ts";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import Main from "./Main.tsx";
import Sidebar from "./Sidebar.tsx";

const Drawer = lazy(() => import("./Drawer.tsx"));

// Layout : Drawer(Left) + L1Right
const Layout: React.FC = () => {
  const { isDrawerOpen } = useDrawerState();
  const { toggleDrawer, openDrawer, closeDrawer } = useManageDrawer();
  const { isLargeScreen } = useDeviceType();

  // Set Initial Drawer Openness
  useEffect(() => {
    if (isLargeScreen) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [closeDrawer, isLargeScreen, openDrawer]);

  return (
    <div className="relative w-full min-h-screen bg-purple-600 flex flex-row">
      {!isLargeScreen && (
        <Overlay
          active={isDrawerOpen}
          onClick={isDrawerOpen ? toggleDrawer : undefined}
          className="cursor-pointer"
        />
      )}
      <Drawer />
      <L1Right />
    </div>
  );
};

//  L1Right : Header(top) + L2Bottom
const L1Right: React.FC = () => {
  return (
    <div className={clsx("w-full h-full min-h-screen flex-row relative")}>
      <Header />
      <L2Bottom />
    </div>
  );
};

// L2Bottom : L3Left + Sidebar(right)
const L2Bottom: React.FC = () => {
  const { isLg } = useBreakpoints();
  return (
    <div className="w-full h-full flex-grow bg-pink-500 flex flex-row">
      <L3Left />
      {isLg && <Sidebar />}
    </div>
  );
};

// L3Left : main(top) + footer(bottom)
const L3Left: React.FC = () => {
  return (
    <div className="w-full h-full flex-grow flex flex-col bg-lime-500">
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;

import clsx from "clsx";
import { HTMLAttributes, memo } from "react";

import { useDeviceType } from "../../shared/hooks/useBreakpoints.ts";

import { useEnhancedLockBodyScroll } from "../../scroll/useScroll.ts";
import { useDrawerState } from "../useLayout.ts";

const Drawer: React.FC<HTMLAttributes<HTMLDivElement>> = memo(({ ...rest }) => {
  const { isDrawerOpen } = useDrawerState();
  const { isLargeScreen } = useDeviceType();
  useEnhancedLockBodyScroll(!isLargeScreen && isDrawerOpen);

  return (
    <aside
      className={clsx(
        "w-64 max-w-full h-screen bg-orange-300 flex sticky top-0 transition-transform z-20 flex-grow-0 flex-shrink-0",
        !isLargeScreen && isDrawerOpen ? "translate-x-full" : "translate-x-0",
        isLargeScreen ? "-ml-0 duration-0" : "-ml-64 duration-300"
      )}
      {...rest}
    >
      Drawer
    </aside>
  );
});

export default Drawer;

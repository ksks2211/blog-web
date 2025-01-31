import clsx from "clsx";
import { memo, useEffect } from "react";

import { useLogoutMutation, useUserInfo } from "../../auth/useAuth.ts";
import { useScrollY } from "../../scroll/useScroll.ts";
import { useBreakpoints } from "../../shared/hooks/useBreakpoints.ts";
import {
  useHeaderVisibility,
  useManageDrawer,
  useManageHeader,
} from "../useLayout.ts";

// pixels
const SCROLL_THRESHOLD = 15 as const;

const Header = memo(() => {
  const { isHeaderVisible } = useHeaderVisibility();
  const { hideHeader, showHeader } = useManageHeader();
  const { scrollY, prevScrollY } = useScrollY();
  const { isLg } = useBreakpoints();
  const { toggleDrawer } = useManageDrawer();
  const { nickname } = useUserInfo();

  const { mutation: logoutMutation } = useLogoutMutation();

  const handleLogoutBtnClick = () => {
    logoutMutation.mutate();
  };

  // 초기 상태 = Show
  useEffect(() => {
    showHeader();
  }, [showHeader]);

  useEffect(() => {
    // always display header on large device
    if (isLg) {
      showHeader();
      return;
    }

    // viewport 의 3분의 1 이상 내렸을 때
    if (window.innerHeight / 3 <= scrollY) {
      if (prevScrollY + SCROLL_THRESHOLD < scrollY) {
        hideHeader();
      } else if (prevScrollY - SCROLL_THRESHOLD > scrollY) {
        showHeader();
      }
    } else {
      showHeader();
    }
  }, [hideHeader, prevScrollY, scrollY, showHeader, isLg]);

  return (
    <header
      className={clsx(
        "sticky top-0 w-full bg-cyan-500 min-h-14 flex-shrink-0 flex-grow-0 transition-transform duration-300 ease-out",
        "flex justify-between",
        !isHeaderVisible && "-translate-y-14"
      )}
    >
      <button className="bg-purple-500" onClick={toggleDrawer}>
        toggle
      </button>
      <h1 className="bg-purple-500">title User({nickname})</h1>
      <button onClick={handleLogoutBtnClick}>logout</button>
    </header>
  );
});

export default Header;

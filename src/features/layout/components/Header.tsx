import clsx from "clsx";
import { memo, useEffect } from "react";

import { useScrollY } from "../../scroll/useScroll.ts";
import { useBreakpoints } from "../../shared/hooks/useBreakpoints.ts";
import { useHeaderVisibility, useManageHeader } from "../useLayout.ts";

// pixels
const SCROLL_THRESHOLD = 15 as const;

const Header = memo(() => {
  const { isHeaderVisible } = useHeaderVisibility();
  const { hideHeader, showHeader } = useManageHeader();
  const { scrollY, prevScrollY } = useScrollY();
  const { isLg } = useBreakpoints();

  // 초기 상태 = Show
  useEffect(() => {
    showHeader();
  }, [showHeader]);

  useEffect(() => {
    if (isLg) {
      showHeader();
      return;
    }

    // Viewport 의 3분의 1 이상 내렸을 때만
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
        !isHeaderVisible && "-translate-y-14"
      )}
    >
      Header
    </header>
  );
});

export default Header;

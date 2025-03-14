import { throttle } from "lodash-es";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { useLockBodyScroll } from "react-use";
import { AppDispatch, RootState } from "../../app/store";
import { getScrollbarWidth } from "../shared/utils/documentUtils";
import { setScrollY } from "./scrollStateSlice";
import { isScrollable } from "./scrollUtils";

const scrollToOptions = {
  top: 0,
  behavior: "instant",
} as const;

export const useScrollTopResetByPathname = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable the browser's default scroll restoration on back/forward navigation
    window.history.scrollRestoration = "manual";
    window.scrollTo(scrollToOptions);

    // Re-enable scroll restoration when the component is unmounted
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, [pathname]);
};

export const useScrollTopResetByParams = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    // Disable the browser's default scroll restoration on back/forward navigation
    window.history.scrollRestoration = "manual";
    window.scrollTo(scrollToOptions);

    // Re-enable scroll restoration when the component is unmounted
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, [params]);
};

export function useScrollY() {
  const scrollY = useSelector((state: RootState) => state.scrollState.scrollY);
  const prevScrollY = useSelector(
    (state: RootState) => state.scrollState.prevScrollY
  );
  return { prevScrollY, scrollY };
}

export function useListenScrollY(wait = 200) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const handleScrollY = throttle(() => {
      dispatch(setScrollY(window.scrollY));
    }, wait);

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [wait, dispatch]);
}

export const useEnhancedLockBodyScroll = (lock: boolean) => {
  useLockBodyScroll(lock);

  const scrollbarWidth = getScrollbarWidth();

  // Add right margin for scroll width
  useEffect(() => {
    if (!isScrollable()) return;
    if (lock) {
      const { marginRight } = window.getComputedStyle(document.body);
      document.body.style.marginRight = `${scrollbarWidth}px`;

      return () => {
        document.body.style.marginRight = marginRight;
      };
    }
  }, [lock, scrollbarWidth]);
};

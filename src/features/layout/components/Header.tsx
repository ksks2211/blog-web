import {
  ArrowDownTrayIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { memo, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useLogoutMutation, useUserInfo } from "../../auth/useAuth.ts";
import { useScrollY } from "../../scroll/useScroll.ts";
import {
  useBreakpoints,
  useDeviceType,
} from "../../shared/hooks/useBreakpoints.ts";
import { toPascalCase } from "../../shared/utils/stringUtils.ts";
import {
  useHeaderVisibility,
  useManageDrawer,
  useManageHeader,
} from "../useLayout.ts";

// pixels
const SCROLL_THRESHOLD = 15 as const;

const useTitleFromPathname = () => {
  const { pathname } = useLocation();

  const title = pathname.split("/")[1];

  return title.length > 0 ? toPascalCase(title) : "Home";
};

const Header = memo(() => {
  const { isHeaderVisible } = useHeaderVisibility();
  const { hideHeader, showHeader } = useManageHeader();
  const { scrollY, prevScrollY } = useScrollY();
  const { isLg } = useBreakpoints();
  const { toggleDrawer } = useManageDrawer();
  const { nickname } = useUserInfo();
  const { mutation: logoutMutation } = useLogoutMutation();

  const title = useTitleFromPathname();
  const { isLargeScreen } = useDeviceType();

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
        "sticky top-0 w-full bg-base-200/50 glass min-h-14 flex-shrink-0 flex-grow-0 transition-transform duration-300 ease-out",
        "flex justify-center items-center relative",
        !isHeaderVisible && "-translate-y-14",
        isLargeScreen && "pr-64"
      )}
    >
      {!isLargeScreen && (
        <button
          className="absolute left-0 ml-5 top-0 bottom-0"
          onClick={toggleDrawer}
        >
          <Bars3Icon className="size-8 p-1 hover:bg-primary/10 rounded-full" />
        </button>
      )}

      <h1 className="font-fredoka font-extrabold text-2xl text-orange-600">
        {title}
      </h1>

      <div
        className={clsx(
          "absolute right-0 mr-5 dropdown dropdown-bottom dropdown-end top-0 bottom-0 flex items-center",
          isLargeScreen && "-translate-x-64"
        )}
      >
        <UserCircleIcon
          tabIndex={0}
          role="button"
          className="size-8 p-1 hover:bg-primary/10 rounded-full"
        />

        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-4 shadow mt-1"
        >
          <div className="font-extrabold w-full text-center">{nickname}</div>

          <div className="w-full divider divider-neutral opacity-25 my-1"></div>

          <div
            className="w-full cursor-pointer text-center hover:bg-base-300 p-2 rounded"
            onClick={handleLogoutBtnClick}
          >
            <span className="relative ">
              Logout
              <ArrowDownTrayIcon className="absolute -left-7 size-5 inline-flex rotate-90" />
            </span>
          </div>
        </div>
      </div>

      {/* <h1 className="bg-purple-500">title User({nickname})</h1> */}
      {/* <button onClick={handleLogoutBtnClick}>logout</button> */}
    </header>
  );
});

export default Header;

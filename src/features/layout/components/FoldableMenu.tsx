import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TargetedEvent } from "../../shared/shared.types";
import { useManageDrawer } from "../useLayout";
import { MenuItem } from "./Drawer";

interface FoldableMenuProps {
  menu: MenuItem;
}

const motionUlProps = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: "auto",
    opacity: 1,
  },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" },
} as const;

export default function FoldableMenu({ menu }: FoldableMenuProps) {
  const hasSubMenu = menu.subMenu.length > 0;
  const { pathname } = useLocation();
  const { title, subMenu, link } = menu;
  const { closeDrawer } = useManageDrawer();
  const navigate = useNavigate();
  const handleLink = ({ currentTarget }: TargetedEvent) => {
    const link = currentTarget.dataset.link as string;
    navigate(link);
    closeDrawer();
  };

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);

  const isActive = link === "/" ? pathname === link : pathname.startsWith(link);

  const toggleSubmenu = () => {
    setIsSubmenuOpen((prev) => !prev);
  };

  return (
    <div className="w-full relative">
      <div aria-label="root menu" className="h-12 flex flex-row z-30">
        <div
          className={clsx(
            "h-full flex-grow flex items-center  font-extrabold text-xl cursor-pointer hover:underline hover:text-orange-600"
          )}
          onClick={handleLink}
          data-link={link}
        >
          <span
            className={clsx(
              "border-l-4 pl-3",
              isActive ? "border-orange-500" : "border-transparent"
            )}
          >
            {title}
          </span>
        </div>
        {hasSubMenu && (
          <div
            className="group h-full ml-auto self-end w-14 shrink-0 flex items-center justify-center cursor-pointer"
            onClick={toggleSubmenu}
          >
            {isSubmenuOpen ? (
              <ChevronDownIcon className="size-6 group-hover:text-sky-700 m-1" />
            ) : (
              <ChevronUpIcon className="size-6 group-hover:text-sky-700 m-1" />
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {hasSubMenu && isSubmenuOpen && (
          <motion.ul {...motionUlProps} className="overflow-hidden">
            {subMenu.map((sub) => (
              <li
                key={sub.link}
                data-link={sub.link}
                onClick={handleLink}
                className="h-12 px-4 cursor-pointer flex items-center w-full group z-20"
              >
                <button
                  className={clsx(
                    "pl-4 w-full h-full group-hover:bg-orange-500/5 transition text-left rounded items-center",
                    pathname === sub.link && "text-orange-600"
                  )}
                >
                  {sub.title}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

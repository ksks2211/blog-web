import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect } from "react";
import type {
  SnackbarSeverity,
  SnackbarState,
} from "../hooks/useSnackbarState";

type Icon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export interface SnackbarAlertProps {
  snackbarState: SnackbarState;
  onClose: () => void;
}

function getIcon(severity: SnackbarSeverity): Icon {
  switch (severity) {
    case "info":
      return InformationCircleIcon;
    case "success":
      return CheckCircleIcon;
    case "warning":
      return ExclamationTriangleIcon;
    case "error":
      return XCircleIcon;
  }
}

export default function SnackbarAlert({
  snackbarState,
  onClose, // Clear Alert State
}: SnackbarAlertProps) {
  const { open, message, severity } = snackbarState;

  useEffect(() => {
    setTimeout(() => {}, 300);
  }, []);

  const CircleIcon = getIcon(severity);

  let alertType = "";

  switch (severity) {
    case "info":
      alertType = "alert-info";
      break;
    case "success":
      alertType = "alert-success";
      break;
    case "warning":
      alertType = "alert-warning";
      break;
    case "error":
      alertType = "alert-error";
      break;
  }

  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-center w-full h-0">
      <div
        aria-label="alert"
        role="alert"
        className={clsx(
          "fixed inline-flex mx-auto px-auto transition-all duration-300",
          open
            ? "translate-y-0 opacity-100 top-[10vh]"
            : "-translate-y-full opacity-0 top-0",
          "alert z-30",
          alertType,
          "w-auto justify-between"
        )}
      >
        <div className="flex-shrink-0 inline-flex gap-2 items-center mr-3">
          <CircleIcon className="flex-shrink-0 size-6" />
          <span className="max-w-[70vw] md:max-w-[50vw] text-left">
            {message}
          </span>
        </div>

        <XMarkIcon
          className="flex-shrink-0 size-5 cursor-pointer text-base-content"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

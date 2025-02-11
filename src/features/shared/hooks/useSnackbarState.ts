import { throttle } from "lodash-es";
import { useEffect, useMemo, useState } from "react";
export type SnackbarSeverity = "info" | "success" | "warning" | "error";

export type SnackbarState = {
  open: boolean;
  severity: SnackbarSeverity;
  message: string;
};

const initialSnackbarState = {
  open: false,
  severity: "error" as SnackbarSeverity,
  message: "",
};

const defaultSnackbarOptions = {
  severity: "error" as SnackbarSeverity,
  duration: 2000, // ms
};

export function useSnackbarState({
  severity,
  duration,
} = defaultSnackbarOptions) {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    ...initialSnackbarState,
    severity: severity || initialSnackbarState.severity,
  });

  const { open } = snackbarState;

  useEffect(() => {
    const timer = setTimeout(() => {
      closeSnackbar();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, open]);

  const displaySnackbar = useMemo(
    () =>
      throttle(
        (message: string, otherSeverity?: SnackbarSeverity) =>
          setSnackbarState({
            open: true,
            message,
            severity: otherSeverity || severity,
          }),
        1500
      ),
    [severity]
  );

  const closeSnackbar = (cb?: () => void) => {
    setSnackbarState((prev) => {
      // type-guard, cb means clean-up callback
      if (cb && typeof cb === "function") {
        cb();
      }
      return { ...prev, open: false };
    });
  };

  return {
    snackbarState,
    displaySnackbar,
    closeSnackbar,
  };
}

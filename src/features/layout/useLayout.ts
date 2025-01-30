import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setDrawerOpenState,
  setHeaderVisibility,
  toggleDrawerState,
} from "./layoutStateSlice";

export function useManageHeader() {
  const dispatch = useDispatch();

  const showHeader = useCallback(() => {
    dispatch(setHeaderVisibility(true));
  }, [dispatch]);

  const hideHeader = useCallback(() => {
    dispatch(setHeaderVisibility(false));
  }, [dispatch]);

  return { showHeader, hideHeader };
}

export function useHeaderVisibility() {
  const isHeaderVisible = useSelector(
    (state: RootState) => state.layoutState.isHeaderVisible
  );
  return { isHeaderVisible };
}

export function useDrawerState() {
  const isDrawerOpen = useSelector(
    (state: RootState) => state.layoutState.isDrawerOpen
  );
  return { isDrawerOpen };
}

export function useManageDrawer() {
  const dispatch = useDispatch();

  const closeDrawer = useCallback(() => {
    dispatch(setDrawerOpenState(false));
  }, [dispatch]);
  const openDrawer = useCallback(() => {
    dispatch(setDrawerOpenState(true));
  }, [dispatch]);

  const toggleDrawer = useCallback(() => {
    dispatch(toggleDrawerState());
  }, [dispatch]);

  return { closeDrawer, openDrawer, toggleDrawer };
}

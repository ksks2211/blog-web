import { useMemo } from "react";
import { useMedia } from "react-use";

const tailwindBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const useBreakpoints = () => {
  const isXs = useMedia(`(max-width: ${tailwindBreakpoints.sm - 1}px)`); // ~640px

  // isSm = isSameOrBiggerThanSm
  const isSm = useMedia(`(min-width: ${tailwindBreakpoints.sm}px)`); // 640px ~
  const isMd = useMedia(`(min-width: ${tailwindBreakpoints.md}px)`); // 768px ~
  const isLg = useMedia(`(min-width: ${tailwindBreakpoints.lg}px)`); // 1024px ~
  const isXl = useMedia(`(min-width: ${tailwindBreakpoints.xl}px)`); // 1280px ~
  return { isXs, isSm, isMd, isLg, isXl };
};

export const useDeviceType = () => {
  const { isXs, isSm, isMd, isLg, isXl } = useBreakpoints();

  const value = useMemo(
    () => ({
      isSmallMobile: isXs,
      isLargeMobile: isSm && !isMd,
      isMobile: isXs || (isSm && !isMd),
      isTablet: isMd && !isLg,
      isDesktop: isLg && !isXl,
      isLargeScreen: isXl,
    }),
    [isLg, isMd, isSm, isXl, isXs]
  );

  return value;
};

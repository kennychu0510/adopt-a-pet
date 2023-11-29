"use client";
import useBetterMediaQuery from "./useBetterMediaQuery";

export default function useIsSmallScreen() {
  const isSmallScreen = useBetterMediaQuery(`(max-width: ${500}px)`);
  return isSmallScreen;
}

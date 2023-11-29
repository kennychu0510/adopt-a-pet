"use client";
import useBetterMediaQuery from "./useBetterMediaQuery";

export default function useIsLargeScreen(minWidth?: number) {
  const isLargeScreen = useBetterMediaQuery(`(min-width: ${minWidth ?? 35}em)`);
  return isLargeScreen;
}

"use client";
import { useMediaQuery } from "@chakra-ui/react";

export default function useIsLargeScreen(minWidth?: number) {
  const [isLargeScreen] = useMediaQuery(`(min-width: ${minWidth ?? 35}em)`, {
    ssr: false,
  });
  return isLargeScreen;
}

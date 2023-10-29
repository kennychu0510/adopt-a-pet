'use client';
import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';

export default function useIsLargeScreen(minWidth?: number) {
  const [isLargeScreen] = useMediaQuery(`(min-width: ${minWidth ?? 35}em)`, {
    ssr: false,
  });
  return isLargeScreen;
}

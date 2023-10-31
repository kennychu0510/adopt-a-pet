'use client';
import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';

export default function useIsSmallScreen() {
  const [isSmallScreen] = useMediaQuery(`(max-width: ${500}px)`, {
    ssr: false,
  });
  return isSmallScreen;
}

'use client';
import useIsLargeScreen from '@/hooks/useIsLargeScreen';
import { Card } from '@chakra-ui/react';
import React from 'react';

export default function FormCard({ children }: { children: React.ReactNode }) {
  const isLargeScreen = useIsLargeScreen();
  const minWidth = isLargeScreen ? 500 : '100vw';
  return (
    <Card bg='white' borderRadius='lg' minWidth={minWidth} p={8} variant={isLargeScreen ? 'elevated' : 'unstyled'} paddingX={isLargeScreen ? 0 : 10}>
      {children}
    </Card>
  );
}

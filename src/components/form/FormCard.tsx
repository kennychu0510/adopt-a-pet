"use client";
import useIsSmallScreen from "@/hooks/useIsSmallScreen";
import { Card } from "@chakra-ui/react";
import React from "react";

export default function FormCard({ children }: { children: React.ReactNode }) {
  const isSmallScreen = useIsSmallScreen();
  const minWidth = isSmallScreen ? "100vw" : 500;
  return (
    <Card
      bg="white"
      borderRadius="lg"
      minWidth={minWidth}
      p={8}
      variant={isSmallScreen ? "elevated" : "unstyled"}
      paddingX={isSmallScreen ? 10 : 6}
    >
      {children}
    </Card>
  );
}

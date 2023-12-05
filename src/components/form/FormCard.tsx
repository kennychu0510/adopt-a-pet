import { Card } from "@chakra-ui/react";
import React from "react";

export default function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <Card
      bg="white"
      borderRadius="lg"
      minWidth={{
        base: "100vw",
        sm: 500,
      }}
      p={8}
      variant={{
        base: "unstyled",
        sm: "elevated",
      }}
      paddingX={{
        base: 6,
        sm: 10,
      }}
    >
      {children}
    </Card>
  );
}

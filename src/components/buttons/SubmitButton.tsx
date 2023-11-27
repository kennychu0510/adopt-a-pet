import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

export default function SubmitButton(props: ButtonProps) {
  return (
    <Button
      variant="solid"
      colorScheme="blue"
      color="white"
      _hover={{
        opacity: 0.6,
      }}
      type="submit"
      {...props}
    >
      Send
    </Button>
  );
}

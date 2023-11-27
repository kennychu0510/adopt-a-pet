import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlinePets } from "react-icons/md";

export default function Row({
  icon,
  content,
  my,
}: {
  icon: React.ReactNode;
  content: string | null;
  my?: number;
}) {
  return (
    <Flex alignSelf={"flex-start"} alignItems={"center"} my={my ?? 3}>
      <Box mr={2} alignSelf={"flex-start"} pt={1}>
        {icon}
      </Box>
      <Text>{content}</Text>
    </Flex>
  );
}

import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PetCard, { PetCardProps } from "./PetCard";

type Props = {
  header: string;
  subHeader: string;
  items: PetCardProps[];
};

export default function HorizontalSection(props: Props) {
  return (
    <section className="mb-4">
      <Text fontSize={"lg"} fontWeight={"bold"}>
        {props.header}
      </Text>
      <Text fontSize={"sm"} color={"grey"} mb={2}>
        {props.subHeader}
      </Text>
      <Box
        flexWrap={"wrap"}
        p={2}
        flexDirection={"row"}
        display={"flex"}
        gap={5}
      >
        {props.items.map((category) => (
          <PetCard key={category.name} {...category} />
        ))}
      </Box>
    </section>
  );
}

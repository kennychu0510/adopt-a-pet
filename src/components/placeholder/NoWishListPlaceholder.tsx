import Images from "@/assets";
import { Heading, VStack } from "@chakra-ui/react";
import PetImage from "../PetImage";

export default function NoWishListPlaceholder() {
  return (
    <>
      <VStack mb={2}>
        <PetImage image={Images.noWish} />
        <Heading color={"blue.600"} textAlign={"center"}>
          No wish list this week!
        </Heading>
      </VStack>
    </>
  );
}

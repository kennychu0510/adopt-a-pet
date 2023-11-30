import { Box, Center, Text, VStack, Button } from "@chakra-ui/react";
import Image from "next/legacy/image";
import React from "react";
import Images from "@/assets";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <Box>
      <Center my={100}>
        <VStack>
          <Image
            objectFit="cover"
            src={Images.adopt}
            alt="adoption"
            width={200}
            height={200}
            style={{ minWidth: 50 }}
          />
          <Text as={"i"}>Page not found</Text>
          <Link href={"/"}>
            <Button colorScheme="blue" my={2}>
              Return to Homepage
            </Button>
          </Link>
        </VStack>
      </Center>
    </Box>
  );
}
